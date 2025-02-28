import sys
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA
import csv
import os

# 检查命令行参数数量
if len(sys.argv) != 3:
    print("Usage: python sales_prediction.py <brand_name> <sales_data>")
    sys.exit(3)

# 获取命令行传入的品牌名称和过去 12 个月的销量数据
brand_name = sys.argv[1]
sales_data_str = sys.argv[2]

try:
    # 将销量数据字符串转换为整数列表
    sales_data = [int(x) for x in sales_data_str.split(',')]
    # 检查销量数据是否包含负数
    if any(x < 0 for x in sales_data):
        print("Sales data contains negative values.")
        sys.exit(4)
except ValueError:
    print("Invalid sales data format. Expected comma-separated integers.")
    sys.exit(5)

# 生成日期索引
date_index = pd.date_range(end=pd.Timestamp.now(), periods=len(sales_data), freq='ME')

# 创建 DataFrame
df = pd.DataFrame({'total_sales': sales_data}, index=date_index)

try:
    # 使用 ARIMA 模型进行销量预测
    model = ARIMA(df['total_sales'], order=(1, 1, 1))
    model_fit = model.fit()
except Exception as e:
    import traceback
    print(f"Error fitting ARIMA model: {e}")
    traceback.print_exc()  # 打印详细的错误堆栈信息
    sys.exit(1)

# 预测未来 3 个月的销量
forecast_3_months = model_fit.forecast(steps=3)

# 指定保存目录
save_dir = './src/main/resources'
# 如果目录不存在则创建
try:
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
except OSError as e:
    print(f"Error creating directory: {e}")
    sys.exit(40)

# 构建完整的文件路径
file_path = os.path.join(save_dir, f'{brand_name}_sales_forecast.csv')

try:
    # 将预测结果保存到 CSV 文件，同时包含过去 12 个月的数据
    with open(file_path, mode='w', newline='') as csv_file:
        fieldnames = ['period', 'sales']
        writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

        writer.writeheader()
        # 写入过去 12 个月的数据
        for index, row in df.iterrows():
            writer.writerow({'period': index.strftime('%Y-%m'), 'sales': row['total_sales']})

        # 写入未来 3 个月的预测数据
        for i, value in enumerate(forecast_3_months):
            future_month = pd.date_range(start=df.index[-1], periods=i + 2, freq='ME')[-1]
            writer.writerow({'period': future_month.strftime('%Y-%m'), 'sales': value})
except Exception as e:
    print(f"Error writing to CSV file: {e}")
    sys.exit(20)

print(f"Sales forecast for {brand_name} saved to {file_path}")