/**
 * 通用数组生成器
 * @param {number} length - 数组的长度
 * @param {function} callback - 用于生成每个元素的回调函数，接收当前索引作为参数
 * @returns {Array} - 生成的数组
 */
export function generateArray(length, callback) {
  if (length <= 0) {
    throw new Error('数组长度必须大于 0')
  }
  if (typeof callback !== 'function') {
    throw new Error('请提供一个回调函数用于生成数组内容')
  }
  return Array.from({ length }, (_, index) => callback(index))
}

// 示例用法 1: 生成一个从 1 到 10 的数组
const array1 = generateArray(10, index => index + 1)
console.log(array1) // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 示例用法 2: 生成一个包含随机数的数组
const array2 = generateArray(5, () => Math.floor(Math.random() * 100))
console.log(array2) // [随机数, 随机数, 随机数, 随机数, 随机数]

// 示例用法 3: 生成一个重复固定值的数组
const array3 = generateArray(5, () => '固定值')
console.log(array3) // ["固定值", "固定值", "固定值", "固定值", "固定值"]

// 示例用法 4: 生成一个二维数组
const array4 = generateArray(3, row => generateArray(3, col => `(${row}, ${col})`))
console.log(array4) // [["(0, 0)", "(0, 1)", "(0, 2)"], ["(1, 0)", "(1, 1)", "(1, 2)"], ["(2, 0)", "(2, 1)", "(2, 2)"]]

/**
 *
 * @isArrayLike
 * @param {*} value
 * @returns Boolearn
 */
export function isArrayLike(value) {
  return value != null && typeof value != 'function' && this.isLength(value.length)
}

export function isArray(obj) {
  return (
    Object.prototype.toString
      .call(obj)
      .split(' ')[1]
      .slice(0, -1) === 'Array'
  )
}

// 将一组类数组转换为数组
export function toArray(obj) {
  return Array.from ? Array.from(obj) : Array.prototype.slice.call(obj)
}

/**
 * isContains
 * @param {*} arr
 * @param {*} current
 * @returns
 */
export function isContains(arr, current) {
  if (Array.prototype.includes) {
    return arr.includes(current)
  }
  for (i = 0; i < arr.length && arr[i] != current; i++);
  return !(i == arr.length)
}

/**
 * arrayIndex
 * @param {*} array
 * @param {*} element
 * @returns
 */
export function arrayIndex(array, element) {
  var index = array.indexOf(element)
  return index
}

// 从数组中随机取出一个
export function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

//去除数组中假值元素，比如undefined,null,0,"",NaN都是假值
export function compact(arr) {
  var index = -1,
    resIndex = -1,
    result = [],
    len = arr ? arr.length : 0
  while (++index < len) {
    var value = arr[index]
    if (value) {
      result[++resIndex] = value
    }
  }
  return result
}

/**
 * 数组对象根据某一个相同的键去重
 *
 * @param {*} arr
 * @param {*} name 去除所有数组子项与此key值重复项
 * @returns
 */
export function uniqueArrayObj(arr, name) {
  var hash = {}
  return arr.reduce(function(item, next) {
    hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next))
    return item
  }, [])
}

export function uniqueArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Param must be Array type.')
  }
  try {
    return [...new set(arr)]
  } catch (error) {
    return Array.prototype.filter.call(arr, function(item, index) {
      return arr.indexOf(item) === index
    })
  }
}

/**
 * 为数组添加新的自定义键值以及过滤每个子项的方法
 *
 * @param {*} arr
 * @param {*} obj { isShow:false,isStar:false} 第二个参数为 Function 时
 * @param {*} filterFn 第二个参数为 Object 时
 * @returns Array
 */
export function addKey(sourceArray, extendObj, filterFn) {
  var getType = function(a) {
    var typeArray = Object.prototype.toString.call(a).split(' ')
    return typeArray[1].slice(0, -1)
  }
  var secondParamType = getType(arguments[1])

  if (!getType(sourceArray) == 'Array') {
    throw new Error('第一个参数必须为数组类型')
  }
  if (secondParamType === 'Object') {
    return sourceArray.forEach((v, index, sourceArray) => {
      for (var key in extendObj) {
        v[key] = extendObj[key]
      }
      typeof filterFn === 'function' ? filterFn(v, index, sourceArray) : ''
    })
  } else if (secondParamType === 'Function') {
    return sourceArray.forEach((v, index, sourceArray) => {
      typeof arguments[1] === 'function' ? arguments[1](v, index, sourceArray) : ''
    })
  } else {
    return sourceArray
  }
}

/**
 *
 * @param {*} arr
 * @param {*} props 数组子项排序的key
 * @param {*} type 默认正序，传 'desc`为倒序排列
 * @returns
 */
export function sortBy(arr, props, type) {
  return arr.sort(function(a, b) {
    if (type === 'desc') {
      return b[props] - a[props]
    }
    return a[props] - b[props]
  })
}

// 数组乱序
export function shuffle(a) {
  var j, x, i
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i)
    x = a[i - 1]
    a[i - 1] = a[j]
    a[j] = x
  }
  return a
}

