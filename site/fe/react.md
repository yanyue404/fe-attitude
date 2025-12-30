# React

## React 的版本了解

- v16.0： 为了解决之前大型 React 应用一次更新遍历大量虚拟 DOM 带来的卡顿问题，React 重写了核心模块 Reconciler ，启用了 Fiber 架构；为了在让节点渲染到指定容器内，更好的实现弹窗功能，推出 createPortal API；为了捕获渲染中的异常，引入 componentDidCatch 钩子，划分了错误边界。

- v16.2：推出 Fragment ，解决数组元素问题。

- v16.3：增加 React.createRef() API，可以通过 React.createRef 取得 Ref 对象。增加 React.forwardRef() API，解决高阶组件 ref 传递问题；推出新版本 context api，迎接 Provider / Consumer 时代；增加 getDerivedStateFromProps 和 getSnapshotBeforeUpdate 生命周期 。

- v16.6：增加 React.memo() API，用于控制子组件渲染；增加 React.lazy() API 实现代码分割；增加 contextType 让类组件更便捷的使用 context；增加生命周期 getDerivedStateFromError 代替 componentDidCatch 。

- v16.8：全新 React-Hooks 支持，使函数组件也能做类组件的一切事情。

- v17： 事件绑定由 document 变成 container ，移除事件池等。

