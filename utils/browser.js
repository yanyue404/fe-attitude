// 如果页面底部可见，则返回 true，否则返回 false
export const bottomVisible = () =>
  document.documentElement.clientHeight + window.scrollY >=
  (document.documentElement.scrollHeight || document.documentElement.clientHeight)

// 复制到剪贴板
export const copyToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}

// 使用emit、on 和off 方法创建一个pub/sub（发布-订阅）事件中心。

export const createEventHub = () => ({
  hub: Object.create(null),
  emit(event, data) {
    ;(this.hub[event] || []).forEach(handler => handler(data))
  },
  on(event, handler) {
    if (!this.hub[event]) this.hub[event] = []
    this.hub[event].push(handler)
  },
  off(event, handler) {
    const i = (this.hub[event] || []).findIndex(h => h === handler)
    if (i > -1) this.hub[event].splice(i, 1)
  }
})

// 元素在视口中可见
// 如果指定的元素在视口中可见，则返回 true，否则返回 false。
// 省略第二个参数以确定元素是否完全可见，或指定 true 以确定它是否部分可见。
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect()
  const { innerHeight, innerWidth } = window
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
}

// 从元素中获取所有图像并将它们放入数组中
export const getImages = (el, includeDuplicates = false) => {
  const images = [...el.getElementsByTagName('img')].map(img => img.getAttribute('src'))
  return includeDuplicates ? images : [...new Set(images)]
}

// 返回当前页面的滚动位置。
export const getScrollPosition = (el = window) => ({
  x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
  y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
})

// 隐藏所有指定的元素。
export const hide = (...el) => [...el].forEach(e => (e.style.display = 'none'))

// 返回一个新的 MutationObserver 并为指定元素上的每个突变运行提供的回调。
// eg：
// const obs = observeMutations(document, console.log) // Logs all mutations that happen on the page
// obs.disconnect() // Disconnects the observer and stops logging mutations on the page
export const observeMutations = (element, callback, options) => {
  const observer = new MutationObserver(mutations => mutations.forEach(m => callback(m)))
  observer.observe(
    element,
    Object.assign(
      {
        childList: true,
        attributes: true,
        attributeOldValue: true,
        characterData: true,
        characterDataOldValue: true,
        subtree: true
      },
      options
    )
  )
  return observer
}

// 使用 Web Worker 在单独的线程中运行函数，从而允许长时间运行的函数不会阻塞 UI。
// https://github.com/ConardLi/30-seconds-of-code-Zh-CN?tab=readme-ov-file#runasync-
export const runAsync = fn => {
  const worker = new Worker(
    URL.createObjectURL(new Blob([`postMessage((${fn})());`]), {
      type: 'application/javascript; charset=utf-8'
    })
  )
  return new Promise((res, rej) => {
    worker.onmessage = ({ data }) => {
      res(data), worker.terminate()
    }
    worker.onerror = err => {
      rej(err), worker.terminate()
    }
  })
}

//   平滑滚动到页面顶部。
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

// 将调用它的元素平滑地滚动到浏览器窗口的可见区域。
export const smoothScroll = element =>
  document.querySelector(element).scrollIntoView({
    behavior: 'smooth'
  })
