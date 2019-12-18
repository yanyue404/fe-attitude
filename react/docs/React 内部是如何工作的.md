# React 内部是如何工作的 ?

## Virtual DOM

## 渲染

### 1. jsx 生成 tree

中间过程经过 babel 编译, createElement 的参数有三个，其一： type -> 标签类型，其二 ：attributes -> 标签属性，没有的话，可以为 null，其三： children -> 标签的子节点

```js
return React.createElement(
  'div',
  { className: 'cn' },
  React.createElement(Header, null, 'Hello, This is React'),
  React.createElement('div', null, 'Start to learn right now!'),
  'Right Reserve'
);
```

对比 render 函数被调用的时候，会返回的 tree 对象，复杂结构会在 children 中递归生成

```js
{
  type: 'div',
    props: {
      className: 'cn',
        children: [
          {
            type: function Header,
            props: {
                children: 'Hello, This is React'
            }
          },
          {
            type: 'div',
            props: {
                children: 'start to learn right now！'
            }
          },
          'Right Reserve'
      ]
  }
}
```

我们来观察一下这个对象的 children，现在有三种类型：

1. string
2. 原生 DOM 节点
3. React Component - 自定义组件

除了这三种，还有两种类型：

4. false ,null, undefined, number
5. 数组 使用 map 方法的时候

### 2. 加载渲染过程

由内到外递归渲染

- father componentWillMount
- father render
- son componentWillMount
- son render
- son componentDidMount
- ... other sons
- father componentDidMount

### 3.子组件更新过程

- father componentWillUpdate
- father render
- son componentWillUpdate
- son render
- son componentDidUpdate
- father componentDidUpdate

### 3.销毁过程

## diff 算法

React 的 render 方法，它能将虚拟 DOM 渲染成真正的 DOM。为了减少 DOM 更新数量，我们需要找渲染前后真正变化的部分，只更新这一部分 DOM。而对比变化，找出需要更新部分的算法我们称之为 diff 算法。React 框架选择直接对比虚拟 DOM 和真实 DOM，这样就不需要额外保存上一次渲染的虚拟 DOM，并且能够一边对比一边更新。

不管是 DOM 还是虚拟 DOM，它们的结构都是一棵树，完全对比两棵树变化的算法时间复杂度是 O(n^3)，但是考虑到我们很少会跨层级移动 DOM，所以我们只需要对比同一层级的变化。

### 传统 diff 算法

### React Diff

综上所述， diff 算法有两个原则：

- 对比当前真实的 DOM 和虚拟 DOM，在对比过程中直接更新真实 DOM
- 只对比同一层级的变化

**实现**

diff 方法，它的作用是对比真实 DOM 和虚拟 DOM，最后返回更新后的 DOM

- tree diff
- component diff
- element diff

#### 1. tree diff

tree 是由 众多 component 组件构成 ，React 对树的同一层级进行比较，当发现节点已经不存在，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。然后继续对树进行递归遍历，去比较 component。

当 React 节点同一层级根节点不一致（也就是发生跨层级的移动操作），React diff 会只有创建和删除操作，将创建新的节点变化的原节点销毁。

#### 2.component diff

有以下 3 个比较策略：

- 相同类的组件，则继续比较组件下的节点树，递归比较直至 element
- 不同类的组件，则将该组件定位 dirty component，从而将该组件删除，替换为新组件
- 相同类的组件，有可能其组件下的节点没有任何变化，如果能够知道这点就可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff

#### 3. element diff

当节点处于同一层级时，React diff 提供了三种节点操作，分别为：INSERT_MARKUP（插入）、MOVE_EXISTING（移动）和 REMOVE_NODE（删除）。

React 允许开发者对于这一层级的同组子节点，添加唯一 key 进行区分，提高 diff 性能，避免卸载后又再次创建的操作出现。

## fiber 架构

React 16 之前的 diff 阶段的比较是不可被打断，React16 由主线程不间断使用 Diff(同步比较 + 同步更新) 变为 自由释放主线程（可打断的比较 + 异步更新）可以被打断的新的 fiber 架构。

### 参考

- [Video - 从 React 渲染原理看性能优化@黄琼](https://node.fequan.com/playvideo/701606bc91d477799dbecd98cbae0ecf_7)
- Article：[首次渲染](https://zhuanlan.zhihu.com/p/43145754) | [ 更新渲染](https://zhuanlan.zhihu.com/p/43566956)
- [React 源码剖析系列 － 不可思议的 react diff - 知乎](https://zhuanlan.zhihu.com/p/20346379)
- [从零开始实现一个 React（三）：diff 算法](https://github.com/hujiulong/blog/issues/6)
- [16 之前的 Diff 算法](https://www.yuque.com/whitefon/kd5gnm/unch0h)
- [React 官方 - 协调](https://zh-hans.reactjs.org/docs/reconciliation.html)
