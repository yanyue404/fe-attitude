
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

function getPageHeight() {
  var h = (objWin.innerHeight && objWin.scrollMaxY) ? (objWin.innerHeight + objWin.scrollMaxY) : (objBody.scrollHeight > objBody.offsetHeight ? objBody.scrollHeight : objBody.offsetHeight);
  return Math.max(h, objDel.scrollHeight)
}
function getPageWidth() {
  return (objWin.innerWidth && objWin.scrollMaxX) ? (objWin.innerWidth + objWin.scrollMaxX) : (Math.max(objBody.scrollWidth, objBody.offsetWidth))
}
function getWinHeight() {
  return (objWin.innerHeight) ? objWin.innerHeight : (objDel && objDel.clientHeight) ? objDel.clientHeight : objBody.offsetHeight
}
function getWinWidth() {
  return (objWin.innerWidth) ? objWin.innerWidth : (objDel && objDel.clientWidth) ? objDel.clientWidth : objBody.offsetWidth
}
function getMaxH() {
  var a = getPageHeight(),
    wh = getWinHeight();
  return Math.max(a, wh)
}
function getMaxW() {
  var a = getPageWidth(),
    ww = getWinWidth();
  return Math.max(a, ww)
}
