const privateKey = Symbol()

function judgeHas(t, k) {
  return typeof t === 'object' && Reflect.has(t, k)
}

function getValue(k, defaultValue) {
  return this.hasProp ? this.target[k] : defaultValue
}

export function dataWrapper(data) {
  return new Proxy(data, {
    get(t, k) {
      let realTarget = t

      if (Reflect.has(t, privateKey)) {
        realTarget = t[privateKey]
      }

      const hasProp = judgeHas(realTarget, k)
      const func = getValue.bind({ hasProp, target: realTarget }, k)
      func[privateKey] = realTarget && realTarget[k]
      return dataWrapper(func)
    }
  })
}

// Usage Example
const data = { a: 1, b: { c: 2 } }
const wrappedData = dataWrapper(data)
// 安全访问存在的属性
console.log(wrappedData.a()) // 1
console.log(wrappedData.b().c()) // 2
// 安全访问不存在的属性并提供默认值
console.log(wrappedData.b().d('default')) // 'default'
