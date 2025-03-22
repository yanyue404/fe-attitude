# 变量赋值
counter = 100          # 整型变量
miles   = 1000.0       # 浮点型变量
name    = "runoob"     # 字符串


print (counter)
print (miles)
print (name)

# 多个变量赋值
a, b, c, d = 20, 5.5, True, 4+3j
print(type(a), type(b), type(c), type(d))
# <class 'int'> <class 'float'> <class 'bool'> <class 'complex'>

int(miles)  # 转换为一个整数


""" 标准数据类型
Python3 中常见的数据类型有：

Number（数字）
String（字符串）
bool（布尔类型）
List（列表）
Tuple（元组）
Set（集合）
Dictionary（字典）
Python3 的六个标准数据类型中：

不可变数据（3 个）：Number（数字）、String（字符串）、Tuple（元组）；
可变数据（3 个）：List（列表）、Dictionary（字典）、Set（集合）。
此外还有一些高级的数据类型，如: 字节数组类型(bytes)。 """



'''
Number（数字）
Python3 支持 int(整数类型)、float、complex（复数）。
'''
a, b, c, d = 20, 5.5, True, 4+3j
print(type(a), type(b), type(c), type(d))
# <class 'int'> <class 'float'> <class 'bool'> <class 'complex'>

# String（字符串）
name    = 'I\'m learning\nPython.'     # 字符串
print (name)
print(name[-7:-1]) #  Python 打印字符串从倒数第八个字符开始到倒数第二个字符

str = 'Runoob'  # 定义一个字符串变量

print(str)           # 打印整个字符串
print(str[0:-1])     # 打印字符串第一个到倒数第二个字符（不包含倒数第一个字符）
print(str[0])        # 打印字符串的第一个字符
print(str[2:5])      # 打印字符串第三到第五个字符（包含第五个字符）
print(str[2:])       # 打印字符串从第三个字符开始到末尾
print(str * 2)       # 打印字符串两次
print(str + "TEST")  # 打印字符串和"TEST"拼接在一起

# bool（布尔类型）

a = True
b = False
print(type(a))  # <class 'bool'>
print(type(b))  # <class 'bool'>
# 布尔类型的整数表现
print(int(True))   # 1
print(int(False))  # 0
# 使用 bool() 函数进行转换
print(bool(0))         # False
print(bool(42))        # True
print(bool(''))        # False
print(bool('Python'))  # True
print(bool([]))        # False
print(bool([1, 2, 3])) # True

# 布尔逻辑运算
print(True and False)  # False
print(True or False)   # True
print(not True)        # False

# 布尔比较运算
print(5 > 3)  # True
print(2 == 2) # True
print(7 < 4)  # False

# 布尔值在控制流中的应用
if True:
    print("This will always print")
   
if not False:
    print("This will also always print")
   
x = 10
if x:
    print("x is non-zero and thus True in a boolean context")

# 注意: 在 Python 中，所有非零的数字和非空的字符串、列表、元组等数据类型都被视为 True，只有 0、空字符串、空列表、空元组等被视为 False。因此，在进行布尔类型转换时，需要注意数据类型的真假性。

# 空值
None

# 变量

t_007 = 'T007'

# 常量
PI = 3.14159265359