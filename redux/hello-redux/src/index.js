import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux';
import reducer from "./reducers/counter";
import { increment, decrement } from './actions';

const store = createStore(reducer);

// store.subscribe(() => console.log("State updated!", store.getState()));

const render = () => {
  ReactDOM.render(
    <App
      onIncrement={() => store.dispatch(increment())}
      onDecrement={() => store.dispatch(decrement())}
      value={store.getState()}
    />, document.getElementById('root'));
}

render();

store.subscribe(render)

registerServiceWorker();
