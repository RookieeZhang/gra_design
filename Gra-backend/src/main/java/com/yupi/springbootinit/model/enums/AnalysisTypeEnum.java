package com.yupi.springbootinit.model.enums;

import org.apache.commons.lang3.ObjectUtils;

/**
 * 分析类型枚举
 */
public enum AnalysisTypeEnum {

    BRAND("品牌"),
    SPECIFICATION("规格"),
    REGION("地区");

    private final String text;

    AnalysisTypeEnum(String text) {
        this.text = text;
    }

    public String getValue() {
        return text;
    }

    /**
     * 根据 text 获取枚举
     * @param text
     * @return
     */
    public static AnalysisTypeEnum getByText(String text) {
        if (ObjectUtils.isEmpty(text)) {
            return null;
        }
        for (AnalysisTypeEnum type : AnalysisTypeEnum.values()) {
            if (type.getValue().equals(text)) {
                return type;
            }
        }
        return null;
    }

    public String getText() {
        return text;
    }
}