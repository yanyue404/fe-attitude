## 自检（面试手册）

**简历**

1. 大厂简历筛选有一套机制，有大厂经历或学历好或经验匹配的会比较容易通过筛选，缺少光环的需要有其他东西来证明，比如优秀的项目经历，参与过好的开源项目等

2. 简历上描述的技术/内容/项目确保自己是真的熟悉/掌握，看看每个技能是不是自己真的掌握了，能说出个 1.2.3；每个项目是否自己能说清楚，一些细节是否了解，有哪些复盘点，是否有改进空间

3. 简历上描述的应该是与目标岗位直接/间接相关的，其他的比较优秀的点可以一笔带过，不需要花大篇幅介绍这些与目标岗位不符的能力

4. 面试官简历评估时也会看跳槽频率，像 1 年 1 跳这种会被评为不稳定，这时除非学历/经历特别出色的，其他基本就不通过了

**面试**

1. 面试除了技能/项目知识外，状态也很重要；接到面试电话说明简历评估通过了，时间可以你自己定，如果没准备好，可以把时间拉长些，给自己一些准备时间；要求当场面试的可以礼貌拒绝然后定一个合适的时间

2. 对不同工作年限的同学会有不同的要求，校招主要看潜力，所以基础（计算机、网络）和算法会考得比较多；1~3 年除了潜力外还看经验是否与业务匹配，项目经验；3~5 年看是否有独挡一面的能力，需要在技术上有较好的深度，在做事情方面有自己的一套；大于 5 年的除了深度外对广度也有要求，且需要有跨端和架构设计的能力，对于管理岗位也会看带团队的能力

3. 面试时遇到不会的不用慌，每个人的知识面不一样，碰到不会的很正常，但可以积极思考，首先坦诚表示没有了解过相关知识，然后以现有的知识体系思考下这个问题，说明思路，合理猜测结果

4. 有时会有面试官会刻意施加压力，这时不在于问题回答的是否正确，而在于是否能在这些压力下仍然能够理性思考，面对面试官的每个问题，可以尝试想下面试官问这个问题的背后目的是什么

## 面试要点解析

### 前端基础

**javascript**

- 原型链
- 继承
- 作用域
- 闭包
- 变量提升
- this 的指向
- 立即执行函数
- instanceof 原理
- bind 的实现
- apply 和 call
- 柯里化
- v8 垃圾回收机制
- 浮点数精度
- new 操作符
- 事件循环机制
- promise 原理
- generator 原理

**css**

- 盒子模型
- CSS 选择器
- BFC
- position
- flex 布局
- css 优先级
- 双飞冀/圣杯布局
- CSS3 新特性
- CSS 样式隔离
- CSS 性能优化
- 层叠上下文
- div 居中
- 浮动

**html&浏览器**

- 行内元素、块级元素
- 跨标签页通信
- history 和 hash 两种路由
- DOM 树
- 事件模型
- 缓存策略
- 浏览器架构
- 浏览器工作原理
- 内存泄露

**性能**

- 前端性能优化指标 RAIL
- 前端性能优化手段
- 重排和重绘
- 白屏
- 大量图片加载优化
- 描述下浏览器从输入网址到页面展现的整个过程
- 动画性能
- 渲染合成层

**工程化**

- 模块化机制
- tree shaking
- uglify 原理
- babel 原理
- webpack 工作流程
- webpack 插件机制
- webpack loader 机制
- 前端微服务

### 框架

**React**

- 合成事件
- virtual dom
- setState 过程
- fiber
- 高阶组件
- 错误处理
- 性能优化

**Redux**

- redux 核心原则
- redux 核心逻辑

**Vue**

- 数据绑定原理
- computed 和 watch
- slot
- next tick 原理
- keep alive

### 算法

**算法**

