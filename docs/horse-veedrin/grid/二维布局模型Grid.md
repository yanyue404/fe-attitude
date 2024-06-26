`Grid Layout`叫栅格布局模型，因为几乎每一个成熟的CSS框架都会实现自己的栅格布局系统，所以W3C干脆弄了一套CSS原生的栅格布局系统，补足这方面的短板。

有那么一段时间，网页布局是表格的天下。用表格布局虽然怪怪的，但是表格有它自己的优势。流式布局只能一个一个元素往页面底部流动，它的表达能力是有限的；而表格把页面切成若干豆腐块，能从容调配每一块豆腐，布局表达能力秒杀`流`。然而表格毕竟是表格，它有一些特性是专门为制作表格准备的，所以也就逐渐式微了。

栅格布局系统，可以理解为更加通用、更加强大的表格布局系统。它也是把页面切成若干豆腐块，元素可以自由声明占用哪个豆腐块。W3C还为`Grid Layout`增加了好多专用的属性、语法和计算函数，可以说，这一次是奔着一劳永逸来的。

## 二维布局模型

我们之前讲过Flexbox属于一维布局模型，详情见：[Flex专题](https://github.com/veedrin/horseshoe/blob/master/flex/flex.md)。

这个专题要讲的`Grid Layout`则属于二维布局模型。

当我们的视角确立以后，所谓的一维就是只有行，而所谓的二维就是有行也有列。很好理解，既然是栅格嘛，那必须得行列相交才能确定一个格子的大小。

## 概念

因为`Grid Layout`是二维布局模型，它干脆就固定了行与列的方向。格子嘛，任何横着放的布局方式都可以用竖着放的布局方式实现，反之亦然。所以自定义主轴的方向意义不大，于是乎`Grid Layout`也就没有主轴和交叉轴的概念。

`Grid Layout`唯一涉及到自定义方向的属性是`grid-auto-flow`，它的意思是当格子没有显式声明位置的时候，排列顺序的方向如何确定，是按列排呢还是按行排。这个属性后面会细讲。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/01.png)

#### 容器与项目

`Grid Layout`有栅格容器(grid container)，它负责划分领地，容器之内的元素才会臣服于栅格模型；`Grid Layout`也有栅格项目(grid item)，它们是需要被栅格模型约束的对象。

#### 栅格线

栅格线可以理解为栅格的边框，水平和垂直的栅格线交叉形成了栅格单元。栅格线有什么作用呢？有些栅格项目可能不止占用一个栅格单元，声明的时候就可以说`我从第几条栅格线开始，到第几条栅格线结束，这块区域是老子的`。

你可以为栅格线命名。

#### 栅格单元

四条栅格线合围成的最小区域就是栅格单元。它就是我们常说的格子。

> 需要特别区分`栅格单元`与`栅格项目`。
>
> 把栅格模型类比成养猪场的话，栅格单元就是猪圈，栅格项目就是猪。但是这里的猪比较金贵，一个猪圈最多只能养一头猪。就是一个萝卜一个坑吧。
>
> 但有些猪比较肥，或者比较霸道，它可能占用不止一个猪圈。
>
> 栅格单元是格子，栅格项目是元素，有时候一个元素只需要一个格子约束它，有时候一个元素需要多个格子约束它。

#### 编外栅格单元

栅格单元的数量是需要显式声明的。如果栅格项目的数量超过了声明的栅格单元的数量，`Grid Layout`就会自动创建若干栅格单元来包裹那些超出的栅格项目。

我们称它为编外栅格单元。

编外栅格单元有自己的特性，可以通过`grid-auto-columns`、`grid-auto-rows`和`grid-auto-flow`自定义。

#### 栅格系统

栅格系统就是栅格单元的总和。

栅格系统和栅格容器不是一个概念，正如栅格单元和栅格项目不是一个概念一样。

栅格系统有可能溢出栅格容器，也可能偏居栅格容器的一隅，也可能充满栅格容器。

#### 栅格轨道

还是回到二维布局模型，虽然我们说它有行也有列，但区分行与列的收益并不大，所以就统一叫它们栅格轨道。

两条相邻的栅格线与栅格容器合围成的区域就是栅格轨道。

#### 栅格区域

任意四条栅格线合围成的区域都可以成为栅格区域。当一个元素需要多个格子约束它的时候，我们说这个元素需要一个栅格区域约束它。

> 栅格区域可以由一个栅格单元组成，也可以有若干个栅格单元组成，但它必须是一个长方体。
>
> 或者说，你用两条水平线和两条垂直线组成一个非长方体给我看看？

