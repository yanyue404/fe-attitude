## 前言

> 前端工程师吃饭的家伙，深度、广度一样都不能差。

Javascript 基础知识

- 数据类型
  - 浮点数精度
- 变量提升
- 深浅拷贝
- 原型链
  - instanceof 原理
  - new 操作符
- 继承
- 作用域
- 闭包
  - 柯里化
- this 的指向
- 立即执行函数
- 事件循环机制
- v8 垃圾回收机制
- generator 原理

JavaScript 编码能力

- 多种方式实现数组去重、扁平化、对比优缺点
- 多种方式实现深拷贝、对比优缺点
- 手写函数柯里化工具函数、并理解其应用场景和优势
- 手写防抖和节流工具函数、并理解其内部原理和应用场景
- 实现一个 sleep 函数

手动实现前端轮子

- 手动实现 call、apply、bind
- 手动实现符合 Promise/A+规范的 Promise、手动实现 async await
- 手写一个 EventEmitter 实现事件发布、订阅
- 可以说出两种实现双向绑定的方案、可以手动实现
- 手写 JSON.stringify、JSON.parse
- 手写一个模版引擎，并能解释其中原理
- 手写懒加载、下拉刷新、上拉加载、预加载等效果

## 原始（Primitive）类型与对象（Object）类型）

**原始类型**

在 JS 中，存在着 7 种原始值，分别是：

- boolean
- null
- undefined
- number
- string
- symbol
- BigInt

其中 Symbol 和 BigInt 是 ES6 中新增的数据类型：

- Symbol 代表创建后独一无二且不可变的数据类型，它主要是为了解决可能出现的全局变量冲突的问题。
- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。

首先原始类型存储的都是值，是没有函数可以调用的，比如 undefined.toString();

此时你肯定会有疑问，这不对呀，明明 '1'.toString() 是可以使用的。其实在这种情况下，'1' 已经不是原始类型了，而是被强制转换成了 String 类型也就是对象类型，所以可以调用 toString 函数。

除了会在必要的情况下强转类型以外，原始类型还有一些坑。

string 类型是不可变的，无论你在 string 类型上调用何种方法，都不会对值有改变。

另外对于 null 来说，很多人会认为他是个对象类型，其实这是错误的。虽然 typeof null 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

**对象类型**

在 JS 中，除了原始类型那么其他的都是对象类型了。对象类型和原始类型不同的是，原始类型存储的是`值`，对象类型存储的是`地址`（指针）。当你创建了一个对象类型的时候，计算机会在内存中帮我们开辟一个空间来存放值，但是我们需要找到这个空间，这个空间会拥有一个地址（指针）。

```js
const a = []
```

对于常量 a 来说，假设内存地址（指针）为 #001，那么在地址 #001 的位置存放了值 []，常量 a 存放了地址（指针） #001，再看以下代码

```js
const a = []
const b = a
b.push(1)
```

当我们将变量赋值给另外一个变量时，复制的是原本变量的地址（指针），也就是说当前变量 b 存放的地址（指针）也是 #001，当我们进行数据修改的时候，就会修改存放在地址（指针） #001 上的值，也就导致了两个变量的值都发生了改变。

**两种类型的区别**

两种类型的区别在于存储位置的不同：

- 原始数据类型直接存储在栈（stack）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（heap）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

- 在数据结构中，栈中数据的存取方式为先进后出。
- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

在操作系统中，内存被分为栈区和堆区：

- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
- 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。

## 值类型 vs 引用类型

ES 分为原始类型和引用类型，只有`object`和`function`是引用类型，其他都是值类型。

根据 JavaScript 中的变量类型传递方式，又分为**值类型**和**引用类型**，值类型变量包括 Boolean、String、Number、Undefined、Null，引用类型包括了 Object 类的所有，如 Date、Array、Function 等。在参数传递方式上，值类型是按值传递，引用类型是按共享传递。

下面通过一个小题目，来看下两者的主要区别，以及实际开发中需要注意的地方。

```js
// 值类型
var a = 10
var b = a
b = 20
console.log(a) // 10
console.log(b) // 20
```

上述代码中，`a` `b`都是值类型，两者分别修改赋值，相互之间没有任何影响。再看引用类型的例子：

```js
// 引用类型
var a = { x: 10, y: 20 }
var b = a
b.x = 100
b.y = 200
console.log(a) // {x: 100, y: 200}
console.log(b) // {x: 100, y: 200}
```

上述代码中，`a` `b`都是引用类型。在执行了`b = a`之后，修改`b`的属性值，`a`的也跟着变化。因为`a`和`b`都是引用类型，指向了同一个内存地址，即两者引用的是同一个值，因此`b`修改属性时，`a`的值随之改动。

再借助题目进一步讲解一下。

> 说出下面代码的执行结果，并分析其原因。

```js
function foo(a) {
  a = a * 10
}
function bar(b) {
  b.value = 'new'
}
var a = 1
var b = { value: 'old' }
foo(a)
bar(b)
console.log(a) // 1
console.log(b) // value: new
```

通过代码执行，会发现：

- `a`的值没有发生改变
- 而`b`的值发生了改变

这就是因为`Number`类型的`a`是按值传递的，而`Object`类型的`b`是按共享传递的。

JS 中这种设计的原因是：按值传递的类型，复制一份存入栈内存，这类类型一般不占用太多内存，而且按值传递保证了其访问速度。按共享传递的类型，是复制其引用，而不是整个复制其值（C 语言中的指针），保证过大的对象等不会因为不停复制内容而造成内存的浪费。

引用类型经常会在代码中按照下面的写法使用，或者说**容易不知不觉中造成错误**！

```js
var obj = {
  a: 1,
  b: [1, 2, 3]
}
var a = obj.a
var b = obj.b
a = 2
b.push(4)
console.log(obj, a, b) // {a: 1, b: Array(4)} 2 (4) [1, 2, 3, 4]
```

虽然`obj`本身是个引用类型的变量（对象），但是内部的`a`和`b`一个是值类型一个是引用类型，`a`的赋值不会改变`obj.a`，但是`b`的操作却会反映到`obj`对象上。

## 内置函数(原生函数)

- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error
- Symbol

原始值 "I am a string" 并不是一个对象，它只是一个字面量，并且是一个不可变的值。

如果要在这个字面量上执行一些操作，比如获取长度、访问其中某个字符等，那需要将其转换为 String 对象。

幸好，在必要时语言会自动把字符串字面量转换成一个 String 对象，也就是说你并不需要显式创建一个对象。

## 类型判断

**typeof vs instanceof**

typeof 对于原始类型来说，除了 null 都可以显示正确的类型，null 可以使用 `String(null) === 'null'` 来判断

```js
typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
```

typeof 对于对象来说，除了函数都会显示 object，所以说 typeof 并不能准确判断变量到底是什么类型

```js
typeof [] // 'object'
typeof {} // 'object'
typeof console.log // 'function'
```

如果我们想判断一个对象的正确类型，这时候可以考虑使用 instanceof，因为内部机制是通过原型链来判断的。instanceof 能在实例的 原型对象链 中找到该构造函数的 prototype 属性所指向的 原型对象，就返回 true。即:

```js
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

```js
// __proto__: 代表原型对象链
instance.[__proto__...] === instance.constructor.prototype

