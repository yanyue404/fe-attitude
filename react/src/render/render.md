## 组件渲染

### 1.条件渲染（动态组件）

很多情况下组件是动态渲染的，比如登录状态，如果已登录则显示退出登录，否则显示登录

```js
class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }
  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick.bind(this)} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick.bind(this)} />;
    }
    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
}
```

- 变量存储元素

```js
 render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LoginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    );
  }
```

- 与运算 &&

```js
function Mailbox(props) {
  const unreadMessages = props.unreadMessages;
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && (
        <h2>You have {unreadMessages.length} unread messages.</h2>
      )}
    </div>
  );
}

const messages = ["React", "Re: React", "Re:Re: React"];
ReactDOM.render(
  <Mailbox unreadMessages={messages} />,
  document.getElementById("root")
);
```

- 三目运算符

```js
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      The user is <b>{isLoggedIn ? 'currently' : 'not'}</b> logged in.
    </div>
  );
}
```

### 2.列表渲染

React 没有指令，所以在列表渲染时得借助数组来完成。

#### 简单实现

jsx 语法可以直接渲染内容为 html 代码的数组，也可以写成函数式组件

```js
var arr = [<h1 key="1">Hello,world!</h1>, <h2 key="2">React is awesome.</h2>];
ReactDOM.render(<div>{arr}</div>, document.getElementById("example"));
```

#### 2.1 数组 map 方法

```js
const Component = () => {
  var names = ["yue", "niuniu", "laoshi"];
  let lis = [];
  names.map(function(name, index) {
    lis.push(<li key={index}>hello,{name}!</li>);
  });
  return (
    <div>
      <ul>{lis}</ul>
    </div>
  );
};
ReactDOM.render(<Component />, document.getElementById("example"));
```

#### 2.2 this.props.children

因为组件的调用是将组件当成一个 DOM 节点使用，所以组件里面可以包含子节点。React 对组件的子节点通过 `this.props.children` 来获取，通常 `this.props.children` 会有以下几种情况

1. 如果当前组件没有子节点，它就是 undefined
2. 如果有一个子节点，数据类型是 object
3. 如果有多个子节点，数据类型就是 array

为了解决这种数据类型不一致导致在使用的过程中要不断判断的情况，React 提供了一个方法 `Reacth.Children` 来处理该属性:

```js
class NotesList extends React.Component {
  render() {
    return (
      <ol>
        {React.Children.map(this.props.children, function(child) {
          return <li>{child}</li>;
        })}
      </ol>
    );
  }
}
ReactDOM.render(
  <NotesList>
    <span>hello</span>
    <span>world</span>
  </NotesList>,
  document.getElementById("example")
);
```

### 3.keys

Keys 可以在 DOM 中的某些元素被增加或删除的时候帮助 React 识别哪些元素发生了变化。因此要给数组中的每一个元素赋予一个确定的标识。

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的 id 作为元素的 key ,在 id 没有确定的值时，也使用他的序列号索引 index 作为 key 。

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(number => (
  <li key={number.toString()}>{number}</li>
));
```

#### 用 keys 提取组件

元素的 key 只有在它和它的兄弟节点对比时才有意义。

比方说，如果你提取出一个 `ListItem` 组件，你应该把 key 保存在数组中的这个 `<ListItem />` 元素上，而不是放在 `ListItem` 组件中的 `<li>` 元素上。

**错误的示范**

```js
function ListItem(props) {
  const value = props.value;
  return (
    // 错啦！你不需要在这里指定key:
    <li key={value.toString()}>{value}</li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => (
    //错啦！元素的key应该在这里指定：
    <ListItem value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

**key 的正确使用方式**

```js
function ListItem(props) {
  // 对啦！这里不需要指定key:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map(number => (
    // 又对啦！key应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

### 4.ajax

在 `componentDidMount` 方法里获取渲染的数据,用 `setState()` 设置， render 渲染从 github 获取的 star 项目处理为表单。

```js
class RepoList extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      error: null,
      data: null
    };
  }
  componentDidMount() {
    this.props.promise.then(
      value => this.setState({ loading: false, data: value }),
      error => this.setState({ loading: false, error: error })
    );
  }
  render() {
    if (this.state.loading) {
      return <span>Loading...</span>;
    } else if (this.state.error !== null) {
      return <span>Error: {this.state.error.message}</span>;
    } else {
      var repos = this.state.data.items;
      var repoList = repos.map(function(repo, index) {
        return (
          <li key={index}>
            <a href={repo.html_url}>{repo.name}</a> ({repo.stargazers_count}{" "}
            stars) <br /> {repo.description}
          </li>
        );
      });
      return (
        <main>
          <h1>Most Popular JavaScript Projects in Github</h1>
          <ol>{repoList}</ol>
        </main>
      );
    }
  }
}

ReactDOM.render(
  <RepoList
    promise={$.getJSON(
      "https://api.github.com/search/repositories?q=javascript&sort=stars"
    )}
  />,
  document.getElementById("example")
);
```
