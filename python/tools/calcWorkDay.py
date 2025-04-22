from pprint import pprint
import sys
import os

# 获取 python 目录的绝对路径
python_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 将 python 目录添加到 Python 路径
sys.path.insert(0, python_dir)

# 现在尝试导入
from utils.date_utils import generateMonthArray

four_month_array = generateMonthArray(2025, 4)
five_month_array = generateMonthArray(2025, 5)

# 行政 遇上周六日是 N
rule = ['白', '夜', 'N', '行']
zong = rule * 20

# print("zong：", zong)

months = four_month_array + five_month_array
# print("months:", months)

temp = []

for index, day in enumerate(zong[1:60]):
    # dict 创建字典
    new_day = dict(months[index])

    new_day['state'] = 'N' if day == '行' and new_day['isWeekend'] else day

    # 根据条件设置 state（Python 的条件表达式）
    # if (hasattr(day, 'isWeekend') and day.isWeekend and day == '行'):
    #  new_day['state'] = 'N' 
    # else:
    #  new_day['state'] = day 

    temp.append(new_day)
    
# print(temp)

result = []

for day in temp:
   formatted_day = f"{day['date']}（{day['dayOfWeek']}）第{day['weekNumber']}周， 状态【 {day['state']} 】"
   result.append(formatted_day)

pprint(result)