- 动态规划：斐波那契数列 ok
- 数组：合并二维有序数组成一维有序数组 ok
- 链表：反转链表
- 链表：链表有环
- 堆栈队列：判断括号字符串是否有效 ok
- 返回数组中第 k 个最大元素 ing
- 找出数组中和为 sum 的 n 个数 ing
- 贪心：具有给定数值的最小字符串 ok
- 二叉树：最大深度
- 二叉树：层次遍历
- 剪枝：判断数独是否有效
- 二分查找：求解平方根
- 字典树：实现一个字典树
- 动态规划：爬楼梯问题 ok
- 动态规划：最短距离
- 数据结构：LRU 缓存
- 翻转二叉树

**编程题**

- 实现一个 trim 方法
- 实现一个 deepClone 方法
- 实现 add(1)(2)(3)
- 大数相加
- 拍平数组
- 实现防抖函数
- 实现节流函数
- 实现字符串翻转
- 数组去重
- 实现千位分隔符
- 判断是否是回文数
- 实现一个模板引擎
- 判断一个数是否是素数
- 获取 n 以内所有的素数

### 基础

**操作系统**

- 进程和线程
- 进程通信
- 进程调度策略
- 死锁
- IO 多路复用

**网络**

- 七层网络模型
- http
- https
- http2.0
- http3.0
- websocket
- tcp
- udp

### 大前端

**Node**

- 模块机制
- require 原理
- 事件循环
- cluster 原理
- 流机制
- pipe 原理
- 守护进程
- 进程通信
- 异常处理

### 其他

**设计架构**

- 常用设计模式
- 重构
- MVVM
- MVC
- MVP

**开放问题**

- 最近看的书
- 平常的学习途径
- 你比较擅长哪一块，不足的地方在哪里

## 模拟题

**（一）**

- react setState 是同步还是异步
- 什么是高阶组件，请举例说明
- 解释一下原型链
- instanceof 原理
- apply 和 call 的作用及区别
- position 有哪些值，作用分别是什么
- 说下你对 DOM 树的理解
- 重排和重绘是什么，有什么区别
- https 加密过程是怎样的
- 实现 add(1)(2)(3)

**（二）**

- react 为什么需要合成事件
- 为什么有时 react 两次 setState，只执行一次
- redux 有哪些原则
- es5 实现继承
- 实现一个 promise
- CSS 选择器有哪些
- 说下事件模型
- 如何减少白屏的时间
- 3 次握手过程
- 判断链表是否有环

**（三）**

- react 合成事件是什么，和原生事件的区别
- react 如何处理异常
- 闭包的作用和原理
- 0.1+0.2 为什么不等于 0.3
- 什么是 BFC，BFC 有什么作用，如何形成 BFC
- 浏览器缓存策略是怎样的
- 你知道的前端性能优化手段有哪些
- 前端模块化机制有哪些
- http2.0 做了哪些改进
- 求解平方根

**（四）**

- react 为什么需要 fiber
- redux 中间件机制
- bind 的实现
- 说下 generator 原理
- flex 布局有什么好处
- 如何定位内存泄露
- 渲染合成层是什么
- babel 是什么，怎么做到的
- http2.0 有哪些不足，http3.0 是什么
- 实现一个发布订阅模式

**（五）**

- vue 的数据绑定机制是如何实现的
- vue next tick 实现原理
- 谈谈变量提升
- new 操作符具体做了什么
- 介绍下盒子模型
- 有哪些方式可以使 div 居中
- 有听过前端性能优化指标 RAIL 吗
- 进程和线程的区别
- tcp 滑动窗口是什么
- 实现一个斐波那契数列

**（六）**

- vue 的 computed 和 watch 的区别
- 说下 vue 的 keep alive
- 什么是立即执行函数
- 谈下事件循环机制
- css 优先级是怎么计算的
- CSS 相关的性能优化
- 谈下 webpack loader 机制
- 进程通信方式有哪些
- 爬楼梯问题
- 实现一个 trim 方法

**（七）**

