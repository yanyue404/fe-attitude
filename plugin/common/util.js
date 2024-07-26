/**
 * 从链接中获取参数值
 * @param {string} key 参数key
 * @param {string} str 链接，默认取当前链接
 */
function getLinkParam(key, str = location.href) {
  if (!key) return ''
  let result = ''
  const regex = new RegExp(`[\?&]${key}=([^&#]+)`, 'i')
  if (regex.test(str)) {
    result = str.match(regex)[1]
  }
  return result
}

/**
 * 从页面url中获取json（url是未被编码的明文格式）
 * <pre>url格式：http://www.baidu.com?action=1&toobar=0
 * @param {str} url  页面的url, 选传, 默认当前页面地址（url是未被编码的明文格式）
 * @returns {obj} json    json对象
 */
function getQueryJson(url) {
  var json = {}
  var urlStr = isDefined(url) ? url : location.href
  var splits = urlStr.split('?')
  if (splits && splits.length >= 2) {
    var array = splits[1].split('&')
    if (array && array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        var params = array[i].split('=') // 拆分形式为key=value形式的参数
        json[params[0]] = params[1] // 第一个参数表示key，第二个参数表示value
      }
    }
  }
  return json
}

/**
 * 页面添加样式表
 * @param {String} style 样式资源链接或者样式文本
 */
function loadCss(style) {
  // 外部资源链接
  if (/\.css/.test(style)) {
    const ele = document.createElement('link')
    ele.rel = 'stylesheet'
    ele.href = style
    document.getElementsByTagName('head')[0].appendChild(ele)
    return ele
  } else {
    return GM_addStyle(style)
  }
}

export { getLinkParam, getQueryJson, loadCss }
