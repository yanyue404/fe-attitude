import { INCREMENT, INCREMENT_ASYNC } from '../constants/counter';

export const increment = () => {
  return {
    type: INCREMENT
  }
};

export const increment_ASYNC = ()=>{
  return {
    type:INCREMENT_ASYNC
  }
}