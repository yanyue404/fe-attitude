# 手写篇

**JavaScript 必写**

- 数组排序（多种方法）
- 数组去重（多种方法）
- 数组扁平化
- 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组
- 深拷贝
- 函数防抖节流
- 实现函数原型方法 call apply bind
- 实现数组原型方法 forEach map filter some reduce
- 实现 Promise
- 实现 Promise.all
- 实现 Promise.allSettled
- 封装事件类 EventEmitter（发布订阅模式）
- 模拟 localStorage 时如何实现过期时间功能

**JavaScript 编码能力**

- 函数柯里化
- 函数记忆
- 对象比较
- 计算字符串中出现最多的字母与出现次数
- 实现一个 trim 方法
- js 实现一个函数 获得 url 参数的值
- 驼峰转下划线：appleOrangePinkBoy => apple_orange_pink_boy
- 实现一个 get 方法通过`.`来取对象的值
- 封装一下 axios 或者手写封装 ajax
- 实现一个 once 函数，传入函数参数只执行一次
- 实现一个简单的模板字符串替换
- 合并对象 merge
- 求多个数组之间的交集
- 实现一个版本比较方法 compareVersion
- 实现一个批量请求函数，能够限制并发量？
- 写出一个函数 trans, 将数字转换成汉语的输出，输入为步炒个股 10000 亿的数字。
- 实现一个 Dialog 类，Dialog 可以创建 dialog 对话框，对话框支持可拖拽
- 扁平数组转树结构

**考虑加入新的问题：**

