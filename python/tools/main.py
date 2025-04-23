import sys
import os

# 获取 python 目录的绝对路径
python_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# 将 python 目录添加到 Python 路径
sys.path.insert(0, python_dir)


# 从模块导入特定成员
""" from utils.calculator import multiply
result = multiply(1234, 4321)
print(result) """

# 从模块导入特定成员，并重命名
""" from utils.calculator import multiply as mul
result = mul(1234, 4321)
print(result) """

# 从模块导入所有成员
""" from utils.calculator import *
result = multiply(1234, 4321)
print(result) """

# 从模块导入所有成员，并重命名
import utils.calculator as calc

result = calc.multiply(1234, 4321)
print(result)




