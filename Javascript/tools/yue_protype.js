function $(str) {

    var char = str.charAt(0);

    if (char === "#") {
        return document.getElementById(str.slice(1));
    } else if (char === ".") {
        return document.getElementsByClassName(str.slice(1));
    }
    return document.getElementsByTagName(str)

}

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

//设置cookie
function setCookie(c_name, value, expiredays) {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null)
        ? ""
        : ";expires=" + exdate.toGMTString())
}

setCookie('zhangsan', 18, 1)

//获取
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document
            .cookie
            .indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document
                .cookie
                .indexOf(";", c_start)
            if (c_end == -1) 
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

//删除
function clearCookie(name) {
    setCookie(name, "", -1);
}

function ajaxPostQuery(url, paramJsonStr, func, dataType) {
    var dataType = dataType || "json";
    var url = url || queryUrl;
    var sid = '123'; //用户登录的sessionID
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
//获取地址栏request中的参数
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window
        .location
        .search
        .substr(1)
        .match(reg);
    if (r != null) 
        return unescape(r[2]);
    return null;
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

const appendHTML = function (el, html) {
    let divTemp = document.createElement("div"),
        nodes = null,
        // 文档片段，一次性append，提高性能

        fragment = document.createDocumentFragment();
    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (let i = 0, length = nodes.length; i < length; i += 1) {
        fragment.appendChild(nodes[i].cloneNode(true));
    }
    // 全部都是一样的，除了下面这个 this → el
    el.appendChild(fragment);
    nodes = null;
    fragment = null;
};

const prependHTML = function (el, html) {
    let divTemp = document.createElement("div"),
        nodes = null,
        fragment = document.createDocumentFragment();

    divTemp.innerHTML = html;
    nodes = divTemp.childNodes;
    for (let i = 0, length = nodes.length; i < length; i += 1) {
        fragment.appendChild(nodes[i].cloneNode(true));
    }
    // 插入到容器的前面 - 差异所在
    el.insertBefore(fragment, el.firstChild);
    // 内存回收？
    nodes = null;
    fragment = null;
};

function rmoney(s) {
    return parseFloat(s.replace(/[^\d\.-]/g, ""));
}
//判断一个字符串是否被包含在另一字符串
function contains(str, value) {
    return str.indexOf(value) > -1
        ? true
        : false;
};
// 将一组值转换为数组
function arrayOf() {
    return []
        .slice
        .call(arguments);
};
//去除数组中假值元素，比如undefined,null,0,"",NaN都是假值
function compact(arr) {
    var index = -1,
        resIndex = -1,
        result = [],
        len = arr
            ? arr.length
            : 0;
    while (++index < len) {
        var value = arr[index];
        if (value) {
            result[++resIndex] = value;
        }
    }
    return result;
};

// Object 在obj中是否有key

function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
}
//此对象包含函数与对象
function isObject(obj) {

    var type = typeof(obj);
    return type === 'function' || type === 'object' && !!obj;

}

// 获取所有对象的键(属性名)放入到数组中

function keys(obj) {
    var nativeKeys = Object.keys;
    if (!isObject(obj)) 
        return [];
    if (nativeKeys) {
        return nativeKeys(obj)
    }
    var keys = [];
    for (var key in obj) {
        if (has(obj, key)) 
            keys.push(key);
        }
    return keys;

}

//  将一个对象的value放入到数组中

function values(obj) {
    var keys1 = keys(obj),
        length = keys1.length,
        values = Array(length);

    for (var i = 0; i < length; i++) {
        values[i] = obj[keys1[i]];
    }

    return values;

}
// 把一个对象转变为一个[key, value]形式的数组

function pairs(obj) {
    var keys2 = keys(obj);
    var length = keys2.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
        pairs = [
            keys2[i],
            obj[keys2[i]]
        ];
    }

    return pairs;
}
// Array isArray

function isArray(arr) {
    return Object
        .prototype
        .toString
        .call(arr) === '[object Array]'
}

// 是否为类数组对象

property = function (key) {
    return function (obj) {
        return obj === null
            ? void 0
            : obj[key];
    }
}
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
function isArrayLike(collection) {
    var length = getLength(collection);

    return typeof length == 'number' && length > 0 && length <= MAX_ARRAY_INDEX;
}

// 判断数组里是否有某个元素

function isIncluded(element, array) {
    for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] == element) {
            return true;
        }
    }
    return false;
}

// 是否排序

function defaultComparator(a, b) {
    return a - b
}

function isorted(array, comparator) {

    comparator = comparator || defaultComparator;
    for (var i = 1; i < array.length; ++i) {
        if (comparator(array[i - 1], array[i]) > 0) 
            return false
    }

    return true
}
