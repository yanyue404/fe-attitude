## 每轮都考察什么?

| 轮次 | 考察                                                                                                                                                                                                       | 说明                                                                                                                                   |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| 一面 | 1.前端基础知识。注意要有层次性，不断深⼊追问，挖掘深度。同时考察表达能与理解能⼒；2.候选⼈擅⻓且⾃⼰也擅⻓的技术点。切记不要考察⾃⼰擅⻓但候选⼈不擅⻓的知识点。⽆法提取有效信息，宁可不考也不要浪费时间； | 尽量套路化，规范化，提供标准且有效的信息输出                                                                                           |
| 二面 | 1.前端基础知识。更偏框架、底层、应⽤、⼯程化等实战类；2.候选⼈擅⻓的技术点深度挖掘，注意考察表达能⼒与理解能⼒；3.与业务契合的技能深挖（若有、重点）；项⽬的相关经验，针对简历内容展开                     | ⼀是作为⼀⾯的考察补充，⼆是要根据候选⼈的情况，给与更针对性的考察。这就要求⾯试官的⽔平要有⼀定的深度和⼴度，能够应付多种类型的候选⼈ |

## 问题列表

### CSS

- 两种盒子模型

<details>
<summary>解答</summary>

1. 根据 box-sizing 属性值的不同将盒子模型分为 contont-box 与 border-box；
2. 差异在于，content-box 的实际宽高 = width/height + border + padding，border-box 的实际宽高 = width/height（包含了 border、padding）

</details>

- 居中布局的⽅案有哪些？

<details>
<summary>解答</summary>

1. 水平居中

- 行内元素：`text-align: center`
- 块级元素: `margin: 0 auto`
- `absolute + transform`
- `flex + justify-content: center`

2. 垂直居中

- `line-height: height`
- `absolute + transform`
- `flex + align-items: center`

3. 水平垂直居中

- `absolute + transform`
- `flex + justify-content + align-items`
- `table-cell`

</details>

- rem 布局原理

<details>
<summary>解答</summary>

rem 响应适配的原理是动态计算为当前页面的 `newFontSize`并赋值给 html 根节点，从而 rem 参照可以根据根节点进行缩放。

设计稿宽度 / `预设 font-size` = 实际屏幕宽度 / `newFontSize`

`newFontSize` = 实际屏幕宽度 \* `预设 font-size` / 设计稿宽度

还有一种响应方案，html 根元素 font-size 设置 13.33vm 是什么意思 ？

这也是 100px 的一种表示方式。

750px = 100vm, 即 1vm = 7.5px

`100px = 100px / 7.5px = 13.33vm`

</details>

- 去除浮动影响，防止父级高度塌陷

<details>
<summary>解答</summary>

1. 给父元素加上 .clearfix
2. 创建父级 BFC，例如给父元素加上 overflow:hidden。
3. 父级设置高度

</details>

- BFC 是什么？

<details>
<summary>解答</summary>

1. 概念

块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，不会相互影响。

2. 如何触发

- body 根元素
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed)
- display 为 flex、grid、inline-block、table-cell
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

3. 可以解决的问题

- 清除浮动(原理是浮动元素都位于同一个 BFC 区域之中)
- 阻止 margin 重叠
- 可以阻止元素被浮动元素覆盖

</details>

- 有哪⼏种定位？区别有哪些？

<details>
<summary>解答</summary>

定位一共有 5 种，static（默认静态定位）、absolute、relative、fixed、sticky（粘性定位）。

- `static`：默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- `relative`: 元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素（因此会在此元素未添加定位时所在位置留下空白）。
- `absolute`：绝对定位，它会从父类开始一层一层向上找起，寻找 position 值不是 `static` 的祖先元素，直到 html 根标签为止。
- `fixed`：不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变
- `sticky`: 粘性布局，可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/position

</details>

- CSS 伪类和伪元素有哪些，它们的区别和实际应⽤

<details>
<summary>解答</summary>

1. 伪类

其核心就是用来选择那些不能够被普通选择器选择的文档之外的元素，比如`:hover`。

还有`E:hover`、`E:not()`、 `E:first-child`、 `E:last-child`、 `E:nth-child(n)`、`E:nth-last-child(n)`等，作为个性选择器使用。

2. 伪元素

其核心就是需要创建通常不存在于文档中的元素，比如`::before`。

