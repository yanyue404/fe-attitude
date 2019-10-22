## setState API

在 React 组件内部的 state 是可读可写的，当 state 发生改变的时候（使用 setState）会触发执行 render 方法，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式

调用 setState 其实是异步的 —— 不要指望在调用 setState 之后，this.state 会立即映射为新的值。如果你需要基于当前的 state 来计算出新的值，那你应该传递一个函数，而不是一个对象（详情见下文）

## setState 接受对象参数

- 异步机制
- **有效合并更新**（一个生命周期内的所有 setState 方法会合并操作，原则为只取最后一个）
- 可添加第二个 `callback`参数获取更新后的 state

demo 展示：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 1 });
    console.log(this.state.count); // ?
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.count}</p>
      </div>
    );
  }
}
```

页面显示：

![Snipaste_2019-10-08_09-51-56.png](http://ww1.sinaimg.cn/large/df551ea5ly1g7qk0jr3gdj21h5042aa8.jpg)

执行分析：

- Start
  - 初始化 state && props
  - 初次 render
  - componentDidMount 异步，合并更新,只取最后一个有效更新条件 `{ count: this.state.count + 1 }`
  - render
- End

对象批处理是怎样的：

在 JavaScript 里面，合并对象可能会如同下面这种形式：

```js
const singleObject = Object.assign(
  {},
  objectFromSetState1,
  objectFromSetState2,
  objectFromSetState3
);
```

JavaScript 中，合并（merging）或组合（composing）对象是这样工作的：如果三个对象有相同的 key， 传给 Object.assign() 的最后一个包含此 key 的对象会覆盖掉前面的值。例如:

```js
const me = { name: 'Justice' },
  you = { name: 'Your name' },
  we = Object.assign({}, me, you);
we.name === 'Your name'; //true
console.log(we); // {name : "Your name"}
```

如上所示，在对象作为参数批量更新时，会因为参数对象 `key` 值相同的缘故只保留最后一个作为扩充更新的对象，我们上面称之为 `有效性合并`

demo 体现更充分的例子：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentWillMount() {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount() {
    this.setState({ count: this.state.count + 1 });
    this.setState({ count: this.state.count + 2 });
    this.setState({ count: this.state.count + 3 });
    console.log(this.state.count); // 1
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.count}</p>
      </div>
    );
  }
}
```

页面显示：异步**合并更新**

![Snipaste_2019-10-08_10-16-11.png](http://ww1.sinaimg.cn/large/df551ea5ly1g7qkpq9xyhj21hc03vjrk.jpg)

## setState 接受函数参数

既然在对象参数中批量更新只有最后一个扩充对象被保留，那么，怎样使得 `setState` 的批量更新全部有效呢？这就引入了第二个类型的参数 —— 使用函数作为参数进行传递。

- 异步机制
- **计算合并更新**（利用上一次 setState 结果进行运算）

demo 展示：

```js
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  componentDidMount() {
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
    this.setState((prevState, props) => {
      return { count: prevState.count + 1 };
    });
    console.log(this.state.count);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.count}</p>
      </div>
    );
  }
}
```

页面显示：

![Snipaste_2019-10-08_10-26-52.png](http://ww1.sinaimg.cn/large/df551ea5ly1g7ql0v5qfaj21hb0523yp.jpg)

执行分析：

- Start
  - 初始化 state && props
  - 初次 render
  - componentDidMount 异步，计算合并更新（将条件串起来批量更新） `3` \* `{ count: prevState.count + 1 }`
  - render
- End

实际内部的批量更新队列类似于：

```js
const updateQueue = [
  state => ({ count: state.count + 1 }),
  state => ({ count: state.count + 1 }),
  state => ({ count: state.count + 1 })
];
```

## 总结

不要忘记 `setState`函数是异步的

不要忘记 `setState` 函数参数可以传递`object`与`function`

不要忘记，当您的下一个状态取决于你之前的状态时，应该传递一个函数。

### 参考文章

- [How to become a pro with React setState() in 10 minutes](https://www.freecodecamp.org/news/get-pro-with-react-setstate-in-10-minutes-d38251d1c781/)
- [React.js 小书 —— 组件的 state 和 setState](http://huziketang.mangojuice.top/books/react/lesson10)
- [React Doc —— 组件状态](https://zh-hans.reactjs.org/docs/faq-state.html#when-is-setstate-asynchronous)
- [React 中的宝藏：setState 函数 ](https://www.oschina.net/translate/functional-setstate-is-the-future-of-react)
