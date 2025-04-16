const fs = require('fs').promises
const path = require('path')
const { exec } = require('child_process')

/**
 * 异步读取目录的所有文件
 * @param {string} dirPath - 目录路径
 * @returns {Promise<string[]>} - 文件列表
 */
async function readDirectory(dirPath) {
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
async function fileExists(filePath) {
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
function getAbsolutePath(relativePath) {
  return path.resolve(relativePath)
}

/**
 * 异步执行命令行命令
 * @param {string} command - 命令
 * @returns {Promise<string>} - 命令输出
 */
function executeCommand(command) {
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
 * 异常退出程序
 * @param {string} message - 错误信息
 * @param {number} [code=1] - 退出码
 */
function exitWithError(message, code = 1) {
  console.error(message)
  process.exit(code)
}

/**
 * 获取当前 Node.js 版本
 * @returns {string} - Node.js 版本
 */
function getNodeVersion() {
  return process.version
}

/**
 * 异步创建目录（如果不存在）
 * @param {string} dirPath - 目录路径
 * @returns {Promise<void>}
 */
async function createDirectoryIfNotExists(dirPath) {
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
async function deleteFileOrDirectory(targetPath) {
  try {
    await fs.rm(targetPath, { recursive: true, force: true })
  } catch (err) {
    console.error(`Error deleting file or directory: ${targetPath}`, err)
    process.exit(1)
  }
}

module.exports = {
  readDirectory,
  fileExists,
  getAbsolutePath,
  executeCommand,
  exitWithError,
  getNodeVersion,
  createDirectoryIfNotExists,
  deleteFileOrDirectory
}
