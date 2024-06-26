import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ThemeSwitch from './ThemeSwitch';
import { connect } from './v2 create connect & mapStateFromProps/utils/connect';

class Content extends Component {
  static propTypes = {
    themeColor: PropTypes.string,
  };

  render() {
    return (
      <div>
        <p style={{ color: this.props.themeColor }}>React.js 小书内容</p>
        <ThemeSwitch />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    themeColor: state.themeColor,
  };
};
export default connect(mapStateToProps)(Content);
