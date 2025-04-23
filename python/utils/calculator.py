# Python 模块成员不需要使用 export 关键字进行导出，模块中全部成员都将自动导出。
def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("除数不能为0")
    return a / b