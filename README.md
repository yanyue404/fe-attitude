# smart

> 日常代码库+笔记

## Table of contents

- [Guide](#guide)
- [ShowTime](#showTime)
- [Code related](#code-related)
- [Mock](#mock)
- [Interview](#interview)
- [Norm](#norm)



## Navigation

### Guide

- https://www.w3.org/TR/
- https://eslint.org/docs/rules
- http://devdocs.io
- http://devhints.cn

### Code related

- https://leetcode-cn.com/
- https://freecodecamp.cn/

### ShowTime

- https://www.netlify.com 部署静态站点演示
- http://jsbin.com/
- https://codesandbox.io/u/xiaoyueyue165 

### Mock

- [mockapi](https://www.mockapi.io/projects)
- [json-server](https://github.com/typicode/json-server)
- [yapi](https://github.com/YMFE/yapi)
- [easyapi](https://www.easyapi.com/info/doc)

**公共API**
````js
// github
$.getJSON('https://api.github.com/search/repositories?q=javascript&sort=stars',function(data){})
// cnode
$.getJSON('https://cnodejs.org/api/v1/topics',function(data){console.log( data )})
// 豆瓣电影
$.get('https://api.douban.com/v2/movie/in_theaters',function(data){console.log( data )},'jsonp')
````

**CDN**

```js
// axios
<script src="https://cdn.bootcss.com/axios/0.18.0/axios.js"></script>
// bootstrap
<link href="https://cdn.bootcss.com/bootstrap/3.3.6/css/bootstrap.css" rel="stylesheet">
// jquery
<script src="https://cdn.bootcss.com/jquery/1.11.1/jquery.js"></script>
<script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
```

### Interview

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



### Norm

p5：平均工作两年内；基础扎实、高质完成；基础过硬；熟悉浏览器等前端运行容器的工作原理；熟悉前端常用的工程工具；熟悉前端常用的框架；高质量、可维护；熟练使用类库解决业务问题，项目代码具有可维护性；具备质量意识，掌握兼容性、性能等问题的解决方法；

p6：平均工作三年左右；独当一面、辅助团队；全面了解前端知识体系；掌握日常开发中所涉及的前端知识（开发语言、标准协议、工作原理、工程工具、前端框架、用户体验等）。能提效、可复用；能通过开发或引入效率工具提升团队效率；能提炼可复用组件，为组件库贡献高质量代码；

p7：平均工作五年左右：领域专家、影响团队；精通至少一个领域的前端知识体系；精通常用框架的设计原理，能合理运用；

p8：平均工作五年以上：领域突破、业务增值。

#### 参考
- https://zhuanlan.zhihu.com/p/37079448

**[⬆ 回到顶部](#smart)**