栅格区域最终是要被栅格项目使用的。你可以给栅格区域命名，栅格项目用名字声明区域，或者栅格项目直接用四条栅格线确定一个区域。

## display

从这里开始，我们就要讲具体的CSS属性了。

这个属性声明的是栅格容器的类型。

```css
.container {
    display: grid | inline-grid | subgrid;
}
```

前两个属性值的区别在于容器自身应该表现为块元素还是行内元素。第三个属性值属于`CSS Grid Level 2`规范，目前(2019年3月)还在草案阶段，按下不表。

## grid-template-[columns|rows]

这两个属性声明的是栅格轨道的数量以及宽度。

当你声明了四个宽度值，那在这个方向上就有四条轨道，它们的宽度是你声明的值。

你也可以在声明栅格轨道的同时声明栅格线的名称。顺序就是它们的物理顺序。

```css
.container {
    grid-template-columns: <length> <length> | <line-name> <length> <line-name> <length> <line-name>;
    grid-template-rows: <length> <length> | <line-name> <length> <line-name> <length> <line-name>;
}
```

任何适用于`width`的值都适用于这里。

#### auto

如果某条栅格轨道的值是`auto`，默认情况下该栅格轨道会充满栅格容器的富余空间。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/02.png)

```css
.container {
    display: grid;
    grid-template-columns: 100px auto 100px;
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
.item.b {
    width: 100px;
}
```

但是如果声明了`justify-content`(后面会讲到)不为`stretch`，那`auto`会表现为以栅格项目的长度为准。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/03.png)

```css
.container {
    display: grid;
    grid-template-columns: 100px auto 100px;
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    justify-content: start;
}
.item.b {
    width: 50px;
}
```

这不难理解。类比一下，普通的块级元素会占满行内的富余空间，绝对定位后的块级元素会以自身或者子元素的宽度为宽度。`auto`在这里的表现是一样的。

#### fr

`fr`是`fraction`的缩写，翻译成中文是`分数`，多少分之一的分数。它是`Grid Layout`专用的长度单位。

它的计算公式是这样的，首先减去非`fr`单位的长度，以富余空间为总长度，以声明的`fr`数量总和为分母，以自身声明的`fr`数量为分子，求得自身所占的长度。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/04.png)

```css
.container {
    display: grid;
    grid-template-columns: 100px repeat(2, 1fr);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

为什么W3C要增加一个这样的单位呢？不是有`%`么？

答案就在`富余空间`上。`fr`也是一种百分比，但是它能保证总长度不会超过栅格容器的长度，因为它瓜分的是富余空间的长度；而`%`瓜分的是栅格容器的长度，不管别人瓦上霜。

比如说像上面的例子，用`%`可得好好算算，用`fr`就简单多了。

#### minmax()

`minmax()`是`Grid Layout`专用的计算函数。

```css
.container {
    display: grid;
    grid-template-columns: minmax(100px, 200px) 300px 300px;
}
```

它有两个参数，分别是最小值和最大值。当栅格单元需要压缩时，最小值就是栅格项目被压缩的最小极限，当栅格单元有剩余空间时，最大值就是栅格项目扩张的最大极限。

它还有几个值需要特别提一下。

- max-content：它的值是栅格项目中的文字不换行的自然长度。
- min-content：它的值是栅格项目中的文字全部换行的自然长度。
- auto：它的值根据所处的场景介于min-content和max-content之间。

#### fit-content()

`fit-content()`也是`Grid Layout`专用的计算函数。

它接受一个长度单位的参数。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/05.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, fit-content(200px));
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

我们已经了解过`min-content`和`max-content`。

`fit-content()`计算公式形象的讲，最小值是内容的`min-content`，最大值则取参数和`max-content`更小的那个。比如上面的例子，当内容小于`200px`时，以内容为长度，当内容大于`200px`时，以`200px`为长度。

#### repeat()

`repeat()`是`Grid Layout`专用的重复函数。

它接受两个参数，第一个参数是重复的次数，第二个参数是栅格轨道的宽度。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/06.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

第二个参数不仅仅可以是宽度，它可以是一种模式。比如说`[col-start] 100px [col-end] auto`，它会重复这一整段若干遍，而中括号包围的是给栅格线命名。

如此这般，第一、三、五条栅格线叫`col-start`，第二、四、六条栅格线叫`col-end`。总之用repeat函数命名栅格线会有很多重复的名字。

除此之外，第二个参数还可以是`minmax`函数、`fit-content`函数，或者`min-content`、`max-content`、`auto`关键字。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/07.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, [col-start] 100px [col-end] auto);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

第一个参数也有两个关键字`auto-fill`和`auto-fit`。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/08.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/09.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
```

