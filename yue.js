/*
 * @Author: yue
 * @Date:   2017-09-13 08:55:29
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-09-18 10:42:55
 */

'use strict';


//测试地址
var URL = "http://11.11.136.102:8080/SHXSKH";


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

function ajaxPostQuery(url, paramJsonStr, func, dataType) {
    var dataType = dataType || "json";
    var url = url || queryUrl;
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
function reload(id, callback) {
    $("#+'id'").html("");

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


//异步加载js,执行回调函数
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

function getImgBase64(obj, callback) {
    var that = this,
        dataimg = '',
        file = obj.files[0];
    if (!file) return;
    if (!/image\/\w+/.test(file.type)) {
        that.tipMes('请上传图片文件', 'error');
        return;
    }


    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        console.log('load')
        dataimg = this.result;
        typeof callback === 'function' && callback(dataimg);
    };
};

// 获取当前日期
function getDate() {
    var today = new Date();
    var fullYear = today.getFullYear();
    var month = (today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1);
    var day = today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate();
    return fullYear + '-' + month + '-' + day;
}
//以ajax方式获取数据  
function ajaxPostQuery(url, paramJsonStr, func, dataType) {
    var dataType = dataType || "json";
    var url = url || queryUrl;

    $.ajax({
        type: "POST",
        url: url,
        data: paramJsonStr,
        contentType: "application/x-www-form-urlencoded",
        dataType: dataType,
        success: func
    });
}

//获取request中的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}


function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.currentStyle[prop];
    }
}