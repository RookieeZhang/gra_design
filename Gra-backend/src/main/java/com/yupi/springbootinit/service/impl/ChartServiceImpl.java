package com.yupi.springbootinit.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.yupi.springbootinit.common.ErrorCode;
import com.yupi.springbootinit.exception.BusinessException;
import com.yupi.springbootinit.mapper.CustomerOrdersMapper;
import com.yupi.springbootinit.mapper.OrderSatisfactionConfigMapper;
import com.yupi.springbootinit.mapper.ProductsMapper;
import com.yupi.springbootinit.model.entity.PriceMonitoring;
import com.yupi.springbootinit.model.entity.Regions;
import com.yupi.springbootinit.model.enums.TimeEnum;
import com.yupi.springbootinit.model.vo.*;
import com.yupi.springbootinit.service.ChartService;
import com.yupi.springbootinit.service.PriceMonitoringService;
import com.yupi.springbootinit.service.RegionsService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import javax.annotation.Resource;
import java.io.*;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 数据分析服务实现
 */
@Service
public class ChartServiceImpl implements ChartService {

    private static final Logger log = LoggerFactory.getLogger(ChartServiceImpl.class);
    @Resource
    private CustomerOrdersMapper customerOrdersMapper;
    @Resource
    private OrderSatisfactionConfigMapper orderSatisfactionConfigMapper;
    @Resource
    private ProductsMapper productsMapper;
    @Resource
    private PriceMonitoringService priceMonitoringService;
    @Resource
    private RegionsService regionsService;

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

    @Override
    public List<CustomerAnalyzeVO> analyzeByCustomer(String salesChannel) {
        if (StringUtils.isEmpty(salesChannel)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<OrderSatisfactionVO> orderSatisfactionVOS = customerOrdersMapper.listBySalesChannel(salesChannel);
        List<CustomerAnalyzeVO> customerAnalyzeVOS = new ArrayList<>();
        for (OrderSatisfactionVO orderSatisfactionVO : orderSatisfactionVOS) {
            CustomerAnalyzeVO customerAnalyzeVO = new CustomerAnalyzeVO();
            BeanUtils.copyProperties(orderSatisfactionVO, customerAnalyzeVO);
            customerAnalyzeVO.setOrderRate((double)orderSatisfactionVO.getOrderQuantity()/(double)orderSatisfactionVO.getDeliveryLimit());
            customerAnalyzeVOS.add(customerAnalyzeVO);
        }
        return customerAnalyzeVOS;
    }

    @Override
    public List<StructAnalyzeVO> analyzeByStruct(String brand) {
        if (StringUtils.isEmpty(brand)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        return productsMapper.listByStruct(brand);
    }

    @Override
    public List<RegionMonitorAnalyzeVO> analyzeByRegion() {
        return customerOrdersMapper.listByRegion();
    }

    @Override
    public List<String> getAllProvince() {
        List<Regions> regionsList = regionsService.list();
        List<String> provinces = new ArrayList<>();
        for (Regions regions : regionsList) {
            provinces.add(regions.getRegion_name());
        }
        return provinces;
    }

    @Override
    public List<PredictVO> analyzeByPredict(String brand) {
        if (StringUtils.isEmpty(brand)) {
            throw new BusinessException(ErrorCode.PARAMS_ERROR);
        }
        List<String> salesDataList = customerOrdersMapper.listOrderQuantityByBrand(brand);
        // 假设的过去 12 个月的销量数据，用逗号分隔
        String salesData = String.join(",", salesDataList);

        try {
            // 构建 Python 命令，传递品牌名称和销量数据作为参数
            ProcessBuilder processBuilder = new ProcessBuilder("python", "D:\\Develop\\Graduation project\\Gra-backend\\src\\main\\resources\\sales_prediction.py", brand, salesData);
            Process process = processBuilder.start();

            // 获取 Python 脚本的标准输出
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            // 获取 Python 脚本的错误输出
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String errorLine;
            while ((errorLine = errorReader.readLine()) != null) {
                System.err.println("Error: " + errorLine);
            }

            // 等待 Python 脚本执行完成并获取退出码
            int exitCode = process.waitFor();
            System.out.println("Python script exited with code: " + exitCode);

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        List<PredictVO> predictVOS = new ArrayList<>();
        try {
            // Reading the CSV file from the classpath
            File file = ResourceUtils.getFile("D:\\Develop\\Graduation project\\Gra-backend\\src\\main\\resources\\" + brand + "_sales_forecast.csv");
            BufferedReader reader = new BufferedReader(new FileReader(file));

            String line;
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM"); // Define date format

            // Skip the header line if there is one
            reader.readLine();

            // Read the rest of the lines
            while ((line = reader.readLine()) != null) {
                // Split the line by comma
                String[] columns = line.split(",");

                // Assuming the first column is period (YYYY-MM), and the second is sales
                String period = columns[0]; // Date in YYYY-MM format
                String salesString = columns[1]; // Sales number as a string

                Date date = dateFormat.parse(period);
                Double sales = Double.parseDouble(salesString);
                PredictVO predictVO = new PredictVO();
                predictVO.setDate(date);
                predictVO.setSales(sales);
                predictVOS.add(predictVO);
            }
            reader.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException("File not found", e);
        } catch (IOException | java.text.ParseException e) {
            throw new RuntimeException("Error reading CSV", e);
        }
        return predictVOS;
    }
}
