export function isUrl(url) {
  return /^htt(p|ps):\/\//.test(url)
}
/**
 * 从页面url中获取json（url是未被编码的明文格式）
 * <pre>url格式：http://www.baidu.com?action=1&toobar=0
 * @param {str} url  页面的url, 选传, 默认当前页面地址（url是未被编码的明文格式）
 * @returns {obj} json    json对象
 */
export function getQueryJson(url) {
  var json = {}
  var urlStr = isUrl(url) ? url : location.href
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

export function addParamsToUrl(url = '', params = {}, addToHash = false) {
  let hashpos = url.indexOf('#')
  let hash = ''
  let path = url
  let search = ''
  if (hashpos >= 0) {
    hash = url.slice(hashpos)
    path = url.slice(0, hashpos)
  }
  let str = addToHash ? hash : path
  let cururlparams = (str && getQueryJson(str)) || {}
  params = {
    ...cururlparams,
    ...params
  }
  let serachPos = path.indexOf('?')
  if (serachPos >= 0) {
    search = path.slice(serachPos)
    path = path.slice(0, serachPos)
  }

  addToHash ? (hash = hash.split('?')[0]) : (search = '')
  str = ''
  Object.keys(params).forEach(key => {
    if (params[key]) {
      str += '&' + key + '=' + params[key]
    }
  })
  if (str) {
    str = '?' + str.slice(1)
    if (addToHash) {
      hash = hash + str
    } else {
      search = str
    }
  }
  return path + search + hash
}