稍微讲解一下。

`auto-fill`和`auto-fit`的共同点在于它们会保证栅格系统不溢出栅格容器。因为如果你写死了重复多少个，栅格容器空间不够的话只能溢出了。

而不同点在于，`auto-fill`会生成尽可能多的栅格轨道，即便这些轨道看起来没什么用；`auto-fit`则会生成尽可能少的栅格轨道，以便让那些自适应的栅格单元尽可能占用更多空间。

所以区别在于，`auto-fill`想让栅格轨道尽可能多，`auto-fit`想让栅格单元尽可能大。

这两个属性是`Grid Layout`自适应布局的利器，连媒体查询都省了。

```css
.container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

这里的意思是说，自适应布局，每个栅格项目长度等分，但最小不低于`300px`。那最大怎么确定呢？`600px`到`900px`之间，一行只能放两个项目，一旦超过`900px`，一行就会放三个项目。

## grid-template-areas

这个属性给栅格单元命名，同名的栅格单元自动成为一个栅格区域。

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'header header header'
        'sidebar main main'
        'footer footer footer';
}
```

命名之后有什么用呢？栅格项目有一个`grid-area`属性，它来瓜分栅格区域。

```css
.item {
    grid-area: header;
}
```

这个意思是说，名字叫`header`的栅格区域都是我的，撒尿为证。

#### 必须保证格式

用`grid-template-columns`和`grid-template-rows`声明了多少个栅格单元，命名的时候需要名字与栅格单元一一对应起来。并且前面说过栅格区域必须是长方体，连续命名的时候也要注意这点。

我偏不一一对应呢？比如横向上有三个栅格单元，但我只声明两个名字。

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'header header';
}
```

或者我偏不凑一个长方体呢？比如第一行两个`main`，第二行三个`main`。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/10.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 50px);
    grid-template-areas:
        'main main avatar'
        'main main main';
}
.item.a {
    grid-area: main;
}
```

格式不对的话，结果都是一样的。所有声明了`grid-area`的项目都会在右下角的某个编外栅格单元内，重叠在一起，尚不清楚它的算法或机制是怎样的。

其实第二种情况，完全可以认为两列四个`main`组成一个区域，另一个`main`组成另一个区域，是吧？但是你想想，现在有两个叫`main`的区域，项目瓜分的时候很尴尬呀，有一块飞地。格式还是不对。

所以呀，语法就是这么严格，老老实实遵守。

#### 缺省名字

既然语法这么严格，你要知道，取名字是一件脑壳疼的事情啊。我明明只需要给一小块区域取名字，你非得让我取满。有没有什么省事的办法呢？

当然有。不知道叫什么的时候就用`.`代替。

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'main main sidebar'
        'main main .';
}
```

不仅如此，只要没有空格分开，n个`.`都只占一个栅格单元。

`grid-template-areas`还有一个属性值`none`。一开始我以为打开方式是这样的：

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
        'main main sidebar'
        'main main none';
}
```

结果我其实声明了一个叫做`none`的栅格区域。`none`是`grid-template-areas`的默认值，实际打开方式是这样的：

```css
.container {
    grid-template-areas: none;
}
```

也就是说，别管它。

#### 相关隐式声明

每一个栅格区域都由四条栅格线包裹，这四条线同时会被隐式的赋予名称。横向上分别是`xxx-start`和`xxx-end`，纵向上也是`xxx-start`和`xxx-end`。反正栅格线名字不怕多，它只怕黑，因为它是黑怕歌手。

同时呢，反过来也是成立的。

```css
.container {
    display: grid;
    grid-template-columns: [biu-start] 1fr [nothing] 1fr [biu-end] 1fr [nothing];
    grid-template-rows: [biu-start] 1fr [nothing] 1fr [biu-end];
}
```

上面会隐式的声明一个叫做`biu`的栅格区域。而且发现了没有，栅格区域不可以重名，但是可以重叠。

## grid-[column|row]-gap

这个属性声明的是栅格单元之间的空隙。

```css
.container {
    grid-column-gap: <length>;
    grid-row-gap: <length>;
}
```

这里的值可以是任何定义`width`的值。

可以看到，如果将`grid-column-gap`设为`80%`，它的意思就是`gap`占栅格容器的`80%`，所有栅格单元只能分剩下的`20%`。

如果将`grid-column-gap`设为`100%`或超过`100%`呢？栅格单元的宽度不一定是0，因为在Flex专题中我们讲过，`margin`、`border`和`padding`是很刚的，只要你定义了，flex或者grid完全无法压缩它们。