// return true
```

**Object.prototype.toString.call(obj)**

很稳的类型判断， 调用 toString 后根据[object XXX]进行判断

```js
Object.prototype.toString.call(null) // '[object Null]'
Object.prototype.toString.call([]) // '[object Array]'
```

## 类型转换

**隐式转换**

在 JS 中在使用运算符号或者对比符时，会自带隐式转换：

- -、\*、/、% ：一律转换成数值后计算
- +：
  - 数字 + 字符串 = 字符串， 运算顺序是从左到右
  - 数字 + 对象， 优先调用对象的 valueOf -> toString
  - 数字 + boolean/null -> 数字
  - 数字 + undefined -> NaN
- [1].toString() === '1'
- {}.toString() === '[object object]'

**转 Boolean**

在条件判断时，除了 undefined， null， false， NaN， ''， 0， -0，其他所有值都转为 true，包括所有对象。

**转字符串**

- [1].toString() // '1'
- [{"a":1}].toString() // '[object Object]'
- alert({}) String({}) // '[object Object]'

**转数字**

- Number('1') // 1
- Number('a') // NaN
- Number([]) // 0
- Number(['1']) // 1
- Number(['a']) // NaN
- Number({}) // NaN
- Number(Symbol()) // Uncaught TypeError: Cannot convert a Symbol value to a number

## 对象的拷贝

- 浅拷贝: 以赋值的形式拷贝引用对象，仍指向同一个地址，**修改时原对象也会受到影响**
  - `Object.assign`
  - 展开运算符\(...\)
- 深拷贝: 完全拷贝一个新对象，**修改时原对象不再受到任何影响**

  - `JSON.parse(JSON.stringify(obj))`: 性能最快
    - 具有循环引用的对象时，报错
    - 当值为函数、`undefined`、或`symbol`时，无法拷贝
  - 递归进行逐一赋值

这种方法有缺陷，详情请看[关于 JSON.parse(JSON.stringify(obj))实现深拷贝应该注意的坑](https://www.jianshu.com/p/b084dfaad501)

```js
let o1 = {
  a: {
    val: 1
  },
  b: function() {
    alert('b')
  },
  c: () => {
    alert('c')
  }
}
let o2 = JSON.parse(JSON.stringify(o1)) // { a: {val: 1}}
```

基础版（新增函数函数类型支持），推荐使用 [lodash 的深拷贝函数](https://www.lodashjs.com/docs/lodash.cloneDeep)。

```js
function deepCopy(target) {
  if (typeof target == 'object') {
    const result = Array.isArray(target) ? [] : {}
    for (const key in target) {
      let item = target[key]
      // 时间
      if (item instanceof Date) {
        result[key] = new Date(item)
        // 正则
      } else if (item instanceof RegExp) {
        result[key] = new RegExp(item.source, item.flags)
      } else if (typeof item == 'object' && item !== null) {
        result[key] = deepCopy(item)
      } else {
        result[key] = item
      }
    }

    return result
  } else if (typeof target == 'function') {
    return eval('(' + target.toString() + ')')
    // 也可以这样克隆函数
    // return new Function('return ' + target.toString())()
  } else {
    return target
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
console.log(a)
var b = deepCopy(a)
console.log(b) // 支持上面的类型
```

参考链接：

- [yanyue404 - #6 Javascript 之深浅拷贝](https://github.com/yanyue404/blog/issues/6)
- [如何写出一个惊艳面试官的深拷贝?](https://juejin.cn/post/6844903929705136141)

## null 和 undefined 的区别

`null` 表示一个对象是“没有值”的值，也就是值为“空”

`undefined` 表示一个变量声明了没有初始化(赋值)

`undefined` 和 `null` 在 if 语句中，都会被自动转为 false

`undefined` 不是一个有效的 JSON，而 `null` 是

`undefined` 的类型(typeof)是 `undefined`

`null` 的类型(typeof)是 `object`

Javascript 将未赋值的变量默认值设为 `undefined`

Javascript 从来不会将变量设为 `null`。 它是用来让程序员表明某个用 var 声明的变量时没有值的

## 数组(array) API

**改变原数组**

- `unshift / shift`: 头部推入和弹出，改变原数组，`unshift` 返回数组长度，`shift` 返回原数组第一项 ；
- `push / pop`: 末尾推入和弹出，改变原数组， `push` 返回数组长度, `pop` 返回原数组最后一项；
- `sort(fn) / reverse`: 排序与反转，改变原数组
- `splice(start, number, value...)`: 返回删除元素组成的数组，value 为插入项，改变原数组

**不改变原数组**

- `map`: 遍历数组，返回回调返回值组成的新数组
- `forEach`: 无法`break`，可以用`try/catch`中`throw new Error`来停止
- `filter`: 过滤
- `some`: 有一项返回`true`，则整体为`true`
- `every`: 有一项返回`false`，则整体为`false`
- `join`: 通过指定连接符生成字符串
- `concat`: 连接数组，不影响原数组， 浅拷贝
- `slice(start, end)`: 返回截断后的新数组，不改变原数组
- `indexOf / lastIndexOf(value, fromIndex)`: 查找数组项，返回对应的下标
- `reduce / reduceRight(fn(prev, cur)， defaultPrev)`: 两两执行，prev 为上次化简函数的`return`值，cur 为当前值
  - 当传入 `defaultPrev` 时，从第一项开始；
  - 当未传入时，则为第二项
  - 数组乱序：

```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
arr.sort(function () {
    return Math.random() - 0.5;
});
```

- 数组拆解: flat: \[1,\[2,3\]\] --> \[1, 2, 3\]

```js
Array.prototype.flat = function() {
  return this.toString()
    .split(',')
    .map(item => +item)
}
```

参考链接

- [yanyue404 - JavaScript 数组 API](https://github.com/yanyue404/blog/issues/131)

## 如何判断数组与对象

```js
let obj = { a: 1 }
let arr = [1, 2, 3]

typeof arr // "object"
typeof obj // "object"

obj instanceof Array // false
arr instanceof Array // true

Array.isArray(arr) // true
Array.isArray(obj) // false

// 校验构造函数

arr.constructor === Array // true
obj.constructor === Array // false
arr.constructor === Object // false
obj.constructor === Object // true

// 校验原型

Object.prototype == arr.__proto__ // false
Object.prototype == obj.__proto__ // true
Array.prototype == arr.__proto__ // true
Array.prototype == obj.__proto__ // false

Object.prototype.toString.call(obj) === '[object Object]' // true
Object.prototype.toString.call(arr) === '[object Object]' // fasle
Object.prototype.toString.call(obj) === '[object Array]' // true
Object.prototype.toString.call(arr) === '[object Array]' // fasle
```

## 数组去重

ES5

```js
function unique(arr) {
  const result = []
  arr.forEach(function(item) {
    if (result.indexOf(item) == -1) {
      result.push(item)
    }
  })

  return result
}
```

ES6

```js
function unique(arr) {
  return Array.from(new Set(arr))
}
```

空间换时间

```js
function unique(arr) {
  const result = []
  const map = new Map()

  for (const val of arr) {
    if (!map.has(val)) {
      result.push(val)
      map.set(val, true)
    }
  }

  return result
}
```

## 原型 / 构造函数 / 实例

- 原型`(prototype)`: 一个简单的对象，用于实现对象的 **属性继承**。可以简单的理解成对象的爹。在 Firefox 和 Chrome 中，每个`JavaScript`对象中都包含一个`__proto__` \(非标准\)的属性指向它爹\(该对象的原型\)，可`obj.__proto__`进行访问。

- 构造函数: 可以通过`new`来 **新建一个对象** 的函数。

- 实例: 通过构造函数和`new`创建出来的对象，便是实例。 **实例通过`__proto__`指向原型，通过`constructor`指向构造函数**。

说了一大堆，大家可能有点懵逼，这里来举个栗子，以`Object`为例，我们常用的`Object`便是一个构造函数，因此我们可以通过它构建实例。

```js
// 实例
const instance = new Object()
```

则此时， **实例为`instance`**, **构造函数为`Object`**，我们知道，构造函数拥有一个`prototype`的属性指向原型，因此原型为:

```js
// 原型
const prototype = Object.prototype
```

这里我们可以来看出三者的关系:

```js
实例.__proto__ === 原型

原型.constructor === 构造函数

构造函数.prototype === 原型

//  注意: 其实实例上并不是真正有 constructor 这个指针，它其实是从原型链上获取的
// 例如:
// const o = new Object()
// o.constructor === Object   --> true
// o.__proto__ = null;
// o.constructor === Object   --> false
// instance.hasOwnProperty('constructor') === false
实例.constructor === 构造函数
```

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/2/14/168e9d9b940c4c6f~tplv-t2oaga2asx-watermark.awebp)

参考链接

- [yanyue404 - #17Javascript 的继承与原型链](https://github.com/yanyue404/blog/issues/17)

## 原型链

**原型链是由原型对象组成**，每个对象都有 `__proto__` 属性，指向了创建该对象的构造函数的原型，`__proto__` 将对象连接起来组成了原型链。是一个用来**实现继承和共享属性**的有限的对象链。

```js
[].__proto__ === Array.prototype // true
[].__proto__.__proto__ === Object.prototype // true
[].__proto__.__proto__.__proto__ === null// true
```

- **属性查找机制**: 当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象`Object.prototype`，如还是没找到，则输出 `undefined`；

- **属性修改机制**: 只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用: `b.prototype.x = 2`；但是这样会造成所有继承于该对象的实例的属性发生改变。

## instanceof 原理

语法：object instanceof constructor

instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

能在实例的 原型对象链 中找到该构造函数的 `prototype` 属性所指向的 `原型对象`，就返回 true。即:

```js
// __proto__: 代表原型对象链
instance.[__proto__...] === instance.constructor.prototype

// return true

function instance_of(left, right) {
  const RP = right.prototype; // 构造函数的原型
  while(true) {
    if (left === null || left === undefined) {
      return false;
    }
    if (left === RP) { // 一定要严格比较
      return true;
    }
    left = left.__proto__; // 沿着原型链重新赋值
  }
}

```

参考链接

- [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)
- https://segmentfault.com/a/1190000018874474

## new 操作符的执行过程

```js
function Test() {}
const test = new Test()
```

1. 创建一个新对象：

```js
const obj = {}
```

2.<del> 设置新对象的 constructor 属性为构造函数的名称(从原型链上取)，</del>设置新对象的\***\*proto\*\***属性指向构造函数的 prototype 对象

```js
obj.__proto__ = Test.prototype
```

3. 绑定 this 并通过构造函数生成对象，this 被指向新实例对象

```js
Test.call(obj)
```

4. 返回新对象(必须是一个对象形式)

**手写一个**

```js
function create() {
  let obj = {}
  let Con = [].shift.call(arguments)
  obj.__proto__ = Con.prototype
  let result = Con.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
```

## bind、call、apply 的区别

call 和 apply 其实是一样的，区别就在于传参时参数是一个一个传或者是以一个数组的方式来传。<br>
call 和 apply 都是在调用时生效，改变调用者的 this 指向。<br>

```js
let name = 'Jack'
const obj = { name: 'Tom' }
function sayHi() {
  console.log('Hi! ' + this.name)
}

sayHi() // Hi! Jack
sayHi.call(obj) // Hi! Tom
```

bind 也是改变 this 指向，不过不是在调用时生效，而是返回一个新函数。

```js
const newFunc = sayHi.bind(obj)
newFunc() // Hi! Tom
```

## 实现 bind call apply 函数

### bind

```js
Function.prototype.bind = function(context, ...extra) {
  const self = this
  // 这里不能用箭头函数，防止绑定函数为构造函数
  return function(...arg) {
    return self.call(context, ...extra.concat(arg))
  }
}
```

### call

```js
Function.prototype.call = function(context, ...args) {
  if (context === null || context === undefined) {
    context = window
  }

  context = context instanceof Object ? context : {}

  let key = Math.random()
  while (context[key]) {
    key = Math.random()
  }

  context[key] = this
  const result = context[key](...args)
  delete context[key]

  return result
}
```

### apply

```js
Function.prototype.apply = function(context, args = []) {
  if (!Array.isArray(args)) throw '参数必须为数组'

  if (context === null || context === undefined) {
    context = window
  }

  context = context instanceof Object ? context : {}

  let key = Math.random()
  while (context[key]) {
    key = Math.random()
  }

  context[key] = this
  const result = context[key](...args)
  delete context[key]

  return result
}
```

## JS 如何实现继承？

**方法一：使用原型链**

```js
function Animal(legsNumber) {
  this.legsNumber = legsNumber
}
Animal.prototype.kind = '动物'

function Dog(name) {
  this.name = name
  Animal.call(this, 4) // 关键代码1
}
Dog.prototype.__proto__ = Animal.prototype // 关键代码2，但这句代码被禁用了，怎么办

Dog.prototype.kind = '狗'
Dog.prototype.say = function() {
  console.log(`汪汪汪~ 我是${this.name}，我有${this.legsNumber}条腿。`)
}

const d1 = new Dog('啸天') // Dog 函数就是一个类
console.dir(d1)
```

被 ban 的代码替换方式

```js
var f = function() {}
f.prototype = Animal.prototype
Dog.prototype = new f()
```

**方法二：使用 class**

```js
class Animal {
  constructor(legsNumber) {
    this.legsNumber = legsNumber
  }
  run() {}
}
class Dog extends Animal {
  constructor(name) {
    super(4)
    this.name = name
  }
  say() {
    console.log(`汪汪汪~ 我是${this.name}，我有${this.legsNumber}条腿。`)
  }
}

const d2 = new Dog('旺财') // Dog 函数就是一个类
console.dir(d2)
```

## 浮点数精度

因为 JS 采用 IEEE 754 双精度版本（64 位），并且只要采用 IEEE 754 的语言都有该问题。

```js
0.1 + 0.2 === 0.3 // false

// 原生解决办法 - toFixed
/**
 * 按指定精度格式化小数
 * @param {number} number 待格式化数字
 * @param {number} precision 精度
 * @returns
 */
function toFixed(number, precision) {
  const val = Math.round(Math.abs(precision))
  precision = isNaN(val) ? 2 : precision
  const power = Math.pow(10, precision)
  return (Math.round((number + 1e-8) * power) / power).toFixed(precision)
}
Number(toFixed(0.1 + 0.2, 1)) === 0.3 // true
```

对于这个问题，还有一个直接的解决方法就是设置一个误差范围，通常称为“机器精度”。对 JavaScript 来说，这个值通常为 2-52，在 ES6 中，提供了 Number.EPSILON 属性，而它的值就是 2-52，只要判断`0.1+0.2-0.3`是否小于`Number.EPSILON`，如果小于，就可以判断为 0.1+0.2 ===0.3

```js
function numberepsilon(arg1, arg2) {
  return Math.abs(arg1 - arg2) < Number.EPSILON
}

console.log(numberepsilon(0.1 + 0.2, 0.3)) // true
```

## 变量提升

var 会使变量提升，这意味着变量可以在声明之前使用。let 和 const 不会使变量提升，提前使用会报错。

变量提升（hoisting）是用于解释代码中变量声明行为的术语。使用 var 关键字声明或初始化的变量，会将声明语句“提升”到当前作用域的顶部。 但是，只有声明才会触发提升，赋值语句（如果有的话）将保持原样。

## 执行上下文

先讲一个关于 **变量提升** 的知识点，面试中可能会遇见下面的问题，很多候选人都回答错误：

> 题目：说出下面执行的结果（这里笔者直接注释输出了）

```js
console.log(a) // undefined
var a = 100

fn('zhangsan') // 'zhangsan' 20
function fn(name) {
  age = 20
  console.log(name, age)
  var age
}

console.log(b) // 这里报错
// Uncaught ReferenceError: b is not defined
b = 100
```

在一段 JS 脚本（即一个`<script>`标签中）执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个 **全局执行上下文** 环境，先把代码中即将执行的（内部函数的不算，因为你不知道函数何时执行）变量、函数声明都拿出来。变量先暂时赋值为`undefined`，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。再次强调，这是在代码执行之前才开始的工作。

我们来看下上面的面试小题目，为什么`a`是`undefined`，而`b`却报错了，实际 JS 在代码执行之前，要「全文解析」，发现`var a`，知道有个`a`的变量，存入了执行上下文，而`b`没有找到`var`关键字，这时候没有在执行上下文提前「占位」，所以代码执行的时候，提前报到的`a`是有记录的，只不过值暂时还没有赋值，即为`undefined`，而`b`在执行上下文没有找到，自然会报错（没有找到`b`的引用）。

另外，一个函数在执行之前，也会创建一个 **函数执行上下文** 环境，跟 **全局上下文** 差不多，不过 **函数执行上下文** 中会多出`this` `arguments`和函数的参数。参数和`arguments`好理解，这里的`this`咱们需要专门讲解。

总结一下：

- 范围：一段`<script>`、js 文件或者一个函数
- 全局上下文：变量定义，函数声明
- 函数上下文：变量定义，函数声明，`this`，`arguments`

### `this`

先搞明白一个很重要的概念 —— **`this`的值是在执行的时候才能确认，定义的时候不能确认！** 为什么呢 —— 因为`this`是执行上下文环境的一部分，而执行上下文需要在代码执行之前确定，而不是定义的时候。看如下例子

```js
var a = {
  name: 'A',
  fn: function() {
    console.log(this.name)
  }
}
a.fn() // this === a
a.fn.call({ name: 'B' }) // this === {name: 'B'}
var fn1 = a.fn
fn1() // this === window
```

`this`执行会有不同，主要集中在这几个场景中

- 作为构造函数执行，构造函数中
- 作为对象属性执行，上述代码中`a.fn()`
- 作为普通函数执行，上述代码中`fn1()`
- 用于`call` `apply` `bind`，上述代码中`a.fn.call({name: 'B'})`

下面再来讲解下什么是作用域和作用域链，作用域链和作用域也是常考的题目。

## 作用域

ES6 之前 JS 没有块级作用域。例如

```js
if (true) {
  var name = 'zhangsan'
}
console.log(name)
```

从上面的例子可以体会到作用域的概念，作用域就是一个独立的地盘，让变量不会外泄、暴露出去。上面的`name`就被暴露出去了，因此，**JS 没有块级作用域，只有全局作用域和函数作用域**。

```js
var a = 100
function fn() {
  var a = 200
  console.log('fn', a)
}
console.log('global', a)
fn()
```

全局作用域就是最外层的作用域，如果我们写了很多行 JS 代码，变量定义都没有用函数包括，那么它们就全部都在全局作用域中。这样的坏处就是很容易撞车、冲突。

```js
// 张三写的代码中
var data = { a: 100 }

// 李四写的代码中
var data = { x: true }
```

这就是为何 jQuery、Zepto 等库的源码，所有的代码都会放在`(function(){....})()`中。因为放在里面的所有变量，都不会被外泄和暴露，不会污染到外面，不会对其他的库或者 JS 脚本造成影响。这是函数作用域的一个体现。

附：ES6 中开始加入了块级作用域，使用`let`定义变量即可，如下：

```js
if (true) {
  let name = 'zhangsan'
}
console.log(name) // 报错，因为let定义的name是在if这个块级作用域
```

## 作用域链

首先认识一下什么叫做 **自由变量** 。如下代码中，`console.log(a)`要得到`a`变量，但是在当前的作用域中没有定义`a`（可对比一下`b`）。当前作用域没有定义的变量，这成为 **自由变量** 。自由变量如何得到 —— 向父级作用域寻找。

```js
var a = 100
function fn() {
  var b = 200
  console.log(a)
  console.log(b)
}
fn()
```

如果父级也没呢？再一层一层向上寻找，直到找到全局作用域还是没找到，就宣布放弃。这种一层一层的关系，就是 **作用域链** 。

```js
var a = 100
function F1() {
  var b = 200
  function F2() {
    var c = 300
    console.log(a) // 自由变量，顺作用域链向父作用域找
    console.log(b) // 自由变量，顺作用域链向父作用域找
    console.log(c) // 本作用域的变量
  }
  F2()
}
F1()
```

## 闭包

闭包属于一种特殊的作用域，称为 静态作用域。它的定义可以理解为: 父函数被销毁 的情况下，返回出的子函数的`[[scope]]`中仍然保留着父级的单变量对象和作用域链，因此可以继续访问到父级的变量对象，这样的函数称为闭包。

```js
// 函数作为返回值
function F1() {
  var a = 100
  return function() {
    console.log(a)
  }
}
var f1 = F1()
var a = 200
f1() // 100
```

```js
function F1() {
  var a = 100
  return function() {
    alert(a)
  }
}
function F2(f1) {
  var a = 200
  alert(f1())
}
var f1 = F1()
F2(f1) // 100 undefined
```

使⽤闭包主要是为了设计私有的⽅法和变量。

闭包有三个特性:

1. 避免污染全局环境。（因为用的是局部变量）
2. 函数内部可以引⽤外部的参数和变量
3. 维持变量，参数和变量不会被垃圾回收机制回收

闭包的优点是简单好用避免全局变量的污染的同时提供对局部变量的访问，缺点是闭包会常驻内存，会增⼤内存使⽤量，使⽤不当很容易造成内存泄露。

闭包会产生一个很经典的问题（在循环中使用闭包）:

多个子函数的`[[scope]]`都是同时指向父级，是完全共享的。因此当父级的变量对象被修改时，所有子函数都受到影响。

解决:

- 变量可以通过 `函数参数`的形式 传入，避免使用默认的[[scope]]向上查找
- 使用 `setTimeout` 包裹，通过第三个参数传入
- 使用 `块级作用域`，让变量成为自己上下文的属性，避免共享

例子 1：

```js
function foo() {
  var arr = []
  for (var i = 0; i < 2; i++) {
    arr[i] = function() {
      return i
    }
  }
  return arr
}
var bar = foo()
console.log(bar[0]()) //2
```

犯错原因是在循环的过程中，并没有把函数的返回值赋值给数组元素，而仅仅是把函数赋值给了数组元素。这就使得在调用匿名函数时，通过作用域找到的执行环境中储存的变量的值已经不是循环时的瞬时索引值，而是循环执行完毕之后的索引值。

`ar[0]()` 访问 bar 的第 0 个元素并执行。此时，执行流创建并进入匿名函数执行环境，匿名函数中存在自由变量 i，需要使用其作用域链匿名函数 -> foo()函数 -> 全局作用域进行查找，最终在 foo()函数的作用域找到了 i，然后在 foo()函数的执行环境中找到了 i 的值 2，于是给 i 赋值 2.

解决方案 1:IIFE

由此，可以利用 IIFE 传参和闭包来创建多个执行环境来保存循环时各个状态的索引值。因为函数传参是按值传递的，不同参数的函数被调用时，会创建不同的执行环境

```js
function foo() {
  var arr = []
  for (var i = 0; i < 2; i++) {
    arr[i] = (function fn(j) {
      return function test() {
        return j
      }
    })(i)
  }
  return arr
}
var bar = foo()
console.log(bar[0]()) //0
```

解决方案 2:块作用域

使用 IIFE 还是较为复杂，使用块作用域则更为方便

由于块作用域可以将索引值 i 重新绑定到了循环的每一个迭代中，确保使用上一个循环迭代结束时的值重新进行赋值，相当于为每一次索引值都创建一个执行环境

```js
function foo() {
  var arr = []
  for (let i = 0; i < 2; i++) {
    arr[i] = function() {
      return i
    }
  }
  return arr
}
var bar = foo()
console.log(bar[0]()) //0
```

参考: https://www.xiaohuochai.site/JS/ECMA/closure/commonError.html

例子 2： 不正确的无法打印索引：

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(new Date(), i)
  }, 1000)
}

console.log(new Date(), i) // 输入结果： 5 -> 5,5,5,5,5，即第 1 个 5 直接输出，1 秒之后，输出 5 个 5；
```

**改造为 5 -> 0,1,2,3,4**

1. 巧妙的利用 IIFE（Immediately Invoked Function Expression：声明即执行的函数表达式）来解决闭包造成的问题

```js
for (var i = 0; i < 5; i++) {
  ;(function(j) {
    // j = i
    setTimeout(function() {
      console.log(new Date(), j)
    }, 1000)
  })(i)
}

console.log(new Date(), i)
```

2. [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout) 的第三个参数

```js
for (var i = 0; i < 5; i++) {
  setTimeout(
    function(j) {
      console.log(new Date(), j)
    },
    1000,
    i
  )
}

console.log(new Date(), i)
```

3. 对循环体稍做手脚，让负责输出的那段代码能拿到每次循环的 i 值即可。该怎么做呢？利用 JS 中基本类型（Primitive Type）的参数传递是按值传递（Pass by Value）的特征

```js
var output = function(i) {
  setTimeout(function() {
    console.log(new Date(), i)
  }, 1000)
}

for (var i = 0; i < 5; i++) {
  output(i) // 这里传过去的 i 值被复制了
}

console.log(new Date(), i)
```

**改造为 0 -> 1 -> 2 -> 3 -> 4 -> 5**

原有的代码块中的循环和两处 console.log 不变，该怎么改造代码？新的需求可以精确的描述为：代码执行时，立即输出 0，之后每隔 1 秒依次输出 1,2,3,4，循环结束后在大概第 5 秒的时候输出 5。

```js
const tasks = [] // 这里存放异步操作的 Promise
const output = i =>
  new Promise(resolve => {
    setTimeout(() => {
      console.log(new Date(), i)
      resolve()
    }, 1000 * i)
  })

// 生成全部的异步操作
for (var i = 0; i < 5; i++) {
  tasks.push(output(i))
}

// 异步操作完成之后，输出最后的 i
Promise.all(tasks).then(() => {
  setTimeout(() => {
    console.log(new Date(), i)
  }, 1000)
})
```

```js
// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = timeountMS =>
  new Promise(resolve => {
    setTimeout(resolve, timeountMS)
  })

;(async () => {
  // 声明即执行的 async 函数表达式
  for (var i = 0; i < 5; i++) {
    if (i > 0) {
      await sleep(1000)
    }
    console.log(new Date(), i)
  }

  await sleep(1000)
  console.log(new Date(), i)
})()
```

参考链接

- [yanyue404 - 理解 JS 中的闭包](https://github.com/yanyue404/blog/issues/73)
- [破解前端面试（80% 应聘者不及格系列）：从闭包说起](https://juejin.cn/post/6844903474212143117)

## 事件触发的流程

1. 捕获阶段：从外到内
2. 目标阶段：在目标元素上触发事件
3. 冒泡阶段：从内到外

## 事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。所有用到按钮的事件（多数鼠标事件和键盘事件）都适合采用事件委托技术， 使用事件委托可以节省内存。

```html
<div id="root"></div>
```

```js
// bad
;(() => {
  var ndContainer = document.getElementById('root')
  if (!ndContainer) {
    return
  }
  let ndUL = document.createElement('ul')
  for (let i = 0; i < 300; i++) {
    var li = document.createElement('li')
    li.innerText = i + 1
    li.addEventListener('click', function() {
      alert(i + 1)
    })
    ndUL.appendChild(li)
  }
  ndContainer.appendChild(ndUL)
})()

// good
;(() => {
  var ndContainer = document.getElementById('root')
  if (!ndContainer) {
    return
  }
  let ndUL = document.createElement('ul')
  let html = ''
  for (var i = 0; i < 300; i++) {
    html += `<li>${i + 1}</li>`
  }
  ndUL.innerHTML = html
  ndUL.addEventListener('click', function(e) {
    let target = e.target
    if (target.nodeName === 'LI') {
      alert(target.innerText)
    }
  })
  ndContainer.appendChild(ndUL)
})()
```

> target 和 currentTarget 区别：event.target 返回触发事件的元素，event.currentTarget 返回绑定事件的元素

参考链接

- [破解前端面试（80% 应聘者不及格系列）：从 DOM 说起](https://juejin.cn/post/6844903474547671047)

## 事件模型

### DOM0

直接绑定

```js
;<input onclick="sayHi()" />

btn.onclick = function() {}
btn.onclick = null
```

### DOM2

- DOM2 级事件可以冒泡和捕获
- 通过 addEventListener 绑定
- 通过 removeEventListener 解绑

```js
// 绑定
btn.addEventListener('click', sayHi)
// 解绑
btn.removeEventListener('click', sayHi)
```

### DOM3

- DOM3 具有更多事件类型
- DOM3 级事件在 DOM2 级事件的基础上添加了更多的事件类型，全部类型如下：

```
UI事件，当用户与页面上的元素交互时触发，如：load、scroll
焦点事件，当元素获得或失去焦点时触发，如：blur、focus
鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
文本事件，当在文档中输入文本时触发，如：textInput
键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified
```

参考资料：

- [dom0、dom2、dom3 事件](https://www.jianshu.com/p/3acdf5f71d5b)

## 如何自定义事件

### 事件列表

[事件参考-MDN](https://developer.mozilla.org/zh-CN/docs/Web/Events#%E6%A0%87%E5%87%86%E4%BA%8B%E4%BB%B6)

### 新模式

```js
const div = document.createElement('div') // 不创建元素，直接用 window 对象也可以
const event = new Event('build')

div.addEventListener('build', function(e) {
  console.log(111)
})

div.dispatchEvent(event)
```

### 过时的模式

1. 原生提供了 3 个方法实现自定义事件
2. `document.createEvent('Event')` 创建事件
3. `initEvent` 初始化事件
4. `dispatchEvent` 触发事件

```js
const events = {}

function registerEvent(name) {
  const event = document.createEvent('Event')
  event.initEvent(name, true, true) // 事件名称，是否允许冒泡，该事件的默认动作是否可以被取消
  events[name] = event
}

function triggerEvent(name) {
  window.dispatchEvent(events[name])
}

registerEvent('resize') // 注册 resize 事件
triggerEvent('resize') // 触发 resize 事件
```

## this 的指向

1. 在全局环境中使用时候，this 代表全局对象
2. 在对象方法中使用时，this 代表此对象
3. 调用无上下文的函数时，this 代表全局对象
4. 在构造函数内部使用时，this 代表正在构建的新对象
5. 当在原型链上定义的函数内部使用时， this 代表此对象
6. 在 call(),apply(),和 bind()函数调用时，this 代表对应方法传入的第一个参数
7. 在事件处理中于 js 中绑定或注册，或在 html 中注册并直接使用 this 关键字（非丢失 this 指向），this 代表 html 元素，在事件处理与元素上直接绑定事件方法名会使得 this 指向 window
8. 箭头函数中，this 代表其位置外层的 this 对象

参考链接

- [yanyue404 - #18 Javascript 中的 this 指向](https://github.com/yanyue404/blog/issues/18)

## 异步和单线程

JS 需要异步的根本原因是 **JS 是单线程运行的**，即在同一时间只能做一件事，不能“一心二用”。

一个 Ajax 请求由于网络比较慢，请求需要 5 秒钟。如果是同步，这 5 秒钟页面就卡死在这里啥也干不了了。异步的话，就好很多了，5 秒等待就等待了，其他事情不耽误做，至于那 5 秒钟等待是网速太慢，不是因为 JS 的原因。

讲到单线程，我们再来看个真题：

> 题目：讲解下面代码的执行过程和结果

```js
var a = true
setTimeout(function() {
  a = false
}, 100)
while (a) {
  console.log('while执行了')
}
```

这是一个很有迷惑性的题目，不少候选人认为`100ms`之后，由于`a`变成了`false`，所以`while`就中止了，实际不是这样，因为 JS 是单线程的，所以进入`while`循环之后，没有「时间」（线程）去跑定时器了，所以这个代码跑起来是个死循环！

## 前端异步的场景

- 定时 `setTimeout` `setInterval`
- 网络请求，如 `Ajax` `<img>`加载

Ajax 代码示例

```js
console.log('start')
$.get('./data1.json', function(data1) {
  console.log(data1)
})
console.log('end')
```

img 代码示例（常用于打点统计）

```js
console.log('start')
var img = document.createElement('img')
// 或者 img = new Image()
img.onload = function() {
  console.log('loaded')
  img.onload = null
}
img.src = '/xxx.png'
console.log('end')
```

## 事件循环机制 Event-Loop

> 简单来说： 事件循环是一个单线程循环，用于监视调用堆栈并检查是否有工作即将在任务队列中完成。如果调用堆栈为空并且任务队列中有回调函数，则将回调函数出队并推送到调用堆栈中执行。

众所周知 JS 是门非阻塞单线程语言，因为在最初 JS 就是为了和浏览器交互而诞生的。如果 JS 是门多线程的语言话，我们在多个线程中处理 DOM 就可能会发生问题（一个线程中新加节点，另一个线程中删除节点），当然可以引入读写锁解决这个问题。

JS 在执行的过程中会产生执行环境，这些执行环境会被顺序的加入到执行栈中。如果遇到异步的代码，会被挂起并加入到 Task（有多种 task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

```js
console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

console.log('script end')
```

以上代码虽然 setTimeout 延时为 0，其实还是异步。这是因为 HTML5 标准规定这个函数第二个参数不得小于 4 毫秒，不足会自动增加。所以 setTimeout 还是会在 script end 之后打印。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 微任务（microtask） 和 宏任务（macrotask）。在 ES6 规范中，microtask 称为 jobs，macrotask 称为 task。

```js
console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
// script start => Promise => script end => promise1 => promise2 => setTimeout
```

以上代码虽然 setTimeout 写在 Promise 之前，但是因为 Promise 属于微任务而 setTimeout 属于宏任务，所以会有以上的打印。

- 微任务包括 `process.nextTick` ，`promise` ，`Object.observe` ，`MutationObserver`
- 宏任务包括 `script代码块` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务。
所以正确的一次 Event loop 顺序是这样的

1. 执行同步代码，这属于宏任务
2. 执行栈为空，查询是否有微任务需要执行
3. 执行所有微任务
4. 必要的话渲染 UI
5. 然后开始下一轮 Event loop，执行宏任务中的异步代码

通过上述的 Event loop 顺序可知，如果宏任务中的异步代码有大量的计算并且需要操作 DOM 的话，为了更快的 界面响应，我们可以把操作 DOM 放入微任务中。

参考链接

- https://juejin.cn/post/6844903598707441672

**详细说明 Event loop**

## js 脚本加载问题，async、defer 问题

- html 静态 `<script>`引入
- js 动态插入`<script>`
- `<script defer>`: 延迟加载，元素解析完成后执行
- `<script async>`: 异步加载，但执行时会阻塞元素渲染

## 节流与防抖

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

## 函数柯里化

在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为函数的柯里化。通常可用于在不侵入函数的前提下，为函数 预置通用参数，供多次重复调用。

```js
const curry = fn => {
  const len = fn.length
  return function curried(...args) {
    if (args.length === len) {
      return fn.apply(null, args)
    }
    return (...rest) => {
      return curried.apply(null, [...args, ...rest])
    }
  }
}

const sum = (x, y, z) => x + y + z
const add = curry(sum)

// 6
add(1, 2, 3)

// 6
add(1, 2)(3)

// 6
add(1)(2, 3)

// 6
add(1)(2)(3)
```

## 自执行函数?用于什么场景？好处?

**例子**

```js
// es5
;(function() {
  // todo...
})()

// es6
;(() => {
  // todo...
})()

// es7
;(async () => {
  // todo...
})()
```

**自执行函数:**

1. 声明一个匿名函数
2. 马上调用这个匿名函数。

作用：创建一个独立的作用域。

**好处**

1. 防止变量弥散到全局，以免各种 js 库冲突。
2. 隔离作用域避免污染，或者截断作用域链，避免闭包造成引用变量无法释放。
3. 利用立即执行特性，返回需要的业务函数或对象，避免每次通过条件判断来处理。

**场景**

一般用于框架、插件等场景

## arguments 对象了解吗？如何转换为数组？

arguments 是一个对应于传递给函数的参数的类数组对象。arguments 对象是所有（非箭头）函数中都可用的局部变量。

```js
function func1(a, b, c) {
  console.log(arguments[0])
  // expected output: 1

  console.log(arguments[1])
  // expected output: 2

  console.log(arguments[2])
  // expected output: 3
}

func1(1, 2, 3)
```

```js
function add(x, y, z) {
  console.log('arguments', arguments) // arguments {"0": 1,"1": 2,"2": 3}
  // ES5
  console.log(Array.prototype.slice.call(arguments)) // [1,2,3]
  console.log([].slice.call(arguments)) // [1,2,3]
  console.log(Array.apply(null, arguments)) // [1,2,3]

  // ES6
  console.log([...arguments]) // [1,2,3]
  console.log(Array.from(arguments)) // [1,2,3]
}
add(1, 2, 3)
```

参考链接

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments

## 使用 let、var 和 const 创建变量有什么区别

用 var 声明的变量的作用域是它当前的执行上下文，它可以是嵌套的函数，也可以是声明在任何函数外的变量。let 和 const 是块级作用域，意味着它们只能在最近的一组花括号（function、if-else 代码块或 for 循环中）中访问。

var 声明的全局变量和函数都会成为 window 对象的属性和方法。使用 let 和 const 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。

```js
function foo() {
  // 所有变量在函数中都可访问
  var bar = 'bar'
  let baz = 'baz'
  const qux = 'qux'

  console.log(bar) // bar
  console.log(baz) // baz
  console.log(qux) // qux
}

console.log(bar) // ReferenceError: bar is not defined
console.log(baz) // ReferenceError: baz is not defined
console.log(qux) // ReferenceError: qux is not defined
```

```js
if (true) {
  var bar = 'bar'
  let baz = 'baz'
  const qux = 'qux'
}

// 用 var 声明的变量在函数作用域上都可访问
console.log(bar) // bar
// let 和 const 定义的变量在它们被定义的语句块之外不可访问
console.log(baz) // ReferenceError: baz is not defined
console.log(qux) // ReferenceError: qux is not defined
```

var 会使变量提升，这意味着变量可以在声明之前使用。let 和 const 不会使变量提升，并且在变量未申明前不可使用（即暂时性死区）。

```js
console.log(foo) // undefined

var foo = 'foo'

console.log(baz) // ReferenceError: can't access lexical declaration 'baz' before initialization

let baz = 'baz'

console.log(bar) // ReferenceError: can't access lexical declaration 'bar' before initialization

const bar = 'bar'
```

用 var 重复声明不会报错，但 let 和 const 会。

```js
var foo = 'foo'
var foo = 'bar'
console.log(foo) // "bar"

let baz = 'baz'
let baz = 'qux' // Uncaught SyntaxError: Identifier 'baz' has already been declared
```

let 和 const 的区别在于：let 声明的变量可以任意修改，const 声明为值类型数据时不可变，声明值为引用类型的时候只允许修改内存中存储的值，不允许直接修改指针。

```js
const foo = {}

// 为 foo 添加一个属性，可以成功
foo.prop = 123
foo.prop // 123

// 将 foo 指向另一个对象，就会报错
foo = {} // TypeError: "foo" is read-only
```

## 箭头函数和普通函数有什么区别

ES6 允许使用“箭头”（=>）定义函数。`function name(arg1, arg2) {...}`可以使用`(arg1, arg2) => {...}`来定义。

箭头函数的使用注意点：

- 函数体内的 this 对象，就是定义时所在的作用域，而不是使用时所在的作用域
- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
- 箭头函数没有原型对象 prototype

箭头函数存在的意义，第一写起来更加简洁，第二可以解决 ES6 之前函数执行中`this`是全局变量的问题，看如下代码：

```js
function fn() {
  console.log('real', this) // {a: 100} ，该作用域下的 this 的真实的值
  var arr = [1, 2, 3]
  // 普通 JS
  arr.map(function(item) {
    console.log('js', this) // window 。普通函数，这里打印出来的是全局变量，令人费解
    return item + 1
  })
  // 箭头函数
  arr.map(item => {
    console.log('es6', this) // {a: 100} 。箭头函数，这里打印的就是父作用域的 this
    return item + 1
  })
}
fn.call({ a: 100 })
```

## Promise

`Promise`是 CommonJS 提出来的这一种规范，有多个版本，在 ES6 当中已经纳入规范，原生支持 Promise 对象，非 ES6 环境可以用类似 Bluebird、Q 这类库来支持。

`Promise` 可以将回调变成链式调用写法，流程更加清晰，代码更加优雅。

简单归纳下 Promise：**三个状态、两个过程、一个方法**，快速记忆方法：**3-2-1**

三个状态：`pending`、`fulfilled`、`rejected`

两个过程：

- pending→fulfilled（resolve）
- pending→rejected（reject）

一个方法：`then`

当然还有其他概念，如`catch`、 `Promise.all/race/allSettled`，这里就不展开了。

## Async & Await

## Set 和 Map

Set 和 Map 都是 ES6 中新增的数据结构，是对当前 JS 数组和对象这两种重要数据结构的扩展。由于是新增的数据结构，目前尚未被大规模使用，但是作为前端程序员，提前了解是必须做到的。先总结一下两者最关键的地方：

- Set 类似于数组，但数组可以允许元素重复，Set 不允许元素重复
- Map 类似于对象，但普通对象的 key 必须是字符串或者数字，而 Map 的 key 可以是任何数据类型

**Set**

Set 实例不允许元素有重复，可以通过以下示例证明。可以通过一个数组初始化一个 Set 实例，或者通过`add`添加元素，元素不能重复，重复的会被忽略。

```js
// 例1
const set = new Set([1, 2, 3, 4, 4])
console.log(set) // Set(4) {1, 2, 3, 4}

// 例2
const set = new Set()
;[2, 3, 5, 4, 5, 8, 8].forEach(item => set.add(item))
for (let item of set) {
  console.log(item)
}
// 2 3 5 4 8
```

Set 实例的属性和方法有

- `size`：获取元素数量。
- `add(value)`：添加元素，返回 Set 实例本身。
- `delete(value)`：删除元素，返回一个布尔值，表示删除是否成功。
- `has(value)`：返回一个布尔值，表示该值是否是 Set 实例的元素。
- `clear()`：清除所有元素，没有返回值。

```js
const s = new Set()
s.add(1)
  .add(2)
  .add(2) // 添加元素

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2)
s.has(2) // false

s.clear()
console.log(s) // Set(0) {}
```

Set 实例的遍历，可使用如下方法

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。不过由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys()`和`values()`返回结果一致。
- `entries()`：返回键值对的遍历器。
- `forEach()`：使用回调函数遍历每个成员。

```js
let set = new Set(['aaa', 'bbb', 'ccc'])

for (let item of set.keys()) {
  console.log(item)
}
// aaa
// bbb
// ccc

for (let item of set.values()) {
  console.log(item)
}
// aaa
// bbb
// ccc

for (let item of set.entries()) {
  console.log(item)
}
// ["aaa", "aaa"]
// ["bbb", "bbb"]
// ["ccc", "ccc"]

set.forEach((value, key) => console.log(key + ' : ' + value))
// aaa : aaa
// bbb : bbb
// ccc : ccc
```

**Map**

Map 的用法和普通对象基本一致，先看一下它能用非字符串或者数字作为 key 的特性。

```js
const map = new Map()
const obj = { p: 'Hello World' }

map.set(obj, 'OK')
map.get(obj) // "OK"

map.has(obj) // true
map.delete(obj) // true
map.has(obj) // false
```

需要使用`new Map()`初始化一个实例，下面代码中`set` `get` `has` `delete`顾名即可思义（下文也会演示）。其中，`map.set(obj, 'OK')`就是用对象作为的 key （不光可以是对象，任何数据类型都可以），并且后面通过`map.get(obj)`正确获取了。

Map 实例的属性和方法如下：

- `size`：获取成员的数量
- `set`：设置成员 key 和 value
- `get`：获取成员属性值
- `has`：判断成员是否存在
- `delete`：删除成员
- `clear`：清空所有

```js
const map = new Map()
map.set('aaa', 100)
map.set('bbb', 200)

map.size // 2

map.get('aaa') // 100

map.has('aaa') // true

map.delete('aaa')
map.has('aaa') // false

map.clear()
```

Map 实例的遍历方法有：

- `keys()`：返回键名的遍历器。
- `values()`：返回键值的遍历器。
- `entries()`：返回所有成员的遍历器。
- `forEach()`：遍历 Map 的所有成员。

```js
const map = new Map()
map.set('aaa', 100)
map.set('bbb', 200)

for (let key of map.keys()) {
  console.log(key)
}
// "aaa"
// "bbb"

for (let value of map.values()) {
  console.log(value)
}
// 100
// 200

for (let item of map.entries()) {
  console.log(item[0], item[1])
}
// aaa 100
// bbb 200

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value)
}
// aaa 100
// bbb 200
```

## Class

class 其实一直是 JS 的关键字（保留字），但是一直没有正式使用，直到 ES6 。 ES6 的 class 就是取代之前构造函数初始化对象的形式，从语法上更加符合面向对象的写法。例如：

JS 构造函数的写法

```js
function MathHandle(x, y) {
  this.x = x
  this.y = y
}

MathHandle.prototype.add = function() {
  return this.x + this.y
}

var m = new MathHandle(1, 2)
console.log(m.add())
```

用 ES6 class 的写法

```js
class MathHandle {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add() {
    return this.x + this.y
  }
}
const m = new MathHandle(1, 2)
console.log(m.add())
```

注意以下几点，全都是关于 class 语法的：

- class 是一种新的语法形式，是`class Name {...}`这种形式，和函数的写法完全不一样
- 两者对比，构造函数函数体的内容要放在 class 中的`constructor`函数中，`constructor`即构造器，初始化实例时默认执行
- class 中函数的写法是`add() {...}`这种形式，并没有`function`关键字

使用 class 来实现继承就更加简单了，至少比构造函数实现继承简单很多。看下面例子

JS 构造函数实现继承

```js
// 动物
function Animal() {
  this.eat = function() {
    console.log('animal eat')
  }
}
// 狗
function Dog() {
  this.bark = function() {
    console.log('dog bark')
  }
}
Dog.prototype = new Animal()
// 哈士奇
var hashiqi = new Dog()
```

ES6 class 实现继承

```js
class Animal {
  constructor(name) {
    this.name = name
  }
  eat() {
    console.log(`${this.name} eat`)
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name)
    this.name = name
  }
  say() {
    console.log(`${this.name} say`)
  }
}
const dog = new Dog('哈士奇')
dog.say()
dog.eat()
```

注意以下两点：

- 使用`extends`即可实现继承，更加符合经典面向对象语言的写法，如 Java
- 子类的`constructor`一定要执行`super()`，以调用父类的`constructor`

## Object 与 Map 的区别

1. Object 只能选择字符、数值、符号作为 key，Map 则可以使用任何类型的数据作为 key。
2. Map 实例会维护键值对的插入顺序，因此可以根据插入顺序执行迭代操作。Chrome Opera 中使用 for-in 语句遍历 Object 属性时会遵循一个规律：它们会先提取所有 key 的 parseFloat 值为非负整数的属性，然后根据数字顺序对属性排序首先遍历出来，然后按照对象定义的顺序遍历余下的所有属性。其它浏览器则完全按照对象定义的顺序遍历属性。

### 选择 Object 还是 Map

对于多数 Web 开发任务来说，选择 Object 还是 Map 只是个人偏好问题，影响不大。不过，对于在乎内存和性能的开发者来说，对象和映射之间确实存在显著的差别。

**1. 内存占用**

Object 和 Map 的工程级实现在不同浏览器间存在明显差异，但存储单个键/值对所占用的内存数量都会随键的数量线性增加。批量添加或删除键/值对则取决于各浏览器对该类型内存分配的工程实现。

不同浏览器的情况不同，但给定固定大小的内存， Map 大约可以比 Object 多存储 50%的键/值对。

**2. 插入性能**

向 Object 和 Map 中插入新键/值对的消耗大致相当，不过插入 Map 在所有浏览器中一般会稍微快一点儿。对这两个类型来说，插入速度并不会随着键/值对数量而线性增加。

如果代码涉及大量插入操作，那么显然 Map 的性能更佳。

**3. 查找速度**

与插入不同，从大型 Object 和 Map 中查找键/值对的性能差异极小，但如果只包含少量键/值对，则 Object 有时候速度更快。在把 Object 当成数组使用的情况下（比如使用连续整数作为属性），浏览器引擎可以进行优化，在内存中使用更高效的布局。

这对 Map 来说是不可能的。对这两个类型而言，查找速度不会随着键/值对数量增加而线性增加。如果代码涉及大量查找操作，那么某些情况下可能选择 Object 更好一些。

**4. 删除性能**

使用 delete 删除 Object 属性的性能一直以来饱受诟病，目前在很多浏览器中仍然如此。为此，出现了一些伪删除对象属性的操作，包括把属性值设置为 undefined 或 null 。但很多时候，这都是一
种讨厌的或不适宜的折中。

而对大多数浏览器引擎来说， Map 的 delete() 操作都比插入和查找更快。如果代码涉及大量删除操作，那么毫无疑问应该选择 Map 。

参考资料：

- [JavaScript 高级程序设计（第 4 版）](https://book.douban.com/subject/35175321/?from=tag)
- [js 能够保证 object 属性的输出顺序吗？](http://jartto.wang/2016/10/25/does-js-guarantee-object-property-order/)

## JavaScript 设计模式

**实现发布/订阅模式**

```js
class Event {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(callback)
  }

  off(event, callback) {
    if (this.events[event]) {
      if (callback) {
        const cbs = this.events[event]
        let l = cbs.length
        while (l--) {
          if (callback == cbs[l]) {
            cbs.splice(l, 1)
          }
        }
      } else {
        this.events[event] = []
      }
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      for (const func of this.events[event]) {
        func.call(this, ...args)
      }
    }
  }

  once(event, callback) {
    const self = this

    function wrap(...args) {
      callback.call(self, ...args)
      self.off(event, wrap)
    }

    this.on(event, wrap)
  }
}
```

**单例模式**

```js
class Singleton {
  constructor() {}
}

Singleton.getInstance = (function() {
  let instance
  return function() {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()

let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()
console.log(s1 === s2) // true
```

## 代码的复用

当你发现任何代码开始写第二遍时，就要开始考虑如何复用。一般有以下的方式:

- 函数封装
- 继承
- 复制 extend
- 混入 mixin
- 借用 apply/call

## 模块化

模块化开发在现代开发中已是必不可少的一部分，它大大提高了项目的可维护、可拓展和可协作性。通常，我们 在浏览器中使用 ES6 的模块化支持，在 Node 中使用 commonjs 的模块化支持。

- 分类:
  - es6: import / export
  - commonjs: require / module.exports / exports
  - amd: require / defined
- require 与 import 的区别
  - require 支持 动态导入，import 不支持，正在提案 (babel 下可支持)
  - require 是 同步 导入，import 属于 异步 导入
  - require 是 值拷贝，导出值变化不会影响导入值；import 指向 内存地址，导入值会随导出值而变化

## 浏览器的垃圾回收机制

#### （1）垃圾回收的概念

垃圾回收：JavaScript 代码运行时，需要分配内存空间来储存变量和值。当变量不在参与运行时，就需要系统收回被占用的内存空间，这就是垃圾回收。

回收机制：

- Javascript 具有自动垃圾回收机制，会定期对那些不再使用的变量、对象所占用的内存进行释放，原理就是找到不再使用的变量，然后释放掉其占用的内存。
- JavaScript 中存在两种变量：局部变量和全局变量。全局变量的生命周期会持续要页面卸载；而局部变量声明在函数中，它的生命周期从函数执行开始，直到函数执行结束，在这个过程中，局部变量会在堆或栈中存储它们的值，当函数执行结束后，这些局部变量不再被使用，它们所占有的空间就会被释放。
- 不过，当局部变量被外部函数使用时，其中一种情况就是闭包，在函数执行结束后，函数外部的变量依然指向函数内部的局部变量，此时局部变量依然在被使用，所以不会回收。

#### （2）垃圾回收的方式

浏览器通常使用的垃圾回收方法有两种：标记清除，引用计数。

1）标记清除

- 标记清除是浏览器常见的垃圾回收方式，当变量进入执行环境时，就标记这个变量“进入环境”，被标记为“进入环境”的变量是不能被回收的，因为他们正在被使用。当变量离开环境时，就会被标记为“离开环境”，被标记为“离开环境”的变量会被内存释放。
- 垃圾收集器在运行的时候会给存储在内存中的所有变量都加上标记。然后，它会去掉环境中的变量以及被环境中的变量引用的标记。而在此之后再被加上标记的变量将被视为准备删除的变量，原因是环境中的变量已经无法访问到这些变量了。最后。垃圾收集器完成内存清除工作，销毁那些带标记的值，并回收他们所占用的内存空间。

2）引用计数

- 另外一种垃圾回收机制就是引用计数，这个用的相对较少。引用计数就是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型赋值给该变量时，则这个值的引用次数就是 1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数就减 1。当这个引用次数变为 0 时，说明这个变量已经没有价值，因此，在在机回收期下次再运行时，这个变量所占有的内存空间就会被释放出来。
- 这种方法会引起循环引用的问题：例如：`obj1`和`obj2`通过属性进行相互引用，两个对象的引用次数都是 2。当使用循环计数时，由于函数执行完后，两个对象都离开作用域，函数执行结束，`obj1`和`obj2`还将会继续存在，因此它们的引用次数永远不会是 0，就会引起循环引用。

```java
function fun() {
    let obj1 = {};
    let obj2 = {};
    obj1.a = obj2; // obj1 引用 obj2
    obj2.a = obj1; // obj2 引用 obj1
}
```

这种情况下，就要手动释放变量占用的内存：

```java
obj1.a =  null
 obj2.a =  null
```

#### （3）减少垃圾回收

虽然浏览器可以进行垃圾自动回收，但是当代码比较复杂时，垃圾回收所带来的代价比较大，所以应该尽量减少垃圾回收。

- 对数组进行优化： 在清空一个数组时，最简单的方法就是给其赋值为\[ \]，但是与此同时会创建一个新的空对象，可以将数组的长度设置为 0，以此来达到清空数组的目的。
- 对`object`进行优化： 对象尽量复用，对于不再使用的对象，就将其设置为 null，尽快被回收。
- 对函数进行优化： 在循环中的函数表达式，如果可以复用，尽量放在函数的外面。

## 参考

- [一名【合格】前端工程师的自检清单](https://zhuanlan.zhihu.com/p/64098516)
