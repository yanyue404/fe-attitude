[TOC]

# css3 现状

1.浏览器支持程度差,需要添加私有前缀

2.移动端支持优于 PC 端

3.不断改进

### 如何对待:

1.坚持渐进增强原则

> 渐进增强:针对低版本浏览器进行构建页面,保证最基本的功能,然后再对高级浏览器进行效果,交互,等方面的改进

2.考虑用户群体(优雅降级)

> 优雅降级:一开始就构建完整的功能,然后再针对低版本的浏览器进行兼容.

3.遵照产品方案

## 关系选择符

- 子选择符(E>F) 选择所有作为 E 元素的子元素 F

- 选择紧贴在 E 元素之后 F 元素。

- 相邻选择符(E+F) 选择紧贴在 E 元素之后 F 元素。与兄弟选择符不同的是，相邻选择符只会命中符合条件的相邻的兄弟元素。

- 兄弟选择符(E~F) 选择 E 元素后面的所有兄弟元素 F。与相邻选择符不同的是，兄弟选择符会命中所有符合条件的兄弟元素，而不强制是紧邻的元素。

## 属性选择器([ ])

| 格式          | 选取元素                        |
| ------------- | ------------------------------- |
| E[att]        | 选择具有 att 属性的 E 元素      |
| E[att="val"]  | 属性值完全等于 val 的 E 元素    |
| E[att$="val"] | 属性值的结尾等于某个值的 E 元素 |
| E[att^="val"] | 属性值的开始等于某个值的 E 元素 |
| E[att*="val"] | 属性值包含某个值的 E 元素       |

## 伪类选择器( : )

| 格式                | 选取元素                    |
| ------------------- | --------------------------- |
| E:first-child       | 父元素的第一个子元素 E。    |
| E:last-child        | 父元素的最后一个子元素 E    |
| E:nth-child(n)      | 父元素的第 n 个子元素 E     |
| E:nth-of-type(n)    | 父元素中第 n 个同类型的元素 |
| E:nth-last-child(n) | 父元素的倒数第 n 个子元素 E |

```
n--灵活多变:(n是从0开始的)

2n 偶数 关键字 even

2n+1 或 2n-1 奇数 关键字 odd

li:nth-child(-1n+3)  选中前三个li
```

### 空伪类

| 格式    | 选取元素                                                            |
| ------- | ------------------------------------------------------------------- |
| E:empty | 选中没有任何子元素（包括 text 节点）的元素 E。(注意:有空格也不允许) |

### 排除伪类

| 格式     | 选取元素                      |
| -------- | ----------------------------- |
| E:not(s) | 匹配不含有 s 选择符的元素 E。 |

    li:not(:last-child){//导航栏右边线设置
    border-right: 1px solid red;
    }

### 目标伪类

| 格式     | 选取元素                                      |
| -------- | --------------------------------------------- |
| E:target | 结合锚点进行使用,处于当前的锚点的元素会被选中 |

    h2:target {background:red}

## 伪元素选择器( :: )

| 格式                  | 选取元素                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| E::first-letter       | 对文本的第一个字或字符设置样式                                                                 |
| E::first-line         | 对文本的第一行设置样式                                                                         |
| E::selection          | 对选中的文本改变样式(只能改变文字颜色和背景,不能改变文字大小等的设置)                          |
| E::before 和 E::after | 在 E 元素内部的开始位置和结尾位置创建一个元素,该元素为行内元素,使用时必须结合 content 属性使用 |

## 文本修饰

text-shadow: 1px 1px 1px red;

可分别设置偏移量、模糊度、颜色（可设透明度。

1、水平偏移量 正值向右 负值向左；

2、垂直偏移量 正值向下 负值向上；

3、模糊度是不能为负值
  
 总结:文字阴影可以设置多个,阴影之间用逗号分隔;

## 盒模型

- 1.box-sizing: (调整盒子内容区域的显示方式)

content-box;默认值;

border-box: 盒子实际大小;

总结:

1.盒子设置了一个 content-box,计算盒子大小要做加法

2.盒子设置了一个 boder-box,盒子大小就是我们设置的宽高

![](../imgs/box-sizing.png)

- 2.border-radius

       分别设置横纵轴半径，以“/”进行分隔，“/”前面的1~4个用来设置横轴半径（分别对应左上角、右上角、右下角、左下角横轴的位置 ），“/”后面1~4个参数用来设置纵轴半径（分别对应左上角、右上角、右下角、左下角纵轴的位置 ）。

