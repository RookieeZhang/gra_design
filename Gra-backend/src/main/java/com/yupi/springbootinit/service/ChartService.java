package com.yupi.springbootinit.service;

import com.yupi.springbootinit.model.vo.*;

import java.util.List;

/**
 * 数据分析服务
 */
public interface ChartService {

    /**
     * 根据时间分析数据
     * @param time
     * @return
     */
    List<ChartVO> analyzeByTime(String time);

    /**
     * 根据客户分析数据
     * @param salesChannel
     * @return
     */
    List<CustomerAnalyzeVO> analyzeByCustomer(String salesChannel);

    /**
     * 根据结构分析数据
     * @param brand
     * @return
     */
    List<StructAnalyzeVO> analyzeByStruct(String brand);

    /**
     * 根据区域分析数据
     * @return
     */
    List<RegionMonitorAnalyzeVO> analyzeByRegion();

    /**
     * 获取所有省
     * @return
     */
    List<String> getAllProvince();

    /**
     * 根据预测分析数据
     * @param brand
     * @return
     */
    List<PredictVO> analyzeByPredict(String brand);
}
