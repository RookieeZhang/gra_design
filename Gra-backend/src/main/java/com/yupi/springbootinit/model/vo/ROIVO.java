package com.yupi.springbootinit.model.vo;

import lombok.Data;

import java.util.Date;

@Data
public class ROIVO {

    /**
     * 销售金额
     */
    private Long orderAmount;

    /**
     * 活动花费
     */
    private Long activityCost;

    /**
     * 活动日期
     */
    private Date startDate;

    /**
     * 结束日期
     */
    private Date endDate;

    /**
     * ROI
     */
    private Double ROI;

    /**
     *
     */
    private String activityName;

}
