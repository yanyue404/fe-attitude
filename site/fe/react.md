## React setState 笔试题，下面的代码输出什么？

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/18

```js
class Example extends React.Component {
  constructor() {
    super()
    this.state = {
      val: 0
    }
  }

  componentDidMount() {
    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 1 次 log

    this.setState({ val: this.state.val + 1 })
    console.log(this.state.val) // 第 2 次 log

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 3 次 log

      this.setState({ val: this.state.val + 1 })
      console.log(this.state.val) // 第 4 次 log
    }, 0)
  }

  render() {
    return null
  }
}
```

## React 中 setState 什么时候是同步的，什么时候是异步的？

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17

### React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/151

### redux 为什么要把 reducer 设计成纯函数

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/107

### Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47
