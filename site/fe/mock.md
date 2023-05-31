## 前端常见需求

## input 搜索如何防抖，如何处理中文输入

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/129

参考 vue 源码对 v-model 的实现中，对输入中文的处理

```html
<input id="myinput" />
```

```js
function jeiliu(timeout) {
  var timer
  function input(e) {
    if (e.target.composing) {
      return
    }
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      console.log(e.target.value)
      timer = null
    }, timeout)
  }
  return input
}

function onCompositionStart(e) {
  e.target.composing = true
}
function onCompositionEnd(e) {
  //console.log(e.target)
  e.target.composing = false
  var event = document.createEvent('HTMLEvents')
  event.initEvent('input')
  e.target.dispatchEvent(event)
}
var input_dom = document.getElementById('myinput')
input_dom.addEventListener('input', jeiliu(1000))
input_dom.addEventListener('compositionstart', onCompositionStart)
input_dom.addEventListener('compositionend', onCompositionEnd)
```

1.  防抖

```js
function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    const ctx = this
    if (timer) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(() => {
        fn.bind(ctx, ...args)
      }, delay)
    }
  }
}

const handlerChange = ev => {
  console.log(ev.target.value)
}
const handlerDebChange = debounce(handlerChange, 1e3)

;<input onChange={handlerDebChange} />
```

2.  通过 合成事件 来判断区分 非英文 输入法\
    可以通过一个 flag isInCompos 来判断 字符真正输入到 input 或 textarea 中的时机\
    compositionstart isInCompos=true\
    compositionupdate isInCompos=true\
    compositionend isInCompos=false

## 如何设计实现无缝轮播

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/108

## 实现模糊搜索结果的关键词高亮显示

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/141

## 参考

- [【1 月最新】前端 100 问：能搞懂 80% 的请把简历给我](https://juejin.cn/post/6844903885488783374)
- https://muyiy.cn/question/
