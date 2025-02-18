/**
 * 异步加载JS并执行回调函数
 * @param {string} url - JS文件的URL
 * @param {function} callback - 加载完成后的回调函数
 * @param {string} [charset] - 可选，设置字符集
 */
function loadScript(url, callback, charset) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  if (charset) {
    script.setAttribute('charset', charset)
  }

  if (script.readyState) {
    // IE
    script.onreadystatechange = function() {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null
        callback()
      }
    }
  } else {
    // 其他浏览器
    script.onload = callback
  }

  script.src = url
  document.head.appendChild(script)
}

/**
 * 延迟加载JS
 * @param {string} src - JS文件的URL
 * @returns {HTMLScriptElement} - 返回创建的script元素
 */
function delayScript(src) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  document.body.appendChild(script)
  return script
}

/**
 * 动态加载JS代码
 * @param {string} code - JS代码字符串
 */
function loadScriptString(code) {
  const script = document.createElement('script')
  script.type = 'text/javascript'
  try {
    script.appendChild(document.createTextNode(code))
  } catch (e) {
    script.text = code
  }
  document.body.appendChild(script)
}

/**
 * 异步加载JS文件并执行回调函数
 * @param {string} src - JS文件的URL
 * @param {function} [func] - 加载完成后的回调函数
 */
function getScript(src, func) {
  const script = document.createElement('script')
  script.async = true
  script.charset = 'utf-8'
  script.src = src
  if (func) {
    script.onload = func
  }
  document.head.appendChild(script)
}

/**
 * 延迟加载JS或CSS文件
 * @param {string} url - 文件的URL
 * @returns {HTMLLinkElement|HTMLScriptElement} - 返回创建的link或script元素
 */
function delayJS(url) {
  const fileType = url.split('.').pop()
  let element

  if (fileType === 'css') {
    element = document.createElement('link')
    element.rel = 'stylesheet'
    element.href = url
    element.type = 'text/css'
    document.head.appendChild(element)
  } else {
    element = document.createElement('script')
    element.src = url
    element.type = 'text/javascript'
    document.body.appendChild(element)
  }

  return element
}

/**
 * 清除字符串中的<script>标签
 * @param {string} s - 需要处理的字符串
 * @returns {string} - 处理后的字符串
 */
function stripScript(s) {
  return s.replace(/<script.*?>.*?<\/script>/gi, '')
}

/**
 * 页面加载时执行函数
 * @param {function} func - 需要执行的函数
 */
function addLoad(func) {
  const oldOnload = window.onload
  if (typeof window.onload !== 'function') {
    window.onload = func
  } else {
    window.onload = function() {
      oldOnload()
      func()
    }
  }
}

/**
 * 窗口大小改变时执行函数
 * @param {function} func - 需要执行的函数
 */
function addSize(func) {
  const oldOnresize = window.onresize
  if (typeof window.onresize !== 'function') {
    window.onresize = func
  } else {
    window.onresize = function() {
      oldOnresize()
      func()
    }
  }
}

export { loadScript, delayScript, loadScriptString, getScript, delayJS, stripScript, addLoad, addSize }
