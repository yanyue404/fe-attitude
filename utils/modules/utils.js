function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

const isNumber = obj => {
  return typeof obj === 'number';
};
function isArray(arg) {
  return Array.isArray(arg);
}
function isObject(arg) {
  return arg != null && typeof arg === 'object' && !Array.isArray(arg);
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

// https://github.com/lodash/lodash/blob/master/isPlainObject.js
function isPlainObject(value) {
  if (!isObjectLike(value) || getTag(value) != '[object Object]') {
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
        throw new Error('请检验传入的时间戳');
      }
    })(),
    // 补 0
    addZero = function(str) {
      return Number(str) < 10 ? '0' + str : str;
    };
  var Y = date.getFullYear(),
    M = addZero(date.getMonth() + 1),
    D = addZero(date.getDate()),
    h = addZero(date.getHours()) + ':',
    m = addZero(date.getMinutes()) + ':',
    s = addZero(date.getSeconds());

  if (hasHour === true) {
    return Y + splitStr + M + splitStr + D + ' ' + h + m + s;
  } else if (splitStr) {
    return Y + splitStr + M + splitStr + D;
  } else {
    return {
      Y: Y,
      M: M,
      D: D,
      h: h,
      m: m,
      s: s,
    };
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
  a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent('on' + b, c);
}
// removeEvent(objOverLay, 'click', eMsgClose)
function removeEvent(a, b, c, d) {
  a.removeEventListener
    ? a.removeEventListener(b, c, d)
    : a.detachEvent('on' + b, c);
}

function setStyle(ele, styleObj) {
  for (var i in styleObj) {
    ele.style[i] = styleObj[i];
  }
}
