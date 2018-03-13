## 如何判断元素是否在可视区域
### 方法一

通过document.documentElement.clientHeight获取屏幕可视窗口高度
通过element.offsetTop获取元素相对于文档顶部的距离
通过document.documentElement.scrollTop获取浏览器窗口顶部与文档顶部之间的距离，也就是滚动条滚动的距离
然后判断②-③<①是否成立，如果成立，元素就在可视区域内。

````javascript
 function isInSight2(ele) {
        var visibleArea = document.documentElement.clientHeight;//屏幕可视区域的高度
        var eleTop = ele.offsetTop;//元素相对于文档顶部的距离
        var scrollTop = document.documentElement.scrollTop;// 获取浏览器窗口顶部距离文档顶部的距离（滚动条滚动的距离）
        return eleTop - scrollTop < visibleArea ? true : false
    }
````

### 方法二（推荐）
通过getBoundingClientRect()方法来获取元素的大小以及位置，[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Range/getBoundingClientRect)上是这样描述的： 
> The Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
这个方法返回一个名为ClientRect的DOMRect对象，包含了top、right、botton、left、width、height这些值。

MDN上有这样一张图：
![image](./img/rect.png)

可以看出返回的元素位置是相对于左上角而言的，而不是边距。

我们思考一下，什么情况下图片进入可视区域。

假设const bound = el.getBoundingClientRect();来表示图片到可视区域顶部距离；
并设 const clientHeight = window.innerHeight;来表示可视区域的高度。

随着滚动条的向下滚动，bound.top会越来越小，也就是图片到可视区域顶部的距离越来越小，当bound.top===clientHeight时，图片的上沿应该是位于可视区域下沿的位置的临界点，再滚动一点点，图片就会进入可视区域。

也就是说，在bound.top<=clientHeight时，图片是在可视区域内的。

我们这样判断：

````javascript  
function isInSight(el) {
  const bound = el.getBoundingClientRect();
  const clientHeight = window.innerHeight;
  //如果只考虑向下滚动加载
  //const clientWidth = window.innerWeight;
  return bound.top <= clientHeight + 100; // +100提前加载
}
````  
### 第三种 IntersectionObserver API 
- http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html
- https://github.com/justjavac/the-front-end-knowledge-you-may-dont-know/issues/10

### 函数节流
在类似于滚动条滚动等频繁的DOM操作时，总会提到“函数节流、函数去抖”。

所谓的函数节流，也就是让一个函数不要执行的太频繁，减少一些过快的调用来节流。

基本步骤：

获取第一次触发事件的时间戳
获取第二次触发事件的时间戳
时间差如果大于某个阈值就执行事件，然后重置第一个时间


````javascript
function throttle(fn, mustRun = 500) {
  const timer = null;
  let previous = null;
  return function() {
    const now = new Date();
    const context = this;
    const args = arguments;
    if (!previous){
      previous = now;
    }
    const remaining = now - previous;
    if (mustRun && remaining >= mustRun) {
      fn.apply(context, args);
      previous = now;
    }
  }
}
````

> 这里的mustRun就是调用函数的时间间隔，无论多么频繁的调用fn，只有remaining>=mustRun时fn才能被执行。

###### 参考
- https://segmentfault.com/a/1190000010744417


