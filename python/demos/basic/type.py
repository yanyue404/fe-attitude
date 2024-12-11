

'''
Number（数字）
Python3 支持 int、float、complex（复数）。
'''

counter = 100          # 整型变量
miles   = 1000.0       # 浮点型变量
s = 3.14j              # 复数变量


print (counter)
print (miles)

a, b, c, d = 20, 5.5, True, 4+3j
print(type(a), type(b), type(c), type(d))
# <class 'int'> <class 'float'> <class 'bool'> <class 'complex'>
int(miles)  # 转换为一个整数

# String（字符串）
name    = 'I\'m learning\nPython.'     # 字符串
print (name)
print(name[-7:-1]) #  Python 打印字符串从倒数第八个字符开始到倒数第二个字符

# bool（布尔类型）

a = True
b = False
print(type(a))  # <class 'bool'>
print(type(b))  # <class 'bool'>

# 空值
None

# 变量

t_007 = 'T007'

# 常量
PI = 3.14159265359