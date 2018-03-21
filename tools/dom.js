var dom = {
  on(element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
      let el = e.target;
      while (!el.matches(selector)) {
        if (element === el) {
          el = null;
          break;
        }
        el = el.parentNode;
      }
      el && fn.call(el, e, el);
    });
    return element;
  },
  index(element) {
    const siblings = element.parentNode.children;
    for (let index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index;
      }
    }
    return -1;
  },
  //排他思想方式添加class
  uniqueClass(element, className) {
    dom.every(element.parentNode.children, el => {
      el.classList.remove(className); // 排他
    });
    element.classList.add(className);
    return element;
  },

  every(nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i], i);
    }
    return nodeList;
  }
};

function $(selector, el) {
  if (!el) {
    el = document;
  }
  return el.querySelector(selector);
}
function $$(selector, el) {
  if (!el) {
    el = document;
  }
  return el.querySelectorAll(selector);
  // Note: the returned object is a NodeList.
  // If you'd like to convert it to a Array for convenience, use this instead:
  // return Array.prototype.slice.call(el.querySelectorAll(selector));
}
const appendHTML = function (el, html) {
  let divTemp = document.createElement("div"),
    nodes = null,
    // 文档片段，一次性append，提高性能

    fragment = document.createDocumentFragment();
  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (let i = 0, length = nodes.length; i < length; i += 1) {
    fragment.appendChild(nodes[i].cloneNode(true));
  }
  // 全部都是一样的，除了下面这个 this → el
  el.appendChild(fragment);
  nodes = null;
  fragment = null;
};

const prependHTML = function (el, html) {
  let divTemp = document.createElement("div"),
    nodes = null,
    fragment = document.createDocumentFragment();

  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (let i = 0, length = nodes.length; i < length; i += 1) {
    fragment.appendChild(nodes[i].cloneNode(true));
  }
  // 插入到容器的前面 - 差异所在
  el.insertBefore(fragment, el.firstChild);
  // 内存回收？
  nodes = null;
  fragment = null;
};

function getStyle(ele, attr) {
  if (ele.currentStyle !== undefined) {
    return ele.currentStyle[attr];
  } else {
    return window.getComputedStyle(ele, null)[attr]
      ? window.getComputedStyle(ele, null)[attr]
      : ele.getAttribute(attr);
  }
}
function setStyle(e, a) {
  var i;
  for (i in a) {
    e.style[i] = a[i]
  }
}
// setStyle(c, {
//     backgroundColor: this.bgcolor,
//     display: 'block'
// })

// addEvent(objWin, 'scroll', fixIECenter)
// d参数默认false=》冒泡，true为捕获
function addEvent(a, b, c, d) {
  a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent("on" + b, c)
}
// removeEvent(objOverLay, 'click', eMsgClose)
function removeEvent(a, b, c, d) {
  a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent("on" + b, c)
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
// delay_script("//ossweb-img.qq.com/images/js/eas/eas.js");
/* 如果 async="async"：脚本相对于页面的其余部分异步地执行（当页面继续进行解析时，脚本将被执行）
如果不使用 async 且 defer="defer"：脚本将在页面完成解析时执行
如果既不使用 async 也不使用 defer：在浏览器继续解析页面之前，立即读取并执行脚本 */

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

//阻止submit的默认提交事件
/*  submit.onclick = function(e){
    stopDefault(e)
 } */
function stopDefault(e) {
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    window.event.returnValue = false;
  }

  return false;
}

function scroll() {
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft,
    top: window.pageYOffset || document.documentElement.scrollTop
  };
}

//封装一个方法，兼容获取浏览器可视区域的宽高；
function client() {
  if (window.innerWidth !== undefined) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  } else if (document.compatMode === "CSS1Compat") {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  }
}