> 特别需要注意的是，`grid-[column|row]-gap`无法使用`fr`单位的值。
>
> 配角戏份就不要太多了吧。

## grid-gap

这是一个集合属性，可以同时声明`grid-column-gap`和`grid-row-gap`。

```css
.container {
    grid-gap: <grid-column-gap> <grid-row-gap>;
}
```

## justify-items

这个属性声明的是栅格单元相对于垂直栅格线的对齐方式。

```css
.container {
    justify-items: stretch /*default*/ | start | end | center;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/11.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    justify-items: center;
}
```

当栅格单元的总宽度大于栅格容器的宽度时，垂直栅格线会被撑开，也就不存在对齐了。

所以这个属性只有在栅格单元的总宽度小于栅格容器的宽度时才生效。

> Flexbox的类似属性值有`flex-start`和`flex-end`，W3C终于在grid上把前缀去掉了。

## align-items

这个属性声明的是栅格单元相对于水平栅格线的对齐方式。

```css
.container {
    align-items: stretch /*default*/ | start | end | center;
}
```

## place-items

这是一个集合属性，可以同时声明`align-items`和`justify-items`。

如果省略第二个参数，则第二个参数会采用第一个值。

```css
.container {
    place-items: <align-items> <justify-items>;
}
```

## justify-content

这个属性声明的是栅格系统相对于栅格容器的水平对齐方式。

```css
.container {
    justify-content: start /*default*/ | end | center | stretch | space-around | space-between | space-evenly;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/12.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    justify-content: center;
}
```

如果栅格单元声明的宽度都是非`auto`的值，那`justify-content`的默认值是`start`，也就是左对齐。这时候`stretch`是不起作用的。

如果有栅格单元的宽度值是`auto`，那它默认就是`stretch`，于是整个栅格系统也变成`stretch`。当然你可以将`justify-content`设置成别的值，这时候宽度值是`auto`的栅格单元就以子元素的宽度为宽度了。

所以我没明白`justify-content: stretch`的作用是什么。唯一的使用场景是样式覆盖的时候。

## align-content

这个属性声明的是栅格系统相对于栅格容器的垂直对齐方式。

```css
.container {
    align-content: start /*default*/ | end | center | stretch | space-around | space-between | space-evenly;
}
```

这里关于`stretch`的处理是一样的。

## place-content

这是一个集合属性，可以同时声明`align-content`和`justify-content`。

如果省略第二个参数，则第二个参数会采用第一个值。

```css
.container {
    place-content: <align-content> <justify-content>;
}
```

## grid-auto-[columns|rows]

这两个属性声明的是编外栅格单元的高度和宽度。

```css
.container {
    grid-auto-columns: <length> <length> <length>;
    grid-auto-rows: <length> <length> <length>;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/13.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    grid-auto-rows: 100px;
    height: 300px;
}
```

编外栅格单元的宽度默认值都是auto。也就是说，以宽度举例，如果栅格容器的宽度大于栅格系统的宽度，那编外栅格单元会平分富余空间的宽度，否则编外栅格单元就以内容的宽度为宽度了。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/14.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    height: 300px;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/15.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    height: 110px;
}
```

## grid-auto-flow

这个属性声明的是如果栅格项目没有明确指定在栅格容器中的位置时，栅格项目应该如何依次排列。

关于什么叫明确指定位置，栅格项目自身有一些属性，可以声明它占据的区域从哪条栅格线开始，到哪条栅格线结束，或者直接声明占据哪个栅格区域。这里按下不表，后面会讲到。

这个属性有点像Flexbox的`flex-direction`属性。

```css
.container {
    grid-auto-flow: row /*default*/ | column | dense | row dense | column dense;
}
```

顾名思义，`row`就是按行排列，`column`就是按列排列。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/16.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    grid-auto-flow: row;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/17.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    grid-auto-flow: column;
}
```

重点要谈谈的是`dense`这个属性值。`dense`翻译成中文是`稠密`的意思，它的作用是当排在前面的栅格项目由于某些原因(主要是明确指定了位置，但是又没有占满)空出了一些位置，后面的项目如果合身的话应不应该挤进去。

