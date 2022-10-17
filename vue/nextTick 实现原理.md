## nextTick 实现原理

简化实现一个异步合并任务队列：

```js
let pending = false
// 存放需要异步调用的任务
const callbacks = []
function flushCallbacks() {
  pending = false // 执行完再打开微任务队列
  // 循环执行队列
  for (let i = 0; i < callbacks.length; i++) {
    callbacks[i]()
  }
  // 清空
  callbacks.length = 0
}

function nextTick(cb) {
  callbacks.push(cb)
  if (!pending) {
    pending = true // 第一次推入微任务 flushCallbacks 然后闭合开关
    // 利用Promise的then方法 在下一个微任务队列中把函数全部执行
    // 在微任务开始之前 依然可以往callbacks里放入新的回调函数
    Promise.resolve().then(flushCallbacks)
  }
}
```

```js
// 第一次调用 then方法已经被调用了 但是 flushCallbacks 还没执行
nextTick(() => console.log(1))
// callbacks里push这个函数
nextTick(() => console.log(2))
// callbacks里push这个函数
nextTick(() => console.log(3))

// 同步函数优先执行
console.log(4)

// 此时调用栈清空了，浏览器开始检查微任务队列，发现了 flushCallbacks 方法，执行。
// 此时 callbacks 里的 3 个函数被依次执行。

// 4
// 1
// 2
// 
```
## 参考
- [Vue源码详解之nextTick：MutationObserver只是浮云，microtask才是核心！](https://segmentfault.com/a/1190000008589736)
- [ssh 回忆] 面了几个说自己精通 Vue 的同学
- JS 异步错误捕获二三事