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
                    return (/\S/).test(value.nodeValue)
                        ? 'textnode'
                        : 'whitespace';
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

//传递一个范围，返回该范围的随机数
function getRand(min, max) {

    if (max < min) {
        var n = max;
        max = min;
        min = n;
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//addEvent(btn1,"click",fn);//调用添加 removeEvent(btn1,"click",fn);//调用移除

function addEvent(element, eventName, Listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, Listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, Listener);
    } else {
        element["on" + eventName] = Listener;
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

//异步加载js执行回调函数
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
    document
        .getElementsByTagName('head')[0]
        .appendChild(script);
}

// 获取当前日期 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2
// 个占位符， 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子： (new
// Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
// Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.formate = function (format) {
    const o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        S: this.getMilliseconds(),
        // millisecond
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : (`00${o[k]}`).substr((`${o[k]}`).length));
        }
    }
    return format;
};

function fmoney(s, n) { //s:传入的float数字 ，n:希望返回小数点几位
    n = n > 0 && n <= 20
        ? n
        : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s
            .split(".")[0]
            .split("")
            .reverse(),
        r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length
            ? ","
            : "");
    }
    return
    t
        .split("")
        .reverse()
        .join("") + "." + r;
}
function
rmoney(s) {
    return
    parseFloat(s.replace(/[^\d\.-]/g, ""));
}
//判断一个字符串是否被包含在另一字符串
function
contains(str, value) {
    return
    str.indexOf(value) > -1
        ? true
        : false;
};
