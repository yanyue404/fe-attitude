## 目录

- 检测数据类型的方法
- 计算字符串中出现最多的字母与出现次数
- 实现一个 trim 方法
- js 实现一个函数 获得 url 参数的值
- 驼峰转下划线：appleOrangePinkBoy => apple_orange_pink_boy
- 实现一个 get 方法通过`.`来取对象的值
- 封装一下 axios 或者手写封装 ajax
- 封装事件类（发布订阅者模式）
- 数组排序（多种方法）
- 数组去重（多种方法）
- 数组扁平化
- 深拷贝
- 函数防抖节流
- 实现一个 once 函数，传入函数参数只执行一次
- 函数柯里化
- 函数记忆
- 实现数组原型方法 forEach map filter some reduce
- 实现函数原型方法 call apply bind
- 实现 Promise
- 实现 Promise.all

## 检测数据类型的方法

```js
/**
 * 判断数据类型
 *
 * @param {*} a
 * @returns Boolean String Array Object Function Number Undefined Null [Object ]
 */
function getType(a) {
  return Object.prototype.toString.call(a).slice(8, -1)
}
```

## 计算字符串中出现最多的字母与出现次数

```js
let str = 'configureyourdevicetousewhistleasitsHTTPandHTTPSproxyonIP'
let str2 = 'aabbcbc'

// o、e 出现了 5 次

function getMaxString(string) {
  const map = {}
  let max = 1
  let maxKeys = []
  for (let i = 0; i < string.length; i++) {
    let key = string[i]
    map[key] ? map[key]++ : (map[key] = 1)
    if (map[key] > max) {
      max = map[key]
      maxKeys = [key]
    } else if (map[key] === max) {
      maxKeys.push(key)
    }
  }

  console.log('最大值存在多个', maxKeys.join('、') + '出现了 ' + max + '次')
  return [max, maxKeys]
}

getMaxString(str) // 5, ['e','o']
getMaxString(str2) // 3, ['b']
```

## 实现一个 trim 方法

```js
const trim = s => s.replace(/\s/g, '')
const greeting = '   Hello world!   '

console.log(greeting)
// expected output: "   Hello world!   ";

console.log(trim(greeting))
// expected output: "Hello world!";
```

## js 实现一个函数 获得 url 参数的值

1. 将 `http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled`解析为如下格式：

```js
{
   user: 'anonymous',
   id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
   city: '北京', // 中文
   enabled: true, // 未指定值的 key 约定值为 true
}
```

```js
let url = `http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled`

function getQueryJson(url = '') {
  let json = {}
  url = decodeURIComponent(url || location.href)
  if (typeof url !== 'string') return json
  let splits = url.split('?')
  if (splits && splits.length >= 2) {
    let paramsArr = splits[1].split('&')
    if (paramsArr && paramsArr.length > 0) {
      json = paramsArr.reduce((o, item) => {
        const [key, value] = item.split('=')
        if (key && !o[key]) {
          o[key] = value === undefined ? true : value
        } else {
          if (!Array.isArray(o[key])) {
            o[key] = [o[key]].concat(value)
          } else {
            o[key] = o[key].push(value)
          }
        }
        return o
      }, {})
    }
  }

  return json
}
console.log(JSON.stringify(getQueryJson(url), null, 2))
/*  
    {
    user: "anonymous",
    id: ["123", "456"],
    city: "北京",
    d: true,
    enabled: true,
    }; */
```

## 驼峰转下划线：appleOrangePinkBoy => apple_orange_pink_boy

```js
;(() => {
  let str = 'appleOrangePinkBoy'
  function underline(str) {
    return str.replace(/\B([A-Z])/g, (m, p1) => `_${p1.toLowerCase()}`)
  }
  console.log(underline(str)) // apple_orange_pink_boy
})()

;(() => {
  let str = 'apple_orange_pink_boy'
  function decamelize(str) {
    return str.replace(/_(\w)/g, (m, p1) => p1.toUpperCase())
  }
  console.log(decamelize(str)) // appleOrangePinkBoy
})()
```

