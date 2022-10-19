## HTML5 语义化

什么是语义化？就是用合理、正确的标签来展示内容，比如 h1~h6 定义标题。

#### 好处

- 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构。
- 有利于 SEO，搜索引擎根据标签来确定上下文和各个关键字的权重。
- 方便其他设备解析，如盲人阅读器根据语义渲染网页
- 有利于开发和维护，语义化更具可读性，代码更好维护，与 CSS3 关系更和谐。

## viewport

Viewport ：字面意思为视图窗口，在移动 web 开发中使用。表示将设备浏览器宽度虚拟成一个特定的值（或计算得出），这样利于移动 web 站点跨设备显示效果基本一致。移动版的 Safari 浏览器最新引进了 viewport 这个 meta tag，让网页开发者来控制 viewport 的大小和缩放，其他手机浏览器也基本支持。

在移动端浏览器当中，存在着两种视口，一种是可见视口（也就是我们说的设备大小），另一种是视窗视口（网页的宽度是多少）。
举个例子：如果我们的屏幕是 320 像素 \* 480 像素的大小（iPhone4），假设在浏览器中，320 像素的屏幕宽度能够展示 980 像素宽度的内容。那么 320 像素的宽度就是可见视口的宽度，而能够显示的 980 像素的宽度就是视窗视口的宽度。

为了显示更多的内容，大多数的浏览器会把自己的视窗视口扩大，简易的理解，就是让原本 320 像素的屏幕宽度能够容下 980 像素甚至更宽的内容（将网页等比例缩小）。

### Viewport 属性值

- width 设置 layout viewport 的宽度，为一个正整数，或字符串"width-device"。device-width 指的是设备的物理宽度，width 是页面宽度。
- initial-scale 设置页面的初始缩放值，为一个数字，可以带小数
- minimum-scale 允许用户的最小缩放值，为一个数字，可以带小数
- maximum-scale 允许用户的最大缩放值，为一个数字，可以带小数
- height 设置 layout viewport 的高度，这个属性对我们并不重要，很少使用
- user-scalable 是否允许用户进行缩放，值为"no"或"yes", no 代表不允许，yes 代表允许这些属性可以同时使用，也可以单独使用或混合使用，多个属性同时使用时用逗号隔开就行了。

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

## `<link>`标签与 `<script>` 标签的放置位置

问： 为什么最好把 CSS 的`<link>`标签放在`<head></head>`之间？为什么最好把 JS 的`<script>`标签恰好放在`</body>`之前，有例外情况吗？

把`<link>`放在`<head>`中

这种做法可以让页面逐步呈现，提高了用户体验。将样式表放在文档底部附近，会使许多浏览器（包括 Internet Explorer）不能逐步呈现页面。一些浏览器会阻止渲染，以避免在页面样式发生变化时，重新绘制页面中的元素。这种做法可以防止呈现给用户空白的页面或没有样式的内容。

把`<script>`标签恰好放在`</body>`之前

脚本在下载和执行期间会阻止 HTML 解析。把`<script>`标签放在底部，保证 HTML 首先完成解析，将页面尽早呈现给用户。

如果一定要放在 `<head>` 中，可以让 `<script>` 标签使用 defer 属性。

## Reflow 和 Repaint

#### Reflow

当涉及到 DOM 节点的布局属性发生变化时，就会重新计算该属性，浏览器会重新描绘相应的元素，此过程叫 Reflow（回流或重排）。

#### Repaint

当影响 DOM 元素可见性的属性发生变化 (如 color) 时, 浏览器会重新描绘相应的元素, 此过程称为 Repaint（重绘）。因此重排必然会引起重绘。

#### 引起 Repaint 和 Reflow 的一些操作

- 调整窗口大小
- 字体大小
- 样式表变动
- 元素内容变化，尤其是输入控件
- CSS 伪类激活，在用户交互过程中发生
- DOM 操作，DOM 元素增删、修改
- width, clientWidth, scrollTop 等布局宽高的计算