- 3.border-image
  <border-image-source>： 设置图像路径。
  <border-image-slice>： 设置边框背景图的分割方式。 上右下左
  默认裁切完毕不显示中间的内容,需要显示在后面加
  border-image-slice :33 fill;(加/前面是 border-image-width,后面是裁切的方式)
  <border-image-width>： 设置边框图片的宽度。
  <border-image-outset>： 设置或边框背景图的扩展。
  <border-image-repeat>： 设置边框图像的平铺方式。 默认值 stretch 拉伸
  repeat 平铺
  round 自动调整,完整显示(首选)
  注意:1.如果没有设置 border-image-width 属性,边框图片的宽度按照盒子边框的宽度显示,否则则按照该属性设置的值显示
  2.border-image-width 不能改变边框宽度

- 4.box-shadow
  <length>①：设置阴影水平偏移值。(正值向右 负值向左 可以为负值)
  <length>②： 设置阴影垂直偏移值。(正值向下 负值向上 可以为负值 )
  <length>③： 如果提供了第 3 个长度值则用来设置阴影模糊值。不允许负值
  <length>④： 如果提供了第 4 个长度值则用来设置阴影外延值。可以为负值
  <color>： 设置对象的阴影的颜色。
  inset： 设置对象的阴影类型为内阴影。该值为空时，则对象的阴影类型为外阴影

        可以设置多重边框阴影，实现更好的效果，增强立体感。

## 背景

      1.background-size 裁切(设置)背景图片尺寸
           1.具体值background-size:200px 200px;
           2.百分数background-size:100% 100%;
           3.background-size:100% auto;
           4.background-size:cover(覆盖,按照一定比例铺满整个父容器)
           5.background-size:contain(按照一定比例完整的显示整体铺满整个父容器)
      2.background-origin 原点
         padding-box(默认值) 以内边距做为参考原点
         border-box
         content-box
      3.background-clip背景区域裁切
         border-box(默认值) 裁切边框以内为背景区域；
         padding-box
         content-box
      4.background:url(),url(),url();(多背景)

       总结:使用逗号隔开
       注意:多背景连写不支持设置背景色,需要在后面单独设置.

## 渐变

      1.线性渐变 (沿着某条直线朝一个方向产生渐变效果)
      background-images:linear-gradient
         渐变的方向
         开始状态和结束状态
         渐变的范围(距离)
         to right,red 20%,green20%;
      总结:首先使用渐变的时候,要设置bg-image
             渐变的方向可以设置具体方位名词(to top)
             渐变的方向用度数设置
      2.径向渐变
      径向渐变设置的百分比是以半径为参照设置的

## 过渡 transition [官方文档](<(https://www.w3.org/TR/css-transitions-1/)>)

      1.帧动画
      特点:按照帧单位移动.
      2.补间动画

         开始状态(动画放在这个状态里面)
         结束状态
         过渡属性 1. transition-property:all(默认值)
                 2. 可以指定要进行过渡的css属性,如果提供多个属性值,以逗号进行分隔;( transition-property: opacity, left, top, width;)
         过渡执行时间 transition-duration
         动画执行的速度(执行的类型):transition-timing-function:ease(逐渐变慢) 默认值/linear匀速/ease-in(加速)/ease-out(减速)/ease-in-out(先加速后减速                                                                                           )/cubic-bezier贝塞尔曲线(x1,y1,x2,y2)
         动画延时执行 transition-delay:2s;

## 2D 转换(transform)

| 功能       | 书写                                           | 补充                                          |
| ---------- | ---------------------------------------------- | --------------------------------------------- |
| 1.位移     | translate(x,y)                                 |
| 2.旋转     | rotate(30deg)                                  | (角度设置正值(顺时针),负值(逆时针))           |
| 3.缩放     | scale(倍数)                                    | 整数(大于 1)放大 小数(小于 1)缩小             |
| 4.倾斜     | skew(30deg,45deg)                              | 第一个值垂直方向倾斜,第二个方向代表水平倾斜   |
| 5.旋转原点 | transform-origin:left top;(以左上角为旋转原点) | 改变旋转原点的位置应该一开始就改变 40px 50px; |

## 3D 转换

### perspective:1000px; // 透视

取值为眼睛距离图片的距离 600-1000px 是人眼最舒服的距离

设置有两种方式

1. 给父元素设置

2. 作为 transform 的属性写进 transform 里面

### transform-style:preserve-3d; // 显示出 3D 效果

### 3D 位移

