class StorageFn {
  constructor() {
    this.ls = window.localStorage;
    this.ss = window.sessionStorage;
  }

  /*-----------------cookie---------------------*/
  /*设置cookie*/
  setCookie(name, value, day) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
      for (var i in setting) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = i + "=" + setting[i] + ";expires=" + oDate;
      }
    } else {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = name + "=" + value + ";expires=" + oDate;
    }
  }

  /*获取cookie*/
  getCookie(name) {
    var arr = document.cookie.split("; ");
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split("=");
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
    return "";
  }

  /*删除cookie*/
  removeCookie(name) {
    this.setCookie(name, 1, -1);
  }

  /*-----------------localStorage---------------------*/
  /*设置localStorage*/
  setLocal(key, val) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
      for (var i in setting) {
        this.ls.setItem(i, JSON.stringify(setting[i]));
      }
    } else {
      this.ls.setItem(key, JSON.stringify(val));
    }
  }

  /*获取localStorage*/
  getLocal(key) {
    if (key) return JSON.parse(this.ls.getItem(key));
    return null;
  }

  /*移除localStorage*/
  removeLocal(key) {
    this.ls.removeItem(key);
  }

  /*移除所有localStorage*/
  clearLocal() {
    this.ls.clear();
  }

  /*-----------------sessionStorage---------------------*/
  /*设置sessionStorage*/
  setSession(key, val) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === "Object") {
      for (var i in setting) {
        this.ss.setItem(i, JSON.stringify(setting[i]));
      }
    } else {
      this.ss.setItem(key, JSON.stringify(val));
    }
  }

  /*获取sessionStorage*/
  getSession(key) {
    if (key) return JSON.parse(this.ss.getItem(key));
    return null;
  }

  /*移除sessionStorage*/
  removeSession(key) {
    this.ss.removeItem(key);
  }

  /*移除所有sessionStorage*/
  clearSession() {
    this.ss.clear();
  }
}


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