`::before`、`::after`、`::selection`、`::first-line`、`::first-letter` （常用清除浮动，画三角箭头、修饰文字等）

> 可以粗略的区分，伪类和伪元素分别用单冒号 :和双冒号 ::来表示。

</details>

- flex 布局

<details>
<summary>解答</summary>

</details>

### JavaScript

- 数据类型有哪些？区别？如何判断类型？

<details>
<summary>解答</summary>
原始类型，按值存储，string，null，boolean，undefined，number，symbol，bigint
对象类型，按引用指针存储，Object 类的所有，包括 Date，Function，Array等

类型判断：

- typeof，对于原始类型，除了 null 都可以显示正确的类型，null 可以使用 `String(null) === 'null'` 来判断
- instanceof
- Object.prototype.toString.call

</details>

- 浅拷贝与深拷贝？如何实现深拷贝？

- 说一下对闭包的理解，以及你在什么场景下会用到闭包？

<details>
<summary>解答</summary>

闭包属于一种特殊的作用域，称为 静态作用域。它的定义可以理解为: 父函数被销毁 的情况下，返回出的子函数的[[scope]]中仍然保留着父级的单变量对象和作用域链，因此可以继续访问到父级的变量对象，这样的函数称为闭包。

</details>

- 原型，构造函数，实例三者的关系，原型链？

<details>
<summary>解答</summary>

原型，一个简单的对象，用于实现对象的属性继承，可以使用`obj.__proto__` 来访问；
构造函数，可以通过 new 来新建一个对象的函数；
实例：通过 new 一个构造函数创建出的对象，实例通过 `__proto__` 来指向原型，通过 `constructor` 来指向构造函数。

```js
实例.__proto__ === 原型；
原型.constructor === 构造函数；
构造函数.prototype === 原型
```

原型链是由原型对象组成的，每个对象的`__proto__` 指向其构造函数的原型，`__proto__` 像链条一样将对象向上连接，直至 `Object.prototype`的上一级 null，原型链上溯结束。

```js
const arr = []

// 数组都继承于 Array.prototype
// (Array.prototype 中包含 indexOf, forEach 等方法)
// 原型链如下:
// arr ---> Array.prototype ---> Object.prototype ---> null
```

</details>

- 这段代码中的 this 是什么？

<details>
<summary>解答</summary>

- 在全局环境中使用时候，this 代表全局对象
- 在对象方法中使用时，this 代表此对象
- 调用无上下文的函数时，this 代表全局对象
- 在构造函数内部使用时，this 代表正在构建的新对象
- 当在原型链上定义的函数内部使用时， this 代表此对象
- 箭头函数中，this 代表其位置外层的 this 对象

</details>

- Event Loop 了解吗？宏任务与微任务解释一下？

<details>
<summary>解答</summary>

宏任务：script 代码块 ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering
微任务：process.nextTick ，promise.then ，Object.observe ，MutationObserver

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

很多人有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 script ，浏览器会先执行一个宏任务，接下来有异步代码的话就先执行微任务。 所以正确的一次 Event loop 顺序是这样的

1. 执行同步代码，这属于宏任务
2. 执行栈为空，查询是否有微任务需要执行
3. 执行所有微任务
4. 必要的话渲染 UI
5. 然后开始下一轮 Event loop，执行宏任务中的异步代码

</details>

- 防抖节流
- 设计模式
  - 单例模式
  - 发布订阅模式，实现 eventEmitter
- 函数式编程

**ES6**

- ES6 常用的特性
- let、const、var 区别
- 箭头函数与普通函数的区别

<details>
<summary>解答</summary>

- 箭头函数里面根本没有自己的 this，而是引用外层最近一层非箭头函数的 this。
- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。同样，箭头函数没有原型对象 prototype
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

</details>

- Promise，Promise.all 错误捕获

<details>

<summary>解答</summary>

简单归纳下 Promise：三个状态、两个过程、一个方法，当然还有其他概念，如 catch、 Promise.all/race/allSettled。

Promise.all 错误捕获

- 把 reject 操作换成 resolve(new Error("自定义的 error"))
- Promise.allSettled
- 扩展 Promise.every， 所有的 promise 都错误才触发 reject

</details>

- Class 用过吗？实现继承？

### 浏览器

