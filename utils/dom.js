const dom = {
  $: (selector, el = document) => el.querySelector(selector),

  $$: (selector, el = document) => Array.from(el.querySelectorAll(selector)),

  index: element => Array.from(element.parentNode.children).indexOf(element),

  getIndexByClass: (param, rule) => {
    const element = param.className ? param : param.target
    const className = element.className
    const domArr = Array.from(document.querySelectorAll(`.${className}`))
    return domArr.indexOf(element)
  },

  every: (nodeList, fn) => {
    nodeList.forEach((node, index) => fn.call(null, node, index))
    return nodeList
  },

  siblings: obj => {
    const siblings = Array.from(obj.parentNode.children).filter(child => child !== obj)
    return siblings
  },

  /**
   * 功能:根据索引值找兄弟节点
   * @param {HTMLElement} ele
   * @param {number} index
   * @returns {HTMLElement}
   */
  getSibEleOfIndex: (ele, index) => ele.parentNode.children[index],

  uniqueClass: (element, className) => {
    dom.every(element.parentNode.children, el => el.classList.remove(className))
    element.classList.add(className)
    return element
  },

  hasClass: (obj, classStr) => obj.classList.contains(classStr),

  addClass: (obj, classStr) => obj.classList.add(classStr),

  removeClass: (obj, classStr) => obj.classList.remove(classStr),

  replaceClass: (obj, newName, oldName) => {
    dom.removeClass(obj, oldName)
    dom.addClass(obj, newName)
  },

  on: (element, eventType, selector, fn) => {
    element.addEventListener(eventType, e => {
      let el = e.target
      while (!el.matches(selector)) {
        if (element === el) {
          el = null
          break
        }
        el = el.parentNode
      }
      el && fn.call(el, e, el)
    })
    return element
  },

  onSwipe: (element, fn) => {
    let x0, y0
    element.addEventListener('touchstart', e => {
      x0 = e.touches[0].clientX
      y0 = e.touches[0].clientY
    })
    element.addEventListener('touchmove', e => {
      if (!x0 || !y0) return
      const xDiff = e.touches[0].clientX - x0
      const yDiff = e.touches[0].clientY - y0

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        fn.call(element, e, xDiff > 0 ? 'right' : 'left')
      } else {
        fn.call(element, e, yDiff > 0 ? 'down' : 'up')
      }
      x0 = y0 = null
    })
  },

  getStyle: (ele, attr) => getComputedStyle(ele, null).getPropertyValue(attr),

  css: (target, cssObj) => {
    Object.assign(target.style, cssObj)
    return target
  },

  create: (html, children) => {
    const template = document.createElement('template')
    template.innerHTML = html.trim()
    const node = template.content.firstChild
    if (children) {
      dom.append(node, children)
    }
    return node
  },

  append: (parent, children) => {
    if (!Array.isArray(children)) children = [children]
    children.forEach(child => parent.appendChild(child))
    return parent
  },

  prepend: (parent, children) => {
    if (!Array.isArray(children)) children = [children]
    children.reverse().forEach(child => {
      if (parent.firstChild) {
        parent.insertBefore(child, parent.firstChild)
      } else {
        parent.appendChild(child)
      }
    })
    return parent
  },

  setOpacity: (obj, val) => {
    obj.style.opacity = val / 100
  },

  fadeIn: obj => {
    let val = 10
    const interval = setInterval(() => {
      if (val >= 100) clearInterval(interval)
      dom.setOpacity(obj, val)
      val += 10
    }, 250)
  },

  fadeOut: target => {
    let opacity = 100
    const interval = setInterval(() => {
      opacity -= opacity / 20
      dom.css(target, { opacity: opacity / 100 })
      if (opacity <= 5) {
        clearInterval(interval)
        dom.css(target, { display: 'none', opacity: 1 })
      }
    }, 10)
  },

  removeChildren: element => {
    while (element.firstChild) {
      element.removeChild(element.firstChild)
    }
    return element
  },

  remove: el => {
    if (typeof el === 'string') {
      document.querySelectorAll(el).forEach(node => node.remove())
    } else if (el instanceof NodeList) {
      el.forEach(node => node.remove())
    } else {
      el.remove()
    }
  }
}

