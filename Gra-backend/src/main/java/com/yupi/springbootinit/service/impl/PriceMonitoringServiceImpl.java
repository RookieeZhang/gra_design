package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.springbootinit.model.entity.PriceMonitoring;
import com.yupi.springbootinit.service.PriceMonitoringService;
import com.yupi.springbootinit.mapper.PriceMonitoringMapper;
import org.springframework.stereotype.Service;

/**
* @author 25020
* @description 针对表【price_monitoring(价格监测表)】的数据库操作Service实现
* @createDate 2025-02-26 22:30:27
*/
@Service
public class PriceMonitoringServiceImpl extends ServiceImpl<PriceMonitoringMapper, PriceMonitoring>
    implements PriceMonitoringService{

}




