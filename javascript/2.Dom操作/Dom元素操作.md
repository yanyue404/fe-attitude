## dom

### querySelector

```js
var matches = document.querySelectorAll('#departmentdadio input,div.alert')
var matchesArray = Array.prototype.slice.call(matches)

matchesArray.push(document.querySelector('[yue-a]'))
```

- 选中最后一个类

```html
<div id="content">
  <div class="gap">1</div>
  <div class="gap">2</div>
  <div class="gap">3</div>
</div>
```

```js
// 这里必须保证.gap是被外层元素包含的状态，下面写法可省略 #content
document.querySelector('#content .gap:last-child')
```

- 鼠标移入变化

```js
logo.onmouseover = function() {
  this.style.cursor = 'pointer'
}
```

### classList

```js
// div是具有class =“foo bar”的<div>元素的对象引用
div.classList.remove('foo')
div.classList.add('anotherclass')

// 如果visible被设置则删除它，否则添加它
div.classList.toggle('visible')

// 添加/删除 visible，取决于测试条件，i小于10
div.classList.toggle('visible', i < 10)

alert(div.classList.contains('foo'))

//添加或删除多个类
div.classList.add('foo', 'bar')
div.classList.remove('foo', 'bar')
```

### contains

判断 node 元素内部是否含有 otherNode 节点

```js
node.contains(otherNode)
var isTure = document.body.contains(document.querySelector('div'))
```

### matches

如果元素被指定的选择器字符串选择，**Element.matches()**方法返回 true;否则返回 false。有一些浏览器使用前缀, 在非标准名称 matchesSelector () 下实现了这个方法!

#### 语法

```js
let result = element.matches(selectorString)
```

- result 的值为 true 或 false.

- selectorString 是个 css 选择器字符串.

### 类数组对象转化为真正的 javascript 数组(NodeList)

```js
// jQuery
$.makeArray(arrayLike)

// Native
Array.prototype.slice.call(arrayLike)

// ES6-way
Array.from(arrayLike)
```

### DOMContentLoaded 事件

```js
// jQuery
$(document).ready(eventHandler)

// Native
// 检测 DOMContentLoaded 是否已完成
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  eventHandler()
} else {
  document.addEventListener('DOMContentLoaded', eventHandler)
}
```

### style 与 setAttribute

```js
imgsArray[0].style.src = './img/wait.png' //错误
imgsArray[i].setAttribute('src', './img/wait.png') //正确
```

### 搜索元素

```html
<body>
  <input type="checkbox" value="" />

  <ul class="box">
    <li class="gap">1</li>
    <li class="gap">2</li>
    <li class="gap">3</li>
  </ul>
</body>

<script>
  document.querySelector('input[type="checkbox"]').setAttribute('checked', 'true')
  document.querySelector('.gap:last-child').style.color = 'orange'
</script>
```

有 6 种主要的方法，可以在 DOM 中搜索元素节点：

| 方法名                   | 搜索方式     | 可以在元素上调用？ | 实时的？ |
| ------------------------ | ------------ | ------------------ | -------- |
| `querySelector`          | CSS-selector | ✔                  | -        |
| `querySelectorAll`       | CSS-selector | ✔                  | -        |
| `getElementById`         | `id`         | -                  | -        |
| `getElementsByName`      | `name`       | -                  | ✔        |
| `getElementsByTagName`   | tag or `'*'` | ✔                  | ✔        |
| `getElementsByClassName` | class        | ✔                  | ✔        |

目前为止，最常用的是  `querySelector`  和  `querySelectorAll`，但是  `getElement(s)By*`  可能会偶尔有用，或者可以在旧脚本中找到。

此外：

- `elem.matches(css)`  用于检查  `elem`  与给定的 CSS 选择器是否匹配。
- `elem.closest(css)`  用于查找与给定 CSS 选择器相匹配的最近的祖先。`elem`  本身也会被检查。

### 创建元素

```js
var elemObj = document.createElement('元素名')
```

### 将元素加入到页面中

1. 追加

```js
// elem.appendChild( ele ); //ele 是新的元素

var p = document.createElement('p')
p.innerHTML = 'hello'
document.body.appendChild(p)
```

2. 插入到某一个元素的前面

```js
elem.parentNode.insertBefore(newElem, oldElem)
```

3. 要将一个元素( newElem )插入到 某一个元素( oldElem )的后面

- 如果 oldElem 恰好是 最后一个元素, 我们直接 appendChild

```js
if (oldElem.nextSibling == null) {
  // 是最后一个
}
```

- 如果 oldElem 不是最后一个, 找到其后一个元素, 调用 insertBefore

```js
function insertAfter(newElem, oldElem) {
  var parent = oldElem.parentNode,
    next = oldElem.nextSibling
  if (next) {
    // 不为空, 即不是最后一个
    parent.insertBefore(newElem, next)
  } else {
    // 为空, 即是最后一个
    parent.appendChild(newElem)
  }
}
```

- appendHTML 向目标元素后插入 html 片段

```js
var appendHTML = function(el, html) {
  var divTemp = document.createElement('div'),
    nodes = null,
    // 文档片段，一次性append，提高性能
    fragment = document.createDocumentFragment()
  divTemp.innerHTML = html
  nodes = divTemp.childNodes
  for (var i = 0, length = nodes.length; i < length; i += 1) {
    fragment.appendChild(nodes[i].cloneNode(true))
  }
  // 全部都是一样的，除了下面这个 this → el
  el.appendChild(fragment)
  nodes = null
  fragment = null
}
```

- prependHTML 向目标元素前插入 html 片段

```js
var prependHTML = function(el, html) {
  var divTemp = document.createElement('div'),
    nodes = null,
    fragment = document.createDocumentFragment()

  divTemp.innerHTML = html
  nodes = divTemp.childNodes
  for (var i = 0, length = nodes.length; i < length; i += 1) {
    fragment.appendChild(nodes[i].cloneNode(true))
  }
  // 插入到容器的前面 - 差异所在
  el.insertBefore(fragment, el.firstChild)
  // 内存回收？
  nodes = null
  fragment = null
}
```

> 把两个方法扩展到原型上面

```js
HTMLElement.prototype.appendHTML = function() {}
```

4. replaceChild

```html
<body>
  <ul id="parentElement">
    <li class="childElement">old Node 1</li>
    <li class="childElement">old Node 2</li>
    <li class="childElement">old Node 3</li>
  </ul>
</body>

<script>
  var parentNode = document.getElementById('parentElement')
  var newNode2 = document.createElement('li')
  newNode2.innerHTML = 'new Node 3'
  parentNode.replaceChild(newNode2, document.querySelector('.childElement:last-child'))
</script>
```

### 删除

DOM 的操作方案

- 父元素.removeChild( 子元素 )
- 元素节点.removeAttributeNode( 属性节点 )

```js
// 给定：<div id="top" align="center" />
const d = document.getElementById('top')
const d_align = d.getAttributeNode('align')
d.removeAttributeNode(d_align)
// 现在 align 已被删除：<div id="top" />
```

快捷的处理方法

- 元素节点.removeAttribute( '属性名' )

HTML-DOM( 一般不会用这个方法 )

元素节点.属性 = null
元素节点.checked = false 等

### 修改

修改的是属性, 修改的是样式

HTML-DOM

元素.属性名 = 值
元素.style.样式名 = 样式值

-> 处理样式的时候
