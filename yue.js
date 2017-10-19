/*
 * @Author: yue
 * @Date:   2017-09-13 08:55:29
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-18 10:42:55
 */

'use strict';


//测试地址
var URL = "http://11.11.136.102:8080/SHXSKH";
var PICURL = "http://11.11.136.102:8080";

var offset = "1"; //从第几条开始   
var limit = "15"; //每页显示行数
var pageNo = "1"; //页数

//判断数据类型
function typeOf(value) {
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
                } else {
                    return 'element';
                }
            } else {
                return 'object';
            }
        default:
            return 'unknow';
    }
}
function fomate(obj) {
      if (typeof obj == 'object' && obj.constructor == Array) {
        alert('数组')
      }
      if (typeof obj == 'string' && obj.constructor == String) {
        alert('string')
      } else if (typeof obj == "object" && obj.constructor == Object) {
        alert('对象')
      }
      if (typeof obj == 'number' && obj.constructor == Number) {
        alert('数值类型')
      } else if (typeof obj == "object" && obj.constructor == Date) {
        alert('时间类型')
      } else if (typeof obj == "function" && obj.constructor == Function) {
        alert('函数类型')
      }
    }

function ajaxPostQuery(url, paramJsonStr, func, dataType) {
    var dataType = dataType || "json";
    var url = url || queryUrl;
    var sid = appcan.locStorage.getVal("sid");
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
            appcan.window.alert("提示", "网络暂时不可用", "确定");
        },
        success: function (data) {
            var errorData;
            if (typeof data == "string") {
                try {
                    errorData = eval("(" + data + ")");

                    if (errorData.error == "-1") {
                        //alert(url);
                        relogin(url);
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

function relogin(url2) {
    var userName = appcan.locStorage.getVal("username");
    var password = appcan.locStorage.getVal("password");

    if ((userName == null || userName == "") && (password == null || password == "")) {
        //alert(userName);
        appcan.window.open("login", "../userpage/login.html", 5);

        //return;
    } else {
        $.ajax({
            type: "POST", //用POST方式传输
            dataType: "text",
            headers: {
                accept: "*/*"
            },
            url: URL + '/comm/user/login',
            data: "loginName=" + userName + "&loginPassword=" + password,
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success: function (data) {
                if (typeof data == "string") {
                    data = eval("(" + data + ")");
                }
                var sid = data.sid;
                var cusId = data.cusId;
                if (data.result == 0) {
                    appcan.locStorage.setVal("username", userName);
                    appcan.locStorage.setVal("password", password);
                    appcan.locStorage.setVal("sid", sid);
                    appcan.locStorage.setVal("cusId", cusId);
                    ajaxPostQuery(url2, paramJsonStr, func, dataType);
                } else {
                    appcan.window.open("login", "../userpage/login.html", 5);
                }
            }
        })
    }
}
//页面加载自执行函数
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
// 对Date的扩展，将 Date 转化为指定格式的String   
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
// 例子：   
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.formate = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


//重新加载页面,在ajax回调函数执行后调用
function reload() {
    $("#listdetail").html("");
    getOrderCancel();
}

function switchChoose(id) {
    switch (id) {
        case "1":
            $("#contentInfo")[0].innerHTML = content6;
            break;
        case "2":
            $("#contentInfo")[0].innerHTML = content7;
            break;
        case "3":
            $("#contentInfo")[0].innerHTML = content8;
            break;

        default:
            $("#contentInfo")[0].innerHTML = content;

    }
}



function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        newClassName = element.className;
        newClass += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

function moveElement(ElementID, final_x, final_y, interval) {
    if (!document.getElementById) return false;
    if (!document.getElementById(ElementID)) return false;
    var elem = document.getElementById(ElementID);
    if (elem.movement) {
        clearInterval(elem.movement);
    }

    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if (xpos == final_x && ypos == final_y) {
        return false;
    }
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10);
        xpos = xpos + dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10);
        xpos = xpos - dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10);
        ypos = ypos + dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y) / 10);
        ypos = ypos - dist;
    }

    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';

    var repeat = "moveElement('" + ElementID + "'," + final_x + "," + final_y + "," + interval + ")";

    elem.movement = setTimeout(repeat, interval);

}

// box必须为定位元素  moveElement('box','600','500','30')
//处理查询字符串的参数,确保http://www.baidu.com/?redir=http://www.someherdomain.com?a=b&c=d

function addQueryStringArg(url, name, value) {
    if (url.indexOf("?") == -1) {
        url += "?";
    } else {
        url += "&";
    }
    url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
}

//地址栏参数
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 调用方法
//alert(GetQueryString("参数名1"));


//导入script链接,执行回调函数
function loadScript(url, callback) {
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
}
//格式化到小数点后两位(四舍五入)
function fomate20(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
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
}

/**
 * ydui.util
 */
