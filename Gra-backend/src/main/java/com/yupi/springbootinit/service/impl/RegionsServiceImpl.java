package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.yupi.springbootinit.model.entity.Regions;
import com.yupi.springbootinit.service.RegionsService;
import com.yupi.springbootinit.mapper.RegionsMapper;
import org.springframework.stereotype.Service;

/**
* @author 25020
* @description 针对表【regions(地区表)】的数据库操作Service实现
* @createDate 2025-02-26 22:33:13
*/
@Service
public class RegionsServiceImpl extends ServiceImpl<RegionsMapper, Regions>
    implements RegionsService{

}




