# WX

- 一、我的设计
- 二、component
- 三、数据流
- 四、路由
- 五、事件与生命周期
- 六、case
- 七、snippets
- 八、开放接口
- 九、wxml 数据绑定
- 十、生态圈

## 一、我的

- wx.yue = Event; // 注册发布订阅模式
- wx.Storage = Storage; // 注册 storage
- async await
- flexStyle
- 弱网调试 Fast 3G

## 二、component

### 1. image

- mode = "scaleToFill" 不保持横纵比例缩放占满区域
- mode ="aspectFit" 保持纵横比缩放图片，长边完全显示
- mode = "aspectFill" 保持纵横比缩放图片，短边完全显示
- mode = "widthFix" 宽度不变，高度自动变化，保持原图宽高比不变

### 2. view，text

- text 不能实现多行文字截断，使用 view 元素

- video,image 与 view 上下有间隙， dispaly:block

- `<view> \n</view>`文本换行

### 3.picker

- [picker](https://developers.weixin.qq.com/miniprogram/dev/component/picker.html)

## 三、数据流

- onLoad
  `onLoad(Object query)` onLoad 的参数中获取打开当前页面路径中的参数。
- 页面跳转传递参数 (不支持 tabbar 页面)

* `wx.navigateTo({ url:`../mediaCoverage_detail/mediaCoverage_detail?id=\${target.id}`});`
* `wx.reLaunch` 关闭所有页面，打开到应用内的某个页面(支持所有页面)

```js
toSortPage(e) {
        var data = e.currentTarget.dataset;
        wx.reLaunch({
            url: '../sort/sort?id=' + data.id + '&type=' + data.type + '&index=' + data.index
        })
    },
```

- setData 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 this.data 的值（同步）

```js
this.setData(
  {
    text: "changed data"
  },
  function() {
    // setData引起的界面更新渲染完毕后的回调函数
  }
);
```

## 四、路由

- 返回上一页

```bash
    returnLastPage() {
        wx.navigateBack({
            delta: 1
        })
    },
```

- 跳转至非 tabbar 页面

```bash
`wx.navigateTo({url: '../logs/logs'})`
```

> 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。

- 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面

```js
wx.switchTab({
  url: "../whereCanSearch/whereCanSearch"
});
```

- `redirectTo` 与 `navigateTo`
  - 均支持非 tabbar 页面的 路由跳转传参
  - `redirectTo` 关闭当前的页面再跳转
  - `navigateTo` 保留当前的页面，使用 wx.navigateBack 可以返回到原页面(最多 10 层)

## 五、事件与生命周期

- 下拉刷新
  - page 下拉

```js
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {}
```

- 可视滚动区域滚动至底部刷新

```js
<scroll-view
  scroll-y
  style="white-space: nowrap;height:100%;"
  bindscrolltolower="updateData"
/>
```

- 事件绑定与事件冒泡
  bind 事件绑定不会阻止冒泡事件向上冒泡，catch 事件绑定可以阻止冒泡事件向上冒泡。

```js
<view id="outer" bindtap="handleTap1">
  outer view
  <view id="middle" catchtap="handleTap2">
    middle view
    <view id="inner" bindtap="handleTap3">
      inner view
    </view>
  </view>
</view>
```

## 六、case

- class

  - `<view wx:for="{{mediaData}}" class="coverageBox {{(index < mediaData.length -1) ? 'border_bottom':'' }}" data-index ="{{index}}" ></view>`
  - `<view wx:for="{{hotcityList}}" class="weui-grid {{(index +1) %3 == 0 ? 'flexWrap':'' }}" data-index="{{index}}" data-code="110000" data-city="北京市" bindtap="bindCity"></view>`

- 公共头部
  - `<import src="../../component/normal_head.wxml" />`
  - `<template is="head" data="{{title: '哪里能查',color:'black'}}" />`
- 获取视图 dom 元素信息
  function getEle(domStr, callback) {
  const query = wx.createSelectorQuery();
  query.select(domStr).boundingClientRect()
  query.selectViewport().scrollOffset()
  query.exec(function (res) {
  callback(res)
  })
  }
- 没有 `mode="widthFix"`

```html
<view class="offerPrice nowrap"
  >¥{{item.plus_price}}
  <image class="youhuiBox" src="../../assets/youhuiBox.png">
    <view class="youhuiText">会员{{item.plus}}折</view>
  </image>
</view>
```

## 七、snippets

- dataset
  `var data = e.currentTarget.dataset;`
- setData

```js
 changeItemInArray() {
    // 对于对象或数组字段，可以直接修改一个其下的子字段，这样做通常比修改整个对象或数组更好
    this.setData({
      'array[0].text': 'changed data'
    })
  },
  changeItemInObject() {
    this.setData({
      'object.text': 'changed data'
    })
  },
```

- load

```js
const app = getApp();
const util = require("../../utils/util.js");
const api = require("../../utils/api.js");
```

- promiseRequest

```js
util.promiseRequest(api.mediaUrl, {}).then(res => {
  const data = res.data.response_data.lists;
});
```

- mock

```js
const mockData = require("../../mock/forYourAnswer.js");

setTimeout(() => {
  that.setData({
    defaultData: mockData.default
  });
}, 300);
```

- toast

```js
wx.showToast({
  title: "支付成功...",
  icon: "none",
  duration: 1000,
  complete: function() {
    setTimeout(() => {
      y.setData({
        kaiTong: true
      });
    }, 1000);
  }
});
```

## 八、开放接口

- 设备系统信息 `wx.getSystemInfoSync()`
- 用户信息 `wx.getUserInfo(Object object)` 调用前需要 用户授权 scope.userInfo,获取用户信息。
- 授权信息 `wx.authorize(Object object)` 提前向用户发起授权请求。调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据
- 支付

```js
var payParam = res.data.response_data;
wx.requestPayment({
  timeStamp: payParam.timeStamp,
  nonceStr: payParam.nonceStr,
  package: payParam.package,
  signType: payParam.signType,
  paySign: payParam.paySign,
  success: function(res) {
    console.log("支付成功" + res);
  },
  error: function(res) {
    console.log("支付失败" + res);
  }
});
```

## 九、wxml 数据绑定

### 数据绑定

- 1.base

```js
<view>{{ message }}</view>;
Page({
  data: {
    message: "Hello MINA!",
    id: 0
  }
});
```

- 2.组件属性(需要在双引号之内)

```js
<view id="item-{{id}}" />;
Page({
  data: {
    id: 0
  }
});
```

- 3.控制属性(需要在双引号之内)

```js
<view wx:if="{{condition}}" />;
Page({
  data: {
    condition: true
  }
});
```

- 4.关键字(需要在双引号之内)
  true：boolean 类型的 true，代表真值。
  false： boolean 类型的 false，代表假值。

```js
<checkbox checked="{{false}}" />
```

### 支持运算

- 三元运算

```js
<view hidden="{{flag ? true : false}}">Hidden</view>
```

- 算数运算

```js
<view>{{a + b}} + {{c}} + d</view>
Page({
  data: {
    a: 1,
    b: 2,
    c: 3
  }
})
```

> view 中的内容为 3 + 3 + d。

- 逻辑判断

```js
<view wx:if="{{length > 5}}" />
```

- 字符串运算

```js
view>{{"hello" + name}}</view>
Page({
  data: {
    name: 'MINA'
  }
})
```

- 数据路径运算

```js
<view>{{object.key}} {{array[0]}}</view>
Page({
  data: {
    object: {
      key: 'Hello '
    },
    array: ['MINA']
  }
})
```

- 组合数组

```js
<view wx:for="{{[zero, 1, 2, 3, 4]}}">{{ item }}</view>;
Page({
  data: {
    zero: 0
  }
});
```

### 列表渲染

- `wx:for`
  `wx:for`控制属性绑定一个数组.默认数组的当前项的下标变量名默认为 index，数组当前项的变量名默认为 item

```js
<view wx:for="{{array}}">{{index}}: {{item.message}}</view>
```

使用 wx:for-item 可以指定数组当前元素的变量名，

使用 wx:for-index 可以指定数组当前下标的变量名：

```js
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName">
  {{idx}}: {{itemName.message}}
</view>
```

- `block wx:for`
  类似 block wx:if，也可以将 wx:for 用在<block/>标签上，以渲染一个包含多节点的结构块。例如：

```js
<block wx:for="{{[1, 2, 3]}}">
  <view>{{ index }}:</view>
  <view>{{ item }}</view>
</block>
```

- `wx:key`
  留关键字 `*this` 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字

```js
<switch wx:for="{{objectArray}}" wx:key="unique" style="display: block;">
  {{item.id}}
</switch>
<button bindtap="switch">Switch</button>
<button bindtap="addToFront">Add to the front</button>

<switch wx:for="{{numberArray}}" wx:key="*this" style="display: block;">
  {{item}}
</switch>

objectArray: [
      {id: 5, unique: 'unique_5'},
      {id: 4, unique: 'unique_4'},
      {id: 3, unique: 'unique_3'},
      {id: 2, unique: 'unique_2'},
      {id: 1, unique: 'unique_1'},
      {id: 0, unique: 'unique_0'},
    ],
numberArray: [1, 2, 3, 4]
```

[参考](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxml/list.html)

### 条件渲染

- `wx:if` ,来判断是否需要渲染该代码块：

```js
<view wx:if="{{condition}}">True</view>
```

- 也可以用 wx:elif 和 wx:else 来添加一个 else 块：

```js
<view wx:if="{{length > 5}}">1</view>
<view wx:elif="{{length > 2}}">2</view>
<view wx:else>3</view>
```

- `block wx:if`
  因为 wx:if 是一个控制属性，需要将它添加到一个标签上。如果要一次性判断多个组件标签，可以使用一个 <block/> 标签将多个组件包装起来，并在上边使用 wx:if 控制属性。

```js
<block wx:if="{{true}}">
  <view>view1</view>
  <view>view2</view>
</block>
```

> 注意： <block/> 并不是一个组件，它仅仅是一个包装元素，不会在页面中做任何渲染，只接受控制属性。

- wx:if vs hidden
  频繁切换：用 hidden。偶尔切换：用 wx:if。

```js
data: {
  hidden: true;
}
```

## 十、生态圈

- [taro](https://github.com/NervJS/taro) 多端开发的小程序，h5 框架
  - [更多案例](https://github.com/NervJS/taro/issues/244)

## Userful Links

- [快速了解小程序](http://ssh.today/blog/hello-min-app)
- [从零开始一个微信小程序版知乎](https://juejin.im/post/5a61b6a1518825732739af03)
- [首个微信小程序开发教程！](https://juejin.im/entry/57e34d6bd2030900691e9ad7)

## 其他记录

### 小程序部分不支持

```js
 <block wx:elif="{{Info.score > jifenShouldOver}}">
                <view class='name'>当前可用{{Info.score}}积分抵现</view>
                <view class='content selectJF' bindtap='useJifen' data-score="{{Info.score}}">
                    {{userJifenNum == 0? '':'- ￥' + userJifenNum/100}}
                    <image mode="widthFix" src="{{default_useJifen ? checked:normal}}" style='width:30rpx;'></image>
     </view>
 </block>
- 图片不显示问题(严格区分大小写)
`<image class='rightIcon' src="../../assets/icon/addressRight.png"></image>` =>  `addressRight.png`
```

### wxParse 迭代赋值

```js
var that = this;
// after ajax
var data = res.data.data;
that.setData(
  {
    result: data
  },
  function() {
    utils.addKey(data, function(v, index, array) {
      // temp 存储
      WxParse.wxParse("article" + index, "html", v["content"], that, 5);
      // 迭代真实存储
      v.article = that.data[`article${index}`];
    });
    that.setData({
      result: data
    });
    console.log(that);
  }
);
```

### 屏幕高度占满 100%

- 方法一、

```css
.index {
  height: 100vh;
  width: 100vw;
}
# CSS3引入的"vw"和"vh"基于宽度/高度相对于窗口大小
# "vw" = "view width"  "vh" = "view height"
```

- 方法二、

```js
onLoad: function () {
   this.setData({
     height: wx.getSystemInfoSync().windowHeight,
     width: wx.getSystemInfoSync().windowWidth
   })
 }
```
