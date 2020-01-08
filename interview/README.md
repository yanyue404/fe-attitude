## Inteview

## my blog

- [前端基本功 —— 扎马步 ](https://github.com/yanyue404/blog/issues/4)
- [前端基本功 —— 笔试 ](https://github.com/yanyue404/blog/issues/75)

## CSS

- [50 道 CSS 基础面试题（附答案）](https://segmentfault.com/a/1190000013325778)
- [《50 道 CSS 基础面试题（附答案）》中的答案真的就只是答案吗？](https://segmentfault.com/a/1190000013860482)
- [CSS 面试题总结](https://segmentfault.com/a/1190000014459893)

## Reps

- [front-end-interview-handbook](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/README.md) 几乎完整的答案可以用来面试潜在的候选人，测试自己或完全忽略“前端工作面试问题”
- [interview](https://github.com/andreis/interview) - Everything you need to prepare for your technical interview
- [Interview-Notebook](https://github.com/CyC2018/Interview-Notebook) - 技术面试必备基础知识、Leetcode 题解、Java、C++、Python、后端面试、操作系统、计算机网络、系统设计 https://cyc2018.github.io/CS-Notes
- [node-interview](https://github.com/ElemeFE/node-interview) How to pass the Node.js interview of ElemeFE. https://elemefe.github.io/node-interview/
- [CS-Interview-Knowledge-Map](https://github.com/InterviewMap/CS-Interview-Knowledge-Map) - Build the best interview map. The current content includes JS, network, browser related, performance optimization, security, framework, Git, data structure, algorithm, etc. https://yuchengkai.cn/docs/frontend/
- [reactjs-interview-questions](https://github.com/sudheerj/reactjs-interview-questions)
- [react-interview](https://github.com/Pau1fitz/react-interview/blob/master/zh-cn.md)
- [ 以面试官的角度来看 React 工作面试](https://juejin.im/post/5bca74cfe51d450e9163351b)

## Articles

- [30 道 Vue 面试题，内含详细讲解（涵盖入门到精通，自测 Vue 掌握程度）](https://juejin.im/post/5d59f2a451882549be53b170)
- [蚂蚁金服面试经历-前期准备](https://juejin.im/post/5bbc90e5e51d450e9e445180?utm_source=gold_browser_extension)
- [阿里、网易、滴滴共十次前端面试碰到的问题](https://segmentfault.com/a/1190000009662029)

### 前端开发所需掌握知识点概要

```
HTML&CSS：
    对Web标准的理解（结构、表现、行为）、浏览器内核、渲染原理、依赖管理、兼容性、CSS语法、层次关系，常用属性、布局、选择器、权重、盒模型、
    Hack、CSS预处理器、CSS3、Flexbox、CSS Modules、Document flow、BFC、HTML5（离线 & 存储、Histoy,多媒体、WebGL\SVG\Canvas）；
JavaScript：
    数据类型、运算、对象、Function、继承、闭包、作用域、事件、Prototype、RegExp、JSON、Ajax、DOM、BOM、
    内存泄漏、跨域、异步请求、模板引擎、模块化、Flux、同构、算法、ECMAScript6、Nodejs、HTTP、

其他：
    主流MVVM框架(React\Vue\Angular)、Hybrid App\React Native\Weex、TypeScript、RESTFul、WEB安全、前端工程化、依赖管理、性能优化、
    重构、团队协作、可维护、易用性、SEO、UED、前端技术选型、快速学习能力等；
```

### 项目准备

到了面试阶段，【聊一聊的你们的项目】，【你在项目中做了哪些东西】，【你在项目中遇到的最难的问题是什么，你是怎么解决的】这三个问题一定是问的频率最多的，也是对于面试官考察一个人最重要的。想要比较好的回答这三个问题。需要平时工作的积累和面试前的准备。对于工作积累来说我在之后再讲，现在主要讲怎样准备。因为每个人做的项目都不一样。所以这三个问题都没有标准答案。首先，我觉得自己可以想一下这 3 个问题的答案，语言尽量简练，然后和自己的朋友讲，看看他是否可以听的懂。相同的问题你可以问一下和自己承担相同工作的同事，看看他是怎样回答的。其实大部分人在项目中都是写的业务代码，所以在准备的时候要有侧重点。什么都说，但又说不到面试官想听的，就会让这个环节效果很差，有些人聊完项目面试官就感觉没什么兴趣了，就是这个原因，那么我来谈谈每个问题的侧重点：

- 【聊一聊的你们的项目】：侧重业务流程，用简练清楚的语言描述项目做了一个什么事情。然后可以简单介绍一下项目使用的架构和技术栈。这个其实整理一下，一定有东西可以说的，切记业务不要介绍的过于复杂，很多复杂的东西一概而过，面试官有兴趣的话他会自己问，每个系统都有很多细节，讲不完的，这里讲太多会显得很啰嗦。

- 【你在项目中做了哪些东西】：侧重你所做的东西在业务流程中承担的作用和重要程度。然后交代清楚这一块的复杂度，体现一定的技术难度。我知道大部分人都在写业务代码的。大部分时候项目需要大数据和大并发的场景比较少。这个时候你可以侧重从系统设计去聊，比如“面对复杂的业务逻辑如何解藕？”。

- 【你在项目中遇到的最难的问题是什么，你是怎么解决的】：侧重有难度的问题，对于后台，侧重于并发，大量数据，和分布式问题。尽量不要说业务流程，或者一些低级的问题。面试官肯定希望了解你解决了多难的技术问题。那么没有大数据，高并发方面的问题解决经历怎么办？我的经验可以侧重解决分布式问题。因为不管你的用户量有多少，只要项目是分布式系统，那一定会有分布式问题。比如“幂等如何做的？”。

> [来源](https://juejin.im/post/5bbc90e5e51d450e9e445180)

#### 参考

- [面试题整理归纳](https://mydearest.cn/interview.html)
- [总结了 17 年初到 18 年初百场前端面试的面试经验(含答案)](https://juejin.im/post/5b44a485e51d4519945fb6b7)
- [饥人谷 2019 前端押题（讲义）](https://juejin.im/post/5c91bbc96fb9a070c9759a64)
- https://github.com/koala-coding/goodBlog
- [看完跳槽少说涨 5 K，前端面试从准备到谈薪完全指南（近万字精华）](https://juejin.im/post/5dfef50751882512444027eb)
