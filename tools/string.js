String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}
// 替换全部
String.prototype.replaceAll = function(s1, s2) {
  return this.replace(new RegExp(s1, "gm"), s2)
}
//判断一个字符串是否被包含在另一字符串
String.prototype.iscontains = function (str, value) {
  return;
  str.indexOf(value) > -1 ? true : false;
}
// 判断是否以某个字符串开头
String.prototype.startWith = function (s) {
  return this.indexOf(s) == 0
}
// 判断是否以某个字符串结束
String.prototype.endWith = function (s) {
  var d = this.length - s.length;
  return (d >= 0 && this.lastIndexOf(s) == d)
}
//计算字符串长度
String.prototype.strLen = function() {
    var len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2; else len ++;
    }
    return len;
}
function strlen(str) {
	return (BROWSER.ie && str.indexOf('\n') != -1) ? str.replace(/\r?\n/g, '_').length : str.length;
}
//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function(){
    var chars = new Array();
    for (var i = 0; i < this.length; i++){
        chars[i] = [this.substr(i, 1), this.isCHS(i)];
    }
    String.prototype.charsArray = chars;
    return chars;
}

//判断某个字符是否是汉字
String.prototype.isCHS = function(i){
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0)
        return true;
    else
        return false;
}

//截取字符串（从start字节到end字节）
String.prototype.subCHString = function(start, end){
    var len = 0;
    var str = "";
    this.strToChars();
    for (var i = 0; i < this.length; i++) {
        if(this.charsArray[i][1])
            len += 2;
        else
            len++;
        if (end < len)
            return str;
        else if (start < len)
            str += this.charsArray[i][0];
    }
    return str;
}

//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function(start, length){
    return this.subCHString(start, start + length);
}


function isEmpty(str, callback) {
  if (str == "" || str == null || typeof (str) == "undefined") {
    callback();
  }
}
// 判断是否为数字
function isDigit(value) {
  var patrn = /^[0-9]*$/;
  if (patrn.exec(value) == null || value == "") {
    return false
  } else {
    return true
  }
}
function isUndefined(variable) {
	return typeof variable == 'undefined' ? true : false;
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
//字符串替换(字符串,要替换的字符,替换成什么)
function replaceAll(str, AFindText, ARepText) {
  raRegExp = new RegExp(AFindText, "g");
  return str.replace(raRegExp, ARepText);
}
// 字符串长度截取,多余的用...代替
function cutstr(str, len) {
  var temp,
      icount = 0,
      patrn = /[^\x00-\xff]/,
      strre = "";
  for (var i = 0; i < str.length; i++) {
      if (icount < len - 1) {
          temp = str.substr(i, 1);
              if (patrn.exec(temp) == null) {
                 icount = icount + 1
          } else {
              icount = icount + 2
          }
          strre += temp
          } else {
          break;
      }
  }
  return strre + "..."
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

