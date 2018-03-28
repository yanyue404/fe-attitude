function getCookie(name) {
  //读取COOKIE
  var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
    val = document.cookie.match(reg);
  return val ? (val[2] ? unescape(val[2]) : "") : null;
}

function setCookie(name, value, pexpire, ppath, pdomain, psecure) {
  //写入COOKIES
  var exp = new Date(),
    expires = arguments[2] || null,
    path = arguments[3] || "/",
    domain = arguments[4] || null,
    secure = arguments[5] || false;
  expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
  document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

function delCookie(name, path, domain, secure) {
  //删除cookie
  var value = getCookie(name);
  if (value !== null) {
    var exp = new Date();
    exp.setMinutes(exp.getMinutes() - 1000);
    path = path || "/";
    document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
  }
}


// *****************************另一例**************************************

//设置cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

setCookie("zhangsan", 18, 1);

//获取
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

//删除
function clearCookie(name) {
  setCookie(name, "", -1);
}

//*****************************第三例**************************************** */

function setcookie(cookieName, cookieValue, seconds, path, domain, secure) {
  if (cookieValue == '' || seconds < 0) {
    cookieValue = '';
    seconds = -2592000;
  }
  if (seconds) {
    var expires = new Date();
    expires.setTime(expires.getTime() + seconds * 1000);
  }
  domain = !domain ? cookiedomain : domain;
  path = !path ? cookiepath : path;
  document.cookie = escape(cookiepre + cookieName) + '=' + escape(cookieValue)
    + (expires ? '; expires=' + expires.toGMTString() : '')
    + (path ? '; path=' + path : '/')
    + (domain ? '; domain=' + domain : '')
    + (secure ? '; secure' : '');
}

function getcookie(name, nounescape) {
  name = cookiepre + name;
  var cookie_start = document.cookie.indexOf(name);
  var cookie_end = document.cookie.indexOf(";", cookie_start);
  if (cookie_start == -1) {
    return '';
  } else {
    var v = document.cookie.substring(cookie_start + name.length + 1, (cookie_end > cookie_start ? cookie_end : document.cookie.length));
    return !nounescape ? unescape(v) : v;
  }
}