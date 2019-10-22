## 数据流

在 React 中，数据是自顶向下流动的，即从父组件到子组件。这条原则让组件之间的关系变得简单且可预测。

state  与props 是 React 组件中最重要的概念。如果顶层组件初始化 props ，那么 React 会向下遍历整颗组件树，重新尝试渲染所有相关的子组件。而 state 只关心每个组件自己内部的状态，这些状态只能在组件内部改变。把组件看成一个函数，那么它接受了 props 作为参数，内部由 state 作为函数的内部参数，返回一个 Virtual DOM 的实现。

### 1.state

组件内部的 state 是可读可写的，当 state 发生改变的时候会触发执行 render 方法，继而渲染整颗 DOM 树，在渲染的过程中会有 diff 算法去计算哪些 DOM 有更新，提升性能。

值得注意的事，setState 是一个异步方法，一个生命周期内的所有 setState 方法会合并操作。

**setState**：

````js
  class MyComponent extends React.Component{
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
      this.state = {
        count:0
      }
    }

    handleClick(){
      this.setState({
        count:this.state.count+1
      })
    }
    
  
     render(){
       return(
        <div>
          <p>{this.state.count}</p>
          <a href="#" onClick={this.handleClick}>更新</a>
        </div>
       )
     }
   }
````
### 2.props

当 React 遇到的元素是用户自定义的组件，它会将 JSX 属性作为单个对象传递给该组件，这个对象称之为“props”。

React 的单向数据流，主要的流通管道就是 props。props 本身是不可变的。无论是使用函数或是类来声明一个组件，它决不能修改它自己的 props，否则 React 会报出类型错误的警告，组件的 props 一定来自于默认属性或通过父组件传递而来。如果说要渲染一个对 props 加工后的值，最简单的办法就是使用局部变量或直接在 JSX 中计算结果。

例如,这段代码会在页面上渲染出 ”Hello,Sara”，在这里将 {name: 'Sara'} 作为 props 传入并调用 Welcome 组件。

#### 简单栗子

````js
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
````
#### 复杂栗子

````js
  function formatDate(date) {
  return date.toLocaleDateString();
}


function Avatar(props) {
  return (
    <img className="Avatar"
         src={props.user.avatarUrl}
         alt={props.user.name} />
  );
}

function Comment(props) {
  return (
    <div className="Comment">
      <div className="UserInfo">
        <Avatar user={props.author} />
        <div className="UserInfo-name">
          {props.author.name}
        </div>
      </div>
      <div className="Comment-text">
        {props.text}
      </div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}

const comment = {
  date: new Date(),
  text: 'I hope you enjoy learning React!',
  author: {
    name: 'Hello Kitty',
    avatarUrl: 'http://placekitten.com/g/64/64'
  }
};
ReactDOM.render(
  <Comment
    date={comment.date}
    text={comment.text}
    author={comment.author} />,
  document.getElementById('root')
);
````