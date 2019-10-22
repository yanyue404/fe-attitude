// window.location.href='https://www.baidu.com';
// window.open("http://zkcx.bjeea.cn/zhcxxt/index.jsp");
// window.open("../../../portal/xgzc.html");
function openUrl(url) {
  var a = document.createElement("a");
  a.target = "_self";
  a.href = url;
  a.style.display = "none";
  var body = document.getElementsByTagName("body").item(0);
  body.appendChild(a);
  a.click();
  body.removeChild(a);
}

/**
 * https://stackoverflow.com/questions/503093/how-do-i-redirect-to-another-webpage
 * redirect to another webpage
 * @param {*} href "http://stackoverflow.com"
 */
function toHref(href) {
  window.location.replace(href);
}

// 布尔值定义在函数原型，window上
function onceFn(callback) {
  // window.isOnce
  if (!callback.prototype.isOnce && typeof callback === "function") {
    return function() {
      var result = callback.apply(this, arguments);
      callback.prototype.isOnce = true;
      return result;
    };
  } else {
    return function() {};
  }
}

let print = obj => {
  var type = "log";
  const log = JSON.parse(JSON.stringify(obj));
  console[type](log);
};

function getPrototype(obj) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(obj);
  } else if (obj.__proto__) {
    return obj.__proto__;
  }
  return obj.constructor.prototype;
}

function getPrototypeChain(obj) {
  const protoChain = [];
  while ((obj = getPrototype(obj))) {
    protoChain.push(obj);
  }
  return protoChain;
}
