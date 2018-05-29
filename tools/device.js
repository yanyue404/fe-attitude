var browser = {
    versions: function () {
      var u = navigator.userAgent, app = navigator.appVersion;
      var rSafari = /.*version\/([\w.]+).*(safari).*/;// safari
      return { //移动终端浏览器版本信息
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        // safari: u//.indexOf('Safari') > -1
      };
    }(),
  }

function getBrowser() {
  var t = navigator.userAgent.toLowerCase();
  if (t.indexOf("android") >= 0)
      return "android";
  if (t.indexOf("iphone") >= 0)
      return "iphone";
  if (t.match(/.*mac.*os/gi))
      return "mac";
  if (t.indexOf("chrome") >= 0)
      return "chrome";
  if (t.indexOf("firefox") >= 0)
      return "firefox";
  if (t.indexOf("msie") >= 0) {
      var e = t.match(/msie\s\d+/)[0].match(/\d+/)[0] || t.match(/trident\s?\d+/)[0];
      return t.match(/.*msie.*10\.0/gi) ? "IE10" : 9 > e ? "IE8-" : "IE"
  }
  return t.indexOf("Safari") >= 0 ? "safari" : t.indexOf("Camino") >= 0 ? "camino" : t.indexOf("Gecko/") >= 0 ? "gecko" : !1
}


 function browser() {
  var e = navigator.userAgent.toLowerCase();
  if (e.indexOf("android") >= 0)
      return e.indexOf("ucbrowser") >= 0 ? "android-uc" : "android";
  if (e.indexOf("iphone") >= 0)
      return "iphone";
  if (e.indexOf("chrome") >= 0)
      return "chrome";
  if (e.indexOf("firefox") >= 0)
      return "firefox";
  if (e.indexOf("msie") >= 0) {
      var i = e.match(/msie\s\d+/)[0].match(/\d+/)[0] || e.match(/trident\s?\d+/)[0];
      return e.match(/.*msie.*10\.0/gi) ? "IE10" : 9 > i ? "IE8-" : "IE"
  }
  if (e.indexOf("trident") >= 0)
      return "IE11";
  if (e.indexOf("Safari") >= 0)
      return "safari";
  if (e.indexOf("Camino") >= 0)
      return "camino";
  if (e.indexOf("Gecko/") >= 0)
      return "gecko";
  if (e.match(/.*mac.*os/gi))
      return "mac";
  if (!(e.match(/msie\s\d+/) && e.match(/msie\s\d+/)[0] || e.match(/trident\s?\d+/) && e.match(/trident\s?\d+/)[0]))
      return !1;
  var i = e.match(/msie\s\d+/)[0].match(/\d+/)[0] || e.match(/trident\s?\d+/)[0];
  return 9 > i ? (t.location.href = "http://www.baidu.com",
  !1) : void 0
}

var isMobile;
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
    isMobile = true;
} else {
    isMobile = false;
}

var Browser = (function() {
    var userAgent = navigator.userAgent.toLowerCase();
    return {
        get: function() {
            if (userAgent.indexOf("msie") > 0) {
                return "msie"
            }
            if (userAgent.indexOf("firefox") > 0) {
                return "firefox"
            }
            if (userAgent.indexOf("chrome") > 0) {
                return "chrome"
            }
        }
    }
}
)();
var OS = (function() {
    var userAgent = navigator.userAgent.toLowerCase();
    return {
        get: function() {
            if (userAgent.indexOf("mac os") > 0) {
                return "mac"
            }
            if (userAgent.indexOf("win") > 0) {
                return "win"
            }
        }
    }
}
)();

//用js根据客户端输出对应样式
function loadCSS(url) {
    if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        //公共头部
        document.getElementById('header').innerHTML = '<div class="w960"><ul class="menu_sec"><li><a href="http://www.oppo.com">OPPO官网</a></li> ' +
            '<li><a href="http://www.oppo.cn/">OPPO社区</a></li><li><a href="http://www.coloros.com/">ColorOS</a></li><div class="clear"></div></ul>' +
            '<ul class="account_area"><li class="hasLogin"><a class="quit_link"></a></li></ul><div class="clear"></div></div>';
        //公共底部
        //document.getElementById('footer').innerText = '©2005-2017 东莞市讯怡电子科技有限公司 版权所有 粤ICP备14012291';
    }
}
loadCSS();



