package com.yupi.springbootinit.service.impl;

import com.yupi.springbootinit.mapper.CustomerOrdersMapper;
import com.yupi.springbootinit.model.enums.TimeEnum;
import com.yupi.springbootinit.model.vo.ChartVO;
import com.yupi.springbootinit.service.ChartService;
import com.yupi.springbootinit.service.CustomerOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 数据(销量）分析服务实现
 */
@Service
public class ChartServiceImpl implements ChartService {

    @Resource
    private CustomerOrdersMapper customerOrdersMapper;

    /**
     * 传参：根据输入的时间戳计算开始和结束时间
     * 返回：列表《日期、品牌、规格、区域》
     */
    @Override
    public List<ChartVO> analyzeByTime(String time) {
        TimeEnum enumByText = TimeEnum.getEnumByText(time);
        if (enumByText != null) {
            Long timestamp = enumByText.getValue();
            Date now = new Date();
            Date before = new Date(now.getTime() - timestamp);
            return customerOrdersMapper.listByTime(before, now);
        }
        return Collections.emptyList();
    }
}
