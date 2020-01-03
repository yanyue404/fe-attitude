## 常用

> windows 版本

```bash
# 跳转到类型定义信息
F12

# 预览定义信息，Escape 关闭 预览窗口
Alt + F12

# 返回到上次/下次光标位置
Alt + ⬅/➡

# 多行游标
SHIFT  + Alt + 左键点击或下拉
```

## 自定义快捷键

```json
// 将键绑定放入此文件中以覆盖默认值
[
  // ctrl+d 删除一行
  {
    "command": "editor.action.copyLinesDownAction",
    "key": "ctrl+d",
    "when": "editorTextFocus && !editorReadonly"
  },
  {
    "key": "alt+q",
    "command": "extension.viewInBrowser",
    "when": "editorTextFocus"
  },
  // ctrl+shift+/多行注释
  {
    "key": "ctrl+shift+/",
    "command": "editor.action.blockComment",
    "when": "editorTextFocus"
  },
  //回车换行
  {
    "key": "shift+enter",
    "command": "editor.action.insertLineAfter",
    "when": "editorTextFocus && !editorReadonly"
  },
  // 预览 markdown
  {
    "key": "ctrl+shift+m",
    "command": "markdown.showPreview",
    "when": "editorLangId == 'markdown'"
  },
  // 浏览器预览
  {
    "key": "alt+1",
    "command": "extension.openInDefaultBrowser"
  }
]
```

<iframe src="https://codesandbox.io/embed/nifty-waterfall-4i2dq?fontsize=14" title="nifty-waterfall-4i2dq" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>