![image](https://note.youdao.com/yws/public/resource/bd7f5b1de6825d4726fa47a997c1d28b/xmlnote/742D19A2B3454F4D8DACA7D82A548BE3/9993)

1. transform:translateX(300px) // 沿着 x 轴移动
2. transform:translateY(300px) // 沿着 y 轴移动
3. transform:translateZ(300px) // 沿着 z 轴移动

### 3D 旋转

1. transform-origin:top/bottom/center; // 沿着哪里旋转
2. transform:rotateX(10deg) // 沿着 x 轴旋转
3. transform:rotateY(10deg) // 沿着 y 轴旋转
4. transform:rotateZ(10deg) // 沿着 z 轴旋转

### 3D 缩放

1. transform-origin:top/bottom/center; // 沿着哪里缩放
2. transform:scaleX(10deg) // 沿着 x 轴缩放
3. transform:rscaleY(10deg) // 沿着 y 轴缩放
4. transform:scaleZ(10deg) // 沿着 z 轴缩放

## 动画

不需要触发,可以一直持续执行

关键帧的时间单位
  
 数字：0%、25%、100%等
  
 字符：from(0%)、to(100%)
  
1.定义:

     语法: 可以只有to
     @keyframes 动画名称{
     from{
       开始状态
       } to{
       结束状态
       }
    }

2.调用

盒子通过 animation 去调用动画

animation: 复合属性
属性名 | 设置
--- |--

1. 调用动画名称 | animation-name
2. 动画持续的时间 | animation-duration
3. 执行次数 | animation-iteration-count(默认为 1 次,infinite 一直执行)
4. 延时执行的时间 | animation-delay:2s
5. 执行的速度| animation-timing-function:inear 匀速 ease 缓冲 ease-in 由慢到快 ease-out 由快到慢 ease-in-out 由慢到快再到慢。cubic-bezier(number,number,number,number)：特定的贝塞尔曲线类型，4 个数值需在[0, 1]区间内
6. 动画逆波(动画在执行中如何返回 |animation-direction:alternat 动画时间之外的状态
7. 动画时间之外的问题|animation-fill-mode:forwords 停止到动画结束的状态 / backwords (默认)
8. 动画的播放状态| animation-play-state:（ running 播放 和 paused 暂停 ）
9. 播放前重置,动画是否重置后再开始播放 |animation-direction alternate 动画直接从上一次停止的位置开始执行 normal 动画第二次直接跳到 0%的状态开始执行

### 单一 animation 属性连写

```
<single-animation> = <single-animation-name> || <time> || <single-animation-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>


```

1. 如果提供多组属性值，以逗号进行分隔。
   注意：如果只提供一个<time>参数，则为 <' animation-duration '> 的值定义；

2. 如果提供二个<time>参数，则第一个为 <' animation-duration '> 的值定义，第二个为 <' animation-delay '> 的值定义
3. 对应的脚本特性为 animation。

### 动画执行完成后触发的事件

webkitTransitionEnd 事件：

当 CSS 3 的 transition 动画执行结束时，触发 webkitTransitionEnd 事件
使用：
dom.addEventListener(‘webkitTransitionEnd’,function(){})
注意 dom 是一个 dom 对象

## 伸缩布局

1.设置伸缩盒子

display:flex; 给直接父容器设置为伸缩盒子

flex: 设置子元素在父元素中的缩放比例

2.特点

只有伸缩盒子才有主轴和侧轴

主轴: 默认水平方向从左向右
  
侧轴: 侧轴始终垂直于主轴
  
3.调整主轴的方向 flex-direction

子元素排列方向
取值：row | row-reverse | column | column-reverse

- flex-grow
  定义每一个子元素在盒子内的弹性
  拓展盒子剩余空间的能力
  取值：，默认 0

- flex-shrink
  元素收缩的能力
  取值：，默认 1

- flex-wrap
  元素在主轴方向排放时，能否换行
  取值：nowrap | wrap | wrap-reverse

  4.设置子元素在主轴方向的对齐方式 justify-content

子元素沿主轴方向的摆放
取值：flex-start | flex-end | center | space-between | space-around

5.设置子元素在侧方向的对齐方式 align-items

取值:center/flex-end(结束位置对齐)/flex-start(开始位置对齐)/baseline/stretch(默认值,拉伸)/

6.设置伸缩盒子中子元素的属性

align-self:center/flex-end/strech/flex-start/stretch/
注意:该属性是给单独或多个的子元素设置在侧轴方向的对齐方式
order
注意:设置元素的显示顺序(值越大显示顺序越靠后)

7.多行内容在容器内侧轴方向的对齐 align-content

取值: stretch(默认拉伸),flex-start/center/flex-end/space-around/space-beween
注意:1.该属性必须配合 flex-wrap 2.该属性设置的是元素在换行后在侧轴的对齐方式

8. order
   指定摆放时的顺序，从小到大
   取值：，默认 0

Flexbox 语法变化
.container {
display: -webkit-box;
display: -webkit-flex;
display: flex;
-webkit-box-direction: normal;
-webkit-box-orient: horizontal;
-webkit-flex-direction: row;
flex-direction: row;
-webkit-flex-wrap: nowrap;
flex-wrap: nowrap;
-webkit-box-pack: start;
-webkit-justify-content: flex-start;
justify-content: flex-start;
-webkit-align-content: stretch;
align-content: stretch;
}

多列布局
column-count 设置列数
column-gap 设置列间距
colume-rule 设置列中间的样式
colume-span 设置跨列 (all(跨越所有列显示))

媒体查询

rem 布局

设计图尺寸 640 750px
