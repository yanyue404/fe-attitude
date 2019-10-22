function myJsonp(url, data, callback) {
  var fnName =
    "myJsonp_" +
    Math.random()
      .toString()
      .replace(".", "");
  window[fnName] = callback;
  var querystring = "";
  for (var attr in data) {
    querystring += attr + "=" + data[attr] + "&";
  }
  var script = document.createElement("script");
  script.src = url + "?" + querystring + "callback=" + fnName;
  script.onload = function() {
    document.body.removeChild(script);
  };
  document.body.appendChild(script);
}

/**
 * 获取地址栏request中的参数
 *
 * @param {*} name
 * @returns
 */
function GetQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 *
 * 设置url参数
 * @param {*} obj {'a':1,'b':2}
 * @returns a=1&b=2
 */
function setUrlPrmt(obj) {
  let _rs = [];
  for (let p in obj) {
    if (obj[p] != null && obj[p] != "") {
      _rs.push(p + "=" + obj[p]);
    }
  }
  return _rs.join("&");
}

/**
 * url 参数转对象
 *
 * @param {*} url
 * @returns
 */
function parseParam(url) {
  var paramArr = decodeURI(url)
      .split("?")[1]
      .split("&"),
    obj = {};
  for (var i = 0; i < paramArr.length; i++) {
    var item = paramArr[i];
    if (item.indexOf("=") != -1) {
      var tmp = item.split("=");
      obj[tmp[0]] = tmp[1];
    } else {
      obj[item] = true;
    }
  }
  return obj;
}

/**
 *
 * @desc   参数对象序列化
 * @param  {Object} obj
 * @return {String}
 */
function qsStringify(obj) {
  var pairs = [];
  for (var key in obj) {
    var value = obj[key];
    if (typeof value === "function") {
      continue;
    }
    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(key + "[" + i + "]" + "=" + value[i]);
      }
      continue;
    }
    pairs.push(key + "=" + obj[key]);
  }
  return pairs.join("&");
}

// form表单序列化 摘自高程
function serialize(form) {
  var parts = [],
    field = null,
    i,
    len,
    j,
    optLen,
    option,
    optValue;

  for (i = 0, len = form.elements.length; i < len; i++) {
    field = form.elements[i];

    switch (field.type) {
      case "select-one":
      case "select-multiple":
        if (field.name.length) {
          for (j = 0, optLen = field.options.length; j < optLen; j++) {
            option = field.options[j];
            if (option.selected) {
              optValue = "";
              if (option.hasAttribute) {
                optValue = option.hasAttribute("value")
                  ? option.value
                  : option.text;
              } else {
                optValue = option.attributes["value"].specified
                  ? option.value
                  : option.text;
              }
              parts.push(
                encodeURIComponent(field.name) +
                  "=" +
                  encodeURIComponent(optValue)
              );
            }
          }
        }
        break;

      case undefined: //fieldset
      case "file": //file input
      case "submit": //submit button
      case "reset": //reset button
      case "button": //custom button
        break;

      case "radio": //radio button
      case "checkbox": //checkbox
        if (!field.checked) {
          break;
        }
      /* falls through */

      default:
        //don't include form fields without names
        if (field.name.length) {
          parts.push(
            encodeURIComponent(field.name) +
              "=" +
              encodeURIComponent(field.value)
          );
        }
    }
  }
  return parts.join("&");
}
