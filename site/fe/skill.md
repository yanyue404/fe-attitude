## 工具方法

### load

```js
function loadCss(url, callback) {
  return new Promise(resolve => {
    var node = document.createElement('link')
    node.type = 'text/css'
    node.rel = 'stylesheet'
    node.href = url
    node.onerror = node.onload = function() {
      resolve()
      isFunction(callback) && callback()
    }
    document.head.appendChild(node)
  })
}

function loadJs(url, callback, attr) {
  if (!isFunction(callback)) {
    attr = callback
    callback = null
  }
  return new Promise((resolve, reject) => {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    if (isObject(attr)) {
      Object.keys(attr).forEach(key => {
        if (attr.hasOwnProperty(key)) {
          script.setAttribute(key, attr[key])
        }
      })
    }
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          isFunction(callback) && callback()
          resolve()
        }
      }
    } else {
      script.onload = function() {
        isFunction(callback) && callback()
        resolve()
      }
    }
    script.onerror = function() {
      reject()
    }
    script.src = url
    document.head.appendChild(script)
  })
}
```

### 加减乘除

```js
/**
 * 加法
 * @param  {...any} n
 */
function add(...n) {
  return n.reduce((ji, item) => {
    let l1 = (ji.toString().split('.')[1] || '').length
    let l2 = (item.toString().split('.')[1] || '').length
    let l = Math.pow(10, Math.max(l1, l2))
    return (ji * l + item * l) / l
  })
}

/**
 * 乘法
 * @param  {...any} n
 */
function mul(...n) {
  return n.reduce((ji, item) => {
    let n1 = (ji.toString().split('.')[1] || '').length
    let n2 = (item.toString().split('.')[1] || '').length
    return (ji * Math.pow(10, n1) * item * Math.pow(10, n2)) / Math.pow(10, n1 + n2)
  })
}

/**
 * 除法
 * @param  {...any} n
 */
function div(...n) {
  return n.reduce((ji, item) => {
    let n1 = (ji.toString().split('.')[1] || '').length
    let n2 = (item.toString().split('.')[1] || '').length
    return (ji * Math.pow(10, n1) * item * Math.pow(10, n2)) / Math.pow(10, n1 + n2)
  })
}

/**
 * 减法
 * @param  {...any} n
 */
function sub(...n) {
  return n.reduce((ji, item) => {
    let l1 = (ji.toString().split('.')[1] || '').length
    let l2 = (item.toString().split('.')[1] || '').length
    let n = Math.max(l1, l2)
    let l = Math.pow(10, n)
    return ((ji * l - item * l) / l).toFixed(n)
  })
}
```

### 深拷贝

```js
// 拷贝一个数组
let nums = [10, 1, 2, 3, 5, 7, 13]

console.log(Array.from(nums).sort((a, b) => a - b))
console.log([...nums].sort((a, b) => a - b))
console.log(nums.slice().sort((a, b) => a - b))
console.log(nums.map(v => v).sort((a, b) => a - b))
console.log(nums.filter(v => true).sort((a, b) => a - b))
console.log(Object.assign([], nums).sort((a, b) => a - b))

console.log('nums', nums) // [10, 1, 2, 3, 5, 7, 13]
```

```js
const deepClone = (o, cached) => {
  if (o instanceof Object) {
    let cache = new Map()
    let result

    if (o instanceof Function) {
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
      result = {}
    }
    for (const key in o) {
      if (Object.hasOwnProperty.call(o, key)) {
        if (cached && cached.has(o)) {
          result[key] = cached.get(key)
        } else {
          let val = deepClone(o[key], cache)
          cache.set(key, val)
          result[key] = val
        }
      }
    }
    return result
  } else {
    return o
  }
}

const a = {
  date: new Date(2020, 0, 1, 20, 30, 0),
  reg: /\s/g,
  number: 1,
  str: 'h1',
  empty1: undefined,
  empty2: null,
  array: [
    { name: 'yue', arge: 18 },
    { name: 'heizi', arge: 18 }
  ],
  obj: {
    name: 'yue',
    arge: 18
  },
  f1: (a, b) => a + b,
  f2: function(a, b) {
    return a + b
  }
}
a.self = a

const a2 = deepClone(a)

//   console.log(a2);
//   console.log(a2.f2(1, 2));
//   console.log(a2.f1(1, 2));
```

