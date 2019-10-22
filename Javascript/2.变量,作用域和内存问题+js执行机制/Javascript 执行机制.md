## 开始

## 堆栈概念

## 单线程的Javascript

## Event Loop


## 宏任务与微任务

宏任务一般是：包括整体代码script，setTimeout，setInterval。

微任务：Promise，process.nextTick(callback)。

- 了解promise什么时候微任务什么时候宏任务

- 事件循环的顺序，决定js代码的执行顺序。
  + 进入整体代码(宏任务)后，开始第一次循环
  + 接着执行所有的微任务
  + 然后再次从宏任务开始，找到其中一个任务队列执行完毕
  + 再执行所有的微任务

##### 参考
- [Philip Roberts: What the heck is the event loop anyway?](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [10分钟了解JS堆、栈以及事件循环的概念](https://juejin.im/post/5b1deac06fb9a01e643e2a95#heading-17)
- [Javascript的异步和回调](https://segmentfault.com/a/1190000002999668)
- [10分钟理解JS引擎的执行机制](https://segmentfault.com/a/1190000012806637?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly)
- [微任务、宏任务与Event-Loop](https://segmentfault.com/a/1190000016022069)
- [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly)

