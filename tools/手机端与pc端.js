//兼容IE8
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/){
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++){
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}

//获取url后面参数的方法
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
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

function getCookie(name) {
    //读取COOKIE
    var reg = new RegExp("(^| )" + name + "(?:=([^;]*))?(;|$)"),
        val = document.cookie.match(reg);
    return val ? (val[2] ? unescape(val[2]) : "") : null;
}

function setCookie(name, value, pexpire, ppath, pdomain, psecure) {
    //写入COOKIES
    var exp = new Date(),
        expires = arguments[2] || null,
        path = arguments[3] || "/",
        domain = arguments[4] || null,
        secure = arguments[5] || false;
    expires ? exp.setMinutes(exp.getMinutes() + parseInt(expires)) : "";
    document.cookie = name + '=' + escape(value) + (expires ? ';expires=' + exp.toGMTString() : '') + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
}

function delCookie(name, path, domain, secure) {
    //删除cookie
    var value = getCookie(name);
    if (value !== null) {
        var exp = new Date();
        exp.setMinutes(exp.getMinutes() - 1000);
        path = path || "/";
        document.cookie = name + '=;expires=' + exp.toGMTString() + (path ? ';path=' + path : '') + (domain ? ';domain=' + domain : '') + (secure ? ';secure' : '');
    }
}

function setQuery(json, url) {
    var hash = url ? url.match(/#.*/) && url.match(/#.*/)[0] || "" : location.hash,
        search = url ? url.replace(/#.*/, "").match(/\?.*/) && url.replace(/#.*/, "").match(/\?.*/)[0] || "" : location.search,
        path = url ? url.replace(/#.*/, "").replace(/\?.*/, "") : location.protocol + "//" + location.host + location.pathname;
    for (var i in json) {
        var query = i + "=" + json[i],
            oldValue = getQuery(i, search);
        if (oldValue) {
            search = search.replace(i + "=" + oldValue, i + "=" + json[i]);
        } else {
            search = (search.length > 0) ? search + "&" + query : "?" + query;
        }
    }
    return path + search + hash;
}

// 清除缓存记录
function removeStorage(key) {
    try {
        window.localStorage.removeItem(key);
    } catch (e) {
        delCookie(key);
    }
}
function saveStorage(key, value, isJson) {
    try {
        window.localStorage.setItem(key, isJson ? JSON.stringify(value) : value);
    } catch (e) {
        setCookie(key, isJson ? JSON.stringify(value) : value);
    }
}
function getStorage(key, jsJson) {
    try {
        if (jsJson) {
            return JSON.parse(window.localStorage.getItem(key));
        } else {
            return window.localStorage.getItem(key);
        }
    } catch (e) {
        if (jsJson) {
            return JSON.parse(getCookie(key));
        } else {
            return getCookie(key);
        }
    }
}

var tplHTMLCache = {};
function formatJson(str, data) {
    /* 模板替换,str:模板id或者内容，data:数据内容
    \W：匹配任何非单词字符。等价于 '[^A-Za-z0-9_]'。
    如果是id,并且cache中有值，直接返回，否则获取innerHTML，再次解析；
    如果不是id，解析并存入cache
 */
    var fn = !/\W/.test(str) ?
        tplHTMLCache[str] = tplHTMLCache[str] || formatJson(document.getElementById(str).innerHTML) :
        new Function("obj",
            "var p=[],print=function(){p.push.apply(p,arguments);};" +
            "with(obj){p.push('" + str
            .replace(/[\r\t\n]/g, " ")
            .split("<<").join("\t")
            .replace(/((^|>>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)>>/g, "',$1,'")
            .split("\t").join("');")
            .split(">>").join("p.push('")
            .split("\r").join("\\'") + "');}return p.join('');");
    return data ? fn(data) : fn;
}

function signParam(obj){
    var arr = [];
    for(key in obj){
        arr.push(key);
    };
    arr.sort();
    var objSign = '';
    for(var i = 0;i < arr.length;i++){
        objSign += arr[i] + '=' + obj[arr[i]] + '&'
    }
    return objSign;
}

var nowregion = getQuery("region") || '';
var nowlanguage = "zh-CN";
if(nowregion){
    nowregion = nowregion.toLocaleLowerCase();
    if(nowregion == "cn"){
        nowlanguage = "zh-CN";
    }else if(nowregion == "tw" || nowregion == "hk" || nowregion == "mo"){
        nowlanguage = "zh-TW";
    }else{
        nowlanguage = "en-US";
    }
}

var passwordReg = /^[A-Za-z0-9]{6,16}$/;
var nameReg = /^[a-zA-Z\u4e00-\u9fa5]{2,6}$/;
var mobileReg = /^1[3|4|5|7|8]\d{9}$/;
var emailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;
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

//用js根据客户端输出对应样式
function loadJS() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
        script.src = '../libs/placeholder.js';
    }
    document.getElementsByTagName("body")[0].appendChild(script);
}
loadJS();


function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

var isMobile;
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
    isMobile = true;
} else {
    isMobile = false;
}

//数组原型扩展remove方法
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//ios查找手机header高度适配
// var TestJSObject = {
//     getStatusBarHeight:function(){
//         var StatusBarHeight = oc_getStatusBarHeight();
//     }
// };
// TestJSObject.getStatusBarHeight();

var needStatusBarHeight
try{
    var StatusBarHeight = oc_getStatusBarHeight();
    if(location.pathname != '/search/login.html'){
        needStatusBarHeight = true;
    }else{
        needStatusBarHeight = false;
    }
}catch(err){
    needStatusBarHeight = false;
}
// var needStatusBarHeight = true;
// var StatusBarHeight = 60;
if(needStatusBarHeight){
    var node = document.createElement("div");
    node.style.width = '100%';
    node.style.backgroundColor = '#eeeeee';
    node.style.height = StatusBarHeight/3+'px';
    document.body.insertBefore(node, document.body.firstChild);
}
window.lang={};
//加载语言
document.write("<script src='./language/"+nowlanguage+".js?r=20171214'><\/script>");

function transFn(lang){
    var transdom = $('[translang]');
    for(var i = 0;i < transdom.length; i++){
        var item = transdom.eq(i);
        item.html(lang[item.attr('translang')]||item.attr('translang'));
    }
    var transvalue = $('[transvalue]');
    for(var i = 0;i < transvalue.length; i++){
        var item = transvalue.eq(i);
        item.val(lang[item.attr('transvalue')]||item.attr('transvalue'));
    }
    var transplaceholder = $('[transplaceholder]');
    for(var i = 0;i < transplaceholder.length; i++){
        var item = transplaceholder.eq(i);
        item.attr('placeholder',lang[item.attr('transplaceholder')]||item.attr('transplaceholder'));
    }
}