## 实现一个 get 方法通过`.`来取对象的值

```js
const obj = { a: [{ b: { c: 3 } }] }
function get(obj, path, def) {
  // https://jex.im/regulex/#!flags=&re=%5B%5C.%5C%5B%5C%5D%5D%2B
  let chain = Array.isArray(path) ? path : path.split(/[\.\[\]]+/)
  let val = chain.reduce((prev, curr) => {
    if (prev) {
      return (prev = prev[curr])
    } else {
      return prev
    }
  }, obj)
  return val === undefined ? def : val
}
console.log(get(obj, 'a.b', false)) // false
console.log(get(obj, 'pop_act.pic.aaaaaaaaa')) // undefined
console.log(get(obj, 'pop_act.pic.aaaaaaaaa', false)) // false
console.log(get(obj, ['a', 'b', 'c'])) // undefined
console.log(get(obj, ['a', '0', 'b', 'c'])) // 3
console.log(get(obj, 'a[0].b.c')) // 3
```

## 封装一下 axios 或者手写封装 ajax

```js
/**
 * 将参数对象转换为a=1&b=2字符串格式
 * @param {object} params 待转换的参数对象
 */
function stringify(params = {}) {
  let str = ''
  for (const key of Object.keys(params)) {
    str += `&${key}=${params[key]}`
  }
  return str.substring(1)
}
/**
 * ajax请求
 * @param {string} 请求链接
 * @param {string} 方法名，post|get
 * @param {object} 请求头
 * @param {params} 参数
 */
function ajax({ url = '', method = 'GET', headers = {}, params = {} } = {}) {
  return new Promise((resolve, reject) => {
    try {
      let xhr = new XMLHttpRequest()
      if (method === 'GET' && JSON.stringify(params) !== '{}') {
        url = url + '?' + stringify(params)
      } else if (method === 'POST') {
        xhr.open('POST', url, true)
        xhr.setRequestHeader('Content-type', 'application/json')
      }
      // true 为一个异步的请求
      xhr.open(method, url, true)
      for (const key of Object.keys(headers)) {
        xhr.setRequestHeader(key, headers[key])
      }
      xhr.send(method == 'POST' ? JSON.stringify(params) : '')
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
          let ret = xhr.response
          try {
            ret = JSON.parse(ret)
          } catch (err) {
            console.log(err)
          }
          resolve(ret)
        } else if (xhr.readyState == 4 && xhr.status != 200) {
          reject(xhr.response)
        }
      }
    } catch (err) {
      reject(err)
    }
  })
}
```

## 封装事件类（发布订阅者模式）

```js
class EventEmitter {
  constructor() {
    this._cache = {}
  }
  $on(type, callback) {
    if (this._cache[type]) {
      this._cache[type].push(callback)
    } else {
      this._cache[type] = [callback]
    }
    return this
  }
  $emit(type, data) {
    let fns = this._cache[type]
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
        fn(data)
      })
    }
    return this
  }
  $off(type, callback) {
    let fns = this._cache[type]
    if (Array.isArray(fns) && callback) {
      this._cache[type] = fns.filter(event => {
        return event !== callback
      })
    }
    return this
  }
  $once(type, callback) {
    let that = this
    function func() {
      var args = Array.prototype.slice.call(arguments, 0)
      callback.apply(that, args)
      that.$off(type, func)
    }
    this.$on(type, func)
  }
}

var Event = new EventEmitter()
Event.$once('addAddress', function(address) {
  console.log(JSON.stringify(address, null, 2))
})

Event.$emit('addAddress', {
  location: '北京',
  longitude: '116°20′',
  latitude: '39°56′'
})
Event.$once('once', function(res) {
  console.log(JSON.stringify(res, null, 2))
})

Event.$emit('once', {
  content: '我希望只能执行一次'
})
Event.$emit('once', {
  content: '我希望只能执行一次'
})
Event.$emit('once', {
  content: '我希望只能执行一次'
})
```

