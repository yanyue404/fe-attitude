var dom = {
  $: function(selector, el) {
    if (!el) {
      el = document;
    }
    return el.querySelector(selector);
  },

  $$: function(selector, el) {
    if (!el) {
      el = document;
    }
    return Array.prototype.slice.call(el.querySelectorAll(selector));
  },

  // 将NodeList转为数组
  convertToArray: function(nodeList) {
    var array = null;
    try {
      // IE8-NodeList是COM对象
      array = Array.prototype.slice.call(nodeList, 0);
    } catch (err) {
      array = [];
      for (var i = 0, len = nodeList.length; i < len; i++) {
        array.push(nodeList[i]);
      }
    }
    return array;
  },

  index: function(element) {
    var siblings = element.parentNode.children;
    for (var index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index;
      }
    }
    return -1;
  },

  getIndexByClass: function(param, rule) {
    var element = param.className ? param : param.target;
    var className = element.className;
    var domArr = Array.prototype.slice.call(
      document.querySelectorAll("." + className)
    );
    for (var index = 0; index < domArr.length; index++) {
      if (domArr[index] === element) {
        return index;
      }
    }
    return -1;
  },

  every: function(nodeList, fn) {
    for (var i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i], i);
    }
    return nodeList;
  },

  siblings: function(obj) {
    var a = [];
    var p = obj.previousSibling;
    while (p) {
      //先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling
      if (p.nodeType === 1) {
        a.push(p);
      }
      p = p.previousSibling; //最后把上一个节点赋给p
    }
    a.reverse(); //把顺序反转一下 这样元素的顺序就是按先后的了
    var n = obj.nextSibling; //再取o的弟弟
    while (n) {
      //判断有没有下一个弟弟结点 n是nextSibling的意思
      if (n.nodeType === 1) {
        a.push(n);
      }
      n = n.nextSibling;
    }
    return a;
  },

  siblings2: function(ele) {
    var newArr = [];
    var arr = ele.parentNode.children; //ie678中无法取出注释节点;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].nodeType == 1 && arr[i] != ele) {
        newArr.push(arr[i]);
      }
    }
    return newArr;
  },

  /**
   * 功能:根据索引值找兄弟节点
   * @param ele
   * @param index
   * @returns {*|HTMLElement}
   */
  getSibEleOfIndex: function(ele, index) {
    return ele.parentNode.children[index];
  },

  uniqueClass: function(element, className) {
    dom.every(element.parentNode.children, el => {
      el.classList.remove(className); // 排他
    });
    element.classList.add(className);
    return element;
  },

  hasClass: function(obj, classStr) {
    var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含
    return arr.indexOf(classStr) == -1 ? false : true;
  },

  addClass: function(obj, classStr) {
    if (!this.hasClass(obj, classStr)) {
      obj.className += " " + classStr;
    }
  },

  removeClass: function(obj, classStr) {
    if (this.hasClass(obj, classStr)) {
      var reg = new RegExp("(\\s|^)" + classStr + "(\\s|$)");
      obj.className = obj.className.replace(reg, "");
    }
  },

  replaceClass: function(obj, newName, oldName) {
    removeClass(obj, oldName);
    addClass(obj, newName);
  },

  on: function(element, eventType, selector, fn) {
    element.addEventListener(eventType, e => {
      var el = e.target;
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

  onSwipe: function(element, fn) {
    var x0, y0;
    element.addEventListener("touchstart", e => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    });
    element.addEventListener("touchmove", e => {
      if (!x0 || !y0) {
        return;
      }
      var xDiff = e.touches[0].clientX - x0;
      var yDiff = e.touches[0].clientY - y0;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          fn.call(element, e, "right");
        } else {
          fn.call(element, e, "left");
        }
      } else {
        if (yDiff > 0) {
          fn.call(element, e, "down");
        } else {
          fn.call(element, e, "up");
        }
      }
      x0 = undefined;
      y0 = undefined;
    });
  },

  getStyle: function(ele, attr) {
    if (ele.currentStyle !== undefined) {
      return ele.currentStyle[attr];
    } else {
      return window.getComputedStyle(ele, null)[attr]
        ? window.getComputedStyle(ele, null)[attr]
        : ele.getAttribute(attr);
    }
  },

  css: function(target, cssObj) {
    for (var prop in cssObj) {
      target.style[prop] = cssObj[prop];
    }
    return target;
  },
  // http://stackoverflow.com/a/35385518/1262580
  create: function(html, children) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    var node = template.content.firstChild;
    if (children) {
      dom.append(node, children);
    }
    return node;
  },

  append: function(parent, children) {
    if (children.length === undefined) {
      children = [children];
    }
    for (var i = 0; i < children.length; i++) {
      parent.appendChild(children[i]);
    }
    return parent;
  },

  prepend: function(parent, children) {
    if (children.length === undefined) {
      children = [children];
    }
    for (var i = children.length - 1; i >= 0; i--) {
      if (parent.firstChild) {
        parent.insertBefore(children[i], parent.firstChild);
      } else {
        parent.appendChild(children[i]);
      }
    }
    return parent;
  },
  setOpacity: function(obj, val) {
    if (document.documentElement.filters) {
      obj.style.filter = "alpha(opacity=" + val + ")";
    } else {
      obj.style.opacity = val / 100;
    }
  },
  fadeIn: function(obj) {
    var val = 10;
    var setOpacity = function(obj, val) {
      if (document.documentElement.filters) {
        obj.style.filter = "alpha(opacity=" + val + ")";
      } else {
        obj.style.opacity = val / 100;
      }
    };
    var t = setInterval(function() {
      if (val >= 100) {
        clearInterval(t);
      }
      setOpacity(obj, val);
      val += 10;
    }, 250);
  },

  fadeOut: function(target) {
    var opacity = 100;
    var timer = null;
    var _this = this;
    timer = setInterval(function() {
      opacity -= opacity / 20;
      opacity < 80 &&
        _this.css(target, {
          opacity: opacity / 100
        });
      if (opacity <= 5) {
        clearInterval(timer);
        _this.css(target, {
          display: "none",
          opacity: 1
        });
      }
    }, 10);
  },

  removeChildren: function(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
    return this;
  },

  // el can be an Element, NodeList or query string
  remove: function(el) {
    if (typeof el === "string") {
      [].forEach.call(document.querySelectorAll(el), node => {
        node.parentNode.removeChild(node);
      });
    } else if (el.parentNode) {
      // it's an Element
      el.parentNode.removeChild(el);
    } else if (el instanceof NodeList) {
      // it's an array of elements
      [].forEach.call(el, node => {
        node.parentNode.removeChild(node);
      });
    } else {
      throw new Error(
        "you can only pass Element, array of Elements or query string as argument"
      );
    }
  }
};

