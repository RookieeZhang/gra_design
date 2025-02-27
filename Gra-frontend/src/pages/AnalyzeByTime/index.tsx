import {Button, message, Modal, Space} from "antd";
import React, {useState, useEffect} from "react";
import {analyzeByTimeUsingPost} from "@/services/swagger/chartController";
import ReactECharts from 'echarts-for-react';

const App: React.FC = () => {

  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('lastMonth');
  const [selectedFeather, setSelectedFeather] = useState<string>('brand');
  const [datasource, setDatasource] = useState<API.ChartVO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detailData, setDetailData] = useState<any[]>([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [detailType, setDetailType] = useState<'specification' | 'region'>('specification');

  // 修改 processData 函数以支持多条折线
  const processData = (data: API.ChartVO[], selectedFeather: string) => {
    const countMap = new Map<string, Map<string, number>>();

    data.forEach((item) => {
      const date = item.date || '';
      const featherValue = item[selectedFeather as keyof API.ChartVO] || '';

      if (!countMap.has(date)) {
        countMap.set(date, new Map());
      }

      const dateMap = countMap.get(date)!;
      dateMap.set(featherValue, (dateMap.get(featherValue) || 0) + 1);
    });

    const sortedDates = Array.from(countMap.keys()).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });

    const processedData: {
      date: string;
      [key: string]: number | string;
    }[] = [];

    sortedDates.forEach(date => {
      const dateMap = countMap.get(date)!;
      const entry: { date: string } = { date };
      dateMap.forEach((count, featherValue) => {
        entry[featherValue] = count; // 为每个品牌添加销量
      });
      processedData.push(entry);
    });

    return processedData;
  };

  // 添加柱状图数据处理函数
  const processBarData = (data: API.ChartVO[], selectedFeather: string) => {
    const countMap = new Map<string, number>();

    data.forEach((item) => {
      const featherValue = item[selectedFeather as keyof API.ChartVO] || '';
      countMap.set(featherValue, (countMap.get(featherValue) || 0) + 1);
    });

    return Array.from(countMap.entries()).map(([key, value]) => ({
      [selectedFeather]: key,
      count: value
    }));
  };

  // 处理原始数据
  const chartData = processData(datasource, 'brand'); // 处理数据时选择 'brand'

  // 处理柱状图数据
  const barData = processBarData(datasource, selectedFeather);

  // 添加调试信息
  useEffect(() => {
    console.log('Current barData:', barData);
    console.log('Selected Feature:', selectedFeather);
  }, [barData, selectedFeather]);

  const getDatasource = async (time: any) => {
    const res = await analyzeByTimeUsingPost({time: time})
    if (res.code === 0) {
      setDatasource(res.data)
    } else {
      message.error(res.message);
    }
  }

  useEffect(() => {
    getDatasource("lastMonth") // Populate the form with the current datasource values
  }, []);

  // 当选中品牌时，立即处理并设置数据
  useEffect(() => {
    if (isModalVisible && selectedBrand) {
      const newData = processDetailData(datasource, selectedBrand, detailType);
      setDetailData(newData);
    }
  }, [isModalVisible, selectedBrand, detailType, datasource]);

  // 修改点击事件处理
  const handleBarClick = (event: any, currentFeather: string) => {
    console.log('Event data:', event); // 添加调试信息，查看 event 对象

    if (currentFeather !== 'brand') {
      return;
    }

    const brand = event.name; // 从 event 中获取品牌名称
    if (brand) {
      setSelectedBrand(brand);
      setIsModalVisible(true); // 确保模态框在这里被设置为可见
    }
  };

  // 优化数据处理函数
  const processDetailData = (data: API.ChartVO[], brand: string, type: 'specification' | 'region') => {
    if (!brand || !data?.length) return [];

    // 先过滤出选中品牌的数据
    const brandData = data.filter(item => item.brand === brand);
    if (!brandData.length) return [];

    // 统计数量
    const countMap = new Map<string, number>();
    brandData.forEach((item) => {
      const key = item[type] || '未知';
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });

    // 转换为数组并排序
    return Array.from(countMap.entries())
      .map(([key, value]) => ({
        [type]: key,
        count: value
      }))
      .sort((a, b) => b.count - a.count);
  };

  // 处理切换类型
  const handleTypeChange = (newType: 'specification' | 'region') => {
    setDetailType(newType);
    const newData = processDetailData(datasource, selectedBrand, newType);
    setDetailData(newData);
  };

  // 定义颜色数组
  const colors = ['#1979C9', '#FF5733', '#33FF57', '#FFC300', '#DAF7A6', '#C70039', '#900C3F', '#581845'];

  // 在渲染折线图时，动态生成系列数据
  const seriesData = Object.keys(chartData.reduce((acc, item) => {
    // 将所有品牌的名称收集到一个集合中
    Object.keys(item).forEach(key => {
      if (key !== 'date') {
        acc[key] = true; // 使用对象的键来去重
      }
    });
    return acc;
  }, {})).map((brand, index) => {
    // 提取每个品牌的销量数据
    const brandData = chartData.map(item => item[brand] || 0); // 获取每个品牌的销量数据
    return {
      name: brand, // 品牌名称
      type: 'line', // 图表类型
      data: brandData, // 品牌的销量数据
      smooth: true, // 平滑曲线
      itemStyle: {
        color: colors[index % colors.length] // 为每个品牌设置不同颜色
      }
    };
  });

  // 确保 seriesData 中包含多个品牌
  console.log('Series Data:', seriesData); // 添加调试信息

  // 在渲染折线图时，动态生成系列数据
  const xAxisData = selectedTimeRange === 'lastYear'
    ? ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    : chartData.map(item => item.date); // 使用原来的日期数据

  return (
    <>
      <div style={{marginBottom: 16}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <Button.Group>
            <Button
              type={selectedTimeRange === 'lastMonth' ? 'primary' : 'default'}
              onClick={
                async () => {
                  setSelectedTimeRange('lastMonth')
                  getDatasource('lastMonth')
                }
              }
            >
              过去一个月
            </Button>
            <Button
              type={selectedTimeRange === 'lastSeason' ? 'primary' : 'default'}
              onClick={
                async () => {
                  setSelectedTimeRange('lastSeason')
                  getDatasource('lastSeason')
                }
              }
            >
              过去一个季度
            </Button>
            <Button
              type={selectedTimeRange === 'lastYear' ? 'primary' : 'default'}
              onClick={
                async () => {
                  setSelectedTimeRange('lastYear')
                  getDatasource('lastYear')
                }
              }
            >
              过去一年
            </Button>
          </Button.Group>

          <Button.Group>
            <Button
              type={selectedFeather === 'brand' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('brand')}
            >
              品牌
            </Button>
            <Button
              type={selectedFeather === 'specification' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('specification')}
            >
              规格
            </Button>
            <Button
              type={selectedFeather === 'region' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('region')}
            >
              地区
            </Button>
          </Button.Group>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <ReactECharts
              option={{
                title: {
                  text: '不同品牌销量随时间变化'
                },
                tooltip: {
                  trigger: 'axis'
                },
                xAxis: {
                  type: 'category',
                  data: xAxisData, // 使用动态生成的横坐标数据
                  name: '日期'
                },
                yAxis: {
                  type: 'value',
                  name: '销量'
                },
                series: seriesData // 使用动态生成的系列数据
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <ReactECharts
              option={{
                title: {
                  text: '柱状图'
                },
                tooltip: {
                  trigger: 'item'
                },
                xAxis: {
                  type: 'category',
                  data: barData.map(item => item[selectedFeather]),
                  name: '类别'
                },
                yAxis: {
                  type: 'value',
                  name: '销量'
                },
                series: [{
                  name: '销量',
                  type: 'bar',
                  data: barData.map(item => item.count),
                  itemStyle: {
                    color: '#1979C9'
                  }
                }]
              }}
              onEvents={{
                click: (params) => {
                  handleBarClick(params, selectedFeather);
                }
              }}
            />
            {selectedFeather === 'brand' && (
              <div style={{ textAlign: 'center', marginTop: 8, color: '#666' }}>
                点击柱状图查看详细数据
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={`${selectedBrand} 详细数据`}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setDetailData([]);  // 关闭时清空数据
        }}
        footer={null}
        width={800}
      >
        <div style={{ marginBottom: 16 }}>
          <Space size="middle" style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              type={detailType === 'specification' ? 'primary' : 'default'}
              onClick={() => handleTypeChange('specification')}
            >
              查看规格分布
            </Button>
            <Button
              type={detailType === 'region' ? 'primary' : 'default'}
              onClick={() => handleTypeChange('region')}
            >
              查看区域分布
            </Button>
          </Space>
        </div>

        <div style={{ height: 400 }}>
          {detailData.length > 0 ? (
            <ReactECharts
              option={{
                title: {
                  text: '详细数据'
                },
                tooltip: {
                  trigger: 'axis'
                },
                xAxis: {
                  type: 'category',
                  data: detailData.map(item => item[detailType]),
                  name: detailType
                },
                yAxis: {
                  type: 'value',
                  name: '销量'
                },
                series: [{
                  name: '销量',
                  type: 'bar',
                  data: detailData.map(item => item.count),
                  itemStyle: {
                    color: '#1979C9'
                  }
                }]
              }}
            />
          ) : (
            <div style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: '#999'
            }}>
              暂无数据
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default App;
