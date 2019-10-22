import { put, takeEvery, call } from 'redux-saga/effects'
// { takeLatest } 类似节流函数，一段时间内只执行当前时间的最后一次结果
import { delay } from "redux-saga";
import { INCREMENT_ASYNC } from "../constants/counter";


// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Saga 作用函数：执行异步任务
function* incrementAsync(){
  yield call(delay ,2000);
  yield put({type:"INCREMENT"})
}

// Saga 监听函数：每次监听到 ```INCREMENT_ASYNC``` action ，都会触发一个新的异步任务
function* watchIncrementAsync () {
  yield takeEvery(INCREMENT_ASYNC, incrementAsync);
}

export const counterSagas = [
  watchIncrementAsync()
]
