package com.yupi.springbootinit.model.vo;

import lombok.Data;

/**
 * 客户订足率相关数据VO
 */
@Data
public class StructAnalyzeVO {

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

}
