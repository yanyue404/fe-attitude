# Python

- Python是一种解释型、高级通用、动态类型的编程语言

- 它也是面向对象、模块化和脚本语言。

- 在Python中，一切都被视为对象。

- Python文件的扩展名为.py

- Python使用缩进来分隔代码块，而不是花括号({})。

- 我们可以通过以下命令在cmd(Windows)或shell(mac/linux)中运行Python文件。

  `$ python <filename.py>` 或 `$ python3 <filename.py>`

#### 默认情况下，Python不需要任何导入就可以运行Python文件。

## 创建和执行程序

1. 打开终端/cmd
1. 创建程序：nano/cat > nameProgram.py
1. 编写程序并保存
1. python nameProgram.py

<br>

### 基本数据类型

| 数据类型 | 描述                              |
| -------- | --------------------------------- |
| int      | 整数值 [0, 1, -2, 3]              |
| float    | 浮点数值 [0.1, 4.532, -5.092]     |
| char     | 字符 [a, b, @, !, `]              |
| str      | 字符串 [abc, AbC, A@B, sd!, `asa] |
| bool     | 布尔值 [True, False]              |
| complex  | 复数 [2+3j, 4-1j]                 |

<br>

## 关键字

<br>

- 截至python3.8，共有35个关键字

| 关键字   | 描述                                            | 类别         |
| -------- | ----------------------------------------------- | ------------ | --- | ------------ |
| True     | 布尔值，表示不是False或1                        | 值关键字     |
| False    | 布尔值，表示不是True或0                         | 值关键字     |
| None     | 无值                                            | 值关键字     |
| and      | 如果两个操作数都为真则返回真 (其他语言中的 && ) | 操作符关键字 |
| or       | 如果任一操作数为真则返回真 (其他语言中的        |              | )   | 操作符关键字 |
| in       | 如果单词在迭代器中则返回真                      | 操作符关键字 |
| is       | 如果变量的id相同则返回真                        | 操作符关键字 |
| not      | 返回相反的布尔值                                | 操作符关键字 |
| if       | 如果表达式为真则进入代码块                      | 条件语句     |
| elif     | 用于多个if检查                                  | 条件语句     |
| else     | 如果条件为假则执行此代码块                      | 条件语句     |
| for      | 用于循环                                        | 迭代         |
| while    | 用于循环                                        | 迭代         |
| break    | 跳出循环                                        | 迭代         |
| continue | 跳过特定条件                                    | 迭代         |
| def      | 创建用户定义的函数                              | 结构         |
| class    | 创建用户定义的类                                | 结构         |
| lambda   | 创建匿名函数                                    | 结构         |
| with     | 在上下文管理器的作用域内执行代码                | 结构         |
| as       | 为某物起别名                                    | 结构         |
| pass     | 用于创建空结构(声明)                            | 结构         |
| return   | 从函数获取值，退出函数                          | 返回关键字   |
| yield    | 产生值而不是返回 (被称为生成器)                 | 返回关键字   |
| import   | 导入库/模块/包                                  | 导入         |
| from     | 从模块/包导入特定函数/类                        | 导入         |
| try      | 此代码块将尝试执行                              | 异常处理     |
| except   | 如果发生任何异常/错误，它将被执行               | 异常处理     |
| finally  | 无论是否发生异常都会执行                        | 异常处理     |
| raise    | 抛出任何特定的错误/异常                         | 异常处理     |
| assert   | 如果条件为假则抛出AssertionError                | 异常处理     |
| async    | 用于定义异步函数/协程                           | 异步编程     |
| await    | 用于指定控制权被收回的点                        | 异步编程     |
| del      | 删除/取消设置任何用户定义的数据                 | 变量处理     |
| global   | 用于访问在函数外定义的变量                      | 变量处理     |
| nonlocal | 修改不同作用域中的变量                          | 变量处理     |

<br>

## 操作符

<br>