## 数组排序（多种方法）

```js
// 冒泡排序
;(() => {
  function swap(array, left, right) {
    let rightValue = array[right]
    array[right] = array[left]
    array[left] = rightValue
  }

  function bubble(array) {
    for (let i = 0; i < array.length - 1; i++) {
      let flag = true
      // 从 0 到 `length - 1` 遍历
      for (let j = 0; j < array.length - 1 - i; j++) {
        if (array[j] > array[j + 1]) {
          flag = false
          swap(array, j, j + 1)
        }
      }
      if (flag) {
        break
      }
    }
    return array
  }
  console.log(bubble([3, 2, 1, 4, 8, 6, 7]))
})()
```

## 数组去重（多种方法）

```js
//github.com/mqyqingfeng/Blog/issues/27

var array = [1, 2, 1, 1, '1']

;(() => {
  var unique = a => [...new Set(a)]
  console.log(unique(array)) // [1, 2, "1"]
})()

;(() => {
  function unique(array) {
    var res = []
    for (var i = 0, len = array.length; i < len; i++) {
      var current = array[i]
      if (res.indexOf(current) === -1) {
        res.push(current)
      }
    }
    return res
  }

  console.log(unique(array)) // [1, 2, "1"]
})()

;(() => {
  function unique(array) {
    var res = []
    for (var i = 0, len = array.length; i < len; i++) {
      var current = array[i]
      if (res.indexOf(current) === -1) {
        res.push(current)
      }
    }
    return res
  }

  console.log(unique(array)) // [1, 2, "1"]
})()

;(() => {
  function unique(array) {
    var res = array.filter(function(item, index, array) {
      //若当前元素所在的索引位置 === 在原始数组中出现该值的的第一个索引，则 true 返回当前元素
      return array.indexOf(item) === index
    })
    return res
  }

  console.log(unique(array))
})()

;(() => {
  function unique(array) {
    var o = new Map()
    // set 设置后返回新的 Map 对象
    return array.filter(key => !o.has(key) && o.set(key, true))
  }
  console.log(unique(array))
})()
```

## 数组扁平化

```js
let entry = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

// 实现 Array.prototype.flat()
// https://github.com/mqyqingfeng/Blog/issues/36

;(() => {
  function flatten(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
      let item = arr[i]
      if (Array.isArray(item)) {
        res = res.concat(flatten(item))
      } else {
        res.push(item)
      }
    }
    return res
  }
  console.log(flatten(arr)) // [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]
})()

;(() => {
  function flatten(arr) {
    return arr.reduce((prev, curr) => {
      return prev.concat(Array.isArray(curr) ? flatten(curr) : curr)
    }, [])
  }
  console.log(flatten(arr))
})()

;(() => {
  function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
      arr = [].concat(...arr)
    }
    return arr
  }
  console.log(flatten(arr))
})()
```

## 深拷贝

用 JSON，存在如下缺点：

- 不支持 Date、正则、undefined、函数等数据
- 不支持引用（即环状结构）

```js
const deepClone = o => JSON.parse(JSON.stringify(o))
```