- react fiber 有哪些优点，怎样做到的
- 谈谈你对作用域的理解
- 双飞冀/圣杯布局
- 浮动元素会造成什么影响，如何清除浮动
- 网站首页有大量的图片，加载很慢，如何去优化呢？
- 描述下浏览器从输入网址到页面展现的整个过程
- uglify 原理的是什么
- tcp 重试机制
- 层次遍历二叉树
- 实现节流函数

**（八）**

- react 有哪些性能优化的点
- v8 垃圾回收机制
- CSS 样式隔离手段
- 行内元素、块级元素有哪些，区别是什么
- 聊下你知道的浏览器架构
- 是否有写过 webpack 插件
- websocket 建立过程
- 合并二维有序数组成一维有序数组
- 实现防抖函数
- 最近看了什么书，有什么心得

**（九）**

- CSS3 有哪些新特性
- 层叠上下文是什么
- history 和 hash 两种路由方式的最大区别是什么？
- 动画性能如何优化
- tree shaking 是什么，有什么作用，原理是什么
- webpack 工作流程是怎样的
- 什么场景下会用策略模式
- 找出数组中和为 sum 的 n 个数
- 判断括号字符串是否有效
- 平常的学习途径

**（十）**

- node 模块机制是怎样的
- node require 具体实现是什么
- node 事件循环与浏览器的哪些不一样
- cluster 原理是怎样的
- pipe 原理是怎样的
- node 的异常处理方式
- 适配器和外观模式的区别
- 重构的手段有哪些
- 数组去重
- 你比较擅长哪一块，不足的地方在哪里

## 回答

### Node

#### **1. 模块机制**

**核心要点**：

- **CommonJS 规范**：每个文件是一个模块，通过 `require` 导入，`module.exports/exports` 导出
- **模块类型**：
  - 核心模块（内置模块，如 `fs`, `http`）
  - 文件模块（用户自定义模块）
  - 第三方模块（`node_modules`）
- **加载过程**：
  1. 路径解析（优先缓存 → 核心模块 → 路径查找）
  2. 文件定位（自动补全 `.js`, `.json`, `.node` 扩展名）
  3. 编译执行（不同扩展名使用不同编译器）
  4. 加入缓存（`require.cache`）

**示例**：

```javascript
// 查找顺序示例
require('http') → 核心模块
require('./mod') → 当前目录的 mod.js
require('lodash') → node_modules/lodash
```

---

#### **2. `require` 原理**

**执行流程**：

1. 解析路径为绝对路径
2. 检查 `require.cache` 是否存在缓存
3. 创建 `Module` 实例（包含 `exports`, `id`, `loaded` 等属性）
4. 根据文件类型加载：
   - `.js`：包裹成函数 `(function(exports, require, module, __filename, __dirname) { ... })`
   - `.json`：直接解析为 `JSON.parse`
5. 执行模块代码，填充 `exports` 对象
6. 返回 `module.exports`

**关键特性**：

- 同步加载
- 缓存机制（相同模块只加载一次）
- 循环依赖处理（未完成的 `exports` 会被提前暴露）

---

#### **3. 事件循环**

**六个阶段（libuv 实现）**：

1. **Timers**：执行 `setTimeout`/`setInterval` 回调
2. **Pending callbacks**：执行系统操作回调（如 TCP 错误）
3. **Idle/Prepare**：内部使用
4. **Poll**：
   - 检索新的 I/O 事件
   - 执行 I/O 相关回调
   - 阻塞在此阶段等待新事件（当没有 check 阶段的回调时）
5. **Check**：执行 `setImmediate` 回调
6. **Close callbacks**：执行关闭事件回调（如 `socket.on('close')`）

**关键要点**：

- `process.nextTick` 在阶段切换前执行（微任务）
- `setImmediate` 在 Check 阶段执行
- I/O 回调在 Poll 阶段执行

---

#### **4. Cluster 原理**

**核心机制**：

- Master 进程通过 `cluster.fork()` 创建 Worker 进程
- 共享服务器端口（底层使用 `round-robin` 负载均衡）
- IPC 通信通道（通过 `process.send` 和 `message` 事件）