// https://www.30secondsofcode.org/js/s/sort-array-of-objects/
export const orderWith = (arr, prop, order) => {
  const orderValues = order.reduce((acc, v, i) => {
    acc[v] = i
    return acc
  }, {})
  return [...arr].sort((a, b) => {
    if (orderValues[a[prop]] === undefined) return 1
    if (orderValues[b[prop]] === undefined) return -1
    return orderValues[a[prop]] - orderValues[b[prop]]
  })
}

/* const users = [
  { name: 'fred', language: 'Javascript' },
  { name: 'barney', language: 'TypeScript' },
  { name: 'frannie', language: 'Javascript' },
  { name: 'anna', language: 'Java' },
  { name: 'jimmy' },
  { name: 'nicky', language: 'Python' }
]

orderWith(users, 'language', ['Javascript', 'TypeScript', 'Java']) */
/*
[
  { name: 'fred', language: 'Javascript' },
  { name: 'frannie', language: 'Javascript' },
  { name: 'barney', language: 'TypeScript' },
  { name: 'anna', language: 'Java' },
  { name: 'jimmy' },
  { name: 'nicky', language: 'Python' }
]
*/

/**
 * Splits an array into chunks of a specified size.
 * create by https://github.com/copilot/
 *
 * @param {Array} array - The array to be split.
 * @param {number} size - The size of each chunk.
 * @returns {Array} - An array containing the chunks.
 */
export function splitArray(array, size) {
  if (!Array.isArray(array)) {
    throw new TypeError('Input should be an array')
  }
  if (typeof size !== 'number' || size <= 0) {
    throw new TypeError('Size should be a positive number')
  }

  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

/**
 * 数组扁平化 - 将多维数组转换为一维数组
 * @param {Array} arr - 要扁平化的数组
 * @param {number} depth - 扁平化的深度，默认为 Infinity
 * @returns {Array} - 扁平化后的数组
 */
export function flatten(arr, depth = Infinity) {
  return Array.isArray(arr)
    ? arr.reduce((flat, toFlat) => {
        return flat.concat(depth > 1 && Array.isArray(toFlat) ? flatten(toFlat, depth - 1) : toFlat)
      }, [])
    : arr
}

/**
 * 查找数组中符合条件的最后一个元素的索引
 * @param {Array} array - 要搜索的数组
 * @param {Function} predicate - 判断函数
 * @returns {number} - 找到的元素索引，未找到返回 -1
 */
export function findLastIndex(array, predicate) {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i
    }
  }
  return -1
}

/**
 * 获取数组的交集
 * @param {...Array} arrays - 要计算交集的数组列表
 * @returns {Array} - 包含所有数组共有元素的新数组
 */
export function intersection(...arrays) {
  return arrays.reduce((result, array) => {
    return result.filter(item => array.includes(item))
  })
}

/**
 * 数组差集 - 返回第一个数组中存在但其他数组中不存在的元素
 * @param {Array} array - 主数组
 * @param {...Array} others - 其他数组
 * @returns {Array} - 差集数组
 */
export function difference(array, ...others) {
  const combined = [].concat(...others)
  return array.filter(item => !combined.includes(item))
}

/**
 * 数组分组 - 根据条件将数组元素分组
 * @param {Array} array - 要分组的数组
 * @param {Function} iteratee - 分组条件函数
 * @returns {Object} - 分组后的对象
 */
/**
 * 数组分组 - 根据条件将数组元素分组
 * @param {Array} array - 要分组的数组
 * @param {Function} iteratee - 分组条件函数
 * @returns {Object} - 分组后的对象
 * @example
 * // 按照数字的奇偶性分组
 * groupBy([1, 2, 3, 4], num => num % 2 === 0 ? '偶数' : '奇数')
 * // 返回: { '奇数': [1, 3], '偶数': [2, 4] }
 *
 * // 按照对象的某个属性分组
 * groupBy([
 *   { name: '张三', age: 20 },
 *   { name: '李四', age: 20 },
 *   { name: '王五', age: 25 }
 * ], 'age')
 * // 返回: { '20': [{name:'张三',age:20}, {name:'李四',age:20}], '25': [{name:'王五',age:25}] }
 */
export function groupBy(array, iteratee) {
  return array.reduce((result, item) => {
    const key = typeof iteratee === 'function' ? iteratee(item) : item[iteratee]
    ;(result[key] || (result[key] = [])).push(item)
    return result
  }, {})
}

/**
 * 移除数组中的指定元素
 * @param {Array} array - 要操作的数组
 * @param {...*} values - 要移除的元素列表
 * @returns {Array} - 新数组
 */
export function without(array, ...values) {
  return array.filter(item => !values.includes(item))
}

/**
 * 获取数组中指定范围的元素
 * @param {Array} array - 源数组
 * @param {number} start - 起始索引
 * @param {number} end - 结束索引
 * @returns {Array} - 新数组
 */
export function slice(array, start, end) {
  const length = array.length
  start = start == null ? 0 : start
  end = end == null ? length : end

  if (start < 0) {
    start = -start > length ? 0 : length + start
  }
  if (end < 0) {
    end += length
  }
  end = start > end ? 0 : end

  return array.slice(start, end)
}