### 对象全等 looseEqual

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
    // 判断基本类型 number、string、boolean、null、undefined、Symbol、BigInt
    return String(a) === String(b)
  } else {
    return false
  }
}

const a = {
  weight: 8,
  fields: [
    {
      name: '全额缴费',
      value: 0
    },
    {
      name: '按月缴费',
      value: 1
    }
  ]
}
const b = {
  weight: '8',
  fields: [
    {
      name: '全额缴费',
      value: 0
    },
    {
      name: '按月缴费',
      value: 1
    }
  ]
}

console.log(looseEqual(a, b))
```

### 对象取键 get

```js
const obj = { a: [{ b: { c: 3 } }] }
function get(obj, path, def) {
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

### merge

```js
let base = {
  name: 'n20210033',
  version: '1.0.0',
  description: 'nprd-n20210033',
  author: 'itw_lilei01',
  private: true,
  config: {
    nuxt: {
      host: '0.0.0.0',
      port: '7711'
    }
  },
  scripts: {
    getCmsData: 'node build.js @LOCAL=true',
    serve: 'npm run getCmsData && cross-env PATH_TYPE=development nuxt',
    build: 'npm run getCmsData && cross-env nuxt build -a',
    generate: 'nuxt generate'
  },
  dependencies: {
    axios: '^0.21.1',
    'regenerator-runtime': '^0.13.7',
    'crypto-js': '^4.0.0',
    'node-rsa': '^1.1.1',
    nuxt: '2.11.0',
    qs: '^6.9.4',
    vant: '^2.9.1',
    'vuex-persistedstate': '^2.7.0'
  },
  devDependencies: {
    '@babel/preset-env': '^7.12.17',
    '@nuxtjs/proxy': '^1.3.3',
    '@nuxtjs/style-resources': '^1.2.1',
    'babel-plugin-import': '^1.13.3',
    'babel-plugin-lodash': '^3.3.4',
    'cross-env': '^5.2.1',
    less: '^4.1.1',
    'less-loader': '^7.2.1',
    'postcss-pxtorem': '^5.1.1',
    sass: '^1.29.0',
    'sass-loader': '^7.0.1',
    'webpack-spritesmith': '^1.1.0'
  }
}

let append = {
  config: {
    commitizen: {
      path: 'node_modules/cz-customizable'
    }
  },
  scripts: {
    prepare: 'husky install',
    lint: 'eslint --ext .vue pages/ --ext .vue components/prd --ext .js store/',
    prettier: 'prettier pages/** store/* components/prd/*  --write',
    'lint:fix': 'npm run lint -- --fix'
  },
  'lint-staged': {
    'pages/*.vue': ['eslint --fix', 'prettier --write', 'git add'],
    'store/*.js': ['eslint --fix', 'prettier --write', 'git add']
  }
}

function merge() {
  let isObj = s => '[object Object]' == Object.prototype.toString.call(s)
  let r = {}
  for (let i = 0, e = arguments.length; i < e; i++) {
    let m = arguments[i]
    if (isObj(m)) {
      for (let k in m) {
        let n = m[k]
        if (isObj(n)) {
          r[k] = merge(r[k] || {}, n)
        } else {
          r[k] = n
        }
      }
    } else {
      throw new Error('arguments must be pure object.')
    }
  }
  return r
}

let o = merge(base, append)

console.log(JSON.stringify(o, null, 2))
```

### 枚举

```js
/**
 * 枚举类型
 */
class Enum {
  constructor(array) {
    Object.defineProperty(this, '_map', {
      value: [...array],
      enumerable: false
    })
    for (const item of array) {
      this[item.key] = item.value
      Object.defineProperty(this, item.value, {
        value: item.key,
        enumerable: false
      })
    }
  }

  /**
   * 返回键值对数组
   * 形如[{key1: value1}, {key2: value2}]
   */
  all() {
    return this._map
  }
}

//证件类型
const CARD_TYPE = new Enum([
  {
    key: '01',
    value: '居民身份证'
  },
  {
    key: '02',
    value: '护照'
  },
  {
    key: '03',
    value: '军人证'
  },
  {
    key: '05',
    value: '港台同胞证'
  }
])

console.log(CARD_TYPE)
```

### 队列

```js
/**
 * 队列类型 先入先出
 */
class Queue {
  constructor() {
    this.items = []
  }
  all() {
    return this.items
  }
  push(v) {
    this.items.push(v)
  }
  pop() {
    return this.items.shift()
  }
  size() {
    return this.items.length
  }
  clear() {
    this.items = []
  }
}

const doSth = new Queue()

doSth.push({
  key: '01',
  value: '吃饭'
})
doSth.push({
  key: '02',
  value: '睡觉'
})
doSth.push({
  key: '03',
  value: '打豆豆'
})

console.log(doSth.pop())
console.log(doSth.pop())
console.log(doSth.pop())
```

### 栈

```js
/**
 * 栈类型 先入后出
 */
class Stack {
  constructor() {
    this.items = []
  }
  all() {
    return this.items
  }
  push(v) {
    this.items.push(v)
  }
  pop() {
    return this.items.pop()
  }
  size() {
    return this.items.length
  }
  clear() {
    this.items = []
  }
}

const doSth = new Stack()

doSth.push({
  key: '01',
  value: '吃饭'
})
doSth.push({
  key: '02',
  value: '睡觉'
})
doSth.push({
  key: '03',
  value: '打豆豆'
})

console.log(doSth.pop())
console.log(doSth.pop())
console.log(doSth.pop())
```

## 函数式

### 函数记忆

```js
/**
 * 缓存静态方法的value
 * @param {*} fn  fn 的参数中不能使用 引用类型
 */
function cacheStaticFn(fn) {
  const cacheMap = new Map()
  return (...args) => {
    let cacheKey = args.join('-')
    if (!cacheMap.has(cacheKey)) {
      cacheMap.set(cacheKey, fn(...args))
      console.log('存储: ', cacheMap)
    }
    console.log('已有结果')
    return cacheMap.get(cacheKey)
  }
}

function a() {
  console.log('do a =>')
  return 'a'
}
function b() {
  console.log('do d =>')
  return 'b'
}
const cacheA = cacheStaticFn(a)
const cacheB = cacheStaticFn(b)

cacheA() // log: do a => 存储:  Map(1) {'' => 'a'} => 已有结果
cacheA() // 已有结果
cacheA() // 已有结果

cacheB() // log: do b => 存储:  Map(1) {'' => 'b'} => 已有结果
cacheB() // 已有结果
cacheB() // 已有结果
```

**升级版**

```js
/**
 * 缓存函数
 * @param {function} func
 * @returns 一个会缓存结果的函数，只执行一次计算逻辑
 */
function cacheStaticFn(fn) {
  const cacheMap = new Map()
  return (...args) => {
    // ! 注: 真实项目使用 object-hash 生成参数为对象类型的唯一 key
    const cacheKey = args.length > 0 ? JSON.stringify(args) : 'value'
    if (!cacheMap.has(cacheKey)) {
      cacheMap.set(cacheKey, fn(...args))
      console.log('set =>', cacheMap)
    }
    console.log('get =>', cacheMap)

    return cacheMap.get(cacheKey)
  }
}
const getEntityApi = () => {
  return new Promise((resolve, reject) => {
    console.log('fetch getEntityApi...')
    setTimeout(() => {
      resolve({
        code: '0',
        data: {
          name: 'yanyue404'
        }
      })
    }, 3000)
  })
}
// 不带缓存的
const getEntity = () => {
  return new Promise(async (resolve, reject) => {
    const { code, data } = await getEntityApi()
    if (code === '0' && data) {
      resolve(data)
    }
  })
}

// 简写
const getEntityThen = () => {
  return getEntityApi().then(({ code, data }) => {
    if (code === '0' && data) {
      return data
    }
  })
}

// 带缓存的(无参)
const getEntity__cache = cacheStaticFn(() => {
  return new Promise(async (resolve, reject) => {
    const { code, data } = await getEntityApi()
    if (code === '0' && data) {
      resolve(data)
    }
  })
})

// 带缓存的（基础类型）
const getEntity__cache2 = cacheStaticFn(getEntityApi)

async function main() {
  // 缓存无参
  console.log(await getEntity__cache())
  // 缓存有参
  // params: 1
  // params: {id: 1}
  /*    getEntity__cache2({ id: 1 }).then(({ code, data }) => {
          if (code === "0" && data) {
            console.log("data", data);
          }
        }); */
}
main()

setTimeout(() => {
  main()
}, 3000)
```

### 函数柯里化

```js
const curry = function(fn) {
  const arity = fn.length // 获取参数个数 3
  console.log('arity', arity)
  return function $curry(...args) {
    console.log('参数的个数', arity)
    console.log('args', args)
    if (args.length === arity) {
      return fn.apply(this, args)
    } else {
      return function(...reset) {
        console.log('reset', reset)
        console.log('all args', args.concat(reset))
        return $curry.apply(this, args.concat(reset))
      }
    }
  }
}
/*     const curry = (fn, ...args) => {
        // 函数的参数个数可以直接通过函数数的.length属性来访问
        if (fn.length === args.length) {
          // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
          return fn.call(fn, ...args);
        }

        // 传入的参数小于原始函数fn的参数个数时
        // 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数）的函数
        return (...rest) => curry(fn, ...args, ...rest);
      }; */
const add = function(a, b, c) {
  return a + b + c
}

const curriedAdd = curry(add)
console.log(curriedAdd)

const result = curriedAdd(1)(2)

console.log('result:', result(3)) // 6

// const result2 = curriedAdd(1, 2)(3);

// console.log("result2:", result2); // 6

// const result3 = curriedAdd(1, 2, 3);

// console.log("result3:", result3); // 6
```

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
console.log('result', result)
console.log('result2', result2)
console.log('result3', result3)
```

### 函数管道 compose、pipe

```js
function pipe(...funcs) {
  return function(result) {
    let list = funcs.slice()
    while (list.length > 0) {
      // 从列表中取第一个函数并执行
      result = list.shift()(result)
    }
    return result
  }
}
// function compose(...funcs) {
//   return function (result) {
//     let list = funcs.slice();
//     while (list.length > 0) {
//       // 从列表中取第一个函数并执行
//       result = list.pop()(result);
//     }
//     return result;
//   };
// }

function compose(...funcs) {
  return function(value) {
    return funcs.reduceRight((reducer, reducer) => reducer(state), value)
  }
}
/*  function pipe(...funcs) {
        return function (value) {
          return funcs.reduce((state, reducer) => reducer(state), value);
        };
      } */
const join = (x, y) => `${x}${y}`
const firstUpperCase = str => {
  return str.slice(0, 1).toLocaleUpperCase() + str.slice(1)
}

const camelize = str => {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

const componentName = pipe(firstUpperCase, camelize)
const componentName2 = compose(camelize, firstUpperCase)
console.log(componentName('insure-step-by-step')) // InsureStepByStep
console.log(componentName2('tk-insurance-mall')) // TkInsuranceMall
```

## 算法

### 找出现最多次数的字母

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

```js
function randomStr(length) {
  let array = []
  const strPool = 'AAABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    array[i] = strPool[Math.floor(Math.random() * strPool.length)]
  }
  return array.join('')
}

var str = randomStr(1000000)

console.log(`目标字符串长度为${str.length}`)

function findByRegex() {
  console.time('findByRegex')
  let orderStr = str
    .split('')
    .sort()
    .join('')
  // let orderStr = str;
  let letter = ''
  let max = 0
  orderStr.replace(/([a-zA-Z])\1*/g, (subStr, char) => {
    if (subStr.length > max) {
      letter = char
      max = subStr.length
    }
  })
  console.log(`出现次数最多的字母是${letter},出现了${max}次`)
  console.timeEnd('findByRegex')
}

function findByLoop() {
  console.time('findByLoop')
  let letter = ''
  let max = 0
  let result = []
  let datum = 'A'.charCodeAt()
  for (let i = 0; i < str.length; i++) {
    let index = str.charCodeAt(i) - datum
    result[index] = (result[index] || 0) + 1
  }
  for (let i = 0; i < result.length; i++) {
    if (result[i] > max) {
      max = result[i]
      letter = String.fromCharCode(datum + i)
    }
  }
  console.log(`出现次数最多的字母是${letter},出现了${max}次`)
  console.timeEnd('findByLoop')
}
function getMaxString(string) {
  console.time('getMaxString')
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
  console.timeEnd('getMaxString')
  return [max, maxKeys]
}
findByRegex()

findByLoop()

getMaxString(str)
```

### 二分查找

```js
// 先递增后递减数组求减求最大值
const arr1 = [0, 1, 4, 7, 5]
const arr2 = [1, 6, 5, 3, 2]
const arr3 = [1, 2, 3, 4, 5, 6, 7, 9, 3, 2]

function getMax(params) {
  let begin = 0
  let end = params.length - 1
  while (begin <= end) {
    let mid = Math.floor(begin + (end - begin) / 2)
    console.log(mid)

    let element = params[mid]
    if (element > params[mid - 1] && element > params[mid + 1]) {
      console.log('第' + (mid + 1) + '个' + element + '最大')
      return element
      // 当前比右边的数小，向右走
    } else if (element < params[mid + 1]) {
      begin = mid + 1
      // 当前比左边的数小，相左走
    } else if (element < params[mid - 1]) {
      end = mid - 1
    }
  }
  return -1
}
//  console.log(getMax(arr1));
// console.log(getMax(arr2));
console.log(getMax(arr3))
```

### 大数相加

```js
function add(a, b) {
  let maxLength = Math.max(a.length, b.length)
  //用0去补齐长度
  a = a.padStart(maxLength, 0) //"0009007199254740991"
  b = b.padStart(maxLength, 0) //"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0
  let f = 0 //"进位"
  let sum = ''
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f
    f = Math.floor(t / 10)
    sum = (t % 10) + sum
  }
  if (f == 1) {
    sum = '1' + sum
  }
  return sum
}

