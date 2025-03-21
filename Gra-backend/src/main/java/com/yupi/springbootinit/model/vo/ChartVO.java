package com.yupi.springbootinit.model.vo;

import lombok.Data;

/**
 * 销量-结构分析图表相关数据VO
 */
@Data
public class ChartVO {

    /**
     * 日期
     */
    private String date;

    /**
     * 品牌
     */
    private String brand;

    /**
     * 规格
     */
    private String specification;

    /**
     * 价位
     */
    private String priceLevel;

    /**
     * 区域
     */
    private String region;

}
