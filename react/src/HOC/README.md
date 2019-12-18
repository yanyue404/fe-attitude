# HOC

首先我们回忆一下，什么是高阶函数？

定义非常简单：一个函数，它的参数是函数，或者它的返回值是函数。

基本就是鸡吃鸡或者鸡生鸡的意思。

那么高阶组件就好理解了。它的定义是：一个函数，传入一个组件，并且返回一个组件。

区别就是，高阶函数只要满足一个条件，高阶组件要满足两个条件。

高阶组件既是函数，也是组件，因为在 React 中一个函数只要返回 JSX 元素就是组件。但这个组件有点特殊，因为它不是用来堆砌 UI 的，而是一个组件装饰工厂。

比如：connect 方法 `export default connect(mapState, mapDispatch)(App)`,它的主要目的是为目标组件传递 Props;

```js
import React, { Component } from 'react';

function connect(mapStateToProps, mapDispatchToProps) {
  return function wrapWithConnect(WrappedComponent) {
    return class Connect extends Component {
      render() {
        return (
          <WrappedComponent {...mapStateToProps} {...mapDispatchToProps} />
        );
      }
    };
  };
}

export default connect;
```
