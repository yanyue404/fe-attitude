import React, { Component } from 'react';
import emitter from '../../util/events';
class List1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'List1',
    };
  }
  componentDidMount() {
    // 组件装载完成以后声明一个自定义事件
    this.eventEmitter = emitter.addListener('changeMessage', message => {
      this.setState({
        message,
      });
    });
  }
  componentWillUnmount() {
    emitter.removeListener(this.eventEmitter);
  }
  render() {
    return (
      <div>
        {this.state.message} {this.props.msg}
      </div>
    );
  }
}
export default List1;
