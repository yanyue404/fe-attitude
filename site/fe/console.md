## 打印结果

## 数据类型转换

### 例 1

```js
String('11') == new String('11')
String('11') === new String('11')
```

<details>
<summary>解答</summary>

```js
var str1 = String('11')
var str2 = new String('11')
str1 == str2 // true
str1 === str2 // false
typeof str1 // "string"
typeof str2 // "object"
```

总结：

1. ==时做了隐式转换，调用了 toString, 实际运行的是
   `String('11') == new String('11').toString()`
2. 2 者类型不一样，一个是 string，一个是 object

</details>

## 原型与函数

### 例 1

```js
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
Foo.prototype.a = function() {
  console.log(3)
}
Foo.a = function() {
  console.log(4)
}
Foo.a()
let obj = new Foo()
obj.a()
Foo.a()
```

<details>
<summary>解答</summary>

输出顺序是 4 2 1

```js
function Foo() {
  Foo.a = function() {
    console.log(1)
  }
  this.a = function() {
    console.log(2)
  }
}
// 以上只是 Foo 的构建方法，没有产生实例，此刻也没有执行

Foo.prototype.a = function() {
  console.log(3)
}
// 现在在 Foo 上挂载了原型方法 a ，方法输出值为 3

Foo.a = function() {
  console.log(4)
}
// 现在在 Foo 上挂载了直接方法 a ，输出值为 4

Foo.a()
// 立刻执行了 Foo 上的 a 方法，也就是刚刚定义的，所以
// # 输出 4

let obj = new Foo()
/* 这里调用了 Foo 的构建方法。Foo 的构建方法主要做了两件事：
1. 将全局的 Foo 上的直接方法 a 替换为一个输出 1 的方法。
2. 在新对象上挂载直接方法 a ，输出值为 2。
*/

obj.a()
// 因为有直接方法 a ，不需要去访问原型链，所以使用的是构建方法里所定义的 this.a，
// # 输出 2

Foo.a()
// 构建方法里已经替换了全局 Foo 上的 a 方法，所以
// # 输出 1
```

</details>

## 异步

### 例 1

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/7

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function() {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function(resolve) {
  console.log('promise1')
  resolve()
}).then(function() {
  console.log('promise2')
})
console.log('script end')
```

<details>
<summary>解答</summary>

async1 里的 await

从字面意思上看 await 就是等待，await 等待的是一个表达式，这个表达式的返回值可以是一个 promise 对象也可以是其他值。

很多人以为 await 会一直等待之后的表达式执行完之后才会继续执行后面的代码，实际上 await 是一个让出线程的标志。await 后面的表达式会先执行一遍，将 await 后面的代码加入到 microtask 中，然后就会跳出整个 async 函数来执行后面的代码。

由于因为 async await 本身就是 promise+generator 的语法糖。所以 await 后面的代码是 microtask。所以对于本题中的

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}
```

等价于

```js
async function async1() {
  console.log('async1 start')
  Promise.resolve(async2()).then(() => {
    console.log('async1 end')
  })
}
```

```js
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout
```

</details>

### 例子 2

```js
async function a1() {
  console.log('a1 start')
  await a2()
  console.log('a1 end')
}
async function a2() {
  console.log('a2')
}

console.log('script start')

setTimeout(() => {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
  console.log('promise1')
})

a1()

let promise2 = new Promise(resolve => {
  resolve('promise2.then')
  console.log('promise2')
})

promise2.then(res => {
  console.log(res)
  Promise.resolve().then(() => {
    console.log('promise3')
  })
})
console.log('script end')
```

```js
script start
a1 start
a2
promise2
script end
promise1
a1 end
promise2.then
promise3
setTimeout
```

### 例 3

```js
function wait() {
  return new Promise(resolve => setTimeout(resolve, 10 * 1000))
}

async function main() {
  console.time()
  const x = wait()
  const y = wait()
  const z = wait()
  await x
  await y
  await z
  console.timeEnd()
}
main()
```

<details>
<summary>解答</summary>

