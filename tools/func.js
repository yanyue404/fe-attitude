// 判断数据类型
function getType(a) {
  var typeArray = Object.prototype.toString.call(a).split(" ");
  return typeArray[1].slice(0, -1);
}

//传递一个范围，返回该范围的随机数
function getRand(min, max) {
  if (max < min) {
    var n = max;
    max = min;
    min = n;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 前补0  prefixInteger(3,3) => 003
function prefixInteger(num, length) {
  return (num / Math.pow(10, length)).toFixed(length).substr(2);
}

function fmoney(s, n) {
  //s:传入的float数字 ，n:希望返回小数点几位
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s
    .split(".")[0]
    .split("")
    .reverse(),
    r = s.split(".")[1];
  t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }
  return;
  t
    .split("")
    .reverse()
    .join("") +
    "." +
    r;
}

function rmoney(s) {
  return;
  parseFloat(s.replace(/[^\d\.-]/g, ""));
}


/**
 *
 * @desc 判断浏览器是否支持webP格式图片
 * @return {Boolean}
 */
function isSupportWebP() {
  return (
    !![].map &&
    document
      .createElement("canvas")
      .toDataURL("image/webp")
      .indexOf("data:image/webp") == 0
  );
}


// var url = 'http://xiaoyueyue.org';
function timestamp(url) {
  //  var getTimestamp=Math.random();
  var getTimestamp = new Date().getTime();
  if (url.indexOf("?") > -1) {
    url = url + "&timestamp=" + getTimestamp;
  } else {
    url = url + "?timestamp=" + getTimestamp;
  }
  return url;
}
// var newUrl = timestamp(url);
// window.location.href = newUrl
//根据名称获取页面中chechbox或者radio标签选中项的值，以逗号分割，组成一个字符串返回。
function getSelIds(inputName) {
  var checkboxes = document.getElementsByName(inputName);
  var ids = "";
  for (var i = 0; i < checkboxes.length; i++) {
    var chx = checkboxes[i];
    if (chx.checked) {
      if (ids != "") ids += ",";
      ids += chx.value;
    }
  }
  return ids;
}

// 回车事件
function ListenEnter(func) {
  document.onkeydown = function (event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {// enter 键

      func();
    }
  };

}


function setOpacity(e, a) {
  e.style.opacity = a / 100;
  e.style.filter = 'alpha(opacity=' + a + ')';
  /*  if (isIE)
       e.style.zoom = 1 */
}

// 超过范围的值只取最大范围
function rangval(val, min, max) {
  try {
    if (val > parseInt(max)) {
      val = max;
    }
    else if (val < parseInt(min)) {
      val = min;
    }
  }
  catch (e) {
    console.log(e.message);
  }
  return val;
}

//定时跳转
function jump(count, target) {
  window.setTimeout(function () {
    count--;
    if (count > 0) {
      jump(count, target);
    } else {
      location.href = target;
    }
  }, 1000);
}


// 防抖（Debouncing/Debounce）
// debounce 的关注点是空闲的间隔时间,强制函数在某段时间内只执行一次。

// 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 delay，fn 才会执行

function debounce(fn,delay){
    var timer;
    return function(){
        var context = this;
        var args = arguments;
        timer&&clearTimeout(timer);
        timer = setTimeout(function(){
            fn.apply(context,args);
        },delay);
    }
}
// 节流（Throttling/Throttle）
// throttle 的关注点是连续的执行间隔时间,强制函数以固定的速率执行。

// 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
function throttle(func, wait) {
  var timeout, previous;
  return function () {
    context = this;
    args = arguments;
    if (!timeout) {
      timeout = setTimeout(() => {
        timeout = null;
        func.apply(context.args);
      }, wait);
    }
  }
}

window.onerror = function(
  errMsg,
  scriptURI,
  lineNumber,
  columnNumber,
  errorObj
) {
  setTimeout(function() {
    var rst = {
      "错误信息：": errMsg,
      "出错文件：": scriptURI,
      "出错行号：": lineNumber,
      "出错列号：": columnNumber,
      "错误详情：": errorObj
    };

    alert(JSON.stringify(rst, null, 10));
  });
};
