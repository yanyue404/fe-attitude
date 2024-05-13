话说 PHP 是世界上最好的语言(笑)。

因为它的入门门槛极低。

```php
<?php
$str = '<ul>';
foreach ($fruits as $fruit) {
    $str += '<li>' . $fruit . '</li>';
}
$str += '</ul>';
?>
```

很多年前，这种字符串拼接开发网页的方式非常流行。

但是这种写法有两个问题：

- 容易造成 XSS 注入，有极大的安全风险。
- 拼接的写法很繁琐。

于是 facebook 的工程师开始动歪脑筋了。

## XHP

他们的解决方案也很新颖，就是在代码里直接写标签，而不是将标签视为字符串。

前面说到，字符串拼接很容易造成 XSS 注入。那么什么是 XSS 注入呢？

比如恶意用户输入这么一段内容：`<script>code</script>`，就可能被程序识别为一段脚本，他可以在脚本里面干任何事情。

于是人们想到的办法是对所有输入转义，转义的作用就是让所有标签无法被识别为标签，而只是标签写法的字符串。用户的输入就会原原本本的展示在页面上。

但是输入转义也有问题，就是容易把字符串拼接的标签也给转义了。大家应该看过页面上大段大段的标签写法的文本吧。

我们来看看 XHP 的写法。

```php
<?hh
$post =
    <div class="post">
        <h2>{$post}</h2>
        <p><span>Hey there.</span></p>
        <a href={$like_link}>Like</a>
    </div>;
```

诶，是不是有点眼熟？

XHP 把标签与字符串区别开来了，变成脚本语法的一部分。

这正好解决了前面提到的两个问题：

- 标签就是标签，字符串就是字符串，再也别想浑水摸鱼。
- 像写脚本一样写标签，是不是爽多了？

## JSX

其实 facebook 一直在前端组件化方面做各种尝试，但都不是特别成功。

直到 2013 年，工程师 Jordan Walke 提出一个大胆的想法：把 XHP 的写法迁移到 JavaScript 中来。即便有 XHP 的案例在前，大家还是觉得这个想法很疯狂。

不过，facebook 极为优秀的工程师文化最终促成了这种尝试。这一尝试不得了，开了天眼。

自此之后就开启了 React 的开挂之路。

```javascript
const element = <h1>Hello React!</h1>
```

这不就是 facebook 一直在苦苦求索的前端组件化方案吗？

刀耕火种时期的前端，入口是 HTML，脚本和样式被引入到 HTML 页面上。这是一种分离化的思想，以语言为最小颗粒。

然而经过大量痛苦的实践，人们发现以内容为最小颗粒才是正解。以组件为单位，页面结构、样式和功能都被集成在组件内部，对开发者来说组件就是一个黑匣子，只能通过暴露出来的接口使用组件。这是一种封装的思想，目的当然是为了复用。

当然，目前 React 还无法实现真正意义上的 CSS 封装，不过以当下前端的关注度，CSS 被彻底招安也指日可待。

#### 语法

标签的写法和 HTML 一样，只不过融入到了 JavaScript 中。

组件，其实就是自定义标签，首字母必须大写，为了与原生标签区别开来。

如果标签或组件没有包含内容，可以采用自闭合标签写法。

```javascript
const element = <App />
```

JSX 会自动忽略`false`、`null`和`undefined`。

标签的`class`属性和`for`属性要用`className`属性和`htmlFor`属性代替。

组件返回多个标签或多个组件必须要用一个标签或组件包裹，也就是说只能有一个顶层元素。

但是，React16 以上的版本支持用空标签包裹或者直接返回数组。这样的好处就是不必添加很多无用的标签使页面变得更加臃肿。

```javascript
import React, { Fragment } from 'react'

const App = () => {
  return (
    <Fragment>
      <div>React</div>
      <div>Vue</div>
      <div>Angular</div>
    </Fragment>
  )
}

export default App
```

```javascript
import React from 'react'

const App = () => {
  return (
    <>
      <div>React</div>
      <div>Vue</div>
      <div>Angular</div>
    </>
  )
}

export default App
```

```javascript
import React from 'react'

const App = () => {
  return [<div key="1">React</div>, <div key="2">Vue</div>, <div key="3">Angular</div>]
}

export default App
```

