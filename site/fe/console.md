## 1. 异步

### 请写出异步输出结果

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

### 输出以下代码执行结果

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

## 2. 使用 sort() 对数组 [3, 15, 8, 29, 102, 22] 进行排序，输出结果

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
