
//异步加载js执行回调函数
function loadScript(url, callback, charset) {
  var script = document.createElement("script");
  script.type = "text/javaScript";
  if (charset) {
    script.setAttribute("charset", charset)
  }
  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function () {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function delay_script(A) {
  var B = document.createElement("script")
    , C = "src"
    , D = "text/javascript";
  B.setAttribute(C, A);
  B.setAttribute("type", D);
  document.body.appendChild(B);
  return B
}
// 兼容IE动态添加script方法
function loadScriptString (code) {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  try {
    script.appendChild(document.createTextNode(code))
  } catch (e) {
    script.text = code
  }
  document.body.appendChild(script)
}

// delay_script("//ossweb-img.qq.com/images/js/eas/eas.js");
/* 如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本 */


/* api设计
$.Loader.advScript({
     name: "sharejs",
     url: SHARE + "?v=" + VIPSHOP.jsVer
 }) */
function getScript(src, func) {
  var script = document.createElement('script');
  script.async = "async";
  script.charset = "utf-8";
  script.src = src;
  if (func) {
    script.onload = func;
  }
  document.getElementsByTagName("head")[0].appendChild(script);
}


function delay_js(url) {
  var type = url.split(".")
    , file = type[type.length - 1];
  if (file == "css") {
    var obj = document.createElement("link")
      , lnk = "href"
      , tp = "text/css";
    obj.setAttribute("rel", "stylesheet");
  } else
    var obj = document.createElement("script")
      , lnk = "src"
      , tp = "text/javascript";
  obj.setAttribute(lnk, url);
  obj.setAttribute("type", tp);
  file == "css" ? document.getElementsByTagName("head")[0].appendChild(obj) : document.body.appendChild(obj);
  return obj;
}
// 清除脚本内容
function stripscript(s) {
  return s.replace(/<script.*?>.*?<\/script>/ig, '');
}

//页面加载自执行函数

function addload(func) {
  var old = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function () {
      old();
      func();
    }
  }
}

function addsize(func) {
  var old = window.onresize;
  if (typeof window.onresize != "function") {
    window.onresize = func;
  } else {
    window.onresize = function () {
      old();
      func();
    }
  }
}

