import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from "./reducers";
import { Provider } from 'react-redux';

const error = store => next => action => {
  try {
    next(action)
  } catch (e) {
    console.log('error', e)
  }
}


// const logger = function(store) {
//   return function(next) {
//     return function(action) {
//       console.log("dispatching...",action);
//       let result = next(action); // 返回下一个中间件
//       console.log("next State",store.getState());
//       return result;
//     }
//   }
// }

const store = createStore(reducer, {}, composeWithDevTools(applyMiddleware(logger, error ,thunk, promise())));

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