```js
function wait() {
  return new Promise(resolve => setTimeout(resolve, 10 * 1000))
}

async function main() {
  console.time()
  const x = await wait() // 每个都是都执行完才结,包括setTimeout（10*1000）的执行时间
  const y = await wait() // 执行顺序 x->y->z 同步执行，x 与 setTimeout 属于同步执行
  const z = await wait()
  console.timeEnd() // default: 30099.47705078125ms

  console.time()
  const x1 = wait() // x1,y1,z1 同时异步执行， 包括setTimeout（10*1000）的执行时间
  const y1 = wait() // x1 与 setTimeout 属于同步执行
  const z1 = wait()
  await x1
  await y1
  await z1
  console.timeEnd() // default: 10000.67822265625ms
}
main()
```

</details>

### 例 4

```js
var date = new Date()

console.log(1, new Date() - date)

setTimeout(() => {
  console.log(2, new Date() - date)
}, 500)

Promise.resolve().then(console.log(3, new Date() - date))

while (new Date() - date < 1000) {}

console.log(4, new Date() - date)
```

<details>
<summary>解答</summary>

这道题 考察的 两个地方

1. then 的回调参数

Promise.resolve().then(console.log(3, new Date() - date))

2. 主线程 和 异步任务

while(new Date() - date < 1000) {}

```
1 0
3 1
4 1000
2 1000(大于1秒)
```

</details>

### 例 5

请说出以下代码打印结果

```js
console.log(1)

setTimeout(() => {
  console.log(2)

  setTimeout(() => {
    console.log(14)
    new Promise((resolve, reject) => {
      console.log(15)
      resolve()
    }).then(res => {
      console.log(16)
    })
  })

  new Promise((resolve, reject) => {
    console.log(3)
    resolve()
  }).then(res => {
    console.log(4)
  })
})

new Promise((resolve, reject) => {
  resolve()
})
  .then(res => {
    console.log(5)
  })
  .then(res => {
    console.log(6)
  })

new Promise((resolve, reject) => {
  console.log(7)
  resolve()
})
  .then(res => {
    console.log(8)
  })
  .then(res => {
    console.log(9)
  })

setTimeout(() => {
  console.log(10)
  new Promise((resolve, reject) => {
    console.log(11)
    resolve()
  }).then(res => {
    console.log(12)
  })
})
console.log(13)
```

<details>
<summary>解答</summary>

1 7 13 5 8 6 9 2 3 4 10 11 12 14 15 16

</details>
## 变量及作用域

### 例 1

```js
let x = 1

function func() {
  console.log(x) // ?

  let x = 2
}

func()
```

<details>
<summary>解答</summary>

error，暂时性死区

</details>

### 例 2

```js
var name = 'Tom'
;(function() {
  if (typeof name == 'undefined') {
    name = 'Jack'
    console.log('Goodbye ' + name)
  } else {
    console.log('Hello ' + name)
  }
})()
```

<details>
<summary>解答</summary>

```
hello Tom
1、首先在进入函数作用域当中，获取 name 属性
2、在当前作用域没有找到 name
3、通过作用域链找到最外层，得到 name 属性
4、执行 else 的内容，得到 Hello Tom
```

</details>

### 例 3

```js
var name = 'Tom'
;(function() {
  if (typeof name == 'undefined') {
    var name = 'Jack'
    console.log('Goodbye ' + name)
  } else {
    console.log('Hello ' + name)
  }
})()
```

<details>
<summary>解答</summary>

```
Goodbye Jack；

IIFE 内的 var 穿透了块作用域，name被提升至if()之前，且此时name 为undefined。
```

</details>

### 例 4

```js
var foo = 1
function fn() {
  foo = 3
  console.log(foo) // 打印结果 1
  return
  function foo() {
    // todo
  }
}
fn()
console.log(foo) // 打印结果 2
```

<details>
<summary>解答</summary>

```

打印结果 1：3
打印结果 2：1
```

</details>

## 其他

### 1. 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

答案：

`[102, 15, 22, 29, 3, 8]`

解析：

根据 MDN 上对 Array.sort()的解释，默认的排序方法会将数组元素转换为字符串，然后比较字符串中字符的 UTF-16 编码顺序来进行排序。所以'102' 会排在 '15' 前面。以下是 MDN 中的解释原文：

> The sort() method sorts the elements of an array in place and returns the array. The default sort order is built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values.

自定义排序结果：

```js
// => 大于 0 则交换位置
[3, 15, 8, 29, 102, 22] .sort((a,b) => a-b) // [3,8,15,22,29,102]
[3, 15, 8, 29, 102, 22] sort((a,b) => b-a) //[102, 29, 22, 15, 8, 3]
```
