package com.yupi.springbootinit.service.impl;

import com.yupi.springbootinit.mapper.PriceMonitoringMapper;
import com.yupi.springbootinit.model.vo.PriceMonitoringResult;
import com.yupi.springbootinit.service.PriceMonitoringService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.List;

/**
 * 传参：string 地区
 * 返回：list，每项是该地区对应的《日期，订单金额，是否超过阈值》
 * 日期是'%Y-%m'
 */
@Service
public class PriceMonitoringServiceImpl implements PriceMonitoringService {
    @Resource
    private PriceMonitoringMapper priceMonitoringMapper;

    @Override
    public List<PriceMonitoringResult> getPriceMonitoringData(String regionName) {
        return priceMonitoringMapper.getPriceMonitoringData(regionName);
    }
}