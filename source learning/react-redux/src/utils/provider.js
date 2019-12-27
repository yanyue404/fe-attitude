import React, { Component } from 'react';
import PropTypes from 'prop-types';
export class Provider extends Component {
  static propTypes = {
    store: PropTypes.object,
    children: PropTypes.any,
  };

  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}
