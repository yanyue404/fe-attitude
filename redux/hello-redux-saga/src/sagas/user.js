import { takeEvery, call, put } from 'redux-saga/effects'
// { takeLatest } 类似节流函数，一段时间内只执行当前时间的最后一次结果
import axios from "axios";

function* fetchUser(){
  try {
    const user = yield call(axios.get, "https://jsonplaceholder.typicode.com/users");
    yield put({type: "FETCH_USER_SUCCESS", user: user});
  } catch (e) {
    yield put({type: "FETCH_USER_FAILURE", error: e.message});
  }
 
}

function* fetchTodos(){
  const todos = yield call(axios.get, "https://jsonplaceholder.typicode.com/todos");
  console.log(todos);
}

 function* watchFetchUser(){
  yield takeEvery("FETCH_USER_REQUEST",fetchUser)
}

function* watchFetchTodos(){
  yield takeEvery("FETCH_TODOS_REQUEST",fetchTodos)
}

export const userSagas = [
  watchFetchUser(),
  watchFetchTodos()
]