#### 表达式

标签里肯定要写一些变量，要不然页面就是死的。

怎么写变量呢？用花括号包围。

```javascript
const name = 'React'
const element = <h1>Hello {name}!</h1>
```

如果我想插入一个对象字面量怎么办？

很简单，再包裹一层花括号。

```javascript
const obj = { name: 'React' }
const element = <h1 style={{ color: '#f66' }}>Hello {name}!</h1>
```

实际上花括号语法支持所有的表达式。

那么问题来了，什么是表达式？

简单来讲，表达式的主要作用是计算和声明，总是有返回值。与之相对，语句的主要作用是逻辑和动作，没有返回值。

以下表达式 JSX 都支持。

```javascript
const a = <button onClick={() => console.log('react')}>click</button>

const b = (
  <button
    onClick={function() {
      console.log('react')
    }}
  >
    click
  </button>
)

const c = <div>{popular ? 'react' : 'vue'}</div>

const d = <div>{popular && 'react'}</div>

const e = <div>{renderSomething()}</div>
```

像赋值语句、判断语句和循环语句 JSX 都不支持。

那开发者要渲染一个列表怎么办？

for 循环语句肯定是不行的，好在我们有 map 函数。因为从上例我们知道，JSX 是支持函数执行表达式的。

forEach 函数行不行呢？不行，因为它没有返回值。也就是说，filter、find、reduce 等有返回值的遍历函数都是可以的。

```javascript
import React, { Component } from 'react'

const list = ['react', 'vue', 'angular']

class App extends Component {
  render() {
    return (
      <div>
        {list.map(value => (
          <div key={value}>{value}</div>
        ))}
      </div>
    )
  }
}

export default App
```

#### 编译

不知道你们有没有这样的疑问：

- 为什么返回多个标签或组件必须要用一个标签或组件包裹？
- 为什么在根本没有使用`React`这个变量的情况下还要`import React`？

这里就要讲到 JSX 的编译。

因为 JSX 不是正确的 JavaScript 语法，它要经过编译才能被浏览器识别。

目前 JSX 的编译工作是由 babel 来完成的。

我们来看看编译都做了哪些工作。

下面的例子，后者是前者编译后的结果。

```javascript
const app = (
  <div className="form">
    <input type="text" />
    <button>click</button>
  </div>
)
```

```javascript
const app = React.createElement(
  'div',
  { className: 'form' },
  React.createElement('input', { type: 'text' }),
  React.createElement('button', null, 'click')
)
```

可以看到，标签最后变成了一个函数执行表达式，第一个参数是标签名，第二个参数是属性集合，之后的参数都是子标签。

看到这里，相信也不用我解释了，前面提出的两个问题恍然大悟。

整个 UI 实际上是通过层层嵌套的`React.createElement`方法返回的，所以我们要在文件开头`import React`，否则编译后就会发现`createElement`没有定义。

`React.createElement`执行的结果是一个对象，对象的属性描述了标签或组件的性状，对象再嵌套子对象。如果顶层返回多个标签，就无法表达为一个对象了。

由于 React16 引入了 Fiber 机制，使得返回多标签成为可能(并不清楚原因)。

同时也回答了为什么标签的`class`属性和`for`属性要用`className`属性和`htmlFor`属性代替。在标签里属性怎么写都无所谓，但是`class`和`for`是 JavaScript 中的关键字，所以要换一种写法。

React 里面传递 props 有一种写法，如果传递的是一个对象，可以用扩展运算符很方便的传递。

下面的例子，`value`先是被扩展运算符将属性分解，然后又被一个对象包裹。这里只是做了一个浅拷贝，并没有其他的含义。所以最终传递给组件的仍然是一个对象。

所以疑问就来了，通常给组件传递属性都是键值对的形式，直接传递一个对象也可以吗？

其实所有的属性最后都会放到一个对象里面，所以两种写法殊途同归。React 只不过给了一种快捷方式。

了解编译的过程，很多写法都很好理解了。

```javascript
const value = { a: 1, b: 2 }
const element = <App a={value.a} b={value.b} />
```

```javascript
const value = { a: 1, b: 2 }
const element = <App {...value} />
```
