var isMobile = function() {
  if (
    navigator.userAgent.match(
      /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i,
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
      if (userAgent.indexOf('msie') > 0) {
        return 'msie';
      }
      if (userAgent.indexOf('firefox') > 0) {
        return 'firefox';
      }
      if (userAgent.indexOf('chrome') > 0) {
        return 'chrome';
      }
    },
  };
})();
var OS = (function() {
  var userAgent = navigator.userAgent.toLowerCase();
  return {
    get: function() {
      if (userAgent.indexOf('mac os') > 0) {
        return 'mac';
      }
      if (userAgent.indexOf('win') > 0) {
        return 'win';
      }
    },
  };
})();
