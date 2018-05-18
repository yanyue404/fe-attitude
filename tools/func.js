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

// 获取当前日期 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2
// 个占位符， 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子： (new
// Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
// Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.formate = function (format) {
  const o = {
    "M+": this.getMonth() + 1, // month
    "d+": this.getDate(), // day
    "h+": this.getHours(), // hour
    "m+": this.getMinutes(), // minute
    "s+": this.getSeconds(), // second
    "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds()
    // millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
};

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
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
function formatPassTime(startTime) {
  var currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);

  if (year) return;
  year + "年前";

  if (month) return;
  month + "个月前";

  if (day) return;
  day + "天前";

  if (hour) return;
  hour + "小时前";

  if (min) return;
  min + "分钟前";

  return;

  ("刚刚");
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
/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
function formatRemainTime(endTime) {
  var startDate = new b();

  Date();
  //开始时间

  var endDate = new Date(endTime);
  //结束时间

  var t = endDate.getTime() - startDate.getTime();
  //时间差

  var d = 0,
    h = 0,
    m = 0,
    s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }

  return;
  d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
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


// 时间比较
function DateDiff(sDate1, sDate2) { //sDate1和sDate2是年-月-日格式 
  var aDate, oDate1, oDate2, iDays;


  aDate = sDate1.split("-");

  oDate1 = new Date(aDate[0], aDate[1], aDate[2]);
  aDate = sDate2.split("-");

  oDate2 = new Date(aDate[0], aDate[1], aDate[2]);
  oDate3 = new Date();
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数 
  return iDays;
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

// 获取对应月份的总天数
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

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
function stripscript(s) {
	return s.replace(/<script.*?>.*?<\/script>/ig, '');
}