package com.yupi.springbootinit.model.enums;

import org.apache.commons.lang3.ObjectUtils;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 时间枚举
 */
public enum TimeEnum {

    MONTH("lastMonth", 24L * 60L * 60 * 1000 * 30),
    SEASON("lastSeason", 24L * 60L * 60 * 1000 * 30 * 3),
    YEAR("lastYear", 24L * 60L * 60 * 1000 * 30 * 12);

    private final String text;

    private final Long value;

    TimeEnum(String text, Long value) {
        this.text = text;
        this.value = value;
    }

    /**
     * 获取值列表
     *
     * @return
     */
    public static List<Long> getValues() {
        return Arrays.stream(values()).map(item -> item.value).collect(Collectors.toList());
    }

    /**
     * 根据 value 获取枚举
     *
     * @param value
     * @return
     */
    public static TimeEnum getEnumByValue(Long value) {
        if (ObjectUtils.isEmpty(value)) {
            return null;
        }
        for (TimeEnum anEnum : TimeEnum.values()) {
            if (anEnum.value.equals(value)) {
                return anEnum;
            }
        }
        return null;
    }

    /**
     * 根据 text 获取枚举
     * @param text
     * @return
     */
    public static TimeEnum getEnumByText(String text) {
        if (ObjectUtils.isEmpty(text)) {
            return null;
        }
        for (TimeEnum anEnum : TimeEnum.values()) {
            if (anEnum.text.equals(text)) {
                return anEnum;
            }
        }
        return null;
    }

    public Long getValue() {
        return value;
    }

    public String getText() {
        return text;
    }
}
