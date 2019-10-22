## 生命周期
React的生命周期可以分为挂载、渲染和卸载几个阶段。当渲染后的组件需要更新时，我们会重新去渲染组件，直至卸载。

因此，我们可以吧React的生命周期分为两类：
- 当组件在挂载或卸载时
- 当组件接受新的数据时，即组件更新时

## 1.组件挂载和卸载的过程
### 1.1 组件的挂载

`propTypes` 和 `defaultProps` 分别代表 props 的类型检查和默认值。这两个属性被声明为静态属性（es6语法），意味着在类外面也可以访问他们,如 `App.propTypes` 和 `App.defaultProps` 。

两个生命周期方法, `componentWillMount` 会在 render 渲染之前执行,在此方法内部无法获取到真实的 Dom 元素， `componentDidMount` 会在渲染之后执行，这个方法可以获取到真实的 Dom 元素，这两个生命周期方法以及 state 和 props ，仅会在组件初始化的时候执行一次。

如果在 `componentWillMount` 中执行 setState 方法，会发生什么?组件会更新 state ，但组件只`渲染一次`，这是无意义的操作；如果在 `componentDidMount` 中执行 setState 方法，组件当然会再次更新，不过初始化的过程就渲染了两次组件，在实际情况中有一些场景需要这样重新 setState ，比如计算组件的宽高和位置，就不得不让组件先渲染，更新必要的信息之后再次渲染。

````js
    import React, { Component } from 'react';
    import PropTypes from 'prop-types';
    
    class MountingComponent extends Component {
      static propTypes = {
        //...
      } 
      static defaultProps = {
        name:'yueyue'
      }
      constructor(props) {
        super(props);
        this.state = {
        name:'yueyue'
        }
      }
    
       componentWillMount(){
        console.log(this.refs.h1); // undefined
      }
      componentDidMount(){
        console.log(this.refs.h1); // h1对象
      }
      render(){
        return <h1 ref="h1">Lifecycle-Mountion { this.props.name}</h1>;
      }
    }
    ReactDOM.render(<MountingComponent />,document.getElementById('div1'))
    
````
### 1.2 组件的卸载

组件卸载非常简单，只有一个 `componentWillUnmount` 这一个卸载前的状态，通常在这个方法中会执行一些清理的方法，如事件回收或是清除定时器。

````js
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
````
## 2.数据更新的过程

更新的过程指的是父组件向下传递 props 或组件自身执行 setState 方法发生的一系列更新动作，我们观察更新过程的生命周期：

````js
 class UpdatingComponent extends React.Component {
      constructor(){
        super()
        this.state ={
          data:0
        }
      }
   
      setNewNumber(){
        // 当state发生改变的时候，state对应的组件将会被重新挂载
        // 会触发componentWillUpdate, componentDidUpdate
        this.setState({
          data:this.state.data+1
        })
      }

      //参数 newProps：已更新的 props
      componentWillReceiveProps(newProps) {
         console.log('Component WILL RECEIVE PROPS!', newProps)
      }      

       //参数 newProps：已更新的 props
      //参数 newState：已更新的 state  
      //必须要返回 boolen，true 则执行componentWillUpdate、render、componentDidUpdate。反之则不执行。
      shouldComponentUpdate(newProps,newStates){
        console.log('shouldComponentUpdate',newProps, newStates);
        return (newStates.data > 0 && newStates.data % 2 == 0);
      }
      // 参数 newProps:将要更新的props
      // 参数 newState：将要更新的state
      componentWillUpdate(newProps,newStates) {
        console.log('componentWillUpdate',newProps, newStates, this.refs.p1)
      }
      // 参数 prevProps:更新前的props
      // 参数 prevState:更新前的state
      componentDidUpdate(prevProps,prevState) {
        console.log('componentDidUpdate',prevProps, prevState) 
      }
      render(){
        return (
          <div>
              <button onClick={this.setNewNumber.bind(this)}>INCREMENT</button>
              <h3>{this.state.data}</h3>
          </div>
        )
      }
    }

    ReactDOM.render(<UpdatingComponent/>, document.getElementById('div2'));