const add = (a, b) => {
  const maxLength = Math.max(a.length, b.length)
  let overflow = false
  let sum = ''
  for (let i = 1; i <= maxLength; i++) {
    const ai = a[a.length - i] || '0'
    const bi = b[b.length - i] || '0'
    let ci = parseInt(ai) + parseInt(bi) + (overflow ? 1 : 0)
    overflow = ci >= 10
    ci = overflow ? ci - 10 : ci
    sum = ci + sum
  }
  sum = overflow ? '1' + sum : sum
  return sum
}
console.log(add('111', '99'))
console.log(add('9007199254740991', '1234567899999999999'))
```

## 玩转异步

### 基础模拟 Promise Class

```js
class Promise__fake {
  constructor(executor) {
    this.status = 'pending' // 默认状态为 PENGING
    this.value = undefined // 存放成功状态得值
    this.reason = undefined // 存放失败状态得值
    this.handleFulfilled = [] // 存储成功后的回调
    this.handleRejection = [] // 存储失败后的回调
    // ! resolve 形参的实际参数在这儿
    const resolve = data => {
      // 状态变更只有一次
      if (this.status === 'pending') {
        this.status = 'fulfilled'
        this.value = data
        this.handleFulfilled.forEach(fn => fn(data))
      }
    }
    const reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected'
        this.reason = reason
        this.handleRejection.forEach(fn => fn(reason))
      }
    }
    try {
      executor(resolve, reject)
    } catch (e) {
      // 遇到错误时，捕获错误，执行 reject 函数
      reject(e)
    }
  }
  then(fulfilledFn, rejectedFn) {
    if (this.status === 'fulfilled') {
      fulfilledFn(this.value)
    }
    if (this.status === 'rejected') {
      fulfilledFn(this.reason)
    }
    if (this.status === 'pending') {
      this.handleFulfilled.push(fulfilledFn)
      this.handleRejection.push(rejectedFn)
    }
    return this
  }
  all() {}
}

