const fs = require('fs').promises
const path = require('path')

/**
 * 批量修改文件夹下的文件名称
 * @param {string} folderPath - 文件夹路径
 * @param {function(string, number): string} renameRule - 重命名规则函数，接收旧文件名和索引，返回新文件名
 */
async function renameFilesInFolder(folderPath, renameRule) {
  try {
    // 确保文件夹存在
    const exists = await fs
      .access(folderPath)
      .then(() => true)
      .catch(() => false)
    if (!exists) {
      throw new Error(`Folder does not exist: ${folderPath}`)
    }

    // 读取文件夹中的文件
    const files = await fs.readdir(folderPath)

    // 遍历文件并重命名
    for (let i = 0; i < files.length; i++) {
      const oldName = files[i]
      const newName = renameRule(oldName, i)

      const oldPath = path.join(folderPath, oldName)
      const newPath = path.join(folderPath, newName)

      // 重命名文件
      await fs.rename(oldPath, newPath)
      console.log(`Renamed: ${oldName} -> ${newName}`)
    }

    console.log('All files have been renamed successfully.')
  } catch (err) {
    console.error('Error renaming files:', err.message)
  }
}

// 示例调用
;(async () => {
  const folderPath = './example-folder' // 替换为你的文件夹路径
  const renameRule = (oldName, index) => `new_name_${index}${path.extname(oldName)}` // 重命名规则

  await renameFilesInFolder(folderPath, renameRule)
})()
