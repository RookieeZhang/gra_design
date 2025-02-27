package com.yupi.springbootinit.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import lombok.Data;

/**
 * 价格监测表
 * @TableName price_monitoring
 */
@TableName(value ="price_monitoring")
@Data
public class PriceMonitoring implements Serializable {
    /**
     * 监测记录 ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 区域 ID
     */
    private Integer region_id;

    /**
     * 监测阈值
     */
    private BigDecimal monitoring_threshold;

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