#### Repaint 和 Reflow 是不可避免的，只能说对性能的影响减到最小，给出下面几条建议：

- 避免逐条更改样式。建议集中修改样式，例如操作 className。
- 避免频繁操作 DOM。创建一个 documentFragment 或 div，在它上面应用所有 DOM 操作，最后添加到文档里。设置 display:none 的元素上操作，最后显示出来。
- 避免频繁读取元素几何属性（例如 scrollTop）。绝对定位具有复杂动画的元素。
- 绝对定位使它脱离文档流，避免引起父元素及后续元素大量的回流

参考资料：

- [减少页面重排与重绘（Reflow & Repaint）](https://harttle.land/2015/08/11/reflow-repaint.html)
- [页面重构应注意的 repaint 和 reflow](http://www.blueidea.com/tech/web/2011/8365.asp)

## window.onload 和 DOMContentLoaded 的区别

当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发 load 事件。

它与 DOMContentLoaded 不同，当纯 HTML 被完全加载以及解析时，DOMContentLoaded 事件会被触发，而不必等待样式表，图片或者子框架完成加载。

- [load](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/load_event)
- [DOMContentLoaded 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/DOMContentLoaded_event)

## 跨标签页通信

有如下几个方式：

- cookie
- web worker
- localeStorage 和 sessionStorage

## history 和 hash 两种路由

## DOM 树

## 事件模型

## 页面大量图片，如何优化加载，优化用户体验

1. 图片懒加载。在页面的未可视区域添加一个滚动事件，判断图片位置与浏览器顶端的距离与页面的距离，如果前者小于后者，优先加载。

2. 如果为幻灯片、相册等，可以使用图片预加载技术，将当前展示图片的前一张和后一张优先下载。

3. 如果图片为 css 图片，可以使用 CSSsprite，SVGsprite 等技术。

4. 如果图片过大，可以使用特殊编码的图片，加载时会先加载一张压缩的特别厉害的缩略图，以提高用户体验。

5. 如果图片展示区域小于图片的真实大小，应在服务器端根据业务需要先进行图片压缩，图片压缩后大小与展示一致。

## 行内元素和块级元素有哪些

**行内元素**

一个行内元素只占据它对应标签的边框所包含的空间

一般情况下，行内元素只能包含数据和其他行内元素

```
b, big, i, small, tt
abbr, acronym, cite, code, dfn, em, kbd, strong, samp, var
a, bdo, br, img, map, object, q, script, span, sub, sup
button, input, label, select, textarea
```

**块级元素**

占据一整行，高度、行高、内边距和外边距都可以改变，可以容纳块级标签和其他行内标签

```bash
header,form,ul,ol,table,article,div,hr,aside,figure,canvas,video,audio,footer
```

**行内元素、块级元素区别**

行内元素：和其他元素都在一行上，高度、行高及外边距和内边距都不可改变（边距上下方向不可改变，左右方向可以改变），文字图片的宽度不可改变，只能容纳文本或者其他行内元素；其中 img 是行元素

块级元素：总是在新行上开始，高度、行高及外边距和内边距都可控制，可以容纳内敛元素和其他元素；行元素转换为块级元素方式：display：block；

## DOM 和 BOM 有什么区别

**DOM**

Document Object Model，文档对象模型

DOM 是为了操作文档出现的 API，document 是其的一个对象

DOM 和文档有关，这里的文档指的是网页，也就是 html 文档。DOM 和浏览器无关，他关注的是网页本身的内容。

DOM 对象：Document、Body、Button、Canvas 等

**BOM**

Browser Object Model，浏览器对象模型

BOM 是为了操作浏览器出现的 API，window 是其的一个对象

window 对象既为 javascript 访问浏览器提供 API，同时在 ECMAScript 中充当 Global 对象

BOM 对象： Window、Navigator、Screen、History、Location
