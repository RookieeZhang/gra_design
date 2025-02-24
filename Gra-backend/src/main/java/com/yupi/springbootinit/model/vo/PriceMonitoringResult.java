package com.yupi.springbootinit.model.vo;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

/**
 * 价格监测相关数据VO
 */
@Data
public class PriceMonitoringResult {
    /**
     * 订单日期
     */
    private Date orderDate;
    /**
     * 销售总金额
     */
    private BigDecimal totalOrderAmount;
    /**
     * 是否超过阈值
     */
    private int isAboveThreshold;
}
