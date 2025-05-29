const fs = require('fs')
const path = require('path')

// 判断目标路径的文件存在与否
const exists = (filePath) => fs.existsSync(filePath)
const jsonPath = process.argv[2]

if (!jsonPath) {
  console.log('没有传 JSON 目录参数哦！')
  process.exit(1)
}

const rootPath = path.join(process.cwd(), jsonPath)
// 遍历所有文件
const walk = (path) =>
  fs.readdirSync(path).reduce((files, file) => {
    const filePath = path + '/' + file
    const stat = fs.statSync(filePath)

    if (stat.isFile()) {
      if (/(.*)\.(json)/.test(file)) {
        return files.concat(filePath)
      }
    }
    return files
  }, [])

// 合并文件内容
const mergeFileData = () => {
  const files = walk(rootPath)

  if (!files.length) process.exit(2)

  const data = files.filter(exists).reduce((total, file) => {
    const fileData = fs.readFileSync(file)
    const basename = path.basename(file, '.json')
    let fileJson

    try {
      fileJson = JSON.parse(fileData)
    } catch (err) {
      console.log('读出出错', file)
      console.log(err)
    }

    total[basename] = fileJson
    return total
  }, {})

  fs.writeFileSync('./data.json', JSON.stringify(data, null, 2))
}

mergeFileData()
