import { looseEqual } from './looseEqual'
const cache = [
  {
    key: {},
    value: true
  }
]

/**
 *
 * @export 一个以对象为键的缓存方法，用来返回命中的对象组合结果
 * @param {object} key 对象key
 * @param {any} value
 * @return {any} 命中的缓存对象 {key,value}
 */
export function cacheObj(key, value) {
  let someIndex = cache.findIndex(v => looseEqual(v.key, key))
  if (someIndex !== -1) {
    return cache[someIndex]
  } else if (value !== undefined) {
    cache.push({
      key,
      value
    })
  }
}
