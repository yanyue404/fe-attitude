/**
 * 执行从右到左的功能组合
 */
export function compose(...funcs) {
  return function(result) {
    let list = funcs.slice()
    while (list.length > 0) {
      // 从列表中取第一个函数并执行
      result = list.pop()(result)
    }
    return result
  }
}
