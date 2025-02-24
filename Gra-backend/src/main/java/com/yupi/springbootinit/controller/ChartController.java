package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.model.enums.TimeEnum;
import com.yupi.springbootinit.model.vo.BrandAnalysisResult;
import com.yupi.springbootinit.model.vo.ChartVO;
import com.yupi.springbootinit.model.vo.PriceMonitoringResult;
import com.yupi.springbootinit.service.BrandAnalysisService;
import com.yupi.springbootinit.service.ChartService;
import com.yupi.springbootinit.service.PriceMonitoringService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 分析图表接口
 */
@RestController
@RequestMapping("/chart")
@Slf4j
public class ChartController {

    @Resource
    private ChartService chartService;

    @PostMapping("/analyzeByTime")
    public BaseResponse<List<ChartVO>> analyzeByTime(String time) {
        if (StringUtils.isEmpty(time) || TimeEnum.getEnumByText(time) == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(chartService.analyzeByTime(time));
    }


    /**
     * 价格监测
     */
    @Resource
    private PriceMonitoringService priceMonitoringService;

    @PostMapping("/price-monitoring")
    public BaseResponse<List<PriceMonitoringResult>> getPriceMonitoringData(@RequestParam String regionName) {

        if (StringUtils.isEmpty(regionName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "地区名称不能为空");
        }
        List<PriceMonitoringResult> result = priceMonitoringService.getPriceMonitoringData(regionName);
        return ResultUtils.success(result);
    }


    /**
     * 品牌分析
     */
    @Resource
    private BrandAnalysisService brandAnalysisService;

    @PostMapping("/brand-analysis")
    public BaseResponse analyzeBrand(@RequestParam String brandName) {
        if (StringUtils.isEmpty(brandName)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        BrandAnalysisResult result = brandAnalysisService.analyzeBrand(brandName);
        return ResultUtils.success(result);
    }
}
