## 两种盒模型

- 两种盒子模型分别为，`box-sizing: content-box`（W3C 标准盒模型，非 IE 浏览器默认）与 `box-sizing: border-box`（IE 盒模型）。
- 区别在于`box-sizing: border-box`改变计算元素`width`和`height`的方式，`border` 和 `padding`的大小也将计算在内。

## BFC

BFC（Block Formatting Context），块级格式化上下文，是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

通俗一点来讲，可以把 BFC 理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海，都不会影响到外部。

以下方式都会创建 BFC：

- body 根元素
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

BFC 布局规则：

1. 内部的 box 会在垂直方向，一个接一个的放置。
2. box 垂直方向的距离有 margin 决定。属于同一个 BFC 的两个相邻 box 的 margin 会发生重叠。
3. 每个元素的左外边距与包含块的左边界相接触，即使浮动元素也是如此。
4. BFC 的区域不会与 float 的元素区域重叠。
5. 计算 BFC 的高度时，浮动子元素也参与计算。
6. BFC 就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然

应用：

- 父元素塌陷
- 外边距重叠
- 清除浮动

参考链接：

- [yanyue404 - #79 初探 BFC](https://github.com/yanyue404/blog/issues/79)
- [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
- https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
- https://www.sitepoint.com/understanding-block-formatting-contexts-in-css/

## 块元素，行内元素以及行内块

**块状元素特征**：

1. 能够识别宽高,宽度默认是它容器的 100%，除非设定一个宽度
2. margin 和 padding 的上下左右均对其有效
3. 可以自动换行
4. 默认排列方式为从上至下
5. 可以容纳内联元素和其他块元素

例子： `div`，`h1-h6`、`p`、`ul`、`ol`、`dl`、`li`、`table`、`article`、`form`

**行内元素特征**：

1. 设置宽高无效,大小由其内含的内容决定
2. 对 margin 仅设置水平方向有效，垂直方向无效；padding 设置上下左右都有效，即会撑大空间
3. 不会自动进行换行,和其他元素都在同一行
4. 默认排列方式为从左到右
5. 只能容纳文本或者其他内联元素。

例子：`a`、 `span`、`strong`、`i`、`em`、`label`

- **行内块状元素特征**：

1. 能够识别宽高
2. margin 和 padding 的上下左右均对其有效
3. 不自动换行
4. 默认排列方式为从左到右

例子：`img`、 `input`、`button`、`input`、`label`、`select`、`textarea`

## 选择器优先级

1. 最高级： !important
2. 第一等： 代表内联样式，如: style="xxx"，权值为 1000
3. 第二等： 代表 ID 选择器，如：#content，权值为 100
4. 第三等： 代表类，伪类和属性选择器，如.content，:hover，[type="radio"]，权值为 10
5. 第四等： 代表元素选择器和伪元素选择器，如 div，::before，权值为 1
6. 通配选择符（\*）
7. 继承
8. 默认

## 居中布局

- 水平居中
  - 行内元素：`text-align: center`
  - 块级元素: `margin: 0 auto`
  - `absolute + transform`
  - `flex + justify-content: center`
- 垂直居中
  - `line-height: height`
  - `absolute + transform`
  - `flex + align-items: center`
- 水平垂直居中
  - `flex`
  - `position + margin`
  - `position + calc`
  - `position + transform`
  - `grid`
  - `tabel + tabel-cell`

**flex**

```css
/* 父容器 */
display: flex;
justify-content: center;
align-items: center;
```

**position + margin**

```css
/* 父容器 */
position: relative;

/* 子容器 */
position: absolute;
margin: auto;
top: 0;
bottom: 0;
left: 0;
right: 0;
```

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .wrapper {
    position: relative;
    width: 300px;
    height: 300px;
    background-color: red;
  }
  .child {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100px;
    height: 100px;
    margin: auto;
    background-color: green;
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="child"></div>
</div>
</body>
```

**position + calc**

```css
/* 父容器 */
position: relative;

/* 子容器 */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .wrapper {
    position: relative;
    width: 300px;
    height: 300px;
    background-color: red;
  }
  .child {
    position: absolute;
    width: 100px;
    height: 100px;
    left: calc(50% - 50px);
    top: calc(50% - 50px);
    background-color: green;
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="child"></div>
</div>
</body>
```

**position + transform**

```css
/* 父容器 */
position: relative;

/* 子容器 */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

**grid**

```css
/* 父容器 */
display: grid;
align-items: center;
justify-content: center;
```

```html
<style>
  * {
    margin: 0;
    padding: 0;
  }
  .wrapper {
    display: grid;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 300px;
    background-color: red;
  }
  .child {
    width: 100px;
    height: 100px;
    background-color: green;
  }
</style>
</head>
<body>
<div class="wrapper">
  <div class="child"></div>
</div>
</body>
```

**tabel + table-cell**

```html
<div class="box">
  <div class="content">
    <div class="inner"></div>
  </div>
</div>

<style>
  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  .box {
    display: table;
    height: 100%;
    width: 100%;
  }
  .content {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .inner {
    background-color: #000;
    display: inline-block;
    width: 200px;
    height: 200px;
  }
</style>
```

## 清除浮动

**浮动带来的问题**：

1. 父元素的高度无法被撑开
2. 与浮动元素同级的非浮动元素（内联元素）会跟随其后

**方式：**

- 通过增加伪元素清除浮动

```css
.clearfix:after {
  content: '';
  display: table;
  clear: both;
}
.clearfix {
  *zoom: 1; /* 兼容 IE 低版本 */
}
```

- 创建父级 BFC
- 父级设置高度

## position 定位区别

- `static`：默认定位属性值。该关键字指定元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。此时 top, right, bottom, left 和 z-index 属性无效。
- `relative`: 元素的定位永远是相对于元素自身位置的，和其他元素没关系，也不会影响其他元素（因此会在此元素未添加定位时所在位置留下空白）。
- `absolute`：绝对定位，它会从父类开始一层一层向上找起，寻找 position 值不是 `static` 的祖先元素，直到 html 根标签为止。
- `fixed`：不为元素预留空间，而是通过指定元素相对于屏幕视口（viewport）的位置来指定元素位置。元素的位置在屏幕滚动时不会改变
- `sticky`: 粘性布局，可以看出是 position:relative 和 position:fixed 的结合体——当元素在屏幕内，表现为 relative，就要滚出显示器屏幕的时候，表现为 fixed

## 请阐述`z-index`属性，并说明如何形成层叠上下文（stacking context）。

CSS 中的`z-index`属性控制重叠元素的垂直叠加顺序。`z-index`只能影响`position`值不是`static`的元素。

没有定义`z-index`的值时，元素按照它们出现在 DOM 中的顺序堆叠（层级越低，出现位置越靠上）。非静态定位的元素（及其子元素）将始终覆盖静态定位（static）的元素，而不管 HTML 层次结构如何。

层叠上下文是包含一组图层的元素。 在一组层叠上下文中，其子元素的`z-index`值是相对于该父元素而不是 document root 设置的。每个层叠上下文完全独立于它的兄弟元素。另外，请注意，嵌套起着重要的作用，如果元素 B 位于元素 A 之上，则即使元素 A 的子元素 C 具有比元素 B 更高的`z-index`值，元素 C 也永远不会在元素 B 之上.

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/09/context.png?w=530&ssl=1)

每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会在父层叠上下文中按顺序进行层叠。少数 CSS 属性会触发一个新的层叠上下文，例如`opacity`小于 1，`filter`不是`none`，`transform`不是`none`。

参考资料：

- https://css-tricks.com/almanac/properties/z/z-index/
- https://philipwalton.com/articles/what-no-one-told-you-about-z-index/
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context

## 常用选择器

**基本选择器**

- 通用选择器：`*`
- `id`、`class`、元素
- 属性选择器: `E[attr]`、`E[attr="val"]`、`E[attr$="val"]`、`E[attr^="val"]、E[attr*="val"] 、E[attr|="val"]

**分组选择器**

- `div, span`，会同时匹配 `<span>` 元素和 `<div>` 元素

**组合器**

- 后代组合器，`div span` 匹配所有位于任意 `<div>` 元素之内的 `<span>` 元素。
- 直接子代组合器。`ul > li` 匹配直接嵌套在 `<ul>` 元素内的所有 `<li>` 元素。
- 一般兄弟组合器。`p ~ span` 匹配同一父元素下，`<p>` 元素后的所有 `<span>` 元素
- 紧邻兄弟组合器。`h2 + p` 会匹配所有紧邻在 `<h2>`元素后的 `<p>` 元素

**伪选择器**

- 伪类，支持按照未被包含在文档树中的状态信息来选择元素。`E:hover`、`E:not()`、 `E:first-child`、 `E:last-child`、 `E:nth-child(n)`、`E:nth-last-child(n)`
- 伪元素，用于表示无法用 HTML 语义表达的实体。`p::first-line` 匹配所有 `<p>` 元素的第一行。

参考链接

- https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Selectors

## CSS 伪类和伪元素有哪些，它们的区别和实际应⽤

### 伪类

其核心就是用来选择那些不能够被普通选择器选择的文档之外的元素，比如`:hover`。

还有`E:hover`、`E:not()`、 `E:first-child`、 `E:last-child`、 `E:nth-child(n)`、`E:nth-last-child(n)`等，作为个性选择器使用。

### 伪元素

其核心就是需要创建通常不存在于文档中的元素，比如`::before`。

`::before`、`::after`、`::selection`、`::first-line`、`::first-letter` （常用清除浮动，画三角箭头、修饰文字等）

> 可以粗略的区分，伪类和伪元素分别用单冒号 :和双冒号 ::来表示。

## 哪些属性可以继承

可继承的属性：font-size, font-family, color

不可继承的样式：border, padding, margin, width, height

### display:none、visibile:hidden、opacity:0 的区别

|                  | 是否隐藏 | 是否在文档中占用空间 | 是否会触发事件 |
| ---------------- | -------- | -------------------- | -------------- |
| display: none    | 是       | 否                   | 否             |
| visibile: hidden | 是       | 是                   | 否             |
| opacity: 0       | 是       | 是                   | 是             |

## flex 布局

### 设置主轴的方向

`flex-direction`可决定主轴的方向，有四个可选值：

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

```css
.box {
  flex-direction: row | column-reverse| column | row-reverse;
}
```

### 设置主轴的对齐方式

`justify-content`属性定义了项目在主轴上的对齐方式，值如下：

- flex-start（默认值）：向主轴开始方向对齐。
- flex-end：向主轴结束方向对齐。
- center： 居中。
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

### 交叉轴的对齐方式

`align-items`属性定义项目在交叉轴上如何对齐，值如下：

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

### 主轴方向换行

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap 属性定义，如果一条轴线排不下，如何换行。

- nowrap（默认）：不换行。
- wrap：换行，第一行在下方。
- wrap-reverse：换行，第一行在上方。

```css
.box {
  flex-wrap: nowrap | wrap | wrap-reverse;
}
```

### 多轴线方向

align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

### Flex 项目属性

有六种属性可运用在 item 项目上:

- order 属性定义项目的排列顺序。数值越小，排列越靠前，默认为 0
- flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。
- flex-grow 属性定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。
- flex-shrink 属性定义了项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。
- flex 属性是 flex-grow, flex-shrink 和 flex-basis 的简写，默认值为 0 1 auto。后两个属性可选。
- align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 auto，表示继承父元素的 align-items 属性，如果没有父元素，则等同于 stretch。

参考资料：

- [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
- [Flex 布局教程：实例篇](https://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## rem 布局

rem 响应适配的原理是动态计算为当前页面的 `newFontSize`并赋值给 html 根节点，从而 rem 参照可以根据根节点进行缩放。

设计稿宽度 / `预设 font-size` = 实际屏幕宽度 / `newFontSize`

`newFontSize` = 实际屏幕宽度 \* `预设 font-size` / 设计稿宽度

### html 根元素 font-size 设置 13.33vm 是什么意思 ？

这也是 100px 的一种表示方式。

750px = 100vm, 即 1vm = 7.5px

`100px / 1vm = 100px / 7.5px = 13.33vm`

- [yanyue404 - #39 rem 适配移动设备](https://github.com/yanyue404/blog/issues/39)

## margin 重叠的问题

这里提到 margin，就不得不提一下 margin 的这一特性——纵向重叠。如 <p> 的纵向 margin 是 16px，那么两个 <p> 之间纵向的距离是多少？—— 按常理来说应该是 16 + 16 = 32px，但是答案仍然是 16px。因为纵向的 margin 是会重叠的，如果两者不一样大的话，大的会把小的“吃掉”。

只要元素满足下面任一条件即可触发 BFC 特性：

- body 根元素
- 浮动元素：float 除 none 以外的值
- 绝对定位元素：position (absolute、fixed)
- display 为 inline-block、table-cells、flex
- overflow 除了 visible 以外的值 (hidden、auto、scroll)

参考资料：

- [margin 合并和塌陷的问题](https://www.jianshu.com/p/3b499982bcb0)
- [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)

## CSS 预处理器(Sass/Less/Postcss)的优势

- 嵌套
- 变量
- 循环语句
- 条件语句
- 自动前缀
- 单位转换
- mixin 复用

## 两列自适应布局

**floa + bfc**

在单列定宽单列自适应的两列布局中，经常用 float 和负 margin 配合实现布局效果。但由于 margin 取值只能是固定值，所以在两列都是自适应的布局中就不再适用。而 float 和 overflow 配合可实现两列自适应效果。使用 overflow 属性来触发 bfc，来阻止浮动造成的文字环绕效果。

```css
.box {
  width: 100%;
  height: 800px;
}
.box .left {
  float: left;
  width: 150px;
  height: 100%;
  margin-right: 10px;
  background-color: green;
}
.box .right {
  background-color: purple;
  overflow: hidden;
  height: 100%;
}

/*这种主要是应用到BFC的一个特性*/
/*1.浮动元素的块状兄弟元素会无视浮动元素的位置,尽量占满一行,这样该兄弟元素就会被浮动元素覆盖
  2.若浮动元素的块状兄弟元素为BFC,这不会占满一行,而是根据浮动元素的宽度,占据该行剩下的宽度,避免与浮动元素重叠
  3.浮动元素与其块状Bfc兄弟元素之间的margin可以生效,这会继续减少兄弟元素的宽度

  并不是一定要用overflow:hidden,只要能触发BFC就好了,另外在ie6也可以触发haslayout特性(推荐用*zoom:1;由于.right的宽度是自动计算的,不需要设置任何与.right相关的css,因此.right的宽度可以不固定)*/
```

**flex**

`flex:1` 占满剩余宽度(同样适用于垂直方向)

```css
.box {
  /*父盒子设为伸缩盒子*/
  display: flex;
  width: 100%;
  height: 100%;
}

.box .left {
  width: 150px;
  height: 100%;
  background-color: green;
}

.box .right {
  flex: 1;
  background-color: purple;
  height: 100%;
}
```

**flex + calc / float + calc**

```css
/* flex + calc */
.box {
  display: flex;
  width: 100%;
  height: 800px;
}
.box .left {
  width: 150px;
  height: 100%;
  margin-right: 10px;
  background-color: green;
}
.box .right {
  width: calc(100% - 160px);
  background-color: purple;
  height: 100%;
}

/* floac + calc */
.box {
  width: 100%;
  height: 800px;
}
.box .left {
  float: left;
  width: 150px;
  height: 100%;
  margin-right: 10px;
  background-color: green;
}
.box .right {
  float: left;
  width: calc(100% - 160px);
  background-color: purple;
  height: 100%;
}
```

## 去除 inline-block 元素间间距的方法

推荐使用 font-size:0

```css
div {
  font-size: 0;
}
div a {
  font-size: 12px;
}
```

更详细的介绍请看:[去除 inline-block 元素间间距的 N 种方法](https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)

## 元素竖向的百分比设定是相对于容器的高度吗？

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

## ⽤纯 CSS 创建⼀个三⻆形的原理是什么？

利用伪元素画三角

```css
.info-tab {
  position: relative;
}
.info-tab::after {
  content: '';
  border: 4px solid transparent;
  border-top-color: #2c8ac2;
  position: absolute;
  top: 0;
}
```

## 响应式布局⽅案

响应式设计的适应性原则：网站应该凭借一份代码，在各种设备上都有良好的显示和使用效果。响应式网站通过使用媒体查询，自适应栅格和响应式图片，基于多种因素进行变化，创造出优良的用户体验。就像一个球通过膨胀和收缩，来适应不同大小的篮圈。

响应式网站的几个标志：

- 同时适配 PC + 平板 + 手机等；
- 标签导航在接近手持终端设备时改变为经典的抽屉式导航；
- 网站的布局会根据视口来调整模块的大小和位置；

### 设计步骤

1. 设置 meta 标签，适配视口，禁止缩放

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```

2. 增强跨浏览器渲染的一致性

使用了 Normalize.css

3. 使用`@media` 媒体查询来设置设置布局分界点，这是响应式布局的核心

```css
/* 超小屏幕（手机，小于 768px） */
/* 没有任何媒体查询相关的代码，因为这在 Bootstrap 中是默认的（还记得 Bootstrap 是移动设备优先的吗？） */

/* 小屏幕（平板，大于等于 768px） */
@media (min-width: @screen-sm-min) {
  ...;
}

/* 中等屏幕（桌面显示器，大于等于 992px） */
@media (min-width: @screen-md-min) {
  ...;
}

/* 大屏幕（大桌面显示器，大于等于 1200px） */
@media (min-width: @screen-lg-min) {
  ...;
}
```

4. 栅格化加强布局可塑性，适配手机、平板、桌面

```html
<div class="row">
  <div class="col-xs-12 col-sm-6 col-md-8">.col-xs-12 .col-sm-6 .col-md-8</div>
  <div class="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
</div>
<div class="row">
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
  <!-- Optional: clear the XS cols if their content doesn't match in height -->
  <div class="clearfix visible-xs-block"></div>
  <div class="col-xs-6 col-sm-4">.col-xs-6 .col-sm-4</div>
</div>
```

## 请解释什么是雪碧图（css sprites），以及如何实现？

雪碧图是把多张图片整合到一张上的图片。它被运用在众多使用了很多小图标的网站上（Gmail 在使用）。实现方法：

1. 使用生成器将多张图片打包成一张雪碧图，并为其生成合适的 CSS。
1. 每张图片都有相应的 CSS 类，该类定义了`background-image`、`background-position`和`background-size`属性。
1. 使用图片时，将相应的类添加到你的元素中。

好处：

- 减少加载多张图片的 HTTP 请求数（一张雪碧图只需要一个请求）。但是对于 HTTP2 而言，加载多张图片不再是问题。
- 提前加载资源，防止在需要时才在开始下载引发的问题，比如只出现在`:hover`伪类中的图片，不会出现闪烁。

参考资料：

- https://css-tricks.com/css-sprites/

### 有什么不同的方式可以隐藏内容（使其仅适用于屏幕阅读器）？

这些方法与可访问性（a11y）有关。

- `visibility: hidden`：元素仍然在页面流中，并占用空间。
- `width: 0; height: 0`：使元素不占用屏幕上的任何空间，导致不显示它。
- `position: absolute; left: -99999px`： 将它置于屏幕之外。
- `text-indent: -9999px`：这只适用于`block`元素中的文本。
- Metadata： 例如通过使用 Schema.org，RDF 和 JSON-LD。
- WAI-ARIA：如何增加网页可访问性的 W3C 技术规范。

即使 WAI-ARIA 是理想的解决方案，我也会采用绝对定位方法，因为它具有最少的注意事项，适用于大多数元素，而且使用起来非常简单。

参考资料：

- https://www.w3.org/TR/wai-aria-1.1/
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- http://a11yproject.com/

## CSS 动画

- transition: 过渡动画
  - transition-property: 属性
  - transition-duration: 间隔
  - transition-timing-function: 曲线
  - transition-delay: 延迟
  - 常用钩子: transitionend
- animation / keyframes
  - animation-name: 动画名称，对应@keyframes
  - animation-duration: 间隔
  - animation-timing-function: 曲线
  - animation-delay: 延迟
  - animation-iteration-count: 次数
    - infinite: 循环动画
  - animation-direction: 方向
    - alternate: 反向播放
  - animation-fill-mode: 静止模式
    - forwards: 停止时，保留最后一帧
    - backwards: 停止时，回到第一帧
    - both: 同时运用 forwards / backwards
  - 常用钩子: animationend
- 动画属性: 尽量使用动画属性进行动画，能拥有较好的性能表现
  - translate
  - scale
  - rotate
  - skew
  - opacity
  - color

## css 作用域隔离方法

- 命名空间，加不同的前缀
- module，例如 vue 的 scoped
- css-in-js，直接写成内联样式
- Shadow DOM，其实就是 web components，作用域隔离

## CSS 优化、提⾼性能的⽅法有哪些？

避免过度约束；避免后代选择符；避免链式选择符；使⽤紧凑的语法；避免不必要的命名空间；避
免不必要的重复；最好使⽤表⽰语义的名字。⼀个好的类名应该是描述他是什么⽽不是像什么；避
免！important，可以选择其他选择器；尽可能的精简规则，你可以合并不同类⾥的重复规则?

## 参考

- [50 道 CSS 基础面试题（附答案）](https://segmentfault.com/a/1190000013325778)
- [《50 道 CSS 基础面试题（附答案）》中的答案真的就只是答案吗？](https://segmentfault.com/a/1190000013860482)
- [2017-08 面试总结（at,dm）- sunyongjian ](https://github.com/sunyongjian/blog/issues/32)
- [面试问别人的一些问题 - sunyongjian ](https://github.com/sunyongjian/blog/issues/24)
- [2019-03 面试总结（alicloud, tikTok, ke, ks）- sunyongjian ](https://github.com/sunyongjian/blog/issues/41)
- [front-end-interview-handbook - CSS 问题](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/questions/css-questions.md#css-%E9%97%AE%E9%A2%98)
- [yck - 前端面试从准备到谈薪完全指南](https://juejin.im/post/5dfef50751882512444027eb)
- [中高级前端大厂面试秘籍，为你保驾护航金三银四，直通大厂(上)](https://juejin.im/post/5c64d15d6fb9a049d37f9c20)
