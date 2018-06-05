/*
 * Get an ajax content.
 *
 * @Use var diagram = $.parseJSON( getPostContent( '/doajax?action=login-status', data ) );
 */
var getPostContent = function (url, data) {
  var value = (function () {
    var val = null;
    $.ajax({
      'type': 'POST',
      'async': false,
      'global': false,
      'url': url,
      'data': data,
      'success': function (res) {
        val = res;
      }
    });
    return val;
  })();
  return value;
}

/*
 * Get an ajax content.
 *
 * @Use var diagram = $.parseJSON( getContent( '/doajax?action=login-status' ) );
 */
var getContent = function (url) {
  var value = (function () {
    var val = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': url,
      'success': function (data) {
        val = data;
      }
    });
    return val;
  })();
  return value;
}

function encode(e) {
  return function (t) {
    return e + "::" + encodeURIComponent(t)
  }
}
/**
 * @param  {setting}
 */
function ajax(setting) {
  //设置参数的初始值
  var opts = {
    method: (setting.method || "GET").toUpperCase(), //请求方式
    url: setting.url || "", // 请求地址
    async: setting.async || true, // 是否异步
    dataType: setting.dataType || "json", // 解析方式
    data: setting.data || "", // 参数
    success: setting.success || function () { }, // 请求成功回调
    error: setting.error || function () { } // 请求失败回调
  };

  // 参数格式化
  function params_format(obj) {
    var str = "";
    for (var i in obj) {
      str += i + "=" + obj[i] + "&";
    }
    return str
      .split("")
      .slice(0, -1)
      .join("");
  }

  // 创建ajax对象
  var xhr = new XMLHttpRequest();

  // 连接服务器open(方法GET/POST，请求地址， 异步传输)
  if (opts.method == "GET") {
    xhr.open(
      opts.method,
      opts.url + "?" + params_format(opts.data),
      opts.async
    );
    xhr.send();
  } else {
    xhr.open(opts.method, opts.url, opts.async);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(opts.data);
  }

  /*
  ** 每当readyState改变时，就会触发onreadystatechange事件
  ** readyState属性存储有XMLHttpRequest的状态信息
  ** 0 ：请求未初始化
  ** 1 ：服务器连接已建立
  ** 2 ：请求已接受
  ** 3 : 请求处理中
  ** 4 ：请求已完成，且相应就绪
  */
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && (xhr.status === 200 || xhr.status === 304)) {
      switch (opts.dataType) {
        case "json":
          var json = JSON.parse(xhr.responseText);
          opts.success(json);
          break;
        case "xml":
          opts.success(xhr.responseXML);
          break;
        default:
          opts.success(xhr.responseText);
          break;
      }
    }
  };

  xhr.onerror = function (err) {
    opts.error(err);
  };
}

function myJsonp(url, data, callback) {

  var fnName = 'myJsonp_' + Math.random().toString().replace('.', '');

  window[fnName] = callback;

  var querystring = '';

  for (var attr in data) {

    querystring += attr + '=' + data[attr] + '&';

  }

  var script = document.createElement('script');

  script.src = url + '?' + querystring + 'callback=' + fnName;

  script.onload = function () {

    document.body.removeChild(script);

  }

  document.body.appendChild(script);

}

/**
 * @param  {url}
 * @param  {setting}
 * @return {Promise}
 */
function fetch(url, setting) {
  //设置参数的初始值
  let opts = {
    method: (setting.method || "GET").toUpperCase(), //请求方式
    headers: setting.headers || {}, // 请求头设置
    credentials: setting.credentials || true, // 设置cookie是否一起发送
    body: setting.body || {},
    mode: setting.mode || "no-cors", // 可以设置 cors, no-cors, same-origin
    redirect: setting.redirect || "follow", // follow, error, manual
    cache: setting.cache || "default" // 设置 cache 模式 (default, reload, no-cache)
  };
  let dataType = setting.dataType || "json", // 解析方式
    data = setting.data || ""; // 参数

  // 参数格式化
  function params_format(obj) {
    var str = "";
    for (var i in obj) {
      str += `${i}=${obj[i]}&`;
    }
    return str
      .split("")
      .slice(0, -1)
      .join("");
  }

  if (opts.method === "GET") {
    url = url + (data ? `?${params_format(data)}` : "");
  } else {
    setting.body = data || {};
  }

  return new Promise((resolve, reject) => {
    fetch(url, opts)
      .then(async res => {
        let data =
          dataType === "text"
            ? await res.text()
            : dataType === "blob" ? await res.blob() : await res.json();
        resolve(data);
      })
      .catch(e => {
        reject(e);
      });
  });
}

// 获取地址栏request中的参数
function GetQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
function getQuery(name, url) {
  //参数：变量名，url为空则表从当前页面的url中取
  var u = arguments[1] || window.location.search,
    reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    r = u.substr(u.indexOf("\?") + 1).match(reg);
  return r !== null ? r[2] : "";
}
//设置url参数
//setUrlPrmt({'a':1,'b':2})
//a=1&b=2
function setUrlPrmt(obj) {
  let _rs = [];
  for (let p in obj) {
    if (obj[p] != null && obj[p] != '') {
      _rs.push(p + '=' + obj[p])
    }
  }
  return _rs.join('&');
}

/**
 *
 * @desc   url参数转对象
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
function parseQueryString(url) {
  url = url == null ? window.location.href : url;

  var search = url.substring(url.lastIndexOf("?") + 1);

  if (!search) {
    return {};
  }

  return;
  JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  );
}

/**
 *
 * @desc   对象序列化
 * @param  {Object} obj
 * @return {String}
 */
function stringfyQueryString(obj) {
  if (!obj) return;

  ("");

  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(
          encodeURIComponent(key + "[" + i + "]") +
          "=" +
          encodeURIComponent(value[i])
        );
      }

      continue;
    }
    pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
  }

  return pairs.join("&");
}


// form表单数据序列化 传入form id ,返回序列化json字符串
function formser(form) {
  var form = document.getElementById(form);
  var arr = {};
  for (var i = 0; i < form.elements.length; i++) {
    var feled = form.elements[i];
    switch (feled.type) {
      case undefined:
      case "button":
      case "file":
      case "reset":
      case "submit":
        break;
      case "checkbox":
      case "radio":
        if (!feled.checked) {
          break;
        }
      default:
        if (arr[feled.name]) {
          arr[feled.name] = arr[feled.name] + "," + feled.value;
        } else {
          arr[feled.name] = feled.value;
        }
    }
  }
  return stringfyQueryString(arr);
}
function formatParams(data) {
  var arr = [];
  for (var name in data) {
    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }
  arr.push(("v=" + Math.random()).replace(".", ""));
  return arr.join("&");
}
