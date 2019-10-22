import React from 'react';
import './App.css';
// import ParentToChild from './components/parentToChild/Parent';
// import SonToFather from './components/sonToFather/Father';
import List1 from './components/eventCenter/List1';
import List2 from './components/eventCenter/List2';
import emitter from './util/events';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'msgFromApp'
    };
  }
  componentDidMount() {
    // 组件装载完成以后声明一个自定义事件
    this.eventEmitter = emitter.addListener('changeMessageApp', message => {
      console.log(message);

      this.setState({
        message
      });
    });
  }
  render() {
    return (
      <div className="App">
        {/* 父传子 */}
        {/* <ParentToChild /> */}
        {/* 子传父 */}
        {/* <SonToFather /> */}
        <List1 msg={this.state.message} />
        <List2 />
      </div>
    );
  }
}

export default App;
