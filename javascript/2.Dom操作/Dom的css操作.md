## 属性的操作

- elem.hasAttribute(name) —— 检查是否存在这个特性。
- elem.getAttribute(name) —— 获取这个特性值。
- elem.setAttribute(name, value) —— 设置这个特性值。
- elem.removeAttribute(name) —— 移除这个特性。
- elem.attributes —— 所有特性的集合。

### ele.属性名=属性值 | ele. 属性名[属性值]= 控制属性的值.

src/className/title,innerHTML....

```js
img.src = 'image/2.jpg'

var aaa = 'className'
ele[aaa] = 'erweima hide'
```

字符串使用方法扩展

```js
ele[aaa] = ele.className.replace('show', 'hide')
```

1. 正常属性: src/title/id....

2. 特殊属性: className/href/innerHTML....

3. 表单属性: value/disabled/checked/selected....

```js
inpArr[i].value = i
inp.disabled = true
inpArr[i].checked = true
optArr[2].selected = true
```

4. style 属性: 别人都是字符串,这个货是 object;

ele.set/get/removeAttribute(); 设置获取删除属性.

### 自定义属性

```js
for(var i=0;i<liArr.length;i++> {
  liArr[i].index = i; // 自定义属性保存索引值 使用this.index
})
```

### style 属性

style 属性的六个特点:

1.样式少的时候使用

2.style 是对象

3.值是字符串,没有设置是""

4.命名规则,驼峰命名,和 css 不一样

5.设置了类样式不能够获取(只和行内式交互,和内嵌和外链无关)

6.ele.style.cssText="字符串形式的样式"

### dataset

```html
<!DOCTYPE html>
<html>
  <body>
    <div data-widget-name="menu">Choose the genre</div>

    <script>
      // 获取它
      let elem = document.querySelector('[data-widget-name]')

      // 读取值
      alert(elem.dataset.widgetName)
      // 或
      alert(elem.getAttribute('data-widget-name'))
    </script>
  </body>
</html>
```
