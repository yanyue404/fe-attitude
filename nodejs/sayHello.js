const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('请输入你的名字：', (answer) => {
  console.log(`你好，${answer}！`)
  rl.close()
})
