# README

## 什么是 React

- Pwa: 单页面应用
- Base：jsx+webpack+babel+es6
- 专注 UI：用于构建用户界面的 JavaScript 库，声明式编写
- 组件化, state 与 props 构成的单向数据流
- 虚拟 DOM，是轻量的 js 对象，只保留了原生 dom 的一些常用的属性和方法

## 父子组件更新

### 1. 加载渲染过程

- father componentWillMount
- father render
- son componentWillMount
- son render
- son componentDidMount
- ... other sons
- father componentDidMount

### 2.子组件更新过程

- father componentWillUpdate
- father render
- son componentWillUpdate
- son render
- son componentDidUpdate
- father componentDidUpdate

### 3.销毁过程

## 编码规范

```bash
  # 个人代码规范
  + constructor
  + static propTypes
  + 组件生命周期方法
  + `_`开头设为单个class内私有方法
  + `onPub`来自子组件的发布 / `onSub`来自父组件的订阅
  + `handle*`事件监听方法
  + `render*`渲染逻辑修改
  + render() 方法
```

- [英文原版](https://github.com/airbnb/javascript/tree/master/react) / [中文版](https://github.com/JasonBoy/javascript/tree/master/react)
- [react-cookbook](https://github.com/shimohq/react-cookbook) - 编写简洁漂亮，可维护的 React 应用
- [分享关于 React 组件规范化的一些建议](https://github.com/minooo/React-Study/issues/6) by [minooo](https://github.com/minooo)

## 生命周期

这么多生命周期钩子，实际上总结起来只有三个过程：

- 挂载
- 更新
- 卸载

挂载和卸载只会执行一次，更新会执行多次。

一个完整的 React 组件生命周期会依次调用如下钩子：

#### old lifecycle

- 挂载
  - constructor
  - componentWillMount
  - render
  - componentDidMount
- 更新

  - componentWillReceiveProps
  - shouldComponentUpdate
  - componentWillUpdate
  - render
  - componentDidUpdate

- 卸载
  - componentWillUnmount

#### new lifecycle

- 挂载

  - constructor
  - getDerivedStateFromProps
  - render
  - componentDidMount

- 更新

  - getDerivedStateFromProps
  - shouldComponentUpdate
  - render
  - getSnapshotBeforeUpdate
  - componentDidUpdate

- 卸载
  - componentWillUnmount

### 光速教程

- [React 技术栈系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html) , by [ruanyifeng](https://github.com/ruanyf)
- [react-bits-CN-中文版](https://github.com/hateonion/react-bits-CN) / [react-bits-英文原版](https://github.com/vasanthk/react-bits)
- [React.js 小书](http://huziketang.mangojuice.top/books/react/)
- [react-demos](https://github.com/ruanyf/react-demos) , by ruanyifeng
- [react 基础教程](https://github.com/dk-lan/react)
- [React-Study](https://github.com/minooo/React-Study) - 渐进式学习 React 生态圈
- [12 步 30 分钟，完成用户管理的 CURD 应用 (react+dva+antd)](https://github.com/sorrycc/blog/issues/18)

### 深入

- [如何使用 React Hooks 获取数据？](https://www.robinwieruch.de/react-hooks-fetch-data/)
- [马蹄疾 React 专题](https://github.com/veedrin/horseshoe/tree/master/react)

## Useful links

- [官方文档(中文)](https://doc.react-china.org/)
  - [新的生命周期](https://react.docschina.org/docs/react-component.html)
- [BaBel 编译 React](https://url.cn/5q6x24D)
- [从零搭建 React 全家桶框架教程](https://github.com/brickspert/blog/issues/1)
- [给 2019 前端的 5 个建议](https://github.com/camsong/blog/issues/11)
- https://immutable-js.github.io/immutable-js