````

当组件的state和props改变的时候，按执行顺序会触发：
- 1.componentWillReceiveProps 
- 2.shouldComponentUpdate
- 3.componentWillUpdate
- 4.render
- 5.componentDidUpdate

### componentWillReceiveProps(nextProps)

如果组件是由父组件更新 props 而更新的，那么会在 `shouldComponentUpdate` 之前执行此方法，此方法可以作为 React 在 props 传入后，渲染之前 setState 的机会，在此方法中调用 setState 不会进行二次渲染。

**props 注**：props 不能手动改变，正常场景是当前组件被当子组件调用，然后在父组件中改变该组件的 props

### shouldComponentUpdate(nextProps,NewState)

组件挂载之后，每次调用 setState 后都会调用 shouldComponentUpdate 判断是否需要重新渲染组件。默认返回 true ，重新 render 。在比较复杂的应用里，有一些数据的改变并不影响界面展示，可以在这里做判断，优化渲染效率。 此方法必须要返回 boolen，返回 true 则执行后面的 componentWillUpdate、render、componentDidUpdate。反之则不执行。

方法接受两个参数：
-  newProps：已更新的 props
-  newState：已更新的 state 

### componentWillUpdate(nextProps,nextState)

更新过程渲染前的时刻，接收到新的 props 或者 state ，在将要更新渲染但还没有 render 时被调用，在初始化时不会被调用。 

**注**：不能在此方法中执行setState

方法接受两个参数：
- nextProps：需要更新的 props
- nextState：需要更新的 state

### componentDidUpdate(prevProps,prevState)

更新过程渲染后的时刻，接收更新前的 props 和 state ，在更新渲染 render 之后调用
方法接受两个参数：
- prevProps props
- prevState

## 3.整体流程

从 ReactDOM.render() 进入下面的流程图，可以使用 `this.setState()` 的生命周期方法如下：
- 1.componentWillMount
- 2.componentDidMount
- 3.componentWillReceiveProps
- 4.componentDidUpdate

![](https://github.com/xiaoyueyue165/framework-tutorial/blob/master/screenshot/react-lifecycle.png)

当使用 creactClass 来构造组件时，生命周期有所不同，区别如下表格：

<table width=100% >
  <tr width=100% >
    <th width=50% >ES6 class</th>
    <th width=50% >createClass</th>
  </tr>
  <tr>
    <td>static propTypes</td>
    <td>propTypes</td>
  </tr>
  <tr>
    <td>static defaultProps</td>
    <td>getDefaultProps</td>
  </tr>
   <tr>
    <td>constructor(this.state)</td>
    <td>getInitialState</td>
  </tr>
  <tr>
    <td colspan="3" align="center">componentWillMount</td>
  </tr>
  <tr>
    <td colspan="3" align="center">render</td>
  </tr>
   <tr>
    <td colspan="3" align="center">componentDidMount</td>
  </tr>
   <tr>
    <td colspan="3" align="center">componentWillReceivePorps</td>
  </tr>
   <tr>
    <td colspan="3" align="center">shouldComponentUpdate</td>
  </tr>
   <tr>
    <td colspan="3" align="center">componentWillUpdate</td>
  </tr>
   <tr>
    <td colspan="3" align="center">render</td>
  </tr>
  <tr>
    <td colspan="3" align="center">componentDidUpdate</td>
  </tr>
  <tr>
    <td colspan="3" align="center">componentWillUnmount</td>
  </tr>
</table>

初始化方法有所不同，生命周期方法没有变化。 ES6 中静态方法用关键词 `static` 声明即可，如 static sustomMethord() {}; mixin属性被移除，可以使用高阶组件替代。

为推行 ECMAScript 标准，我们更倾向于使用 ES6 classes 的方式来构建组件。 
