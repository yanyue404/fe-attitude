import React from 'react';
import Child from './child';

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  handleChange(e) {
    this.value = e.target.value;
    // 调用子组件的方法
    this.refs.c1.changeChild(this.value);
  }
  handleClick() {
    this.setState({
      value: this.value,
    });
  }

  render() {
    return (
      <div>
        我是parent
        <input onChange={this.handleChange.bind(this)} />
        <button className="button" onClick={this.handleClick.bind(this)}>
          通知
        </button>
        <div>
          <Child ref="c1" value={this.state.value} />
        </div>
      </div>
    );
  }
}

export default Parent;
