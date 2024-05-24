import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './utils/connect';

class ThemeSwitch extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };

  constructor() {
    super();
    this.state = { themeColor: '' };
  }

  handleSwitchColor(color) {
    const { store } = this.context;
    store.dispatch({ type: 'CHANGE_COLOR', themeColor: color });
  }

  render() {
    return (
      <div>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'red')}
        >
          Red
        </button>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, 'blue')}
        >
          Blue
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    themeColor: state.themeColor,
  };
};

export default connect(mapStateToProps)(ThemeSwitch);
