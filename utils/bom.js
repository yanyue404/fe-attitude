class BOM {
  /**
   * 获取页面最大高度
   * @return {number} 页面最大高度
   */
  static getMaxHeight() {
    return Math.max(BOM.getPageHeight(), BOM.getWinHeight())
  }

  /**
   * 获取页面最大宽度
   * @return {number} 页面最大宽度
   */
  static getMaxWidth() {
    return Math.max(BOM.getPageWidth(), BOM.getWinWidth())
  }

  /**
   * 网页内容高度
   * @return {number} 网页内容高度
   */
  static getPageHeight() {
    const body = document.body
    const html = document.documentElement
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    )
    return height
  }

  /**
   * 网页内容宽度
   * @return {number} 网页内容宽度
   */
  static getPageWidth() {
    const body = document.body
    const html = document.documentElement
    const width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth)
    return width
  }

  /**
   * 浏览器可视区域高度
   * @return {number} 浏览器可视区域高度
   */
  static getWinHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  }

  /**
   * 浏览器可视区域宽度
   * @return {number} 浏览器可视区域宽度
   */
  static getWinWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  }

  /**
   * 获取页面中对象的绝对X位置
   * @param {HTMLElement} element DOM对象
   * @return {number} 绝对X位置
   */
  static getX(element) {
    let x = element.offsetLeft
    while ((element = element.offsetParent)) {
      x += element.offsetLeft
    }
    return x
  }

  /**
   * 获取页面中对象的绝对Y位置
   * @param {HTMLElement} element DOM对象
   * @return {number} 绝对Y位置
   */
  static getY(element) {
    let y = element.offsetTop
    while ((element = element.offsetParent)) {
      y += element.offsetTop
    }
    return y
  }

  /**
   * 获取页面滚动左偏移量
   * @return {number} 滚动左偏移量
   */
  static getScrollLeft() {
    return window.pageXOffset || document.documentElement.scrollLeft
  }

  /**
   * 获取页面滚动上偏移量
   * @return {number} 滚动上偏移量
   */
  static getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop
  }

  /**
   * 滚动到页面ID元素位置
   * @param {string} elementId 元素ID
   */
  static scrollToAnchor(elementId) {
    document.getElementById(elementId).scrollIntoView({
      behavior: 'smooth'
    })
  }
}

export default BOM
