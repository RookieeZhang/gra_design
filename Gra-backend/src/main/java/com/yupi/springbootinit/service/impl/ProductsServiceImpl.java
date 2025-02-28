package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.model.dto.products.ProductsRequest;
import com.yupi.springbootinit.model.dto.products.ProductsSearchRequest;
import com.yupi.springbootinit.model.entity.CustomerOrders;
import com.yupi.springbootinit.model.entity.Products;
import com.yupi.springbootinit.service.CustomerOrdersService;
import com.yupi.springbootinit.service.ProductsService;
import com.yupi.springbootinit.mapper.ProductsMapper;
import io.swagger.models.auth.In;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.List;

/**
 * @author 25020
 * @description 针对表【products(产品表)】的数据库操作Service实现
 * @createDate 2025-02-20 18:18:35
 */
@Service
public class ProductsServiceImpl extends ServiceImpl<ProductsMapper, Products>
        implements ProductsService {

    @Resource
    private CustomerOrdersService customerOrdersService;
    @Resource
    private ProductsMapper productsMapper;

    @Override
    public List<Products> listProducts(ProductsSearchRequest productsSearchRequest) {
        QueryWrapper<Products> productsQueryWrapper = new QueryWrapper<>();
        productsQueryWrapper.eq(StringUtils.isNotBlank(productsSearchRequest.getBrand()), "brand", productsSearchRequest.getBrand());
        productsQueryWrapper.like(StringUtils.isNotBlank(productsSearchRequest.getSpecification()), "specification", productsSearchRequest.getSpecification());
        productsQueryWrapper.ge(productsSearchRequest.getMinPrice() != null, "price", productsSearchRequest.getMinPrice());
        productsQueryWrapper.le(productsSearchRequest.getMaxPrice() != null, "price", productsSearchRequest.getMaxPrice());
        productsQueryWrapper.eq(StringUtils.isNotBlank(productsSearchRequest.getPrice_level()),"price_level", productsSearchRequest.getPrice_level());
        List<Products> list = this.list(productsQueryWrapper);
        return list == null ? Collections.emptyList() : list;
    }

    @Override
    public Boolean addProducts(ProductsRequest productsRequest) {
        if (productsRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        if (productsRequest.getBrand() != null && productsRequest.getSpecification() != null) {
            QueryWrapper<Products> productsQueryWrapper = new QueryWrapper<>();
            productsQueryWrapper.eq("brand", productsRequest.getBrand());
            productsQueryWrapper.eq("specification", productsRequest.getSpecification());
            if (this.count(productsQueryWrapper) > 0) {
                throw new BusinessException(ErrorCode.PARAMS_ERROR, "该品牌规格已存在");
            }
        }
        Products products = new Products();
        BeanUtils.copyProperties(productsRequest, products);
        return this.save(products);
    }

    @Override
    public Boolean editProducts(ProductsRequest productsRequest) {
        if (productsRequest == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        Products oldProducts = this.getById(productsRequest.getId());
        if (oldProducts == null) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "该烟草产品不存在");
        }
        if (productsRequest.getBrand() != null && productsRequest.getSpecification() != null) {
            QueryWrapper<Products> productsQueryWrapper = new QueryWrapper<>();
            productsQueryWrapper.eq("brand", productsRequest.getBrand());
            productsQueryWrapper.eq("specification", productsRequest.getSpecification());
            List<Products> productsList = this.list(productsQueryWrapper);
            if (!CollectionUtils.isEmpty(productsList)) {
                for (Products products : productsList) {
                    if (!products.getId().equals(productsRequest.getId())) {
                        throw new BusinessException(ErrorCode.PARAMS_ERROR, "该品牌规格已存在");
                    }
                }
            }
        }
        BeanUtils.copyProperties(productsRequest, oldProducts);
        return this.updateById(oldProducts);
    }

    @Override
    public Boolean deleteById(Long id) {
        if (id == null || id <= 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        QueryWrapper<CustomerOrders> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("id", id);
        long count = customerOrdersService.count(queryWrapper);
        if (count > 0) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR, "该烟草产品存在于销售记录中，无法删除");
        }
        return this.removeById(id);
    }

    @Override
    public Integer getStorageByBrand(String brand) {
        if (StringUtils.isEmpty(brand)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return productsMapper.getStorageByBrand(brand);
    }
}




