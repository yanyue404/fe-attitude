const path = require('path')
const fs = require('fs')

/**
 * 获取文件目录
 * @param {*} path
 */
function getStat(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      resolve(err ? false : stats)
    })
  })
}

/**
 * 判断目录是否存在
 * @param {*} dir
 */
async function dirExists(dir) {
  let isExists = await getStat(dir)
  if (isExists && isExists.isDirectory()) {
    // 自定路径存在且是目录
    return true
  } else if (isExists) {
    // 自定路径存在且不是目录
    return false
  }
}

/**
 * 创建目录
 * @param {*} dir
 */
async function mkdir(dir) {
  let isExists = await getStat(dir)
  if (isExists) {
    return isExists.isDirectory()
  }
  console.log(path.parse(dir))
  //   if (await mkdir(path.parse(dir).dir)) {
  //     return !(await new Promise((resolve) => fs.mkdir(dir, resolve)));
  //   }
  //   return false;
}

;(async () => {
  let res = await mkdir('/test/sdk/qq')
})()
