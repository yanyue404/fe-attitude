import axios from 'axios';
import { INCREMENT, DECREMENT } from '../constants';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE
} from '../constants';
import { LOAD_USER } from '../constants';

export const increment = () => {
  // return dispatch => {
  //   setTimeout(() => {
  //     dispatch({
  //       type: INCREMENT
  //     })
  //   }, 3000);
  // }
  return {
    type: INCREMENT,
    payload: new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('rails365');
      });
    })
  };
};

export const decrement = () => {
  return {
    type: DECREMENT
  };
};

export const get_user = () => {
  // return dispatch => {
  //   dispatch(fetch_user_request()); // 请求之前先 dispatch ， 确认isFetching 状态
  //   axios.get("https://randomuser.me/api/")
  //     .then(res => {
  //       dispatch(fetch_user(res.data.results[0]));
  //     })
  //     .catch(error => {
  //       console.log(error)
  //       dispatch(fetch_user_failure(error.response.data))
  //     })
  // }
  return {
    type: LOAD_USER,
    // payload:axios.get("https://randomuser.me/api/")
    payload: {
      promise: axios.get('https://randomuser.me/api/')
    }
  };
};

// export const fetch_user = user => {
//   return {
//     type: FETCH_USER_SUCCESS,
//     user
//   };
// };

// export const fetch_user_request = () => {
//   return {
//     type: FETCH_USER_REQUEST
//   };
// };

// export const fetch_user_failure = error => {
//   return {
//     type: FETCH_USER_FAILURE,
//     error
//   };
// };
