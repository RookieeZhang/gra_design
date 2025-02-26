package com.yupi.springbootinit.model.vo;

import lombok.Data;

/**
 * 客户分析图表相关数据VO
 */
@Data
public class CustomerAnalyzeVO {

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

    /**
     * 销售渠道
     */
    private String salesChannel;

    /**
     * 客户类别
     */
    private String customerCategory;

    /**
     * 订货数量
     */
    private Integer orderQuantity;

    /**
     * 投放限额
     */
    private Integer deliveryLimit;

    /**
     * 订足率
     */
    private Double orderRate;

}
