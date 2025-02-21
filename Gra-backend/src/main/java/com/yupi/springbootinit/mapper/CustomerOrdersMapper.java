package com.yupi.springbootinit.mapper;

import com.yupi.springbootinit.model.entity.CustomerOrders;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.yupi.springbootinit.model.vo.ChartVO;

import java.util.Date;
import java.util.List;

/**
* @author 25020
* @description 针对表【customer_orders(客户订单表)】的数据库操作Mapper
* @createDate 2025-02-21 10:52:25
* @Entity com.yupi.springbootinit.model.entity.CustomerOrders
*/
public interface CustomerOrdersMapper extends BaseMapper<CustomerOrders> {

    /**
     * 根据时间分析数据
     * @param before
     * @param now
     * @return
     */
    List<ChartVO> listByTime(Date before, Date now);

}