| 操作符   | 描述                                       |
| -------- | ------------------------------------------ | --- |
| ( )      | 分组括号，函数调用，元组声明               |
| [ ]      | 数组索引，也用于声明列表等                 |
| !        | 关系非，补码，! a 产生真或假               |
| ~        | 按位非，一的补码，~a                       |
| \-       | 一元减号，- a                              |
| \+       | 一元加号，+ a                              |
| \*       | 乘法，a \* b                               |
| /        | 除法，a / b                                |
| %        | 取模，a % b                                |
| \+       | 加法，a + b                                |
| \-       | 减法，a - b                                |
| <<       | 左移，左操作数向左移动右操作数位数 (乘以2) |
| \>>      | 右移，左操作数向右移动右操作数位数 (除以2) |
| <        | 小于，结果为真或假，a %lt; b               |
| <=       | 小于等于，结果为真或假，a <= b             |
| \>       | 大于，结果为真或假，a > b                  |
| \>=      | 大于等于，结果为真或假，a >= b             |
| ==       | 等于，结果为真或假，a == b                 |
| !=       | 不等于，结果为真或假，a != b               |
| &        | 按位与，a & b                              |
| ^        | 按位异或XOR，a ^ b                         |
| \|       | 按位或，a                                  | b   |
| &&, and  | 关系与，结果为真或假，a < b && c >= d      |
| \|\|, or | 关系或，结果为真或假，a < b \|\| c >= d    |
| =        | 存储或赋值                                 |
| +=       | 加法并存储                                 |
| -=       | 减法并存储                                 |
| \*=      | 乘法并存储                                 |
| /=       | 除法并存储                                 |
| %=       | 取模并存储                                 |
| <<=      | 左移并存储                                 |
| \>>=     | 右移并存储                                 |
| &=       | 按位与并存储                               |
| ^=       | 按位异或并存储                             |
| \|=      | 按位或并存储                               |
| ,        | 分隔符，如 ( y=x,z=++x )                   |

### 基本数据结构

### 列表

- 列表是有序且可变的集合。允许重复成员。

- 列表使用方括号创建：

```python
thislist = ["apple", "banana", "cherry"]
```

- 列表项是有序的、可变的，并且允许重复值。

- 列表项被索引，第一项的索引为`[0]`，第二项的索引为`[1]`，依此类推。

- 列表是可变的，这意味着我们可以在列表创建后更改、添加和删除列表中的项目。

- 要确定列表有多少项，请使用`len()`函数。

- 列表可以包含不同的数据类型：

```python
list1 = ["abc", 34, True, 40, "male"]
```

- 创建新列表时也可以使用list()构造函数

```python
thislist = list(("apple", "banana", "cherry"))  # 注意双圆括号
```

- pop()函数默认删除给定列表中的最后一个值。

  ```python
  thislist = ["apple", "banana", "cherry"]

  print(thislist.pop())  # cherry
  print(thislist.pop(0))  #apple

  ```

### 元组

- 元组是有序且不可变的集合。允许重复成员。
- 元组是有序且不可变的集合。
- 元组用圆括号书写。

```python
thistuple = ("apple", "banana", "cherry")
```

- 元组项是有序的、不可变的，并且允许重复值。
- 元组项被索引，第一项的索引为`[0]`，第二项的索引为`[1]`，依此类推。
- 当我们说元组是有序的时，意思是项目有定义的顺序，这个顺序不会改变。

- 元组是不可变的，这意味着我们不能在元组创建后更改、添加或删除项目。
- 由于元组是索引的，元组可以有相同值的项目：
- 元组允许重复值：

```python
thistuple = ("apple", "banana", "cherry", "apple", "cherry")
```

- 要确定元组有多少项，请使用`len()`函数：

```python
thistuple = ("apple", "banana", "cherry")
print(len(thistuple))
```

- 要创建只有一个项目的元组，你必须在项目后添加逗号，否则Python不会将其识别为元组。

```python
thistuple = ("apple",)
print(type(thistuple))

# 不是元组
thistuple = ("apple")
print(type(thistuple))
```

- 也可以使用tuple()构造函数来创建元组。

```python

thistuple = tuple(("apple", "banana", "cherry")) # 注意双圆括号
print(thistuple)
```

### 集合

- 集合是无序且无索引的集合。无重复成员。
- 集合是既无序又无索引的集合。

```python
thisset = {"apple", "banana", "cherry"}
```

- 集合项是无序的、不可变的，并且不允许重复值。
- 无序意味着集合中的项目没有定义的顺序。

