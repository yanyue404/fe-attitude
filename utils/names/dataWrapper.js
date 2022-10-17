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