//1. 链式测试
/*   var p1 = new Promise__fake(function (resolve, reject) {
        console.log("init Promise");
        if (Math.random() > 0.5) {
          resolve("大");
        } else {
          reject("小");
        }
      });
      p1.then(
        (data) => console.log("success", data),
        (reason) => console.log("error", reason)
      ).then(
        () => console.log("success 2"),
        () => console.log("error 2")
      ); */

// 2. 延时测试
/*  var sleep = (time, data) =>
        new Promise__fake(function (resolve, reject) {
          setTimeout(resolve, time, data);
        });
      sleep(3000, "时间到！").then((val) => {
        console.log(val);
      }); */

// 3. 状态变更后不可变
/*  const p2 = new Promise__fake(function (resolve, reject) {
        resolve("失败了！");
        reject("还会成功吗！");
      });
      p2.then(
        (data) => console.log(data),
        (reason) => console.log(reason)
      ); */

// 4. 替换 setTimeOut 模拟得异步，使用状态控制
const promise = new Promise__fake(resolve => {
  setTimeout(() => {
    resolve('成功！')
  }, 1000)
}).then(
  data => {
    console.log('success', data)
  },
  err => {
    console.log('faild', err)
  }
)
```

### await 错误捕获

```js
const data = {
  code: 200,
  data: {
    num: 100
  }
}
const p = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(data)
    }, 500)
    //   throw new Error('出错了');
  })
}
// promise 链 .catch 捕获
/* async function main() {
        const res = await p().catch((err) => {
          console.log("err", err);
        });
        console.log("res", res);
      } */

