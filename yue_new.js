(function (w, d) {
  if (!window.yue) {
    window.yue = {};
  }

  yue = {
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
      getStyle: function (ele, attr) {

        if (ele.currentStyle !== undefined) {
          return ele.currentStyle[attr];
        } else {
          return window.getComputedStyle(ele, null)[attr] ? window.getComputedStyle(ele, null)[attr] : ele.getAttribute(
            attr);
        }
      }
    },
    Ajax: function (obj) {
      if (!obj.url) {
        return false;
      };
      var methord = obj.type || "GET";
      var async = obj.async || true;
      var dataType = obj.dataType;
      var XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
      XHR.open(method, obj.url, async);
      XHR.setRequestHeader('If-Modified-Since', 'Thu,06 Apr 2006 00:00: 00 GMT');
      XHR.send(null);
      if (obj.sendBefore) {
        obj.sendBefore();
      }
      XHR.onreadystatechange = function () {
        if (XHR.readyState == 4 && (XHR.status >= 200 && XHR.status < 300 || XHR.status == 304)) {
          if (obj.success) {
            if (dataType && dataType.toLocaleLowerCase() === "json") {
              obj.success.call(XHR, eval("(" + XHR.responsetext + ")"));
            } else if (dataType && dataType.toLocaleLowerCase() === "xml") {
              obj.success.call(XHR, XHR.responseXML);
            } else {
              obj.success.call(XHR, XHR.responseTest);
            }
          }
          if (obj.complete) {
            obj.complete();
          }
        } else {
          if (obj.complete) {
            obj.complete();
          }
        }


      }
    },
    F: {
      //格式化金额
      //price = fmoney(price,2);
      fmoney: function (s, n) {

        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        t = "";
        for (j = 0; j < l.length; j++) {
          t += l[j] + ((j + 1) % 3 == 0 && (j + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
      }
    }
  };
})(window, document)