CREATE TABLE `customer_orders` (
                                   `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '订单 ID',
                                   `customer_id` INT(11) NOT NULL COMMENT '客户 ID',
                                   `product_id` INT(11) NOT NULL COMMENT '产品 ID',
                                   `region_id` INT(11) NOT NULL COMMENT '区域 ID',
                                   `sales_channel` VARCHAR(255) NOT NULL COMMENT '销售渠道',
                                   `order_date` DATE NOT NULL COMMENT '订单日期',
                                   `order_quantity` INT(11) NOT NULL COMMENT '订货数量',
                                   `order_amount` DECIMAL(10,2) NOT NULL COMMENT '订单金额'
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;