// try catch 捕获
/*  async function main() {
        try {
          const res = await p();
          console.log("res", res);
        } catch (err) {
          console.log("err", err);
        }
      }
      main(); */

// 自执行函数
/*  (async () => {
        try {
          const res = await p();
          console.log("res", res);
        } catch (err) {
          console.log("err", err);
        }
      })(); */

function promiseWrapper(p) {
  return (...args) => {
    return p(...args)
      .then(res => [null, res])
      .catch(err => [err, null])
  }
}
// promiseWrapper
;(async () => {
  const func = promiseWrapper(p)
  const [err, res] = await func()
  console.log('res', res)
  console.log('err', err)
})()
```

### Promise 同步与异步

```js
const p1 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('3000')
      resolve('3s')
    }, 3000)
  })
const p2 = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('5000')
      resolve('5s')
    }, 5000)
  })

// 同步反应
console.time('promiseTask')
await p1()
await p2()
console.timeEnd('promiseTask') //  promiseTask: 8017.93017578125ms

// 异步反应
console.time('promiseTask')
let task1 = p1()
let task2 = p2()
await task1
await task2
console.timeEnd('promiseTask') // promiseTask: 5003.4599609375ms
```

### 调试

```js
function takeLongTime(n) {
  return new Promise(resolve => {
    setTimeout(() => resolve(n + 200), n)
  })
}
function step1(n) {
  console.log(`step1 with ${n}`)
  return takeLongTime(n)
}
function step2(n) {
  console.log(`step2 with ${n}`)
  return takeLongTime(n)
}
function step3(n) {
  console.log(`step3 with ${n}`)
  return takeLongTime(n)
}
function doIt() {
  console.time('doIt')
  const time1 = 300
  step1(time1)
    .then(time2 => step2(time2))
    .then(time3 => step3(time3))
    .then(result => {
      console.log(`result is ${result}`)
      console.timeEnd('doIt')
    })
}
// 调试上两者无差异，都可以步进后续的下一步，方便调试 （可能是 chrome 的支持更好了）
/*  async function doIt() {
        console.time("doIt");
        const time1 = 300;
        const time2 = await step1(time1);
        const time3 = await step2(time2);
        const result = await step3(time3);
        console.log(`result is ${result}`);
        console.timeEnd("doIt");
      } */

