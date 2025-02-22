/**
 * Object 在obj中是否有key
 * @param {*} obj
 * @param {*} key
 * @returns
 */
export const has = function(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key)
}

// 对象深拷贝，支持[]和{}
export const deepCopy = function(obj) {
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}

export function deepAssign(to, from) {
  for (let key in from) {
    if (!to[key] || typeof to[key] !== 'object') {
      to[key] = from[key]
    } else {
      deepAssign(to[key], from[key])
    }
  }
}

// https://github.com/tj/node-only
// 只取 obj 中的某项
// only(obj, 'name last email');
// only(obj, ['name', 'last', 'email']);
export const only = (obj, keys) => {
  obj = obj || {}
  if ('string' == typeof keys) keys = keys.split(/ +/)
  return keys.reduce(function(ret, key) {
    if (null == obj[key]) return ret
    ret[key] = obj[key]
    return ret
  }, {})
}

// 忽略 obj 中的某项
export const omit = (obj = {}, props = []) => {
  if (!Array.isArray(props)) {
    throw Error('props type error!')
  }
  const shallowCopy = {
    ...obj
  }
  for (let i = 0; i < props.length; i++) {
    const key = props[i]
    delete shallowCopy[key]
  }
  return shallowCopy
}

export function mergeObject(obj1, obj2, newObject) {
  const wrap = newObject || obj1
  const keys = new Set(Object.keys(obj1).concat(Object.keys(obj2)))
  keys.forEach(key => {
    if (!(key in obj1)) {
      wrap[key] = obj2[key]
    } else if (!(key in obj2)) {
      wrap[key] = obj1[key]
    } else if (obj2[key] && obj2[key].constructor === Object) {
      wrap[key] = mergeObject(obj1[key], obj2[key])
    } else {
      wrap[key] = obj2[key]
    }
  })

  return wrap
}

// 对象类型深比较（递归遍历）
export function isEqual(obj, obj2, option = {}) {
  if (!obj || !obj2) {
    return obj === obj2
  }
  if (Object.keys(obj).length !== Object.keys(obj2).length) return false
  const ignores = option.ignores || []
  const keys = [...new Set(Object.keys(obj).concat(Object.keys(obj2)))]

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    if (!ignores.includes(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (!isEqual(obj[key], obj2[key], option)) {
          return false
        }
      } else if (obj[key] !== obj2[key]) {
        return false
      }
    }
  }
  return true
}

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

// 比较两个对象相等
export const equals = (a, b) => {
  if (a === b) return true
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime()
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object')) return a === b
  if (a === null || a === undefined || b === null || b === undefined) return false
  if (a.prototype !== b.prototype) return false
  let keys = Object.keys(a)
  if (keys.length !== Object.keys(b).length) return false
  return keys.every(k => equals(a[k], b[k]))
}

// deep merge
// https://www.30secondsofcode.org/js/s/merge-objects/

export const deepMerge = (a, b, fn) =>
  [...new Set([...Object.keys(a), ...Object.keys(b)])].reduce(
    (acc, key) => ({ ...acc, [key]: fn(key, a[key], b[key]) }),
    {}
  )

const obj1 = {
  a: true,
  b: [1, 2, 3],
  c: { d: 4, e: 5 },
  f: 'foo'
}
const obj2 = {
  a: false,
  b: [4, 5, 6],
  c: { d: 6, g: 7 },
  f: 'bar'
}

const concatFn = (key, a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) return a.concat(b)
  if (typeof a === 'object' && typeof b === 'object') return deepMerge(a, b, concatFn)
  if (typeof a === 'string' && typeof b === 'string') return [a, b].join(' ')
  return b ?? a
}

deepMerge(obj1, obj2, concatFn)
// {
//   a: false,
//   b: [ 1, 2, 3, 4, 5, 6 ]
//   c: { d: 6, e: 5, g: 7 },
//   f: 'foo bar'
// }

// 简化的条件对象合并
// 条件合并示例
/* const a = { a: 1 }
const b = {
  ...mergeIf(a.a, { a: 2 })
}
// 等价于原来的写法：...(a.a ? { a: 2 } : {}) */
export const mergeIf = (condition, obj) => (condition ? obj : {})
