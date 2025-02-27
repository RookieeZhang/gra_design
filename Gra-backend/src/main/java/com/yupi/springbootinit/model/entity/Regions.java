package com.yupi.springbootinit.model.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import lombok.Data;

/**
 * 地区表
 * @TableName regions
 */
@TableName(value ="regions")
@Data
public class Regions implements Serializable {
    /**
     * 地区 ID
     */
    @TableId(type = IdType.AUTO)
    private Integer id;

    /**
     * 地区名字
     */
    private String region_name;

    /**
     * 所属大区
     */
    private String affiliated_region;

    @TableField(exist = false)
    private static final long serialVersionUID = 1L;
}