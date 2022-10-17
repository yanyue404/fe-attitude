export const cacheStringFunction = fn => {
  const cache = Object.create(null)
  return str => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

/**
 * 缓存函数
 * @param {function} func
 * @returns 一个会缓存相同入参结果的函数，只执行一次计算逻辑，fn 的参数中不能使用 引用类型
 */
export function cacheFunc(fn) {
  const cacheMap = new Map()
  return (...args) => {
    let cacheKey = args.join('-')
    if (!cacheMap.has(cacheKey)) {
      cacheMap.set(cacheKey, fn(...args))
    }
    return cacheMap.get(cacheKey)
  }
}
