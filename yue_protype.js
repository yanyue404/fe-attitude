// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
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
        format = format.replace(RegExp.$1, (`${this.getFullYear()}`)
            .substr(4 - RegExp.$1.length));
    }

    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] :
                (`00${o[k]}`).substr((`${o[k]}`).length));
        }
    }
    return format;
};


const appendHTML = function (el, html) {
    let divTemp = document.createElement("div"),
        nodes = null,        // 文档片段，一次性append，提高性能

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