doIt()
```

### 异步重试

**按时间重试**

```js
// all 最多等多久
// delay 延迟等待重试时间
// asyncFn 异步方法
// shouldFn 校验异步执行结果是否有效
function tryPromise(all = 3000, delay = 500, asyncFn = undefined, shouldFn = function() {}) {
  let cur_retry_num = 0 // 重试次数
  return new Promise(resolve => {
    ;(async function main() {
      // 异步反应
      let task = asyncFn()
      let res = await task
      if (shouldFn(res) || cur_retry_num++ >= all / delay) {
        resolve()
      } else {
        setTimeout(main, delay)
      }
    })()
  })
}
const p = () =>
  new Promise(resolve =>
    setTimeout(() => {
      let a = Math.random()
      let flag = a > 0.1 ? 0 : 1
      console.log('=====', flag)
      resolve(flag)
    }, 1000)
  )
tryPromise(3000, 500, p, res => res === 1).then(() => {
  console.log('okkk')
})
```

**按次数重试**

实现 `Promie.retry` ,成功后 resolve 结果，失败后重试，尝试超过一定次数才真正 reject

```js
const p = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      let a = Math.random()
      let flag = a > 0.1 ? 0 : 1
      console.log(flag)
      flag === 1 ? resolve(flag) : reject(flag)
    }, 1000)
  )

