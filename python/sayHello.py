#!/usr/bin/python3
import sys

name = input("请输入你的名字：")
print(f"你好，{name}！")

print('命令行参数如下:')
for i in sys.argv:
   print(i)
 
print('\n\nPython 路径为：', sys.path, '\n')