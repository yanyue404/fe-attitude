let handlers = Symbol('handlers')

export function makeObservable(target) {
  // 1. 初始化 handler 存储
  target[handlers] = []

  // 将 handler 函数存储到数组中，以便于之后调用
  target.observe = function(handler) {
    this[handlers].push(handler)
  }

  // 2. 创建一个 proxy 以处理更改
  return new Proxy(target, {
    set(target, property, value, receiver) {
      let success = Reflect.set(...arguments) // 将操作转发给对象
      if (success) {
        // 如果在设置属性时没有出现 error
        // 调用所有 handler
        target[handlers].forEach(handler => handler(property, value))
      }
      return success
    }
  })
}
