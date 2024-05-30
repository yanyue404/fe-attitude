React存在的意义就是状态与UI分离，使开发者不知有DOM，无论魏晋。

不过有些状态是无法与UI分离的，比如说表单的聚焦，复杂的动画等等。

怎么办？在React完全控制DOM之前，它还是给开发者留了后门。

## this.refs

> 💀这是React不再推荐使用的API。

每一个class组件实例化的时候都会挂载一个refs属性，它就是用来存储DOM引用的。

在DOM元素上传入一个值是字符串的`ref`属性，开发者就获得了该DOM元素的引用，我们可以在`this.refs`对象下面找到它。

既然是获取DOM元素的引用，那肯定要等组件挂载完成才能操作它。

不过React已经不推荐这种写法。主要是它比较耗性能，因为UI会经历很多次更新，而字符串引用无法自动跟踪DOM的变化，React要做一些额外的处理。

也许将来某个版本我们就看不到实例的refs属性了。

```javascript
import React, { Component } from 'react';

class App extends Component {
    componentDidMount() {
        this.refs.textInput.focus();
    }
    
    render() {
        return (
            <input type="text" ref="textInput" />
        );
    }
}

export default App;
```

## callback

React还支持用一个回调接收DOM元素的引用。

但是记住，回调不可以写成`el => this.refs.textInput = el`，因为`this.refs`是不可以直接进行写操作的。

```javascript
import React, { Component } from 'react';

class App extends Component {
    componentDidMount() {
        this.textInput.focus();
    }
    
    render() {
        return (
            <input type="text" ref={el => this.textInput = el} />
        );
    }
}

export default App;
```

当然，回调神通广大，比如说，它会穿墙术。

依然是使用回调接收DOM元素的引用，不过这次的回调是父组件通过props传下来的。

一旦子组件挂载完成，就会执行ref回调，父组件就得到子组件某个DOM元素的引用了。

```javascript
import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
    getInputRef = (ref) => {
        this.node = ref;
    }
    
    render() {
        return (
            <Search ref={this.getInputRef} />
        );
    }
}

export default App;
```

```javascript
import React from 'react';

const Search = (props) => (
    <input type="text" ref={props.getInputRef} />
);

export default Search;
```

## createRef

> 👽这是React v16.3.0发布的API。

`createRef`的作用就是创建一个ref对象。

先把`createRef`的执行结果返回给一个实例属性，然后通过该实例属性获得DOM元素的引用。

注意事项：

- `createRef`初始化动作要在组件挂载之前，如果是挂载之后初始化，则无法得到DOM元素的引用。
- 真正的DOM元素引用在current属性上。

```javascript
import React, { Component, createRef } from 'react';

class App extends Component {
    textInput = createRef();

    componentDidMount() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <input type="text" ref={this.textInput} />
        );
    }
}

export default App;
```

出于不可描述的原因，如果你想获取一个子组件的ref引用，那么子组件必须是class组件。

因为你获取的实际上是子组件的实例，而函数式组件是没有实例的。

所有获取ref引用的方式，如果想要获取子组件而不是DOM元素，子组件都不能是函数式组件。

```javascript
import React, { Component, createRef } from 'react';
import Child from './Child';

class App extends Component {
    childRef = createRef();

    render() {
        return (
            <Child ref={this.childRef} />
        );
    }
}

export default App;
```

## forwardRef

> 👽这是React v16.3.0发布的API。

使用回调可以获取子组件的DOM元素引用，不过这种技巧终究是hack。

所以贴心的React为我们提供了一个会穿墙术的武林正派。

父组件的写法并没有什么特别，只不过这次`createRef`返回的结果不是传给自己的某个DOM元素，而是子组件。

关键在于子组件，子组件把自己整个作为参数传给了`forwardRef`，然后子组件就在props参数之外，获得了ref参数，再把ref参数赋值给某个DOM元素的ref属性。

发现了吗？`forwardRef`充当的是一个传递者的角色，它实际上是一个容器组件。

向前传递，这就是叫`forwardRef`的原因。

需要特别注意，使用`forwardRef`时，该组件必须是函数式组件。原因可能是React不想破坏class组件的参数体系。

诶，前面不是说了获取组件的ref引用时不能使用函数式组件么？

仔细看，两者是有本质区别的，这里获取的依然是DOM元素，只不过跨级了。

```javascript
import React, { Component, createRef } from 'react';
import Search from './Search';

class App extends Component {
    textInput = createRef();

    componentDidMount() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <Search ref={this.textInput} />
        );
    }
}

export default App;
```

```javascript
import React, { forwardRef } from 'react';

const Search = forwardRef((props, ref) => (
    <input type="text" ref={ref} />
));

export default Search;
```

既然跨级，能不能玩大点？

当然可以。

事实上，一旦被`forwardRef`包裹的子组件接收到了ref参数，它可以继续将ref往下传递。通过什么传递，当然是props啦！

之后ref就变成了一个普通的props，任你差遣，直到它被挂载到某个DOM元素的ref属性上。

发现没有，再往下就不区分class组件和函数式组件了，因为class组件和函数式组件都可以接收props。它的任务只是帮某个不知道多少代的祖先把这个特定的prop挂载到特定的DOM元素上。

其实ref回调也是可以跨多级传递的，原理同上。

```javascript
import React, { Component, createRef } from 'react';
import Search from './Search';

class App extends Component {
    textInput = createRef();

    render() {
        return (
            <Search ref={this.textInput} />
        );
    }
}

export default App;
```

```javascript
import React from 'react';
import Input from './Input';

const Search = forwardRef((props, ref) => (
    <Input inputRef={ref} />
));

export default Search;
```

```javascript
import React, { Component } from 'react';

class Input extends Component {
    render() {
        return (
            <input type="text" ref={this.props.inputRef} />
        );
    }
}

export default Input;
```