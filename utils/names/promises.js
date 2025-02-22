/**
 * promise返回结果包装，避免try-catch的写法
 * @param {function} p 返回promise对象的function
 * @returns {function} 返回一个数组，[error, data]
 *
 * @example
 * const func = () => new Promise((resolve, reject) => {
 *   // 异步操作
 * });
 *
 * const wrappedFunc = promiseWrapper(func);
 * const [err, data] = await wrappedFunc();
 */
export function promiseWrapper(p) {
  return (...args) => {
    return p(...args)
      .then(res => [null, res])
      .catch(err => [err, null])
  }
}

/**
 * 超时包装器
 * @param {Promise} promise 需要添加超时的Promise
 * @param {number} timeout 超时时间（毫秒）
 * @returns {Promise}
 */
export function withTimeout(promise, timeout = 5000) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`操作超时 ${timeout}ms`)), timeout)
  })
  return Promise.race([promise, timeoutPromise])
}

/**
 * 重试包装器
 * @param {function} fn 需要重试的异步函数
 * @param {number} retries 重试次数
 * @param {number} delay 重试间隔（毫秒）
 * @returns {Promise}
 */
export function withRetry(fn, retries = 3, delay = 1000) {
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < retries; i++) {
      try {
        const result = await fn()
        return resolve(result)
      } catch (err) {
        if (i === retries - 1) return reject(err)
        await new Promise(r => setTimeout(r, delay))
      }
    }
  })
}

/**
 * 批量Promise并行执行，带并发限制
 * @param {Array} tasks Promise任务数组
 * @param {number} limit 并发限制数
 * @returns {Promise<Array>}
 */
export async function parallelLimit(tasks, limit = 2) {
  const results = []
  const executing = new Set()

  for (const [index, task] of tasks.entries()) {
    const promise = Promise.resolve().then(() => task())
    results[index] = promise
    executing.add(promise)

    const clean = () => executing.delete(promise)
    promise.then(clean).catch(clean)

    if (executing.size >= limit) {
      await Promise.race(executing)
    }
  }

  return Promise.all(results)
}

// 超时示例
const slowOperation = async () => {
  await new Promise(r => setTimeout(r, 6000))
  return 'done'
}
await withTimeout(slowOperation(), 5000) // 将抛出超时错误

// 重试示例
const unstableOperation = async () => {
  if (Math.random() > 0.5) throw new Error('随机失败')
  return '成功'
}
const result = await withRetry(unstableOperation) // 最多重试3次

// 并发限制示例
const tasks = [() => fetch('url1'), () => fetch('url2'), () => fetch('url3')]
const results = await parallelLimit(tasks, 2) // 最多同时执行2个请求
