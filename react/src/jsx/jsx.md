## JSX语法
jsx可以理解为一种新的模板语法，按照指定的规则来写，可以使用 `ReactDom` 由虚拟 dom 渲染的方式插入到页面中，性能非常强悍。

### 1.直接书写 html 代码，必须使用闭合标签

````js
const element1 = <h1>Hello!</h1>;
const element2 =  <input type="text" placeholder=""/>;
````
### 2.嵌套最外层必须使用根节点包含

````js
const element = (
  <div>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </div>
);
````

### 3.Fragment

React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。

Fragments 看起来像空的 JSX 标签：

````js
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
`````
使用 `React.Fragment` 作为最外层根节点，语义化避免div嵌套，注意在 React 中，`<></>` 是 `<React.Fragment/>` 的语法糖。

````js
 var wrapper = React.Fragment;
 const element = (
  <wrapper>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </wrapper>
);

````

#### 典型例子

一个常见模式是为一个组件返回一个子元素列表。以这个示例的 React 片段为例：
````js
class Table extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <Columns />
        </tr>
      </table>
    );
  }
}
````
为了渲染有效的 HTML ， <Columns /> 需要返回多个 <td> 元素。如果一个父 div 在 <Columns /> 的 render() 函数里面使用，那么最终的 HTML 将是无效的。
````js
class Columns extends React.Component {
  render() {
    return (
      <div>
        <td>Hello</td>
        <td>World</td>
      </div>
    );
  }
}
````
在 <Table /> 组件中的输出结果如下：
````html
<table>
  <tr>
    <div>
      <td>Hello</td>
      <td>World</td>
    </div>
  </tr>
</table>
````
 使用`<React.Fragment />`
````js
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}
````
### 4.使用 js 表达式

可以任意地在 JSX 当中使用 JavaScript 表达式，在 JSX 当中的表达式要包含在大括号里。

````js
const Img = <img src={user.avatarUrl}></img>;
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
````
### 4. css 样式

可以书写在 js 中书写 css 样式对象，以 `style` 来绑定，也可以使用 `className` 属性来绑定对应 css 文件的 class 样式.

````js
 const style = {
       fontSize:"16px",
       color:"green"
     };
const element1 = <h1 style={style}>Hello,React Jsx!</h1>;
const element1 = <h1 className="title">Hello,React Jsx!</h1>;

````

### 5.注释

````js
     const App = (
       <Nav>
          {/* 节点注释*/}
          <Person
          /*多行
            注释*/
          name={window.isLoggedIn?window.name:''}>
       </Nav>
     )
````
### 栗子

````js
class JSXComponent extends React.Component {
      constructor(){
        super()
        this.state = {
         name:'yueyue'
       }
      }
    render(){
     var arr = ["Hello,world!","React is awesome."];
     var style = {
       fontSize:"16px",
       color:"green"
     };
     var wrapper = React.Fragment;
      return (
        <wrapper>
          <ul style={style}>
            {
          arr.map(function(value,index){
            return <li key={index}>{value}</li>
          })  
        }
        </ul>
        </wrapper>
      )
    }
   
  }

   ReactDOM.render(<JSXComponent />,document.getElementById('div1'))
````

