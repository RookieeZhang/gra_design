import {Button, message, Select} from 'antd';
import {useEffect, useState} from "react";
import {analyzeByCustomerUsingPost, analyzeByPredictUsingPost} from "@/services/swagger/chartController";
import ReactECharts from 'echarts-for-react';
import { color } from 'echarts';
import { getStorageByBrandUsingGet } from '@/services/swagger/productsController';

const App: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('七匹狼');
  const [datasource, setDatasource] = useState<API.PredictVO[]>([]);
  const [storage, setStorage] = useState<any>();
  const [chartData, setChartData] = useState<{ date: string; sales: number }[]>([]);
  const [restockStrategy, setRestockStrategy] = useState<number>(0);
  const {Option} = Select;

  const restockReasons = [ // 定义补货原因数组
    "销量增加，需补货，以满足客户需求并避免缺货情况。",
    "库存不足，需及时补充，以确保产品持续供应。",
    "市场需求上升，建议补货，以抓住销售机会并提升市场份额。",
    "销售趋势良好，建议增加库存，以应对未来的销售增长。",
    "客户反馈良好，需增加供应，以提升客户满意度和忠诚度。",
    "促销活动即将开始，需提前补货，以确保活动期间的销售。",
    "季节性需求增加，建议补货，以满足节假日或特殊活动的需求。",
    "竞争对手的销量上升，需补货以保持市场竞争力。"
  ];

  const randomReason = restockReasons[Math.floor(Math.random() * restockReasons.length)]; // 随机选择一个补货原因

  const getDatasource = async () => {
    const res = await analyzeByPredictUsingPost({
      brand: selectedBrand,
    });
    if (res.code === 0) {
      setDatasource(res.data);
      const formattedData = res.data.map(item => {
        const date = new Date(item.date);
        date.setHours(date.getHours() + 8);
        const month = date.toISOString().slice(0, 7);
        return {
          date: month,
          sales: item.sales
        };
      });
      setChartData(formattedData);
    } else {
      message.error(res.message);
    }
  };

  const getStorage = async () => {
    const res = await getStorageByBrandUsingGet({
      brand: selectedBrand,
    });
    if (res.code === 0) {
      setStorage(res.data);
    } else {
      message.error(res.message);
    }
  };

  useEffect(() => {
    getDatasource();
    getStorage();
  }, []);

  useEffect(() => {
    getDatasource();
    getStorage();
  }, [selectedBrand]);

  useEffect(() => {
    if (datasource.length > 0 && storage !== undefined) {
      const lastThreeMonthsData = datasource.slice(-3);
      const totalSales = lastThreeMonthsData.reduce((sum, item) => sum + item.sales, 0);
      const averageSales = Math.floor(totalSales / lastThreeMonthsData.length);
      setRestockStrategy(averageSales - storage);
    }
  }, [datasource, storage]);

  const getOption = () => ({
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const date = params[0].name;
        const sales = params.map(param => `${param.seriesName}: ${param.data}`).join('<br/>');
        return `${date}<br/>${sales}`;
      },
    },
    legend: {
      data: ['预测销量', '销量'],
      align: 'right',
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.date),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '预测销量',
        data: chartData.map(item => item.sales),
        type: 'line',
        lineStyle: {
          type: 'dashed',
          color: 'red'
        },
      },
      {
        name: '销量',
        data: chartData.slice(0, chartData.length - 3).map(item => item.sales),
        type: 'line',
        lineStyle: {
          color: 'blue',
        },
        itemStyle: {
          color: 'red',
        },
        symbol: 'circle',
        symbolSize: 8,
      },
    ],
  });
  

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
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <ReactECharts option={getOption()} style={{ height: '400px', width: '100%' }} />
        </div>

        {restockStrategy >= 0 && (
          <div style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: '4px', 
            padding: '10px', 
            backgroundColor: '#f7f7f7', 
            marginTop: '10px', 
            fontSize: '16px', 
            fontWeight: 'bold' 
          }}>
            补货策略: {selectedBrand} 需补货 {restockStrategy} 件
          </div>
        )}
        {restockStrategy >= 0 && ( // 显示随机选择的补货原因
          <div style={{ 
            border: '1px solid #d9d9d9', 
            borderRadius: '4px', 
            padding: '10px', 
            backgroundColor: '#f7f7f7', 
            marginTop: '10px', 
            fontSize: '16px', 
            fontWeight: 'bold' 
          }}>
            补货原因: {randomReason}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