这么干的后果就是没有明确指定位置的栅格项目可能不按顺序排列。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/18.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
}
.item.c {
    grid-column-start: 2;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/19.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-gap: 10px;
    grid-auto-flow: dense;
}
.item.c {
    grid-column-start: 2;
}
```

## grid

这是一个集合属性，它可以声明两大类属性中任一类的所有属性值。

```css
.container {
    grid: <grid-template-rows> / <grid-template-columns>;
    grid: <grid-auto-flow> [<grid-auto-rows> [/ <grid-auto-columns>]];
}
```

以长度开头的值声明的就是第一类，以`row`、`column`或`dense`开头的值声明的则是第二类。

以当前`Grid Layout`的普及程度来看，尽量不要这么写，你写的费劲，别人看的费劲。

## grid-[column|row]-[start|end]

从这里开始，涉及到的属性都是栅格项目自身的属性。

这个属性声明的是指定栅格项目从哪里开始到哪里结束。

```css
.item {
    grid-column-start: auto /*default*/ | <number> | <name> | span <number> | span <name>;
    grid-column-end: auto /*default*/ | <number> | <name> | span <number> | span <name>;
    grid-row-start: auto /*default*/ | <number> | <name> | span <number> | span <name>;
    grid-row-end: auto /*default*/ | <number> | <name> | span <number> | span <name>;
}
```

`start`并不一定要比`end`靠前，靠后的话，开始到结束的方向就相反了。比如下面两段代码指定的区域是一样的。

```css
.item {
    grid-column-start: 1;
    grid-column-end: 3;
}
```

```css
.item {
    grid-column-start: 3;
    grid-column-end: 1;
}
```

我们来挨个讲解各属性值：

- `auto`指的是只占用一个栅格单元。无论从哪开始，从哪结束，只要有一个`auto`值，它就只占一个栅格单元。

- `number`指的是栅格线的顺序，从1开始。
- `name`指的是栅格线的名称。栅格线的名称可以从两个地方来，第一是通过`grid-template-[columns|rows]`显示声明，第二是定义`grid-template-areas`的同时会为合围的栅格线自动生成`xxx-start`和`xxx-end`的名称。
- `span <number>`指的是跨度为几。这里的数字不再是第几条栅格线，而是跨越几条几条栅格线。
- `span <name>`指的是跨越到该名称的栅格线为止。它和仅仅是`name`有什么区别呢？如果`start`比`end`靠后，仅仅是`name`的情况会像前面说的一样，开始到结束的方向就相反；而`span <name>`的情况则会一直往后找，毕竟找不到嘛，所以就跨越到最后一条栅格线。其中的区别在于愣头青的程度对不对？

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/20.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-template-areas:
        'a b c'
        'd e f';
    grid-gap: 10px;
}
.item.c {
    grid-column-start: c-start;
    grid-column-end: a-start;
}
```

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/21.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-template-areas:
        'a b c'
        'd e f';
    grid-gap: 10px;
}
.item.c {
    grid-column-start: c-start;
    grid-column-end: span a-start;
}
```

## grid-[column|row]

这是两个集合属性，它们可以同时声明在某个方向开始和结束的位置。

```css
.item {
    grid-column: <start> / <end>;
    grid-row: <start> / <end>;
}
```

## grid-area

这个属性声明的是栅格项目占据哪个栅格区域。

```css
.item{
    grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
```

前面介绍过`grid-template-areas`属性，它声明的栅格区域就可以被栅格项目使用了。

当然你也可以使用栅格线的方式来合围一个栅格区域，所以它也相当于`grid-[column|row]-[start|end]`的终极集合属性。要特别注意声明的顺序。

![](https://raw.githubusercontent.com/veedrin/horseshoe/master/grid/image/22.png)

```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 50px);
    grid-template-areas:
        'a b c'
        'd e f';
    grid-gap: 10px;
}
.item.c {
    grid-area: a; /*或者 grid-area: 1 / 1 / 2 / 2;*/
}
```

## justify-self

这个属性声明的是栅格项目的长度如果小于栅格单元的长度，栅格项目如何水平对齐。

通过它可以声明该栅格项目自身的水平对齐方式，甚至可以覆盖栅格容器`justify-items`的值。

```css
.item {
    justify-self: stretch /*default*/ | start | end | center;
}
```

## align-self

这个属性声明的是栅格项目的高度如果小于栅格单元的高度，栅格项目如何垂直对齐。

通过它可以声明该栅格项目自身的垂直对齐方式，甚至可以覆盖栅格容器`align-items`的值。

```css
.item {
    align-self: stretch /*default*/ | start | end | center;
}
```

## place-self

这是一个集合属性，可以同时声明`align-self`和`justify-self`。

如果省略第二个参数，则第二个参数会采用第一个值。

```css
.item {
    place-self: <align-self> <justify-self>;
}
```

## 其他

有一个小游戏[Grid Garden](https://cssgridgarden.com)可以帮助你轻松的实践`Grid Layout`的各项特性。

还有一个网站[GridByExample](https://gridbyexample.com)，号称所有你需要知道的`Grid Layout`知识都在这里。
