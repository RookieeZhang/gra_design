import {Button, message, Modal} from 'antd';
import {useEffect, useState} from "react";
import * as echarts from 'echarts';
import {
  analyzeByRegionUsingGet,
  getAllProvinceUsingGet
} from "@/services/swagger/chartController";
import { get } from 'lodash';

const App: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<string>('七匹狼');
  const [datasource, setDatasource] = useState<API.RegionMonitorAnalyzeVO[]>([]);
  const [provinceList, setProvinceList] = useState<string[]>([]);
  const [myChart, setMyChart] = useState<echarts.ECharts | null>(null);
  const [lineChartData, setLineChartData] = useState<{ dates: string[], sales: number[], filteredData: API.RegionMonitorAnalyzeVO[] }>({ dates: [], sales: [], filteredData: [] });
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); // 控制 Modal 显示的状态

  const getDatasource = async () => {
    const res = await analyzeByRegionUsingGet();
    if (res.code === 0) {
      const sortedData = res.data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // 按日期排序
      setDatasource(sortedData);
      const dates = sortedData.map(item => item.date);
      const sales = sortedData.map(item => item.totalOrderAmount);
      setLineChartData({ dates, sales, filteredData: sortedData });

      // 检查哪些省份有 isOver 为 true 的数据，并去重
      const provincesWithOverData = Array.from(new Set(
        sortedData
            .filter(item => item.isOver)
            .map(item => item.region)
    ));

      if (provincesWithOverData.length > 0) {
        message.warning(`以下省份存在超出预警的数据：${provincesWithOverData.join(', ')}`);
      }
    } else {
      message.error(res.message);
    }
  };

  const getProvinceList = async () => {
    const res = await getAllProvinceUsingGet();
    if (res.code === 0) {
      setProvinceList(res.data);
      
    } else {
      message.error(res.message);
    }
  }

  useEffect(() => {
    getDatasource()
    getProvinceList();
  }, []);

  useEffect(() => {
    fetchChinaMap();
  }, [provinceList]);

  const fetchChinaMap = async () => {
    const response = await fetch('/china.json');
    const chinaMapData = await response.json();
    echarts.registerMap('china', chinaMapData);
    initChart(); // 只在地图数据加载后初始化图表
  };

  const initChart = () => {
    if (myChart) return; // 确保只初始化一次
    const chartDom = document.getElementById('china-map')!;
    const chartInstance = echarts.init(chartDom);
    setMyChart(chartInstance); // 保存图表实例

    const provinceColors = provinceList.map(province => {
      const hasOverData = datasource.some(item => item.region === province && item.isOver);
      
      console.log(hasOverData);
      
      return {
        name: province,
        value: hasOverData ? 'red' : '#ccc' // 如果存在 isOver 为 true 的数据，则设置为红色，否则为默认颜色
      };
    });

    const option = {
      tooltip: {},
      geo: {
        map: 'china',
        roam: true,
        emphasis: {
          label: {
            show: true
          }
        },
        itemStyle: {
          normal: {
            areaColor: (params) => {
              const province = provinceColors.find(p => p.name === params.name);
              return province ? province.value : '#ccc'; // 根据省份设置颜色
            },
            borderColor: '#fff'
          }
        }
      }
    };

    chartInstance.setOption(option);

    chartInstance.on('click', (params) => {
      if (params.componentType === 'geo' && provinceList.includes(params.name)) {
        console.log(1111111111);
        handleProvinceClick(params.name);
      }
    });

    // 监听窗口大小变化，调整图表大小
    window.addEventListener('resize', () => {
      chartInstance.resize();
    });
  };

  const handleProvinceClick = (province: string) => {
    setSelectedProvince(province);
    const filteredData = datasource.filter(item => item.region === province); // 根据点击的省份筛选数据
    console.log(filteredData);
    const dates = filteredData.map(item => item.date);
    const sales = filteredData.map(item => item.totalOrderAmount);
    setLineChartData({ dates, sales, filteredData }); // 更新折线图数据并保存 filteredData
    setIsModalVisible(true); // 显示 Modal

    // 检查是否存在 isOver 为 true 的数据
    const hasOverData = filteredData.some(item => item.isOver);
    if (hasOverData) {
      // 提醒用户该地区存在 isOver 为 true 的数据
      message.warning(`${province} 存在超出预警的数据！`); // 使用 Ant Design 的 message 提示
    }
  };

  // 渲染折线图
  const renderLineChart = () => {
    const lineChartDom = document.getElementById('line-chart');
    if (!lineChartDom) {
      console.error('Line chart DOM element not found');
      return; // 如果 DOM 元素未找到，直接返回
    }
    
    const lineChart = echarts.init(lineChartDom);

    // 使用 filteredData 来构建 seriesData
    const seriesData = lineChartData.filteredData.map(item => ({
      value: item.totalOrderAmount,
      itemStyle: {
        color: item.isOver ? 'red' : undefined // 如果 isOver 为 true，设置为红色
      },
      symbol: item.isOver ? 'circle' : 'none', // 如果 isOver 为 true，使用圆形标记
      symbolSize: item.isOver ? 8 : 0 // 如果 isOver 为 true，设置标记大小
    }));

    const option = {
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: lineChartData.dates // 确保 x 轴数据为日期
      },
      yAxis: {
        type: 'value',
        name: '销售金额' // 添加 y 轴名称
      },
      series: [{
        name: '总销量',
        type: 'line',
        data: seriesData // 使用处理后的数据
      }]
    };

    lineChart.setOption(option);
  };

  useEffect(() => {
    if (lineChartData.dates.length > 0) {
      renderLineChart(); // 当折线图数据更新时渲染折线图
    }
  }, [lineChartData]);

  return (
    <div>
      <div id="china-map" style={{ width: '100%', height: '500px' }}></div>
      <Modal
        title={`${selectedProvince} 的折线图`}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <div id="line-chart" style={{ width: '100%', height: '400px' }}></div> {/* 折线图容器 */}
      </Modal>
    </div>
  );
};
export default App;
