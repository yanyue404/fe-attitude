var bom = {
  /**
   * 获取页面最大高度
   * @return 属性样式
   */
  getMaxH: function() {
    return this.getPageHeight() > this.getWinHeight()
      ? this.getPageHeight()
      : this.getWinHeight();
  },

  /**
   * 获取页面最大宽度
   * @return 属性样式
   */
  getMaxW: function() {
    return this.getPageWidth() > this.getWinWidth()
      ? this.getPageWidth()
      : this.getWinWidth();
  },

  /**
   * 网页内容高度
   * @return {int} 网页内容高度
   */
  getPageHeight: function() {
    var h =
      window.innerHeight && window.scrollMaxY
        ? window.innerHeight + window.scrollMaxY
        : document.body.scrollHeight > document.body.offsetHeight
        ? document.body.scrollHeight
        : document.body.offsetHeight;
    return h > document.documentElement.scrollHeight
      ? h
      : document.documentElement.scrollHeight;
  },

  /**
   * 网页内容宽度
   * @return {int} 网页内容宽度
   */
  getPageWidth: function() {
    return window.innerWidth && window.scrollMaxX
      ? window.innerWidth + window.scrollMaxX
      : document.body.scrollWidth > document.body.offsetWidth
      ? document.body.scrollWidth
      : document.body.offsetWidth;
  },

  /**
   * 浏览器可视区域高度
   * @return {int} 网可视区域高度
   */
  getWinHeight: function() {
    return window.innerHeight
      ? window.innerHeight
      : document.documentElement && document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : document.body.offsetHeight;
  },

  /**
   * 浏览器可视区域宽度
   * @return {int} 网可视区域宽度
   */
  getWinWidth: function() {
    return window.innerWidth
      ? window.innerWidth
      : document.documentElement && document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : document.body.offsetWidth;
  },

  /**
   * 获取页面中对象的绝对X位置
   * @param {dom} e dom对象
   * @return {int}
   */
  getX: function(e) {
    var t = e.offsetLeft;
    while ((e = e.offsetParent)) t += e.offsetLeft;
    return t;
  },
  /**
   * 获取页面中对象的绝对Y位置
   * @param {dom} e dom对象
   * @return {int}
   */
  getY: function(e) {
    var t = e.offsetTop;
    while ((e = e.offsetParent)) t += e.offsetTop;
    return t;
  },
  getScrollLeft: function() {
    return window.pageXOffset || document.documentElement.scrollLeft;
  },
  getScrollTop: function() {
    return window.pageYOffset || document.documentElement.scrollTop;
  }
};
