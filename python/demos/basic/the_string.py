#!/usr/bin/env python3
# -*- coding: utf-8 -*-

s = 'Python-中文'
print(s)
print(len(s))  # 9
b = s.encode('utf-8')
print(b)
print(b.decode('utf-8'))


# 两位小数格式化 
print(f'{12.125:.2f}')
# 12.12

# 格式化 （如果你不太确定应该用什么，%s永远起作用，它会把任何数据类型转换为字符串：）
'Age: %s. Gender: %s' % (25, True)  # 'Age: 25. Gender: True'

s1 = 72
s2 = 85
r2 = (85 - 72) / 85 * 100
print(f'{r2:.1f}' + '%')

