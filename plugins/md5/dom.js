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
const appendHTML = function(el, html) {
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

const prependHTML = function(el, html) {
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

//addEvent(btn1,"click",fn);//调用添加 removeEvent(btn1,"click",fn);//调用移除

function addEvent(element, eventName, Listener) {
  if (element.addEventListener) {
    element.addEventListener(eventName, Listener, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventName, Listener);
  } else {
    element["on" + eventName] = Listener;
  }
}
function removeEvent(element, eventName, Listener) {
  if (element.addEventListener) {
    element.addEventListener(eventName, Listener, false);
  } else if (element.detachEvent) {
    element.detachEvent("on" + eventName, Listener);
  } else {
    element["on" + eventName] = Listener;
  }
}
//页面加载自执行函数
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != "function") {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    };
  }
}

//异步加载js执行回调函数
function loadScript(url, callback) {
  var script = document.createElement("script");
  script.type = "text/javaScript";
  if (script.readyState) {
    //IE
    script.onreadystatechange = function() {
      if (script.readyState == "loaded" || script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function() {
      callback();
    };
  }
  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
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

//显示盒子
function show(ele) {
  ele.style.display = "block";
}

//隐藏盒子
function hide(ele) {
  ele.style.display = "none";
}
