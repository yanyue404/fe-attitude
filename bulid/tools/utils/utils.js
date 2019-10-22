/**
 * 判断数据类型
 *
 * @param {*} a
 * @returns Boolean String Array Object Function Number Undefined Null
 */
function getType(a) {
  return Object.prototype.toString.call(a).slice(8, -1);
}

/**
 * 对象扩展
 *
 * @param {*} target
 * arguments obj ...
 * @returns obj
 */
function extend(target) {
  for (var i = 1, len = arguments.length; i < len; i++) {
    for (var prop in arguments[i]) {
      if (arguments[i].hasOwnProperty(prop)) {
        target[prop] = arguments[i][prop];
      }
    }
  }
  return target;
}
// https://github.com/lodash/lodash/blob/master/isPlainObject.js
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != "[object Object]") {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
}

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
function objClone(jsonObj) {
  let buf;
  if (Array.isArray(jsonObj)) {
    buf = [];
    let i = jsonObj.length;
    while (i--) {
      buf[i] = objClone(jsonObj[i]);
    }
    return buf;
  } else if (isPlainObject(jsonObj)) {
    buf = {};
    for (const k in jsonObj) {
      buf[k] = objClone(jsonObj[k]);
    }
    return buf;
  } else {
    return jsonObj;
  }
}

function isFunction(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === "Function";
}
const isNumber = obj => {
  return typeof obj === "number";
};
function isArray(arg) {
  return Array.isArray(arg);
}
function isObject(arg) {
  return arg != null && typeof arg === "object" && !Array.isArray(arg);
}
function isEmptyObject(obj) {
  if (!obj) {
    return false;
  }
  for (const n in obj) {
    if (obj.hasOwnProperty(n) && obj[n]) {
      return false;
    }
  }
  return true;
}
/**
 * 格式化时间戳
 *
 * @param {*} timestamp "1562585040" 只第一个参数，返回时间信息 obj { D: "08",M: "07",Y: 2019,h: "19:",m: "24:",s: "00"}
 * @param {*} splitStr 指定分割符(年月日) '/' "2019/07/08"
 * @param {*} hasHour/type true "2019-07-08 19:24:00"
 * @returns
 */
function timestampToTime(timestamp, splitStr, hasHour) {
  var date = (function() {
      if (timestamp.length === 10) {
        return new Date(timestamp * 1000);
      } else if (timestamp.length === 13) {
        return new Date(Number(timestamp));
      } else {
        throw new Error("请检验传入的时间戳");
      }
    })(),
    // 补 0
    addZero = function(str) {
      return Number(str) < 10 ? "0" + str : str;
    };
  var Y = date.getFullYear(),
    M = addZero(date.getMonth() + 1),
    D = addZero(date.getDate()),
    h = addZero(date.getHours()) + ":",
    m = addZero(date.getMinutes()) + ":",
    s = addZero(date.getSeconds());

  if (hasHour === true) {
    return Y + splitStr + M + splitStr + D + " " + h + m + s;
  } else if (splitStr) {
    return Y + splitStr + M + splitStr + D;
  } else {
    return {
      Y: Y,
      M: M,
      D: D,
      h: h,
      m: m,
      s: s
    };
  }
}

/**
 * 四舍五入 格式化数字
 *
 * @param {*} number 8440.55
 * @param {*} fractionDigits 1 小数位数
 * @returns 8440.6
 */
function toFixed(number, fractionDigits) {
  var times = Math.pow(10, fractionDigits);
  var roundNum = Math.round(number * times) / times;
  return roundNum.toFixed(fractionDigits);
}
/**
 * 把当前的数字格式化为指定小数位数的金额
 * @param {*} s 价格数字
 * @param {*} n 小数点后位数
 * @returns
 */
function fmoney(s, n) {
  //s:传入的float数字 ，n:希望返回小数点几位
  var n = n > 0 && n <= 20 ? n : 2,
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "",
    l = s
      .split(".")[0]
      .split("")
      .reverse(),
    r = s.split(".")[1],
    t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }
  return (
    t
      .split("")
      .reverse()
      .join("") +
    "." +
    r
  );
}

/**
 * 还原价格
 * @param {*} s 上面方法过滤后的结果
 * @returns
 */
function rmoney(s) {
  return parseFloat(s.replace(/[^\d\.-]/g, ""));
}

/**
 * 防抖 一定时间内连续调用只允许执行一次
 *
 * @param {*} func
 * @param {*} wait 等待时间
 * @param {*} immediate 传 true，首次调用即立即执行
 * @returns
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var canApply = !timeout;
      timeout = setTimeout(function() {
        timeout = null; // 在 wait 时间后防抖函数才可以再次被触发
      }, wait);
      if (canApply) func.apply(context, args); // 第一次 !undefined 执行
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
}

function throttle(fn, gapTime = 1500) {
  let _lastTime = null;
  // 返回新的函数
  return function() {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments); //将this和参数传给原函数
      _lastTime = _nowTime;
    }
  };
}
/**
 * 只允许执行一次的 once 方法
 * @param {*} fn
 * @returns
 */
function once(fn) {
  return function() {
    if (typeof fn === "function") {
      var ret = fn.apply(this, arguments);
      fn = null;
      return ret;
    } else {
      throw new TypeError("Expected a function");
    }
  };
}

/**
 * 为数组添加新的自定义键值以及过滤每个子项的方法
 *
 * @param {*} arr
 * @param {*} obj { isShow:false,isStar:false} 第二个参数为 Function 时
 * @param {*} filterFn 第二个参数为 Object 时
 * @returns Array
 */
function addKey(sourceArray, extendObj, filterFn) {
  var getType = function(a) {
    var typeArray = Object.prototype.toString.call(a).split(" ");
    return typeArray[1].slice(0, -1);
  };
  var secondParamType = getType(arguments[1]);

  if (!getType(sourceArray) == "Array") {
    throw new Error("第一个参数必须为数组类型");
  }
  if (secondParamType === "Object") {
    return sourceArray.forEach((v, index, sourceArray) => {
      for (var key in extendObj) {
        v[key] = extendObj[key];
      }
      typeof filterFn === "function" ? filterFn(v, index, sourceArray) : "";
    });
  } else if (secondParamType === "Function") {
    return sourceArray.forEach((v, index, sourceArray) => {
      arguments[1](v, index, sourceArray);
    });
  } else {
    return sourceArray;
  }
}

//----------------------------------------- 事件相关------------------------------------------
/**
 *
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

function setStyle(ele, styleObj) {
  for (var i in styleObj) {
    ele.style[i] = styleObj[i];
  }
}
