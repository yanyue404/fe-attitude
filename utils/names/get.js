/**
 *
 *
 * @export
 * @param {Object} obj 要检索的对象。
 * @param {Array|string} path 要获取属性的路径。
 * @param {*} defaultValue 如果解析值是 undefined ，这值会被返回
 * @return {*}
 */
export function get(obj, path, defaultValue) {
  let chain = Array.isArray(path) ? path : path.split(/[\.\[\]]+/)
  let val = chain.reduce((prev, curr) => {
    if (prev) {
      return (prev = prev[curr])
    } else {
      return prev
    }
  }, obj)
  return val === undefined ? defaultValue : val
}
