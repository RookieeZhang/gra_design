package com.yupi.springbootinit.service;

import com.yupi.springbootinit.model.vo.PriceMonitoringResult;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 价格监测服务
 */
public interface PriceMonitoringService {
    /**
     * 根据地区名称获取月份和月份销售金额
     * @param regionName 地区名称
     * @return
     */
    List<PriceMonitoringResult> getPriceMonitoringData(String regionName);
}