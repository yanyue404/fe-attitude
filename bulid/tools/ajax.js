// 获取地址栏request中的参数
function GetQueryString(name) {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
function ajaxPostQuery(url, paramJsonStr, func, dataType) {
  var dataType = dataType || "json";
  var url = url || queryUrl;
  var sid = "123"; //用户登录的sessionID
  $.ajax({
    type: "POST",
    url: url,
    data: paramJsonStr + "&sid=" + sid,
    headers: {
      accept: "*/*"
    },
    //contentType:"application/x-www-form-urlencoded",
    dataType: dataType,
    timeout: 0,
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("网络暂时不可用");
    },
    success: function(data) {
      var errorData;
      if (typeof data == "string") {
        try {
          errorData = eval("(" + data + ")");

          if (errorData.error == "-1") {
            alert(url);
            // relogin(url);
          } else {
            func(data);
          }
        } catch (e) {
          func(data);
        }
      }
    }
  });
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

//设置cookie
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie =
    c_name +
    "=" +
    escape(value) +
    (expiredays == null ? "" : ";expires=" + exdate.toGMTString());
}

setCookie("zhangsan", 18, 1);

//获取
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1) c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

//删除
function clearCookie(name) {
  setCookie(name, "", -1);
}
