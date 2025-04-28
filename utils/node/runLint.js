const { isGitRepository, getStagedFiles, runCommand } = require('./utils')

async function runLint() {
  try {
    // 检查 Git 环境
    if (!isGitRepository()) {
      throw new Error('当前目录不是 Git 仓库')
    }

    // 获取暂存文件
    const files = await getStagedFiles()
    if (!files.length) {
      console.log('没有暂存文件需要处理')
      return
    }

    // 运行 Prettier
    console.log('正在格式化文件:', files)
    const prettierResult = await runCommand('npx', ['prettier', '--write', ...files])
    if (prettierResult.code !== 0) {
      throw new Error(`Prettier 失败: ${prettierResult.stderr}`)
    }

    // 运行 ESLint
    const eslintResult = await runCommand('npx', ['eslint', '--fix', ...files])
    if (eslintResult.code !== 0) {
      throw new Error(`ESLint 失败: ${eslintResult.stderr}`)
    }

    console.log('格式化和检查完成')
  } catch (err) {
    console.error('错误:', err.message)
    process.exit(1)
  }
}

runLint()

// Husky 配置：.husky/pre-commit
// #!/bin/sh
// . "$(dirname "$0")/_/husky.sh"
// node runLint.js
