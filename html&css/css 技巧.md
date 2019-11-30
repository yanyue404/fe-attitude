# Css 技巧

## 一、flex 调整主轴多行排列高度不固定

包裹块不使用固定高度，使用 `height:100%`,间距使用 margin 控制

```html
<view class="leftAddress columnBetweenStart">
  <view class="upBox oneLineStart">
    <view class="name">小明</view>
    <view class="phoneNumber">135 6787 5678</view>
  </view>
  <view class="bottomBox line-clamp2">
    北京市朝阳区 高碑店高碑店东*****小区28号楼3单元102室
  </view>
</view>
```

```css
.columnBetweenStart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
}
```

## 二、flex 布局最后一行使用 `space-between`数量不足占位问题

- 根据布局列数，多加 `n-2` 个空白与列等宽的盒子占宽
- 父盒子使用 after（适用于每行列数确定的场景）

```css
ul::after {
  content: '';
  flex: auto;
}
```

- 固定宽度 + .item:nth-child(3n){ margin-right:0 !important;}

## 三、 opacity 透明度继承问题

使用 background: rgba 的第四个参数设置透明程度

```css
.Mask {
  position: fixed;
  width: 750rpx;
  height: 100%;
  background: #000;
  opacity: 0.5;
  z-index: 999;
}
```

```css
.Mask {
  background: rgba(0, 0, 0, 0.5);
}
```

## 四、 nth-child && nth-last-child

```css
/* 选中前 3个元素设置 */
&:nth-child(-1n + 3)::after {
  position: absolute;
  right: 0;
  top: 0.625rem;
  content: '';
  width: 1px;
  height: 1.25rem;
  background: rgba(238, 238, 238, 1);
}
/* 选中后4个元素设置 */
&:nth-last-child(-n + 4) {
  padding-top: 0.9375rem;
}
```

## 五、 巧用 padding 与 margin 实现比例(**占位**)布局

- padding/margin 设置为百分比值时，全部参照父元素的 width 属性参照计算
  - top/bottom
  - left/right

```css
/* max-hieght 无法使用 */
#container {
  width: 50%; //父元素宽度的一半
  background-color: red; //仅为了方便演示
}
.placeholder {
  padding-top: 50%; //与width: 50%;的值保持一致，也就是相当于父元素宽度的一半。
}
```

> 最优解

```css
#container {
  width: 50%;
  position: relative;
  background-color: red;
  overflow: hidden; //需要触发BFC消除margin折叠的问题
}
.placeholder:after {
  content: '';
  display: block;
  margin-top: 100%; //margin 百分比相对父元素宽度计算
}
```

**html 结构**

```html
<div id="container" class="placeholder"></div>
```

## 六、文字两端对齐

- demo1

```html
<style>
  #test div {
    width: 90px;
    height: 21px;
    border: 1px solid green;
    text-align: justify;
  }

  #test div:after {
    content: ' ';
    display: inline-block;
    width: 100%;
  }
</style>
<div id="test">
  <div>手机号码</div>
  <div>登录</div>
</div>
```

- demo2

```html
<style>
  #test2 div {
    margin: 10px 0;
    width: 100px;
    border: 1px solid red;
    text-align-last: justify;
  }
</style>
<div id="test2">
  <div>手机号码</div>
  <div>登录</div>
  <div>还有谁</div>
</div>
```

## 七、页面底部占位

使用 `margin-bottom`底部占位，在 iphone 设备上不支持，兼容方法如下：

```Scss
.space:after {
  display: block;
  content: "";
  width: 100%;
  height: 120px;
  background: transparent;
}
```

### 参考

- [巧用 margin/padding 的百分比值实现高度自适应（多用于占位，避免闪烁）](https://segmentfault.com/a/1190000004231995)
- [小技巧|CSS 如何实现文字两端对齐](https://segmentfault.com/a/1190000011336392)

## 在线工具

- [base64 图片](http://tool.chinaz.com/tools/imgtobase)
- [HTML5 Please Use the new and shiny responsibly](http://html5please.com/)
- [兼容性速查](https://caniuse.com/)
- [在线配色选择器](http://www.peise.net/tools/web/)
- [CSS3 动画编辑](https://www.w3cways.com/css3-animation-tool)
