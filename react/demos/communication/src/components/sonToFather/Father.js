import React from 'react';
import Son from './son';
class Father extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  setValue(param) {
    this.setState({
      value: param
    });
  }

  render() {
    return (
      <div>
        <Son setValue={this.setValue.bind(this)}></Son>
        <p>我是Father,接受子组件的传参:{this.state.value}</p>
      </div>
    );
  }
}

export default Father;