**代码示例**：

```javascript
const cluster = require('cluster')
if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }
} else {
  // Worker 代码
  http.createServer().listen(3000)
}
```

**优化策略**：

- 心跳检测（防止 Worker 僵死）
- 优雅重启（`disconnect` + `exit` 事件配合）

---

#### **5. 流机制**

**四种流类型**：
| 类型 | 特性 | 示例 |
|------|------|------|
| Readable | 数据生产 | 文件读取流 |
| Writable | 数据消费 | HTTP 响应 |
| Duplex | 双向流 | TCP socket |
| Transform | 数据转换 | Gzip 压缩 |

**关键概念**：

- **背压（Backpressure）**：通过 `highWaterMark` 控制缓冲区大小
- **流动模式**：`data` 事件驱动
- **暂停模式**：`read()` 方法手动控制

---

#### **6. `pipe` 原理**

**核心实现**：

```javascript
readable.pipe(writable) = {
  readable.on('data', (chunk) => {
    if (!writable.write(chunk)) {
      readable.pause();
    }
  });
  writable.on('drain', () => {
    readable.resume();
  });
}
```

**特性**：

- 自动处理背压
- 错误传播（需手动处理）
- 可链式调用（`a.pipe(b).pipe(c)`）

---

#### **7. 守护进程**

**创建步骤**：

1. 创建子进程
2. 脱离控制终端（`setsid`）
3. 改变工作目录
4. 重定向标准 I/O
5. 错误处理与日志记录

**代码示例**：

```javascript
const spawn = require('child_process').spawn
const daemon = spawn(process.argv[0], ['app.js'], {
  detached: true,
  stdio: 'ignore'
})
daemon.unref()
```

---

#### **8. 进程通信**

**通信方式**：
| 方式 | 适用场景 |
|------|----------|
| 管道（pipe） | 父子进程间简单通信 |
| 消息队列 | 跨机器通信 |
| 共享内存 | 大数据量传输 |
| Socket | 网络通信 |
| Signal | 进程控制 |

**Node.js 实现**：

- `child_process` 使用 IPC 通道
- `worker.send()` 和 `process.on('message')`
- 底层基于 libuv 的跨平台实现（Unix domain socket / Windows named pipe）

---

#### **9. 异常处理**

**分层处理策略**：

1. **Try/Catch**：同步代码
2. **Promise.catch**：异步代码
3. **EventEmitter 错误事件**：
   ```javascript
   const stream = createReadStream('file')
   stream.on('error', err => {
     /* 处理错误 */
   })
   ```
4. **进程级捕获**：
   ```javascript
   process.on('uncaughtException', err => {
     logger.error(err)
     process.exit(1)
   })
   ```

**最佳实践**：

- 避免阻塞在 `uncaughtException`
- 使用 domain 模块（已废弃，仅旧项目使用）
- 结合 PM2 等进程管理器实现自动重启

---

### **总结回答示例**

"Node.js 的模块机制基于 CommonJS 规范，通过 `require` 实现依赖加载，其核心原理包括路径解析、缓存和函数包裹。事件循环分为六个阶段，理解 timers、poll 和 check 阶段的执行顺序至关重要。Cluster 模块通过主进程管理多个 Worker 实现了多核利用，底层使用 IPC 通信。流机制通过背压控制优化了大数据处理性能，`pipe` 方法则封装了流对接的细节。守护进程需要处理进程分离和日志管理，异常处理要分层级覆盖同步/异步场景。这些机制共同支撑了 Node.js 的高性能服务能力。"

### 参考

- [前端面试真题，会 80% 直接进大厂](https://m26bxrpatp.feishu.cn/base/appcn5mUun8tTLsaFG0jrTeUnBg?table=tbllAUETZhGVTWMA&view=vewJHSwJVd)
- [专科如何进入互联网大厂 ](https://github.com/xuya227939/blog/issues/134)
