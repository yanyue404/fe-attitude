# smart

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
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```

### 前端进阶系列-目录

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

## git commit
````
# head: <type>(<scope>): <subject>
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
# - subject: start with verb (such as 'change'), 50-character line
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer: 
# - Include a link to the ticket, if any.
# - BREAKING CHANGE
#
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

**[⬆ 回到顶部](#smart)**
