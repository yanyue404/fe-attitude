import React, { Component } from 'react';

// 提供数据初始化
export default (WrappedComponent, name) => {
  class NewComponent extends Component {
    constructor() {
      super();
      this.state = { data: null };
    }

    componentWillMount() {
      let data = localStorage.getItem(name);
      this.setState({ data });
    }

    render() {
      return <WrappedComponent data={this.state.data} />;
    }
  }
  return NewComponent;
};
