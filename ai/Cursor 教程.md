# Cursor - AI 代码编辑器

Cursor 编辑器是一款专为现代开发者设计的 AI 驱动的代码编辑器。

Cursor 通过集成先进的大型语言模型（如 GPT-4、Claude 3.5）来理解和生成代码 。

Cursor 是一款基于 Visual Studio Code (VS Code) 的现代化代码编辑器，它继承了 VS Code 的强大功能和扩展性，并在此基础上加入了 AI 辅助编程功能，旨在提升开发者的效率和代码质量。

## 特点

Cursor 基于  [VS Code](https://www.runoob.com/vscode/vscode-tutorial.html)  开发，因此它拥有 VS Code 的所有优点，例如：

- **跨平台支持:**  支持 Windows、macOS 和 Linux 系统。

- **丰富的插件生态系统:**  可以使用 VS Code 的庞大插件库来扩展功能。

- **强大的代码编辑功能:**  支持语法高亮、代码补全、代码片段、代码导航等功能。

- **集成终端:**  方便开发者直接在编辑器内运行命令。

对于熟悉 VS Code 的用户来说，Cursor 的学习成本非常低，可以快速上手。

Cursor 的最大亮点在于其内置的 AI 辅助编程功能，它可以帮助开发者：

- **代码补全:**  根据上下文和代码风格，提供更智能、更准确的代码补全建议。

- **代码生成:**  根据自然语言描述或代码片段，自动生成代码，例如生成函数、类、测试用例等。

- **代码解释:**  解释代码的功能和逻辑，帮助开发者理解复杂的代码。

- **代码调试:**  帮助开发者查找和修复代码中的错误。

这些 AI 功能可以显著提升开发效率，减少重复性工作，让开发者更专注于创造性工作。

## 基本使用

### code/cursor 命令

- 注册 cursor 命令 1：安装时勾选
- 命令面板：Windows/Linux 快捷键: Ctrl + Shift + P，搜索安装 >shell command: install 'cursor' command in PATH ，选择后即可为系统 PATH 路径添加了 cursor 命令的引用。

### 快捷键

- `Ctrl + L` 打开聊天窗口（chat）
- `Ctrl + I` 打开代码代理人：生成代码（composer）
- `Ctrl + K` 打开聊天窗口编辑代码
- `Ctrl + J` 打开代码补全

### @ 符号

支持以下主要指令:

| **功能**         | **描述**                                               | **使用场景**                                    |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------- |
| **@Files**       | 引用整个文件作为上下文。支持文件路径预览和分块处理。   | 需要引用特定文件内容时，如代码文件、文档等。    |
| **@Folders**     | 引用整个文件夹作为上下文。                             | 需要提供大量文件作为上下文，例如项目目录。      |
| **@Code**        | 引用特定代码片段作为上下文。                           | 需要针对特定代码片段进行查询或操作。            |
| **@Codebase**    | 从代码库中搜索重要文件或代码块，并根据相关性重新排序。 | 需要在整个代码库中查找相关代码或文件。          |
| **@Git**         | 扫描 Git 提交、差异或拉取请求，帮助查找问题。          | 需要分析 Git 相关信息，如提交记录、代码差异等。 |
| **@Web**         | 搜索网络信息作为附加上下文。                           | 需要获取最新网络信息或外部资源。                |
| **@Docs**        | 引用预设的第三方文档或自定义文档。支持添加自定义文档。 | 需要引用外部文档或自定义知识库。                |
| **@Definitions** | 引用附近的所有定义作为上下文。                         | 需要引用当前代码中的变量、函数等定义。          |
| **@Chat**        | 将当前聊天消息添加为上下文。                           | 在聊天中需要引用之前的对话内容。                |

**高级使用技巧**

**组合指令:** 输入  `@Files src/utils/helper.js @Codebase`，可同时引用指定文件并关联代码库全局上下文，生成高度定制化的代码。

**动态资源集成:** 粘贴以  `@`  开头的链接（如 @https://api.example.com/docs），Cursor 会自动解析内容并纳入上下文。

**隐私与配置管理:** 通过  **.cursorignore**  文件（类似 .gitignore）排除敏感文件或目录的索引。 在 `Settings > Features > Docs` 中添加自定义文档链接，增强  @Docs  的覆盖范围。

**典型应用场景示例**

**1、代码生成**

- 指令：生成用户登录功能  `@Files src/models/user.js @Docs https://jwt.io/introduction`
- 结果：基于现有用户模型和 JWT 官方文档生成安全的鉴权逻辑。

**2、错误排查**

- 指令：解释此报错原因  `@Code 12-25 行 @Git HEAD~1`
- 结果：结合代码段和最近提交历史分析潜在问题。

**3、跨文件重构**

- 指令：将类组件改为函数式组件  `@Folders src/components @Codebase`
- 结果：批量转换并确保全局样式和状态管理兼容。

## 对比 cursor 的 chat 和 agent 的提示词语有什么区别

> https://github.com/yanyue404/system-prompts-and-models-of-ai-tools-chinese

要对比 **Cursor** 的 **Chat** 和 **Agent** 模式的提示词差异，我们需要基于 **system-prompts-and-models-of-ai-tools** 项目中提供的 Cursor 相关提示词内容（特别是 `cursor agent.txt` 等文件）以及对 Cursor 功能的理解。由于项目中未直接提供明确的 “Chat” 模式提示词，我们将结合 Cursor 的功能描述和社区讨论（如 GitHub 和 X 上的信息）推测 Chat 模式的提示词特性，并与 Agent 模式的提示词进行对比。

以下是对 Cursor 的 **Chat** 和 **Agent** 模式提示词的区别分析，涵盖设计目标、功能定位、上下文处理、工具调用、指令结构等方面的对比：

---

### 1. **设计目标和角色定位**

- **Chat 模式**：

  - **目标**：Chat 模式设计为通用对话接口，类似于 ChatGPT，主要用于回答用户的问题、提供代码建议或解释概念，侧重于即时交互和信息提供。
  - **角色定位**：提示词可能将 AI 定义为“通用编程助手”或“代码顾问”，强调快速响应、清晰解释和广泛的编程知识。
  - **提示词特点**：
    - 聚焦于理解用户输入（自然语言或代码片段），生成准确、简洁的回答。
    - 可能包含指令如“提供简明答案，必要时附带代码示例”或“优先解释概念，确保初学者也能理解”。
    - 不涉及复杂的代码库操作，更多是单次交互。
  - **示例推测提示**（基于功能推测，未直接来自项目）：
    ```
    I want you to act as a knowledgeable programming assistant. Answer questions clearly, provide code examples when relevant, and explain concepts in a way that is accessible to both beginners and experts. If the user provides code, suggest improvements or debug issues concisely.
    ```

- **Agent 模式**：

  - **目标**：Agent 模式设计为自主的结对编程助手，集成在 Cursor IDE 中，能够主动操作代码库，执行创建、修改、调试等任务，模拟人类开发者的协作行为。
  - **角色定位**：提示词明确将 AI 定义为“强大的自主 AI 编码助手”（参考 `cursor agent.txt`），强调与 IDE 的深度集成和任务驱动的工作流。
  - **提示词特点**：
    - 强调任务导向，处理复杂编程任务（如新建项目、修改多文件、修复 linter 错误）。
    - 包含详细的上下文利用指令（如读取打开的文件、光标位置、编辑历史）。
    - 要求生成可执行的代码更改，并确保与项目上下文一致。
  - **示例提示**（基于项目中的 `cursor agent.txt`）：
    ```
    You are a powerful autonomous AI coding assistant powered by Claude 3.7 Sonnet, running within the Cursor IDE. Your role is to act as a pair programmer, capable of creating new codebases, modifying or debugging existing ones, or answering questions. Use provided context (open files, cursor position, recent edits, linter errors) to generate precise code changes. Follow tool-calling protocols (e.g., edit_file, grep_search) and adhere to project-specific rules (e.g., .cursorrules). Ensure responses are concise, accurate, and aligned with modern coding practices.
    ```

- **区别**：
  - **Chat**：通用对话，侧重回答和建议，交互较为独立。
  - **Agent**：任务驱动，深度集成 IDE，强调代码操作和上下文感知。
  - **提示词影响**：Chat 的提示词更简洁，聚焦对话逻辑；Agent 的提示词更复杂，包含 IDE 上下文和工具调用规则。

---

### 2. **上下文处理**

- **Chat 模式**：

  - **上下文来源**：主要依赖用户输入（如问题、代码片段）以及可能的会话历史（如果启用了记忆功能）。不直接访问 IDE 的代码库状态。
  - **提示词特点**：
    - 可能包含指令如“基于用户输入提供上下文相关的回答”或“参考会话历史以保持连贯性”。
    - 不涉及动态上下文（如打开的文件、linter 错误），因此提示词较少提及 IDE 环境。
  - **示例场景**：
    - 用户问：“如何用 Python 写一个排序算法？” Chat 模式直接生成代码和解释，无需知道用户的项目结构。
  - **推测提示片段**：
    ```
    Use the user's input and conversation history to provide relevant answers. If code is provided, analyze it in isolation and suggest improvements without assuming access to a broader codebase.
    ```

- **Agent 模式**：

  - **上下文来源**：深度利用 IDE 环境，包括：
    - 当前打开的文件及其内容。
    - 光标位置、最近编辑的文件、linter 错误。
    - 项目配置文件（如 `.cursorrules`）和技术栈。
    - 代码库的目录结构（通过 `grep_search` 等工具）。
  - **提示词特点**：
    - 明确要求读取和分析上下文，如“在执行编辑前，始终读取目标文件内容”或“使用 grep_search 查找相关符号”。
    - 包含动态上下文注入的指令，确保 AI 了解项目状态。
  - **示例场景**：
    - 用户请求：“在当前 React 项目中添加一个新组件。” Agent 模式会读取项目结构、现有组件和 `.cursorrules`，生成符合技术栈的代码。
  - **实际提示片段**（参考项目）：
    ```
    Leverage provided context, including open files, cursor position, recent edits, and linter errors, to generate precise code changes. If modifying a file, read its content first unless appending small changes or creating a new file. Use grep_search to locate relevant code when needed.
    ```

- **区别**：
  - **Chat**：上下文较浅，依赖用户输入和会话历史，适合独立问题。
  - **Agent**：上下文极深，集成 IDE 状态，适合复杂项目操作。
  - **提示词影响**：Chat 的提示词简单，聚焦输入解析；Agent 的提示词复杂，需详细定义上下文获取和利用规则。

---

### 3. **工具调用**

- **Chat 模式**：

  - **工具使用**：通常不涉及工具调用，响应直接由 LLM 生成（如代码、文本解释）。
  - **提示词特点**：
    - 不包含工具调用协议，AI 仅基于内部知识和输入生成输出。
    - 可能有轻量 Roshi or similar instructions to external tools (e.g., web search, image generation).
  - **示例推测提示**：
    ```
    Generate responses based solely on your knowledge and the user's input. Do not invoke external tools or APIs. Provide code examples or explanations as needed.
    ```

- **Agent 模式**：

  - **工具使用**：广泛使用工具调用（`<tool_calling>`），包括：
    - `edit_file`：编辑文件内容，需保留未更改代码。
    - `delete_file`：删除文件并说明理由。
    - `grep_search`：搜索代码库以定位符号或模式。
    - `reapply`：调用更智能模型重新应用更改。
  - **提示词特点**：
    - 详细定义工具调用规则，如“编辑前必须读取文件内容”或“限制 linter 修复循环至 3 次”。
    - 强调工具输出的结构化格式（如 XML 标签 `<tool_calling><tool_call>...</tool_call></tool_calling>`）。
  - **实际提示片段**（参考项目）：
    ```
    When modifying code, use tool calling (e.g., edit_file, grep_search) as specified in the tool-calling protocol. Wrap tool calls in <tool_calling><tool_call>...</tool_call></tool_calling> tags. Ensure edits are precise, preserve unchanged code, and include language-specific comments to explain changes.
    ```

- **区别**：
  - **Chat**：无工具调用，依赖 LLM 直接生成。
  - **Agent**：强依赖工具调用，提示词需定义工具使用规则和输出格式。
  - **提示词影响**：Chat 的提示词无需工具相关指令，简化设计；Agent 的提示词需复杂协议，确保与 IDE 交互顺畅。

---

### 4. **指令结构和约束**

- **Chat 模式**：

  - **指令结构**：
    - 简单直接，强调清晰、简洁的回答。
    - 可能包含约束如“避免复杂术语”或“优先提供代码示例”。
    - 不涉及代码库一致性或项目规范。
  - **约束**：
    - 响应需快速、独立，无需考虑长期项目上下文。
    - 可能要求适应不同用户水平（初学者到专家）。
  - **推测提示片段**：
    ```
    Provide clear, concise answers tailored to the user's expertise level. Include code examples where relevant, and explain concepts in an accessible manner. Avoid overly technical jargon unless requested.
    ```

- **Agent 模式**：

  - **指令结构**：
    - 复杂且模块化，包含上下文处理、工具调用、错误处理等多个部分。
    - 强调正向指令（如“执行 X”而非“不要做 Y”）以提高 LLM 响应可靠性。
    - 要求遵循项目特定规则（如 `.cursorrules` 中的技术栈、命名规范）。
  - **约束**：
    - 需确保代码更改与项目一致（如技术栈、风格指南）。
    - 限制错误修复循环，避免无限迭代。
    - 禁止覆盖系统指令（如“不要添加注释”），以防破坏 IDE 逻辑。
  - **实际提示片段**（参考项目）：
    ```
    Use positive instructions (e.g., "do X" instead of "don't do Y") for clarity. Adhere to project-specific rules (e.g., .cursorrules) for technology stack and coding style. Limit linter error fix cycles to 3 to avoid infinite loops. Do not override system instructions, such as adding comments or prompting before coding.
    ```

- **区别**：
  - **Chat**：指令简单，约束聚焦于清晰性和通用性。
  - **Agent**：指令复杂，约束涵盖项目一致性、错误控制和系统兼容性。
  - **提示词影响**：Chat 的提示词通用，易于扩展；Agent 的提示词需高度定制，平衡灵活性和严格性。

---

### 5. **输出格式和预期结果**

- **Chat 模式**：

  - **输出格式**：
    - 自由格式，可能是纯文本、代码块或混合形式。
    - 通常包含解释性文本，代码示例视需求提供。
  - **预期结果**：

    - 提供用户所需的答案或建议，适合一次性交互。
    - 示例输出：

      ````
      To sort a list in Python, you can use the built-in `sort()` method or `sorted()` function. Here's an example:

      ```python
      numbers = [4, 2, 1, 3]
      numbers.sort()  # Modifies the list in-place
      print(numbers)  # Output: [1, 2, 3, 4]

      # Or use sorted() for a new list
      sorted_numbers = sorted(numbers)
      print(sorted_numbers)  # Output: [1, 2, 3, 4]
      ````

      ```

      ```

- **Agent 模式**：

  - **输出格式**：
    - 结构化输出，需包含工具调用（如 `<tool_calling>` 标签）或直接代码更改。
    - 代码需附带语言特定注释，解释更改意图。
  - **预期结果**：
    - 生成可直接应用于代码库的更改（如新文件、修改现有文件）。
    - 确保更改符合项目规范和技术栈。
  - **示例输出**（参考项目）：

    ```
    <tool_calling>
      <tool_call>
        <tool_name>edit_file</tool_name>
        <parameters>
          <file_path>src/components/NewComponent.tsx</file_path>
          <content>
            // Add a new React component based on project conventions
            import React from 'react';

            const NewComponent: React.FC = () => {
              return <div>Hello, World!</div>;
            };

            export default NewComponent;
          </content>
        </parameters>
      </tool_call>
    </tool_calling>
    ```

- **区别**：
  - **Chat**：输出灵活，适合人类阅读和理解。
  - **Agent**：输出结构化，适合 IDE 自动处理和代码库集成。
  - **提示词影响**：Chat 的提示词无需定义输出格式；Agent 的提示词需明确结构化输出规则。

---

### 6. **用户交互方式**

- **Chat 模式**：

  - **交互方式**：用户通过对话框输入问题或代码，AI 直接回复。
  - **场景**：适合快速提问、学习概念或调试小段代码。
  - **提示词特点**：
    - 强调对话流畅性，适应多样化问题。
    - 不涉及 IDE 界面交互（如光标、文件树）。
  - **示例交互**：
    - 用户：如何在 Vue 中使用 `nextTick`？
    - AI：解释 `nextTick` 的作用并提供代码示例。

- **Agent 模式**：

  - **交互方式**：用户通过 IDE 界面（如 Tab 键、命令面板）触发任务，AI 操作代码库。
  - **场景**：适合复杂编程任务，如重构代码、生成组件或修复错误。
  - **提示词特点**：
    - 强调与 IDE 的无缝集成，响应基于用户在 IDE 中的操作。
    - 可能包含指令如“根据光标位置推断用户意图”。
  - **示例交互**：
    - 用户：在 IDE 中按 Tab，请求“添加新组件”。
    - AI：生成组件代码并通过 `edit_file` 工具写入文件。

- **区别**：
  - **Chat**：对话驱动，独立于 IDE 环境。
  - **Agent**：IDE 驱动，依赖用户操作和环境状态。
  - **提示词影响**：Chat 的提示词聚焦对话逻辑；Agent 的提示词需定义 IDE 交互规则。

---

### 7. **实际案例对比**

基于你之前的提问（2025 年 3 月 27 日），你提到 Cursor 的 Chat 和 Agent 功能可用，但 Tab（可能指 Agent 的代码补全/生成）不可用。这表明：

- **Chat 模式**：你的账号仍支持对话功能，提示词可能只涉及基本对话逻辑，独立于 Tab 的 IDE 集成。
- **Agent 模式**：Tab 不可用可能与 Agent 的工具调用或 IDE 上下文处理相关，提示词中的复杂规则（如 `edit_file`、`grep_search`）可能受限于账号权限或服务器配置。

**对比分析**：

- 如果你在 Chat 模式下问“如何写一个 React 组件”，AI 会返回代码和解释，但不会修改你的项目。
- 在 Agent 模式下，AI 会生成组件代码并通过 `edit_file` 直接写入你的代码库，遵循 `.cursorrules`。

---

### 总结表

| **特性**         | **Chat 模式**                | **Agent 模式**                               |
| ---------------- | ---------------------------- | -------------------------------------------- |
| **设计目标**     | 通用对话，回答问题、提供建议 | 自主编码，操作代码库，结对编程               |
| **上下文处理**   | 用户输入、会话历史           | IDE 状态（文件、光标、linter、.cursorrules） |
| **工具调用**     | 无，依赖 LLM 知识            | 广泛使用（如 edit_file、grep_search）        |
| **指令结构**     | 简单，强调清晰性和通用性     | 复杂，包含上下文、工具、项目规范             |
| **输出格式**     | 自由格式（文本、代码）       | 结构化（工具调用、带注释代码）               |
| **用户交互**     | 对话框输入                   | IDE 操作（Tab、命令面板）                    |
| **提示词复杂度** | 低，通用且简洁               | 高，定制且详细                               |

---

### 结论

- **Chat 模式提示词**：简洁、通用，聚焦对话和单次回答，适合快速提问或学习，无需 IDE 集成。
- **Agent 模式提示词**：复杂、定制，强调上下文感知和工具调用，适合复杂编程任务，深度集成 IDE。
- **差异核心**：Chat 是独立对话工具，提示词侧重语言处理；Agent 是 IDE 增强工具，提示词侧重代码操作和环境交互。

如果你需要更具体的提示词片段对比（例如，翻译 `cursor agent.txt` 的部分内容到中文，或推测 Chat 模式的完整提示词），或者想深入分析某个功能（如工具调用的实现），请告诉我！

## 参考

**官方文档**

- https://www.cursor.com/cn
- [Cursor 中文文档](https://cursordocs.com/docs)
- [Cursor 更新日志](https://www.cursor.com/cn/changelog)
- [Cursor 官方论坛](https://forum.cursor.com/)
- [Learn Cursor](https://learn-cursor.com/docs-zh/)

**使用教程**

- [菜鸟 —— Cursor 教程](https://www.runoob.com/cursor/cursor-tutorial.html) / [VS Code AI 扩展](https://www.runoob.com/vscode/vscode-ai-extensions.html)
- [10 分钟带你解锁 Cursor 的全部潜力：从基础操作到高级技巧](https://www.ifb.me/zh/blog/backend/10-fen-zhong-jie-suo)
- [cursor 教程](https://www.youtube.com/watch?v=lypPoT8lZ2M&list=PLZ81M_gt1CZdlEQqug70vMGhthMwXOJRB)
- [Cursor 学习指南 (v2ex 网友分享)](https://flowus.cn/share/58da5f2b-f741-446e-8046-3a73e5dae836)
- [Cursor Hub](https://cursorhub.org/tutorials/basics/getting-started/introduction)

**知乎话题**

- [Cursor 成功让我卸载了 VSCode](https://zhuanlan.zhihu.com/p/1341154936)
- [集成 GPT-4 的代码生成器 Cursor 使用体验如何？怎么用更高效？](https://www.zhihu.com/question/590152131)
- [程序员如何用好 cursor 工具？](https://www.zhihu.com/question/1339583068)
- [Cursor 和 Copilot 有哪些神仙用法？](https://www.zhihu.com/question/600101707)
