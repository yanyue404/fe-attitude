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

function deepAssign(to, from) {
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
// var object = { 'a': [{ 'b': { 'c': 3 } }] };

// _.get(object, 'a[0].b.c');
// => 3
function get(obj, href) {
  if (href.indexOf('.') === -1) {
    return obj[href]
  }
  if (href.indexOf('.') !== -1) {
    let hrefStr = href.split('.')
    return getObjectValue(obj[hrefStr[0]], hrefStr.slice(1).join('.'))
  }
}

export default { has, deepCopy, only, omit, isEqual, mergeObject, get }
