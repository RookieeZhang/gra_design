package com.yupi.springbootinit.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 * 订足率配置表
 * @TableName order_satisfaction_config
 */
@TableName(value ="order_satisfaction_config")
@Data
public class OrderSatisfactionConfig implements Serializable {
    /**
     * 配置 ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 产品 ID
     */
    private String brand;

    /**
     * 客户类别
     */
    private String customer_category;

    /**
     * 投放限额
     */
    private Integer delivery_limit;

    /**
     * 创建人
     */
    private String creator;

    /**
     * 创建时间
     */
    private Date creation_time;

    /**
     * 更新人
     */
    private String updater;

    /**
     * 更新时间
     */
    private Date update_time;

    /**
     * 是否删除
     */
    private Integer isDelete;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}