## Dom操作

### 获取dom元素

获取DOM后可以方便结合现有非 react 类库的使用，通过 ref/refs 可以取得组件实例，进而取得原生节点，不过尽量通过 state/props 更新组件.

- ref

**第一种**： 通过为元素指定 `ref` 属性进行标记，继而通过 `this.refs.标记` 获取 dom 元素进行操作

````js
 class MyComponent extends React.Component{
    constructor(){
     super();
     this.handleClick = this.handleClick.bind(this);
     }
     handleClick(){
      this.refs.myTextInput.focus();
     }
     render(){
       return(
         <div>
          <input type="text" ref="myTextInput" />
          <input type="button" value="Focus the text input" onClick={this.handleClick} />
          </div>
       )
     }
   }
````
**第二种**：使用 React 16.3 或更高, 这种情况下推荐使用 ref 转发。 Ref 转发使组件可以像暴露自己的 ref 一样暴露子组件的 ref ,直接使用 `this` 进行绑定,它可以是一个回调函数，这个回调函数会在组件被挂载后立即执行。

````js
class Parent extends React.Component {
    handleSubmit(event){
        event.preventDefault();
        let name=this.name.value;
        alert('你输入的姓名是'+name)
    }
    render(){
        return(
            <form className="box" onSubmit={this.handleSubmit.bind(this)}>
                <div className="from-group">
                    <label htmlFor="name">姓名</label>
                    <input type="text" className="form-control" ref={ref=>this.name=ref}/>
                    <br/>
                </div>
                <div className="from-group">
                  <Son />
                  <br />
                </div>
                <div className="from-group">
                    <input type="submit" className="btn btn-primary"/>
                </div>
            </form>
        )
    }
}

class Son extends React.Component{
    constructor(){
     super();
     this.handleClick = this.handleClick.bind(this);
     }
     handleClick(){
      if(this.myTextInput != null) {
        this.myTextInput.focus();
      }
     }
     render(){
       return(
         <div>
          <input type="text" ref={(ref) => this.myTextInput = ref} />
          <input type="button" value="Focus the text input" onClick={this.handleClick} />
          </div>
       )
     }
   }
````
- findDOMNode

使用 `ReactDom` 提供的 api —— `ReactDOM.findDOMNode `,方法类似于直接 `this.refs.标记` 获取

````js
 class MyComponent extends React.Component{
   componentDidMount() {
    // myComp是Comp的一个实例，因此需要findDOMNode转换为相应的DOM
    const myComp = this.refs.myComp;
    const dom = ReactDOM.findDOMNode(myComp);
     console.log(myComp);
     console.log(dom);
   }
  
     render(){
       return(
        <div>
          <h3>来吧，一起操作DOM</h3>
          <Comp ref="myComp" />
        </div>
       )
     }
   }

   class Comp extends React.Component {
     render(){
       return <p>这是我DOM元素里面的内容</p>
     }
   }
````
## 事件

React 为了区分于原生的 js 事件，使用 jsx 语法也就选择了一套新的事件类型名称，采用驼峰命名法，on 加上首字母大写的事件类型：

### 阻止默认事件

在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault：
````js
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
````

### this指向

React 组件书写大多使用 class 构造器写成，这里的 this 指向需要确保绑定在 class 类所构造出来的组件上面

#### 1. bind 方法

````js
 class Component3 extends React.Component {

    submit(e){
        console.log(this)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit3" onClick={this.submit.bind(this)}/>
    }
   
 }
````

#### 2. 构造器内声明

````js
class Component2 extends React.Component {
   constructor(props) {
     super(props);
     this.submit = this.submit.bind(this);
   }

    submit(e){
        console.log(this)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit2" onClick={this.submit}/>
    }
   
 }
````


#### 3.箭头函数

````js
class Component1 extends React.Component{
    submit(e){
        console.log(this)
        e.target.style.color = 'red'
    }
    render(){
        return <input type="button" value="submit1" onClick={(e) => this.submit(e)}/>
    }
}
````
或

````js
 class Component4 extends React.Component{
    render(){
      const submit = (e) => {
        console.log(this);
        e.target.style.color = 'red';
    };
      this.submit = submit;
      console.log(this);

      return <input type="button" value="submit4" onClick={this.submit}/>
    }
}
````



## form表单

#### 1.受控组件

在HTML当中，像 `<input>`, `<textarea>` , 和 `<select>` 这类表单元素会维持自身状态，并根据用户输入进行更新。但在React中，可变的状态通常保存在组件的状态属性中，每当 表单的状态发生变化的时候，都会被写入到 state 中，并且只能用 `setState()` 方法进行更新。

总结下 React 受控组件更新 state 的流程：

- 1. 可以通过在初始 state 中设置表单的默认值
- 2. 每当表单的值发生变化时，调用 onChange 事件处理器
- 3. 事件处理器通过合成事件对象 e 拿到改变后的状态，并更新应用的 state
- 4. setState 触发视图的重新渲染，完成表单组件值的更新


**textarea 元素**

在普通 HTML 中，`textarea` 元素是节点文本值
```html
<textarea>
  Hello there, this is some text in a text area
</textarea>
```
但在 React 中，该元素需要使用 `value` 属性。
```javascript
class Component1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: 'Hello React'
        }
    }
    change = (e) => {
        this.setState({text: e.target.value})
    }
    render(){
        return (
            <div>
                <textarea value={this.state.text} onChange={this.change}/>
            </div>
        )        
    }
}
```

**select 元素**

在普通 HTML 中， `select`元素要指定默认选中值，就得在对应的`option`中加上属性`selected`
```html
<select>
    <option value="grapefruit">Grapefruit</option>
    <option value="lime">Lime</option>
    <option selected value="coconut">Coconut</option>
    <option value="mango">Mango</option>
</select>
```
但在 React 中，只需要给定属性`value`即可
```javascript
class Component1 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            text: 'lime'
        }
    }
    change = (e) => {
        this.setState({text: e.target.value})
    }
    render(){
        return (
            <div>
                <select value={this.state.text} onChange={this.change}>
                    <option value="grapefruit">Grapefruit</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>                
            </div>
        )        
    }
}
```

#### 2.非受控组件

当一个表单组件没有 value props ( 单选按钮和复选框按钮对应的是 checked props )时，就可以称为非受控组件。相应的，可以使用 defaultValue 和 defaultChecked props来表示组件的默认状态。下面通过简单的示例来描述非受控组件。

要编写一个非受控组件，而非为每个状态更新编写事件处理程序，可以 使用 ref 从 DOM 获取表单值。

**普通 input 元素**
````js
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A name was submitted: ' + this.input.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" defaultValue="Hangzhou" ref={(input) => this.input = input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
````
**input file 元素**
因为`<input type="file">`是特殊的元素，它是只读的，所以在 React 中需要用 `ref` 来进行特殊处理
```javascript
class FileInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${this.fileInput.files[0].name}`
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input
            type="file"
            ref={input => {
              this.fileInput = input;
            }}

          />

        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

ReactDOM.render(
  <FileInput />,
  document.getElementById('root')
);
```
