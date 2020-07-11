class StorageFn {
  constructor() {
    this.ls = window.localStorage;
  }

  /*-----------------cookie---------------------*/
  setCookie(name, value, day) {
    var setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (var i in setting) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = i + '=' + setting[i] + ';expires=' + oDate;
      }
    } else {
      var oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = name + '=' + value + ';expires=' + oDate;
    }
  }

  getCookie(name) {
    var arr = document.cookie.split('; ');
    for (var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('=');
      if (arr2[0] == name) {
        return arr2[1];
      }
    }
    return '';
  }

  removeCookie(name) {
    this.setCookie(name, 1, -1);
  }

  /*-----------------localStorage---------------------*/
  setItem(key, val, expires) {
    // 设置过期时间 https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/171
    if (typeof expires !== 'undefined') {
      var expiresDate = new Date(expires).valueOf();
      this.ls.setItem(key + '_expires', expiresDate);
    }
    this.ls.setItem(key, val);
  }

  getItem(key) {
    var expires = this.ls.getItem(key + '_expires');
    if (expires && new Date() > new Date(Number(expires))) {
      this.ls.removeItem(key);
      this.ls.removeItem(key + '_expires');
    }
    if (key) return this.ls.getItem(key);
    return null;
  }

  removeItem(key) {
    this.ls.removeItem(key);
  }

  /*移除所有localStorage*/
  clear() {
    this.ls.clear();
  }
}

/* const Storage = new StorageFn();
Storage.setItem('key', 'value', new Date(Date.now() + 10000)); // 10 秒钟后过期
Storage.getItem('key'); */

/* (function() {
  var getItem = localStorage.getItem.bind(localStorage);
  var setItem = localStorage.setItem.bind(localStorage);
  var removeItem = localStorage.removeItem.bind(localStorage);
  localStorage.getItem = function(keyName) {
    var expires = getItem(keyName + '_expires');
    if (expires && new Date() > new Date(Number(expires))) {
      removeItem(keyName);
      removeItem(keyName + '_expires');
    }
    return getItem(keyName);
  };
  localStorage.setItem = function(keyName, keyValue, expires) {
    if (typeof expires !== 'undefined') {
      var expiresDate = new Date(expires).valueOf();
      setItem(keyName + '_expires', expiresDate);
    }
    return setItem(keyName, keyValue);
  };
})(); */