!function (window) {
    "use strict";

    var util = window.YDUI.util = window.YDUI.util || {},
        doc = window.document;

    /**
     * 日期格式化
     * @param format 日期格式 {%d天}{%h时}{%m分}{%s秒}{%f毫秒}
     * @param time 单位 毫秒
     * @returns {string}
     */
    util.timestampTotime = function (format, time) {
        var t = {},
            floor = Math.floor;

        t.f = time % 1000;
        time = floor(time / 1000);
        t.s = time % 60;
        time = floor(time / 60);
        t.m = time % 60;
        time = floor(time / 60);
        t.h = time % 24;
        t.d = floor(time / 24);

        var ment = function (a) {
            if (a <= 0) {
                return '';
            }
            return '$1' + (a < 10 ? '0' + a : a) + '$2';
        };

        format = format.replace(/\{([^{]*?)%d(.*?)\}/g, ment(t.d));
        format = format.replace(/\{([^{]*?)%h(.*?)\}/g, ment(t.h));
        format = format.replace(/\{([^{]*?)%m(.*?)\}/g, ment(t.m));
        format = format.replace(/\{([^{]*?)%s(.*?)\}/g, ment(t.s));
        format = format.replace(/\{([^{]*?)%f(.*?)\}/g, ment(t.f));

        return format;
    };

    /**
     * js倒计时
     * @param format 时间格式 {%d}天{%h}时{%m}分{%s}秒{%f}毫秒
     * @param time 结束时间时间戳 毫秒
     * @param speed 速度
     * @param callback ret 倒计时结束回调函数 ret 时间字符 ；ret == '' 则倒计时结束
     * DEMO: YDUI.util.countdown('{%d天}{%h时}{%m分}{%s秒}{%f毫秒}', Date.parse(new Date()) + 60000, 1000, function(ret){ console.log(ret); });
     */
    util.countdown = function (format, time, speed, callback) {
        var that = this;
        var timer = setInterval(function () {
            var l_time = time - new Date().getTime();
            if (l_time > 0) {
                callback(that.timestampTotime(format, l_time));
            } else {
                clearInterval(timer);
                typeof callback == 'function' && callback('');
            }
        }, speed);
    };

    /**
     * js 加减乘除
     * @param arg1 数值1
     * @param op 操作符string 【+ - * /】
     * @param arg2 数值2
     * @returns {Object} arg1 与 arg2运算的精确结果
     */
    util.calc = function (arg1, op, arg2) {
        var ra = 1, rb = 1, m;

        try {
            ra = arg1.toString().split('.')[1].length;
        } catch (e) {
        }
        try {
            rb = arg2.toString().split('.')[1].length;
        } catch (e) {
        }
        m = Math.pow(10, Math.max(ra, rb));

        switch (op) {
            case '+':
            case '-':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                break;
            case '*':
                ra = Math.pow(10, ra);
                rb = Math.pow(10, rb);
                m = ra * rb;
                arg1 = Math.round(arg1 * ra);
                arg2 = Math.round(arg2 * rb);
                break;
            case '/':
                arg1 = Math.round(arg1 * m);
                arg2 = Math.round(arg2 * m);
                m = 1;
                break;
        }
        try {
            var result = eval('(' + '(' + arg1 + ')' + op + '(' + arg2 + ')' + ')/' + m);
        } catch (e) {
        }
        return result;
    };

    /**
     * 读取图片文件 并返回图片的DataUrl
     * @param obj
     * @param callback
     */
    util.getImgBase64 = function (obj, callback) {
        var that = this, dataimg = '', file = obj.files[0];
        if (!file)return;
        if (!/image\/\w+/.test(file.type)) {
            that.tipMes('请上传图片文件', 'error');
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            dataimg = this.result;
            typeof callback === 'function' && callback(dataimg);
        };
    };

    /**
     * 获取地址栏参数
     * @param name
     * @returns {*}
     */
    util.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            r = window.location.search.substr(1).match(reg),
            qs = '';
        if (r != null)qs = decodeURIComponent(r[2]);
        return qs;
    };

    /**
     * Cookie
     * @type {{get, set}}
     */
    util.cookie = function () {
        return {
            /**
             * 获取 Cookie
             * @param  {String} name
             * @return {String}
             */
            get: function (name) {
                var m = doc.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
                return (m && m[1]) ? decodeURIComponent(m[1]) : '';
            },
            /**
             * 设置 Cookie
             * @param {String}  name 名称
             * @param {String}  val 值
             * @param {Number} expires 单位（秒）
             * @param {String}  domain 域
             * @param {String}  path 所在的目录
             * @param {Boolean} secure 跨协议传递
             */
            set: function (name, val, expires, domain, path, secure) {
                var text = String(encodeURIComponent(val)),
                    date = expires;

                // 从当前时间开始，多少小时后过期
                if (typeof date === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + expires * 1000);
                }

                date instanceof Date && (text += '; expires=' + date.toUTCString());

                !!domain && (text += '; domain=' + domain);

                text += '; path=' + (path || '/');

                secure && (text += '; secure');

                doc.cookie = name + '=' + text;
            }
        }
    }();

}(window);