- [开个新坑，手摸手解析 63 道 JS 手写面试题](https://juejin.cn/post/7168847564408619044)

## JavaScript 必写

### 数组排序（多种方法）

```js
// 冒泡排序
// 冒泡排序的原理如下:
// 从第一个元素开始，把当前元素和下一个元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时(一轮结束后)最后一个元素就是该数组中最大的数
// 下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 length - 1 -i  的位置
function bubble(array) {
  for (let i = 0; i < array.length - 1; i++) {
    console.log('第' + (i + 1) + '轮开始')
    let flag = true
    // 从 0 到 `length - 1` 遍历
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        flag = false
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        console.log('第' + (j + 1) + '次：' + array.toString(array))
      }
    }
    if (flag) {
      console.log('第' + (i + 1) + '轮后数据结束变化更新')
      break
    }
  }
  return array
}

console.log(bubble([3, 2, 1, 4, 8, 6, 7]))
// 第1轮开始
// 第1次：2,3,1,4,8,6,7
// 第2次：2,1,3,4,8,6,7
// 第5次：2,1,3,4,6,8,7
// 第6次：2,1,3,4,6,7,8
// 第2轮开始
// 第1次：1,2,3,4,6,7,8
// 第3轮开始
// 第3轮后数据结束变化更新

// 时间复杂度是 O(n * n)
```

```js
// http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
// 快排
// 快排的原理如下：
//  第一步，选择中间的元素作为"基准"。（基准值可以任意选择，但是选择中间的值比较容易理解。）
//  第二步，按照顺序，将每个元素与"基准"进行比较，形成两个子集，一个"小于基准"，另一个"大于基准"。
//  第三步，对两个子集不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr //递归出⼝
  }
  var pivotIndex = Math.floor(arr.length / 2)
  // 取出基准值
  var pivot = arr.splice(pivotIndex, 1)
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(pivot, quickSort(right))
}
// 该算法的复杂度和归并排序是相同的，但是额外空间复杂度比归并排序少，只需 O(logN)，并且相比归并排序来说，所需的常数时间也更少。
console.log(quickSort([3, 2, 1, 4, 8, 6, 7]))
```

```js
// 原地快排
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return
  let left = low
  let right = high
  let flag = arr[left]
  // 判断左右游标是否重合，如果重合，循环结束
  while (left < right) {
    // 右边大,继续向左比较
    if (flag <= arr[right]) {
      right--
    }
    // 交换下一个可能不合理的位置
    arr[left] = arr[right]
    // 左边大,继续向右比较
    if (flag >= arr[left]) {
      left++
    }
    // 交换下一个
    arr[right] = arr[left]
  }
  //重合之后，交换基准数
  arr[left] = flag
  quickSort(arr, low, left - 1)
  quickSort(arr, left + 1, high)

  return arr
}
console.log(quickSort([4, 3, 8, 1, 9, 6, 2]))
```

### 数组去重（多种方法）

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

### 数组扁平化

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
        res.concat(item)
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

ES6 增加了扩展运算符，用于取出参数对象的所有可遍历属性，拷贝到当前对象之中：

```js
var arr = [1, [2, [3, 4]]]
console.log([].concat(...arr)) // [1, 2, [3, 4]]
```

### 将数组扁平化并去除其中重复数据，最终得到一个升序且不重复的数组

```js
Array.prototype.flat = function() {
  return [].concat(...this.map(item => (Array.isArray(item) ? item.flat() : [item])))
}

Array.prototype.unique = function() {
  return [...new Set(this)]
}

const sort = (a, b) => a - b

console.log(
  arr
    .flat()
    .unique()
    .sort(sort)
) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]
```

### 深拷贝

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

### 函数防抖节流

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

### 实现函数原型方法 call apply bind

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

### 实现数组原型方法 forEach map filter some reduce

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

### 实现 Promise

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

### 实现 Promise.all

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

### 实现 Promise.allSettled

如果任意的 promise reject，则 Promise.all 整个将会 reject。当我们需要 所有 结果都成功时，它对这种“全有或全无”的情况很有用：Promise.allSettled 等待所有的 promise 都被 settle，无论结果如何。结果数组具有：

- {status:"fulfilled", value:result} 对于成功的响应，
- {status:"rejected", reason:error} 对于 error。

```js
Promise.allSettled = function(promises) {
  const rejectHandler = reason => ({ status: 'rejected', reason })
  const resolveHandler = value => ({ status: 'fulfilled', value })
  const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler))
  return Promise.all(convertedPromises)
}
```

### 封装事件类 EventEmitter（发布订阅模式）

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

```js
function mitt(all) {
  return {
    all: (all = all || new Map()),
    on(eventName, callback) {
      let cbs = all.get(eventName)
      ;(cbs && cbs.push(callback)) || all.set(eventName, [callback])
    },
    emit(eventName, ...args) {
      let cbs = all.get(eventName)
      if (cbs.length === 0) {
        console.error(`no find ${eventName} function.`)
        return
      }
      cbs.forEach(cb => cb(args))
    },
    off(eventName, callback) {
      let cbs = all.get(eventName)
      cbs &&
        all.set(
          eventName,
          cbs.filter(cb => cb !== callback)
        )
    }
  }
}

const eventHub = new mitt()

eventHub.on('click', console.log)

setTimeout(() => {
  eventHub.emit('click', 'yanyue404')
  eventHub.off('click', console.log)
}, 1500)

setTimeout(() => {
  eventHub.emit('click', '1024')
}, 1500)
```

### 模拟 localStorage 时如何实现过期时间功能

扩展 localStorage 支持 expires

```js
;(function() {
  var getItem = localStorage.getItem.bind(localStorage)
  var setItem = localStorage.setItem.bind(localStorage)
  var removeItem = localStorage.removeItem.bind(localStorage)
  localStorage.getItem = function(keyName) {
    var expires = getItem(keyName + '_expires')
    if (expires && new Date() > new Date(Number(expires))) {
      removeItem(keyName)
      removeItem(keyName + '_expires')
    }
    return getItem(keyName)
  }
  localStorage.setItem = function(keyName, keyValue, expires) {
    if (typeof expires !== 'undefined') {
      var expiresDate = new Date(expires).valueOf()
      setItem(keyName + '_expires', expiresDate)
    }
    return setItem(keyName, keyValue)
  }
})()

// 使用
localStorage.setItem('key', 'value', new Date() + 10000) // 10 秒钟后过期
localStorage.getItem('key')
```

## JavaScript 编码能力

### 函数柯里化

函数柯里化概念： 柯里化（Currying）是把接受多个参数的函数转变为接受一个单一参数的函数，并且返回接受余下的参数且返回结果的新函数的技术。

```js
const add = (x, y, z) => x + y + z

const adding = (...args) => args.reduce((pre, cur) => pre + cur, 0)

// 参数确定
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

//参数不确定
const currying = fn => {
  let args = []

  return function temp(...newArgs) {
    if (newArgs.length) {
      args.push(...newArgs)
      return temp
    } else {
      const val = fn.apply(this, args)
      args = []
      return val
    }
  }
}

let addCurry = currying(adding)
console.log(addCurry(1)(2)(3)(4, 5)()) //15
console.log(addCurry(1)(2)(3, 4, 5)()) //15
console.log(addCurry(1)(2, 3, 4, 5)()) //15
```

### 函数记忆

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

### 函数组合

```js
/**
 * 执行从右到左的功能组合
 */
function compose(...funcs) {
  return function(result) {
    let list = funcs.slice()
    while (list.length > 0) {
      // 从列表中取第一个函数并执行
      result = list.pop()(result)
    }
    return result
  }
}
```

```js
/**
 * 执行从左到右的功能组合
 */
function pipe(initialValue, ...funcs) {
  return funcs.reduce((preValue, curFunc) => curFunc(preValue), initialValue)
}
```

### 对象比较

```js
function isObject(value) {
  var type = typeof value
  return value != null && (type == 'object' || type == 'function')
}
/**
 * form vue
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual(a, b) {
  if (a === b) return true
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i])
          })
        )
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key])
          })
        )
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
```

### 计算字符串中出现最多的字母与出现次数

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

### 实现一个 trim 方法

```js
// 删除左右的空格
const trim = s => s.replace(/(^\s+)|(\s+$)/g, '')
// 删除所有的空格
const trimAll = s => s.replace(/\s/g, '')
const greeting = '   Hello world!   '

console.log(trim(greeting)) // Hello world!
console.log(trimAll(greeting)) // Helloworld!
```

### js 实现一个函数 获得 url 参数的值

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

### 驼峰转下划线：appleOrangePinkBoy => apple_orange_pink_boy

```js
;(() => {
  let str = 'appleOrangePinkBoy'
  function underline(str) {
    // \B 非单词边界，左右占位的字符必须是 \w ([0-9a-zA-Z_])
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

### 实现一个 get 方法通过`.`来取对象的值

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

### 封装一下 axios 或者手写封装 ajax

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

### 实现一个 once 函数，传入函数参数只执行一次

```js
function once(func) {
  var flag = true
  return function() {
    if (flag == true) {
      func.apply(null, arguments)
      flag = false
    }
    return undefined
  }
}
```

### 实现一个简单的模板字符串替换

```js
const render = function(tpl, data) {
  // m 参数为 匹配的子串
  // p1 参数为 (.*?)的匹配结果
  return tpl.replace(/\{\{(.*?)\}\}/g, function(match, p1) {
    return data[p1.trim()]
  })
}

const text = render('我是{{ name}}，年龄{{age}}，性别{{sex}}', {
  name: 'yanyue404',
  age: 18,
  sex: '男'
})
console.log(text)
```

```js
const tpl = "Hei, my name is <% name%>, and I'm <%age%> years old."

const render = (tpl, context) =>
  tpl.replace(/<%(.*?)%>/g, function(_, m) {
    return data[m.trim()]
  })

console.log(
  render(tpl, {
    name: 'Rainbow',
    age: '20'
  })
)
```

### 合并对象 merge

```js
const merge = (obj, target = {}) => {
  Object.keys(obj).forEach(key => {
    if (isObject(obj[key])) {
      if (isObject(target[key])) {
        // 都是对象
        Object.keys(obj[key]).forEach(prop => {
          target[key][prop] = obj[key][prop]
        })
      } else {
        // target不是对象 直接重写
        if (target[key]) {
          target[key] = {
            [key]: target[key],
            ...obj[key]
          }
        } else {
          target[key] = obj[key]
        }
      }
    } else {
      if (isObject(target[key])) {
        target[key] = {
          ...target[key],
          [key]: obj[key]
        }
      } else {
        target[key] = obj[key]
      }
    }
  })
  return target
}
const obj1 = {
  pid: 1,
  signup: '注册',
  menu: '菜单',
  headers: {
    common: 'common'
  }
}
const obj2 = {
  pid: 2,
  signup: {
    sin: 2
  },
  menu: {
    id: 1
  },
  headers: {
    test: 123
  }
}
const result = merge(obj1, obj2)
// {
//   pid: 2,
//   signup: { signup: '注册', sin: 2 },
//   menu: { menu: '菜单', id: 1 },
//   headers: { common: 'common', test: 123 }
// }
console.log(result)
```

### 求多个数组之间的交集

```js
let array1 = [1, 2, 3, 4, 5, 6, 7, 7]
let array2 = [2, 3, 4, 5, 6, 7, 7, 8, 9]
let array3 = [4, 5, 6, 7, 7, 8, 9]
let array4 = []

function intersection(...args) {
  return Array.from(
    new Set(
      args.reduce((prev, curr) => {
        return prev.filter(item => curr.includes(item))
      })
    )
  )
}
console.log(intersection(array1, array3, array3)) // [4,5,6,7]
console.log(intersection(array4)) // []
```

### 实现一个版本比较方法 compareVersion

```js
//   compareVersion("1.11.0", "1.9.9"); // 1
function compareVersion(currVersion, comparedVersion) {
  if (currVersion && comparedVersion) {
    let v1 = currVersion.split('.')
    let v2 = comparedVersion.split('.')
    const len = Math.max(v1.length, v2.length)

    while (v1.length < len) {
      v1.push('0')
    }
    while (v2.length < len) {
      v2.push('0')
    }

    for (let i = 0; i < len; i++) {
      const num1 = parseInt(v1[i])
      const num2 = parseInt(v2[i])

      if (num1 > num2) {
        return 1
      } else if (num1 < num2) {
        return -1
      }
    }
    return 0
  }
  return -1
}
```

## 实现一个批量请求函数，能够限制并发量？ multiRequest(urls, maxNum)

要求如下：

1. 要求最大并发数 maxNum
2. 每当有一个请求返回，就留下一个空位，可以增加新的请求
3. 所有请求完成后，结果按照 urls 里面的顺序依次打出

```js
const fetch = url => {
  return new Promise(rs => {
    const s = Math.random() * 1000
    console.log('fetch:' + url + ', and wait ' + s)
    setTimeout(() => {
      rs(url)
    }, s)
  })
}

const multiRequest = (urls, maxNum) => {
  let allPromise = []
  let len = urls.length
  let resolve
  let indirectPromise = new Promise(rs => {
    resolve = rs
  })
  let i = 0

  let addFetch = () => {
    if (i >= len) {
      console.log('任务攒够了，抛出')
      return resolve()
    }
    let tempP = fetch(urls[i++]).finally(() => {
      console.log('新任务', i)
      addFetch()
    })
    allPromise.push(tempP)
  }
  // 这里需要限定一下
  while (i < maxNum && i < len) {
    addFetch()
  }

  return indirectPromise.then(() => {
    console.log('allPromise', allPromise)
    return Promise.all(allPromise)
  })
}

multiRequest(['/a', '/b', '/c', '/d', '/e', '/f', '/g', '/h', '/i', '/j', '/k'], 3).then(res => {
  console.log(res)
})

/* 
fetch:/a, and wait 743.1379647505718
fetch:/b, and wait 379.15112603161805
fetch:/c, and wait 941.1622508744957
新任务 3
fetch:/d, and wait 559.7579622045357
新任务 4
fetch:/e, and wait 244.45715600597205
新任务 5
fetch:/f, and wait 102.12226770094213
新任务 6
fetch:/g, and wait 481.9297045173498
新任务 7
fetch:/h, and wait 362.52573025806487
新任务 8
fetch:/i, and wait 8.548277259090131
新任务 9
fetch:/j, and wait 748.1963492311971
新任务 10
fetch:/k, and wait 5.76039997427813
新任务 11
任务攒够了，抛出
allPromise Array(11)
新任务 11
任务攒够了，抛出
新任务 11
任务攒够了，抛出
Array(11) 
*/
```

TODO:

## 写出一个函数 trans, 将数字转换成汉语的输出，输入为步炒个股 10000 亿的数字。

TODO:

## 实现一个 Dialog 类，Dialog 可以创建 dialog 对话框，对话框支持可拖拽

```js
class Dialog {
  constructor(text) {
    this.lastX = 0
    this.lastY = 0
    this.x
    this.y
    this.text = text || ''
    this.isMoving = false
    this.dialog
  }
  open() {
    const model = document.createElement('div')
    model.id = 'model'
    model.style = `
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        background-color:rgba(0,0,0,.3);
        display:flex;
        justify-content: center;
        align-items: center;`
    model.addEventListener('click', this.close.bind(this))
    document.body.appendChild(model)
    this.dialog = document.createElement('div')
    this.dialog.style = `
        padding:20px;
        background-color:white`
    this.dialog.innerText = this.text
    this.dialog.addEventListener('click', e => {
      e.stopPropagation()
    })
    this.dialog.addEventListener('mousedown', this.handleMousedown.bind(this))
    document.addEventListener('mousemove', this.handleMousemove.bind(this))
    document.addEventListener('mouseup', this.handleMouseup.bind(this))
    model.appendChild(this.dialog)
  }
  close() {
    this.dialog.removeEventListener('mousedown', this.handleMousedown)
    document.removeEventListener('mousemove', this.handleMousemove)
    document.removeEventListener('mouseup', this.handleMouseup)
    document.body.removeChild(document.querySelector('#model'))
  }
  handleMousedown(e) {
    this.isMoving = true
    this.x = e.clientX
    this.y = e.clientY
  }
  handleMousemove(e) {
    if (this.isMoving) {
      this.dialog.style.transform = `translate(${e.clientX - this.x + this.lastX}px,${e.clientY -
        this.y +
        this.lastY}px)`
    }
  }
  handleMouseup(e) {
    this.lastX = e.clientX - this.x + this.lastX
    this.lastY = e.clientY - this.y + this.lastY
    this.isMoving = false
  }
}
let dialog = new Dialog('Hello')
dialog.open()
```

## 扁平数组转树结构

```js
// 转换前：
const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
]
// 转换为:
const tree = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3
          }
        ]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0,
    children: [
      {
        id: 5,
        name: '部门E',
        parentId: 2
      },
      {
        id: 7,
        name: '部门G',
        parentId: 2
      }
    ]
  }
]

