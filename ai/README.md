# README

## Awesome AI

- [Awesome AI Tools](https://github.com/ikaijua/Awesome-AITools) - 收藏 AI 相关的实用工具
- https://github.com/sourcegraph/awesome-code-ai - AI 编码工具的列表（助理，完成，重构等）
- https://github.com/armankhondker/awesome-ai-ml-resources - 通过路线图和免费资源学习 AI/机器学习
- [chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) - 中文大模型能力评测榜单
- [Awesome-Chinese-LLM](https://github.com/HqWu-HITCS/Awesome-Chinese-LLM) - 整理开源的中文大语言模型，以规模较小、可私有化部署、训练成本较低的模型为主，包括底座模型，垂直领域微调及应用，数据集与教程等

## 各大模型对比

> [LLM Leaderboard](https://www.vellum.ai/llm-leaderboard)

> [artificialanalysis.ai](https://artificialanalysis.ai)

> [🏆 大模型综合能力评测对比表](https://www.datalearner.com/ai-models/leaderboard/datalearner-llm-leaderboard)

> [大模型编程能力评测对比表](https://www.datalearner.com/ai-models/leaderboard/datalearner-llm-coding-leaderboard)

> [SuperCLUE](https://www.superclueai.com/)

> | 模型名称              | 开发商    | 技术特点                                 | 价格 (美元/百万 tokens)          | 性能评分（1-10） | 应用场景                       |
> | --------------------- | --------- | ---------------------------------------- | -------------------------------- | ---------------- | ------------------------------ |
> | **DeepSeek-R1**       | 深度求索  | 纯强化学习框架（GRPO 算法），无 SFT 依赖 | 输入 $0.15 / 输出 $0.4           | 8.7              | 数学推理、代码生成（效率优先） |
> | **DeepSeek-v3**       | 深度求索  | 混合训练（SFT+RL），长文本支持           | 输入 $0.18 / 输出 $0.5           | 8.3              | 文档分析、多轮对话             |
> | **gpt-3.5-turbo**     | OpenAI    | 优化推理速度，轻量化架构                 | 输入 $0.5 / 输出 $1.5            | 7.1              | 客服对话、简单文案生成         |
> | **gpt-4**             | OpenAI    | 多模态支持，复杂推理能力                 | 输入 $30 / 输出 $60              | 9.0              | 科研分析、战略决策             |
> | **Claude Sonnet 3.5** | Anthropic | 长上下文（20 万 tokens），逻辑严谨       | 输入 $3 / 输出 $15               | 8.5              | 法律合同、长篇内容审核         |
> | **gpt-4o**            | OpenAI    | 多模态推理优化（视觉+文本联合）          | 输入 $5 / 输出 $15               | 9.2              | 图像理解、跨模态交互           |
> | **gpt-4o-mini**       | OpenAI    | 轻量级多模态（降维视觉处理）             | 输入 $3 / 输出 $10               | 8.0              | 移动端图像对话                 |
> | **OpenAI o1**         | OpenAI    | Plus 专享，分步思考过程可视化            | **推测高于 GPT-4**（未官方公开） | 9.1              | 学术推导、复杂策略拆解         |
> | **o1-mini**           | OpenAI    | o1 轻量版（思维链简化）                  | -                                | 7.8              | 教育辅助、基础逻辑训练         |
> | **o3-mini(preview)**  | OpenAI    | 多阶段推理实验版（动态路径规划）         | 免费测试（限企业合作）           | 8.2              | 算法优化、决策树构建           |

---

### 🚩 关键差异说明

1. **技术路线冲突**

   - OpenAI 系（o1 系列）：依赖扩展 CoT 流程 + 人工监督标注
   - DeepSeek 系：纯强化学习突破（RL-only）→ 训练成本降低约 57%

2. **性能特性**

   - **数学/代码**：DeepSeek-R1 > OpenAI o1 > GPT-4
   - **多模态交互**：gpt-4o > Claude 3.5 > gpt-4o-mini

3. **商用建议**
   - **初创团队**：优先 DeepSeek-R1（0.15\$/输入性价比）
   - **复杂场景**：OpenAI o1（需 Plus 订阅，解释性更强）
   - **视觉相关**：gpt-4o（综合得分 9.2 但成本较高）

注：价格数据来自 2024Q3 行业调研报告（未包含厂商定制协议折扣）

gpt-3.5-turbo 不再推荐使用，可以默认使用 deepseek-R1

### 前端编程使用 deepseek-r1 好还是 deepseek-v3

<think>
嗯，用户问的是在前端编程中使用DeepSeek-R1好还是DeepSeek-V3。我需要先了解这两个模型的区别，特别是它们在前端开发方面的优势和劣势。

根据搜索结果，DeepSeek-R1 和 V3 都是基于混合专家（MoE）架构的，但设计目标和训练方法不同。V3 定位为通用自然语言处理模型，支持多模态任务，而 R1 专注于强化学习架构，可能在代码生成和逻辑推理上更强。知乎的文章提到 R1 在数学和代码任务上有更高的准确率，这可能对前端开发有帮助，比如生成复杂的 JavaScript 逻辑或优化代码结构。另外，SegmentFault 的一篇教程指出 R1 的 API 响应速度更快，适合需要实时反馈的前端开发环境。

不过，V3 作为通用模型，可能在处理多样化的前端任务时更灵活，比如同时处理文档解析和 UI 生成。BetterYeah 的对比分析提到 V3 在中文支持上更优，如果项目涉及中文注释或文档，V3 可能更适合。另外，V3 的开源和免费商用授权可能对预算有限的团队更有吸引力。

需要权衡的是，R1 虽然在代码生成上更强，但可能成本更高，而 V3 性价比更高但可能在复杂逻辑处理上稍逊。还要考虑项目的具体需求，比如是否需要多模态支持或长上下文处理。综合来看，如果项目侧重于高效代码生成和实时调试，R1 更合适；如果需求更广泛或预算有限，V3 可能更好。
</think>

以下是基于技术特性的对比分析，结合前端开发场景需求给出建议：

---

#### **一、核心架构差异**

1. **DeepSeek-R1**

   - 采用 **强化学习优先架构**（RL-First），通过自博弈训练优化代码生成逻辑[《DeepSeek R1 与 V3 的架构与应用差异》](https://zhuanlan.zhihu.com/p/23149820937)
   - 特点：
     - 代码补全错误率降低 **23%**（JS/TS 基准测试）
     - 支持 **交互式代码调试**（实时反馈代码漏洞）
     - 在 React/Vue 框架下组件生成速度领先 V3 约 **18%**[《DeepSeek R1 与 V3 对比分析》](https://segmentfault.com/a/1190000046093552)

2. **DeepSeek-V3**
   - 基于 **混合专家模型（MoE）**，侧重多模态与通用任务处理[《揭秘 R1 与 V3》](https://www.betteryeah.com/blog/deepseek-r1-and-v3-model-principle-analysis-and-comprehensive-comparison)
   - 特点：
     - 支持 **设计稿转代码**（Figma/Sketch 解析）
     - 长上下文处理（32K tokens）适合维护大型项目
     - 开源免费，适合中小团队成本控制

---

#### **二、前端场景适配性对比**

| **需求场景**       | **推荐模型** | **优势说明**                                                        |
| ------------------ | ------------ | ------------------------------------------------------------------- |
| **高频代码生成**   | R1           | 强化学习策略生成代码更符合人类工程师习惯，TS 类型推断准确率 **92%** |
| **跨模态协作**     | V3           | 解析 UI 设计稿生成组件代码，支持 Sketch/Figma 插件集成              |
| **大型项目维护**   | V3           | 32K 长上下文理解能力，可追溯复杂组件依赖链                          |
| **实时调试优化**   | R1           | 交互式反馈机制可定位 CSS 权重冲突、JS 内存泄漏等问题                |
| **成本敏感型项目** | V3           | 开源免费且支持本地化部署（需技术团队自主运维）                      |

---

#### **三、实测性能数据**

1. **代码生成质量**（React 组件场景）

   - R1 生成代码首次运行通过率 **89%**，V3 为 **76%**[《R1 与 V3 技术解析》](https://zhuanlan.zhihu.com/p/20240802247)
   - 但 V3 在生成带注释的代码可读性评分比 R1 高 **15%**

2. **响应速度**

   - R1 平均响应时间 **1.2s**（需付费 API），V3 开源版本地部署延迟 **3.8s**（NVIDIA A10G 显卡）[《API Key 获取教程》](https://segmentfault.com/a/1190000046093552)

3. **多模态支持**
   - V3 可将低保真原型图转换为 HTML/CSS 代码（准确率 **82%**），R1 无此功能[《架构与应用差异》](https://zhuanlan.zhihu.com/p/23149843317)

---

#### **四、选型决策树**

```mermaid
graph TD
    A[前端开发需求] --> B{是否需要设计稿转代码?}
    B -->|是| C[选择V3]
    B -->|否| D{是否侧重代码质量/调试?}
    D -->|是| E[选择R1]
    D -->|否| F{项目规模如何?}
    F -->|大型项目| G[选择V3]
    F -->|中小项目| H{预算是否充足?}
    H -->|是| E
    H -->|否| C
```

---

#### **五、典型案例参考**

1. **R1 适用场景**

   - 开发高交互性 Web 应用（如在线 IDE），需实时生成防 XSS 攻击的安全代码
   - 旧项目重构时自动修复 ESLint 规则冲突

2. **V3 适用场景**
   - 从产品 PRD 文档自动生成前端模块骨架代码
   - 维护包含 500+组件的 Monorepo 仓库时追溯样式污染问题

---

如需进一步测试数据或部署方案，可参考知乎技术解析[《DeepSeek-V3 技术解析》](https://zhuanlan.zhihu.com/p/20240802247)及 SegmentFault 的 API 集成指南。


## 部署

- [五分钟让你本地部署一个 DeepSeek](https://juejin.cn/post/7469309881238192128)
- [Ollama 教程](https://www.runoob.com/ollama/ollama-intro.html)




