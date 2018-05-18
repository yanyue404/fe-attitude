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


function appendHTML (el, html) {
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

 function prependHTML (el, html) {
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

function show(ele) {
  ele.style.display = "block";
}

//隐藏盒子
function hide(ele) {
  ele.style.display = "none";
}
