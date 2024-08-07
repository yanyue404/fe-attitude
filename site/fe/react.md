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

## React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/151

## redux 为什么要把 reducer 设计成纯函数

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/107

## Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47

## React 的版本了解

- v16.0： 为了解决之前大型 React 应用一次更新遍历大量虚拟 DOM 带来个卡顿问题，React 重写了核心模块 Reconciler ，启用了 Fiber 架构；为了在让节点渲染到指定容器内，更好的实现弹窗功能，推出 createPortal API；为了捕获渲染中的异常，引入 componentDidCatch 钩子，划分了错误边界。

- v16.2：推出 Fragment ，解决数组元素问题。

- v16.3：增加 React.createRef() API，可以通过 React.createRef 取得 Ref 对象。增加 React.forwardRef() API，解决高阶组件 ref 传递问题；推出新版本 context api，迎接 Provider / Consumer 时代；增加 getDerivedStateFromProps 和 getSnapshotBeforeUpdate 生命周期 。

- v16.6：增加 React.memo() API，用于控制子组件渲染；增加 React.lazy() API 实现代码分割；增加 contextType 让类组件更便捷的使用 context；增加生命周期 getDerivedStateFromError 代替 componentDidCatch 。

- v16.8：全新 React-Hooks 支持，使函数组件也能做类组件的一切事情。

- v17： 事件绑定由 document 变成 container ，移除事件池等。

