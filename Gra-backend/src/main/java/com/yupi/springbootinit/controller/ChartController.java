package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.model.enums.TimeEnum;
import com.yupi.springbootinit.model.vo.*;
import com.yupi.springbootinit.service.ChartService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/analyzeByCustomer")
    public BaseResponse<List<CustomerAnalyzeVO>> analyzeByCustomer(String salesChannel) {
        if (StringUtils.isEmpty(salesChannel)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(chartService.analyzeByCustomer(salesChannel));
    }

    @PostMapping("/analyzeByStruct")
    public BaseResponse<List<StructAnalyzeVO>> analyzeByStruct(String brand) {
        if (StringUtils.isEmpty(brand)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(chartService.analyzeByStruct(brand));
    }

    @GetMapping("/analyzeByRegion")
    public BaseResponse<List<RegionMonitorAnalyzeVO>> analyzeByRegion() {
        return ResultUtils.success(chartService.analyzeByRegion());
    }

    @GetMapping("/getAllProvince")
    public BaseResponse<List<String>> getAllProvince() {
        return ResultUtils.success(chartService.getAllProvince());
    }

    @PostMapping("/analyzeByPredict")
    public BaseResponse<List<PredictVO>> analyzeByPredict(String brand) {
        if (StringUtils.isEmpty(brand)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(chartService.analyzeByPredict(brand));
    }
}