const domClassControl = {
  addClass: (el, className) => {
    if (typeof el === 'string') el = document.querySelectorAll(el)
    const els = el instanceof NodeList ? Array.from(el) : [el]
    els.forEach(e => e.classList.add(className))
  },

  removeClass: (el, className) => {
    if (typeof el === 'string') el = document.querySelectorAll(el)
    const els = el instanceof NodeList ? Array.from(el) : [el]
    els.forEach(e => e.classList.remove(className))
  },

  hasClass: (el, className) => {
    if (typeof el === 'string') el = document.querySelector(el)
    return el.classList.contains(className)
  },

  toggleClass: (el, className) => {
    if (typeof el === 'string') el = document.querySelector(el)
    el.classList.toggle(className)
  }
}

function insertAfter(newEl, targetEl) {
  targetEl.parentNode.insertBefore(newEl, targetEl.nextSibling)
}

function appendHTML(el, html) {
  const fragment = document.createDocumentFragment()
  const divTemp = document.createElement('div')
  divTemp.innerHTML = html
  Array.from(divTemp.childNodes).forEach(node => fragment.appendChild(node))
  el.appendChild(fragment)
}

function prependHTML(el, html) {
  const fragment = document.createDocumentFragment()
  const divTemp = document.createElement('div')
  divTemp.innerHTML = html
  Array.from(divTemp.childNodes).forEach(node => fragment.appendChild(node))
  el.insertBefore(fragment, el.firstChild)
}

function htmlToElement(html) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.firstChild
}

function htmlToElements(html) {
  const template = document.createElement('template')
  template.innerHTML = html.trim()
  return template.content.childNodes
}

function addEvent(element, type, handler, options) {
  element.addEventListener(type, handler, options)
}

function removeEvent(element, type, handler, options) {
  element.removeEventListener(type, handler, options)
}

function listenTouch(target, options) {
  let startX, startY
  const handleTouchEvent = event => {
    switch (event.type) {
      case 'touchstart':
        startX = event.touches[0].pageX
        startY = event.touches[0].pageY
        break
      case 'touchend':
        const spanX = event.changedTouches[0].pageX - startX
        const spanY = event.changedTouches[0].pageY - startY
        if (Math.abs(spanX) > Math.abs(spanY)) {
          if (spanX > 30) options.right?.()
          else if (spanX < -30) options.left?.()
        } else {
          if (spanY > 30) options.bottom?.()
          else if (spanY < -30) options.top?.()
        }
        break
      case 'touchmove':
        event.preventDefault()
        break
    }
  }
  addEvent(target, 'touchstart', handleTouchEvent)
  addEvent(target, 'touchend', handleTouchEvent)
  addEvent(target, 'touchmove', handleTouchEvent)
}

const Event = {
  stopBubble: event => event.stopPropagation(),

  stopDefault: event => event.preventDefault(),

  getTarget: event => event.target,

  listenEnter: func => {
    document.onkeydown = event => {
      if ((event || window.event).keyCode === 13) func()
    }
  },

  listenKeys: (number, func) => {
    document.addEventListener('keydown', event => {
      if ((event || window.event).keyCode === number) func()
    })
  }
}

function getCheckBoxVal(domArr) {
  return domArr
    .filter(v => v.checked)
    .map(v => v.value)
    .join(',')
}

function listenDom(ele, callback) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes') callback(ele, mutation.target)
    })
  })
  observer.observe(ele, { attributes: true })
}

export {
  dom,
  domClassControl,
  insertAfter,
  appendHTML,
  prependHTML,
  htmlToElement,
  htmlToElements,
  addEvent,
  removeEvent,
  listenTouch,
  Event,
  getCheckBoxVal,
  listenDom
}