基础版（新增函数函数类型支持），推荐使用 [lodash 的深拷贝函数](https://www.lodashjs.com/docs/lodash.cloneDeep)。

```js
function deepCopy(target) {
  if (typeof target == 'object') {
    const result = Array.isArray(target) ? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepCopy(target[key])
      } else {
        result[key] = target[key]
      }
    }
    return result
  } else if (typeof target == 'function') {
    return eval('(' + target.toString() + ')')
    // 也可以这样克隆函数
    // return new Function("return " + target.toString())();
  } else {
    return target
  }
}
```

**递归完整版本**

要点：

1.  递归
2.  判断类型
3.  不拷贝原型上的属性
4.  检查环

```js
const deepClone = (o, cache) => {
  if (!cache) {
    cache = new Map()
  }
  if (o instanceof Object) {
    if (cache.get(o)) {
      return cache.get(o)
    }
    let result

    if (o instanceof Function) {
      // 有 prototype 就是普通函数
      if (o.prototype) {
        result = function() {
          return o.apply(this, arguments)
        }
      } else {
        result = (...args) => {
          return o.call(undefined, ...args)
        }
      }
    } else if (o instanceof Array) {
      result = []
    } else if (o instanceof Date) {
      return +new Date(o)
    } else if (o instanceof RegExp) {
      result = new RegExp(o.source, o.flags)
    } else {
      // 最后是普通对象
      result = {}
    }
    // ! 只要拷贝过下次就不要拷贝了
    cache.set(o, result)
    for (const key in o) {
      if (o.hasOwnProperty(key)) {
        result[key] = deepClone(o[key], cache)
      }
    }
    return result
  } else {
    // string、number、boolean、undefined、null、symbol、bigint
    return o
  }
}
const a = {
  number: 1,
  bool: false,
  str: 'hi',
  empty1: undefined,
  empty2: null,
  array: [
    { name: 'frank', age: 18 },
    { name: 'jacky', age: 19 }
  ],
  date: new Date(2000, 0, 1, 20, 30, 0),
  regex: /\.(j|t)sx/i,
  obj: { name: 'frank', age: 18 },
  f1: (a, b) => a + b,
  f2: function(a, b) {
    return a + b
  }
}
a.self = a
var b = deepClone(a)
console.log(b)
console.log(b.self === b)
```

## 函数防抖节流

防抖与节流函数是一种最常用的 高频触发优化方式，能对性能有较大的帮助。

- **节流(throttle)**: 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms 执行一次即可。

```js
function throttle(fn, wait = 500, immediate) {
  let timer = null
  let callNow = immediate
  return function() {
    let context = this,
      args = arguments
    if (callNow) {
      fn.apply(context, args)
      callNow = false
    }
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(context, args)
        timer = null
      }, wait)
    }
  }
}
```

- **防抖 (debounce)**: 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

```js
function debounce(fn, wait = 1500, immediate) {
  let timer = null
  return function() {
    let args = arguments
    let context = this
    if (immediate && !timer) {
      fn.apply(context, args)
    }
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}
```

- [yanyue404 - 节流与防抖如何区分？](https://github.com/yanyue404/blog/issues/74)

## 实现一个 once 函数，传入函数参数只执行一次

```js
function once(func) {
  var tag = true
  return function() {
    if (tag == true) {
      func.apply(null, arguments)
      tag = false
    }
    return undefined
  }
}
```

## 函数柯里化

```js
const add = (x, y, z) => x + y + z
const curry = fn => {
  const fnLength = fn.length
  return function curried(...args) {
    if (args.length === fnLength) {
      return fn.apply(null, args)
    } else {
      return function(...reset) {
        return curried.apply(null, args.concat(reset))
      }
    }
  }
}
const curriedAdd = curry(add)

const result = curriedAdd(1)(2)(3)
const result2 = curriedAdd(1, 2, 3)
const result3 = curriedAdd(1, 2)(3)
console.log('result', result) // result 6
console.log('result2', result2) // result2 6
console.log('result3', result3) // result3 6
```

## 函数记忆

```js
// github.com/mqyqingfeng/Blog/issues/46
https: var memoize = function(func, hasher) {
  var memoize = function(key) {
    var cache = memoize.cache
    var address = '' + (hasher ? hasher.apply(this, arguments) : key)
    if (!cache[address]) {
      cache[address] = func.apply(this, arguments)
    }
    return cache[address]
  }
  memoize.cache = {}
  return memoize
}
var add = function(a, b, c) {
  return a + b + c
}
// 自定义存储 key
var memoizedAdd = memoize(add, function() {
  var args = Array.prototype.slice.call(arguments)
  return JSON.stringify(args)
})

console.log(memoizedAdd(1, 2, 3)) // 6
console.log(memoizedAdd(1, 2, 4)) // 7

// 适用场景：需要大量重复的计算，或者大量计算又依赖于之前的结果
;(() => {
  var count = 0
  var fibonacci = function(n) {
    count++
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
  }
  for (var i = 0; i <= 10; i++) {
    fibonacci(i)
  }

  console.log('优化前：' + count) // 453
})()

;(() => {
  var count = 0
  var fibonacci = function(n) {
    count++
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
  }

  fibonacci = memoize(fibonacci)

  for (var i = 0; i <= 10; i++) {
    fibonacci(i)
  }

  console.log('优化后：' + count) // 12
})()
```

## 实现数组原型方法 forEach map filter some reduce

```js
// forEach  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
;(() => {
  Array.prototype.forEach__fake = function(fn) {
    const array = this
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      fn.call(null, element, index, array)
    }
  }

  const array1 = ['a', 'b', 'c']

  array1.forEach__fake((element, i) => console.log(i, element))

  // expected output: 0 'a'
  // expected output: 1 'b'
  // expected output: 2 'c'
})()

// map https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
;(() => {
  Array.prototype.map__fake = function(fn) {
    let result = []
    const array = this
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      result[index] = fn.call(null, element, index, array)
    }
    return result
  }

  const array1 = [1, 4, 9, 16]

  // pass a function to map
  const map1 = array1.map__fake(x => x * 2)

  console.log(map1)
  // expected output: Array [2, 8, 18, 32]
})()
```

```js
// filter https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
;(() => {
  Array.prototype.filter__fake = function(fn) {
    let result = []
    const array = this
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      fn.call(null, element, index, array) ? result.push(element) : ''
    }
    return result
  }
  const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present']

  const result = words.filter__fake(word => word.length > 6)

  console.log(result)
  // expected output: Array ["exuberant", "destruction", "present"]
})()
```

```js
// some  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some
;(() => {
  Array.prototype.some__fake = function(fn) {
    let flag = false
    const array = this
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      if (fn.call(null, element, index, array)) {
        flag = true
        break
      }
    }
    return flag
  }
  const array = [1, 2, 3, 4, 5]

  // checks whether an element is even
  const even = element => element % 2 === 0

  console.log(array.some__fake(even))
  // expected output: true
})()

// reduce https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
;(() => {
  Array.prototype.reduce__fake = function(fn, initialValue) {
    let result = initialValue || 0
    const array = this
    for (let index = 0; index < array.length; index++) {
      const element = array[index]
      result = fn.call(null, result, element, index, array)
    }
    return result
  }
  const array1 = [1, 2, 3, 4]

  // 0 + 1 + 2 + 3 + 4
  const initialValue = 0
  const sumWithInitial = array1.reduce__fake(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  )

  console.log(sumWithInitial)
  // expected output: 10
})()
```

## 实现函数原型方法 call apply bind

```js
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
// https://github.com/mqyqingfeng/Blog/issues/11

Function.prototype.call__fake = function(context) {
  context = context || window
  let fn = this
  let exec = Symbol('fn')
  let args = [].slice.call(arguments, 1)
  // 将函数设为对象上的临时属性，函数内 this 保证正确
  context[exec] = fn
  // 执行函数，存储返回结果
  const result = context[exec](...args)
  // 删除临时变量
  delete context[exec]
  return result
}

var value = 2

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.call__fake(null) // 2

console.log(bar.call__fake(obj, 'kevin', 18))
// 1
// {value: 1, name: 'kevin', age: 18}
```

```js
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call
// https://github.com/mqyqingfeng/Blog/issues/11
Function.prototype.apply__fake = function(context) {
  context = context || window
  let fn = this
  let exec = Symbol('fn')
  let args = arguments[1] || []
  // 将函数设为对象的属性
  context[exec] = fn
  const result = context[exec](...args)
  delete context[exec]
  return result
}

var value = 2

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.apply__fake(null) // 2

console.log(bar.apply__fake(obj, ['kevin', 18]))
// 1
// {value: 1, name: 'kevin', age: 18}
```

```js
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
Function.prototype.bind__fake = function(context) {
  context = context || window
  let fn = this
  let exec = Symbol('fn')
  let args = [].slice.call(arguments, 1)
  // 将函数设为对象上的临时属性，函数内 this 保证正确
  context[exec] = fn
  return function() {
    // 执行函数，存储返回结果
    const result = context[exec](...args)
    // 删除临时变量
    delete context[exec]
    return result
  }
}

var value = 2

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value)
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.bind__fake(null)() // 2

console.log(bar.bind__fake(obj, 'kevin', 18)())
// 1
// {value: 1, name: 'kevin', age: 18}
```

## 实现 Promise

```js
class Promise__fake {
  constructor(executor) {
    this.status = 'pending'
    this.handleFulfilled = [] // 存储成功后的回调
    this.handleRejection = [] // 存储失败后的回调
    // ! resolve 形参的实际参数在这儿
    const resolve = data => {
      // 状态变更只有一次
      if (this.status !== 'pending') {
        return
      }
      this.status = 'fulfilled'
      // ! 等一会，否则 handleFulfilled 为空
      setTimeout(() => {
        this.handleFulfilled.forEach(fn => fn(data))
      }, 0)
    }
    const reject = reason => {
      if (this.status !== 'pending') {
        return
      }
      this.status = 'rejected'
      setTimeout(() => {
        this.handleRejection.forEach(fn => fn(reason))
      }, 0)
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      // 遇到错误时，捕获错误，执行 reject 函数
      reject(e)
    }
  }
  then(fulfilledFn, rejectedFn) {
    this.handleFulfilled.push(fulfilledFn)
    this.handleRejection.push(rejectedFn)
    return this
  }
}

//1. 链式测试
var p1 = new Promise__fake(function(resolve, reject) {
  console.log('init Promise')
  if (Math.random() > 0.5) {
    resolve('大')
  } else {
    reject('小')
  }
})
p1.then(
  data => console.log('success', data),
  reason => console.log('error', reason)
).then(
  () => console.log('success 2'),
  () => console.log('error 2')
)

// 2. 延时测试
var sleep = (time, data) =>
  new Promise__fake(function(resolve, reject) {
    setTimeout(resolve, time, data)
  })
sleep(3000, '时间到！').then(val => {
  console.log(val)
})

// 3. 状态变更后不可变
const p2 = new Promise__fake(function(resolve, reject) {
  resolve('失败了！')
  reject('还会成功吗！')
})
p2.then(
  data => console.log(data),
  reason => console.log(reason)
)
```

## 实现 Promise.all

```js
;(() => {
  var promise1 = 41
  var promise2 = 42
  var promise3 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 5000, 'foo')
  })
  var promise4 = new Promise(function(resolve, reject) {
    setTimeout(reject('[err]: 模拟错误'), 300)
  })

  function p1(time) {
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(time)
      }, time)
    })
  }

  // Promise 扩展
  Promise.all__fake = promiseAry => {
    return new Promise((resolve, reject) => {
      let resultAry = [],
        index = 0
      for (let i = 0; i < promiseAry.length; i++) {
        Promise.resolve(promiseAry[i])
          .then(result => {
            index++
            resultAry[i] = result
            if (index === promiseAry.length) {
              resolve(resultAry)
            }
          })
          .catch(reason => {
            reject(reason)
          })
      }
    })
  }

  Promise.all__fake([promise1, promise2, promise3]).then(function(values) {
    console.log(values) //  [41, 42, 'foo']
  })
  Promise.all__fake([promise4, promise2, promise3]).then(function(values) {
    console.log(values) // Uncaught (in promise) [err]: 模拟错误
  })
  Promise.all__fake([p1(5000), p1(1000)]).then(function(res) {
    console.log(res) //[5000,1000]
  })
})()
```

## 参考链接

- https://github.com/mqyqingfeng/Blog
- https://xiedaimala.com/
