String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}

function trim(str) { return str.replace(/^(\s|\u00A0)+/, "").replace(/(\s|\u00A0)+$/, "") }

function isEmpty(str, callback) {
  if (str == "" || str == null || typeof (str) == "undefined") {
    callback();
  }
}
/**
 * 判断变量是否为空
 * @param val
 * @returns {boolean}
 */
function isempty(val) {
  return (val == null || val == '' || val == undefined || typeof (val) == typeof (undefined));
}
function htmlspecialchars(str) {
  return preg_replace(['&', '<', '>', '"'], ['&amp;', '&lt;', '&gt;', '&quot;'], str);
}
/*
 *字符转实体
 *  */
function xssFilter(str) {
  str = str.replace(/<br\/*>/gi, "");
  str = str.replace(/</gi, '&lt;');
  str = str.replace(/>/gi, '&gt;');

  return str;
}

function preg_replace(search, replace, str, regswitch) {
  var regswitch = !regswitch ? 'ig' : regswitch;
  var len = search.length;
  for (var i = 0; i < len; i++) {
    re = new RegExp(search[i], regswitch);
    str = str.replace(re, typeof replace == 'string' ? replace : (replace[i] ? replace[i] : replace[0]));
  }
  return str;
}


var tplHTMLCache = {};
function formatJson(str, data) {
  /* 模板替换,str:模板id或者内容，data:数据内容
  \W：匹配任何非单词字符。等价于 '[^A-Za-z0-9_]'。
  如果是id,并且cache中有值，直接返回，否则获取innerHTML，再次解析；
  如果不是id，解析并存入cache
*/
  var fn = !/\W/.test(str) ?
    tplHTMLCache[str] = tplHTMLCache[str] || formatJson(document.getElementById(str).innerHTML) :
    new Function("obj",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +
      "with(obj){p.push('" + str
        .replace(/[\r\t\n]/g, " ")
        .split("<<").join("\t")
        .replace(/((^|>>)[^\t]*)'/g, "$1\r")
        .replace(/\t=(.*?)>>/g, "',$1,'")
        .split("\t").join("');")
        .split(">>").join("p.push('")
        .split("\r").join("\\'") + "');}return p.join('');");
  return data ? fn(data) : fn;
}

//判断一个字符串是否被包含在另一字符串
function contains(str, value) {
  return;
  str.indexOf(value) > -1 ? true : false;
}