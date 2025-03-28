#!/usr/bin/python3

# 第一个注释
print ("Hello, Python!") # 第二个注释

# 多行注释可以用多个 # 号，还有 ''' 和 """：


# 第一个注释
# 第二个注释
 
'''
第三注释
第四注释
'''
 
"""
第五注释
第六注释
"""

# 行与缩进

# python最具特色的就是使用缩进来表示代码块，不需要使用大括号 {} 。

# 缩进的空格数是可变的，但是同一个代码块的语句必须包含相同的缩进空格数。实例如下：

if True:
    print ("True")
else:
    print ("False")

# 缩进不一致，会导致错误


# 多行语句
# Python 通常是一行写完一条语句，但如果语句很长，我们可以使用反斜杠 \ 来实现多行语句，例如：

item_one= '123'
item_two= '456'
item_three= '789'
total = item_one + \
        item_two + \
        item_three

print('total:', total)

# 在 [], {}, 或 () 中的多行语句，不需要使用反斜杠 \，例如：

total2 = ['item_one', 'item_two', 'item_three',
        'item_four', 'item_five']

# 语句中包含 [], {} 或 () 括号就不需要使用多行连接符。

# 数字(Number)类型

""" python中数字有四种类型：整数、布尔型、浮点数和复数。

-   **int** (整数), 如 1, 只有一种整数类型 int，表示为长整型，没有 python2 中的 Long。
-   **bool** (布尔), 如 True。
-   **float** (浮点数), 如 1.23、3E-2
-   **complex** (复数) - 复数由实部和虚部组成，形式为 a + bj，其中 a 是实部，b 是虚部，j 表示虚数单位。如 1 + 2j、 1.1 + 2.2j
 """


# 字符串(String)

str='123456789'
 
print(str)                 # 输出字符串
print(str[0:-1])           # 输出第一个到倒数第二个的所有字符
print(str[-1])            # 输出最后一个字符
print(str[0])             # 输出第一个字符
print(str[2:5])           # 输出从第三个开始到第五个的字符
print(str[2:])            # 输出从第三个开始的后的所有字符
print(str * 2)            # 输出字符串两次
print(str + "TEST")       # 连接字符串

# 等待用户输入

# 使用 input() 函数获取用户输入

# 等待用户输入
# input("\n\n按下 enter 键后退出。")

# import 与 from...import

""" 在 python 用 import 或者 from...import 来导入相应的模块。

将整个模块(somemodule)导入，格式为： import somemodule

从某个模块中导入某个函数,格式为： from somemodule import somefunction

从某个模块中导入多个函数,格式为： from somemodule import firstfunc, secondfunc, thirdfunc

将某个模块中的全部函数导入，格式为： from somemodule import * """

# 导入整个 sys 模块
import sys
print('================Python import mode==========================')
print ('命令行参数为:')
for i in sys.argv:
    print (i)
print ('\n python 路径为',sys.path)


# 导入特定成员
from sys import argv,path  #  导入特定的成员
 
print('================python from import===================================')
print('path:',path) # 因为已经导入path成员，所以此处引用时不需要加sys.path


# 命令行参数

# 很多程序可以执行一些操作来查看一些基本信息，Python可以使用-h参数查看各参数帮助信息：

""" $ python -h
usage: python [option] ... [-c cmd | -m mod | file | -] [arg] ...
Options and arguments (and corresponding environment variables):
-c cmd : program passed in as string (terminates option list)
-d     : debug output from parser (also PYTHONDEBUG=x)
-E     : ignore environment variables (such as PYTHONPATH)
-h     : print this help message and exit

[ etc. ] """