# README

**直接使用全局数据**

```js
const appState = {
  content: {
    text: 'React.js',
    color: 'blue',
  },
};
```

缺点： appState 可以随意被更改，不好捕获错误
目标：优雅的共享数据

**直接使用全局数据优化**

- 用户必须使用 getState 获取数据
- 修改方式必须是自己维护的纯函数 `dispatch(action)`

```js
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
```

```html
<div id="content"></div>
  <script src="../utils/1.globalData.js"></script>
  <script>
    function renderApp() {
      const { content } = Bus.getState();
      renderContent(content);
    }

    function renderContent(content) {
      const contentDOM = document.getElementById('content');
      contentDOM.innerHTML = content.text;
      contentDOM.style.color = content.color;
    }
    renderApp(appState); // 首次渲染页面

    // 如何更新 appState
    store.dispatch({ type: 'UPDATE_TITLE_TEXT', text: '《React.js 小书》' }); // 修改标题文本
    store.dispatch({ type: 'UPDATE_TITLE_COLOR', color: 'blue' }); // 修改标题颜色

    // 更新 1.全局数据的导出，全局不可直接改变
    renderApp();
```
