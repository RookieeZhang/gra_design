package com.yupi.springbootinit.mapper;

import com.yupi.springbootinit.model.vo.BrandAnalysisResult;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BrandAnalysisMapper {
    /**
     * 根据品牌获取数据
     * @param brandName
     * @return
     */
    List<BrandAnalysisResult.SpecSales> getSpecSalesByBrand(String brandName);
    List<BrandAnalysisResult.RegionSales> getRegionSalesByBrand(String brandName);
}