// 另一套，使用时放开 {}
var ClassList = {
  // el can be an Element, NodeList or selector
  addClass(el, className) {
    if (typeof el === "string") el = document.querySelectorAll(el);
    var els = el instanceof NodeList ? [].slice.call(el) : [el];

    els.forEach(e => {
      if (this.hasClass(e, className)) {
        return;
      }

      if (e.classList) {
        e.classList.add(className);
      } else {
        e.className += " " + className;
      }
    });
  },

  // el can be an Element, NodeList or selector
  removeClass(el, className) {
    if (typeof el === "string") el = document.querySelectorAll(el);
    var els = el instanceof NodeList ? [].slice.call(el) : [el];

    els.forEach(e => {
      if (this.hasClass(e, className)) {
        if (e.classList) {
          e.classList.remove(className);
        } else {
          e.className = e.className.replace(
            new RegExp(
              "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
              "gi"
            ),
            " "
          );
        }
      }
    });
  },

  // el can be an Element or selector
  hasClass(el, className) {
    if (typeof el === "string") el = document.querySelector(el);
    if (el.classList) {
      return el.classList.contains(className);
    }
    return new RegExp("(^| )" + className + "( |$)", "gi").test(el.className);
  },

  // el can be an Element or selector
  toggleClass(el, className) {
    if (typeof el === "string") el = document.querySelector(el);
    var flag = this.hasClass(el, className);
    if (flag) {
      this.removeClass(el, className);
    } else {
      this.addClass(el, className);
    }
    return flag;
  }
};

function insertAfter(newEl, targetEl) {
  var parent = targetEl.parentNode;

  if (parent.lastChild === targetEl) {
    parent.appendChild(newEl);
  } else {
    parent.insertBefore(newEl, targetEl.nextSibling);
  }
}

function appendHTML(el, html) {
  var divTemp = document.createElement("div"),
    nodes = null,
    // 文档片段，一次性append，提高性能

    fragment = document.createDocumentFragment();
  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (var i = 0, length = nodes.length; i < length; i += 1) {
    fragment.appendChild(nodes[i].cloneNode(true));
  }
  // 全部都是一样的，除了下面这个 this → el
  el.appendChild(fragment);
  nodes = null;
  fragment = null;
}

