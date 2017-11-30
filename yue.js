

(function (w, d) {
  if (!window.yue) {
    window.yue = {};
  }
  
/* eslint-disable no-undef */  // 忽略 no-undef 检查
var yue = {


    Dom: {
      $: function (id) {
        return typeof id === 'string' ? d.getElementById(id) : id;
      },
      remove: function (o) {
        var obj = this.$(o);
        if (!obj) {
          return;
        }
        return obj.parentNode.removeChild(obj);
      },
      insertAfter: function (newElement, targetElement) {
        var parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
          parent.appendChild(newElement);
        } else {
          parent.insertBefore(newElement, targetElement.nextSibling);
        }
      },
      getStyle: function (ele, attr) {

        if (ele.currentStyle !== undefined) {
          return ele.currentStyle[attr];
        } 
          return window.getComputedStyle(ele, null)[attr] ? window.getComputedStyle(ele, null)[attr] : ele.getAttribute(
            attr);    
      }

    },

    F: {
      //页面加载自执行函数
      //判断数据类型
      typeOf: function (value) {
        if (null === value) {
          return 'null';
        }

        var type = typeof value;
        if ('undefined' === type || 'string' === type) {
          return type;
        }

        var typeString = toString.call(value);
        switch (typeString) {
          case '[object Array]':
            return 'array';
          case '[object Date]':
            return 'date';
          case '[object Boolean]':
            return 'boolean';
          case '[object Number]':
            return 'number';
          case '[object Function]':
            return 'function';
          case '[object RegExp]':
            return 'regexp';
          case '[object Object]':
            if (undefined !== value.nodeType) {
              if (3 == value.nodeType) {
                return (/\S/).test(value.nodeValue) ? 'textnode' : 'whitespace';
              } 
                return 'element';
              
            } 
              return 'object';
            
          default:
            return 'unknow';
        }
      },
      //依赖于jq的ajax方法(post)封装
      ajaxPostQuery: function (url, paramJsonStr, func, dataType) {
      dataType = dataType || "json";
        var sid = '123';
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
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("网络暂时不可用");
          },
          success: function (data) {
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
      },
      addLoadEvent: function (func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
          window.onload = func;
        } else {
          window.onload = function () {
            oldonload();
            func();
          };
        }
      },
      //异步加载js,执行回调函数
      loadScript: function (url, callback) {
        var script = document.createElement('script');
        script.type = "text/javaScript";
        if (script.readyState) { //IE
          script.onreadystatechange = function () {
            if (script.readyState == "loaded" || script.readyState == "complete") {
              script.onreadystatechange = null;
              callback();
            }
          };
        } else {
          script.onload = function () {
            callback();
          };
        }
        script.src = url;
        document.getElementsByTagName('head')[0].appendChild(script);
      },
      //获取地址栏request中的参数
      GetQueryString: function (name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      //格式化金额
      //price = fmoney(price,2);
      fmoney: function (s, n) {

        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        var t = "";
        for (let j = 0; j < l.length; j++) {
          t += l[j] + ((j + 1) % 3 == 0 && (j + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      },
      //格式化到小数点后两位(四舍五入)
      fomate20: function (x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      //判断数组里是否有某个元素
      isIncluded: function (element, array) {
        for (var i = 0,
            len = array.length; i < len; i++) {
          if (array[i] == element) {
            return true;
          }
        }
        return false;
      },
      // 获取当前日期
      getDate: function () {
        var today = new Date();
        var fullYear = today.getFullYear();
        var month = (today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1);
        var day = today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate();
        return fullYear + '-' + month + '-' + day;
      }



    }



  };
})(window, document);