//   例 1; 暴力解开
function convert(arr) {
  const map = {}
  arr.forEach(v => {
    map[v.id] = v
  })

  for (const item of arr) {
    let parent = map[item.parentId]
    if (parent) {
      parent.children = Array.isArray(parent.children) ? [...parent.children, item] : [item]
    }
  }

  return Object.values(map).filter(v => v.parentId === 0)
}
// 利用 对象引用类型，浅拷贝
function convert1(arr) {
  let res = []
  // 使用Map保存id和对象的映射
  const map = {}
  arr.forEach(v => {
    map[v.id] = v
  })

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (item.parentId === 0) {
      res.push(item)
    }
    // in 操作符可以用来判断一个属性是否属于一个对象，它的返回值是一个布尔值
    if (item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  console.log(map)
  return res
}

// 上一版微调
function convert2(arr) {
  let res = []
  // 使用Map保存id和对象的映射
  const map = {}
  arr.forEach(v => {
    map[v.id] = v
  })
  // 建立映射表，一次遍历，直接去找父节点，找到对应父节点则把自己 push 进父节点的 children

  // https://juejin.cn/post/7038871147286364173
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    let parent = map[item.parentId]
    if (parent) {
      parent.children = parent.children || []
      parent.children.push(item)
    } else {
      res.push(item)
    }
  }
  return res
}

