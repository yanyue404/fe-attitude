/**
 * promise返回结果包装
 * @param {function} p 返回promise对象的function
 * @returns 一个永远成功返回一个数组的异步方法，数组的第一项存放错误信息，第二项存放结果
 */
export function promiseWrapper(p) {
  return (...args) => {
    return p(...args)
      .then(res => [null, res])
      .catch(err => [err, null])
  }
}

function func() {
  return new Promise((resolve, reject) => {
    //TODO
  })
}

let newFunc = promiseWrapper(func)
async function main() {
  let [err, data] = await newFunc()
  console.log('err', err)
  console.log('data', data)
}
main()
