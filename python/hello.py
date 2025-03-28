#!/usr/bin/python3
import sys

print("Hello, World!")

print('命令行参数如下:')
for i in sys.argv:
   print(i)
 
print('\n\nPython 路径为：', sys.path, '\n')