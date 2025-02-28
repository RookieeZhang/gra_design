package com.yupi.springbootinit.model.vo;

import lombok.Data;

import java.util.Date;

@Data
public class PredictVO {

    /**
     * 预测日期
     */
    private Date date;

    /**
     * 销量
     */
    private Double sales;
}