function prependHTML(el, html) {
  var divTemp = document.createElement("div"),
    nodes = null,
    fragment = document.createDocumentFragment();

  divTemp.innerHTML = html;
  nodes = divTemp.childNodes;
  for (var i = 0, length = nodes.length; i < length; i += 1) {
    fragment.appendChild(nodes[i].cloneNode(true));
  }
  // 插入到容器的前面 - 差异所在
  el.insertBefore(fragment, el.firstChild);
  // 内存回收？
  nodes = null;
  fragment = null;
}

// http://stackoverflow.com/a/35385518/1262580
/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

// var td = htmlToElement('<td>foo</td>'),
//   div = htmlToElement('<div><span>nested</span> <span>stuff</span></div>');

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
function htmlToElements(html) {
  var template = document.createElement("template");
  template.innerHTML = html;
  return template.content.childNodes;
}

// var rows = htmlToElements('<tr><td>foo</td></tr><tr><td>bar</td></tr>');

//----------------------------------------- 事件相关------------------------------------------

/**
 *
 * @param {*} a dom 元素
 * @param {*} b 事件类型 click change scroll
 * @param {*} c function
 * @param {*} d  参数默认false=》冒泡，true为捕获
 */
function addEvent(a, b, c, d) {
  a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent("on" + b, c);
}
// removeEvent(objOverLay, 'click', eMsgClose)
function removeEvent(a, b, c, d) {
  a.removeEventListener
    ? a.removeEventListener(b, c, d)
    : a.detachEvent("on" + b, c);
}

/**
 * 监听移动端手势，'left','right','top','bottom'
 *
 * @param {*} target dom 元素
 * @param {*} options 配置项 json
 */
function listenTouch(target, options) {
  addEvent(target, "touchstart", handleTouchEvent);
  addEvent(target, "touchend", handleTouchEvent);
  addEvent(target, "touchmove", handleTouchEvent);
  var startX;
  var startY;
  function handleTouchEvent(event) {
    switch (event.type) {
      case "touchstart":
        startX = event.touches[0].pageX;
        startY = event.touches[0].pageY;
        break;
      case "touchend":
        var spanX = event.changedTouches[0].pageX - startX;
        var spanY = event.changedTouches[0].pageY - startY;

        if (Math.abs(spanX) > Math.abs(spanY)) {
          //认定为水平方向滑动
          if (spanX > 30) {
            //向右
            if (options.right) options.right();
          } else if (spanX < -30) {
            //向左
            if (options.left) options.left();
          }
        } else {
          //认定为垂直方向滑动
          if (spanY > 30) {
            //向下
            if (options.bottom) options.bottom();
          } else if (spanY < -30) {
            //向上
            if (options.top) options.top();
          }
        }

        break;
      case "touchmove":
        //阻止默认行为
        event.preventDefault();
        break;
    }
  }
}

var Event = {
  //阻止事件冒泡
  stopBubble: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true; //IE阻止事件冒泡，true代表阻止
    }
  },
  //阻止事件默认行为
  stopDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false; //IE阻止事件冒泡，false代表阻止
    }
  },
  //获得事件元素
  //event.target--非IE
  //event.srcElement--IE
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  // 回车事件
  listenEnter: function(func) {
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        // enter 键
        func();
      }
    };
  },
  listenKeys: function(number, func) {
    var obj = {
      "38": "上",
      "40": "下"
    };
    document.addEventListener("keydown", function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      console.log(e.keyCode);

      if (e && e.keyCode == number) {
        func();
      }
    });
  }
};

function getCheckBoxVal(domArr) {
  var result = [];
  domArr.forEach(v => {
    v.checked ? result.push(v.value) : "";
  });
  return result.join(",");
}

/**
 *
 * @param {*} file input.files[0]
 * @returns 本地缓存 blob 路径
 */
function getFileURL(file) {
  var url = null;
  if (window.createObjectURL != undefined) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL != undefined) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

/**
 * 监听dom 元素属性变化 ie11+
 *
 * @param {*} ele dom 元素
 * @param {*} callback(beforeDom, afterDom)
 */
function listenDom(ele, callback) {
  var MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type == "attributes") {
        callback(ele, mutation.target);
      }
    });
  });
  observer.observe(ele, {
    attributes: true //configure it to listen to attribute changes,
  });
}
