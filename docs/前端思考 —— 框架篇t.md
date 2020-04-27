## 目录

- React 有哪些生命周期函数？分别有什么用？（Ajax 请求放在哪个阶段？）
- 受控组件 V.S. 非受控组件
- React 如何实现组件间通信？
- [setState](#stateState)
- 合成事件与原生事件

  1. 尽量不要将合成事件与原生事件混用，可统一使用原生事件
  2. 混用时候使用 e.target 过滤原生事件的冒泡

> 请尽量避免在 React 中混用合成事件和原生 DOM 事件。另外，用 react 事件中
> stopPropagation() 来阻止冒泡是不行的。阻止 React 事件冒泡的行为只能用于 React 合成事件系统
> 中，且没办法阻止原生事件的冒泡。反之，在原生事件中的阻止冒泡行为，却可以阻止 React 合成
> 事件的传播。

- 为何 React 事件要自己绑定 this？

## setState

- [React 组件更新 —— setState](https://github.com/yanyue404/blog/issues/82)

#### 参考链接

- [reactjs-interview-questions](https://github.com/sudheerj/reactjs-interview-questions)
- [react-interview](https://github.com/Pau1fitz/react-interview/blob/master/zh-cn.md)
- [ 以面试官的角度来看 React 工作面试](https://juejin.im/post/5bca74cfe51d450e9163351b)
- [](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484667&idx=1&sn=dcaea6836c604100f9811c8c7f98a147&chksm=ce6ec057f9194941a768258f83a58c160e18fc75681c814c4eb21229f23ee7795dbff73cb35d&scene=27#wechat_redirect)
