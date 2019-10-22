var browser = {
  versions: (function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;
    var rSafari = /.*version\/([\w.]+).*(safari).*/; // safari
    return {
      //移动终端浏览器版本信息
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, //android终端或uc浏览器
      iPhone: u.indexOf("iPhone") > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf("iPad") > -1 //是否iPad
      // safari: u//.indexOf('Safari') > -1
    };
  })()
};

var isMobile = function() {
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i
    )
  ) {
    return true;
  } else {
    return false;
  }
};

var Browser = (function() {
  var userAgent = navigator.userAgent.toLowerCase();
  return {
    get: function() {
      if (userAgent.indexOf("msie") > 0) {
        return "msie";
      }
      if (userAgent.indexOf("firefox") > 0) {
        return "firefox";
      }
      if (userAgent.indexOf("chrome") > 0) {
        return "chrome";
      }
    }
  };
})();
var OS = (function() {
  var userAgent = navigator.userAgent.toLowerCase();
  return {
    get: function() {
      if (userAgent.indexOf("mac os") > 0) {
        return "mac";
      }
      if (userAgent.indexOf("win") > 0) {
        return "win";
      }
    }
  };
})();
