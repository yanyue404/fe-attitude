getBrowser: function() {
  var t = navigator.userAgent.toLowerCase();
  if (t.indexOf("android") >= 0)
      return "android";
  if (t.indexOf("iphone") >= 0)
      return "iphone";
  if (t.match(/.*mac.*os/gi))
      return "mac";
  if (t.indexOf("chrome") >= 0)
      return "chrome";
  if (t.indexOf("firefox") >= 0)
      return "firefox";
  if (t.indexOf("msie") >= 0) {
      var e = t.match(/msie\s\d+/)[0].match(/\d+/)[0] || t.match(/trident\s?\d+/)[0];
      return t.match(/.*msie.*10\.0/gi) ? "IE10" : 9 > e ? "IE8-" : "IE"
  }
  return t.indexOf("Safari") >= 0 ? "safari" : t.indexOf("Camino") >= 0 ? "camino" : t.indexOf("Gecko/") >= 0 ? "gecko" : !1
}


browser: function() {
  var e = navigator.userAgent.toLowerCase();
  if (e.indexOf("android") >= 0)
      return e.indexOf("ucbrowser") >= 0 ? "android-uc" : "android";
  if (e.indexOf("iphone") >= 0)
      return "iphone";
  if (e.indexOf("chrome") >= 0)
      return "chrome";
  if (e.indexOf("firefox") >= 0)
      return "firefox";
  if (e.indexOf("msie") >= 0) {
      var i = e.match(/msie\s\d+/)[0].match(/\d+/)[0] || e.match(/trident\s?\d+/)[0];
      return e.match(/.*msie.*10\.0/gi) ? "IE10" : 9 > i ? "IE8-" : "IE"
  }
  if (e.indexOf("trident") >= 0)
      return "IE11";
  if (e.indexOf("Safari") >= 0)
      return "safari";
  if (e.indexOf("Camino") >= 0)
      return "camino";
  if (e.indexOf("Gecko/") >= 0)
      return "gecko";
  if (e.match(/.*mac.*os/gi))
      return "mac";
  if (!(e.match(/msie\s\d+/) && e.match(/msie\s\d+/)[0] || e.match(/trident\s?\d+/) && e.match(/trident\s?\d+/)[0]))
      return !1;
  var i = e.match(/msie\s\d+/)[0].match(/\d+/)[0] || e.match(/trident\s?\d+/)[0];
  return 9 > i ? (t.location.href = "http://www.baidu.com",
  !1) : void 0
}