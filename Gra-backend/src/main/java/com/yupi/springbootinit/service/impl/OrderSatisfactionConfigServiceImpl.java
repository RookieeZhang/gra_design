package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.springbootinit.model.entity.OrderSatisfactionConfig;
import com.yupi.springbootinit.service.OrderSatisfactionConfigService;
import com.yupi.springbootinit.mapper.OrderSatisfactionConfigMapper;
import org.springframework.stereotype.Service;

/**
* @author 25020
* @description 针对表【order_satisfaction_config(订足率配置表)】的数据库操作Service实现
* @createDate 2025-02-23 23:28:45
*/
@Service
public class OrderSatisfactionConfigServiceImpl extends ServiceImpl<OrderSatisfactionConfigMapper, OrderSatisfactionConfig>
    implements OrderSatisfactionConfigService{

}




