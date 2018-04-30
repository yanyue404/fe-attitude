
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
function goBack() {
  history.back();
}

/* try {
  localStorage.setItem('noTrace', true)
} catch (e) {
  window.location.href = '/notrace.html'
} */


window.onerror = function(msg,url,line,col,error){
    if (msg != "Script error." && !url){
        return true;
    }
    if(url.indexOf(".js")==-1){
        return true;
    }
    setTimeout(function(){
        var data = {
            url: encodeURIComponent(url),
            line: encodeURIComponent(line),
            col: col || (window.event && window.event.errorCharacter) || 0
        };

        if (!!error && !!error.stack){
            data.msg = error.stack.toString();
        }else if (!!arguments.callee){
            var ext = [];
            var f = arguments.callee.caller, c = 3;
            while (f && (--c>0)) {
               ext.push(f.toString());
               if (f  === f.caller) {
                    break;//如果有环
               }
               f = f.caller;
            }
            ext = ext.join(",");
            data.msg = error.stack.toString();
        };
        data.msg = encodeURIComponent(data.msg);

        var api = "//moco.imooc.com/monitor/api/jslog.html?url="+data.url+"&line="+data.line+"&col="+data.col+"&msg="+data.msg;

        var xmlhttp;
        if (window.XMLHttpRequest){
            xmlhttp=new XMLHttpRequest();
        }else if (window.ActiveXObject){
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (xmlhttp!=null) {
            xmlhttp.onreadystatechange=function(){};
            xmlhttp.open("GET",api,true);
            xmlhttp.send();
        }
    },0);
    return true;
};
