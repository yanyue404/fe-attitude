# README

React 框架的问题是，它的关注重点不是让事情变得简单，而是扩张主义----征服新的知识前沿。

-- DHH，Ruby on Rails 框架的作者

## 什么是 React

- Pwa: 单页面应用
- Base：jsx+webpack+babel+es6
- 专注 UI：用于构建用户界面的 JavaScript 库，声明式编写
- 组件化, state 与 props 构成的单向数据流
- 虚拟 DOM，是轻量的 js 对象，只保留了原生 dom 的一些常用的属性和方法

## React Hooks

React Hooks 的意思是，组件尽量写成纯函数，如果需要外部功能和副作用，就用钩子把外部代码"钩"进来。 React Hooks 就是那些钩子。

你需要什么功能，就使用什么钩子。React 默认提供了一些常用钩子，你也可以封装自己的钩子。

所有的钩子都是为函数引入外部功能，所以 React 约定，钩子一律使用 use 前缀命名，便于识别。你要使用 xxx 功能，钩子就命名为 usexxx。

下面是 React 默认提供的四个最常用的钩子。

- useState() 状态钩子，为函数组件引入状态（state）。纯函数不能有状态，所以把状态放在钩子里面。
- useEffect() 副作用钩子，为函数组件引入副作用。最常见的就是向服务器请求数据。`useEffect(() => {// Async Action}, [dependencies])`
- useLayoutEffect：和 useEffect 差不多，但是 useEffect 的 effect 函数是异步执行的，所以可能中间有次渲染，会闪屏，而 useLayoutEffect 则是同步执行的，所以不会闪屏，但如果计算量大可能会导致掉帧。
- useReducer() action 钩子，`const [state, dispatch] = useReducer(reducer, initialState)`, dispatch 是用来触发 action 的函数。但是，它没法提供中间件（middleware）和时间旅行（time travel），如果你需要这两个功能，还是要用 Redux。
- useRef() 引用钩子，为函数组件引入引用。`const refContainer = useRef(initialValue)`, ref 的内容 refContainer.current 就指向这个对象。refContainer.current 会随着组件重新渲染而更新。
- forwardRef + useImperativeHandle：通过 forwardRef 可以从子组件转发 ref 到父组件，如果想自定义 ref 内容可以使用 useImperativeHandle
- useContext() 共享状态钩子，用于为子组件创建可以共享的状态（`React.createContext({});`）, 子组件可以通过该钩子取用。
- memo() 缓存组件钩子，为函数组件引入缓存组件。`const MemoizedComponent = memo(Component)`
  - memo 的作用是只有 props 变的时候，才会重新渲染被包裹的组件，防止 props 没变时的重新渲染
  - useMemo 和 useCallback 是防止 props 的不必要变化。
  - 如果子组件用了 memo，那给它传递的对象、函数类的 props 就需要用 useMemo、useCallback 包裹，否则，每次 props 都会变，memo 就没用了。
  - 反之，如果 props 使用 useMemo、useCallback，但是子组件没有被 memo 包裹，那也没意义，因为不管 props 变没变都会重新渲染，只是做了无用功。
  - memo + useCallback、useMemo 是搭配着来的，少了任何一方，都会使优化失效。
  - 但 useMemo 和 useCallback 也不只是配合 memo 用的。
- useMemo() 缓存钩子，为函数组件引入缓存。`const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])`
- useCallback 缓存函数钩子，为函数组件引入缓存函数。`const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b])`

### 光速教程

- [英文原版](https://github.com/airbnb/javascript/tree/master/react) / [中文版](https://github.com/JasonBoy/javascript/tree/master/react)
- [react-cookbook](https://github.com/shimohq/react-cookbook) - 编写简洁漂亮，可维护的 React 应用
- [分享关于 React 组件规范化的一些建议](https://github.com/minooo/React-Study/issues/6) by [minooo](https://github.com/minooo)
- [React 技术栈系列教程](http://www.ruanyifeng.com/blog/2016/09/react-technology-stack.html) , by [ruanyifeng](https://github.com/ruanyf)
- [react-bits-CN-中文版](https://github.com/hateonion/react-bits-CN) / [react-bits-英文原版](https://github.com/vasanthk/react-bits)
- [React.js 小书](http://huziketang.mangojuice.top/books/react/)
- [react-demos](https://github.com/ruanyf/react-demos) , by ruanyifeng
- [react 基础教程](https://github.com/dk-lan/react)
- [React-Study](https://github.com/minooo/React-Study) - 渐进式学习 React 生态圈
- [12 步 30 分钟，完成用户管理的 CURD 应用 (react+dva+antd)](https://github.com/sorrycc/blog/issues/18)

### 为什么？

- [为什么我们需要中间件来处理 redux 的异步流](http://www.xiaojichao.com/post/why-do-we-need-middleware-for-async-flow-in-redux.html)

### React 状态管理和数据获取

- [zustand](https://github.com/pmndrs/zustand/) 轻便、简洁、强大的 React 状态管理工具
- [immer](https://github.com/immerjs/immer) immutable 相关库,可以用其提供的 produce Api（`produce(obj, (obj) => {obj.a.c.e ++;})`） 来优化复杂的深层对象的修改。
- [swr](https://github.com/vercel/swr) - 用于数据获取的 React Hooks

## Useful links

- [awesome-react](https://github.com/enaqx/awesome-react) 与 React.js 有关的很棒的事物的清单
- [官方文档(中文)](https://zh-hans.react.dev/)
- [BaBel 编译 React](https://url.cn/5q6x24D)
- [从零搭建 React 全家桶框架教程](https://github.com/brickspert/blog/issues/1)
- [给 2019 前端的 5 个建议](https://github.com/camsong/blog/issues/11)
- https://immutable-js.github.io/immutable-js
- [如何使用 React Hooks 获取数据？](https://www.robinwieruch.de/react-hooks-fetch-data/)
- [马蹄疾 React 专题](https://github.com/veedrin/horseshoe/tree/master/react) 404
- https://zh-hans.reactjs.org/docs/handling-events.html / https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind
- [Personal blog by Dan Abramov](https://overreacted.io/zh-hans)
