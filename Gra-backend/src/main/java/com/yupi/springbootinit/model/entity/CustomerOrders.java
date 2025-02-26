package com.yupi.springbootinit.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import io.swagger.models.auth.In;
import lombok.Data;

/**
 * 客户订单表
 * @TableName customer_orders
 */
@TableName(value ="customer_orders")
@Data
public class CustomerOrders implements Serializable {
    /**
     * 订单 ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 客户 ID
     */
    private Integer customer_id;

    /**
     * 产品 ID
     */
    private Integer product_id;

    /**
     * 区域 ID
     */
    private Integer region_id;

    /**
     * 销售渠道
     */
    private String sales_channel;

    /**
     * 订单日期
     */
    private Date order_date;

    /**
     * 订货数量
     */
    private Integer order_quantity;

    /**
     * 订单金额
     */
    private BigDecimal order_amount;

    /**
     * 订单订足率配置 ID
     */
    private Integer order_satisfaction_config_id;

    /**
     * 促销活动id
     */
    private Integer activity_id;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}