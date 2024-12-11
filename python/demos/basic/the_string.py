#!/usr/bin/env python3
# -*- coding: utf-8 -*-

s = 'Python-中文'
print(s)
print(len(s))  # 9
b = s.encode('utf-8')
print(b)
print(b.decode('utf-8'))

# 格式化
'Age: %s. Gender: %s' % (25, True)  # 'Age: 25. Gender: True'

s1 = 72
s2 = 85
r2 = (85 - 72) / 85 * 100
print(f'{r2:.1f}' + '%')