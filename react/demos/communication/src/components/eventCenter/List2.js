import React, { Component } from 'react';
import emitter from '../../util/events';
class List2 extends Component {
  handleClick = message => {
    emitter.emit('changeMessage', message);
  };
  handleClick2 = message => {
    emitter.emit('changeMessageApp', message);
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this, 'List2')}>
          点击我改变List1组件中显示信息
        </button>
        <button onClick={this.handleClick2.bind(this, 'List2App')}>
          点击我改变App组件中显示信息
        </button>
      </div>
    );
  }
}

export default List2;
