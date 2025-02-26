import {Button, message, Select} from 'antd';
import {useEffect, useState} from "react";
import {analyzeByCustomerUsingPost} from "@/services/swagger/chartController";
import ReactECharts from 'echarts-for-react';

const App: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('七匹狼');
  const [selectedFeather, setSelectedFeather] = useState<string>('零售商');
  const [datasource, setDatasource] = useState<API.CustomerAnalyzeVO[]>([]);
  const [processedData, setProcessedData] = useState<any[]>([]);
  const [averageOrderRateData, setAverageOrderRateData] = useState<any[]>([]);
  const {Option} = Select;

  const getDatasource = async (salesChannel: any) => {
    const res = await analyzeByCustomerUsingPost({ salesChannel: salesChannel });
    if (res.code === 0) {
      setDatasource(res.data);
      processDataByBrand(res.data, selectedBrand);
      calculateAverageOrderRate(res.data);
    } else {
      message.error(res.message);
    }
  };

  const processDataByBrand = (data: API.CustomerAnalyzeVO[], brand: string) => {
    const brandData = data.filter(item => item.brand === brand);
    
    const specificationGroups = brandData.reduce((acc, item) => {
      const spec = item.specification || '未知规格';
      if (!acc[spec]) {
        acc[spec] = {
          specification: spec,
          orderQuantity: 0,
        };
      }
      acc[spec].orderQuantity += item.orderQuantity || 0;
      return acc;
    }, {} as Record<string, any>);

    const processed = Object.values(specificationGroups);
    setProcessedData(processed);
  };

  const calculateAverageOrderRate = (data: API.CustomerAnalyzeVO[]) => {
    const regionGroups = data.reduce((acc, item) => {
      const region = item.region || '未知区域';
      if (!acc[region]) {
        acc[region] = {
          region,
          totalOrderQuantity: 0,
          totalDeliveryLimit: 0,
        };
      }
      acc[region].totalOrderQuantity += item.orderQuantity || 0;
      acc[region].totalDeliveryLimit += item.deliveryLimit || 0;
      return acc;
    }, {} as Record<string, any>);

    const averageData = Object.values(regionGroups).map(item => ({
      region: item.region,
      averageOrderRate: item.totalDeliveryLimit > 0 
        ? Number(((item.totalOrderQuantity / item.totalDeliveryLimit) * 100).toFixed(2))
        : 0,
    }));

    setAverageOrderRateData(averageData);
  };

  // 销量玫瑰图配置
  const getSalesOption = () => {
    return {
      title: {
        text: `${selectedBrand} - ${selectedFeather} 销量分析`,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          name: '销量',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {c} ({d}%)',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '20',
              fontWeight: 'bold',
            },
          },
          data: processedData.map(item => ({
            value: item.orderQuantity,
            name: item.specification,
          })),
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
        },
      ],
    };
  };

  // 平均订足率图配置
  const getAverageOrderRateOption = () => {
    return {
      title: {
        text: '不同品牌香烟在不同区域的平均订足率',
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: averageOrderRateData.map(item => item.region),
      },
      yAxis: {
        type: 'value',
        name: '平均订足率 (%)',
      },
      series: [
        {
          name: '平均订足率',
          type: 'bar',
          data: averageOrderRateData.map(item => item.averageOrderRate),
          itemStyle: {
            color: '#5B8FF9',
          },
        },
      ],
    };
  };

  useEffect(() => {
    getDatasource("零售商");
  }, []);

  useEffect(() => {
    if (datasource.length > 0) {
      processDataByBrand(datasource, selectedBrand);
      calculateAverageOrderRate(datasource);
    }
  }, [selectedBrand, datasource]);

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Select
            value={selectedBrand}
            onChange={(value) => setSelectedBrand(value)}
            style={{ width: 120 }}
          >
            <Option value="七匹狼">七匹狼</Option>
            <Option value="中华">中华</Option>
            <Option value="玉溪">玉溪</Option>
            <Option value="利群">利群</Option>
            <Option value="黄鹤楼">黄鹤楼</Option>
          </Select>

          <Button.Group>
            <Button
              type={selectedFeather === '零售商' ? 'primary' : 'default'}
              onClick={() => {
                setSelectedFeather('零售商');
                getDatasource('零售商');
              }}
            >
              零售商
            </Button>
            <Button
              type={selectedFeather === '批发商' ? 'primary' : 'default'}
              onClick={() => {
                setSelectedFeather('批发商');
                getDatasource('批发商');
              }}
            >
              批发商
            </Button>
          </Button.Group>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{flex: 1, marginTop: '20px' }}>
            <ReactECharts option={getSalesOption()} style={{ height: '400px' }} />
          </div>
          <div style={{ flex: 1, marginTop: '20px' }}>
            <ReactECharts option={getAverageOrderRateOption()} style={{ height: '400px' }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
