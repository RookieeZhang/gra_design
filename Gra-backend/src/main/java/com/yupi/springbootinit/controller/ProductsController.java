package com.yupi.springbootinit.controller;

import com.yupi.springbootinit.annotation.AuthCheck;
import com.yupi.springbootinit.common.BaseResponse;
import com.yupi.springbootinit.common.DeleteRequest;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.common.ResultUtils;
import com.yupi.springbootinit.constant.UserConstant;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.model.dto.products.ProductsRequest;
import com.yupi.springbootinit.model.dto.products.ProductsSearchRequest;
import com.yupi.springbootinit.model.entity.Products;
import com.yupi.springbootinit.service.ProductsService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * 烟草产品接口
 */
@RestController
@RequestMapping("/products")
@Slf4j
public class ProductsController {

    @Resource
    private ProductsService productsService;

    /**
     * 获取烟草产品列表
     * @return
     */
    @PostMapping("/list")
    public BaseResponse<List<Products>> listProducts(@RequestBody(required = false) ProductsSearchRequest productsSearchRequest) {
        if (productsSearchRequest == null) {
            return ResultUtils.success(productsService.list());
        }
        return ResultUtils.success(productsService.listProducts(productsSearchRequest));
    }

    @PostMapping("/add")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> addProducts(@RequestBody ProductsRequest productsRequest) {
        if (productsRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(productsService.addProducts(productsRequest));
    }

    @PostMapping("/edit")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> editProducts(@RequestBody ProductsRequest productsRequest) {
        if (productsRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(productsService.editProducts(productsRequest));
    }

    @PostMapping("/delete")
    @AuthCheck(mustRole = UserConstant.ADMIN_ROLE)
    public BaseResponse<Boolean> deleteProducts(@RequestBody DeleteRequest deleteRequest) {
        if (deleteRequest == null || deleteRequest.getId() <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(productsService.deleteById(deleteRequest.getId()));
    }

    @GetMapping("/getByBrand")
    public BaseResponse<Integer> getStorageByBrand(String brand) {
        if (StringUtils.isEmpty(brand)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return ResultUtils.success(productsService.getStorageByBrand(brand));
    }
}