/*   Promise.retry = function (promiseFn, times = 3) {
        return new Promise(async (resolve, reject) => {
          while (times--) {
            try {
              let ret = await promiseFn();
              resolve(ret);
              break;
            } catch (error) {
              if (!times) reject(error);
            }
          }
        });
      }; */

/*  Promise.retry = function (promiseFn, times = 3) {
        return new Promise((resolve, reject) => {
          let count = 0;
          let action = function () {
            promiseFn()
              .then(resolve)
              .catch((err) => {
                count++;
                if (count >= times) {
                  reject(err);
                } else {
                  action();
                }
              });
          };
          action();
        });
      }; */

Promise.retry = function(asyncFn, times = 3) {
  let count = 0
  function executeFn() {
    return new Promise((resolve, reject) => {
      resolve(asyncFn())
    })
      .then(res => {
        return Promise.resolve(res)
      })
      .catch(err => {
        count++
        if (count >= times) {
          return Promise.reject(err)
        } else {
          return executeFn()
        }
      })
  }
  return executeFn()
}

Promise.retry(p, 3).then(() => {
  console.log('okkk')
})
```

### 任务中断

批量执行异步任务，有任务返回 false 就中断执行并返回结果。

```js
let asyncFn = val => {
  return new Promise(resolve => {
    setInterval(() => {
      resolve(val)
    }, 1000)
  })
}

let tasks = [true, false, false].map(v => () => asyncFn(v))
// 基础 for 循环
/*       async function run() {
           for (let i = 0; i < tasks.length; i++) {
             const task = tasks[i];
             let res = await task();
             if (!res) {
               return false;
             }
           }
           return true;
         } */
// for of
async function run() {
  for (const task of tasks) {
    let res = await task()
    if (!res) {
      return false
    }
  }
  return true
}

async function main() {
  let result = await run()
  console.log('result', result)
}
main() // result false
```

###

## 其他

### reduce 经典用法

1. 参数合并

```js
const buildParamsTxt = `@tag=next-last@env=dev `
const buildParams = buildParamsTxt.split('@').reduce((o, item) => {
  let [key, value] = item.replace(/\s/g, '').split('=')
  key && (o[key] = value)
  return o
}, {}) // {tag: "next-last", env: "dev"}
```

### padStart 方法重写

```js
String.prototype.padStart__fake = function(allLen, str) {
  let len = this.length
  let base = this[0]
  while (str.length < allLen) {
    str += str
  }
  return str.substring(0, allLen - base.length) + base
}

