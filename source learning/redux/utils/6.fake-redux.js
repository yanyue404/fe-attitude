function createStore(stateChanger) {
  let state = null;
  const listeners = [];
  const subscribe = listener => listeners.push(listener);
  const getState = () => state;
  const dispatch = action => {
    state = stateChanger(state, action);
    listeners.forEach(listener => listener());
  };
  dispatch({}); // 初始化 state
  return { getState, dispatch, subscribe };
}
