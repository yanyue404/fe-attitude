/**
 * 获取数据类型
 * @param {*} value - 要判断类型的值
 * @returns {string} - 返回类型字符串：Boolean|String|Array|Object|Function|Number|Undefined|Null
 */
const getType = value => Object.prototype.toString.call(value).slice(8, -1)

/**
 * 判断值是否已定义
 * @param {*} value - 要判断的值
 * @returns {boolean}
 */
const isDef = value => value !== undefined && value !== null

/**
 * 判断是否为 Promise
 * @param {*} value - 要判断的值
 * @returns {boolean}
 */
const isPromise = value => isObject(value) && isFunction(value.then) && isFunction(value.catch)

/**
 * 判断是否为函数
 * @param {*} value - 要判断的值
 * @returns {boolean}
 */
const isFunction = value => getType(value) === 'Function'

/**
 * 判断是否为数字
 * @param {*} value - 要判断的值
 * @returns {boolean}
 */
const isNumber = value => typeof value === 'number'

/**
 * 判断是否为数组
 * @param {*} value - 要判断的值
 * @returns {boolean}
 */
const isArray = Array.isArray

/**
 * 判断是否为对象
 * @param {*} value - 要判断的值
 * @returns {boolean}
 */
const isObject = value => value != null && typeof value === 'object' && !Array.isArray(value)

/**
 * 判断是否为空对象
 * @param {Object} obj - 要判断的对象
 * @returns {boolean}
 */
const isEmptyObject = obj => {
  if (!obj) return false
  return !Object.keys(obj).some(key => obj[key])
}

/**
 * 对象扩展
 * @param {Object} target - 目标对象
 * @param {...Object} sources - 源对象
 * @returns {Object}
 */
const extend = (target, ...sources) => {
  sources.forEach(source => {
    Object.keys(source).forEach(key => {
      if (source.hasOwnProperty(key)) {
        target[key] = source[key]
      }
    })
  })
  return target
}

/**
 * 判断是否为纯对象
 * @param {*} value - 要判断的值
 * @returns {boolean}
 */
const isPlainObject = value => {
  if (!isObject(value) || Object.prototype.toString.call(value) !== '[object Object]') {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/**
 * 深克隆对象
 * @param {*} value - 要克隆的值
 * @returns {*}
 */
const deepClone = value => {
  if (Array.isArray(value)) {
    return value.map(deepClone)
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(Object.entries(value).map(([key, val]) => [key, deepClone(val)]))
  }
  return value
}

/**
 * 格式化时间戳
 * @param {string|number} timestamp - 时间戳
 * @param {string} [separator='-'] - 日期分隔符
 * @param {boolean} [showTime=false] - 是否显示时间
 * @returns {string|Object}
 */
const formatTimestamp = (timestamp, separator = '-', showTime = false) => {
  const date = new Date(String(timestamp).length === 10 ? timestamp * 1000 : Number(timestamp))
  const pad = num => String(num).padStart(2, '0')

  const dateInfo = {
    Y: date.getFullYear(),
    M: pad(date.getMonth() + 1),
    D: pad(date.getDate()),
    h: pad(date.getHours()),
    m: pad(date.getMinutes()),
    s: pad(date.getSeconds())
  }

  if (showTime) {
    return `${dateInfo.Y}${separator}${dateInfo.M}${separator}${dateInfo.D} ${dateInfo.h}:${dateInfo.m}:${dateInfo.s}`
  }

  return separator ? `${dateInfo.Y}${separator}${dateInfo.M}${separator}${dateInfo.D}` : dateInfo
}

/**
 * 格式化数字为指定小数位
 * @param {number} number - 要格式化的数字
 * @param {number} decimals - 小数位数
 * @returns {string}
 */
const formatNumber = (number, decimals = 2) => {
  const factor = Math.pow(10, decimals)
  return (Math.round(number * factor) / factor).toFixed(decimals)
}

/**
 * 格式化金额
 * @param {number} amount - 金额数字
 * @param {number} decimals - 小数位数
 * @returns {string}
 */
const formatMoney = (amount, decimals = 2) => {
  const num = parseFloat(String(amount).replace(/[^\d.-]/g, ''))
  const parts = formatNumber(num, decimals).split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return parts.join('.')
}

/**
 * 解析格式化后的金额字符串
 * @param {string} formattedAmount - 格式化后的金额字符串
 * @returns {number}
 */
const parseMoney = formattedAmount => {
  return parseFloat(String(formattedAmount).replace(/[^\d.-]/g, ''))
}

export {
  getType,
  isDef,
  isPromise,
  isFunction,
  isNumber,
  isArray,
  isObject,
  isEmptyObject,
  extend,
  isPlainObject,
  deepClone,
  formatTimestamp,
  formatNumber,
  formatMoney,
  parseMoney
}
