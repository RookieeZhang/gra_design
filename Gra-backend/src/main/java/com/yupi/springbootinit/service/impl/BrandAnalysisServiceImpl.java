package com.yupi.springbootinit.service.impl;

import com.yupi.springbootinit.mapper.BrandAnalysisMapper;
import com.yupi.springbootinit.model.vo.BrandAnalysisResult;
import com.yupi.springbootinit.service.BrandAnalysisService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;

/**
 * 品牌分析服务实现
 */
@Service
public class BrandAnalysisServiceImpl implements BrandAnalysisService {

    @Resource
    private BrandAnalysisMapper brandAnalysisMapper;

    /**
     * 传参：品牌
     * 返回：两个list，一个是specSalesList规格销售数据，
     *               一个是regionSalesList地区销售数据
     *
     */
    @Override
    public BrandAnalysisResult analyzeBrand(String brandName) {
        List<BrandAnalysisResult.SpecSales> specSalesList = brandAnalysisMapper.getSpecSalesByBrand(brandName);
        List<BrandAnalysisResult.RegionSales> regionSalesList = brandAnalysisMapper.getRegionSalesByBrand(brandName);

        if (specSalesList.isEmpty() && regionSalesList.isEmpty()) {
            // 处理匹配不成功的情况
            specSalesList = Collections.emptyList();
            regionSalesList = Collections.emptyList();
        }

        return new BrandAnalysisResult(specSalesList, regionSalesList);
    }
}