- 事件循环机制
- 说说同源策略和跨域，跨域的解决办法
- 讲讲 http 的缓存机制吧，强缓存，协商缓存？
- Cookie、LocalStorage、SessionStorage 的区别
- 请求拦截
- 从输入 url 到展示的过程发生了什么？
  - websocket
  - 外链资源如何加载
  - js 脚本加载问题，async、defer 问题
  - 回流、重绘

### 网络

- http 缓存机制：强缓存和协商缓存
- https
- 安全 如何防范 XSS / CSRF 攻击

### vue

- 尽可能细的阐述一下 vue 的响应式原理
- computed 和 watch 区别
- 公共组件开发过吗？抽取过哪些 vue 组件？封装一个组件？
- v-model 的原理？自定义组件支持 v-model？
- vue 2 如何检测数组变化? 哪些？
- vue 为何是异步渲染
- \$nextTick 用过吗？原理是什么？
- keep-alive？什么时候使⽤，作⽤
- vue 中的模板编译原理
- VueRouter 用过吗？Hash 模式和 History 模式的区别？
- Vuex 使用过吗？数据持久化？
- 项目中怎么用 webpack/vue-cli? 怎么优化？
- Vue SSR 有了解吗？原理是什么？
- 虚拟 Dom （What、Why）
- Vue 相关编码优化

**vue3**

- Vue 3 对比 Vue 2 做了哪些改动？
- Vue 3 为什么使用 Composition API？

### 代码托管

- Git 分支模型、工作流？
- commit 规范，code review，reset？
- rebase、stash 了解吗？
- submodule vs multirepos vs monorepos？

### 前端工程化

- 谈谈对前端工程化的理解？（模块化、组件化、规范化、自动化）
- 构建工具的了解，webpack 或类似⼯具(gulp、rollUp、vite)?
- eslint && commitlint
- webpack 打包优化
- 项目脚手架搭建
- 公共方法和公共组件如何复用的？
- 可视化、低代码

### 项目

- 单页应用 vs 服务端渲染
- 打包性能优化落地？移动端首屏优化方案
- 微信授权流程？
- 需求场景
  - 多个请求下 loading 的展示与关闭？
  - 监控
  - 埋点
  - 数据加密？
- 小程序
  - ⼩程序授权流程?
  - 原生 or 框架？遇到的坑？
  - 性能优化

### 开放性问题

- 技术博客有吗？平时如何学习前端？
- 源码学习有吗？vue2
- 线上 bug 如何定位问题？
- 你在项目中扮演的角色和项目开发流程？
- 在开发中遇到过哪些难点？

### 前端常见需求

#### input 搜索如何防抖，如何处理中文输入

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/129

参考 vue 源码对 v-model 的实现中，对输入中文的处理

```html
<input id="myinput" />
```

```js
function jeiliu(timeout) {
  var timer
  function input(e) {
    if (e.target.composing) {
      return
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log(e.target.value)
      timer = null
    }, timeout)
  }
  return input
}

function onCompositionStart(e) {
  e.target.composing = true
}
function onCompositionEnd(e) {
  //console.log(e.target)
  e.target.composing = false
  var event = document.createEvent('HTMLEvents')
  event.initEvent('input')
  e.target.dispatchEvent(event)
}
var input_dom = document.getElementById('myinput')
input_dom.addEventListener('input', jeiliu(1000))
input_dom.addEventListener('compositionstart', onCompositionStart)
input_dom.addEventListener('compositionend', onCompositionEnd)
```

1.  防抖

```js
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    const ctx = this
    if (timer) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        fn.bind(ctx, ...args)
      }, delay)
    }
  }
}

const handlerChange = ev => {
  console.log(ev.target.value)
}
const handlerDebChange = debounce(handlerChange, 1e3)
```

`<input onChange={handlerDebChange} />`

2.  通过 合成事件 来判断区分 非英文 输入法\
    可以通过一个 flag isInCompos 来判断 字符真正输入到 input 或 textarea 中的时机\
    compositionstart isInCompos=true\
    compositionupdate isInCompos=true\
    compositionend isInCompos=false

#### 如何设计实现无缝轮播

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/108

#### 实现模糊搜索结果的关键词高亮显示

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/141

## 参考

- [【1 月最新】前端 100 问：能搞懂 80% 的请把简历给我](https://juejin.cn/post/6844903885488783374)
- https://muyiy.cn/question/
