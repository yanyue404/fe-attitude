const appState = {
  content: {
    text: 'React.js',
    color: 'blue',
  },
};

function createStore(state, stateChanger) {
  const getState = () => state;
  const dispatch = action => stateChanger(state, action);
  return { getState, dispatch };
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
