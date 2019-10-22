import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//  import { increment, decrement } from './actions'; // 少量action 方法1
import * as types from './actions'; // 多个action 方法2
import { bindActionCreators } from 'redux';
import User from './components/User';

class App extends Component {

  render() {
    const { increment, decrement } = this.props;
    console.log(this.props);
    return (
      <div className="container">
        <h1 className="jumbotron-heading text-center">{this.props.counter}</h1>
        <p className="text-center">
          <button onClick={() => increment({ name: "xiaoyueyue", id: 77 })} className="btn btn-primary mr-2">Increase</button>
          <button onClick={() => decrement()} className="btn btn-danger my-2">Decrease</button>
        </p>
        <User />
      </div>
    );
  }
}

// state相当于 store.getState() 通过connect绑定到组件的props上进行获取
const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

// bindActionCreators(actionCreators, dispatch)
// 把一个 value 为不同 action creator 的对象，转成拥有同名 key 的对象。同时使用 dispatch 对每个 action creator 进行包装，以便可以直接调用它们。
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(types, dispatch); // 方法2
 /*  return {
    "increment": () => dispatch(increment()), // 方法1
    "decrement": () => dispatch(decrement()),
  } */
};


App.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
