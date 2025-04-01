## learn python

- [菜鸟教程](https://www.runoob.com/python3/python3-tutorial.html)
- [廖雪峰 - Python 教程](https://liaoxuefeng.com/books/python/introduction/index.html)
- [官方 Python 教程](https://docs.python.org/zh-cn/3/tutorial/index.html)

## Python 安装

### Window 平台安装 Python:

以下为在 Window 平台上安装 Python 的简单步骤。

打开 WEB 浏览器访问  <https://www.python.org/downloads/windows/> ：

![](https://www.runoob.com/wp-content/uploads/2018/07/1bf7d20f853bf2c4a8f03c03c864982f.png)

这些链接提供了不同类型的 Python 安装文件，适用于不同类型的 Windows 系统和使用情景：

- **Download Windows installer (64-bit)**：64 位 Windows 系统的安装程序。

- **Download Windows installer (ARM64)**：适用于 ARM64 架构的 Windows 设备的安装程序。

- **Download Windows embeddable package (64-bit)**：64 位 Windows 系统的嵌入式包，可用于嵌入到应用程序中。

- **Download Windows embeddable package (32-bit)**：32 位 Windows 系统的嵌入式包，同样可用于嵌入到应用程序中。

- **Download Windows embeddable package (ARM64)**：适用于 ARM64 架构的 Windows 设备的嵌入式包。

- **Download Windows installer (32-bit)**：32 位 Windows 系统的安装程序。

记得勾选  **Add Python 3.6 to PATH**。

![](https://www.runoob.com/wp-content/uploads/2018/07/20180226150011548.png)

按  Win+R  键，输入 cmd 调出命令提示符，输入 python:

![](https://www.runoob.com/wp-content/uploads/2018/07/20170707155742110.png)

## 查看 python 版本

```bash
python -V
或
python --version
```

以上命令执行结果如下：

```bash
Python 3.13.0
```

你也可以进入 Python 的交互式编程模式，查看版本：

```bash
python

$ python
Python 3.13.0 (tags/v3.13.0:60403a5, Oct  7 2024, 09:38:07) [MSC v.1941 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> exit()
```

## 运行 Python

有三种方式可以运行 Python：

1、交互式解释器：

```bash
python

# 输入代码
print('Hello, world')

# 退出
exit()
```

2、命令行执行

在你的应用程序中通过引入解释器可以在命令行中执行 Python 脚本，如下所示：

```bash
python hello.py
```

3、集成开发环境（IDE）

vscode

```json
{
  "code-runner.executorMap": {
    "python": "set PYTHONIOENCODING=utf8 && python -u"
  }
}
```
