

(function (w, d) {
  if (!window.yue) {
    window.yue = {};
  }

/* eslint-disable no-undef */ // 忽略 no-undef 检查
const yue = {


    Dom: {
      $(id) {
        return typeof id === 'string' ? d.getElementById(id) : id;
      },
      remove(o) {
        const obj = this.$(o);
        if (!obj) {
          return;
        }
        return obj.parentNode.removeChild(obj);
      },
      insertAfter(newElement, targetElement) {
        const parent = targetElement.parentNode;
        if (parent.lastChild == targetElement) {
          parent.appendChild(newElement);
        } else {
          parent.insertBefore(newElement, targetElement.nextSibling);
        }
      },
      getStyle(ele, attr) {
        if (ele.currentStyle !== undefined) {
          return ele.currentStyle[attr];
        }
          return window.getComputedStyle(ele, null)[attr] ? window.getComputedStyle(ele, null)[attr] : ele.getAttribute(attr);
      },

    },

    F: {
      // 页面加载自执行函数
      // 判断数据类型
      typeOf(value) {
        if (value === null) {
          return 'null';
        }

        const type = typeof value;
        if (type === 'undefined' || type === 'string') {
          return type;
        }

        const typeString = toString.call(value);
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
              if (value.nodeType == 3) {
                return (/\S/).test(value.nodeValue) ? 'textnode' : 'whitespace';
              }
                return 'element';
            }
              return 'object';

          default:
            return 'unknow';
        }
      },
      // 依赖于jq的ajax方法(post)封装
      ajaxPostQuery(url, paramJsonStr, func, dataType) {
      dataType = dataType || "json";
        const sid = '123';
        $.ajax({
          type: "POST",
          url,
          data: `${paramJsonStr}&sid=${sid}`,
          headers: {
            accept: "*/*",
          },
          // contentType:"application/x-www-form-urlencoded",
          dataType,
          timeout: 0,
          error(XMLHttpRequest, textStatus, errorThrown) {
            alert("网络暂时不可用");
          },
          success(data) {
            let errorData;
            if (typeof data === "string") {
              try {
                errorData = eval(`(${data})`);

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
          },
        });
      },
      addLoadEvent(func) {
        const oldonload = window.onload;
        if (typeof window.onload !== 'function') {
          window.onload = func;
        } else {
          window.onload = function () {
            oldonload();
            func();
          };
        }
      },
      // 异步加载js,执行回调函数
      loadScript(url, callback) {
        const script = document.createElement('script');
        script.type = "text/javaScript";
        if (script.readyState) { // IE
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
      // 获取地址栏request中的参数
      GetQueryString(name) {
        const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
        const r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      },
      // 格式化金额
      // price = fmoney(price,2);
      fmoney(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = `${parseFloat((`${s}`).replace(/[^\d\.-]/g, "")).toFixed(n)}`;
        let l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        let t = "";
        for (let j = 0; j < l.length; j++) {
          t += l[j] + ((j + 1) % 3 == 0 && (j + 1) != l.length ? "," : "");
        }
        return `${t.split("").reverse().join("")}.${r}`;
      },
      // 格式化到小数点后两位(四舍五入)
      fomate20(x) {
        let f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        f = Math.round(x * 100) / 100;
        let s = f.toString();
        let rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },
      // 判断数组里是否有某个元素
      isIncluded(element, array) {
        for (let i = 0,
            len = array.length; i < len; i++) {
          if (array[i] == element) {
            return true;
          }
        }
        return false;
      },
      // 获取当前日期
      getDate() {
        const today = new Date();
        const fullYear = today.getFullYear();
        const month = (today.getMonth() + 1) < 10 ? (`0${today.getMonth() + 1}`) : (today.getMonth() + 1);
        const day = today.getDate() < 10 ? (`0${today.getDate()}`) : today.getDate();
        return `${fullYear}-${month}-${day}`;
      },


    },


  };
}(window, document));
