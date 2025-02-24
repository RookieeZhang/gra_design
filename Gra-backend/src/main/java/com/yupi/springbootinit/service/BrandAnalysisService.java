package com.yupi.springbootinit.service;

import com.yupi.springbootinit.model.vo.BrandAnalysisResult;
import java.util.List;

/**
 * 品牌分析服务
 */
public interface BrandAnalysisService {
    /**
     * 根据品牌分析数据
     * @param brandName
     * @return
     */
    BrandAnalysisResult analyzeBrand(String brandName);
}