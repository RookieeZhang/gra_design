package com.yupi.springbootinit.mapper;

import com.yupi.springbootinit.model.entity.Products;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yupi.springbootinit.model.vo.StructAnalyzeVO;

import java.util.List;

/**
* @author 25020
* @description 针对表【products(产品表)】的数据库操作Mapper
* @createDate 2025-02-20 18:18:35
* @Entity com.yupi.springbootinit.model.entity.Products
*/
public interface ProductsMapper extends BaseMapper<Products> {

    /**
     * 根据品牌分析结构
     * @param brand
     * @return
     */
    List<StructAnalyzeVO> listByStruct(String brand);

}




