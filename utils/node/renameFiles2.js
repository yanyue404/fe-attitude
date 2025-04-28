const fs = require('fs')
const path = require('path')

/**
 * 重命名文件夹中的文件
 * @param {string} folderPath - 文件夹路径
 * @param {string} baseName - 基础名称
 * @param {boolean} keepOriginalName - 是否保留原文件名
 */
function renameAll(folderPath, baseName, keepOriginalName = true) {
  try {
    // 读取文件夹中的所有文件
    const files = fs.readdirSync(folderPath)

    // 获取文件信息（包含文件大小）
    const fileDetails = files.map((file) => {
      const filePath = path.join(folderPath, file)
      const stats = fs.statSync(filePath)
      return { fileName: file, size: stats.size, filePath }
    })

    // 按文件大小从大到小排序
    fileDetails.sort((a, b) => b.size - a.size)

    // 重命名文件
    fileDetails.forEach((file, index) => {
      const fileExtension = path.extname(file.fileName) // 获取文件类型后缀
      const originalNameWithoutExtension = path.basename(file.fileName, fileExtension) // 原文件名去除后缀

      let newFileName
      if (keepOriginalName) {
        newFileName = `${index + 1}-${baseName}-${originalNameWithoutExtension}${fileExtension}`
      } else {
        newFileName = `${index + 1}-${baseName}${fileExtension}`
      }

      const newFilePath = path.join(folderPath, newFileName)

      fs.renameSync(file.filePath, newFilePath)
    })

    console.log('文件重命名完成！')
  } catch (error) {
    console.error('重命名文件时发生错误：', error.message)
  }
}

// 示例调用
// 参数1: 文件夹路径
// 参数2: 基础名称
// 参数3: 是否保留原名称 (true: 保留，false: 不保留)
renameAll('./demos', '小动物', true)
