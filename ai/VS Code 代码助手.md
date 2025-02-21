## 腾讯云代码助手

以下是腾讯云代码助手在 **VS Code** 中的最新使用指南（2025 年版本），仅保留与 VS Code 相关的内容：

---

### 一、安装与配置

1. **插件安装**

   - 打开 VS Code，进入扩展市场（`Ctrl+Shift+X`）
   - 搜索 **"Tencent Cloud AI Code Assistant"** 并安装
   - 重启 VS Code 后，点击状态栏的云图标登录腾讯云账号（支持子账号）[官方安装指南](https://cloud.tencent.com/document/product/1749/115713)

2. **网络设置**
   - 企业用户需在 `设置 > 扩展 > 腾讯云AI助手` 中配置代理（如有需要）
   - 开放防火墙对 `ai-code.tencentcloudapi.com:443` 的访问[防火墙配置](https://cloud.tencent.com/document/product/1749/112750)

---

### 二、核心功能与操作

#### 1. **智能代码生成**

| 场景           | 操作步骤                                                    |
| -------------- | ----------------------------------------------------------- |
| **单行补全**   | 输入代码时自动触发建议 → 按 `Tab` 接受                      |
| **块级生成**   | 输入自然语言描述（如 `// 用Python读取CSV文件`）后按 `Alt+I` |
| **多方案切换** | 生成建议后按 `Alt+[` 或 `Alt+]` 切换不同选项                |

#### 2. **技术对话系统**

- **打开对话**：`Ctrl+I` 或点击侧边栏图标
- **常用指令**：
  ```text
  /fix         # 修复当前错误
  /tests       # 为选中函数生成测试用例
  @workspace   # 分析当前工程结构（需开启工程理解）
  ```
- **示例**：输入 `如何优化React组件的渲染性能？` 获取针对性建议

#### 3. **快捷代码操作**

| 快捷键         | 功能                      |
| -------------- | ------------------------- |
| `Ctrl+Shift+T` | 重新生成当前建议          |
| `Ctrl+Alt+E`   | 解释选中代码              |
| `Ctrl+Shift+R` | 重构代码（提取函数/变量） |

---

### 三、高级配置

1. **生成策略优化**  
   在 `settings.json` 中添加：

   ```json
   {
     "tencent.ai.code": {
       "suggestionStyle": "block", // 生成模式：line(单行)/block(块)/smart(智能)
       "temperature": 0.7, // 创造性控制（0=保守，1=大胆）
       "maxContextLines": 20 // 参考上下文的最大行数
     }
   }
   ```

2. **私有知识库集成**

   - 配置企业文档路径：
     ```json
     "tencent.ai.ragPaths": [
       "path/to/your/docs",
       "path/to/api-specs"
     ]
     ```
   - 对话时使用 `#知识库` 前缀调用私有知识（如 `#知识库 查询支付接口规范`）

3. **企业级管理**
   - 通过腾讯云控制台分配团队许可证和 API 调用配额
   - 启用 SSO 登录（支持企业微信/飞书/OAuth2.0）[企业配置指南](https://cloud.tencent.com/document/product/1749/111914)

---

### 四、注意事项

1. **费用说明**

   - 免费版：每月 1,000 次 API 调用（仅个人账号）
   - 企业版：\$0.02/次调用，按季度预付享折扣

2. **安全建议**

   - 敏感项目需开启 `设置 > 禁止上传非公开代码`
   - 定期通过 `Ctrl+Shift+P → Tencent AI: Clear Local Cache` 清理本地缓存

3. **常见问题**
   - **补全不触发**：检查网络连接，或尝试禁用其他 AI 插件
   - **响应延迟**：降低 `maxContextLines` 值或切换至`line`生成模式
   - **中文优化**：在描述中添加中文注释可提升生成准确率 23%[实测数据](https://zhuanlan.zhihu.com/p/18166855551)

---

### 五、实战示例

**场景**：快速开发一个 Express.js 路由

1. 新建文件 `routes/user.js`
2. 输入：
   ```javascript
   // 创建GET /api/users 路由，返回Mock用户数据
   ```
3. 按 `Alt+I` 生成完整路由代码
4. 输入 `/tests` 自动生成 Jest 测试用例

如需进一步学习，可参考：[腾讯云官方教程](https://cloud.tencent.com/developer/article/2319117) 或 [知乎深度测评](https://zhuanlan.zhihu.com/p/888462479)

## GitHub Copilot

要在 VS Code 中使用 GitHub Copilot，请按照以下步骤操作：

1. **安装扩展**：

   - 打开 VS Code，进入扩展市场（快捷键 `Ctrl+Shift+X` 或 `Cmd+Shift+X`）。
   - 搜索 "GitHub Copilot"，点击安装。

2. **登录 GitHub 账户**：

   - 安装完成后，点击左下角账户图标，选择 "Sign in with GitHub"。
   - 按照提示完成浏览器授权流程。

3. **启用 Copilot**：

   - 登录后，VS Code 状态栏会显示 Copilot 图标。
   - 点击图标并选择 "Enable Copilot"。

4. **基本使用**：

   - **代码补全**：开始输入代码时，Copilot 会自动提供建议（灰色文字），按 `Tab` 接受。
   - **手动触发**：输入注释描述需求后，按 `Ctrl+Enter` 打开建议面板。
   - **代码生成**：在空行输入自然语言指令（如 "// 实现快速排序"），按 `Ctrl+Enter` 生成代码。

5. **常用快捷键**：

   - 接受建议：`Tab`
   - 拒绝建议：`Esc`
   - 打开建议面板：`Ctrl+Enter` (Windows/Linux) 或 `Cmd+Enter` (macOS)
   - 切换建议：`Alt+[`/`Alt+]` (Windows/Linux) 或 `Option+[`/`Option+]` (macOS)

6. **高级功能**：

   - **Chat 模式**：通过侧边栏 Copilot 图标或快捷键 `Ctrl+Shift+P` 打开命令面板，输入 "Start Chat"。
   - **代码解释**：选中代码后右键选择 "Explain with Copilot"。
   - **单元测试生成**：在函数下方输入注释 "// 生成单元测试"，触发建议。

7. **配置设置**：
   - 文件 > 首选项 > 设置 > GitHub Copilot：
     - `Copilot.Enable`: 总开关
     - `Copilot.Suggestions.Enabled`: 实时建议开关
     - `Copilot.AdvancedAutoCompletions`: 多行建议模式

**注意**：需要有效的 GitHub Copilot 订阅（个人版 \$10/月，学生免费）。若遇到建议延迟，可检查网络连接或尝试重启 VS Code。
</think>

要在 VS Code 中使用 GitHub Copilot，请按照以下步骤操作：

1. **安装扩展**：

   - 打开 VS Code，进入扩展市场（快捷键 `Ctrl+Shift+X` 或 `Cmd+Shift+X`）。
   - 搜索 "GitHub Copilot"，点击安装。

2. **登录 GitHub 账户**：

   - 安装完成后，点击左下角账户图标，选择 "Sign in with GitHub"。
   - 按照提示完成浏览器授权流程。

3. **启用 Copilot**：

   - 登录后，VS Code 状态栏会显示 Copilot 图标。
   - 点击图标并选择 "Enable Copilot"。

4. **基本使用**：

   - **代码补全**：开始输入代码时，Copilot 会自动提供建议（灰色文字），按 `Tab` 接受。
   - **手动触发**：输入注释描述需求后，按 `Ctrl+Enter` 打开建议面板。
   - **代码生成**：在空行输入自然语言指令（如 "// 实现快速排序"），按 `Ctrl+Enter` 生成代码。

5. **常用快捷键**：

   - 接受建议：`Tab`
   - 拒绝建议：`Esc`
   - 打开建议面板：`Ctrl+Enter` (Windows/Linux) 或 `Cmd+Enter` (macOS)
   - 切换建议：`Alt+[`/`Alt+]` (Windows/Linux) 或 `Option+[`/`Option+]` (macOS)

6. **高级功能**：

   - **Chat 模式**：通过侧边栏 Copilot 图标或快捷键 `Ctrl+Shift+P` 打开命令面板，输入 "Start Chat"。
   - **代码解释**：选中代码后右键选择 "Explain with Copilot"。
   - **单元测试生成**：在函数下方输入注释 "// 生成单元测试"，触发建议。

7. **配置设置**：
   - 文件 > 首选项 > 设置 > GitHub Copilot：
     - `Copilot.Enable`: 总开关
     - `Copilot.Suggestions.Enabled`: 实时建议开关
     - `Copilot.AdvancedAutoCompletions`: 多行建议模式

**注意**：需要有效的 GitHub Copilot 订阅（个人版 \$10/月，学生免费）。若遇到建议延迟，可检查网络连接或尝试重启 VS Code。

## Continue

https://www.continue.dev/

## 豆包 MarsCode 编程助手

字节跳动旗下的 AI 代码助手，提供智能补全、智能预测、智能问答等能力

在 VS Code 编辑器，怎么使用 DeepSeek 模型？

国内用户的最简单方法，大概就是  [MarsCode 编程助手](https://zjsms.com/iPg5wXhX/)。

它最新的 VSCode 插件（1.1.62 版本）和 JetBrains 插件（1.2.1.15 版本），都支持 DeepSeek。已经安装的朋友，IDE 内直接更新，新安装可以去[官网下载](https://zjsms.com/iPg5wXhX/)。

![](https://cdn.beekka.com/blogimg/asset/202502/bg2025021906.webp)

使用时，在 AI 对话框下方，点击模型按钮，目前有三个模型：doubao-1.5-pro、DeepSeek R1/V3（满血版）。不需要任何配置，全部免费使用。

这三个模型的能力都很强，插件效果（代码解释、注释、修复、优化、上下文问答）都表现更好了，大家可以自己比较。其中，DeepSeek R1 模型在后台由火山方舟部署，TPS（每秒 Token 生成速度）、TTFT（首 token 出现等待时间）等指标，[第三方测评结果](https://mp.weixin.qq.com/s?__biz=Mzg5NTc0MjgwMw==&mid=2247514264&idx=1&sn=d3ffa53fce70b6dc148c4a6e9df3537a&scene=58&subscene=0)称，其 DS 方案性能排名表现优异。

![](https://cdn.beekka.com/blogimg/asset/202502/bg2025021907.webp)

## 参考

- https://www.ruanyifeng.com/blog/2025/02/weekly-issue-338.html
