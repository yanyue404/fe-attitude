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
function getStyle(e, a) {
  var b = (typeof objDoc.defaultView == 'function') ? objDoc.defaultView() : objDoc.defaultView;
  if (b && b.getComputedStyle) {
    var s = b.getComputedStyle(e, null);
    return s && s.getPropertyValue(a)
  }
  return (e.currentStyle && (e.currentStyle[a] || null) || null)
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
// setStyle(c, {
//     backgroundColor: this.bgcolor,
//     display: 'block'
// })
function setStyle(e, a) {
  for (var i in a) {
    e.style[i] = a[i]
  }
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
