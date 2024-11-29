import { shallowReactive } from 'vue'

// https://vueuse.org/core/useMemoize/

/**
 * Reactive function result cache based on arguments
 */
export function useMemoize(resolver, options) {
  const initCache = () => {
    if (options?.cache) return shallowReactive(options.cache)
    return shallowReactive(new Map())
  }

  const cache = initCache()

  /**
   * Generate key from args
   */
  const generateKey = (...args) =>
    options?.getKey
      ? options.getKey(...args)
      : // Default key: Serialize args
        JSON.stringify(args)

  /**
   * Load data and save in cache
   */
  const _loadData = (key, ...args) => {
    cache.set(key, resolver(...args))
    return cache.get(key)
  }

  const loadData = (...args) => _loadData(generateKey(...args), ...args)

  /**
   * Delete key from cache
   */
  const deleteData = (...args) => {
    cache.delete(generateKey(...args))
  }

  /**
   * Clear cached data
   */
  const clearData = () => {
    cache.clear()
  }

  const memoized = (...args) => {
    // Get data from cache
    const key = generateKey(...args)
    if (cache.has(key)) return cache.get(key)
    return _loadData(key, ...args)
  }

  memoized.load = loadData
  memoized.delete = deleteData
  memoized.clear = clearData
  memoized.generateKey = generateKey
  memoized.cache = cache

  return memoized
}