// 递归
function convert3(arr) {
  let res = []

  const getChildren = item => {
    let children = []
    arr.forEach((n, index) => {
      if (n.parentId === item.id) {
        children.push(n)
        item['children'] = children
        getChildren(n)
      }
    })
  }

  arr.forEach((item, index) => {
    if (item.parentId === 0) {
      res.push(item)
      getChildren(item)
    }
  })

  return res
}
//   console.log(convert3(list))
// https://juejin.cn/post/7037078362417791007
function convert4(arr, id) {
  const res = []
  for (const item of arr) {
    if (item.parentId === id) {
      // 找到当前id的子元素
      // 插入子元素，每个子元素的children通过回调生成
      res.push({ ...item, children: convert4(arr, item.id) })
    }
  }
  return res
}

//   console.log(convert4(list, 0))
//   https://juejin.cn/post/7098649784562483230
function convert5(arr, id) {
  // 利用两层filter实现
  let data = arr.filter(item => {
    item.children = arr.filter(e => {
      return item.id === e.parentId
    })
    return item.parentId === 0
  })

  return data
}

console.log(convert5(list, 0))
```

## 参考链接

- https://github.com/mqyqingfeng/Blog
- https://xiedaimala.com/
- https://github.com/Advanced-Frontend/Daily-Interview-Question
