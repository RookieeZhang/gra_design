package com.yupi.springbootinit.model.vo;

import lombok.Data;
import java.util.List;

/**
 * 品牌分析相关数据VO
 */
@Data
public class BrandAnalysisResult {

    /**
     * 规格销售数据
     */
    private List<SpecSales> specSalesList;

    /**
     * 区域销售数据
     */
    private List<RegionSales> regionSalesList;

    /**
     * 不知道为什么不写构造器会报错，所以就写了
     */
    public BrandAnalysisResult(List<SpecSales> specSalesList, List<RegionSales> regionSalesList) {
        this.specSalesList = specSalesList;
        this.regionSalesList = regionSalesList;
    }

    // 不同规格的销量数据内部类
    public static class SpecSales {
        private String specification;
        private double totalOrderAmount;

    }

    // 不同地区的销量数据内部类
    public static class RegionSales {
        private String regionName;
        private double totalOrderAmount;
    }
}