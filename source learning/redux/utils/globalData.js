const appState = {
  content: {
    text: 'React.js',
    color: 'blue',
  },
};
const Bus = (() => {
  return {
    getState() {
      return appState;
    },
  };
})();

// 更新维护
function dispatch(action) {
  switch (action.type) {
    case 'UPDATE_TITLE_TEXT':
      appState.content.text = action.text;
      break;
    case 'UPDATE_TITLE_COLOR':
      appState.content.color = action.color;
      break;
    default:
      break;
  }
}
