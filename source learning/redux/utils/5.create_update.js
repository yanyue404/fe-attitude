function createStore(state, stateChanger) {
  // 维护一个监听队列
  let listeners = [];
  const getState = () => state;
  const dispatch = action => {
    state = stateChanger(state, action); // 覆盖原对象
    // dispatch 的时候响应订阅的内容
    listeners.forEach(listener => listener());
  };
  const subscribe = fn => listeners.push(fn);
  return { getState, dispatch, subscribe };
}

// 更新维护（纯函数）
function updateState(state, action) {
  switch (action.type) {
    // state 不能再直接修改原先的引用，否则无法判断 newAppState, oldAppState
    // 需要在 dispatch 操作中 重新拷贝并赋值给原始 state（更新）
    case 'UPDATE_TITLE_TEXT':
      return {
        // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          text: action.text,
        },
      };
      break;
    case 'UPDATE_TITLE_COLOR':
      return {
        // 构建新的对象并且返回
        ...state,
        title: {
          ...state.title,
          color: action.color,
        },
      };
      break;
    default:
      return state;
  }
}
