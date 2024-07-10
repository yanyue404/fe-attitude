const axios = require('axios')

async function getChatGptResponse(prompt) {
  const url = 'https://api.chatanywhere.tech/v1/chat/completions'
  const headers = {
    Authorization: `sk-f15CAIWykWwsV68hcVXqFkrloROaILBUhgeHr7Iw0nKrKO1W`,
    'Content-Type': 'application/json'
  }
  const data = {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: prompt }
    ]
  }

  try {
    const response = await axios.post(url, data, { headers: headers })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// 使用示例
getChatGptResponse('gpt 有哪些可以指定请求地址和 token 的 window 客户端软件？').then(response => {
  console.log(response?.choices?.[0]?.message?.content)
})
