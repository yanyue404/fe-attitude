//获取url后面参数的方法
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getQuery(name, url) {
  //参数：变量名，url为空则表从当前页面的url中取
  var u = arguments[1] || window.location.search,
      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      r = u.substr(u.indexOf("\?") + 1).match(reg);
  return r !== null ? r[2] : "";
}
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

function setQuery(json, url) {
  var hash = url ? url.match(/#.*/) && url.match(/#.*/)[0] || "" : location.hash,
      search = url ? url.replace(/#.*/, "").match(/\?.*/) && url.replace(/#.*/, "").match(/\?.*/)[0] || "" : location.search,
      path = url ? url.replace(/#.*/, "").replace(/\?.*/, "") : location.protocol + "//" + location.host + location.pathname;
  for (var i in json) {
      var query = i + "=" + json[i],
          oldValue = getQuery(i, search);
      if (oldValue) {
          search = search.replace(i + "=" + oldValue, i + "=" + json[i]);
      } else {
          search = (search.length > 0) ? search + "&" + query : "?" + query;
      }
  }
  return path + search + hash;
}

// 清除缓存记录
function removeStorage(key) {
  try {
      window.localStorage.removeItem(key);
  } catch (e) {
      delCookie(key);
  }
}
function saveStorage(key, value, isJson) {
  try {
      window.localStorage.setItem(key, isJson ? JSON.stringify(value) : value);
  } catch (e) {
      setCookie(key, isJson ? JSON.stringify(value) : value);
  }
}
function getStorage(key, jsJson) {
  try {
      if (jsJson) {
          return JSON.parse(window.localStorage.getItem(key));
      } else {
          return window.localStorage.getItem(key);
      }
  } catch (e) {
      if (jsJson) {
          return JSON.parse(getCookie(key));
      } else {
          return getCookie(key);
      }
  }
}