- 集合项每次使用时可能以不同的顺序出现，不能通过索引或键引用。

- 集合是不可变的，这意味着我们不能在集合创建后更改项目。
- 重复值将被忽略。
- 要确定集合有多少项，请使用`len()`方法。

```python
thisset = {"apple", "banana", "cherry"}

print(len(thisset))
```

- 集合项可以是任何数据类型：

```python
set1 = {"apple", "banana", "cherry"}
set2 = {1, 5, 7, 9, 3}
set3 = {True, False, False}
set4 = {"abc", 34, True, 40, "male"}
```

- 也可以使用`set()`构造函数来创建集合。

```python
thisset = set(("apple", "banana", "cherry")) # 注意双圆括号
```

- frozenset()只是集合的不可变版本。虽然集合的元素可以随时修改，但冻结集合的元素在创建后保持不变。

```python
set1 = {"apple", "banana", "cherry"}
frzset=frozenset(set1)
print(frzset)
```

### 字典

- 字典是无序且可变的集合。无重复成员。
- 字典用于存储键:值对中的数据值。
- 字典用花括号书写，并具有键和值：

```python
thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}
```

- 字典项以键:值对的形式呈现，可以通过使用键名来引用。

```python
thisdict = {
  "brand": "Ford",
  "model": "Mustang",
  "year": 1964
}
print(thisdict["brand"])
```

- 字典是可变的，这意味着我们可以在字典创建后更改、添加或删除项目。
- 字典不能有两个具有相同键的项目。
- 重复值将覆盖现有值。
- 要确定字典有多少项，请使用`len()`函数。

```python
print(len(thisdict))
```

- 字典项中的值可以是任何数据类型

```python
thisdict = {
  "brand": "Ford",
  "electric": False,
  "year": 1964,
  "colors": ["red", "white", "blue"]
}
```

- pop()函数用于从字典中删除特定值。你只能使用键而不能使用值。与列表不同，你必须给这个函数一个值

  ```python
   car = {
    "brand": "Ford",
    "model": "Mustang",
    "year": 1964
  }

  x = car.pop("model")

  print(x)# Mustang
  print(car)#{'brand': 'Ford', 'year': 1964}
  ```

### 条件分支

```python
    if condition:
        pass
    elif condition2:
        pass
    else:
        pass
```

### 循环

Python有两个原始的循环命令：

1. while循环
2. for循环

#### While循环

- 使用`while`循环，只要条件为真，我们就可以执行一组语句。
- 示例：只要i小于6就打印i

```python
i = 1
while i < 6:
  print(i)
  i += 1
```

- while循环需要准备相关变量，在这个例子中我们需要定义一个索引变量i，我们将其设置为1。
- 使用`break`语句，即使while条件为真，我们也可以停止循环
- 使用continue语句，我们可以停止当前迭代，并继续下一个迭代。

- 使用else语句，我们可以在条件不再为真时运行一个代码块。

#### For循环

- for循环用于迭代序列（即列表、元组、字典、集合或字符串）。

- 这不像其他编程语言中的for关键字，更像其他面向对象编程语言中的迭代器方法。

- 使用for循环，我们可以为列表、元组、集合等中的每个项目执行一组语句。

```python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
```

- for循环不需要预先设置索引变量。
- 要循环执行一组代码指定次数，我们可以使用range()函数。
- range()函数返回一个数字序列，默认从0开始，默认递增1，并在指定数字处结束。
- range()函数默认将序列递增1，但是可以通过添加第三个参数来指定递增值：range(2, 30, 3)。
- for循环中的else关键字指定在循环完成时要执行的代码块。
  嵌套循环是循环内的循环。

- "内部循环"将为"外部循环"的每次迭代执行一次：

```python
adj = ["red", "big", "tasty"]
fruits = ["apple", "banana", "cherry"]

for x in adj:
  for y in fruits:
    print(x, y)
```

- for循环不能为空，但如果由于某种原因你有一个没有内容的for循环，请放入pass语句以避免出错。

```python
for x in [0, 1, 2]:
  pass
```

### 函数定义

```python
def function_name():
    return
```

### 函数调用

```python
function_name()
```

- 我们不需要指定函数的返回类型。
- 函数默认返回`None`
- 我们可以返回任何数据类型。
