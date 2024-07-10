## 免费 AI 使用

- [GPT-GOD](https://gptgod.online/) （每天签到可免费提问 gpt 3.5 200 个问题）
- [Monica AI](https://monica.im/) sider、Monica、Docky.AI

**国产**

> [中国 AI 智能助手 5 月用户数据报告｜量子位智库](https://mp.weixin.qq.com/s/sYxbvown5qLBnEs7zIR6Bg)

- [豆包 AI](https://www.doubao.com/chat/) 字节
- [Kimi 智能助手](https://kimi.moonshot.cn/)
- [文心一言](https://yiyan.baidu.com/) 百度
- [元宝](https://yuanbao.tencent.com/chat) 腾讯
- [智谱清言](https://chatglm.cn/) 智谱 A
- [讯飞星火](https://xinghuo.xfyun.cn/)
- [通义千问](https://tongyi.aliyun.com/qianwen/)

**编程**

- [GitHub Copliot](https://github.com/features/copilot)
- [CodeFuse(蚂蚁百灵)](https://codefuse.alipay.com/) 免费
- 腾讯云 AI 代码助手

## 免费 ChatGPT API

- [GPT-GOD](https://gptgod.online/)
- [GPT_API_free](https://github.com/chatanywhere/GPT_API_free) [文档](https://chatanywhere.apifox.cn/)
- [302.AI](https://302.ai/)

**1. 非流接入**

```js
const axios = require("axios");

async function getChatGptResponse(prompt) {
  const url= 'https://api.gptgod.online/v1/chat/completions',
  const headers = {
    Authorization: "Bearer YOUR_OPENAI_API_KEY",
    "Content-Type": "application/json",
  };
  const data = {
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// 使用示例
getChatGptResponse("gpt-3.5-turbo 、gpt-3.5-turbo-16k 、 gpt-4 版本的模型有什么详细的区别?").then((response) => {
  /* GPT-3.5-turbo、GPT-3.5-turbo-16k 和 GPT-4 是 OpenAI 发布的不同版本的语言模型。它们在能力、参数、应用场景和价格等方面有所不同。以下是这些版本的详细区别：

    ### GPT-3.5-turbo
    - **参数规模**：具体参数尚未公开，但相比 GPT-3 有优化。
    - **性能**：相比于 GPT-3 标准版本（如 DaVinci），在许多任务上提供了更快的响应时间，同时在一些任务上性能也有提升。
    - **应用场景**：适用于一般的对话、生成内容、回答问题等任务。
    - **价格**：相对较低，更具性价比，尤其适合高频率 API 调用。

    ### GPT-3.5-turbo-16k
    - **参数规模**：同样具体参数尚未公开，但提供了更大的上下文窗口。
    - **性能**：拥有 16k tokens 的上下文长度，适用于处理更长的对话或更大篇幅的文本。
    - **应用场景**：适合需要处理大量上下文信息的任务，如长篇文章生成、复杂对话管理等。
    - **价格**：价格较GPT-3.5-turbo版本稍高，但在处理长对话或长文档时表现更优。

    ### GPT-4
    - **参数规模**：更大的参数规模（具体数量未公开），相比于 GPT-3.5 系列有显著提高。
    - **性能**：
      - 更高的准确性和流畅性，尤其在复杂任务上表现更出色。
      - 更强的推理能力和自然语言理解能力。
    - **多模态能力**：GPT-4 可以处理图像输入（这是一个巨大的改进），不仅限于文本输入。
    - **应用场景**：
      - 高级对话系统、复杂内容生成、高复杂度的任务。
      - 教育、医疗、法律等领域的专业应用。
    - **价格**：相比 GPT-3.5 和 GPT-3.5-turbo 版本更高，但对应的性能与能力提升显著。

    ### 总结
    - **GPT-3.5-turbo**：适合普通的对话和文本生成任务，具有较高的性价比。
    - **GPT-3.5-turbo-16k**：适合需要处理长文本或长对话的任务，拥有更大的上下文窗口。
    - **GPT-4**：性能最强，适合专业性强、高复杂度的任务，有更好的自然语言理解和生成能力，甚至可以处理图像输入。

    选择哪个模型版本应根据具体的应用场景和预算来决定。 */
  console.log(response?.choices?.[0]?.message?.content);
});
```

**2. 流接入**

```js
import es from 'event-stream'
import axios from 'axios'

async function chat() {
  const res = await axios({
    url: 'https://api.gptgod.online/v1/chat/completions',
    method: 'post',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    // gpt-3.5-turbo
    data: {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: 'Hello, how are you?' }
      ],
      stream: true
    },
    responseType: 'stream'
  })
  res.data
    .pipe(es.split())
    .pipe(es.split(/\r?\n\r?\n/))
    .on('data', (chunk: any) => {
      const dataStr = chunk.replace('data: ', '')
      if (dataStr === '[DONE]') {
        return
      }
      const data = JSON.parse(dataStr)
      const [
        {
          delta: { content = '' },
          finish_reason
        }
      ] = data.choices
      console.log(`recv content: ${content}`)
    })
    .on('close', () => {
      console.log('stream end')
    })
}
```

## 疑问解答

1. 什么是 gpt ？

GPT 是“Generative Pre-trained Transformer”的缩写，翻译为中文即“生成式预训练转换器”。GPT 是一种基于深度学习的语言模型架构，由 OpenAI 团队开发。它基于 Transformer 架构，通过在海量的文本数据上进行预训练，学习到语言规律和语义关系，然后可以应用于各种自然语言处理任务，例如文本生成、问答系统、机器翻译等。

GPT 模型以前训练的语言知识为基础，可以根据输入的文本生成连贯、富有语义的输出。它使用自回归的方式，逐词生成预测下一个词的概率分布，因此可以用来生成新文本、回答问题或完成其他文本生成任务。

最初的 GPT 模型是 GPT-1，在此基础上，OpenAI 推出了多个更新版本，如 GPT-2、GPT-3 等，每个版本都迭代改进了模型的性能和生成能力。这些 GPT 模型在自然语言处理领域取得了很大的研究突破，并被广泛应用于各种实际应用中。

2. gpt-3.5-turbo 、gpt-3.5-turbo-16k 、 gpt-4 版本的模型有什么详细的区别

gpt-3.5-turbo、gpt-3.5-turbo-16k 和 gpt-4 是 OpenAI 的语言模型版本，在以下方面有详细的区别：

模型大小：gpt-3.5-turbo-16k 的模型比 gpt-3.5-turbo 的模型大 16 倍，而 gpt-4 的模型相对更大。较大的模型通常意味着更多的参数和更强大的模型性能。

文本限制：gpt-3.5-turbo 支持的最大文本输入限制为 4096 个令牌，而 gpt-3.5-turbo-16k 支持的最大文本输入限制为 16384 个令牌。相比之下，gpt-4 的文本限制还要更高，但具体数值可能因发布时的具体配置而有所不同。

性能和生成能力：随着模型的迭代升级，新版本往往会带来更强大的性能和生成能力。随着模型升级到 gpt-4，您可以期待更加准确、多样和有创造性的输出。

这些是这三个版本之间的一些主要区别。一般来说，较新的版本将具有更好的性能和功能，但在选择模型时，可能需要权衡模型大小、资源消耗和具体任务需求。

补充： gpt-3.5-turbo-16k 知识更新日期（2022 年 10 月）

3. 什么是 SSE？

[为什么 ChatGPT 采用 SSE 协议而不是 Websocket？](https://juejin.cn/post/7317704464999120905)

4. 什么是大模型？

**大模型**是指具有大规模参数和复杂结构的人工智能模型。

大模型通常基于深度学习技术，通过在海量的数据上进行训练，从而学习到各种知识和模式。

这些模型具有强大的语言理解、生成、推理等能力。例如，像 ChatGPT 这样的大语言模型，能够生成自然流畅的文本，回答各种问题，进行对话，甚至能够进行一定程度的逻辑推理和创造性写作。

大模型的参数数量往往达到数十亿甚至数千亿级别，这使得它们能够捕捉到极其丰富和细致的语言特征和语义信息。

以图像识别领域的大模型为例，它们可以准确识别和分类各种复杂的图像场景。

在实际应用中，大模型被广泛应用于自然语言处理、计算机视觉、语音识别、智能客服、智能写作等众多领域，为人们的生活和工作带来了极大的便利和效率提升。但同时，大模型的发展也带来了一些挑战，如计算资源需求巨大、数据隐私保护、可能产生的偏差和误导等问题。

**了解更多**

- [掘金小册 - 人工智能](https://juejin.cn/course/ai)

## 开发的 AI 应用

- [用智谱清言，手搓了一个今年高考作文 + 批改的 AI 应用](https://juejin.cn/post/7379496229725241383)
- [告别轮询，SSE 流式传输可太香了！](https://juejin.cn/post/7355666189475954725?searchId=202407041509308717A4AFF50E9E9F1783)
- [mi-gpt](https://github.com/idootop/mi-gpt) 🏠 将小爱音箱接入 ChatGPT 和豆包，改造成你的专属语音助手。

## \*\*常见软件/插件使用方法：

> 参考： https://buyca.shop/buy/10

以下所有插件均为我们实际体验后感觉不错的软件/插件，但不是我们的产品，我们不对以下产品的行为负责

### **Python** **OpenAI\*\***库修改 Host(AutoGPT)\*\*

**方法一：**

```
from openai import OpenAIclient = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    api_key="YOUR API KEY",
    base_url="https://api.chatanywhere.tech/v1"
    # base_url="https://api.chatanywhere.cn/v1"
)
```

**方法二：**

修改环境变量，各个系统怎么改环境变量请自行百度，修改环境变量后不起作用请重启系统。

```
OPENAI_API_BASE=https://api.chatanywhere.tech/v1
```

### **开源 gpt_academic**

找到`config.py`文件中的`API_URL_REDIRECT`配置并修改为以下内容：

```
API_URL_REDIRECT = {"https://api.openai.com/v1/chat/completions": "https://api.chatanywhere.tech/v1/chat/completions"}
```

### **ChatBox(推荐使用)**

ChatGPT 开源桌面应用，支持全部桌面平台。

下载链接：<https://github.com/Bin-Huang/chatbox/releases>

网页版地址: https://web.chatboxai.app

使用方法：如图在设置中填入购买的密钥，并将代理设置为**`https://api.chatanywhere.tech`**即可

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGRlYjE2ZjcxOTA4YzJmYjgxYTFmZDk4MDdiMGY2NWZfeWxuSmZKQVhzYndlM2VLeUNuaGxUc0RTak81OGkzWUpfVG9rZW46RlNFbmJ2SHBybzFIbnV4NkNKWWNqRmJ1blhiXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

### **BotGem(支持移动端,还有读图)**

官网: https://bytemyth.com/ama

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=ZjVkNjc0ZmE3ZWJlNGUxN2Y4MDM4OGM1N2M5MzgwMjBfajlFeUVWSW40VnhrV2Q1bTVPS3I1TUdSQnM4dEUzZTJfVG9rZW46WHhCRGJEcU5Yb1hBT0x4UUpncmNiNjNObk1kXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

### **沉浸式翻译**

官网链接https://immersivetranslate.com/

一款免费的，好用的，没有废话的，革命性的，饱受赞誉的，AI 驱动的双语网页翻译扩展，帮助你有效地打破信息差，在手机上也可以用

自定义 API 接口处填写下面这两个哪个都行 https://api.chatanywhere.com.cn/v1/chat/completions https://api.chatanywhere.tech/v1/chat/completions

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=MmE4MTM0MGZmODFjNDI5OWYxZjkzYmRlYzlkNDY5ZDNfbW9JYVp1SG9DUWhLdk5aZ1NVUkZ4dGdnN3RBU0JDRE9fVG9rZW46SHlZN2JQMlNYb1paeEx4TlJQeWNTTG9Pbm45XzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

### **浏览器插件 ChatGPT Siderbar**

官网链接：<https://chatgpt-sidebar.com/>

安装好插件后进入设置页面，如图所示修改设置，并将 url 设置为**`https://api.chatanywhere.tech`**即可。

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=MzQ0ODJjMzBmOGNlMzFmZmUwYzg5OTQ4ODgxMzE3ZTJfUjh4b3Q2M1F2NVh3bUxaOXdWREJ0cHlzTm9ZemJ2UmlfVG9rZW46SUhMcmJacWc2bzBlZTN4dUFZaWNITzBJbmdiXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

### **Zotero**

软件地址: https://www.zotero.org/

以下只是介绍了一下常用的, 具体详细的使用方法请查看 Zotro 官方文档

/api https://api.chatanywhere.tech /secretKey 购买的转发 key 记住别忘记带 sk-

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=OTIyMmNjYjlmOGEzMDNkMjc4YzEwMGZhZWU3MTM4NjNfOVVYaXdiSjRhVHl4ZWdZQkd5VkQ4ckdYRGVaNDlPa2ZfVG9rZW46WHc3MGJqdTFob3NnZEx4M3NGQWNFdzIwbnpoXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

如遇到 context_length_exceeded

意味着您当前的模型处理的输入文本长度超过了模型的最大 token 限制。每个模型都有一个最大 token 限制，例如，gpt-3.5-turbo 模型的最大 token 限制为 4096。

您可以使用以下命令 /model gpt-3.5-turbo-16k 更换模型

Zoter 中的翻译 接口地址填写: https://api.chatanywhere.tech/v1/chat/completions 不用管状态是否显示可用 填上之后就可以了

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=ZDQzMTQ4YjA2ODNkOWYyOWVmNzBkMWJiNGQ1MDUxNmNfSWN1UlpxeXpUa0pTSEltU3B3ZnpvRENQVGF0cTRKWTVfVG9rZW46UldSWmJ5YXh6b1BhMDZ4UWJXbmNxNWV2bnpoXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

### 微 X 助手聊天机器人

下载地址和官网未知.

非官方接口处填写下面这两个哪个都行 https://api.chatanywhere.com.cn/v1/chat/completions https://api.chatanywhere.tech/v1/chat/completions

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=ZmFiY2Y5ZmQwODgzN2YyY2RiM2Q3OTdkNDJlNTY3YzRfcjY5WjkwQXNGSWc2QlBZYVIwTUZPTzBRUUxmNXZZOUpfVG9rZW46R2VPZ2JVS3VTbzVEcE54YU1KcGM1YmlvbldoXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

### **GPTCraft**

朋友自己写的项目 UI 比较不错, 使用比较简单 项目地址: https://github.com/onlyGuo/chatgpt_desktop

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=YjJkMGIxODI2OWQwZjI3NWRmNzE3NzUwZTJmOTg0NDNfcVkwN1poYjFkazdzdUk5elNmS3JCdk5zdjlWUXNCa25fVG9rZW46Q0FjYWJURFBYbzFHcFl4ZTFSeWN5Ym1nbnRkXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)

### **Gomoon 支持读文件**

Gomoon 是一款开源的桌面大模型应用，支持 mac 和 Windows 平台。额外支持了解析文件、图片，本地知识库等能力。

官网地址：https://gomoon.top

使用方法，进入 Gomoon 设置页面(页面右上角)，如图在设置中填入密钥，并将代理设置为https://api.chatanywhere.tech/v1

![](https://zwxvec6g91g.feishu.cn/space/api/box/stream/download/asynccode/?code=OTI2NmFkNDdhMjJmYjI2NjBhOWVhMDExYmYyZDQ4ZmVfSHZUUFliTTluWENsN3VhMVphdWRQQlppaFVaaVNjRVNfVG9rZW46SkgwSGJUb1dYb056Mmt4WjlDc2NyQkxvbmRiXzE3MjA1ODkzMjE6MTcyMDU5MjkyMV9WNA)
