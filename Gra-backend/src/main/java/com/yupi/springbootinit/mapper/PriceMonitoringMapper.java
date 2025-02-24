package com.yupi.springbootinit.mapper;

import com.yupi.springbootinit.model.vo.PriceMonitoringResult;

import java.util.List;

public interface PriceMonitoringMapper {
    List<PriceMonitoringResult> getPriceMonitoringData(String regionName);
}