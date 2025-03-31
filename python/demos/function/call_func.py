#!/usr/bin/env python3
# -*- coding: utf-8 -*-

x = abs(100)
y = abs(-20)
print(x, y)
print('max(1, 2, 3) =', max(1, 2, 3))
print('min(1, 2, 3) =', min(1, 2, 3))
print('sum([1, 2, 3]) =', sum([1, 2, 3]))

# 数据类型转换

# int() 函数可以把其他数据类型转换为整数
int('123') # 123
int(12.34) # 12
str(1.23) # '1.23'
str(100) # '100'
bool(1) # True
bool('') # False