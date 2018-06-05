
    function checkImgs() {
      var imgs = document.getElementsByTagName('img');
      var imgsArray = Array.prototype.slice.call(imgs);
      imgsArray.forEach((v, index) => {
          if (v.style.src == "") {
              v.setAttribute("src", "https://xiaoyueyue165.github.io/static/smart/lazyload/wait.png")
          }
          if (isInSight2(v)) {
              loadImgs(v)
          }
      });
  }
  //  如何判断元素是否在可视区域
  // 方法一 
  function isInSight2(ele) {
      var visibleArea = document.documentElement.clientHeight;//屏幕可视区域的高度
      var eleTop = ele.offsetTop;//元素相对于文档顶部的距离
      var scrollTop = document.documentElement.scrollTop;// 获取浏览器窗口顶部距离文档顶部的距离（滚动条滚动的距离）
      return eleTop - scrollTop < visibleArea ? true : false
  }
  // 方法二 https://segmentfault.com/a/1190000010744417
  function isInSight(el) {
      const bound = el.getBoundingClientRect(); // 图片到顶部可视区域的高度
      const clientHeight = window.innerHeight;// 可视区域的高度
      //如果只考虑向下滚动加载
      //const clientWidth=window.innerWeight;
      return bound.top <= clientHeight + 100;
  }
  function loadImgs(el) {
      if (el.src.indexOf('wait') !== -1) {
          var source = el.dataset.src;
          el.src = source
      }
  }
  // 函数节流 
  function throttle(fn, mustRun = 500) {
      const timer = null;
      let previous = null;
      return function () {
          const now = new Date();
          const context = this;
          const args = arguments;
          if (!previous) {
              previous = now;
          }
          const remaining = now - previous;
          if (mustRun && remaining >= mustRun) {
              fn.apply(context, args);
              previous = now;
          }
      }
  }