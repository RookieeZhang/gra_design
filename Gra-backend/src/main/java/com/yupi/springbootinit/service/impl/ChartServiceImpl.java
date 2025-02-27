package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.mapper.CustomerOrdersMapper;
import com.yupi.springbootinit.mapper.OrderSatisfactionConfigMapper;
import com.yupi.springbootinit.mapper.ProductsMapper;
import com.yupi.springbootinit.model.entity.PriceMonitoring;
import com.yupi.springbootinit.model.entity.Regions;
import com.yupi.springbootinit.model.enums.TimeEnum;
import com.yupi.springbootinit.model.vo.*;
import com.yupi.springbootinit.service.ChartService;
import com.yupi.springbootinit.service.PriceMonitoringService;
import com.yupi.springbootinit.service.RegionsService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 数据分析服务实现
 */
@Service
public class ChartServiceImpl implements ChartService {

    @Resource
    private CustomerOrdersMapper customerOrdersMapper;
    @Resource
    private OrderSatisfactionConfigMapper orderSatisfactionConfigMapper;
    @Resource
    private ProductsMapper productsMapper;
    @Resource
    private PriceMonitoringService priceMonitoringService;
    @Resource
    private RegionsService regionsService;

    @Override
    public List<ChartVO> analyzeByTime(String time) {
        TimeEnum enumByText = TimeEnum.getEnumByText(time);
        if (enumByText != null) {
            Long timestamp = enumByText.getValue();
            Date now = new Date();
            Date before = new Date(now.getTime() - timestamp);
            return customerOrdersMapper.listByTime(before, now);
        }
        return Collections.emptyList();
    }

    @Override
    public List<CustomerAnalyzeVO> analyzeByCustomer(String salesChannel) {
        if (StringUtils.isEmpty(salesChannel)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<OrderSatisfactionVO> orderSatisfactionVOS = customerOrdersMapper.listBySalesChannel(salesChannel);
        List<CustomerAnalyzeVO> customerAnalyzeVOS = new ArrayList<>();
        for (OrderSatisfactionVO orderSatisfactionVO : orderSatisfactionVOS) {
            CustomerAnalyzeVO customerAnalyzeVO = new CustomerAnalyzeVO();
            BeanUtils.copyProperties(orderSatisfactionVO, customerAnalyzeVO);
            customerAnalyzeVO.setOrderRate((double)orderSatisfactionVO.getOrderQuantity()/(double)orderSatisfactionVO.getDeliveryLimit());
            customerAnalyzeVOS.add(customerAnalyzeVO);
        }
        return customerAnalyzeVOS;
    }

    @Override
    public List<StructAnalyzeVO> analyzeByStruct(String brand) {
        if (StringUtils.isEmpty(brand)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return productsMapper.listByStruct(brand);
    }

    @Override
    public List<RegionMonitorAnalyzeVO> analyzeByRegion() {
        return customerOrdersMapper.listByRegion();
    }

    @Override
    public List<String> getAllProvince() {
        List<Regions> regionsList = regionsService.list();
        List<String> provinces = new ArrayList<>();
        for (Regions regions : regionsList) {
            provinces.add(regions.getRegion_name());
        }
        return provinces;
    }
}
