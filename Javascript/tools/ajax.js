// 获取地址栏request中的参数
function GetQueryString (name) {

    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window
        .location
        .search
        .substr(1)
        .match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
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