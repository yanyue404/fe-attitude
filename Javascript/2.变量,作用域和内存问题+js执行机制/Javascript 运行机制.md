## Event-loop

![image](./img/event-loop.png)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。

执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行

###### 参考
- [Philip Roberts: What the heck is the event loop anyway?](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)

##### 其他

- [Javascript的异步和回调](https://segmentfault.com/a/1190000002999668)
- [10分钟理解JS引擎的执行机制](https://segmentfault.com/a/1190000012806637?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly)
- [从浏览器多进程到JS单线程，JS运行机制最全面的一次梳理](https://segmentfault.com/a/1190000012925872?utm_source=weekly&utm_medium=email&utm_campaign=email_weekly)
