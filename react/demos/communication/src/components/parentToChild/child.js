import React from 'react';

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  changeChild(text) {
    this.setState({
      text: text,
    });
  }
  render() {
    return (
      <div>
        <p>我是Child,接受来自父组件的传参：{this.props.value}</p>
        <br />
        <p>我是child，来自父组件对组件内部函数的的调用：{this.state.text}</p>
      </div>
    );
  }
}

export default Child;
