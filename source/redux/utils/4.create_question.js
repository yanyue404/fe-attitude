const appState = {
  title: {
    text: 'React.js 小书',
    color: 'red',
  },
  content: {
    text: 'React.js 小书内容',
    color: 'blue',
  },
};
function createStore(state, stateChanger) {
  // 维护一个监听队列
  let listeners = [];
  const getState = () => state;
  const dispatch = action => {
    stateChanger(state, action);
    // dispatch 的时候响应订阅的内容
    listeners.forEach(listener => listener());
  };
  const subscribe = fn => listeners.push(fn);
  return { getState, dispatch, subscribe };
}

// 更新维护
function updateState(state, action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      state.content.text = action.text;
      break;
    case 'UPDATE_TITLE_COLOR':
      state.content.color = action.color;
      break;
    default:
      return state;
  }
}
