## 组件通信

在这里只讲 React 组件与组件本身的通信，组件通信主要分为三个部分：

- 父组件向子组件通信：父组件向子组件传参或者是父组件调用子组件的方法
- 子组件向父组件通信：子组件向父组件传参或者是子组件调用父组件的方法
- 兄弟组件通信：兄弟组件之间相互传参或调用 建议不要有太深的的嵌套关系

## 父子组件

- 父组件向子组件传参
父组件向子组件参可以在子组件上绑定自定义属性，或者将父组件内部 state 的值进行绑定为子组件的属性值进行传递。
- 父组件调用子组件的方法
在子组件上绑定 ref 属性，并在子组件内部定义方法（可接受参数），在父组件内部使用 `this.refs.自定义属性值.函数方法名` 进行调用，可传递参数。
````js
// 父组件

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }
  handleChange(e,key){
    this.value = e.target.value;
    // 调用子组件的方法
    this.refs.c1.changeChild(this.value);
  }
  handleClick(){
    this.setState({
      value:this.value
    })
  }
  
  render () {
    return (
      <div>
        我是parent
        <input onChange={this.handleChange.bind(this,'key')} />
        <button className="button" onClick={this.handleClick.bind(this)}>通知</button>
        <div>
          <br />
        
          <Child ref="c1" value={this.state.value} />
        </div> 
      </div>
    )
  }
}
````
````js
// 子组件
class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    }
  }
  
  changeChild(text){
    this.setState({
      text:text
    })
  }
  render() {
    const {value} = this.props;
    
  return (
    <div>
    <p>我是Child,来自父组件的传参：{value}</p>
    <br/>
    <p>我是child，来自父组件的调用：{this.state.text}</p>
    </div>
  )
  }
}

````
## 子父组件

子组件向父组件传值，在被调用的子组件上先定义回调函数，再来单独的子组件上定义新的函数，通过 props 获取 callback 函数进行值传递.

> 这里的state可以分别定义在父组件或组子组件上

````js
// parent

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }

  setValue(param){
    console.log(param);
    this.setState({
      value:param
    })
  }

  render () {
    return (
      <div>
      <Child setValue = {this.setValue.bind(this)}></Child>
      <p>我是Parent,接受子组件的传参:{this.state.value}</p> 
      </div>
    )
  }
}
````

````js
// child
class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    }
  }
  handleChange(e){
    
    this.props.setValue(e.target.value);
  }

  render() {
    
  return (
 
    <div>
        我是child
        <input onChange={this.handleChange.bind(this)} />
        <br />
   </div>
  )
  }
}
````

## 兄弟组件

### 利用共同的父组件

先将两个子组件 `child1` 和 `child2` 的参数传递给父组件，再由分发参数，通过 `refs` 寻找函数方法的方式进行函数调用传参。
````js
 // Parent
 

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:''
    }
  }

  setValue2(param){
    this.refs.c1.changeState(param);
    this.setState({
      value:param
    })
  }

  setValue1(param){
    this.refs.c2.changeState(param);
    this.setState({
      value:param
    })
  }

  render () {
    return (
      <div>
        <p>我是Parent,接受子组件的传参:{this.state.value}</p> 
      
      <Child1 ref="c1" setValue = {this.setValue1.bind(this)} ></Child1>
      <Child2 ref="c2" setValue = {this.setValue2.bind(this)} ></Child2>
      </div>
    )
  }
}

````

````js
 // Child1
 
class Child1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    }
  }
  handleChange(e){
    this.props.setValue(e.target.value);
  }
  changeState(text){
        this.setState({text: text});
  }

  render() {
    
  return (
 
    <div>
        我是child1
        <input onChange={this.handleChange.bind(this)} />
        <p>来自子组件2的调用: {this.state.text}</p>
        <br />
   </div>
  )
  }
}
````

````js
// Child2
class Child2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text:''
    }
  }
  handleChange(e){
    this.props.setValue(e.target.value);
  }
  changeState(text){
        this.setState({text: text});
  }

  render() {
    
  return (
 
    <div>
        我是child1
        <input onChange={this.handleChange.bind(this)} />
        <p>来自子组件1的调用: {this.state.text}</p>
        <br />
   </div>
  )
  }
}
````
### 利用Context

````js
// 父组件
var Parent = React.createClass({
    getChildContext: function(){
        return {
            changeChildren1: function(text){
                this.refs.cp1.changeState(text)
            }.bind(this),
            changeChildren2: function(text){
                this.refs.cp2.changeState(text)
            }.bind(this)
        }
    },
    childContextTypes: {
        changeChildren1: React.PropTypes.func.isRequired,
        changeChildren2: React.PropTypes.func.isRequired
    },                
    render: function(){
        return (
            <div>
                <Children1 ref="cp1"/>
                <Children2 ref="cp2"/>
            </div>                        
        )                    
    }
}) 
````
````js
//子组件1
var Children1 = React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },
    contextTypes: {
        changeChildren2: React.PropTypes.func.isRequired
    },                         
    changeState: function(text){
        this.setState({text: text});
    },                  
    //输入事件
    change: function(event){
        //调用子组件的方法
        this.context.changeChildren2(event.target.value);
    },
    render: function(){
        return (
            <div>
                <p><label>子组件1</label><input type="text" onChange={this.change}/></p>
                <p>来自子组件2的调用-{this.state.text}</p>
            </div>                        
        )
    }
}) 
````
````js
//子组件2
var Children2= React.createClass({
    getInitialState: function(){
        return {
            text: ''
        }
    },   
    contextTypes: {
        changeChildren1: React.PropTypes.func.isRequired
    },                            
    changeState: function(text){
        this.setState({text: text});
    },  
    //输入事件
    change: function(event){
        //调用子组件的方法
        this.context.changeChildren1(event.target.value);
        
    },
    render: function(){
        return (
            <div>
                <p><label>子组件2</label><input type="text" onChange={this.change}/></p>
                <p>来自子组件1的调用-{this.state.text}</p>
            </div>                        
        )
    }
}); 
````


