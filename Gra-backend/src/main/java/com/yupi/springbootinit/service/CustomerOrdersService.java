package com.yupi.springbootinit.service;

import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.model.entity.CustomerOrders;
import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.springbootinit.model.vo.ChartVO;

import java.util.Date;
import java.util.List;

/**
* @author 25020
* @description 针对表【customer_orders(客户订单表)】的数据库操作Service
* @createDate 2025-02-21 10:52:25
*/
public interface CustomerOrdersService extends IService<CustomerOrders> {

}
