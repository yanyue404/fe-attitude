import { combineReducers } from 'redux';
import counter from './counter';
import user from './user';

// 合并操作
const  rootReducer = combineReducers({
  counter,
  user
})

export default rootReducer;