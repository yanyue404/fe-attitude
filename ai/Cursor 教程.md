# Cursor - AI 代码编辑器

Cursor 编辑器是一款专为现代开发者设计的 AI 驱动的代码编辑器。

Cursor 通过集成先进的大型语言模型（如GPT-4、Claude 3.5）来理解和生成代码 。

Cursor 是一款基于 Visual Studio Code (VS Code) 的现代化代码编辑器，它继承了 VS Code 的强大功能和扩展性，并在此基础上加入了 AI 辅助编程功能，旨在提升开发者的效率和代码质量。

##  特点

Cursor 基于 [VS Code](https://www.runoob.com/vscode/vscode-tutorial.html) 开发，因此它拥有 VS Code 的所有优点，例如：

-   **跨平台支持:** 支持 Windows、macOS 和 Linux 系统。

-   **丰富的插件生态系统:** 可以使用 VS Code 的庞大插件库来扩展功能。

-   **强大的代码编辑功能:** 支持语法高亮、代码补全、代码片段、代码导航等功能。

-   **集成终端:** 方便开发者直接在编辑器内运行命令。

对于熟悉 VS Code 的用户来说，Cursor 的学习成本非常低，可以快速上手。

Cursor 的最大亮点在于其内置的 AI 辅助编程功能，它可以帮助开发者：

-   **代码补全:** 根据上下文和代码风格，提供更智能、更准确的代码补全建议。

-   **代码生成:** 根据自然语言描述或代码片段，自动生成代码，例如生成函数、类、测试用例等。

-   **代码解释:** 解释代码的功能和逻辑，帮助开发者理解复杂的代码。

-   **代码调试:** 帮助开发者查找和修复代码中的错误。

这些 AI 功能可以显著提升开发效率，减少重复性工作，让开发者更专注于创造性工作。
## 基本使用

### code/cursor 命令

   - 注册 cursor 命令1：安装时勾选
   - 命令面板：Windows/Linux 快捷键: Ctrl + Shift + P，搜索安装 >shell command: install 'cursor' command in PATH ，选择后即可为系统 PATH 路径添加了 cursor 命令的引用。

### 快捷键

  - `Ctrl + L` 打开聊天窗口（chat）
  - `Ctrl + I` 打开代码代理人：生成代码（composer）
  - `Ctrl + K` 打开聊天窗口编辑代码
  - `Ctrl + J` 打开代码补全

### @ 符号

支持以下主要指令:

| **功能** | **描述** | **使用场景** |
| --- | --- | --- |
| **@Files** | 引用整个文件作为上下文。支持文件路径预览和分块处理。 | 需要引用特定文件内容时，如代码文件、文档等。 |
| **@Folders** | 引用整个文件夹作为上下文。 | 需要提供大量文件作为上下文，例如项目目录。 |
| **@Code** | 引用特定代码片段作为上下文。 | 需要针对特定代码片段进行查询或操作。 |
| **@Codebase** | 从代码库中搜索重要文件或代码块，并根据相关性重新排序。 | 需要在整个代码库中查找相关代码或文件。 |
| **@Git** | 扫描 Git 提交、差异或拉取请求，帮助查找问题。 | 需要分析 Git 相关信息，如提交记录、代码差异等。 |
| **@Web** | 搜索网络信息作为附加上下文。 | 需要获取最新网络信息或外部资源。 |
| **@Docs** | 引用预设的第三方文档或自定义文档。支持添加自定义文档。 | 需要引用外部文档或自定义知识库。 |
| **@Definitions** | 引用附近的所有定义作为上下文。 | 需要引用当前代码中的变量、函数等定义。 |
| **@Chat** | 将当前聊天消息添加为上下文。 | 在聊天中需要引用之前的对话内容。 |

**高级使用技巧**

**组合指令:** 输入 `@Files src/utils/helper.js @Codebase`，可同时引用指定文件并关联代码库全局上下文，生成高度定制化的代码。

**动态资源集成:** 粘贴以 `@` 开头的链接（如 @https://api.example.com/docs），Cursor 会自动解析内容并纳入上下文。

**隐私与配置管理:** 通过 **.cursorignore** 文件（类似 .gitignore）排除敏感文件或目录的索引。 在 `Settings > Features > Docs` 中添加自定义文档链接，增强 @Docs 的覆盖范围。

**典型应用场景示例**

**1、代码生成**

-   指令：生成用户登录功能 `@Files src/models/user.js @Docs https://jwt.io/introduction`
-   结果：基于现有用户模型和 JWT 官方文档生成安全的鉴权逻辑。

**2、错误排查**

-   指令：解释此报错原因 `@Code 12-25 行 @Git HEAD~1`
-   结果：结合代码段和最近提交历史分析潜在问题。

**3、跨文件重构**

-   指令：将类组件改为函数式组件 `@Folders src/components @Codebase`
-   结果：批量转换并确保全局样式和状态管理兼容。

## 参考

**官方文档**

- https://www.cursor.com/cn
- [Cursor 中文文档](https://cursordocs.com/docs)
- [Cursor 更新日志](https://www.cursor.com/cn/changelog)
- [Cursor 官方论坛](https://forum.cursor.com/)

**使用教程**

- [菜鸟 —— Cursor 教程](https://www.runoob.com/cursor/cursor-tutorial.html) / [VS Code AI 扩展](https://www.runoob.com/vscode/vscode-ai-extensions.html)
- [10 分钟带你解锁 Cursor 的全部潜力：从基础操作到高级技巧](https://www.ifb.me/zh/blog/backend/10-fen-zhong-jie-suo)
- [cursor 教程](https://www.youtube.com/watch?v=lypPoT8lZ2M&list=PLZ81M_gt1CZdlEQqug70vMGhthMwXOJRB)

**知乎话题**

- [Cursor 成功让我卸载了 VSCode](https://zhuanlan.zhihu.com/p/1341154936)
- [集成 GPT-4 的代码生成器 Cursor 使用体验如何？怎么用更高效？](https://www.zhihu.com/question/590152131)
- [程序员如何用好 cursor 工具？](https://www.zhihu.com/question/1339583068)
- [Cursor 和 Copilot 有哪些神仙用法？](https://www.zhihu.com/question/600101707)