package com.yupi.springbootinit.service;

import com.yupi.springbootinit.model.dto.products.ProductsRequest;
import com.yupi.springbootinit.model.dto.products.ProductsSearchRequest;
import com.yupi.springbootinit.model.entity.Products;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * @author 25020
 * @description 针对表【products(产品表)】的数据库操作Service
 * @createDate 2025-02-20 18:18:35
 */
public interface ProductsService extends IService<Products> {

    /**
     * 根据条件获取烟草产品列表
     *
     * @param productsSearchRequest
     */
    List<Products> listProducts(ProductsSearchRequest productsSearchRequest);

    /**
     * 添加烟草产品
     * @param productsRequest
     * @return
     */
    Boolean addProducts(ProductsRequest productsRequest);

    /**
     * 编辑烟草产品
     * @param productsRequest
     * @return
     */
    Boolean editProducts(ProductsRequest productsRequest);

    /**
     * 根据烟草产品id删除
     * @param id
     * @return
     */
    Boolean deleteById(Long id);

    /**
     * 根据品牌获取库存
     * @param brand
     * @return
     */
    Integer getStorageByBrand(String brand);
}
