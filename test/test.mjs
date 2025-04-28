import { getNodeVersion, isGitRepository, getGitRoot, fileExists } from '../utils/node/utils.mjs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

// 获取当前脚本的目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err.stack)
  process.exit(1) // 可选：退出进程
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason)
  process.exit(1) // 可选：退出进程
})

console.log('node 版本:', getNodeVersion())

console.log('当前目录是否为 Git 仓库:', isGitRepository(), getGitRoot())

const toolsPath = join(__dirname, 'tools')

fileExists(toolsPath)
  .then((exists) => {
    console.log('文件是否存在:', exists)
  })
  .catch((err) => {
    console.error('检查文件是否存在时出错:', err)
  })

// 监听 node 命令执行报错

// exitWithError('异常退出程序')