var codeFlag = true;
var baseUrl = config.baseUrl;
var currentUrl = location.href;
if (currentUrl.indexOf('test') > -1) {
    baseUrl = baseUrl.replace('https:','');
}
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
    //手机端共用js
    var common = {
        //ajax
        ajax: function (url, data, callback, flag){
            var self = this;
            var isloading = arguments[3] || false;
            if(isloading && document.getElementsByClassName('checkLoading').length == 0)self.addLoading();
            //url:ajax url    string
            //data:请求参数    json
            //callback:回调     function
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('post', baseUrl + url, true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200) {
                        if(isloading)self.removeLoading();
                        var response = xmlhttp.responseText;
                        callback(JSON.parse(response));
                        try {
                            var res = JSON.parse(response);
                        } catch (err) {
                            var res = response;
                        }
                        try {
                            if (res.error.code == '12410' || res.error.code == '12420') {
                                self.toast(res.error.message);
                            }
                        } catch (err) {
                        }
                        try {
                            if (res.error.code == 'InvalidArgument' && res.error.argument == 'processToken') {
                                self.toast(res.error.message);
                            }
                        } catch (err) {
                        }
                    } else {
                        if(isloading)self.removeLoading();
                        self.toast('系统繁忙，请稍后再试');
                    }
                }

            };
            xmlhttp.setRequestHeader('Accept-language', nowlanguage);
            xmlhttp.send(JSON.stringify(data));
        },
        //载入验证loading框
        addLoading:function(){
            var div = document.createElement("div");
            document.body.appendChild(div);
            div.id = 'loading';
            div.innerHTML = "<div class='checkLoading'><div><p>正在加载...</p><span class='swing1'></span><span class='swing2'></span><span class='swing3'></span></div></div><div class='checkBackfround'></div>";
        },
        //移除验证loading框
        removeLoading:function(){
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('loading'));
        },
        //重新获取倒计时
        sendCode: function (classname) {
            var self = this;
            var num = 59;
            if (codeFlag) {
                codeFlag = false;
                var code = setInterval(function () {
                    document.getElementsByClassName(classname)[0].innerText = num-- + 's';
                }, 1000);
                setTimeout(function () {
                    clearInterval(code);
                    codeFlag = true;
                    document.getElementsByClassName(classname)[0].innerText = lang['resetpwd_require'];
                }, 60000);
            }
        },
        //toast提示
        toast: function (msg) {
            setTimeout(function () {
                var div = document.createElement('div');
                document.body.appendChild(div);
                div.id = 'toast';
                div.innerHTML = '<div class="toast">' + msg + '</div>';
                setTimeout(function () {
                    document.body.removeChild(div);
                }, 2000)
            }, 1000)

        },
        setData: function (key, value) {                                          //本地存储数据
            var self = this;
            if (typeof value == 'object') {
                localStorage.setItem(key, JSON.stringify(value));
            } else {
                localStorage.setItem(key, value);
            }
        },
        getData: function (key) {                                                 //本地读取数据
            var self = this;
            var data = localStorage.getItem(key);
            return data;
        },
        //载入验证loading框
        addLoading: function (index) {         // 0'正在加载...' 1'正在验证...' 2'正在保存...' 3'正在绑定...'
            var div = document.createElement("div");
            document.body.appendChild(div);
            div.id = 'loading';
            div.innerHTML = "<div class='checkLoading'><div><p>正在加载...</p><span class='swing1'></span><span class='swing2'></span><span class='swing3'></span></div></div><div class='checkBackfround'></div>";
        },
        //移除验证loading框
        removeLoading: function () {
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('loading'));
        }

    };
} else {
    //pc端共用js
    //var browser = navigator.appName;
    //var b_version = navigator.appVersion;
    //var version = b_version.split(";");   
    //if(version[1]){
    //    var trim_Version = version[1].replace(/[ ]/g, "");
    //}
    var common = {
        //ajax
        ajax: function (url, data, successCallBack) {                             //ajax
            var self = this;
            var _data = JSON.stringify(data);
            jQuery.support.cors = true;
            if (window.XDomainRequest) {
                xdr = new XDomainRequest();
                if (xdr) {
                    xdr.onload = function load() {
                        //alert("XDR onload");
                        //alert(xdr.responseText);
                        if (typeof xdr.responseText == 'string') {
                            var res = JSON.parse(xdr.responseText);
                        } else {
                            var res = xdr.responseText
                        }
                        successCallBack && successCallBack(res);
                    };

                    var requesturl = baseUrl + url;
                    requesturl = setQuery({'language':nowlanguage},requesturl);
                    var requestMethod = "POST";
                    if(requesturl.indexOf('country-calling-codes') > -1){
                        //兼容获取国家列表接口，需要用GET
                        requestMethod = "GET";
                    }
                    xdr.open(requestMethod, requesturl);
                    xdr.send(JSON.stringify(data));
                } else {

                }
            } else {
                $.ajax({
                    url: baseUrl + url,
                    data: _data,
                    type: 'post',
                    contentType: "application/json; charset=utf-8",   //内容类型
                    dataType: 'json',
                    beforeSend: function(request) {
                        request.setRequestHeader("Accept-language", nowlanguage);
                    },
                    success: function (res) {
                        // 报文有时候会返回string格式，需要对象化
                        if (typeof res == 'string') {
                            res = JSON.parse(res);
                        }
                        successCallBack && successCallBack(res);
                    },
                    complete: function () {

                    },
                    error: function (e) {
                    }
                });
            }

        },
        //重新获取倒计时
        sendCode: function (classname) {
            var self = this;
            var num = 59;
            if (codeFlag) {
                codeFlag = false;
                var code = setInterval(function () {
                    $("." + classname).text(num-- + 's');
                }, 1000);
                setTimeout(function () {
                    clearInterval(code);
                    codeFlag = true;
                    $("." + classname).text(lang['resetpwd_require']);
                }, 60000);
            }
        },
        //toast提示
        toast: function (msg) {

        },
        setData: function (key, value) {                                          //本地存储数据
            var self = this;
            /* 因为localStorage.setItem无法正常存储object类型的数据,
             如果想要存储objcet,需要先转化为字符串*/
            if (typeof value == 'object') {
                sessionStorage.setItem(key, JSON.stringify(value));
            } else {
                sessionStorage.setItem(key, value);
            }
        },

        /*
         localStorage.getItem
         */
        getData: function (key) {                                                 //本地读取数据
            var self = this;
            var data = sessionStorage.getItem(key);
            return data;
        },
        //载入验证loading框
        addLoading: function (index) {         // 0'正在加载...' 1'正在验证...' 2'正在保存...' 3'正在绑定...'
            var div = document.createElement("div");
            document.body.appendChild(div);
            div.id = 'loading';
            div.innerHTML = "<div class='checkLoading'><div><p>正在加载...</p><span class='swing1'></span><span class='swing2'></span><span class='swing3'></span></div></div><div class='checkBackfround'></div>";
        },
        //移除验证loading框
        removeLoading: function () {
            document.getElementsByTagName('body')[0].removeChild(document.getElementById('loading'));
        }
    };
}





