String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
}
function isEmpty(str, callback) {
  if (str == "" || str == null || typeof (str) == "undefined") {
    callback();
  }
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