const dom = {
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

  onSwipe(element, fn) {
    let x0, y0;
    element.addEventListener("touchstart", e => {
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    });
    element.addEventListener("touchmove", e => {
      if (!x0 || !y0) {
        return;
      }
      let xDiff = e.touches[0].clientX - x0;
      let yDiff = e.touches[0].clientY - y0;

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

  index(element) {
    const siblings = element.parentNode.children;
    for (let index = 0; index < siblings.length; index++) {
      if (siblings[index] === element) {
        return index;
      }
    }
    return -1;
  },

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
  },

  // http://stackoverflow.com/a/35385518/1262580
  create(html, children) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    const node = template.content.firstChild;
    if (children) {
      dom.append(node, children);
    }
    return node;
  },

  append(parent, children) {
    if (children.length === undefined) {
      children = [children];
    }
    for (let i = 0; i < children.length; i++) {
      parent.appendChild(children[i]);
    }
    return parent;
  },
  prepend(parent, children) {
    if (children.length === undefined) {
      children = [children];
    }
    for (let i = children.length - 1; i >= 0; i--) {
      if (parent.firstChild) {
        parent.insertBefore(children[i], parent.firstChild);
      } else {
        parent.appendChild(children[i]);
      }
    }
    return parent;
  },
  removeChildren(element) {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
    return this;
  },

  dispatchEvent(element, eventType, detail) {
    const event = new CustomEvent("pageChange", { detail });
    element.dispatchEvent(event);
    return this;
  }
};
// 对象合并 option = _extend(option, opt);
var _extend = function (option, opt) {
  if (typeof (opt) != 'object' || !opt) {
    return option;
  }
  for (var property in opt) {
    option[property] = opt[property];
  }
  return option;
};

/**
 * 
 * @param {any} obj 
 * @returns {boolean} 判断传入的参数是否是一个朴素对象
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

function create(t) {
  return document.createElement(t)
}

function remove(t) {
  t && t.parentNode && t.parentNode.removeChild(t)
}

function $(selector, el) {
  if (!el) {
    el = document;
  }
  return el.querySelector(selector);
}
function getId(id) {
  return !id ? null : document.getElementById(id);
}
function display(id) {
  var obj = getId(id);
  if (obj.style.visibility) {
    obj.style.visibility = obj.style.visibility == 'visible' ? 'hidden' : 'visible';
  } else {
    obj.style.display = obj.style.display == '' ? 'none' : '';
  }
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
// 将NodeList转为数组
function convertToArray(nodeList) {
  var array = null
  try {
    // IE8-NodeList是COM对象
    array = Array.prototype.slice.call(nodeList, 0)
  } catch (err) {
    array = []
    for (var i = 0, len = nodeList.length; i < len; i++) {
      array.push(nodeList[i])
    }
  }
  return array
}
function getByClass(oParent, sClass) {
  var aEle = oParent.getElementsByTagName('*');
  var aResult = [];
  var re = new RegExp('\\b' + sClass + '\\b', 'i');
  var i = 0;
  for (i = 0; i < aEle.length; i++) {
    if (re.test(aEle[i].className)) {
      aResult.push(aEle[i]);
    }
  }
  return aResult;
}
function $C(classname, ele, tag) {
  var returns = [];
  ele = ele || document;
  tag = tag || '*';
  if (ele.getElementsByClassName) {
    var eles = ele.getElementsByClassName(classname);
    if (tag != '*') {
      for (var i = 0, L = eles.length; i < L; i++) {
        if (eles[i].tagName.toLowerCase() == tag.toLowerCase()) {
          returns.push(eles[i]);
        }
      }
    } else {
      returns = eles;
    }
  } else {
    eles = ele.getElementsByTagName(tag);
    var pattern = new RegExp("(^|\\s)" + classname + "(\\s|$)");
    for (i = 0, L = eles.length; i < L; i++) {
      if (pattern.test(eles[i].className)) {
        returns.push(eles[i]);
      }
    }
  }
  return returns;
}
function hasClass(obj, classStr) {
  var arr = obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含 
  return (arr.indexOf(classStr) == -1) ? false : true;
}
function addClass(obj, classStr) {
  if (!this.hasClass(obj, classStr)) { obj.className += " " + classStr };
}
function removeClass(obj, classStr) {
  if (this.hasClass(obj, classStr)) {
    var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
    obj.className = obj.className.replace(reg, '');
  }
}
function replaceClass(obj, newName, oldName) {
  removeClass(obj, oldName);
  addClass(obj, newName);
}


function getStyle(ele, attr) {
  if (ele.currentStyle !== undefined) {
    return ele.currentStyle[attr];
  } else {
    return window.getComputedStyle(ele, null)[attr]
      ? window.getComputedStyle(ele, null)[attr]
      : ele.getAttribute(attr);
  }
}

function css(t, n) {
  return t.currentStyle ? t.currentStyle[n] : getComputedStyle(t, !1)[n]
}

// setStyle(c, {
//     backgroundColor: this.bgcolor,
//     display: 'block'
// })
function setStyle(e, a) {
  for (var i in a) {
    e.style[i] = a[i]
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
};

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
};
function siblings(obj) {
  var a = [];//定义一个数组，用来存o的兄弟元素 
  var p = obj.previousSibling;
  while (p) {//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling 
    if (p.nodeType === 1) {
      a.push(p);
    }
    p = p.previousSibling//最后把上一个节点赋给p 
  }
  a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了 
  var n = obj.nextSibling;//再取o的弟弟 
  while (n) {//判断有没有下一个弟弟结点 n是nextSibling的意思 
    if (n.nodeType === 1) {
      a.push(n);
    }
    n = n.nextSibling;
  }
  return a;
}



// addEvent(objWin, 'scroll', fixIECenter)
// d参数默认false=》冒泡，true为捕获
function addEvent(a, b, c, d) {
  a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent("on" + b, c)
}
// removeEvent(objOverLay, 'click', eMsgClose)
function removeEvent(a, b, c, d) {
  a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent("on" + b, c)
}


//取消浏览器默认行为
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
// 阻止事件冒泡
function stopBubble(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();
  } else if (window.event) {
    window.event.cancelBubble = true;
  }
}

function show(ele) {
  ele.style.display = "block";
}

//隐藏盒子
function hide(ele) {
  ele.style.display = "none";
}
