# Cursor - AI 代码编辑器

> https://www.cursor.com/cn

- [Cursor 成功让我卸载了 VSCode](https://zhuanlan.zhihu.com/p/1341154936)
- [第四次工业革命｜ Cursor 体验报告](https://blog.bosswnx.xyz/posts/2024/cursor-experience-review/)

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

**使用教程**

- [菜鸟 —— Cursor 教程](https://www.runoob.com/cursor/cursor-tutorial.html) / [VS Code AI 扩展](https://www.runoob.com/vscode/vscode-ai-extensions.html)
- [10 分钟带你解锁 Cursor 的全部潜力：从基础操作到高级技巧](https://www.ifb.me/zh/blog/backend/10-fen-zhong-jie-suo)
- [Cursor 完全使用指南](https://juejin.cn/post/7319433201163042850) - 掘金
- [Cursor AI 编辑器使用教程](https://www.bilibili.com/video/BV1Fh4y1X7zR/) - B 站视频教程
- [Cursor 编辑器高级功能详解](https://zhuanlan.zhihu.com/p/621644542)
- [Cursor 快捷键与常用命令大全](https://github.com/Yidadaa/Cursor-Tutorial)
- [提升编程效率的 Cursor 使用技巧](https://mp.weixin.qq.com/s/2X4cpq1aMw6PZGqB6Qh8_Q)

**知乎话题**

- [集成 GPT-4 的代码生成器 Cursor 使用体验如何？怎么用更高效？](https://www.zhihu.com/question/590152131)
- [程序员如何用好 cursor 工具？](https://www.zhihu.com/question/1339583068)
- [Cursor 和 Copilot 有哪些神仙用法？](https://www.zhihu.com/question/600101707)