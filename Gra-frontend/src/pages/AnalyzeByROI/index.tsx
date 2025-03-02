import {Button, message, Select} from 'antd';
import {useEffect, useState} from "react";
import {analyzeByRoiUsingPost} from "@/services/swagger/chartController";
import ReactECharts from 'echarts-for-react';
import { color } from 'echarts';
import { getStorageByBrandUsingGet } from '@/services/swagger/productsController';

const App: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('七匹狼');
  const [datasource, setDatasource] = useState<API.ROIVO[]>([]);
  const [storage, setStorage] = useState<any>();
  const [chartData, setChartData] = useState<{ date: string; orderAmount: number; activityCost: number; ROI: number; activityName: string }[]>([]);
  const [restockStrategy, setRestockStrategy] = useState<number>(0);
  const {Option} = Select;
  
  const getOption = () => ({
    title: {
      text: 'ROI分析柱状图',
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const date = params[0].name;
        const orderAmount = params[0].data;
        const activityCost = params[1].data;
        const roi = params[2].data;
        const activityName = chartData[params[0].dataIndex].activityName;
        return `${date}<br/>活动名称: ${activityName}<br/>订单金额: ${orderAmount}<br/>活动成本: ${activityCost}<br/>ROI: ${roi}`;
      },
    },
    legend: {
      data: ['Order Amount', 'Activity Cost', 'ROI'],
    },
    xAxis: {
      type: 'category',
      data: chartData.map(item => item.date),
    },
    yAxis: [
      {
        type: 'value',
        name: '金额',
        position: 'left',
      },
      {
        type: 'value',
        name: 'ROI',
        position: 'right',
        axisLabel: {
          formatter: '{value} %',
        },
      },
    ],
    series: [
      {
        name: 'Order Amount',
        type: 'bar',
        data: chartData.map(item => item.orderAmount),
        yAxisIndex: 0,
      },
      {
        name: 'Activity Cost',
        type: 'bar',
        data: chartData.map(item => item.activityCost),
        yAxisIndex: 0,
      },
      {
        name: 'ROI',
        type: 'line',
        data: chartData.map(item => item.ROI),
        yAxisIndex: 1,
      },
    ],
  });

  const getDatasource = async () => {
    const res = await analyzeByRoiUsingPost({ brand: selectedBrand});
    if (res.code === 0) {
      setDatasource(res.data);
      const chartData = res.data.map(item => ({
        date: item.startDate.split('T')[0],
        orderAmount: Number(item.orderAmount),
        activityCost: Number(item.activityCost),
        ROI: item.roi !== undefined ? item.roi : 0,
        activityName: item.activityName || '无活动',
      }));
      console.log(chartData);
      setChartData(chartData);
    } else {
      message.error(res.message);
    }
  }

  useEffect(() => {
    getDatasource()
  }, []);

  useEffect(() => {
    getDatasource()
  }, [selectedBrand]);

  console.log('Chart Data:', chartData);

  // 找到 ROI 最高的活动
  const highestROIActivity = chartData.length > 0 
    ? chartData.reduce((prev, current) => (prev.ROI > current.ROI) ? prev : current) 
    : null;

  // 文本模板数组
  const textTemplates = [
    `本次【${highestROIActivity?.activityName}】节日促销活动，投入[${highestROIActivity?.activityCost}]元，活动期间销售额为[${highestROIActivity?.orderAmount}]元，经计算ROI达[${highestROIActivity?.ROI}]%，实现了高投入产出比，成功提升品牌知名度与产品销量，后续可参考该模式优化拓展。`,
    `在本次【${highestROIActivity?.activityName}】促销活动中，投入[${highestROIActivity?.activityCost}]元，销售额达到[${highestROIActivity?.orderAmount}]元，ROI为[${highestROIActivity?.ROI}]%，展现了良好的市场反响。`,
    `通过本次【${highestROIActivity?.activityName}】活动，投入[${highestROIActivity?.activityCost}]元，销售额为[${highestROIActivity?.orderAmount}]元，ROI达到了[${highestROIActivity?.ROI}]%，为品牌带来了显著的收益。`,
    `本次【${highestROIActivity?.activityName}】活动的投入为[${highestROIActivity?.activityCost}]元，活动期间销售额为[${highestROIActivity?.orderAmount}]元，ROI计算为[${highestROIActivity?.ROI}]%，成功提升了品牌的市场份额。`,
  ];

  // 随机选择一个文本模板
  const randomText = highestROIActivity ? textTemplates[Math.floor(Math.random() * textTemplates.length)] : '';

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
        <div style={{ display: 'flex', gap: '20px', height: '400px' }}>
          <ReactECharts
            option={getOption()}
            style={{ height: '100%', width: '100%' }}
          />
        </div>
        {/* 添加文本信息 */}
        {highestROIActivity && (
          <div style={{ marginTop: 20 }}>
            <div style={{ 
              border: '1px solid #d9d9d9', 
              borderRadius: '4px', 
              padding: '10px', 
              backgroundColor: '#f7f7f7', 
              marginTop: '10px', 
              fontSize: '16px', 
              fontWeight: 'bold' 
            }}>
              {randomText}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default App;
