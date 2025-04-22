# -*- coding: utf-8 -*-

import calendar
from datetime import date

def generateMonthArray(year, month):
    """
    生成指定年月的日期数组，每个元素包含日期、星期几、是否周末和周数信息
    
    参数:
        year: 年份，如 2025
        month: 月份，如 4
        
    返回:
        包含日期信息的字典列表
    """
    days_in_week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    date_array = []

    # 获取该月的天数
    days_in_month = calendar.monthrange(year, month)[1]

    # 遍历每一天
    for day in range(1, days_in_month + 1):
        current_date = date(year, month, day)
        week_day = current_date.weekday()  # 获取星期几 (0=星期一, 6=星期日)
        is_weekend = week_day == 5 or week_day == 6  # 判断是否为周末 (5=星期六, 6=星期日)
        week_number = (day + calendar.monthrange(year, month)[0] - 1) // 7 + 1  # 计算第几周

        date_array.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "dayOfWeek": days_in_week[(week_day + 1) % 7],  # 转换为从星期日开始
            "isWeekend": is_weekend,
            "weekNumber": week_number
        })

    return date_array 