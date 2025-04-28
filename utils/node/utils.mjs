import fs from 'fs/promises'
import path from 'path'
import util from 'util'
import { exec, spawn, execSync } from 'child_process'

/**
 * 异步读取目录的所有文件
 * @param {string} dirPath - 目录路径
 * @returns {Promise<string[]>} - 文件列表
 */
export async function readDirectory(dirPath) {
  try {
    return await fs.readdir(dirPath)
  } catch (err) {
    console.error(`Error reading directory: ${dirPath}`, err)
    process.exit(1)
  }
}

/**
 * 异步检查文件或目录是否存在
 * @param {string} filePath - 文件或目录路径
 * @returns {Promise<boolean>} - 是否存在
 */
export async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

/**
 * 获取文件的绝对路径
 * @param {string} relativePath - 相对路径
 * @returns {string} - 绝对路径
 */
export function getAbsolutePath(relativePath) {
  return path.resolve(relativePath)
}

/**
 * 异步执行命令行命令
 * @param {string} command - 命令
 * @returns {Promise<string>} - 命令输出
 */
export function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, { encoding: 'utf-8' }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${command}`, stderr)
        reject(error)
        return
      }
      resolve(stdout.trim())
    })
  })
}

/**
 * 运行外部命令并返回结果
 * @param {string} command 要执行的命令
 * @param {string[]} args 命令参数
 * @returns {Promise<{ stdout: string, stderr: string, code: number }>} 命令执行结果
 * @example  const result = await runCommand("echo", ["Hello"]);
 * @example: const result = await runCommand("npx", ["prettier", "--write", ...stagedFiles]);
 */
export async function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, { stdio: 'pipe', shell: true })
    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', (data) => (stdout += data))
    proc.stderr.on('data', (data) => (stderr += data))
    proc.on('close', (code) => resolve({ stdout, stderr, code })) // 关闭事件, stdout 输出，code 退出码
    proc.on('error', reject)
  })
}

// 示例用法
// (async () => {
//   const result = await runCommand("echo", ["Hello"]);
//   console.log("输出:", result.stdout);
//   console.log("退出码:", result.code);
// })();

/**
 * 异常退出程序
 * @param {string} message - 错误信息
 * @param {number} [code=1] - 退出码
 */
export function exitWithError(message, code = 1) {
  console.error(message)
  process.exit(code)
}

/**
 * 获取当前 Node.js 版本
 * @returns {string} - Node.js 版本
 */
export function getNodeVersion() {
  return process.version
}

/**
 * 异步创建目录（如果不存在）
 * @param {string} dirPath - 目录路径
 * @returns {Promise<void>}
 */
export async function createDirectoryIfNotExists(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  } catch (err) {
    console.error(`Error creating directory: ${dirPath}`, err)
    process.exit(1)
  }
}

/**
 * 异步删除文件或目录
 * @param {string} targetPath - 文件或目录路径
 * @returns {Promise<void>}
 */
export async function deleteFileOrDirectory(targetPath) {
  try {
    await fs.rm(targetPath, { recursive: true, force: true })
  } catch (err) {
    console.error(`Error deleting file or directory: ${targetPath}`, err)
    process.exit(1)
  }
}

/**
 * 检查当前目录是否为 Git 仓库
 * @returns {boolean} 是否为 Git 仓库
 */
export function isGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

/**
 * 获取 Git 仓库根目录
 * @param {string} arg Git rev-parse 参数（如 "--git-dir" 或 "--show-toplevel"）
 * @returns {string} Git 根目录路径，或空字符串（失败时）
 */
export function getGitRoot(arg = '--show-toplevel') {
  try {
    return execSync(`git rev-parse ${arg}`, { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

// 示例用法
// const gitRoot = getGitRoot("--show-toplevel");
// console.log(`Git 根目录: ${gitRoot}`);

/**
 * 写入文件并设置可执行权限
 * @param {string} filePath 文件路径
 * @param {string} content 文件内容
 */
export function writeExecutableFile(filePath, content) {
  const { writeFileSync } = require('fs')
  writeFileSync(filePath, content, { mode: 0o755 })
}

// 示例用法
// const writeExecutableFile = require("./writeExecutableFile");
// writeExecutableFile("./script.sh", "#!/bin/sh\necho 'Hello'");
// console.log("已生成可执行脚本");

/**
 * 获取 Git 暂存区的文件列表
 * @returns {string[]} 暂存文件路径数组
 */
export async function getStagedFiles() {
  const execPromise = util.promisify(exec)

  try {
    const { stdout } = await execPromise('git diff --cached --name-only --diff-filter=ACM')
    return stdout.split('\n').filter(Boolean)
  } catch {
    return []
  }
}

// 示例用法
// const getStagedFiles = require("./getStagedFiles");
// (async () => {
//   const files = await getStagedFiles();
//   console.log("暂存文件:", files);
// })();
