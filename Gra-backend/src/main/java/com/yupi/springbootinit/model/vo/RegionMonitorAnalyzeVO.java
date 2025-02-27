package com.yupi.springbootinit.model.vo;

import lombok.Data;

import java.util.Date;

/**
 * 客户分析图表相关数据VO
 */
@Data
public class RegionMonitorAnalyzeVO {
    /**
     * 日期
     */
    private Date date;

    /**
     * 区域
     */
    private String region;

    /**
     * 交易总金额
     */
    private Long totalOrderAmount;

    /**
     * 是否超过阈值
     */
    private Boolean isOver;
}