- v18：新的 root API [How to Upgrade to React 18](https://zh-hans.react.dev/blog/2022/03/08/react-18-upgrade-guide)

## 什么是 React Fiber?

Fiber 是 React v16 中新的协调引擎或核心算法的重新实现。 React Fiber 的目标是提高其对动画、布局、手势、暂停、中止或重用工作的能力以及为不同类型的更新分配优先级等领域的适用性；和新的并发原语。

**React Fiber 的主要目标**

React Fiber 的目标是提高其对动画、布局和手势等领域的适用性。它的主要功能是增量渲染：能够将渲染工作分割成块并将其分布在多个帧上。

其主要目标是：

- 能够将可中断的工作分成多个块。
- 能够对正在进行的工作进行优先级排序、调整基准和重用。
- 能够在父母和孩子之间来回屈服以支持 React 中的布局。
- 能够从 render() 返回多个元素。
- 更好地支持错误边界

## React 中为什么要引入 Hooks 呢？

> https://legacy.reactjs.org/docs/hooks-intro.html

Hooks 是 React 16.8 中新增的。它们允许你使用状态和其他 React 功能，而无需编写类。

```js
import React, { useState } from 'react'

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  )
}
```

- 没有计划从 React 中删除类。您可以在本页底部阅读有关 Hooks 逐步采用策略的更多信息。
- 钩子并不能取代你对 React 概念的了解。相反，Hooks 为你已经知道的 React 概念提供了一个更直接的 API：props、state、context、refs 和 lifecycle。正如我们稍后将展示的那样，Hooks 还提供了一种新的强大方式来组合它们。

**赋予动机**

1. 很难在组件之间重用有状态逻辑

React 没有提供一种将可重用行为“附加”到组件的方法（例如，将其连接到存储）。如果你已经使用 React 一段时间了，你可能熟悉渲染道具和试图解决这个问题的高阶组件等模式。但是，这些模式要求您在使用组件时重构组件，这可能很麻烦，并且使代码更难理解。如果你在 React DevTools 中查看一个典型的 React 应用程序，你可能会发现一个由提供者、消费者、高阶组件、渲染道具和其他抽象层包围的组件的“包装地狱”。虽然我们可以在 DevTools 中过滤掉它们，但这指向了一个更深层次的潜在问题：React 需要一个更好的原语来共享有状态逻辑。

使用 Hooks，您可以从组件中提取有状态逻辑，以便可以独立测试和重用。钩子允许您重用有状态逻辑，而无需更改组件层次结构。这使得在许多组件之间或与社区共享 Hooks 变得容易。

2. 复杂的组件变得难以理解

我们经常不得不维护一些组件，这些组件一开始很简单，但后来变成了一堆无法管理的有状态逻辑和副作用。每个生命周期方法通常都包含不相关的逻辑。例如，组件可能会执行一些数据提取 componentDidMount 和 componentDidUpdate 。但是，同一 componentDidMount 方法可能还包含一些不相关的逻辑，这些逻辑用于设置事件侦听器，并在 中 componentWillUnmount 执行清理。一起更改的相互关联的代码被拆分，但完全不相关的代码最终组合在一个方法中。这使得引入错误和不一致变得太容易了。

在许多情况下，不可能将这些组件分解成更小的组件，因为有状态逻辑无处不在。测试它们也很困难。这是许多人喜欢将 React 与单独的状态管理库相结合的原因之一。但是，这通常会引入太多的抽象，需要您在不同的文件之间跳转，并使重用组件更加困难。

为了解决这个问题，Hooks 允许您根据相关的部分（例如设置订阅或获取数据）将一个组件拆分为更小的函数，而不是根据生命周期方法强制拆分。您也可以选择使用缩减器管理组件的本地状态，以使其更具可预测性。

3. 类混淆了人和机器

除了使代码重用和代码组织更加困难之外，我们还发现类可能是学习 React 的一大障碍。你必须了解 JavaScript 的工作方式 this ，这与它在大多数语言中的工作方式有很大不同。您必须记住绑定事件处理程序。如果没有 ES2022 公共类字段，代码非常冗长。人们可以很好地理解道具、状态和自上而下的数据流，但仍然难以上课。React 中函数和类组件之间的区别以及何时使用它们会导致即使在有经验的 React 开发人员之间也存在分歧。

此外，React 已经推出大约五年了，我们希望确保它在未来五年内保持相关性。正如 Svelte、Angular、Glimmer 和其他人所展示的那样，提前编译组件具有很大的未来潜力。特别是如果它不限于模板。最近，我们一直在尝试使用 Prepack 进行组件折叠，我们已经看到了有希望的早期结果。但是，我们发现类组件可能会鼓励无意的模式，使这些优化回退到较慢的路径。类也为当今的工具带来了问题。例如，类不能很好地缩小，并且它们会使热重载变得不稳定且不可靠。我们希望提供一个 API，使代码更有可能保持在可优化的路径上。

为了解决这些问题，Hooks 允许你在没有类的情况下使用更多 React 的功能。从概念上讲，React 组件一直更接近函数。Hooks 包含功能，但又不牺牲 React 的实用精神。钩子提供对命令式逃生舱口的访问，不需要您学习复杂的函数式或反应式编程技术。

## 如何使用自定义 Hook 复用逻辑？

> https://zh-hans.react.dev/learn/reusing-logic-with-custom-hooks

- 自定义 Hook 让你可以在组件间共享逻辑。
- 自定义 Hook 命名必须以后跟一个大写字母的 use 开头。
- 自定义 Hook 共享的只是状态逻辑，不是状态本身。
- 你可以将响应值从一个 Hook 传到另一个，并且他们会保持最新。
- 每次组件重新渲染时，所有的 Hook 会重新运行。
- 自定义 Hook 的代码应该和组件代码一样保持纯粹。
- 把自定义 Hook 收到的事件处理函数包裹到 Effect Event。
- 不要创建像 useMount 这样的自定义 Hook。保持目标具体化。
- 如何以及在哪里选择代码边界取决于你。

```js
// App.js
import { useOnlineStatus } from './useOnlineStatus.js'

function StatusBar() {
  const isOnline = useOnlineStatus()
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>
}

function SaveButton() {
  const isOnline = useOnlineStatus()

  function handleSaveClick() {
    console.log('✅ Progress saved')
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  )
}

export default function App() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  )
}
```

```js
// useOnlineStatus.js
import { useState, useEffect } from 'react'

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true)
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true)
    }
    function handleOffline() {
      setIsOnline(false)
    }
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  return isOnline
}
```

## 组件和 Hook 必须是纯粹的

> [保持组件纯粹](https://zh-hans.react.dev/learn/keeping-components-pure)

纯函数仅仅执行计算，除此之外不做任何事情。这使得你的代码更易于理解和调试，并允许 React 能够正确地自动优化你的组件和 Hook。

为什么保持纯粹很重要？
React 中的一个核心概念是保持纯粹。一个纯组件或 Hook 应该是：

幂等的 ——每次使用相同的输入（组件输入的 props、state、context 以及 Hook 输入的参数）运行它，你 总是得到相同的结果。
在渲染中没有副作用 ——具有副作用的代码应该 与渲染过程分开执行。例如，可以作为 响应事件，在用户与用户界面交互并导致其更新时触发。或者作为一个 Effect，在渲染之后运行。
不要修改非局部作用域中的值：组件和 Hook 在渲染时中 绝不应该修改非局部创建的值。
当渲染保持纯粹时，React 能够理解哪些更新对用户来说最重要，应该优先显示。因为渲染的纯粹，即组件 在渲染过程中 不会产生副作用，React 可以暂停渲染那些不是那么重要的组件，等到真正需要时再继续渲染它们。

具体来说，这意味着渲染逻辑可以多次运行，这样 React 就能够为你的用户提供最佳的体验。然而，如果你的组件 在渲染过程中 有无追踪的副作用，比如修改全局变量的值，那么当 React 再次运行你的渲染代码时，这些副作用会以你不希望的方式被触发。这通常会导致意外的 bug，从而降低用户对你应用的体验感。你可以再 保持组件纯粹页面中 看到这样一个例子。

## React 18 生命周期如何使用？

![](https://skillgroup.cn/images/react/10.png)

![](https://skillgroup.cn/images/react/11.png)

https://skillgroup.cn/framework/react/life-cycle.html

https://zh-hans.react.dev/reference/react/Component

## 从类组件迁移至 Hook

https://zh-hans.react.dev/reference/react/Component#alternatives

将 React 的类组件迁移为函数组件（使用 Hooks）是一项常见的任务。下面是一个逐步的指南，帮助你完成这个过程。

### 步骤 1: 创建函数组件

首先，将类组件的 `class` 声明替换为一个函数声明：

```jsx
// 类组件
class MyComponent extends React.Component {
  render() {
    return <div>Hello, {this.props.name}!</div>
  }
}

// 函数组件
const MyComponent = props => {
  return <div>Hello, {props.name}!</div>
}
```

### 步骤 2: 处理状态

如果类组件使用了状态，使用 `useState` Hook 来替代 `this.state` 和 `this.setState`。例如：

```jsx
// 类组件
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  increment = () => {
    this.setState(prevState => ({ count: prevState.count + 1 }))
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    )
  }
}

// 函数组件
import React, { useState } from 'react'

const Counter = () => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
```

### 步骤 3: 处理生命周期方法

类组件中的生命周期方法可以通过 `useEffect` Hook 来处理。例如：

```jsx
// 类组件
class Timer extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      console.log('Tick')
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return <div>Timer!</div>
  }
}

// 函数组件
import React, { useEffect } from 'react'

const Timer = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Tick')
    }, 1000)

    return () => clearInterval(interval) // 清理函数
  }, []) // 空依赖数组，表示组件挂载和卸载时运行

  return <div>Timer!</div>
}
```

另外一个例子：

App.js

```jsx
import { useState } from 'react'
import ChatRoom from './ChatRoom.js'

export default function App() {
  const [roomId, setRoomId] = useState('general')
  const [show, setShow] = useState(false)
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select value={roomId} onChange={e => setRoomId(e.target.value)}>
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <button onClick={() => setShow(!show)}>{show ? 'Close chat' : 'Open chat'}</button>
      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  )
}
```

chat.js

```js
export function createConnection(serverUrl, roomId) {
  // 真正的实现将实际连接到服务器
  return {
    connect() {
      console.log('✅ 成功连接到 "' + roomId + '" 号聊天室，服务端 Url：' + serverUrl + '...')
    },
    disconnect() {
      console.log('❌ 无法连接到 "' + roomId + '" 号聊天室，服务端 Url：' + serverUrl)
    }
  }
}
```

假设你要将具有生命周期方法的 ChatRoom 类式组件转换为函数：

ChatRoom.js (类式组件)

```jsx
import { Component } from 'react'
import { createConnection } from './chat.js'

export default class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  }

  componentDidMount() {
    this.setupConnection()
  }

  // 2. 更新时重新连接
  componentDidUpdate(prevProps, prevState) {
    if (this.props.roomId !== prevProps.roomId || this.state.serverUrl !== prevState.serverUrl) {
      this.destroyConnection()
      this.setupConnection()
    }
  }

  componentWillUnmount() {
    this.destroyConnection()
  }

  // 1. 建立连接
  setupConnection() {
    this.connection = createConnection(this.state.serverUrl, this.props.roomId)
    this.connection.connect()
  }

  // 3. 卸载时断开连接
  destroyConnection() {
    this.connection.disconnect()
    this.connection = null
  }

  render() {
    return (
      <>
        <label>
          Server URL:{' '}
          <input
            value={this.state.serverUrl}
            onChange={e => {
              this.setState({
                serverUrl: e.target.value
              })
            }}
          />
        </label>
        <h1>欢迎俩到 {this.props.roomId} 聊天室！</h1>
      </>
    )
  }
}
```

ChatRoom.js (hooks 版本)

```jsx
import { useState, useEffect } from 'react'
import { createConnection } from './chat.js'

export default function ChatRoom({ roomId }) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234')

  useEffect(() => {
    const connection = createConnection(serverUrl, roomId)
    connection.connect()
    return () => {
      connection.disconnect()
    }
  }, [roomId, serverUrl])

  return (
    <>
      <label>
        Server URL: <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  )
}
```

### 步骤 4: 处理上下文和 refs

如果类组件使用 `context` 或 `refs`，那么可以使用 `useContext` 和 `useRef` Hooks。

App.js (类组件)

```jsx
import { createContext, Component } from 'react'

const ThemeContext = createContext(null)

class Panel extends Component {
  static contextType = ThemeContext

  render() {
    const theme = this.context
    const className = 'panel-' + theme
    return (
      <section className={className}>
        <h1>{this.props.title}</h1>
        {this.props.children}
      </section>
    )
  }
}

class Button extends Component {
  static contextType = ThemeContext

  render() {
    const theme = this.context
    const className = 'button-' + theme
    return <button className={className}>{this.props.children}</button>
  }
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>注册</Button>
      <Button>登录</Button>
    </Panel>
  )
}

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}
```

当你将它们转换为函数式组件时，将 this.context 用调用 useContext 来替换：

```js
import { createContext, useContext } from 'react'

const ThemeContext = createContext(null)

function Panel({ title, children }) {
  const theme = useContext(ThemeContext)
  const className = 'panel-' + theme
  return (
    <section className={className}>
      <h1>{title}</h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext)
  const className = 'button-' + theme
  return <button className={className}>{children}</button>
}

function Form() {
  return (
    <Panel title="Welcome">
      <Button>注册</Button>
      <Button>登录</Button>
    </Panel>
  )
}

export default function MyApp() {
  return (
    <ThemeContext.Provider value="dark">
      <Form />
    </ThemeContext.Provider>
  )
}
```

### 总结

迁移类组件到函数组件的基本步骤如下：

1. 创建函数组件。
2. 使用 `useState` 管理状态。
3. 使用 `useEffect` 处理副作用（如生命周期方法）。
4. 使用 `useContext` 和 `useRef` 来处理上下文和引用。

通过这些步骤，你可以将类组件转换为函数组件，充分利用 Hooks 的优点。

## 参考

- [ React 进阶实践指南](https://juejin.cn/book/6945998773818490884)
