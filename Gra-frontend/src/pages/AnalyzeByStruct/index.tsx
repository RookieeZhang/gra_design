import {Button, message, Select} from 'antd';
import {useEffect, useState} from "react";
import {analyzeByStructUsingPost, analyzeByTimeUsingPost} from "@/services/swagger/chartController";
import {Pie, Column} from "@ant-design/charts";
import {data} from "@umijs/utils/compiled/cheerio/lib/api/attributes";
import ReactECharts from 'echarts-for-react';

const App: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('七匹狼');
  const [selectedFeather, setSelectedFeather] = useState<string>('salesChannel');
  const [datasource, setDatasource] = useState<API.StructAnalyzeVO[]>([]);
  const {Option} = Select;

  const getDatasource = async (brand: any) => {
    const res = await analyzeByStructUsingPost({brand: brand})
    if (res.code === 0) {
      setDatasource(res.data)
    } else {
      message.error(res.message);
    }
  }

  // 添加调试信息
  useEffect(() => {
  }, [datasource, selectedFeather]);

  useEffect(() => {
    getDatasource("七匹狼") // Populate the form with the current datasource values
  }, []);

  // 处理数据以适配饼状图
  const processData = () => {
    // 筛选选定品牌的数据
    const brandData = datasource.filter(item => item.brand === selectedBrand);
    console.log('筛选后的品牌数据:', brandData);

    // 直接按价格层次进行分组统计
    const groupedData = brandData.reduce((acc, item) => {
      const key = item.priceLevel || '未知';
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += Number(item.orderQuantity || 0);
      return acc;
    }, {});
    
    console.log('分组后的数据:', groupedData);

    // 格式化为饼图所需数据
    const result = Object.entries(groupedData).map(([key, value]) => ({
      name: `${key}`,
      value: value
    }));
    
    console.log('最终处理的数据:', result);
    return result;
  };

  // 处理柱状图数据
  const processBarData = () => {
    // 筛选选定品牌的数据
    const brandData = datasource.filter(item => item.brand === selectedBrand);

    // 根据 selectedFeather (客户类别或销售渠道) 进行分组统计
    const groupedData = brandData.reduce((acc, item) => {
      const key = selectedFeather === 'customerCategory' ? 
        (item.customerCategory || '未知') : 
        (item.salesChannel || '未知');
      
      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += Number(item.orderQuantity || 0);
      return acc;
    }, {});

    // 转换为柱状图所需的数据格式
    return Object.entries(groupedData).map(([category, value]) => ({
      category: category,
      value: value
    }));
  };

  // 使用 ECharts 绘制饼图
  const renderPieChart = () => {
    const data = processData();
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data.map(item => item.name),
      },
      series: [
        {
          name: '销量',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)',
          },
        },
      ],
    };
    return <ReactECharts option={option} />;
  };

  // 使用 ECharts 绘制柱状图
  const renderBarChart = () => {
    const data = processBarData();
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}',
      },
      legend: {
        orient: 'horizontal',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.category),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data.map(item => item.value),
          type: 'bar',
          label: {
            show: true,
            position: 'top',
          },
        },
      ],
    };
    return <ReactECharts option={option} />;
  };

  return (
    <>
      <div style={{marginBottom: 16}}>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
          <Select
            defaultValue={selectedBrand}
            onChange={async (value) => {
              setSelectedBrand(value);
              getDatasource(value);
            }}
            style={{width: 120}}
          >
            <Option value="七匹狼">七匹狼</Option>
            <Option value="中华">中华</Option>
            <Option value="玉溪">玉溪</Option>
            <Option value="利群">利群</Option>
            <Option value="黄鹤楼">黄鹤楼</Option>
          </Select>


          <Button.Group>
            <Button
              type={selectedFeather === 'salesChannel' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('salesChannel')}
            >
              销售渠道
            </Button>
            <Button
              type={selectedFeather === 'customerCategory' ? 'primary' : 'default'}
              onClick={() => setSelectedFeather('customerCategory')}
            >
              客户类别
            </Button>
          </Button.Group>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            {renderPieChart()}
          </div>
          <div style={{ flex: 1 }}>
            {renderBarChart()}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
