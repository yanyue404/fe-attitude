import { createStore, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const logger = function(store) {
  return function(next) {
    return function(action) {
      console.log('dispatching...', action);
      let result = next(action);
      console.log('next State', store.getState());
      return result;
    };
  };
};

const yue = store => next => action => {
  console.log('yue');
  var result = next(action);
  return result;
};

const error = store => next => action => {
  try {
    next(action);
  } catch (e) {
    console.log('error', e);
  }
};

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(logger, yue, error, thunk, promise()))
  );

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        store.replaceReducer(rootReducer);
      });
    }
  }

  return store;
};

export default configureStore;