- v18：新的 root API [How to Upgrade to React 18](https://zh-hans.react.dev/blog/2022/03/08/react-18-upgrade-guide)

## 什么是 React Fiber?

React 的核心流程可以分为两个部分:

- reconciliation (**调度算法**，也可称为 render):
  - 更新 state 与 props；
  - 调用生命周期钩子；
  - 生成 virtual dom；
  - 通过新旧 vdom 进行 diff 算法，获取 vdom change；
  - 确定是否需要重新渲染
- commit:
  - 如需要，则操作 dom 节点更新；

要了解 Fiber，我们首先来看为什么需要它？

- **问题**: 随着应用变得越来越庞大，整个更新渲染的过程开始变得吃力，大量的组件渲染会导致主进程长时间被占用，导致一些动画或高频操作出现卡顿和掉帧的情况。而关键点，便是 **同步阻塞**。在之前的调度算法中，React 需要实例化每个类组件，生成一颗组件树，使用 **同步递归** 的方式进行遍历渲染，而这个过程最大的问题就是无法 **暂停和恢复**。

- **解决方案**: 解决同步阻塞的方法，通常有两种: **异步** 与 **任务分割**。而 React Fiber 便是为了实现任务分割而诞生的。

- **简述**:

  - 在 React V16 将调度算法进行了重构， 将之前的 stack reconciler 重构成新版的 fiber reconciler，变成了具有链表和指针的 **单链表树遍历算法**。通过指针映射，每个单元都记录着遍历当下的上一步与下一步，从而使遍历变得可以被暂停和重启。
  - 这里我理解为是一种 **任务分割调度算法**，主要是 将原先同步更新渲染的任务分割成一个个独立的 **小任务单位**，根据不同的优先级，将小任务分散到浏览器的空闲时间执行，充分利用主进程的事件循环机制。

- **核心**:

  - Fiber 这里可以具象为一个 **数据结构**:

  ```js
  class Fiber {
    constructor(instance) {
      this.instance = instance
      // 指向第一个 child 节点
      this.child = child
      // 指向父节点
      this.return = parent
      // 指向第一个兄弟节点
      this.sibling = previous
    }
  }
  ```

  - **链表树遍历算法**: 通过 **节点保存与映射**，便能够随时地进行 停止和重启，这样便能达到实现任务分割的基本前提；

    - 1、首先通过不断遍历子节点，到树末尾；
    - 2、开始通过 sibling 遍历兄弟节点；
    - 3、return 返回父节点，继续执行2；
    - 4、直到 root 节点后，跳出遍历；

  - **任务分割**，React 中的渲染更新可以分成两个阶段:

    - **reconciliation 阶段**: vdom 的数据对比，是个适合拆分的阶段，比如对比一部分树后，先暂停执行个动画调用，待完成后再回来继续比对。
    - **Commit 阶段**: 将 change list 更新到 dom 上，不适合拆分，因为使用 vdom 的意义就是为了节省传说中最耗时的 dom 操作，把所有操作一次性更新，如果在这里又拆分，那不是又懵了么。🙃

  - **分散执行**: 任务分割后，就可以把小任务单元分散到浏览器的空闲期间去排队执行，而实现的关键是两个新API: `requestIdleCallback` 与 `requestAnimationFrame`

    - 低优先级的任务交给`requestIdleCallback`处理，这是个浏览器提供的事件循环空闲期的回调函数，需要 pollyfill，而且拥有 deadline 参数，限制执行事件，以继续切分任务；
    - 高优先级的任务交给`requestAnimationFrame`处理；

  ```js
  // 类似于这样的方式
  requestIdleCallback((deadline) => {
    // 当有空闲时间时，我们执行一个组件渲染；
    // 把任务塞到一个个碎片时间中去；
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && nextComponent) {
      nextComponent = performWork(nextComponent)
    }
  })
  ```

  - **优先级策略**: 文本框输入 > 本次调度结束需完成的任务 > 动画过渡 > 交互反馈 > 数据更新 > 不会显示但以防将来会显示的任务

> Tips:
>
> Fiber 其实可以算是一种编程思想，在其它语言中也有许多应用(Ruby Fiber)。当遇到进程阻塞的问题时，**任务分割**、**异步调用** 和 **缓存策略** 是三个显著的解决思路。

**React Fiber 工作原理**

Fiber 通过增量渲染、可中断与恢复、链表结构和优先级调度等机制，使得 React 可以更灵活地处理大量更新和复杂组件树。

调度：Fiber 引入了新的调度机制，允许 React 根据任务的优先级来调度任务。React 会根据任务的紧急程度将任务放入不同的队列中，并按照队列的顺序执行任务。

渲染：在渲染阶段，React 会遍历组件树，并构建一个 Fiber 树。Fiber 树中的每个节点代表一个组件，并包含组件的状态、属性等信息。

更新：当组件的状态或属性发生变化时，React 会触发更新。Fiber 会根据变化的类型和优先级来决定如何更新组件。

提交：在更新阶段完成后，React 会将 Fiber 树转换为实际的 DOM 树，并提交给浏览器进行渲染。

## Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法。

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/47

React 提出的一种解决方案，它是一个轻量级的 JavaScript 对象，用来描述真实 DOM 的结构和属性。
React 通过比较虚拟 DOM 的差异，计算出需要更新的部分，然后再将这些部分更新到真实 DOM 上。
React 虚拟 DOM 的原理是：

1. 首先，React 将组件的状态和属性传入组件的 render 方法，得到一个虚拟 DOM 树。
2. 当组件的状态或属性发生变化时，React 会再次调用 render 方法得到新的虚拟 DOM 树。
3. React 会将新旧两棵虚拟 DOM 树进行比较，得到它们的不同之处。
4. React 会将这些不同之处记录下来，然后批量的更新到真实的 DOM 树上。

React 通过虚拟 DOM 树的比较，避免了直接操作真实 DOM 树带来的性能问题，因为直接操作真实 DOM 树会带来大量的重排和重绘，而 React 的虚拟 DOM 树的比较和更新是基于 JavaScript 对象进行的，不会导致页面的重排和重绘。

总结起来，React 虚拟 DOM 的原理就是：通过比较虚拟 DOM 树的不同，批量的更新真实的 DOM 树，从而提高页面的性能。

## React Diff 算法

React Diff 是 React 中用于更新 Virtual DOM 的算法它的目的是在最小化 DOM 操作的同时，尽可能快地更新组件。它通过比较 Virtual DOM 树的前后两个状态来确定哪些部分需要更新。

React Diff 算法的核心思想是尽可能地复用已有的 DOM 节点。当 Virtual DOM 中的某个节点发生变化时，React 会先比较该节点的属性和子节点是否有变化，如果没有变化，则直接复用该节点。如果有变化，则会在该节点的父节点下创建一个新的节点，并将新的属性和子节点赋值给该节点。

React Diff 算法的具体实现有两种方式：深度优先遍历和广度优先遍历。深度优先遍历是指先比较父节点的子节点，如果子节点有变化，则递归比较子节点的子节点。广度优先遍历是指先比较同级节点，如果同级节点有变化，则递归比较子节点。

React Diff 算法的优化策略包括：key 属性的使用、组件的 shouldComponentUpdate 方法、使用 Immutable.js 等。其中，key 属性的使用是最常用的优化策略，它可以帮助 React 更准确地判断哪些节点需要更新，从而减少不必要的 DOM 操作。

React Diff 算法具有以下特点：

1. 先判断两个节点是否相等，如果相等，就不需要更新。
2. 如果两个节点类型不同，则直接替换节点。
3. 如果节点类型相同，但是节点属性不同，则更新节点属性。
4. 如果节点类型相同，但是子节点不同，则使用递归的方式进行更新。
   React Diff 算法的时间复杂度是 O(n)，其中 n 为 Virtual DOM 树中节点的数量。

**实例：** 在 React 中，渲染数组时将数组的第一项移动到最后渲染的开销通常比将最后一项移动到第一项渲染的开销要大：

这是因为 React 使用了虚拟 DOM（Virtual DOM）来进行高效的 DOM 操作。
当数组中的元素发生变化时，React 会比较新旧虚拟 DOM 树的差异，并只更新需要更新的部分。
如果将数组的第一项移动到最后，React 需要重新计算并比较整个数组的差异，这可能会导致更多的 DOM 操作。
相比之下，将最后一项移动到第一项只会影响数组的第一项和最后一项，而不会影响其他元素的位置。
因此，React 只需要比较这两个元素的差异，并进行相应的 DOM 操作，这通常比重新计算整个数组的差异要更高效。

## useState 一个有趣的挑战

> 废弃：[React 中 setState 什么时候是同步的，什么时候是异步的？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17)

> 废弃：[React setState 笔试题，下面的代码输出什么？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/18)

> https://juejin.cn/post/7349542148733599763

点击按钮 A、按钮 B、按钮 C、按钮 D 后，各自按钮上的数字分别是什么，为什么？

```js
import { useState } from 'react'

export default function Counter() {
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)
  const [number3, setNumber3] = useState(0)
  const [number4, setNumber4] = useState(0)

  return (
    <>
      <button
        onClick={() => {
          setNumber1(number1 + 1)
          setNumber1(number1 + 1)
          setNumber1(number1 + 1)
        }}
      >
        按钮A{number1}
      </button>

      <button
        onClick={() => {
          setNumber2((n) => n + 1)
          setNumber2((n) => n + 1)
          setNumber2((n) => n + 1)
        }}
      >
        按钮B{number2}
      </button>

      <button
        onClick={() => {
          setNumber3(number3 + 5)
          setNumber3((n) => n + 1)
        }}
      >
        按钮C{number3}
      </button>

      <button
        onClick={() => {
          setNumber4(number4 + 5)
          setNumber4((n) => n + 1)
          setNumber4(42)
        }}
      >
        按钮D{number4}
      </button>
    </>
  )
}
```

点击按钮 A、按钮 B、按钮 C、按钮 D 后，各自按钮上的数字分别是 1、3、6、42。

因为在 React 中有以下几点规则：

- useState 返回的更新函数 仅更新下一次渲染的状态变量，不会更新当前渲染的状态变量（旧值）；
- 等到事件处理函数中的所有代码都运行完毕才会处理 state 更新；
- 传递给更新 state 函数的参数可以是一个值、一个算术表达式、一个函数，不管是什么都会被添加到队列中，以便在事件处理函数中的所有其他代码运行后进行处理。如果是一个值或者算术表达式会先执行得到结果后，转变成一个伪函数 n => x 添加到队列中，其中 X 是执行结果。此外不同更新函数的参数添加到不同的对应队列中；
- 在下一次渲染期间，React 会遍历队列计算出最终的 state 并更新；
- 在遍历队列过程中，React 会获取上一个队列的返回值，并将其传递给下一个队列，用不用由下一个队列决定是否使用。

## React 和 Vue 的 diff 时间复杂度从 O(n^3) 优化到 O(n) ，那么 O(n^3) 和 O(n) 是如何计算出来的？

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/151

## redux 为什么要把 reducer 设计成纯函数

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/107

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

> https://juejin.cn/post/7022777747722207269

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

类组件中可以使用生命周期方法，常见的有 `componentDidMount`、`componentDidUpdate`、跟`componentWillUnmount`，它们分别对应 Vue3 中的 `onMounted`、`onUpdated` 跟 `onBeforeUnmount`。

这个网站可以很清楚看到 React 的生命周期，[React 生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)，这里就不过多赘述。

![](https://skillgroup.cn/images/react/10.png)

![](https://skillgroup.cn/images/react/11.png)

https://skillgroup.cn/framework/react/life-cycle.html

https://zh-hans.react.dev/reference/react/Component

```js
import { Component } from 'react'
class ChatRoom extends Component {
  state = {
    serverUrl: 'https://localhost:1234'
  }

  componentDidMount() {
    this.setupConnection()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.roomId !== prevProps.roomId || this.state.serverUrl !== prevState.serverUrl) {
      this.destroyConnection()
      this.setupConnection()
    }
  }

  componentWillUnmount() {
    this.destroyConnection()
  }

  // ...
}
```

## 从类组件迁移至 Hook

- https://zh-hans.react.dev/reference/react/Component#alternatives

- [从 Vue2.0 到 React17——React 函数组件的生命周期](https://juejin.cn/post/6976997792652722207)
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
const MyComponent = (props) => {
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
    this.setState((prevState) => ({ count: prevState.count + 1 }))
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
    setCount((prevCount) => prevCount + 1)
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
        <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
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
            onChange={(e) => {
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
        Server URL: <input value={serverUrl} onChange={(e) => setServerUrl(e.target.value)} />
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

## Vue 语法转换为 React

- [并排比较 React.js/Next.js 和 Vue.js/Nuxt.js 的语法](https://github.com/yanyue404/react-vue-comparison?tab=readme-ov-file)

## React 中什么是受控组件和非控组件？

value 由用户控制就是非受控模式，由代码控制就是受控模式。

（1）受控组件 在使用表单来收集用户输入时，例如`<input><select><textearea>`等元素都要绑定一个 change 事件，当表单的状态发生变化，就会触发 onChange 事件，更新组件的 state。这种组件在 React 中被称为受控组件，在受控组件中，组件渲染出的状态与它的 value 或 checked 属性相对应，react 通过这种方式消除了组件的局部状态，使整个状态可控。react 官方推荐使用受控表单组件。

受控组件更新 state 的流程：

- 可以通过初始 state 中设置表单的默认值
- 每当表单的值发生变化时，调用 onChange 事件处理器
- 事件处理器通过事件对象 e 拿到改变后的状态，并更新组件的 state
- 一旦通过 setState 方法更新 state，就会触发视图的重新渲染，完成表单组件的更新

受控组件缺陷： 表单元素的值都是由 React 组件进行管理，当有多个输入框，或者多个这种组件时，如果想同时获取到全部的值就必须每个都要编写事件处理函数，这会让代码看着很臃肿，所以为了解决这种情况，出现了非受控组件。

```js
//内容可以由我们自己来控制的组件，必须要有value和onChange
import React, { Component } from "react";
class App extends Component {
  state = {
    valueText: 1
  }
  handleChange = (e) => {
    this.setState({
      valueText: e.target.value,    //输入的值
    });
  }
  handleClick = () => {
    console.log(this.state.valueText);
  }
  render() {
    return (
      <>
        <input
          type="text"
          value={this.state.valueText}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>btn</button>
      </>
      <p>输入的值是：{this.state.valueText}</p>   //实现双向绑定效果
    );
  }
}

//函数组件 useState
 const setUserName = (e) => {
    setUserRealName(e.target.value)
 }
```

（2）非受控组件 如果一个表单组件没有 value props（单选和复选按钮对应的是 checked props）时，就可以称为非受控组件。在非受控组件中，可以使用 onChange 事件 event.target 拿到 value 或一个 ref 来从 DOM 获得表单值。而不是为每个状态更新编写一个事件处理程序。

React 官方的解释：

> 要编写一个非受控组件，而不是为每个状态更新都编写数据处理函数，你可以使用 ref 来从 DOM 节点中获取表单数据。 因为非受控组件将真实数据储存在 DOM 节点中，所以在使用非受控组件时，有时候反而更容易同时集成 React 和非 React 代码。如果你不介意代码美观性，并且希望快速编写代码，使用非受控组件往往可以减少你的代码量。否则，你应该使用受控组件。

例如，下面的代码在非受控组件中接收单个属性：

```java
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.value);
    event.preventDefault();
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


// 新语法： 解构createRef，创建Refs并通过ref属性联系到React组件。Refs通常当组件被创建时被分配给实例变量，这样它们就能在组件中被引用。
import React, { Component, createRef } from "react";
class App extends Component {
  num = createRef();       //current 属性是唯一可用的属性
  handleClick2 = (ipt) => {
    console.log(this.num.current.value);
  }
  render() {
    return (
      <>
        <input type="text" ref={this.num} />
        <button onClick={this.handleClick2}>btn</button>
      </>
    );
  }
}
```

总结： 页面中所有输入类的 DOM 如果是现用现取的称为非受控组件，而通过 setState 将输入的值维护到了 state 中，需要时再从 state 中取出，这里的数据就受到了 state 的控制，称为受控组件。

## React 中的样式和类

1、组件中的内联样式

```js
class Header extends React.Component {
  render() {
    return <header style={{ color: 'red' }}>这是头</header> //外层{}为 jsx 语法，内层{}为对象写法
  }
}
```

2、直接导入 css

```js
import 'XXX.css' //导入定义过的 css 文件
const Main = () => {
  return <main className="orange big">这是身体</main> //class 为关键字，必须使用 className
}
```

3、不同的条件添加不同的样式-使用 classnames 这个包

```js
//下载安装 classnames 包
// $npm i classnames
//引入 classnames 包
import classNames from 'classNames/bind'
//引入 CSS 文件
import styles from './classNames.css'
let cx = classNames.bind(styles)

function Footer() {
  let className = cx({
    blue: true,
    red: false
  })
  return <footer className={className}>这是脚</footer>
}
```

4、在 js 中写 css 改变样式

```js
//安装包
// $npm i styled-components
//新建含有 css 的 js 文件，导入模块并导出样式
import styled from 'styled-components'
const Pstyled = styled.h1`
  //h1为标签名，后面接模板字符串 color: red; font-size: ${(props) => props.size + 'px'};
` //可以通过 props 传值
export { Pstyled }
//组件中使用
import React, { Component } from 'react'
import { Pstyled } from './scc-in-js.js'

class App extends Component {
  render() {
    return (
      <>
        <Pstyled size="60">styled-components</Pstyled>
      </>
    )
  }
}
export default App
```

## useEffect Hook

`useEffect`是 React 中用于执行副作用操作的 Hook，并且具有类似于生命周期方法的功能。

`useEffect` 接受两个参数：副作用函数和依赖数组。

1.  **副作用函数**：第一个参数是一个函数，用于执行副作用操作。
2.  **依赖数组**：第二个参数是一个数组，包含了副作用函数中所依赖的变量。如果省略这个参数，那么副作用函数会在每次组件重新渲染时都执行，可以充当`componentDidMount` + `componentDidUpdate`这两个生命周期；如果传入空数组 `[]`，则副作用函数只会在组件挂载时执行，相当于 `componentDidMount`；如果依赖数组中包含了某些变量，则只有这些变量发生变化时，副作用函数才会重新执行，这样也相当于充当 `componentDidMount` + `componentDidUpdate`这两个生命周期 。如果我们在其中`return`一个函数，这个函数将会在组件卸载时除非，相当于新增了 `componentWillUnmount`。

我总结了一下副作用函数执行时机与依赖项的关系如下：

| 依赖项         | 副作用函数执行时机                  |
| -------------- | ----------------------------------- |
| 没有依赖项     | 组件初始渲染 + 组件更新时执行       |
| 空数组依赖项   | 只在初次渲染时执行一次              |
| 添加特定依赖项 | 组件初始渲染 + 特定依赖项变化时执行 |

```jsx
import { useState, useEffect } from 'react'
export function useDemo() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log('组件更新')
    return () => {
      console.log('组件卸载')
    }
  }, [count])

  // React 的 Hooks 主要是用于维护组件的状态、处理副作用等，但你可以通过 Hooks 返回 JSX 内容。虽然在 Hooks 中不直接返回 JSX，而是通常在组件内使用 Hooks 然后返回 JSX。
  return (
    <div>
      <p>点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>点击</button>
    </div>
  )
}
```

## React Hooks

React 中通常使用 **类定义** 或者 **函数定义** 创建组件:

在类定义中，我们可以使用到许多 React 特性，例如 state、 各种组件生命周期钩子等，但是在函数定义中，我们却无能为力，因此 React 16.8 版本推出了一个新功能 (React Hooks)，通过它，可以更好的在函数定义组件中使用 React 特性。

- **好处**:

  - 1、**跨组件复用**: 其实 render props / HOC 也是为了复用，相比于它们，Hooks 作为官方的底层 API，最为轻量，而且改造成本小，不会影响原来的组件层次结构和传说中的嵌套地狱；
  - 2、**类定义更为复杂**:
    - 不同的生命周期会使逻辑变得分散且混乱，不易维护和管理；
    - 时刻需要关注`this`的指向问题；
    - 代码复用代价高，高阶组件的使用经常会使整个组件树变得臃肿；
  - 3、**状态与UI隔离**: 正是由于 Hooks 的特性，状态逻辑会变成更小的粒度，并且极容易被抽象成一个自定义 Hooks，组件中的状态和 UI 变得更为清晰和隔离。

- **注意**:

  - 避免在 循环/条件判断/嵌套函数 中调用 hooks，保证调用顺序的稳定；
  - 只有 函数定义组件 和 hooks 可以调用 hooks，避免在 类组件 或者 普通函数 中调用；
  - 不能在`useEffect`中使用`useState`，React 会报错提示；
  - 类组件不会被替换或废弃，不需要强制改造类组件，两种方式能并存；

- **重要钩子\***:

  - **状态钩子** (`useState`): 用于定义组件的 State，其到类定义中`this.state`的功能；

  ```js
  // useState 只接受一个参数: 初始状态
  // 返回的是组件名和更改该组件对应的函数
  const [flag, setFlag] = useState(true)
  // 修改状态
  setFlag(false)

  // 上面的代码映射到类定义中:
  this.state = {
    flag: true
  }
  const flag = this.state.flag
  const setFlag = (bool) => {
    this.setState({
      flag: bool
    })
  }
  ```

  - **生命周期钩子** (`useEffect`):

  类定义中有许多生命周期函数，而在 React Hooks 中也提供了一个相应的函数 (`useEffect`)，这里可以看做`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`的结合。

  - `useEffect(callback, [source])`接受两个参数
    - `callback`: 钩子回调函数；
    - `source`: 设置触发条件，仅当 source 发生改变时才会触发；
    - `useEffect`钩子在没有传入`[source]`参数时，默认在每次 render 时都会优先调用上次保存的回调中返回的函数，后再重新调用回调；

  ```js
  useEffect(() => {
    // 组件挂载后执行事件绑定
    console.log('on')
    addEventListener()

    // 组件 update 时会执行事件解绑
    return () => {
      console.log('off')
      removeEventListener()
    }
  }, [source])

  // 每次 source 发生改变时，执行结果(以类定义的生命周期，便于大家理解):
  // --- DidMount ---
  // 'on'
  // --- DidUpdate ---
  // 'off'
  // 'on'
  // --- DidUpdate ---
  // 'off'
  // 'on'
  // --- WillUnmount ---
  // 'off'
  ```

  - 通过第二个参数，我们便可模拟出几个常用的生命周期:

    - `componentDidMount`: 传入`[]`时，就只会在初始化时调用一次；

    ```js
    const useMount = (fn) => useEffect(fn, [])
    ```

    - `componentWillUnmount`: 传入`[]`，回调中的返回的函数也只会被最终执行一次；

    ```js
    const useUnmount = (fn) => useEffect(() => fn, [])
    ```

    - `mounted` : 可以使用 useState 封装成一个高度可复用的 mounted 状态；

    ```js
    const useMounted = () => {
      const [mounted, setMounted] = useState(false)
      useEffect(() => {
        !mounted && setMounted(true)
        return () => setMounted(false)
      }, [])
      return mounted
    }
    ```

    - `componentDidUpdate`: `useEffect`每次均会执行，其实就是排除了 DidMount 后即可；

    ```js
    const mounted = useMounted()
    useEffect(() => {
      mounted && fn()
    })
    ```

- **其它内置钩子**:

  - `useContext`: 获取 context 对象

  - `useReducer`: 类似于 Redux 思想的实现，但其并不足以替代 Redux，可以理解成一个组件内部的 redux:

    - 并不是持久化存储，会随着组件被销毁而销毁；
    - 属于组件内部，各个组件是相互隔离的，单纯用它并无法共享数据；
    - 配合`useContext`的全局性，可以完成一个轻量级的 Redux；([easy-peasy](https://github.com/ctrlplusb/easy-peasy))

  - `useCallback`: 缓存回调函数，避免传入的回调每次都是新的函数实例而导致依赖组件重新渲染，具有性能优化的效果；

  - `useMemo`: 用于缓存传入的 props，避免依赖的组件每次都重新渲染；

  - `useRef`: 获取组件的真实节点；

  - `useLayoutEffect`:

    - DOM更新同步钩子。用法与`useEffect`类似，只是区别于执行时间点的不同。
    - `useEffect`属于异步执行，并不会等待 DOM 真正渲染后执行，而`useLayoutEffect`则会真正渲染后才触发；
    - 可以获取更新后的 state；

- **自定义钩子**(`useXxxxx`): 基于 Hooks 可以引用其它 Hooks 这个特性，我们可以编写自定义钩子，如上面的`useMounted`。又例如，我们需要每个页面自定义标题:

```js
function useTitle(title) {
  useEffect(() => {
    document.title = title
  })
}

// 使用:
function Home() {
  const title = '我是首页'
  useTitle(title)

  return <div>{title}</div>
}
```

## SSR

SSR，俗称 **服务端渲染** (Server Side Render)，讲人话就是: 直接在服务端层获取数据，渲染出完成的 HTML 文件，直接返回给用户浏览器访问。

- **前后端分离**: 前端与服务端隔离，前端动态获取数据，渲染页面。

- **痛点**:

  - **首屏渲染性能瓶颈**:

    - 空白延迟: HTML下载时间 + JS下载/执行时间 + 请求时间 + 渲染时间。在这段时间内，页面处于空白的状态。

  - **SEO 问题**: 由于页面初始状态为空，因此爬虫无法获取页面中任何有效数据，因此对搜索引擎不友好。

    - 虽然一直有在提动态渲染爬虫的技术，不过据我了解，大部分国内搜索引擎仍然是没有实现。

最初的服务端渲染，便没有这些问题。但我们不能返璞归真，既要保证现有的前端独立的开发模式，又要由服务端渲染，因此我们使用 React SSR。

- **原理**:

  - Node 服务: 让前后端运行同一套代码成为可能。
  - Virtual Dom: 让前端代码脱离浏览器运行。

- **条件**: Node 中间层、 React / Vue 等框架。 结构大概如下:

[![](https://github.com/xd-tayde/blog/raw/master/images/interview/9.png)](https://github.com/xd-tayde/blog/blob/master/images/interview/9.png)

- **开发流程**: (此处以 React + Router + Redux + Koa 为例)

  - 1、在同个项目中，**搭建** 前后端部分，常规结构:

    - build
    - public
    - src
      - client
      - server

  - 2、server 中使用 Koa **路由监听** 页面访问:

  ```js
  import * as Router from 'koa-router'

  const router = new Router()
  // 如果中间也提供 Api 层
  router.use('/api/home', async () => {
    // 返回数据
  })

  router.get('*', async (ctx) => {
    // 返回 HTML
  })
  ```

  - 3、通过访问 url **匹配** 前端页面路由:

  ```js
  // 前端页面路由
  import { pages } from '../../client/app'
  import { matchPath } from 'react-router-dom'

  // 使用 react-router 库提供的一个匹配方法
  const matchPage = matchPath(ctx.req.url, page)
  ```

  - 4、通过页面路由的配置进行 **数据获取**。通常可以在页面路由中增加 SSR 相关的静态配置，用于抽象逻辑，可以保证服务端逻辑的通用性，如:

    ```js
     class HomePage extends React.Component{
     	public static ssrConfig = {
     		  cache: true,
              fetch() {
             	  // 请求获取数据
              }
         }
     }
    ```

    获取数据通常有两种情况:

    - 中间层也使用 **http** 获取数据，则此时 fetch 方法可前后端共享；

    ```js
    const data = await matchPage.ssrConfig.fetch()
    ```

    - 中间层并不使用 http，是通过一些 **内部调用**，例如 Rpc 或 直接读数据库 等，此时也可以直接由服务端调用对应的方法获取数据。通常，这里需要在 ssrConfig 中配置特异性的信息，用于匹配对应的数据获取方法。

    ```js
     // 页面路由
     class HomePage extends React.Component{
     	public static ssrConfig = {
             fetch: {
             	 url: '/api/home',
             }
         }
     }

     // 根据规则匹配出对应的数据获取方法
     // 这里的规则可以自由，只要能匹配出正确的方法即可
     const controller = matchController(ssrConfig.fetch.url)

     // 获取数据
     const data = await controller(ctx)
    ```

  - 5、创建 Redux store，并将数据`dispatch`到里面:

  ```js
  import { createStore } from 'redux'
  // 获取 Clinet层 reducer
  // 必须复用前端层的逻辑，才能保证一致性；
  import { reducers } from '../../client/store'

  // 创建 store
  const store = createStore(reducers)

  // 获取配置好的 Action
  const action = ssrConfig.action

  // 存储数据
  store.dispatch(createAction(action)(data))
  ```

  - 6、注入 Store， 调用`renderToString`将 React Virtual Dom 渲染成 **字符串**:

  ```js
  import * as ReactDOMServer from 'react-dom/server'
  import { Provider } from 'react-redux'

  // 获取 Clinet 层根组件
  import { App } from '../../client/app'

  const AppString = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={ctx.req.url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  )
  ```

  - 7、将 AppString 包装成完整的 html 文件格式；

  - 8、此时，已经能生成完整的 HTML 文件。但只是个纯静态的页面，没有样式没有交互。接下来我们就是要插入 JS 与 CSS。我们可以通过访问前端打包后生成的`asset-manifest.json`文件来获取相应的文件路径，并同样注入到 Html 中引用。

  ```js
  const html = `
   	<!DOCTYPE html>
   	<html lang="zh">
   		<head></head>
   		<link href="${cssPath}" rel="stylesheet" />
   		<body>
   			<div id="App">${AppString}</div>
   			<script src="${scriptPath}"></script>
   		</body>
   	</html>
   `
  ```

  - 9、进行 **数据脱水**: 为了把服务端获取的数据同步到前端。主要是将数据序列化后，插入到 html 中，返回给前端。

  ```js
  import serialize from 'serialize-javascript'
  // 获取数据
  const initState = store.getState()
  const html = `
   	<!DOCTYPE html>
   	<html lang="zh">
   		<head></head>
   		<body>
   			<div id="App"></div>
   			<script type="application/json" id="SSR_HYDRATED_DATA">${serialize(initState)}</script>
   		</body>
   	</html>
   `

  ctx.status = 200
  ctx.body = html
  ```

  > **Tips**:
  >
  > 这里比较特别的有两点:
  >
  > 1.  使用了`serialize-javascript`序列化 store， 替代了`JSON.stringify`，保证数据的安全性，避免代码注入和 XSS 攻击；
  > 2.  使用 json 进行传输，可以获得更快的加载速度；

  - 10、Client 层 **数据吸水**: 初始化 store 时，以脱水后的数据为初始化数据，同步创建 store。

  ```js
  const hydratedEl = document.getElementById('SSR_HYDRATED_DATA')
  const hydrateData = JSON.parse(hydratedEl.textContent)

  // 使用初始 state 创建 Redux store
  const store = createStore(reducer, hydrateData)
  ```

## 参考

- https://github.com/xd-tayde/blog/blob/master/interview-2.md
- [ React 进阶实践指南](https://juejin.cn/book/6945998773818490884)
- https://juejin.cn/user/254742429175352/posts
- https://www.yuque.com/yuqueyonghua2m9wj/web_food/tpo1np
- https://juejin.cn/post/7377320107929829388