console.log('1'.padStart__fake(4, '0'))
console.log('1'.padStart__fake(4, '12345'))
console.log('11'.padStart__fake(4, '0'))
```

### Proxy api

```js
// Object.defineProperty
function observer(obj) {
  if (typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        defineReactive(obj, key, obj[key])
      }
    }
  }
}

function defineReactive(obj, key, value) {
  //针对value是对象，递归检测
  observer(value)
  //劫持对象的key
  Object.defineProperty(obj, key, {
    get() {
      console.log('获取：' + key)
      return value
    },
    set(val) {
      //针对所设置的val是对象
      observer(val)
      console.log(key + '-数据改变了')
      value = val
    }
  })
}

let obj = {
  name: '守候',
  flag: {
    book: {
      name: 'js',
      page: 325
    },
    like: ['吃饭']
  }
}

observer(obj)

// 1. 新增一个属性，由于在 执行 observer(obj) 的时候没有这个属性，所以无法监听到，删除的属性页无法监听到。
// 2. 数组的变化无法监听到 (! 数组属性实际修改成功， push， splice，pop)
// 3. 递归遍历对象，使用 Object.defineProperty 劫持对象属性，如果遍历的对象很深，花费的时间比较久，甚至性能问题
```

```js
function observerProxy(obj) {
  const handler = {
    get(target, prop, receiver) {
      console.log('正在读取', prop)
      if (typeof target[prop] === 'object' && target[prop] !== null) {
        return new Proxy(target[prop], handler)
      }
      return Reflect.get(...arguments) // 将操作转发给对象
    },
    set(target, prop, val) {
      console.log('正在写入', prop, val)
      return Reflect.set(...arguments) // 将操作转发给对象
    },
    deleteProperty(target, prop) {
      console.log('正在删除', prop)
      delete target[prop]
    }
  }
  return new Proxy(obj, handler)
}
let obj = {
  name: '守候',
  flag: {
    book: {
      name: 'js',
      page: 325
    },
    like: ['吃饭']
  }
}

let obj2 = observerProxy(obj)
// 拦截方式除了 get、set、deleteProperty 还有很多监听方法，
// 也可以兼容 Object.defineProperty 监听不到的操作，如 监听数组（对数组进行push shift 等操作，会触发对应的方法名称和 length 变化），监听对象属性的新增、删除等

// 使用场景
// 1. 负索引数组
// 2. 表单校验
// 3. 增加附加属性
// 4. 数据格式化
```

```js
let target = [1, 2, 3]
let proxy = new Proxy(target, {
  get(target, prop, receiver) {
    console.log('正在读取', prop)
    if (target[prop]) {
      return Reflect.set(...arguments)
    } else if (prop < 0) {
      return target[target.length - -prop]
    } else {
      throw new ReferenceError(`Property doesn't exist: "${prop}"`)
    }
  },
  set(target, prop, val) {
    console.log('正在写入', prop, val)
    return Reflect.set(...arguments) // 将操作转发给对象
  }
})

console.log(proxy[-1])
```

### 动态导入

```js
const components = {}
// display目录下代表需要弹窗展示的组件
const files = require.context('@/components/display', false, /\.vue$/)
files.keys().forEach(item => {
  // 命名仅包括字母或数字或下划线或短横线
  const fileName = item.replace(/^\.\/([\w-]+)\.vue$/, '$1')
  const component = () => import(`@/components/display/${fileName}.vue`)
  components[fileName] = options => {
    return {
      render(h) {
        return h(component, options)
      }
    }
  }
})
// iframe组件，用以加载pdf链接或者第三方链接
components['iframe-page'] = link => {
  const component = () => import('tk-components/iframe-page.vue')
  return {
    render(h) {
      return h(component, { props: { link } })
    }
  }
}
// html-wrap组件，用以展示富文本
components['html-wrap'] = html => {
  const component = () => import('tk-components/html-wrap.vue')
  return {
    render(h) {
      return h(component, { props: { html } })
    }
  }
}

export default components
```

```js
Vue.prototype.$displayComponents = function(fileName, options) {
  return async () => {
    const com = await import(/* webpackChunkName: "display" */ `@/components/display/index.js`)
    return com.default[fileName](options)
  }
}
```
