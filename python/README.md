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

### 1、交互式解释器：

```bash
python

# 输入代码
print('Hello, world')

# 退出
exit()
```

在 Python 中，如果你想要一个交互式命令行工具，能够提供语法提示（例如自动补全、语法高亮等功能），有几种非常流行的选择。这些工具可以增强 Python 交互式解释器的体验，尤其适合调试代码、快速测试或学习时使用。以下是一些推荐的工具及其特点：

#### 1. IPython

- **描述**: IPython 是一个功能强大的交互式 Python Shell，提供了语法高亮、自动补全、命令历史记录以及内嵌文档查看等功能。
- **安装**: 使用 pip 安装：
  ```bash
  pip install ipython
  ```
- **使用**: 在终端输入 `ipython` 即可启动。
- **特点**:
  - 输入对象后加 `.` 并按 Tab 键，可列出所有可用的方法和属性。
  - 使用 `?` 或 `??` 查看对象或函数的文档和源代码，例如 `print?`。
  - 支持多行输入和语法高亮。
  - 命令历史记录（上下箭头浏览）。

#### 2. bpython

- **描述**: bpython 是一个轻量级的交互式解释器，专注于提供实时的语法提示和自动补全。
- **安装**:
  ```bash
  pip install bpython
  ```
- **使用**: 输入 `bpython` 启动。
- **特点**:
  - 输入代码时实时显示可能的补全选项。
  - 支持语法高亮和参数提示。
  - 界面简洁，适合快速上手。

#### 3. ptpython

- **描述**: ptpython 基于 `prompt_toolkit` 库构建，支持语法高亮、自动补全、多行编辑等功能，体验接近现代 IDE。
- **安装**:
  ```bash
  pip install ptpython
  ```
- **使用**: 输入 `ptpython` 启动。
- **特点**:
  - 支持 Vim 或 Emacs 风格的按键绑定。
  - 提供自动补全和语法提示。
  - 可自定义配置，例如主题和快捷键。

#### 4. Python 自带 IDLE

- **描述**: Python 官方自带的 IDLE 是一个简单的交互式环境，适合初学者，虽然功能不如上述工具强大，但自带语法高亮和基本补全。
- **安装**: 随 Python 安装，默认可用。
- **使用**: 在终端输入 `python -m idlelib` 或通过系统菜单启动。
- **特点**:
  - 基本语法高亮和补全。
  - 跨平台支持。
  - 适合轻量级使用。

#### 5. prompt_toolkit (自定义开发)

- **描述**: 如果你想自己开发一个带有语法提示的交互式命令行工具，可以使用 `prompt_toolkit` 库。它是一个底层的 Python 库，提供了构建交互式命令行应用的基础。
- **安装**:
  ```bash
  pip install prompt_toolkit
  ```
- **示例代码**:

  ```python
  from prompt_toolkit import PromptSession
  from prompt_toolkit.completion import WordCompleter

  # 定义补全词汇
  python_completer = WordCompleter(['print', 'def', 'class', 'import'], ignore_case=True)
  session = PromptSession('>>> ', completer=python_completer, complete_while_typing=True)

  while True:
      code = session.prompt()
      try:
          exec(code)
      except Exception as e:
          print(f"Error: {e}")
  ```

- **特点**: 可高度定制，适合需要特定功能的开发者。

**推荐**

- **初学者**: 建议从 `IPython` 开始，功能全面且易用。
- **轻量需求**: 试试 `bpython`，启动快且直观。
- **高级用户**: 使用 `ptpython` 或基于 `prompt_toolkit` 定制。

这些工具都能显著提升 Python 交互式命令行的体验，尤其是语法提示和自动补全功能。如果你有具体需求（例如需要集成到某个项目中），可以告诉我，我再帮你细化建议！

### 2、命令行执行

在你的应用程序中通过引入解释器可以在命令行中执行 Python 脚本，如下所示：

```bash
python hello.py
```

### 3、集成开发环境（IDE）

vscode

```json
{
  "code-runner.executorMap": {
    "python": "set PYTHONIOENCODING=utf8 && python -u"
  }
}
```
