#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import math

def my_abs(x):
    # 对参数类型做检查，只允许整数和浮点数类型的参数
    if not isinstance(x, (int, float)):
        raise TypeError('bad operand type')
    if x >= 0:
        return x
    else:
        return -x

# 返回多个值
def move(x, y, step, angle=0):
    nx = x + step * math.cos(angle)
    ny = y - step * math.sin(angle)
    return nx, ny

n = my_abs(-20)
print(n)

x, y = move(100, 100, 60, math.pi / 6)
print(x, y)

# TypeError: bad operand type:
# my_abs('123')


def Foo(op, n1, n2) :
 return eval( "%d %s %d" % (n1, op, n2) )

print(Foo("+", 2, 4) )    # 返回 6
print(Foo("*", 3, 5))     # 返回 15


import math

def quadratic(a, b, c):
    d = b * b - 4 * a * c
    if d > 0:
        x1 = (-b + math.sqrt(d)) / (2 * a)
        x2 = (-b - math.sqrt(d)) / (2 * a)
        return float(f'{x1:.1f}'), float(f'{x2:.1f}')
    elif d == 0:
        x = -b / (2 * a)
        return float(f'{x:.1f}')
    elif d < 0:
        return '方程没有实解'


# 测试:
print('quadratic(2, 3, 1) =', quadratic(2, 3, 1))
print('quadratic(1, 3, -4) =', quadratic(1, 3, -4))

if quadratic(2, 3, 1) != (-0.5, -1.0):
    print('测试失败')
elif quadratic(1, 3, -4) != (1.0, -4.0):
    print('测试失败')
else:
    print('测试成功')