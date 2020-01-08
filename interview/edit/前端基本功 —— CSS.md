` ## 前言

是思过崖，是训练场，开始扎马步！

## CSS

- [盒模型](#盒模型)
- [块元素，行内元素以及行内块](#块元素，行内元素以及行内块)
- [flex 布局](#flex布局)
- [媒体查询](#媒体查询)
- [居中布局](#居中布局)
- [rem 布局](#rem布局)
- [清除浮动](#清除浮动)
- [position 定位参照](#position定位参照)
- [层叠上下文](#层叠上下文)
- [BFC](#BFC)
- [选择器优先级](#选择器优先级)
- [常用选择器](#常用选择器)
- [CSS 预处理器优势](#CSS预处理器)
- [两列布局](#两列布局)
- [CSS 动画](#CSS动画)

## 居中布局

- 常用选择器
  - id，class，元素
  - 后代选择器 空格分隔
  - 子选择符(E>F) 选择所有作为 E 元素的子元素 F
  - 相邻兄弟选择器（E+F）选择紧贴在 E 元素之后 F 元素
  - 兄弟选择符(E~F) 选择 E 元素后面的所有兄弟元素 F
  - [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) E:hover、 E:active、 E:focus、E:not()、 E:first-child、 E:last-child、 E:nth-child(n) E:nth-last-child(n)、 E:nth-of-type(n)
  - [属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) E[attr]、E[attr="val"]、E[attr$="val"]、E[attr^="val"]、E[attr*="val"] 、E[attr|="val"]
  - [伪元素](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements) E::first-line、E::letter、 E::before、 E::aftet、E:selection

## 选择器优先级

```
最高级： !important
第一等： 代表内联样式，如: style="xxx"，权值为1000
第二等： 代表ID选择器，如：#content，权值为100
第三等： 代表类，伪类和属性选择器，如.content，:hover，[type="radio"]，权值为10
第四等： 代表元素选择器和伪元素选择器，如div，::before，权值为1

注意：通配选择符（*）关系选择符（+, >, ~, ' ', ||）和 否定伪类（:not()）对优先级没有影响。
（但是，在 :not() 内部声明的选择器会影响优先级）。
```

- postion 的各个属性值是分别相对于什么定位?

- 块元素，行内元素以及行内块的不同点

```
块状元素特征：  (1)能够识别宽高,宽度默认是它容器的100%，除非设定一个宽度
　　　　　　　  (2)margin和padding的上下左右均对其有效
　　　　　　　  (3)可以自动换行
　　　　　　　  (4)默认排列方式为从上至下
              (5)可以容纳内联元素和其他块元素

行内元素特征：  (1)设置宽高无效,大小由其内含的内容决定
　　　　　　　  (2)对margin仅设置水平方向有效，垂直方向无效；padding设置上下左右都有效，即会撑大空间
              (3)不会自动进行换行,和其他元素都在同一行
              (4)默认排列方式为从左到右
              (5)只能容纳文本或者其他内联元素。

行内块状元素特征：(1)能够识别宽高
               (2)margin和padding的上下左右均对其有效
　　　　　　　　　(3)不自动换行
　　　　　　　　　(4)默认排列方式为从左到右
```

- [#39 rem 适配移动设备](https://github.com/yanyue404/blog/issues/39)
- [#40 Css3 动画 ](https://github.com/yanyue404/blog/issues/40)

### 参考

- [2017-08 面试总结（at,dm）- sunyongjian ](https://github.com/sunyongjian/blog/issues/32)
- [面试问别人的一些问题 - sunyongjian ](https://github.com/sunyongjian/blog/issues/24)
- [2019-03 面试总结（alicloud, tikTok, ke, ks）- sunyongjian ](https://github.com/sunyongjian/blog/issues/41)
- [front-end-interview-handbook](https://github.com/yangshun/front-end-interview-handbook/blob/master/Translations/Chinese/README.md)
- [CS-Interview-Knowledge-Map](https://github.com/InterviewMap/CS-Interview-Knowledge-Map)
