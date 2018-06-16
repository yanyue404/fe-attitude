# smart

> 日常代码库+笔记

## showTime

- https://www.netlify.com 部署静态站点演示
- http://jsbin.com/
- https://codesandbox.io/u/xiaoyueyue165 

## mock

- [mockapi](https://www.mockapi.io/projects)
- [json-server](https://github.com/typicode/json-server)
- [yapi](https://github.com/YMFE/yapi)
- [easyapi](https://www.easyapi.com/info/doc)

### 公共API

````js
// github
$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars',function(data){})
// cnode
$.getJSON('https://cnodejs.org/api/v1/topics',function(data){console.log( data )})
// 豆瓣电影
$.get('https://api.douban.com/v2/movie/in_theaters',function(data){console.log( data )},'jsonp')
````
## Git commit
````
* Head
  * type: feat, fix, docs, style, refactor, test, chore
  * scope:影响范围，可省略
  * subject

* Body
  * what
  * why
  * how
* Footer
相关链接
````
名称 | 说明
---|---
type | commit 的类型
feat | 新特性
fix |修改问题
refactor| 代码重构
docs| 文档修改
style| 代码格式修改, 注意不是 css 修改
test|测试用例修改
chore| 其他修改, 比如构建流程, 依赖管理.
scope| commit 影响的范围, 比如: route, component, utils, build...
subject| commit 的概述, 建议符合 50/72 formatting
body|commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
footer| 一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.

## 工具库

* [oui-dom-utils](https://github.com/oneuijs/oui-dom-utils) / [oui-dom-events](https://github.com/oneuijs/oui-dom-events)
* [lodash](https://github.com/lodash/lodash) - 现代 JavaScript 实用程序库提供模块化，性能，https://lodash.com/
* [Modernizr](https://github.com/Modernizr/Modernizr) - 检测用户浏览器中的 HTML5 和 CSS3 功能 https://modernizr.com

## HTML5

* [html5-boilerplate](https://github.com/h5bp/html5-boilerplate) - 一个专业的前端模板，用于构建快速，可靠的 Web 应用程序或网站。
## CDN
```js
// bootstrap
<link href="https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css" rel="stylesheet">
// jquery
<script src="https://cdn.bootcss.com/jquery/1.11.1/jquery.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```

## 前端进阶系列-目录

<details>
<summary>View contents</summary>
  
#### HTML/CSS篇

SEO和语义化

常见布局及居中

HTML5新特性

CSS3新特性

flex布局

盒模型

#### JS篇

执行上下文（this和闭包）

事件模型

任务队列

原形，面向对象

promise

#### es6

常见函数

设计模式

类型检测

垃圾回收，引用计数和标记清除

#### 算法篇

各种排序，重点是快排

动态规划，参见背包问题

二叉树

#### nodejs篇

nodejs特性

事件循环

多进程，cluster及child process，pm2的原理

koa的特性及中间件的原理

express与koa的区别

#### 网络篇

https

http2

http状态码

网络安全，xss和csrf

session，cookie和token

OSI七层协议

缓存

跨域

模块化，commonJS，es6，cmd，amd

cdn及dns

#### 框架篇

vue解决了什么问题

vue和react的区别

虚拟dom的原理

双向绑定的原理

如何实现component

组件间通讯

vuex

vue-router

#### 项目篇

性能优化

webpack的打包原理,如何抽取css的

提升wabpack的编译速度

错误收集，错误排查

项目监控

项目部署

#### 移动篇

自适应

兼容性

PWA

小程序

移动端手势

#### 补充篇

无限滚动方案

重绘重排重合成

浏览器访问全过程

如何处理兼容性问题

经常去什么技术网站？读过什么书？

未来规划

</details>

## 技术人员需要不断学习，如何兼顾广度与深度？

这个问题藏着一个陷阱，其实深度和广度都很重要，不能因为注重深度而不去兼顾广度，同样反过来也不行。我的方法论是把基础的内容掌握好，每天学习增量其实并不痛苦，看看新闻，写写demo，就很容易可以兼顾广度和深度了。

但如果底层不好，把全部的经历去投入到某一个细节上去，比如你如果花很多时间研究了angular1，那么angular2出来的时候那些就没有意义了。

所以，学好算法，语言都没有关系，学好了语言，框架都没有关系了。我认为，在自己能力范围内，把更本质更深入的东西学好，才是最关键的。

**[⬆ 回到顶部](#smart)**
