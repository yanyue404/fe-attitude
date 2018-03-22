function loadCss(t) {
    var e = document.createElement("link");
    e.type = "text/css",
    e.rel = "stylesheet",
    e.href = t,
    document.getElementsByTagName("head")[0].appendChild(e)
}
function seriesLoadScripts(t, e) {
    if ("object" != typeof t)
        var t = [t];
    var i = document.getElementsByTagName("head").item(0) || document.documentElement
      , n = new Array
      , s = t.length - 1
      , a = function(o) {
        n[o] = document.createElement("script"),
        n[o].setAttribute("type", "text/javascript"),
        n[o].onload = n[o].onreadystatechange = function() {
            this.onload = this.onreadystatechange = null,
            this.parentNode.removeChild(this),
            o != s ? a(o + 1) : "function" == typeof e && e()
        }
        ,
        n[o].setAttribute("src", t[o]),
        i.appendChild(n[o])
    };
    a(0)
}
function isVisiable(t) {
    if (t) {
        var e = t.getBoundingClientRect();
        return e.top > 0 && window.innerHeight - e.top > 0 || e.top <= 0 && e.bottom >= 0
    }
}
function isEmptyObject(t) {
    var e;
    for (e in t)
        return !1;
    return !0
}
function getQueryString(t) {
    var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)")
      , i = window.location.search.substr(1).match(e);
    return null != i ? unescape(i[2]) : null
}
function localStorageInstance(t, e) {
    try {
        if (window.localStorage)
            if ("" === e)
                window.localStorage.removeItem(t);
            else {
                if (0 != e && !e)
                    return window.localStorage[t];
                window.localStorage[t] = e
            }
        else if ("" === e)
            cookie.clearcookie(t);
        else {
            if (0 != e && !e)
                return cookie.get(t);
            cookie.set(t, e, 1e4)
        }
    } catch (t) {}
}
function getUuid(t, e) {
    var i, n = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), s = [];
    if (e = e || n.length,
    t)
        for (i = 0; i < t; i++)
            s[i] = n[0 | Math.random() * e];
    else {
        var a;
        for (s[8] = s[13] = s[18] = s[23] = "-",
        s[14] = "4",
        i = 0; i < 36; i++)
            s[i] || (a = 0 | 16 * Math.random(),
            s[i] = n[19 == i ? 3 & a | 8 : a])
    }
    return s.join("")
}
function filterXss(t) {
    return t ? t.replace(/\</g, "&lt;").replace(/\>/g, "&gt;") : t
}
function bindObjOutsiteClick(t, e, i) {
    var n = "doc_" + (new Date).getTime()
      , s = "doc_" + (new Date).getTime() + 1;
    t.attr("class") && t.attr("class", t.attr("class").replace(/doc_(\d+)/g, "")),
    t.addClass(n),
    e && (e.attr("class", e.attr("class").replace(/doc_(\d+)/g, "")),
    e.addClass(s)),
    setTimeout(function() {
        $(document).bind("click", function(e) {
            $(e.target).hasClass(s) || $(e.target).parents(".showErrorBox").length || 0 == $(e.target).parents("." + n).length && (t.hide(),
            "function" == typeof i && i(),
            $(document).unbind("click"))
        })
    }, 200)
}
function unbindObjOutsiteClick(t, e) {
    "function" == typeof e && e(),
    $(document).unbind("click")
}
function placeholderSupport() {
    return "placeholder"in document.createElement("input")
}
function EventManger() {
    var t = {};
    this.subscribe = function(e, i) {
        void 0 === t[e] && (t[e] = []),
        t[e].push({
            context: this,
            callback: i
        })
    }
    ,
    this.publish = function(e) {
        if (void 0 === t[e])
            return !1;
        for (var i = Array.prototype.slice.call(arguments, 1), n = 0, s = t[e].length; n < s; n++) {
            var a = t[e][n];
            a.callback.apply(a.context, i)
        }
    }
}
var DEBUG = !0, UA = window.navigator.userAgent, isIE, isWebkit, isZpdesk, ipcRenderer, isTouch = !1;
if ((UA.indexOf("Edge/") > -1 || UA.indexOf("MSIE ") > -1 || UA.indexOf("Trident/") > -1) && (isIE = !0),
UA.indexOf("ZhipinDesktop/") > -1 && (isZpdesk = !0,
ipcRenderer = window.top.ipcRenderer),
isZpdesk && ipcRenderer.send("messageLogout"),
"ontouchstart"in window) {
    var isTouch = !0;
    document.addEventListener("touchstart", function() {}, !1)
}
var loadScript = function(t) {
    var e, i;
    if (t && "" != t)
        for (e = t.split(","),
        i = 0; i < e.length; i++)
            $.getScript(e[i])
};
$(function() {
    "undefined" != typeof loginjson && 1 == loginjson.act && ($(".sign-register .form-btn .btn").html("" == loginjson.btnValue ? "登录" : loginjson.btnValue),
    $(".sign-register .sign-tab").hide(),
    $(".sign-register .title").html(loginjson.titleValue))
});
var Cookie = {
    get: function(t) {
        var e, i = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
        return (e = document.cookie.match(i)) ? unescape(e[2]) : null
    },
    getObj: function() {
        for (var t = document.cookie.split(";"), e = "{", i = 0; i < t.length; i++) {
            var n = t[i].split("=");
            e += '"' + n[0].replace(/\s+/g, "") + '":"' + decodeURIComponent(n[1]) + '",'
        }
        return e = e.slice(0, -1),
        e += "}",
        JSON.parse(e)
    },
    set: function(t, e, i, n, s) {
        var a = t + "=" + encodeURIComponent(e);
        if (i) {
            a += ";expires=" + new Date(i).toGMTString()
        }
        a = n ? a + ";domain=" + n : a,
        a = s ? a + ";path=" + s : a,
        document.cookie = a
    },
    del: function(t, e, i) {
        var n = new Date("1970-01-01")
          , s = t + "=null;expires=" + n.toGMTString();
        s = e ? s + ";domain=" + e : s,
        s = i ? s + ";path=" + i : s,
        document.cookie = s
    }
}
  , cookie = {
    get: function(t) {
        var e, i = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
        return (e = document.cookie.match(i)) ? unescape(e[2]) : null
    },
    set: function(t, e, i) {
        if (i) {
            var n = new Date;
            n.setMinutes(i),
            document.cookie = t + "=" + encodeURIComponent(e) + ";expires=" + n.toGMTString()
        } else
            document.cookie = t + "=" + encodeURIComponent(e)
    },
    clearcookie: function(t, e, i) {
        cookie.get(t) && (document.cookie = t + "=" + (e ? ";path=" + e : "") + (i ? ";domain=" + i : "") + ";expires=Thu,01-Jan-1970 00:00:01 GMT")
    }
}
  , PAGE_ACTIVITY = !0;
!function() {
    function t(t) {
        var i = {
            focus: !0,
            focusin: !0,
            pageshow: !0,
            blur: !1,
            focusout: !1,
            pagehide: !1
        };
        t = t || window.event,
        PAGE_ACTIVITY = t.type in i ? i[t.type] : !this[e]
    }
    var e = "hidden";
    e in document ? document.addEventListener("visibilitychange", t) : (e = "mozHidden")in document ? document.addEventListener("mozvisibilitychange", t) : (e = "webkitHidden")in document ? document.addEventListener("webkitvisibilitychange", t) : (e = "msHidden")in document ? document.addEventListener("msvisibilitychange", t) : "onfocusin"in document ? document.onfocusin = document.onfocusout = t : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = t
}(),
window.INTERFACE_URLS = {
    homeUrl: "/",
    logoutUrl: "/logout/",
    chatProtoUrl: "/v2/web/boss/js/module/chat.proto"
},
$(function() {
    $(".nav-figure").length && ($(".standard").length || ($(".user-nav a").eq(0).attr("disabled", "disabled"),
    $(".user-nav a").eq(0).on("click", function(t) {
        alert("请升级您的浏览器才能使用聊天功能"),
        t.preventDefault()
    })))
});
var KZ = KZ || {};
KZ = {
    form: {
        Prompt: function(t, e) {
            var i = $('<div class="kz_tishi" style="position:absolute;z-index:9999;"/>').html(t);
            0 == $(".kz_tishi").length && (i.appendTo("body").delay(1500).fadeOut(500, function() {
                $(this).remove()
            }),
            i.css({
                left: 1 == e ? ($(window).width() - i.outerWidth()) / 2 : 0,
                top: 1 == e ? ($(window).height() - i.outerHeight()) / 2 : 0,
                width: 1 == e ? "auto" : "100%",
                position: "fixed"
            }))
        }
    },
    pageLock: {
        show: function(t, e, i, n, s) {
            var a;
            if (a = $(".guide").length ? $(window.document) : $(window.parent.document),
            0 == a.find(e.selector).length) {
                a.width(),
                $(e).outerWidth(),
                $(window).height(),
                $(e).outerHeight()
            } else {
                a.width(),
                a.find(e.selector).outerWidth(),
                $(window).height(),
                a.find(e.selector).outerHeight()
            }
            if (!a.find("#lockpage").length > 0) {
                $("<div id='lockpage'/>").css({
                    position: "fixed",
                    zIndex: t ? t : 20,
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: "100%",
                    background: "#000",
                    opacity: .8
                }).appendTo(a.find("body"))
            }
            a.find("#lockpage").css("height", $(document).height() + "px"),
            0 == a.find(e.selector).length ? ($(e).appendTo(a.find("body")),
            a.find(e).css({
                position: "fixed",
                zIndex: t + 1,
                left: "50%",
                top: "50%",
                "margin-left": "-" + $(e).outerWidth() / 2 + "px",
                "margin-top": "-" + $(e).outerHeight() / 2 + "px",
                display: "block"
            })) : a.find(e.selector).css({
                position: "fixed",
                zIndex: t + 1,
                left: "50%",
                top: "50%",
                "margin-left": "-" + $(e.selector).outerWidth() / 2 + "px",
                "margin-top": "-" + $(e.selector).outerHeight() / 2 + "px",
                display: "block"
            }),
            KZ.pageLock.hide(i, e, s),
            "function" == typeof n && n()
        },
        hide: function(t, e, i) {
            var n;
            n = $(".guide").length ? $(window.document) : $(window.parent.document),
            n.find(t).click(function(t) {
                void 0 === i && n.find(e).appendTo("body"),
                $(e).hide(),
                n.find("#lockpage").remove(),
                t.preventDefault()
            })
        },
        runHide: function(t) {
            var e;
            e = $(".guide").length ? $(window.document) : $(window.parent.document),
            e.find(t.selector).length > 0 ? setTimeout(function() {
                e.find(t).remove()
            }, 100) : e.find(t).hide(),
            e.find("#lockpage").remove()
        },
        runRemove: function(t) {
            var e;
            e = $(".guide").length ? $(window.document) : $(window.parent.document),
            e.find(t).appendTo("body"),
            $(t).hide(),
            e.find("#lockpage").remove()
        }
    }
};
var explorer = window.navigator.userAgent;
if (explorer.indexOf("MSIE") >= 0) {
    var b_version = navigator.appVersion
      , version = b_version.split(";");
    window.IE = parseInt(version[1].replace(/[^\d\.]/g, "")),
    $("html").addClass("ie")
} else
    window.IE = 0;
window.IE > 0 && window.IE < 9 && !Array.prototype.indexOf && (Array.prototype.indexOf = function(t) {
    for (var e = 0; e < this.length; e++)
        if (t === this[e])
            return e;
    return -1
}
),
$(function() {
    $.extend({
        initUploadPortrait: function(t) {
            var e = $.extend({
                title: "上传照片",
                url: "uploadURL=/companyugc/upload/logo.json?c=uploadPortrit&amp;jsCallback=uploadOk",
                callback: null
            }, t)
              , i = "";
            i += '<section class="p_dialog uploadPortrait"><div class="dialog_con"><a href="#" rel="nofollow" class="dialog_close"></a><div id="uploadLogoFlash"><h3>' + e.title + '</h3><object id="FlashID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="550" height="440"><param name="movie" value="/v2/web/geek/images/portrait.swf" /><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="flashVars" value="' + e.url + '" /><!--[if !IE]>--><object type="application/x-shockwave-flash" data="/v2/web/geek/images/portrait.swf" width="550" height="440"><!--<![endif]--><param name="quality" value="high" /><param name="wmode" value="transparent" /><param name="flashVars" value="' + e.url + '" /><!--[if !IE]>--></object><!--<![endif]--></object></div></div></section>',
            $(".p_dialog").length <= 0 && $(i).appendTo("body"),
            KZ.pageLock.show(1e3, ".uploadPortrait", ".uploadPortrait .dialog_close"),
            top.uploadOk = function(t) {
                var i = "string" == typeof t ? $.parseJSON(t) : t;
                if (i && 1 == i.rescode) {
                    var n = i.url || [];
                    e.callback && (e.callback(n, i),
                    KZ.pageLock.runHide(".uploadPortrait"))
                } else
                    alert("图片上传失败")
            }
        }
    })
});
var crop = {
    cWidth: 350,
    cHeight: 350,
    cR: 175,
    show: function(t) {
        this.opts = t,
        crop.uploadEl = t.element,
        this.inited || (this.bindFileInput(t.defaultAvatarHtml),
        this.inited = !0),
        t.title && this.html.find(".hd span").text(t.title),
        KZ.pageLock.show(1e3, ".avatar_layer_html5", ".avatar_layer_html5 .close"),
        this.selected = !1
    },
    hide: function() {
        this.html.find(".close").click()
    },
    bindFileInput: function(t) {
        var e = this;
        this.html || (this.html = t || $('<div class="avatar_layer avatar_layer_html5">\t\t\t\t\t\t\t\t<div class="hd"><span/><i class="close"/></div>\t\t\t\t\t\t\t\t<div class="main">\t\t\t\t\t\t\t\t\t<div class="selectpic">\t\t\t\t\t\t\t\t\t\t<div class="sbox">\t\t\t\t\t\t\t\t\t\t\t<a class="btns" href="#">选择图片</a>\t\t\t\t\t\t\t\t\t\t\t<input type="file" class="selectfile">\t\t\t\t\t\t\t\t\t\t\t<p>只支持JPG、PNG，大小不超过2M</p>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t<div class="editbox">\t\t\t\t\t\t\t\t\t\t\t<canvas></canvas>\t\t\t\t\t\t\t\t\t\t\t<div class="pop"><i></i></div>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="layer_btns">\t\t\t\t\t\t\t\t\t\t<span class="change">更换图片<input type="file" class="selectfile"></span>\t\t\t\t\t\t\t\t\t\t<a class="cancel close" href="#">取 消</a>\t\t\t\t\t\t\t\t\t\t<a class="sure"  href="#" ka="avatar_layer_html5_button_sure">确 定</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t</div>'),
        this.html.appendTo("body"),
        t ? (e.html.find(".img-box").on("click", function() {
            $(this).addClass("img-checked").siblings().removeClass("img-checked")
        }),
        this.html.find(".sure").on("click", function(t) {
            if (e.selected)
                "function" == typeof e.opts.callback && crop.getCropData(e.opts.callback),
                e.hide(),
                e.clear(),
                t.preventDefault();
            else {
                if (!e.html.find(".img-checked").length)
                    return alert("请选择图片"),
                    !1;
                $.ajax({
                    url: $("[upload-base64-url]").attr("upload-base64-url"),
                    type: "post",
                    data: {
                        headImg: e.html.find(".img-checked img").attr("data-id")
                    },
                    dataType: "json",
                    success: function(i) {
                        if (i.rescode) {
                            var n = $(".avatar_box .avatar img");
                            n.attr("src", i.url[0]),
                            n.closest("dd").find("input:hidden[name=tiny]").val(i.url[0]),
                            n.closest("dd").find("input:hidden[name=large]").val(i.url[1]),
                            e.hide(),
                            e.clear(),
                            t.preventDefault(),
                            crop.uploadEl.find(".tip-text").remove()
                        } else
                            alert("图片保存失败")
                    }
                })
            }
        })) : this.html.find(".sure").on("click", function(t) {
            if (!e.selected)
                return alert("请选择图片"),
                !1;
            "function" == typeof e.opts.callback && crop.getCropData(e.opts.callback),
            e.hide(),
            e.clear(),
            t.preventDefault()
        }),
        this.html.find(".cancel").bind("click", function(t) {
            e.clear(),
            t.preventDefault()
        })),
        this.html.find(".selectfile,.layer_btns .selectfile").change(function(e) {
            if (e.target.files.length) {
                t && crop.uploadEl.find(".tip-text").remove();
                var i = e.target.files[0];
                if (!/image\/\w+/.test(i.type))
                    return alert("请确保文件为图像类型"),
                    !1;
                if (window.FileReader) {
                    var n = new FileReader;
                    n.onloadstart = function(t) {}
                    ,
                    n.onloadend = function(t) {
                        var e = new Image;
                        e.onload = function() {
                            crop.resetImg(e)
                        }
                        ,
                        e.src = t.target.result
                    }
                    ,
                    n.readAsDataURL(i)
                }
            }
        })
    },
    clear: function() {
        this.editbox && (this.html.find(".selectfile").val(""),
        this.editbox.css({
            backgroundImage: "none"
        }).hide(),
        this.html.find(".selectpic").find(".sbox").show(),
        this.msk.clearRect(0, 0, this.cWidth, this.cHeight),
        this.html.find(".layer_btns .change").hide())
    },
    resetImg: function(t) {
        this.selected = !0;
        var e = this
          , i = this.html.find(".selectpic").find(".sbox").hide().end().find(".editbox").show();
        this.html.find(".layer_btns .change").css("display", "inline-block"),
        this.editbox = i;
        var n = this.compress(t, 1);
        this.img = n,
        i.css({
            backgroundImage: "url(" + n + ")"
        }),
        this.circle = {
            x: this.cWidth / 2,
            y: this.cHeight / 2,
            r: 75
        },
        this.popbox = i.find(".pop"),
        this.pop = i.find(".pop i"),
        this.popbox.css({
            left: this.circle.x - this.circle.r,
            top: this.circle.y - this.circle.r,
            width: 2 * this.circle.r,
            height: 2 * this.circle.r
        }),
        this.popbox.bind("mousedown", function(t) {
            var i = {
                x: crop.circle.x,
                y: crop.circle.y,
                r: crop.circle.r
            }
              , n = {
                x: t.clientX,
                y: t.clientY,
                left: $(this).position().left,
                top: $(this).position().top
            };
            e.html.bind("mousemove", function(t) {
                var e = t.clientX - n.x
                  , s = t.clientY - n.y;
                crop.circle.x = i.x + e,
                crop.circle.y = i.y + s,
                crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }),
                crop.draw(crop.circle)
            }),
            e.html.bind("mouseup", function(t) {
                crop.circle.x - crop.circle.r < 0 && (crop.circle.x = crop.circle.r),
                crop.circle.x + crop.circle.r > e.cWidth && (crop.circle.x = e.cWidth - crop.circle.r),
                crop.circle.y - crop.circle.r < 0 && (crop.circle.y = crop.circle.r),
                crop.circle.y + crop.circle.r > e.cHeight && (crop.circle.y = e.cHeight - crop.circle.r),
                crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }),
                crop.draw(crop.circle),
                e.html.unbind("mousemove mouseup")
            })
        }),
        this.pop.bind("mousedown", function(t) {
            var i = {
                x: crop.circle.x,
                y: crop.circle.y,
                r: crop.circle.r
            }
              , n = {
                x: t.clientX,
                y: t.clientY,
                left: $(this).position().left,
                top: $(this).position().top
            };
            e.html.bind("mousemove", function(t) {
                var e = t.clientX - n.x
                  , s = t.clientY - n.y
                  , a = Math.max(e, s);
                crop.circle.r = i.r + a,
                crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }),
                crop.draw(crop.circle)
            }),
            e.html.bind("mouseup", function() {
                crop.circle.r < 75 && (crop.circle.r = 75),
                crop.circle.r > e.cR && (crop.circle.r = e.cR),
                crop.circle.x - crop.circle.r < 0 && (crop.circle.x = crop.circle.r),
                crop.circle.x + crop.circle.r > e.cWidth && (crop.circle.x = e.cWidth - crop.circle.r),
                crop.circle.y - crop.circle.r < 0 && (crop.circle.y = crop.circle.r),
                crop.circle.y + crop.circle.r > e.cHeight && (crop.circle.y = e.cHeight - crop.circle.r),
                crop.popbox.css({
                    left: crop.circle.x - crop.circle.r,
                    top: crop.circle.y - crop.circle.r,
                    width: 2 * crop.circle.r,
                    height: 2 * crop.circle.r
                }),
                crop.draw(crop.circle),
                e.html.unbind("mousemove mouseup")
            }),
            t.preventDefault(),
            t.stopPropagation(),
            t.stopImmediatePropagation()
        }),
        this.mask = this.html.find(".selectpic canvas").get(0),
        this.msk = this.mask.getContext("2d"),
        this.mask.width = this.cWidth,
        this.mask.height = this.cHeight,
        this.draw(this.circle)
    },
    draw: function(t) {
        var e = this.msk;
        e.clearRect(0, 0, this.cWidth, this.cHeight),
        e.globalCompositeOperation = "source-over",
        e.beginPath(),
        e.fillStyle = "#000000",
        e.rect(0, 0, this.cWidth, this.cHeight),
        e.globalAlpha = .6,
        e.fill(),
        e.closePath(),
        e.globalCompositeOperation = "destination-out",
        e.beginPath(),
        e.fillStyle = "",
        e.arc(t.x, t.y, t.r, 0, 2 * Math.PI, !1),
        e.fill(),
        e.closePath()
    },
    getCropData: function(t) {
        var e = this.circle
          , i = new Image;
        i.crossOrigin = "Anonymous",
        i.onload = function() {
            var n = document.createElement("canvas");
            n.width = 2 * e.r,
            n.height = 2 * e.r;
            var s = n.getContext("2d");
            s.clearRect(0, 0, n.width, n.height),
            s.fillStyle = "#fff",
            s.fillRect(0, 0, n.width, n.height),
            s.drawImage(i, (e.x - e.r) * -1, (e.y - e.r) * -1);
            var a = n.toDataURL("image/jpeg", 1);
            t(a)
        }
        ,
        i.src = this.img
    },
    compress: function(t, e) {
        var i = this.cWidth
          , n = this.cHeight;
        t.width > t.height ? (imageWidth = i,
        imageHeight = Math.round(n * (t.height / t.width))) : t.width < t.height ? (imageHeight = n,
        imageWidth = Math.round(i * (t.width / t.height))) : (imageWidth = i,
        imageHeight = n),
        e = imageWidth / t.width;
        var s = document.createElement("canvas");
        s.width = i,
        s.height = n;
        var a = s.getContext("2d");
        return a.clearRect(0, 0, s.width, s.height),
        imageWidth < s.width ? a.drawImage(t, (s.width - imageWidth) / 2, 0, imageWidth, imageHeight) : a.drawImage(t, 0, (s.height - imageHeight) / 2, imageWidth, imageHeight),
        s.toDataURL("image/png", e)
    }
};
if (function(t) {
    function e() {
        return new Date(Date.UTC.apply(Date, arguments))
    }
    var i = function(e, i) {
        var a = this;
        this.element = t(e),
        this.container = i.container || "body",
        this.language = i.language || this.element.data("date-language") || "en",
        this.language = this.language in n ? this.language : "en",
        this.isRTL = n[this.language].rtl || !1,
        this.formatType = i.formatType || this.element.data("format-type") || "standard",
        this.format = s.parseFormat(i.format || this.element.data("date-format") || n[this.language].format || s.getDefaultFormat(this.formatType, "input"), this.formatType),
        this.isInline = !1,
        this.isVisible = !1,
        this.isInput = this.element.is("input"),
        this.bootcssVer = this.isInput ? this.element.is(".form-control") ? 3 : 2 : this.bootcssVer = this.element.is(".input-group") ? 3 : 2,
        this.component = !!this.element.is(".date") && (3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-th, .input-group-addon .glyphicon-time, .input-group-addon .glyphicon-calendar").parent() : this.element.find(".add-on .icon-th, .add-on .icon-time, .add-on .icon-calendar").parent()),
        this.componentReset = !!this.element.is(".date") && (3 == this.bootcssVer ? this.element.find(".input-group-addon .glyphicon-remove").parent() : this.element.find(".add-on .icon-remove").parent()),
        this.hasInput = this.component && this.element.find("input").length,
        this.component && 0 === this.component.length && (this.component = !1),
        this.linkField = i.linkField || this.element.data("link-field") || !1,
        this.linkFormat = s.parseFormat(i.linkFormat || this.element.data("link-format") || s.getDefaultFormat(this.formatType, "link"), this.formatType),
        this.minuteStep = i.minuteStep || this.element.data("minute-step") || 5,
        this.pickerPosition = i.pickerPosition || this.element.data("picker-position") || "bottom-right",
        this.showMeridian = i.showMeridian || this.element.data("show-meridian") || !1,
        this.initialDate = i.initialDate || new Date,
        this.minLimitYear = i.minLimitYear || !1,
        this._attachEvents(),
        this.formatViewType = "datetime",
        "formatViewType"in i ? this.formatViewType = i.formatViewType : "formatViewType"in this.element.data() && (this.formatViewType = this.element.data("formatViewType")),
        this.minView = 0,
        "minView"in i ? this.minView = i.minView : "minView"in this.element.data() && (this.minView = this.element.data("min-view")),
        this.minView = s.convertViewMode(this.minView),
        this.maxView = s.modes.length - 1,
        "maxView"in i ? this.maxView = i.maxView : "maxView"in this.element.data() && (this.maxView = this.element.data("max-view")),
        this.maxView = s.convertViewMode(this.maxView),
        this.wheelViewModeNavigation = !1,
        "wheelViewModeNavigation"in i ? this.wheelViewModeNavigation = i.wheelViewModeNavigation : "wheelViewModeNavigation"in this.element.data() && (this.wheelViewModeNavigation = this.element.data("view-mode-wheel-navigation")),
        this.wheelViewModeNavigationInverseDirection = !1,
        "wheelViewModeNavigationInverseDirection"in i ? this.wheelViewModeNavigationInverseDirection = i.wheelViewModeNavigationInverseDirection : "wheelViewModeNavigationInverseDirection"in this.element.data() && (this.wheelViewModeNavigationInverseDirection = this.element.data("view-mode-wheel-navigation-inverse-dir")),
        this.wheelViewModeNavigationDelay = 100,
        "wheelViewModeNavigationDelay"in i ? this.wheelViewModeNavigationDelay = i.wheelViewModeNavigationDelay : "wheelViewModeNavigationDelay"in this.element.data() && (this.wheelViewModeNavigationDelay = this.element.data("view-mode-wheel-navigation-delay")),
        this.startViewMode = 2,
        "startView"in i ? this.startViewMode = i.startView : "startView"in this.element.data() && (this.startViewMode = this.element.data("start-view")),
        this.startViewMode = s.convertViewMode(this.startViewMode),
        this.viewMode = this.startViewMode,
        this.viewSelect = this.minView,
        "viewSelect"in i ? this.viewSelect = i.viewSelect : "viewSelect"in this.element.data() && (this.viewSelect = this.element.data("view-select")),
        this.viewSelect = s.convertViewMode(this.viewSelect),
        this.forceParse = !0,
        "forceParse"in i ? this.forceParse = i.forceParse : "dateForceParse"in this.element.data() && (this.forceParse = this.element.data("date-force-parse")),
        this.picker = t(3 == this.bootcssVer ? s.templateV3 : s.template).appendTo(this.isInline ? this.element : this.container).on({
            click: t.proxy(this.click, this),
            mousedown: t.proxy(this.mousedown, this)
        }),
        this.wheelViewModeNavigation && (t.fn.mousewheel ? this.picker.on({
            mousewheel: t.proxy(this.mousewheel, this)
        }) : console.log("Mouse Wheel event is not supported. Please include the jQuery Mouse Wheel plugin before enabling this option")),
        this.isInline ? this.picker.addClass("datetimepicker-inline") : this.picker.addClass("datetimepicker-dropdown-" + this.pickerPosition),
        this.isRTL && (this.picker.addClass("datetimepicker-rtl"),
        3 == this.bootcssVer ? this.picker.find(".prev span, .next span").toggleClass("glyphicon-arrow-left glyphicon-arrow-right") : this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")),
        this.minLimitYear && this.picker.addClass("date-showminyear"),
        t(document).on("click", function(e) {
            0 === t(e.target).closest(".datetimepicker").length && a.hide()
        }),
        this.autoclose = !1,
        "autoclose"in i ? this.autoclose = i.autoclose : "dateAutoclose"in this.element.data() && (this.autoclose = this.element.data("date-autoclose")),
        this.keyboardNavigation = !0,
        "keyboardNavigation"in i ? this.keyboardNavigation = i.keyboardNavigation : "dateKeyboardNavigation"in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")),
        this.todayBtn = i.todayBtn || this.element.data("date-today-btn") || !1,
        this.todayHighlight = i.todayHighlight || this.element.data("date-today-highlight") || !1,
        this.weekStart = (i.weekStart || this.element.data("date-weekstart") || n[this.language].weekStart || 0) % 7,
        this.weekEnd = (this.weekStart + 6) % 7,
        this.startDate = -(1 / 0),
        this.endDate = 1 / 0,
        this.daysOfWeekDisabled = [],
        this.setStartDate(i.startDate || this.element.data("date-startdate")),
        this.setEndDate(i.endDate || this.element.data("date-enddate")),
        this.setDaysOfWeekDisabled(i.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")),
        this.fillDow(),
        this.fillMonths(),
        this.update(),
        this.showMode(),
        this.timer = null,
        this.isInline && this.show()
    };
    i.prototype = {
        constructor: i,
        _events: [],
        _attachEvents: function() {
            this._detachEvents(),
            this.isInput ? this._events = [[this.element, {
                click: t.proxy(this.show, this),
                keyup: t.proxy(this.update, this),
                keydown: t.proxy(this.keydown, this)
            }]] : this.component && this.hasInput ? (this._events = [[this.element.find("input"), {
                click: t.proxy(this.show, this),
                keyup: t.proxy(this.update, this),
                keydown: t.proxy(this.keydown, this)
            }], [this.component, {
                click: t.proxy(this.show, this)
            }]],
            this.componentReset && this._events.push([this.componentReset, {
                click: t.proxy(this.reset, this)
            }])) : this.element.is("div") ? this.isInline = !0 : this._events = [[this.element, {
                click: t.proxy(this.show, this)
            }]];
            for (var e, i, n = 0; n < this._events.length; n++)
                e = this._events[n][0],
                i = this._events[n][1],
                e.on(i)
        },
        _detachEvents: function() {
            for (var t, e, i = 0; i < this._events.length; i++)
                t = this._events[i][0],
                e = this._events[i][1],
                t.off(e);
            this._events = []
        },
        show: function(e) {
            if (this.picker.is(":visible"))
                return void this.picker.hide();
            t(".datetimepicker").hide(),
            t(".dropdown-select-open").removeClass("dropdown-select-open"),
            t(".dropdown-menu-open").removeClass("dropdown-menu-open"),
            this.element.closest(".dropdown-select").addClass("dropdown-select-open"),
            this.element.closest(".dropdown-wrap").addClass("dropdown-menu-open"),
            this.picker.show(),
            this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(),
            this.forceParse && this.update(),
            this.place(),
            t(window).on("resize", t.proxy(this.place, this)),
            e && (e.stopPropagation(),
            e.preventDefault()),
            this.isVisible = !0,
            this.element.trigger({
                type: "show",
                date: this.date
            })
        },
        hide: function(e) {
            this.isVisible && (this.isInline || (this.element.closest(".dropdown-select").removeClass("dropdown-select-open"),
            this.picker.hide(),
            t(window).off("resize", this.place),
            this.viewMode = this.startViewMode,
            this.showMode(),
            this.isInput || t(document).off("mousedown", this.hide),
            this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(),
            this.isVisible = !1,
            this.element.trigger({
                type: "hide",
                date: this.date
            })))
        },
        remove: function() {
            this._detachEvents(),
            this.picker.remove(),
            delete this.picker,
            delete this.element.data().datetimepicker
        },
        getDate: function() {
            var t = this.getUTCDate();
            return new Date(t.getTime() + 6e4 * t.getTimezoneOffset())
        },
        getUTCDate: function() {
            return this.date
        },
        setDate: function(t) {
            this.setUTCDate(new Date(t.getTime() - 6e4 * t.getTimezoneOffset()))
        },
        setUTCDate: function(t) {
            t >= this.startDate && t <= this.endDate ? (this.date = t,
            this.setValue(),
            this.viewDate = this.date,
            this.fill()) : this.element.trigger({
                type: "outOfRange",
                date: t,
                startDate: this.startDate,
                endDate: this.endDate
            })
        },
        setFormat: function(t) {
            this.format = s.parseFormat(t, this.formatType);
            var e;
            this.isInput ? e = this.element : this.component && (e = this.element.find("input")),
            e && e.val() && this.setValue()
        },
        setValue: function() {
            var e = this.getFormattedDate();
            this.isInput ? this.element.val(e) : (this.component && this.element.find("input").val(e),
            this.element.data("date", e)),
            this.linkField && t("#" + this.linkField).val(this.getFormattedDate(this.linkFormat))
        },
        getFormattedDate: function(t) {
            return void 0 == t && (t = this.format),
            s.formatDate(this.date, t, this.language, this.formatType)
        },
        setStartDate: function(t) {
            this.startDate = t || -(1 / 0),
            this.startDate !== -(1 / 0) && (this.startDate = s.parseDate(this.startDate, this.format, this.language, this.formatType)),
            this.update(),
            this.updateNavArrows()
        },
        setEndDate: function(t) {
            this.endDate = t || 1 / 0,
            this.endDate !== 1 / 0 && (this.endDate = s.parseDate(this.endDate, this.format, this.language, this.formatType)),
            this.update(),
            this.updateNavArrows()
        },
        setDaysOfWeekDisabled: function(e) {
            this.daysOfWeekDisabled = e || [],
            t.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)),
            this.daysOfWeekDisabled = t.map(this.daysOfWeekDisabled, function(t) {
                return parseInt(t, 10)
            }),
            this.update(),
            this.updateNavArrows()
        },
        place: function() {
            if (!this.isInline) {
                var e = 0;
                t("div").each(function() {
                    var i = parseInt(t(this).css("zIndex"), 10);
                    i > e && (e = i)
                });
                var i, n, s, a, o = e + 10;
                a = this.container instanceof t ? this.container.offset() : t(this.container).offset(),
                this.component ? (i = this.component.offset(),
                s = i.left,
                "bottom-left" != this.pickerPosition && "top-left" != this.pickerPosition || (s += this.component.outerWidth() - this.picker.outerWidth())) : (i = this.element.offset(),
                s = i.left),
                s + 220 > document.body.clientWidth && (s = document.body.clientWidth - 220),
                n = "top-left" == this.pickerPosition || "top-right" == this.pickerPosition ? i.top - this.picker.outerHeight() : i.top + this.height,
                n -= a.top,
                s -= a.left,
                this.picker.css({
                    top: n,
                    left: s,
                    zIndex: o
                })
            }
        },
        update: function() {
            var t, e = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0]instanceof Date) ? (t = arguments[0],
            e = !0) : ("string" == typeof (t = (this.isInput ? this.element.val() : this.element.find("input").val()) || this.element.data("date") || this.initialDate) || t instanceof String) && (t = t.replace(/^\s+|\s+$/g, "")),
            t || (t = new Date,
            e = !1),
            this.date = s.parseDate(t, this.format, this.language, this.formatType),
            e && this.setValue(),
            this.date < this.startDate ? this.viewDate = new Date(this.startDate) : this.date > this.endDate ? this.viewDate = new Date(this.endDate) : this.viewDate = new Date(this.date),
            this.fill()
        },
        fillDow: function() {
            for (var t = this.weekStart, e = "<tr>"; t < this.weekStart + 7; )
                e += '<th class="dow">' + n[this.language].daysMin[t++ % 7] + "</th>";
            e += "</tr>",
            this.picker.find(".datetimepicker-days thead").append(e)
        },
        fillMonths: function() {
            for (var t = "", e = 0; e < 12; )
                t += '<span class="month">' + n[this.language].monthsShort[e++] + "</span>";
            this.picker.find(".datetimepicker-months td").html(t)
        },
        fill: function() {
            if (null != this.date && null != this.viewDate) {
                var i = new Date(this.viewDate)
                  , a = i.getUTCFullYear()
                  , o = i.getUTCMonth()
                  , r = i.getUTCDate()
                  , l = i.getUTCHours()
                  , c = i.getUTCMinutes()
                  , d = this.startDate !== -(1 / 0) ? this.startDate.getUTCFullYear() : -(1 / 0)
                  , h = this.startDate !== -(1 / 0) ? this.startDate.getUTCMonth() : -(1 / 0)
                  , u = this.endDate !== 1 / 0 ? this.endDate.getUTCFullYear() : 1 / 0
                  , p = this.endDate !== 1 / 0 ? this.endDate.getUTCMonth() : 1 / 0
                  , f = new e(this.date.getUTCFullYear(),this.date.getUTCMonth(),this.date.getUTCDate()).valueOf()
                  , m = new Date;
                if (this.picker.find(".datetimepicker-days thead th:eq(1)").text(n[this.language].months[o] + " " + a),
                "time" == this.formatViewType) {
                    var g = l % 12 ? l % 12 : 12
                      , v = (g < 10 ? "0" : "") + g
                      , w = (c < 10 ? "0" : "") + c
                      , b = n[this.language].meridiem[l < 12 ? 0 : 1];
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(v + ":" + w + " " + (b ? b.toUpperCase() : "")),
                    this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(v + ":" + w + " " + (b ? b.toUpperCase() : ""))
                } else
                    this.picker.find(".datetimepicker-hours thead th:eq(1)").text(r + " " + n[this.language].months[o] + " " + a),
                    this.picker.find(".datetimepicker-minutes thead th:eq(1)").text(r + " " + n[this.language].months[o] + " " + a);
                this.picker.find("tfoot th.today").html('<div class="today-btn">' + n[this.language].today + "</div>").toggle(this.todayBtn !== !1),
                this.fillMonths();
                var y = e(a, o - 1, 28, 0, 0, 0, 0)
                  , $ = s.getDaysInMonth(y.getUTCFullYear(), y.getUTCMonth());
                y.setUTCDate($),
                y.setUTCDate($ - (y.getUTCDay() - this.weekStart + 7) % 7);
                var C = new Date(y);
                C.setUTCDate(C.getUTCDate() + 42),
                C = C.valueOf();
                for (var k, x = [], D = ""; y.valueOf() < C; )
                    y.getUTCDay() == this.weekStart && x.push("<tr>"),
                    k = "",
                    D = y.getUTCDate(),
                    y.getUTCFullYear() < a || y.getUTCFullYear() == a && y.getUTCMonth() < o ? k += " old" : (y.getUTCFullYear() > a || y.getUTCFullYear() == a && y.getUTCMonth() > o) && (k += " new"),
                    this.todayHighlight && y.getUTCFullYear() == m.getFullYear() && y.getUTCMonth() == m.getMonth() && D == m.getDate() && (k += " today",
                    D = "今日"),
                    y.valueOf() == f && (k += " active"),
                    (y.valueOf() + 864e5 <= this.startDate || y.valueOf() > this.endDate || t.inArray(y.getUTCDay(), this.daysOfWeekDisabled) !== -1) && (k += " disabled"),
                    x.push('<td class="day' + k + '"><em>' + y.getUTCDate() + "</em></td>"),
                    y.getUTCDay() == this.weekEnd && x.push("</tr>"),
                    y.setUTCDate(y.getUTCDate() + 1);
                this.picker.find(".datetimepicker-days tbody").empty().append(x.join("")),
                x = [];
                for (var T = "", S = "", _ = "", E = 0; E < 24; E++) {
                    var I = e(a, o, r, E);
                    k = "",
                    I.valueOf() + 36e5 <= this.startDate || I.valueOf() > this.endDate ? k += " disabled" : l == E && (k += " active"),
                    this.showMeridian && 2 == n[this.language].meridiem.length ? (S = E < 12 ? n[this.language].meridiem[0] : n[this.language].meridiem[1],
                    S != _ && ("" != _ && x.push("</fieldset>"),
                    x.push('<fieldset class="hour"><legend>' + S.toUpperCase() + "</legend>")),
                    _ = S,
                    T = E % 12 ? E % 12 : 12,
                    x.push('<span class="hour' + k + " hour_" + (E < 12 ? "am" : "pm") + '">' + T + "</span>"),
                    23 == E && x.push("</fieldset>")) : (T = E + ":00",
                    x.push('<span class="hour' + k + '">' + T + "</span>"))
                }
                this.picker.find(".datetimepicker-hours td").html(x.join("")),
                x = [],
                T = "",
                S = "",
                _ = "";
                for (var E = 0; E < 60; E += this.minuteStep) {
                    var I = e(a, o, r, l, E, 0);
                    k = "",
                    I.valueOf() < this.startDate || I.valueOf() > this.endDate ? k += " disabled" : Math.floor(c / this.minuteStep) == Math.floor(E / this.minuteStep) && (k += " active"),
                    this.showMeridian && 2 == n[this.language].meridiem.length ? (S = l < 12 ? n[this.language].meridiem[0] : n[this.language].meridiem[1],
                    S != _ && ("" != _ && x.push("</fieldset>"),
                    x.push('<fieldset class="minute"><legend>' + S.toUpperCase() + "</legend>")),
                    _ = S,
                    T = l % 12 ? l % 12 : 12,
                    x.push('<span class="minute' + k + '">' + T + ":" + (E < 10 ? "0" + E : E) + "</span>"),
                    59 == E && x.push("</fieldset>")) : (T = E + ":00",
                    x.push('<span class="minute' + k + '">' + l + ":" + (E < 10 ? "0" + E : E) + "</span>"))
                }
                this.picker.find(".datetimepicker-minutes td").html(x.join(""));
                var U = this.date.getUTCFullYear()
                  , j = this.picker.find(".datetimepicker-months").find("th:eq(1)").text(a).end().find("span").removeClass("active");
                U == a && j.eq(this.date.getUTCMonth()).addClass("active"),
                (a < d || a > u) && j.addClass("disabled"),
                a == d && j.slice(0, h).addClass("disabled"),
                a == u && j.slice(p + 1).addClass("disabled"),
                x = "",
                a = 10 * parseInt(a / 10, 10);
                var M = this.picker.find(".datetimepicker-years").find("th:eq(1)").text(a + "-" + (a + 9)).end().find("td");
                a -= 1;
                for (var E = -1; E < 11; E++) {
                    var P = a;
                    if (this.minLimitYear && a < this.minLimitYear)
                        return;
                    this.minLimitYear && a == this.minLimitYear && (P = a + 1 + "以前"),
                    x += '<span class="year' + (E == -1 || 10 == E ? " old" : "") + (U == a ? " active" : "") + (a < d || a > u ? " disabled" : "") + '" data-year="' + a + '">' + P + "</span>",
                    a += 1
                }
                M.html(x),
                this.place(),
                this.updateNavArrows()
            }
        },
        updateNavArrows: function() {
            var t = new Date(this.viewDate)
              , e = t.getUTCFullYear()
              , i = t.getUTCMonth()
              , n = t.getUTCDate()
              , s = t.getUTCHours()
              , a = this.picker.find(".datetimepicker-years").find(".year").last().hasClass("disabled");
            switch (this.viewMode) {
            case 0:
                this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() && s <= this.startDate.getUTCHours() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                }),
                this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() && s >= this.endDate.getUTCHours() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
            case 1:
                this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() && n <= this.startDate.getUTCDate() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                }),
                this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() && n >= this.endDate.getUTCDate() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
            case 2:
                this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() && i <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                }),
                this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() && i >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                });
                break;
            case 3:
            case 4:
                this.startDate !== -(1 / 0) && e <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({
                    visibility: "hidden"
                }) : this.picker.find(".prev").css({
                    visibility: "visible"
                }),
                this.endDate !== 1 / 0 && e >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : a ? this.picker.find(".next").css({
                    visibility: "hidden"
                }) : this.picker.find(".next").css({
                    visibility: "visible"
                })
            }
        },
        mousewheel: function(e) {
            if (e.preventDefault(),
            e.stopPropagation(),
            !this.wheelPause) {
                this.wheelPause = !0;
                var i = e.originalEvent
                  , n = i.wheelDelta
                  , s = n > 0 ? 1 : 0 === n ? 0 : -1;
                this.wheelViewModeNavigationInverseDirection && (s = -s),
                this.showMode(s),
                setTimeout(t.proxy(function() {
                    this.wheelPause = !1
                }, this), this.wheelViewModeNavigationDelay)
            }
        },
        click: function(i) {
            i.stopPropagation(),
            i.preventDefault();
            var n = t(i.target).closest("span, td, th, legend");
            if (n.is(".glyphicon") && (n = t(n).parent().closest("span, td, th, legend")),
            1 == n.length) {
                if (n.is(".disabled"))
                    return void this.element.trigger({
                        type: "outOfRange",
                        date: this.viewDate,
                        startDate: this.startDate,
                        endDate: this.endDate
                    });
                switch (n[0].nodeName.toLowerCase()) {
                case "th":
                    switch (n[0].className) {
                    case "switch":
                        this.showMode(1);
                        break;
                    case "prev":
                    case "next":
                        this.picker.find(".prev").css({
                            visibility: "hidden"
                        }),
                        this.picker.find(".next").css({
                            visibility: "hidden"
                        }),
                        this.throttle(function() {
                            var t = s.modes[this.viewMode].navStep * ("prev" == n[0].className ? -1 : 1);
                            switch (this.viewMode) {
                            case 0:
                                this.viewDate = this.moveHour(this.viewDate, t);
                                break;
                            case 1:
                                this.viewDate = this.moveDate(this.viewDate, t);
                                break;
                            case 2:
                                this.viewDate = this.moveMonth(this.viewDate, t);
                                break;
                            case 3:
                            case 4:
                                this.viewDate = this.moveYear(this.viewDate, t)
                            }
                            this.fill(),
                            this.element.trigger({
                                type: n[0].className + ":" + this.convertViewModeText(this.viewMode),
                                date: this.viewDate,
                                startDate: this.startDate,
                                endDate: this.endDate
                            })
                        }, 300);
                        break;
                    case "today":
                        var a = new Date;
                        a = e(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds(), 0),
                        a < this.startDate ? a = this.startDate : a > this.endDate && (a = this.endDate),
                        this.viewMode = this.startViewMode,
                        this.showMode(0),
                        this._setDate(a),
                        this.fill(),
                        this.autoclose && this.hide()
                    }
                    break;
                case "span":
                    if (!n.is(".disabled")) {
                        var o = this.viewDate.getUTCFullYear()
                          , r = this.viewDate.getUTCMonth()
                          , l = this.viewDate.getUTCDate()
                          , c = this.viewDate.getUTCHours()
                          , d = this.viewDate.getUTCMinutes()
                          , h = this.viewDate.getUTCSeconds();
                        if (n.is(".month") ? (this.viewDate.setUTCDate(1),
                        r = n.parent().find("span").index(n),
                        l = this.viewDate.getUTCDate(),
                        this.viewDate.setUTCMonth(r),
                        this.element.trigger({
                            type: "changeMonth",
                            date: this.viewDate
                        }),
                        this.viewSelect >= 3 && this._setDate(e(o, r, l, c, d, h, 0))) : n.is(".year") ? (this.viewDate.setUTCDate(1),
                        o = parseInt(n.text(), 10) || 0,
                        n.text().indexOf("以前") > -1 && (o -= 1),
                        this.viewDate.setUTCFullYear(o),
                        this.element.trigger({
                            type: "changeYear",
                            date: this.viewDate
                        }),
                        this.viewSelect >= 4 && this._setDate(e(o, r, l, c, d, h, 0)),
                        this.minLimitYear && this.minLimitYear == o && (this.viewMode = this.startViewMode,
                        this.showMode(0),
                        this._setDate(e(o, 0, l, c, d, h, 0)),
                        this.fill(),
                        this.hide())) : n.is(".hour") ? (c = parseInt(n.text(), 10) || 0,
                        (n.hasClass("hour_am") || n.hasClass("hour_pm")) && (12 == c && n.hasClass("hour_am") ? c = 0 : 12 != c && n.hasClass("hour_pm") && (c += 12)),
                        this.viewDate.setUTCHours(c),
                        this.element.trigger({
                            type: "changeHour",
                            date: this.viewDate
                        }),
                        this.viewSelect >= 1 && this._setDate(e(o, r, l, c, d, h, 0))) : n.is(".minute") && (d = parseInt(n.text().substr(n.text().indexOf(":") + 1), 10) || 0,
                        this.viewDate.setUTCMinutes(d),
                        this.element.trigger({
                            type: "changeMinute",
                            date: this.viewDate
                        }),
                        this.viewSelect >= 0 && this._setDate(e(o, r, l, c, d, h, 0))),
                        0 != this.viewMode) {
                            var u = this.viewMode;
                            this.minLimitYear && this.minLimitYear == o ? this.showMode(0) : this.showMode(-1),
                            this.fill(),
                            u == this.viewMode && this.autoclose && this.hide()
                        } else
                            this.fill(),
                            this.autoclose && this.hide()
                    }
                    break;
                case "td":
                    if (n.is(".day") && !n.is(".disabled")) {
                        var l = parseInt(n.text(), 10) || 1
                          , o = this.viewDate.getUTCFullYear()
                          , r = this.viewDate.getUTCMonth()
                          , c = this.viewDate.getUTCHours()
                          , d = this.viewDate.getUTCMinutes()
                          , h = this.viewDate.getUTCSeconds();
                        n.is(".old") ? 0 === r ? (r = 11,
                        o -= 1) : r -= 1 : n.is(".new") && (11 == r ? (r = 0,
                        o += 1) : r += 1),
                        this.viewDate.setUTCFullYear(o),
                        this.viewDate.setUTCMonth(r, l),
                        this.element.trigger({
                            type: "changeDay",
                            date: this.viewDate
                        }),
                        this.viewSelect >= 2 && this._setDate(e(o, r, l, c, d, h, 0))
                    }
                    var u = this.viewMode;
                    this.showMode(-1),
                    this.fill(),
                    u == this.viewMode && this.autoclose && this.hide()
                }
            }
        },
        throttle: function(t, e) {
            var i = this;
            clearTimeout(this.timer),
            this.timer = setTimeout(function() {
                t.call(i)
            }, e)
        },
        _setDate: function(t, e) {
            e && "date" != e || (this.date = t),
            e && "view" != e || (this.viewDate = t),
            this.fill(),
            this.setValue();
            var i;
            this.isInput ? i = this.element : this.component && (i = this.element.find("input")),
            i && (i.change(),
            this.autoclose),
            this.element.trigger({
                type: "changeDate",
                date: this.date
            })
        },
        moveMinute: function(t, e) {
            if (!e)
                return t;
            var i = new Date(t.valueOf());
            return i.setUTCMinutes(i.getUTCMinutes() + e * this.minuteStep),
            i
        },
        moveHour: function(t, e) {
            if (!e)
                return t;
            var i = new Date(t.valueOf());
            return i.setUTCHours(i.getUTCHours() + e),
            i
        },
        moveDate: function(t, e) {
            if (!e)
                return t;
            var i = new Date(t.valueOf());
            return i.setUTCDate(i.getUTCDate() + e),
            i
        },
        moveMonth: function(t, e) {
            if (!e)
                return t;
            var i, n, s = new Date(t.valueOf()), a = s.getUTCDate(), o = s.getUTCMonth(), r = Math.abs(e);
            if (e = e > 0 ? 1 : -1,
            1 == r)
                n = e == -1 ? function() {
                    return s.getUTCMonth() == o
                }
                : function() {
                    return s.getUTCMonth() != i
                }
                ,
                i = o + e,
                s.setUTCMonth(i),
                (i < 0 || i > 11) && (i = (i + 12) % 12);
            else {
                for (var l = 0; l < r; l++)
                    s = this.moveMonth(s, e);
                i = s.getUTCMonth(),
                s.setUTCDate(a),
                n = function() {
                    return i != s.getUTCMonth()
                }
            }
            for (; n(); )
                s.setUTCDate(--a),
                s.setUTCMonth(i);
            return s
        },
        moveYear: function(t, e) {
            return this.moveMonth(t, 12 * e)
        },
        dateWithinRange: function(t) {
            return t >= this.startDate && t <= this.endDate
        },
        keydown: function(t) {
            if (this.picker.is(":not(:visible)"))
                return void (27 == t.keyCode && this.show());
            var e, i, n, s = !1;
            switch (t.keyCode) {
            case 27:
                this.hide(),
                t.preventDefault();
                break;
            case 37:
            case 39:
                if (!this.keyboardNavigation)
                    break;
                e = 37 == t.keyCode ? -1 : 1,
                viewMode = this.viewMode,
                t.ctrlKey ? viewMode += 2 : t.shiftKey && (viewMode += 1),
                4 == viewMode ? (i = this.moveYear(this.date, e),
                n = this.moveYear(this.viewDate, e)) : 3 == viewMode ? (i = this.moveMonth(this.date, e),
                n = this.moveMonth(this.viewDate, e)) : 2 == viewMode ? (i = this.moveDate(this.date, e),
                n = this.moveDate(this.viewDate, e)) : 1 == viewMode ? (i = this.moveHour(this.date, e),
                n = this.moveHour(this.viewDate, e)) : 0 == viewMode && (i = this.moveMinute(this.date, e),
                n = this.moveMinute(this.viewDate, e)),
                this.dateWithinRange(i) && (this.date = i,
                this.viewDate = n,
                this.setValue(),
                this.update(),
                t.preventDefault(),
                s = !0);
                break;
            case 38:
            case 40:
                if (!this.keyboardNavigation)
                    break;
                e = 38 == t.keyCode ? -1 : 1,
                viewMode = this.viewMode,
                t.ctrlKey ? viewMode += 2 : t.shiftKey && (viewMode += 1),
                4 == viewMode ? (i = this.moveYear(this.date, e),
                n = this.moveYear(this.viewDate, e)) : 3 == viewMode ? (i = this.moveMonth(this.date, e),
                n = this.moveMonth(this.viewDate, e)) : 2 == viewMode ? (i = this.moveDate(this.date, 7 * e),
                n = this.moveDate(this.viewDate, 7 * e)) : 1 == viewMode ? this.showMeridian ? (i = this.moveHour(this.date, 6 * e),
                n = this.moveHour(this.viewDate, 6 * e)) : (i = this.moveHour(this.date, 4 * e),
                n = this.moveHour(this.viewDate, 4 * e)) : 0 == viewMode && (i = this.moveMinute(this.date, 4 * e),
                n = this.moveMinute(this.viewDate, 4 * e)),
                this.dateWithinRange(i) && (this.date = i,
                this.viewDate = n,
                this.setValue(),
                this.update(),
                t.preventDefault(),
                s = !0);
                break;
            case 13:
                if (0 != this.viewMode) {
                    var a = this.viewMode;
                    this.showMode(-1),
                    this.fill(),
                    a == this.viewMode && this.autoclose && this.hide()
                } else
                    this.fill(),
                    this.autoclose && this.hide();
                t.preventDefault();
                break;
            case 9:
                this.hide()
            }
            if (s) {
                var o;
                this.isInput ? o = this.element : this.component && (o = this.element.find("input")),
                o && o.change(),
                this.element.trigger({
                    type: "changeDate",
                    date: this.date
                })
            }
        },
        showMode: function(t) {
            if (t) {
                var e = Math.max(0, Math.min(s.modes.length - 1, this.viewMode + t));
                e >= this.minView && e <= this.maxView && (this.element.trigger({
                    type: "changeMode",
                    date: this.viewDate,
                    oldViewMode: this.viewMode,
                    newViewMode: e
                }),
                this.viewMode = e)
            }
            this.picker.find(">div").hide().filter(".datetimepicker-" + s.modes[this.viewMode].clsName).css("display", "block"),
            this.updateNavArrows()
        },
        reset: function(t) {
            this._setDate(null, "date")
        },
        convertViewModeText: function(t) {
            switch (t) {
            case 4:
                return "decade";
            case 3:
                return "year";
            case 2:
                return "month";
            case 1:
                return "day";
            case 0:
                return "hour"
            }
        }
    },
    t.fn.datetimepicker = function(e) {
        var n = Array.apply(null, arguments);
        n.shift();
        var s;
        return this.each(function() {
            var a = t(this)
              , o = a.data("datetimepicker")
              , r = "object" == typeof e && e;
            if (o || a.data("datetimepicker", o = new i(this,t.extend({}, t.fn.datetimepicker.defaults, r))),
            "string" == typeof e && "function" == typeof o[e] && void 0 !== (s = o[e].apply(o, n)))
                return !1
        }),
        void 0 !== s ? s : this
    }
    ,
    t.fn.datetimepicker.defaults = {},
    t.fn.datetimepicker.Constructor = i;
    var n = t.fn.datetimepicker.dates = {
        en: {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "至今",
            suffix: [],
            meridiem: ["上午", "下午"]
        }
    }
      , s = {
        modes: [{
            clsName: "minutes",
            navFnc: "Hours",
            navStep: 1
        }, {
            clsName: "hours",
            navFnc: "Date",
            navStep: 1
        }, {
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        }],
        isLeapYear: function(t) {
            return t % 4 == 0 && t % 100 != 0 || t % 400 == 0
        },
        getDaysInMonth: function(t, e) {
            return [31, s.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e]
        },
        getDefaultFormat: function(t, e) {
            if ("standard" == t)
                return "input" == e ? "yyyy-mm-dd hh:ii" : "yyyy-mm-dd hh:ii:ss";
            if ("php" == t)
                return "input" == e ? "Y-m-d H:i" : "Y-m-d H:i:s";
            throw new Error("Invalid format type.")
        },
        validParts: function(t) {
            if ("standard" == t)
                return /hh?|HH?|p|P|ii?|ss?|dd?|DD?|mm?|MM?|yy(?:yy)?/g;
            if ("php" == t)
                return /[dDjlNwzFmMnStyYaABgGhHis]/g;
            throw new Error("Invalid format type.")
        },
        nonpunctuation: /[^ -\/:-@\[-`{-~\t\n\rTZ]+/g,
        parseFormat: function(t, e) {
            var i = t.replace(this.validParts(e), "\0").split("\0")
              , n = t.match(this.validParts(e));
            if (!i || !i.length || !n || 0 == n.length)
                throw new Error("Invalid date format.");
            return {
                separators: i,
                parts: n
            }
        },
        parseDate: function(s, a, o, r) {
            if (s instanceof Date) {
                var l = new Date(s.valueOf() - 6e4 * s.getTimezoneOffset());
                return l.setMilliseconds(0),
                l
            }
            if (/^\d{4}\-\d{1,2}\-\d{1,2}$/.test(s) && (a = this.parseFormat("yyyy-mm-dd", r)),
            /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}$/.test(s) && (a = this.parseFormat("yyyy-mm-dd hh:ii", r)),
            /^\d{4}\-\d{1,2}\-\d{1,2}[T ]\d{1,2}\:\d{1,2}\:\d{1,2}[Z]{0,1}$/.test(s) && (a = this.parseFormat("yyyy-mm-dd hh:ii:ss", r)),
            /^[-+]\d+[dmwy]([\s,]+[-+]\d+[dmwy])*$/.test(s)) {
                var c, d, h = /([-+]\d+)([dmwy])/, u = s.match(/([-+]\d+)([dmwy])/g);
                s = new Date;
                for (var p = 0; p < u.length; p++)
                    switch (c = h.exec(u[p]),
                    d = parseInt(c[1]),
                    c[2]) {
                    case "d":
                        s.setUTCDate(s.getUTCDate() + d);
                        break;
                    case "m":
                        s = i.prototype.moveMonth.call(i.prototype, s, d);
                        break;
                    case "w":
                        s.setUTCDate(s.getUTCDate() + 7 * d);
                        break;
                    case "y":
                        s = i.prototype.moveYear.call(i.prototype, s, d)
                    }
                return e(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate(), s.getUTCHours(), s.getUTCMinutes(), s.getUTCSeconds(), 0)
            }
            var f, m, c, u = s && s.match(this.nonpunctuation) || [], s = new Date(0,0,0,0,0,0,0), g = {}, v = ["hh", "h", "ii", "i", "ss", "s", "yyyy", "yy", "M", "MM", "m", "mm", "D", "DD", "d", "dd", "H", "HH", "p", "P"], w = {
                hh: function(t, e) {
                    return t.setUTCHours(e)
                },
                h: function(t, e) {
                    return t.setUTCHours(e)
                },
                HH: function(t, e) {
                    return t.setUTCHours(12 == e ? 0 : e)
                },
                H: function(t, e) {
                    return t.setUTCHours(12 == e ? 0 : e)
                },
                ii: function(t, e) {
                    return t.setUTCMinutes(e)
                },
                i: function(t, e) {
                    return t.setUTCMinutes(e)
                },
                ss: function(t, e) {
                    return t.setUTCSeconds(e)
                },
                s: function(t, e) {
                    return t.setUTCSeconds(e)
                },
                yyyy: function(t, e) {
                    return t.setUTCFullYear(e)
                },
                yy: function(t, e) {
                    return t.setUTCFullYear(2e3 + e)
                },
                m: function(t, e) {
                    for (e -= 1; e < 0; )
                        e += 12;
                    for (e %= 12,
                    t.setUTCMonth(e); t.getUTCMonth() != e; ) {
                        if (isNaN(t.getUTCMonth()))
                            return t;
                        t.setUTCDate(t.getUTCDate() - 1)
                    }
                    return t
                },
                d: function(t, e) {
                    return t.setUTCDate(e)
                },
                p: function(t, e) {
                    return t.setUTCHours(1 == e ? t.getUTCHours() + 12 : t.getUTCHours())
                }
            };
            if (w.M = w.MM = w.mm = w.m,
            w.dd = w.d,
            w.P = w.p,
            s = e(s.getFullYear(), s.getMonth(), s.getDate(), s.getHours(), s.getMinutes(), s.getSeconds()),
            u.length == a.parts.length) {
                for (var p = 0, b = a.parts.length; p < b; p++) {
                    if (f = parseInt(u[p], 10),
                    c = a.parts[p],
                    isNaN(f))
                        switch (c) {
                        case "MM":
                            m = t(n[o].months).filter(function() {
                                var t = this.slice(0, u[p].length);
                                return t == u[p].slice(0, t.length)
                            }),
                            f = t.inArray(m[0], n[o].months) + 1;
                            break;
                        case "M":
                            m = t(n[o].monthsShort).filter(function() {
                                var t = this.slice(0, u[p].length)
                                  , e = u[p].slice(0, t.length);
                                return t.toLowerCase() == e.toLowerCase()
                            }),
                            f = t.inArray(m[0], n[o].monthsShort) + 1;
                            break;
                        case "p":
                        case "P":
                            f = t.inArray(u[p].toLowerCase(), n[o].meridiem)
                        }
                    g[c] = f
                }
                for (var y, p = 0; p < v.length; p++)
                    (y = v[p])in g && !isNaN(g[y]) && w[y](s, g[y])
            }
            return s
        },
        formatDate: function(e, i, a, o) {
            if (null == e)
                return "";
            var r;
            if ("standard" == o)
                r = {
                    yy: e.getUTCFullYear().toString().substring(2),
                    yyyy: e.getUTCFullYear(),
                    m: e.getUTCMonth() + 1,
                    M: n[a].monthsShort[e.getUTCMonth()],
                    MM: n[a].months[e.getUTCMonth()],
                    d: e.getUTCDate(),
                    D: n[a].daysShort[e.getUTCDay()],
                    DD: n[a].days[e.getUTCDay()],
                    p: 2 == n[a].meridiem.length ? n[a].meridiem[e.getUTCHours() < 12 ? 0 : 1] : "",
                    h: e.getUTCHours(),
                    i: e.getUTCMinutes(),
                    s: e.getUTCSeconds()
                },
                2 == n[a].meridiem.length ? r.H = r.h % 12 == 0 ? 12 : r.h % 12 : r.H = r.h,
                r.HH = (r.H < 10 ? "0" : "") + r.H,
                r.P = r.p.toUpperCase(),
                r.hh = (r.h < 10 ? "0" : "") + r.h,
                r.ii = (r.i < 10 ? "0" : "") + r.i,
                r.ss = (r.s < 10 ? "0" : "") + r.s,
                r.dd = (r.d < 10 ? "0" : "") + r.d,
                r.mm = (r.m < 10 ? "0" : "") + r.m;
            else {
                if ("php" != o)
                    throw new Error("Invalid format type.");
                r = {
                    y: e.getUTCFullYear().toString().substring(2),
                    Y: e.getUTCFullYear(),
                    F: n[a].months[e.getUTCMonth()],
                    M: n[a].monthsShort[e.getUTCMonth()],
                    n: e.getUTCMonth() + 1,
                    t: s.getDaysInMonth(e.getUTCFullYear(), e.getUTCMonth()),
                    j: e.getUTCDate(),
                    l: n[a].days[e.getUTCDay()],
                    D: n[a].daysShort[e.getUTCDay()],
                    w: e.getUTCDay(),
                    N: 0 == e.getUTCDay() ? 7 : e.getUTCDay(),
                    S: e.getUTCDate() % 10 <= n[a].suffix.length ? n[a].suffix[e.getUTCDate() % 10 - 1] : "",
                    a: 2 == n[a].meridiem.length ? n[a].meridiem[e.getUTCHours() < 12 ? 0 : 1] : "",
                    g: e.getUTCHours() % 12 == 0 ? 12 : e.getUTCHours() % 12,
                    G: e.getUTCHours(),
                    i: e.getUTCMinutes(),
                    s: e.getUTCSeconds()
                },
                r.m = (r.n < 10 ? "0" : "") + r.n,
                r.d = (r.j < 10 ? "0" : "") + r.j,
                r.A = r.a.toString().toUpperCase(),
                r.h = (r.g < 10 ? "0" : "") + r.g,
                r.H = (r.G < 10 ? "0" : "") + r.G,
                r.i = (r.i < 10 ? "0" : "") + r.i,
                r.s = (r.s < 10 ? "0" : "") + r.s
            }
            for (var e = [], l = t.extend([], i.separators), c = 0, d = i.parts.length; c < d; c++)
                l.length && e.push(l.shift()),
                e.push(r[i.parts[c]]);
            return l.length && e.push(l.shift()),
            e.join("")
        },
        convertViewMode: function(t) {
            switch (t) {
            case 4:
            case "decade":
                t = 4;
                break;
            case 3:
            case "year":
                t = 3;
                break;
            case 2:
            case "month":
                t = 2;
                break;
            case 1:
            case "day":
                t = 1;
                break;
            case 0:
            case "hour":
                t = 0
            }
            return t
        },
        headTemplate: '<thead><tr><th class="prev"><i class="fz fz-arrow-left"></i></th><th colspan="5" class="switch"></th><th class="next"><i class="fz fz-arrow-right"></i></th></tr></thead>',
        headTemplateV3: '<thead><tr><th class="prev"><span class="glyphicon glyphicon-arrow-left"></span> </th><th colspan="5" class="switch"></th><th class="next"><span class="glyphicon glyphicon-arrow-right"></span> </th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
        footTemplate: '<tfoot class="tfoot"><tr><th colspan="7" class="today"></th></tr></tfoot>'
    };
    s.template = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-hours"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-days"><table class="table-condensed">' + s.headTemplate + "<tbody></tbody>" + s.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + s.headTemplate + s.contTemplate + s.footTemplate + "</table></div></div>",
    s.templateV3 = '<div class="datetimepicker"><div class="datetimepicker-minutes"><table class=" table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-hours"><table class=" table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-days"><table class=" table-condensed">' + s.headTemplateV3 + "<tbody></tbody>" + s.footTemplate + '</table></div><div class="datetimepicker-months"><table class="table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + '</table></div><div class="datetimepicker-years"><table class="table-condensed">' + s.headTemplateV3 + s.contTemplate + s.footTemplate + "</table></div></div>",
    t.fn.datetimepicker.DPGlobal = s,
    t.fn.datetimepicker.noConflict = function() {
        return t.fn.datetimepicker = old,
        this
    }
    ,
    t(document).on("focus.datetimepicker.data-api click.datetimepicker.data-api", '[data-provide="datetimepicker"]', function(e) {
        var i = t(this);
        i.data("datetimepicker") || (e.preventDefault(),
        i.datetimepicker("show"))
    }),
    t(function() {
        t('[data-provide="datetimepicker-inline"]').datetimepicker()
    })
}(window.jQuery),
function(t) {
    var e = 0
      , i = Array.prototype.slice;
    t.cleanData = function(e) {
        return function(i) {
            var n, s, a;
            for (a = 0; null != (s = i[a]); a++)
                try {
                    (n = t._data(s, "events")) && n.remove && t(s).triggerHandler("remove")
                } catch (t) {}
            e(i)
        }
    }(t.cleanData),
    t.widget = function(e, i, n) {
        var s, a, o, r, l = {}, c = e.split(".")[0];
        return e = e.split(".")[1],
        s = c + "-" + e,
        n || (n = i,
        i = t.Widget),
        t.expr[":"][s.toLowerCase()] = function(e) {
            return !!t.data(e, s)
        }
        ,
        t[c] = t[c] || {},
        a = t[c][e],
        o = t[c][e] = function(t, e) {
            return this._createWidget ? void (arguments.length && this._createWidget(t, e)) : new o(t,e)
        }
        ,
        t.extend(o, a, {
            version: n.version,
            _proto: t.extend({}, n),
            _childConstructors: []
        }),
        r = new i,
        r.options = t.widget.extend({}, r.options),
        t.each(n, function(e, n) {
            return t.isFunction(n) ? void (l[e] = function() {
                var t = function() {
                    return i.prototype[e].apply(this, arguments)
                }
                  , s = function(t) {
                    return i.prototype[e].apply(this, t)
                };
                return function() {
                    var e, i = this._super, a = this._superApply;
                    return this._super = t,
                    this._superApply = s,
                    e = n.apply(this, arguments),
                    this._super = i,
                    this._superApply = a,
                    e
                }
            }()) : void (l[e] = n)
        }),
        o.prototype = t.widget.extend(r, {
            widgetEventPrefix: a ? r.widgetEventPrefix || e : e
        }, l, {
            constructor: o,
            namespace: c,
            widgetName: e,
            widgetFullName: s
        }),
        a ? (t.each(a._childConstructors, function(e, i) {
            var n = i.prototype;
            t.widget(n.namespace + "." + n.widgetName, o, i._proto)
        }),
        delete a._childConstructors) : i._childConstructors.push(o),
        t.widget.bridge(e, o),
        o
    }
    ,
    t.widget.extend = function(e) {
        for (var n, s, a = i.call(arguments, 1), o = 0, r = a.length; r > o; o++)
            for (n in a[o])
                s = a[o][n],
                a[o].hasOwnProperty(n) && void 0 !== s && (e[n] = t.isPlainObject(s) ? t.isPlainObject(e[n]) ? t.widget.extend({}, e[n], s) : t.widget.extend({}, s) : s);
        return e
    }
    ,
    t.widget.bridge = function(e, n) {
        var s = n.prototype.widgetFullName || e;
        t.fn[e] = function(a) {
            var o = "string" == typeof a
              , r = i.call(arguments, 1)
              , l = this;
            return o ? this.each(function() {
                var i, n = t.data(this, s);
                return "instance" === a ? (l = n,
                !1) : n ? t.isFunction(n[a]) && "_" !== a.charAt(0) ? (i = n[a].apply(n, r),
                i !== n && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i,
                !1) : void 0) : t.error("no such method '" + a + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; attempted to call method '" + a + "'")
            }) : (r.length && (a = t.widget.extend.apply(null, [a].concat(r))),
            this.each(function() {
                var e = t.data(this, s);
                e ? (e.option(a || {}),
                e._init && e._init()) : t.data(this, s, new n(a,this))
            })),
            l
        }
    }
    ,
    t.Widget = function() {}
    ,
    t.Widget._childConstructors = [],
    t.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(i, n) {
            n = t(n || this.defaultElement || this)[0],
            this.element = t(n),
            this.uuid = e++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.bindings = t(),
            this.hoverable = t(),
            this.focusable = t(),
            n !== this && (t.data(n, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(t) {
                    t.target === n && this.destroy()
                }
            }),
            this.document = t(n.style ? n.ownerDocument : n.document || n),
            this.window = t(this.document[0].defaultView || this.document[0].parentWindow)),
            this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: t.noop,
        _getCreateEventData: t.noop,
        _create: t.noop,
        _init: t.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: t.noop,
        widget: function() {
            return this.element
        },
        option: function(e, i) {
            var n, s, a, o = e;
            if (0 === arguments.length)
                return t.widget.extend({}, this.options);
            if ("string" == typeof e)
                if (o = {},
                n = e.split("."),
                e = n.shift(),
                n.length) {
                    for (s = o[e] = t.widget.extend({}, this.options[e]),
                    a = 0; a < n.length - 1; a++)
                        s[n[a]] = s[n[a]] || {},
                        s = s[n[a]];
                    if (e = n.pop(),
                    1 === arguments.length)
                        return void 0 === s[e] ? null : s[e];
                    s[e] = i
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[e] ? null : this.options[e];
                    o[e] = i
                }
            return this._setOptions(o),
            this
        },
        _setOptions: function(t) {
            var e;
            for (e in t)
                this._setOption(e, t[e]);
            return this
        },
        _setOption: function(t, e) {
            return this.options[t] = e,
            "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!e),
            e && (this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus"))),
            this
        },
        enable: function() {
            return this._setOptions({
                disabled: !1
            })
        },
        disable: function() {
            return this._setOptions({
                disabled: !0
            })
        },
        _on: function(e, i, n) {
            var s, a = this;
            "boolean" != typeof e && (n = i,
            i = e,
            e = !1),
            n ? (i = s = t(i),
            this.bindings = this.bindings.add(i)) : (n = i,
            i = this.element,
            s = this.widget()),
            t.each(n, function(n, o) {
                function r() {
                    return e || a.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof o ? a[o] : o).apply(a, arguments) : void 0
                }
                "string" != typeof o && (r.guid = o.guid = o.guid || r.guid || t.guid++);
                var l = n.match(/^([\w:-]*)\s*(.*)$/)
                  , c = l[1] + a.eventNamespace
                  , d = l[2];
                d ? s.delegate(d, c, r) : i.bind(c, r)
            })
        },
        _off: function(e, i) {
            i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            e.unbind(i).undelegate(i),
            this.bindings = t(this.bindings.not(e).get()),
            this.focusable = t(this.focusable.not(e).get()),
            this.hoverable = t(this.hoverable.not(e).get())
        },
        _delay: function(t, e) {
            function i() {
                return ("string" == typeof t ? n[t] : t).apply(n, arguments)
            }
            var n = this;
            return setTimeout(i, e || 0)
        },
        _hoverable: function(e) {
            this.hoverable = this.hoverable.add(e),
            this._on(e, {
                mouseenter: function(e) {
                    t(e.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(e) {
                    t(e.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(e) {
            this.focusable = this.focusable.add(e),
            this._on(e, {
                focusin: function(e) {
                    t(e.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(e) {
                    t(e.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(e, i, n) {
            var s, a, o = this.options[e];
            if (n = n || {},
            i = t.Event(i),
            i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(),
            i.target = this.element[0],
            a = i.originalEvent)
                for (s in a)
                    s in i || (i[s] = a[s]);
            return this.element.trigger(i, n),
            !(t.isFunction(o) && o.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
        }
    },
    t.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(e, i) {
        t.Widget.prototype["_" + e] = function(n, s, a) {
            "string" == typeof s && (s = {
                effect: s
            });
            var o, r = s ? s === !0 || "number" == typeof s ? i : s.effect || i : e;
            s = s || {},
            "number" == typeof s && (s = {
                duration: s
            }),
            o = !t.isEmptyObject(s),
            s.complete = a,
            s.delay && n.delay(s.delay),
            o && t.effects && t.effects.effect[r] ? n[e](s) : r !== e && n[r] ? n[r](s.duration, s.easing, a) : n.queue(function(i) {
                t(this)[e](),
                a && a.call(n[0]),
                i()
            })
        }
    }),
    t.widget
}(jQuery),
function(t) {
    "use strict";
    var e = 0;
    t.ajaxTransport("iframe", function(i) {
        if (i.async) {
            var n, s, a, o = i.initialIframeSrc || "javascript:false;";
            return {
                send: function(r, l) {
                    n = t('<form style="display:none;"></form>'),
                    n.attr("accept-charset", i.formAcceptCharset),
                    a = /\?/.test(i.url) ? "&" : "?",
                    "DELETE" === i.type ? (i.url = i.url + a + "_method=DELETE",
                    i.type = "POST") : "PUT" === i.type ? (i.url = i.url + a + "_method=PUT",
                    i.type = "POST") : "PATCH" === i.type && (i.url = i.url + a + "_method=PATCH",
                    i.type = "POST"),
                    e += 1,
                    s = t('<iframe src="' + o + '" name="iframe-transport-' + e + '"></iframe>').bind("load", function() {
                        var e, a = t.isArray(i.paramName) ? i.paramName : [i.paramName];
                        s.unbind("load").bind("load", function() {
                            var e;
                            try {
                                if (e = s.contents(),
                                !e.length || !e[0].firstChild)
                                    throw new Error
                            } catch (t) {
                                e = void 0
                            }
                            l(200, "success", {
                                iframe: e
                            }),
                            t('<iframe src="' + o + '"></iframe>').appendTo(n),
                            window.setTimeout(function() {
                                n.remove()
                            }, 0)
                        }),
                        n.prop("target", s.prop("name")).prop("action", i.url).prop("method", i.type),
                        i.formData && t.each(i.formData, function(e, i) {
                            t('<input type="hidden"/>').prop("name", i.name).val(i.value).appendTo(n)
                        }),
                        i.fileInput && i.fileInput.length && "POST" === i.type && (e = i.fileInput.clone(),
                        i.fileInput.after(function(t) {
                            return e[t]
                        }),
                        i.paramName && i.fileInput.each(function(e) {
                            t(this).prop("name", a[e] || i.paramName)
                        }),
                        n.append(i.fileInput).prop("enctype", "multipart/form-data").prop("encoding", "multipart/form-data"),
                        i.fileInput.removeAttr("form")),
                        n.submit(),
                        e && e.length && i.fileInput.each(function(i, n) {
                            var s = t(e[i]);
                            t(n).prop("name", s.prop("name")).attr("form", s.attr("form")),
                            s.replaceWith(n)
                        })
                    }),
                    n.append(s).appendTo(document.body)
                },
                abort: function() {
                    s && s.unbind("load").prop("src", o),
                    n && n.remove()
                }
            }
        }
    }),
    t.ajaxSetup({
        converters: {
            "iframe text": function(e) {
                return e && t(e[0].body).text()
            },
            "iframe json": function(e) {
                return e && t.parseJSON(t(e[0].body).text())
            },
            "iframe html": function(e) {
                return e && t(e[0].body).html()
            },
            "iframe xml": function(e) {
                var i = e && e[0];
                return i && t.isXMLDoc(i) ? i : t.parseXML(i.XMLDocument && i.XMLDocument.xml || t(i.body).html())
            },
            "iframe script": function(e) {
                return e && t.globalEval(t(e[0].body).text())
            }
        }
    })
}(jQuery),
function(t) {
    "use strict";
    function e(e) {
        var i = "dragover" === e;
        return function(n) {
            n.dataTransfer = n.originalEvent && n.originalEvent.dataTransfer;
            var s = n.dataTransfer;
            s && -1 !== t.inArray("Files", s.types) && this._trigger(e, t.Event(e, {
                delegatedEvent: n
            })) !== !1 && (n.preventDefault(),
            i && (s.dropEffect = "copy"))
        }
    }
    t.support.fileInput = !(new RegExp("(Android (1\\.[0156]|2\\.[01]))|(Windows Phone (OS 7|8\\.0))|(XBLWP)|(ZuneWP)|(WPDesktop)|(w(eb)?OSBrowser)|(webOS)|(Kindle/(1\\.0|2\\.[05]|3\\.0))").test(window.navigator.userAgent) || t('<input type="file">').prop("disabled")),
    t.support.xhrFileUpload = !(!window.ProgressEvent || !window.FileReader),
    t.support.xhrFormDataFileUpload = !!window.FormData,
    t.support.blobSlice = window.Blob && (Blob.prototype.slice || Blob.prototype.webkitSlice || Blob.prototype.mozSlice),
    t.widget("blueimp.fileupload", {
        options: {
            dropZone: t(document),
            pasteZone: void 0,
            fileInput: void 0,
            replaceFileInput: !0,
            paramName: void 0,
            singleFileUploads: !0,
            limitMultiFileUploads: void 0,
            limitMultiFileUploadSize: void 0,
            limitMultiFileUploadSizeOverhead: 512,
            sequentialUploads: !1,
            limitConcurrentUploads: void 0,
            forceIframeTransport: !1,
            redirect: void 0,
            redirectParamName: void 0,
            postMessage: void 0,
            multipart: !0,
            maxChunkSize: void 0,
            uploadedBytes: void 0,
            recalculateProgress: !0,
            progressInterval: 100,
            bitrateInterval: 500,
            autoUpload: !0,
            messages: {
                uploadedBytes: "Uploaded bytes exceed file size"
            },
            i18n: function(e, i) {
                return e = this.messages[e] || e.toString(),
                i && t.each(i, function(t, i) {
                    e = e.replace("{" + t + "}", i)
                }),
                e
            },
            formData: function(t) {
                return t.serializeArray()
            },
            add: function(e, i) {
                return !e.isDefaultPrevented() && void ((i.autoUpload || i.autoUpload !== !1 && t(this).fileupload("option", "autoUpload")) && i.process().done(function() {
                    i.submit()
                }))
            },
            processData: !1,
            contentType: !1,
            cache: !1,
            timeout: 0
        },
        _specialOptions: ["fileInput", "dropZone", "pasteZone", "multipart", "forceIframeTransport"],
        _blobSlice: t.support.blobSlice && function() {
            return (this.slice || this.webkitSlice || this.mozSlice).apply(this, arguments)
        }
        ,
        _BitrateTimer: function() {
            this.timestamp = Date.now ? Date.now() : (new Date).getTime(),
            this.loaded = 0,
            this.bitrate = 0,
            this.getBitrate = function(t, e, i) {
                var n = t - this.timestamp;
                return (!this.bitrate || !i || n > i) && (this.bitrate = 8 * (e - this.loaded) * (1e3 / n),
                this.loaded = e,
                this.timestamp = t),
                this.bitrate
            }
        },
        _isXHRUpload: function(e) {
            return !e.forceIframeTransport && (!e.multipart && t.support.xhrFileUpload || t.support.xhrFormDataFileUpload)
        },
        _getFormData: function(e) {
            var i;
            return "function" === t.type(e.formData) ? e.formData(e.form) : t.isArray(e.formData) ? e.formData : "object" === t.type(e.formData) ? (i = [],
            t.each(e.formData, function(t, e) {
                i.push({
                    name: t,
                    value: e
                })
            }),
            i) : []
        },
        _getTotal: function(e) {
            var i = 0;
            return t.each(e, function(t, e) {
                i += e.size || 1
            }),
            i
        },
        _initProgressObject: function(e) {
            var i = {
                loaded: 0,
                total: 0,
                bitrate: 0
            };
            e._progress ? t.extend(e._progress, i) : e._progress = i
        },
        _initResponseObject: function(t) {
            var e;
            if (t._response)
                for (e in t._response)
                    t._response.hasOwnProperty(e) && delete t._response[e];
            else
                t._response = {}
        },
        _onProgress: function(e, i) {
            if (e.lengthComputable) {
                var n, s = Date.now ? Date.now() : (new Date).getTime();
                if (i._time && i.progressInterval && s - i._time < i.progressInterval && e.loaded !== e.total)
                    return;
                i._time = s,
                n = Math.floor(e.loaded / e.total * (i.chunkSize || i._progress.total)) + (i.uploadedBytes || 0),
                this._progress.loaded += n - i._progress.loaded,
                this._progress.bitrate = this._bitrateTimer.getBitrate(s, this._progress.loaded, i.bitrateInterval),
                i._progress.loaded = i.loaded = n,
                i._progress.bitrate = i.bitrate = i._bitrateTimer.getBitrate(s, n, i.bitrateInterval),
                this._trigger("progress", t.Event("progress", {
                    delegatedEvent: e
                }), i),
                this._trigger("progressall", t.Event("progressall", {
                    delegatedEvent: e
                }), this._progress)
            }
        },
        _initProgressListener: function(e) {
            var i = this
              , n = e.xhr ? e.xhr() : t.ajaxSettings.xhr();
            n.upload && (t(n.upload).bind("progress", function(t) {
                var n = t.originalEvent;
                t.lengthComputable = n.lengthComputable,
                t.loaded = n.loaded,
                t.total = n.total,
                i._onProgress(t, e)
            }),
            e.xhr = function() {
                return n
            }
            )
        },
        _isInstanceOf: function(t, e) {
            return Object.prototype.toString.call(e) === "[object " + t + "]"
        },
        _initXHRData: function(e) {
            var i, n = this, s = e.files[0], a = e.multipart || !t.support.xhrFileUpload, o = "array" === t.type(e.paramName) ? e.paramName[0] : e.paramName;
            e.headers = t.extend({}, e.headers),
            e.contentRange && (e.headers["Content-Range"] = e.contentRange),
            a && !e.blob && this._isInstanceOf("File", s) || (e.headers["Content-Disposition"] = 'attachment; filename="' + encodeURI(s.name) + '"'),
            a ? t.support.xhrFormDataFileUpload && (e.postMessage ? (i = this._getFormData(e),
            e.blob ? i.push({
                name: o,
                value: e.blob
            }) : t.each(e.files, function(n, s) {
                i.push({
                    name: "array" === t.type(e.paramName) && e.paramName[n] || o,
                    value: s
                })
            })) : (n._isInstanceOf("FormData", e.formData) ? i = e.formData : (i = new FormData,
            t.each(this._getFormData(e), function(t, e) {
                i.append(e.name, e.value)
            })),
            e.blob ? i.append(o, e.blob, s.name) : t.each(e.files, function(s, a) {
                (n._isInstanceOf("File", a) || n._isInstanceOf("Blob", a)) && i.append("array" === t.type(e.paramName) && e.paramName[s] || o, a, a.uploadName || a.name)
            })),
            e.data = i) : (e.contentType = s.type || "application/octet-stream",
            e.data = e.blob || s),
            e.blob = null
        },
        _initIframeSettings: function(e) {
            var i = t("<a></a>").prop("href", e.url).prop("host");
            e.dataType = "iframe " + (e.dataType || ""),
            e.formData = this._getFormData(e),
            e.redirect && i && i !== location.host && e.formData.push({
                name: e.redirectParamName || "redirect",
                value: e.redirect
            })
        },
        _initDataSettings: function(t) {
            this._isXHRUpload(t) ? (this._chunkedUpload(t, !0) || (t.data || this._initXHRData(t),
            this._initProgressListener(t)),
            t.postMessage && (t.dataType = "postmessage " + (t.dataType || ""))) : this._initIframeSettings(t)
        },
        _getParamName: function(e) {
            var i = t(e.fileInput)
              , n = e.paramName;
            return n ? t.isArray(n) || (n = [n]) : (n = [],
            i.each(function() {
                for (var e = t(this), i = e.prop("name") || "files[]", s = (e.prop("files") || [1]).length; s; )
                    n.push(i),
                    s -= 1
            }),
            n.length || (n = [i.prop("name") || "files[]"])),
            n
        },
        _initFormSettings: function(e) {
            e.form && e.form.length || (e.form = t(e.fileInput.prop("form")),
            e.form.length || (e.form = t(this.options.fileInput.prop("form")))),
            e.paramName = this._getParamName(e),
            e.url || (e.url = e.form.prop("action") || location.href),
            e.type = (e.type || "string" === t.type(e.form.prop("method")) && e.form.prop("method") || "").toUpperCase(),
            "POST" !== e.type && "PUT" !== e.type && "PATCH" !== e.type && (e.type = "POST"),
            e.formAcceptCharset || (e.formAcceptCharset = e.form.attr("accept-charset"))
        },
        _getAJAXSettings: function(e) {
            var i = t.extend({}, this.options, e);
            return this._initFormSettings(i),
            this._initDataSettings(i),
            i
        },
        _getDeferredState: function(t) {
            return t.state ? t.state() : t.isResolved() ? "resolved" : t.isRejected() ? "rejected" : "pending"
        },
        _enhancePromise: function(t) {
            return t.success = t.done,
            t.error = t.fail,
            t.complete = t.always,
            t
        },
        _getXHRPromise: function(e, i, n) {
            var s = t.Deferred()
              , a = s.promise();
            return i = i || this.options.context || a,
            e === !0 ? s.resolveWith(i, n) : e === !1 && s.rejectWith(i, n),
            a.abort = s.promise,
            this._enhancePromise(a)
        },
        _addConvenienceMethods: function(e, i) {
            var n = this
              , s = function(e) {
                return t.Deferred().resolveWith(n, e).promise()
            };
            i.process = function(e, a) {
                return (e || a) && (i._processQueue = this._processQueue = (this._processQueue || s([this])).then(function() {
                    return i.errorThrown ? t.Deferred().rejectWith(n, [i]).promise() : s(arguments)
                }).then(e, a)),
                this._processQueue || s([this])
            }
            ,
            i.submit = function() {
                return "pending" !== this.state() && (i.jqXHR = this.jqXHR = n._trigger("submit", t.Event("submit", {
                    delegatedEvent: e
                }), this) !== !1 && n._onSend(e, this)),
                this.jqXHR || n._getXHRPromise()
            }
            ,
            i.abort = function() {
                return this.jqXHR ? this.jqXHR.abort() : (this.errorThrown = "abort",
                n._trigger("fail", null, this),
                n._getXHRPromise(!1))
            }
            ,
            i.state = function() {
                return this.jqXHR ? n._getDeferredState(this.jqXHR) : this._processQueue ? n._getDeferredState(this._processQueue) : void 0
            }
            ,
            i.processing = function() {
                return !this.jqXHR && this._processQueue && "pending" === n._getDeferredState(this._processQueue)
            }
            ,
            i.progress = function() {
                return this._progress
            }
            ,
            i.response = function() {
                return this._response
            }
        },
        _getUploadedBytes: function(t) {
            var e = t.getResponseHeader("Range")
              , i = e && e.split("-")
              , n = i && i.length > 1 && parseInt(i[1], 10);
            return n && n + 1
        },
        _chunkedUpload: function(e, i) {
            e.uploadedBytes = e.uploadedBytes || 0;
            var n, s, a = this, o = e.files[0], r = o.size, l = e.uploadedBytes, c = e.maxChunkSize || r, d = this._blobSlice, h = t.Deferred(), u = h.promise();
            return !(!(this._isXHRUpload(e) && d && (l || r > c)) || e.data) && (!!i || (l >= r ? (o.error = e.i18n("uploadedBytes"),
            this._getXHRPromise(!1, e.context, [null, "error", o.error])) : (s = function() {
                var i = t.extend({}, e)
                  , u = i._progress.loaded;
                i.blob = d.call(o, l, l + c, o.type),
                i.chunkSize = i.blob.size,
                i.contentRange = "bytes " + l + "-" + (l + i.chunkSize - 1) + "/" + r,
                a._initXHRData(i),
                a._initProgressListener(i),
                n = (a._trigger("chunksend", null, i) !== !1 && t.ajax(i) || a._getXHRPromise(!1, i.context)).done(function(n, o, c) {
                    l = a._getUploadedBytes(c) || l + i.chunkSize,
                    u + i.chunkSize - i._progress.loaded && a._onProgress(t.Event("progress", {
                        lengthComputable: !0,
                        loaded: l - i.uploadedBytes,
                        total: l - i.uploadedBytes
                    }), i),
                    e.uploadedBytes = i.uploadedBytes = l,
                    i.result = n,
                    i.textStatus = o,
                    i.jqXHR = c,
                    a._trigger("chunkdone", null, i),
                    a._trigger("chunkalways", null, i),
                    r > l ? s() : h.resolveWith(i.context, [n, o, c])
                }).fail(function(t, e, n) {
                    i.jqXHR = t,
                    i.textStatus = e,
                    i.errorThrown = n,
                    a._trigger("chunkfail", null, i),
                    a._trigger("chunkalways", null, i),
                    h.rejectWith(i.context, [t, e, n])
                })
            }
            ,
            this._enhancePromise(u),
            u.abort = function() {
                return n.abort()
            }
            ,
            s(),
            u)))
        },
        _beforeSend: function(t, e) {
            0 === this._active && (this._trigger("start"),
            this._bitrateTimer = new this._BitrateTimer,
            this._progress.loaded = this._progress.total = 0,
            this._progress.bitrate = 0),
            this._initResponseObject(e),
            this._initProgressObject(e),
            e._progress.loaded = e.loaded = e.uploadedBytes || 0,
            e._progress.total = e.total = this._getTotal(e.files) || 1,
            e._progress.bitrate = e.bitrate = 0,
            this._active += 1,
            this._progress.loaded += e.loaded,
            this._progress.total += e.total
        },
        _onDone: function(e, i, n, s) {
            var a = s._progress.total
              , o = s._response;
            s._progress.loaded < a && this._onProgress(t.Event("progress", {
                lengthComputable: !0,
                loaded: a,
                total: a
            }), s),
            o.result = s.result = e,
            o.textStatus = s.textStatus = i,
            o.jqXHR = s.jqXHR = n,
            this._trigger("done", null, s)
        },
        _onFail: function(t, e, i, n) {
            var s = n._response;
            n.recalculateProgress && (this._progress.loaded -= n._progress.loaded,
            this._progress.total -= n._progress.total),
            s.jqXHR = n.jqXHR = t,
            s.textStatus = n.textStatus = e,
            s.errorThrown = n.errorThrown = i,
            this._trigger("fail", null, n)
        },
        _onAlways: function(t, e, i, n) {
            this._trigger("always", null, n)
        },
        _onSend: function(e, i) {
            i.submit || this._addConvenienceMethods(e, i);
            var n, s, a, o, r = this, l = r._getAJAXSettings(i), c = function() {
                return r._sending += 1,
                l._bitrateTimer = new r._BitrateTimer,
                n = n || ((s || r._trigger("send", t.Event("send", {
                    delegatedEvent: e
                }), l) === !1) && r._getXHRPromise(!1, l.context, s) || r._chunkedUpload(l) || t.ajax(l)).done(function(t, e, i) {
                    r._onDone(t, e, i, l)
                }).fail(function(t, e, i) {
                    r._onFail(t, e, i, l)
                }).always(function(t, e, i) {
                    if (r._onAlways(t, e, i, l),
                    r._sending -= 1,
                    r._active -= 1,
                    l.limitConcurrentUploads && l.limitConcurrentUploads > r._sending)
                        for (var n = r._slots.shift(); n; ) {
                            if ("pending" === r._getDeferredState(n)) {
                                n.resolve();
                                break
                            }
                            n = r._slots.shift()
                        }
                    0 === r._active && r._trigger("stop")
                })
            };
            return this._beforeSend(e, l),
            this.options.sequentialUploads || this.options.limitConcurrentUploads && this.options.limitConcurrentUploads <= this._sending ? (this.options.limitConcurrentUploads > 1 ? (a = t.Deferred(),
            this._slots.push(a),
            o = a.then(c)) : (this._sequence = this._sequence.then(c, c),
            o = this._sequence),
            o.abort = function() {
                return s = [void 0, "abort", "abort"],
                n ? n.abort() : (a && a.rejectWith(l.context, s),
                c())
            }
            ,
            this._enhancePromise(o)) : c()
        },
        _onAdd: function(e, i) {
            var n, s, a, o, r = this, l = !0, c = t.extend({}, this.options, i), d = i.files, h = d.length, u = c.limitMultiFileUploads, p = c.limitMultiFileUploadSize, f = c.limitMultiFileUploadSizeOverhead, m = 0, g = this._getParamName(c), v = 0;
            if (!h)
                return !1;
            if (p && void 0 === d[0].size && (p = void 0),
            (c.singleFileUploads || u || p) && this._isXHRUpload(c))
                if (c.singleFileUploads || p || !u)
                    if (!c.singleFileUploads && p)
                        for (a = [],
                        n = [],
                        o = 0; h > o; o += 1)
                            m += d[o].size + f,
                            (o + 1 === h || m + d[o + 1].size + f > p || u && o + 1 - v >= u) && (a.push(d.slice(v, o + 1)),
                            s = g.slice(v, o + 1),
                            s.length || (s = g),
                            n.push(s),
                            v = o + 1,
                            m = 0);
                    else
                        n = g;
                else
                    for (a = [],
                    n = [],
                    o = 0; h > o; o += u)
                        a.push(d.slice(o, o + u)),
                        s = g.slice(o, o + u),
                        s.length || (s = g),
                        n.push(s);
            else
                a = [d],
                n = [g];
            return i.originalFiles = d,
            t.each(a || d, function(s, o) {
                var c = t.extend({}, i);
                return c.files = a ? o : [o],
                c.paramName = n[s],
                r._initResponseObject(c),
                r._initProgressObject(c),
                r._addConvenienceMethods(e, c),
                l = r._trigger("add", t.Event("add", {
                    delegatedEvent: e
                }), c)
            }),
            l
        },
        _replaceFileInput: function(e) {
            var i = e.fileInput
              , n = i.clone(!0)
              , s = i.is(document.activeElement);
            e.fileInputClone = n,
            t("<form></form>").append(n)[0].reset(),
            i.after(n).detach(),
            s && n.focus(),
            t.cleanData(i.unbind("remove")),
            this.options.fileInput = this.options.fileInput.map(function(t, e) {
                return e === i[0] ? n[0] : e
            }),
            i[0] === this.element[0] && (this.element = n)
        },
        _handleFileTreeEntry: function(e, i) {
            var n, s = this, a = t.Deferred(), o = function(t) {
                t && !t.entry && (t.entry = e),
                a.resolve([t])
            }, r = function(t) {
                s._handleFileTreeEntries(t, i + e.name + "/").done(function(t) {
                    a.resolve(t)
                }).fail(o)
            }, l = function() {
                n.readEntries(function(t) {
                    t.length ? (c = c.concat(t),
                    l()) : r(c)
                }, o)
            }, c = [];
            return i = i || "",
            e.isFile ? e._file ? (e._file.relativePath = i,
            a.resolve(e._file)) : e.file(function(t) {
                t.relativePath = i,
                a.resolve(t)
            }, o) : e.isDirectory ? (n = e.createReader(),
            l()) : a.resolve([]),
            a.promise()
        },
        _handleFileTreeEntries: function(e, i) {
            var n = this;
            return t.when.apply(t, t.map(e, function(t) {
                return n._handleFileTreeEntry(t, i)
            })).then(function() {
                return Array.prototype.concat.apply([], arguments)
            })
        },
        _getDroppedFiles: function(e) {
            e = e || {};
            var i = e.items;
            return i && i.length && (i[0].webkitGetAsEntry || i[0].getAsEntry) ? this._handleFileTreeEntries(t.map(i, function(t) {
                var e;
                return t.webkitGetAsEntry ? (e = t.webkitGetAsEntry(),
                e && (e._file = t.getAsFile()),
                e) : t.getAsEntry()
            })) : t.Deferred().resolve(t.makeArray(e.files)).promise()
        },
        _getSingleFileInputFiles: function(e) {
            e = t(e);
            var i, n, s = e.prop("webkitEntries") || e.prop("entries");
            if (s && s.length)
                return this._handleFileTreeEntries(s);
            if (i = t.makeArray(e.prop("files")),
            i.length)
                void 0 === i[0].name && i[0].fileName && t.each(i, function(t, e) {
                    e.name = e.fileName,
                    e.size = e.fileSize
                });
            else {
                if (!(n = e.prop("value")))
                    return t.Deferred().resolve([]).promise();
                i = [{
                    name: n.replace(/^.*\\/, "")
                }]
            }
            return t.Deferred().resolve(i).promise()
        },
        _getFileInputFiles: function(e) {
            return e instanceof t && 1 !== e.length ? t.when.apply(t, t.map(e, this._getSingleFileInputFiles)).then(function() {
                return Array.prototype.concat.apply([], arguments)
            }) : this._getSingleFileInputFiles(e)
        },
        _onChange: function(e) {
            var i = this
              , n = {
                fileInput: t(e.target),
                form: t(e.target.form)
            };
            this._getFileInputFiles(n.fileInput).always(function(s) {
                n.files = s,
                i.options.replaceFileInput && i._replaceFileInput(n),
                i._trigger("change", t.Event("change", {
                    delegatedEvent: e
                }), n) !== !1 && i._onAdd(e, n)
            })
        },
        _onPaste: function(e) {
            var i = e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.items
              , n = {
                files: []
            };
            i && i.length && (t.each(i, function(t, e) {
                var i = e.getAsFile && e.getAsFile();
                i && n.files.push(i)
            }),
            this._trigger("paste", t.Event("paste", {
                delegatedEvent: e
            }), n) !== !1 && this._onAdd(e, n))
        },
        _onDrop: function(e) {
            e.dataTransfer = e.originalEvent && e.originalEvent.dataTransfer;
            var i = this
              , n = e.dataTransfer
              , s = {};
            n && n.files && n.files.length && (e.preventDefault(),
            this._getDroppedFiles(n).always(function(n) {
                s.files = n,
                i._trigger("drop", t.Event("drop", {
                    delegatedEvent: e
                }), s) !== !1 && i._onAdd(e, s)
            }))
        },
        _onDragOver: e("dragover"),
        _onDragEnter: e("dragenter"),
        _onDragLeave: e("dragleave"),
        _initEventHandlers: function() {
            this._isXHRUpload(this.options) && (this._on(this.options.dropZone, {
                dragover: this._onDragOver,
                drop: this._onDrop,
                dragenter: this._onDragEnter,
                dragleave: this._onDragLeave
            }),
            this._on(this.options.pasteZone, {
                paste: this._onPaste
            })),
            t.support.fileInput && this._on(this.options.fileInput, {
                change: this._onChange
            })
        },
        _destroyEventHandlers: function() {
            this._off(this.options.dropZone, "dragenter dragleave dragover drop"),
            this._off(this.options.pasteZone, "paste"),
            this._off(this.options.fileInput, "change")
        },
        _setOption: function(e, i) {
            var n = -1 !== t.inArray(e, this._specialOptions);
            n && this._destroyEventHandlers(),
            this._super(e, i),
            n && (this._initSpecialOptions(),
            this._initEventHandlers())
        },
        _initSpecialOptions: function() {
            var e = this.options;
            void 0 === e.fileInput ? e.fileInput = this.element.is('input[type="file"]') ? this.element : this.element.find('input[type="file"]') : e.fileInput instanceof t || (e.fileInput = t(e.fileInput)),
            e.dropZone instanceof t || (e.dropZone = t(e.dropZone)),
            e.pasteZone instanceof t || (e.pasteZone = t(e.pasteZone))
        },
        _getRegExp: function(t) {
            var e = t.split("/")
              , i = e.pop();
            return e.shift(),
            new RegExp(e.join("/"),i)
        },
        _isRegExpOption: function(e, i) {
            return "url" !== e && "string" === t.type(i) && /^\/.*\/[igm]{0,3}$/.test(i)
        },
        _initDataAttributes: function() {
            var e = this
              , i = this.options
              , n = this.element.data();
            t.each(this.element[0].attributes, function(t, s) {
                var a, o = s.name.toLowerCase();
                /^data-/.test(o) && (o = o.slice(5).replace(/-[a-z]/g, function(t) {
                    return t.charAt(1).toUpperCase()
                }),
                a = n[o],
                e._isRegExpOption(o, a) && (a = e._getRegExp(a)),
                i[o] = a)
            })
        },
        _create: function() {
            this._initDataAttributes(),
            this._initSpecialOptions(),
            this._slots = [],
            this._sequence = this._getXHRPromise(!0),
            this._sending = this._active = 0,
            this._initProgressObject(this),
            this._initEventHandlers()
        },
        active: function() {
            return this._active
        },
        progress: function() {
            return this._progress
        },
        add: function(e) {
            var i = this;
            e && !this.options.disabled && (e.fileInput && !e.files ? this._getFileInputFiles(e.fileInput).always(function(t) {
                e.files = t,
                i._onAdd(null, e)
            }) : (e.files = t.makeArray(e.files),
            this._onAdd(null, e)))
        },
        send: function(e) {
            if (e && !this.options.disabled) {
                if (e.fileInput && !e.files) {
                    var i, n, s = this, a = t.Deferred(), o = a.promise();
                    return o.abort = function() {
                        return n = !0,
                        i ? i.abort() : (a.reject(null, "abort", "abort"),
                        o)
                    }
                    ,
                    this._getFileInputFiles(e.fileInput).always(function(t) {
                        if (!n) {
                            if (!t.length)
                                return void a.reject();
                            e.files = t,
                            i = s._onSend(null, e),
                            i.then(function(t, e, i) {
                                a.resolve(t, e, i)
                            }, function(t, e, i) {
                                a.reject(t, e, i)
                            })
                        }
                    }),
                    this._enhancePromise(o)
                }
                if (e.files = t.makeArray(e.files),
                e.files.length)
                    return this._onSend(null, e)
            }
            return this._getXHRPromise(!1, e && e.context)
        }
    })
}(jQuery),
"undefined" == typeof jQuery)
    throw new Error("jquery-confirm requires jQuery");
var jconfirm, Jconfirm;
!function(t) {
    "use strict";
    t.fn.confirm = function(e, i) {
        return void 0 === e && (e = {}),
        "string" == typeof e && (e = {
            content: e,
            title: !!i && i
        }),
        t(this).each(function() {
            var i = t(this);
            i.on("click", function(n) {
                n.preventDefault();
                var s = t.extend({}, e);
                i.attr("data-title") && (s.title = i.attr("data-title")),
                i.attr("data-content") && (s.content = i.attr("data-content")),
                s.$target = i,
                i.attr("href") && !e.confirm && (s.confirm = function() {
                    location.href = i.attr("href")
                }
                ),
                t.confirm(s)
            })
        }),
        t(this)
    }
    ,
    t.confirm = function(t, e) {
        return void 0 === t && (t = {}),
        "string" == typeof t && (t = {
            content: t,
            title: !!e && e
        }),
        jconfirm(t)
    }
    ,
    t.alert = function(t, e) {
        return void 0 === t && (t = {}),
        "string" == typeof t && (t = {
            content: t,
            title: !!e && e
        }),
        t.cancelButton = !1,
        jconfirm(t)
    }
    ,
    jconfirm = function(e) {
        void 0 === e && (e = {}),
        jconfirm.defaults && t.extend(jconfirm.pluginDefaults, jconfirm.defaults);
        var e = t.extend({}, jconfirm.pluginDefaults, e);
        return new Jconfirm(e)
    }
    ,
    Jconfirm = function(e) {
        t.extend(this, e),
        this._init()
    }
    ,
    Jconfirm.prototype = {
        _init: function() {
            var t = this;
            this._rand = Math.round(99999 * Math.random()),
            this._buildHTML(),
            this._bindEvents(),
            setTimeout(function() {
                t.open(),
                t._watchContent()
            }, 0)
        },
        _buildHTML: function() {
            var e = this;
            this.animation = "anim-" + this.animation.toLowerCase(),
            this.closeAnimation = "anim-" + this.closeAnimation.toLowerCase(),
            this.theme = "jconfirm-" + this.theme.toLowerCase(),
            "anim-none" == this.animation && (this.animationSpeed = 0),
            this._lastFocused = t("body").find(":focus"),
            this.$el = t(this.template).appendTo(this.container).addClass(this.theme),
            this.$el.find(".jconfirm-box-container").addClass(this.columnClass),
            this.$el.find(".jconfirm-bg").css(this._getCSS(this.animationSpeed, 1)),
            this.$el.find(".jconfirm-bg").css("opacity", this.opacity),
            this.$b = this.$el.find(".jconfirm-box").css(this._getCSS(this.animationSpeed, this.animationBounce)).addClass(this.animation),
            this.$body = this.$b,
            this.rtl && this.$el.addClass("rtl"),
            this._contentReady = t.Deferred(),
            this._modalReady = t.Deferred(),
            this.$title = this.$el.find(".title"),
            this.contentDiv = this.$el.find("div.content"),
            this.$content = this.contentDiv,
            this.$contentPane = this.$el.find(".content-pane"),
            this.$icon = this.$el.find(".icon-c"),
            this.$closeIcon = this.$el.find(".closeIcon"),
            this.$contentPane.css(this._getCSS(this.animationSpeed, 1)),
            this.setTitle(),
            this.setIcon(),
            this._setButtons(),
            this.closeIconClass && this.$closeIcon.html('<i class="' + this.closeIconClass + '"></i>'),
            e._contentHash = this._hash(e.$content.html()),
            t.when(this._contentReady, this._modalReady).then(function() {
                e.setContent(),
                e.setTitle(),
                e.setIcon()
            }),
            this._getContent(),
            this._imagesLoaded(),
            this.autoClose && this._startCountDown()
        },
        _unwatchContent: function() {
            clearInterval(this._timer)
        },
        _hash: function() {
            if ("function" == typeof btoa)
                return btoa(encodeURIComponent(this.$content.html()))
        },
        _watchContent: function() {
            var t = this;
            this._timer = setInterval(function() {
                var e = t._hash(t.$content.html());
                t._contentHash != e && (t._contentHash = e,
                t.setDialogCenter(),
                t._imagesLoaded())
            }, this.watchInterval)
        },
        _bindEvents: function() {
            var e = this
              , i = !1;
            this.$el.find(".jconfirm-scrollpane").click(function(t) {
                i || (e.backgroundDismiss ? (e.cancel(),
                e.close()) : (e.$b.addClass("hilight"),
                setTimeout(function() {
                    e.$b.removeClass("hilight")
                }, 800))),
                i = !1
            }),
            this.$el.find(".jconfirm-box").click(function(t) {
                i = !0
            }),
            this.$confirmButton && this.$confirmButton.click(function(t) {
                t.preventDefault();
                var i = e.confirm(e.$b);
                e._stopCountDown(),
                e.onAction("confirm"),
                (void 0 === i || i) && e.close()
            }),
            this.$cancelButton && this.$cancelButton.click(function(t) {
                t.preventDefault();
                var i = e.cancel(e.$b);
                e._stopCountDown(),
                e.onAction("cancel"),
                (void 0 === i || i) && e.close()
            }),
            this.$closeButton && this.$closeButton.click(function(t) {
                t.preventDefault(),
                e._stopCountDown(),
                e.cancel(),
                e.onAction("close"),
                e.close()
            }),
            this.keyboardEnabled && setTimeout(function() {
                t(window).on("keyup." + this._rand, function(t) {
                    e.reactOnKey(t)
                })
            }, 500),
            t(window).on("resize." + this._rand, function() {
                e.setDialogCenter(!0)
            })
        },
        _getCSS: function(t, e) {
            return {
                "-webkit-transition-duration": t / 1e3 + "s",
                "transition-duration": t / 1e3 + "s",
                "-webkit-transition-timing-function": "cubic-bezier(.36,1.1,.2, " + e + ")",
                "transition-timing-function": "cubic-bezier(.36,1.1,.2, " + e + ")"
            }
        },
        _imagesLoaded: function() {
            var e = this;
            t.each(this.$content.find("img:not(.loaded)"), function(i, n) {
                var s = setInterval(function() {
                    "0px" !== t(n).css("height") && (t(n).addClass("loaded"),
                    e.setDialogCenter(),
                    clearInterval(s))
                }, 40)
            })
        },
        _setButtons: function() {
            this.$btnc = this.$el.find(".buttons"),
            this.confirmButton && "" !== t.trim(this.confirmButton) && (this.$confirmButton = t('<button type="button" class="btn">' + this.confirmButton + "</button>").appendTo(this.$btnc).addClass(this.confirmButtonClass)),
            this.cancelButton && "" !== t.trim(this.cancelButton) && (this.buttonsReverse ? this.$cancelButton = t('<button type="button" class="btn">' + this.cancelButton + "</button>").prependTo(this.$btnc).addClass(this.cancelButtonClass) : this.$cancelButton = t('<button type="button" class="btn">' + this.cancelButton + "</button>").appendTo(this.$btnc).addClass(this.cancelButtonClass)),
            this.buttonOther && "" !== t.trim(this.buttonOther) && t(this.buttonOther).prependTo(this.$btnc),
            this.confirmButton || this.cancelButton || this.$btnc.hide(),
            this.confirmButton || this.cancelButton || null !== this.closeIcon || (this.$closeButton = this.$b.find(".closeIcon").show()),
            this.closeIcon === !0 && (this.$closeButton = this.$b.find(".closeIcon").show())
        },
        setTitle: function(t) {
            this.title = void 0 !== t ? t : this.title,
            this.$title.html(this.title || "")
        },
        setIcon: function(t) {
            this.title = "undefined" != typeof string ? t : this.title,
            this.$icon.html(this.icon ? '<i class="' + this.icon + '"></i>' : "")
        },
        setContent: function(t) {
            this.content = void 0 === t ? this.content : t,
            "" == this.content ? (this.$content.html(this.content),
            this.$contentPane.hide()) : (this.$content.html(this.content),
            this.$contentPane.show()),
            this.$content.hasClass("loading") && (this.$content.removeClass("loading"),
            this.$btnc.find("button").prop("disabled", !1))
        },
        _getContent: function(e) {
            var i = this;
            if (e = e ? e : this.content,
            this._isAjax = !1,
            this.content)
                if ("string" == typeof this.content)
                    if ("url:" === this.content.substr(0, 4).toLowerCase()) {
                        this._isAjax = !0,
                        this.$content.addClass("loading"),
                        this.$btnc.find("button").prop("disabled", !0);
                        var n = this.content.substring(4, this.content.length);
                        t.get(n).done(function(t) {
                            i.content = t,
                            i._contentReady.resolve()
                        }).always(function(t, e, n) {
                            "function" == typeof i.contentLoaded && i.contentLoaded(t, e, n)
                        })
                    } else
                        this.setContent(this.content),
                        this._contentReady.reject();
                else if ("function" == typeof this.content) {
                    this.$content.addClass("loading"),
                    this.$btnc.find("button").attr("disabled", "disabled");
                    var s = this.content(this);
                    "object" != typeof s ? console.error("The content function must return jquery promise.") : "function" != typeof s.always ? console.error("The object returned is not a jquery promise.") : (this._isAjax = !0,
                    s.always(function(t, e) {
                        i._contentReady.resolve()
                    }))
                } else
                    console.error("Invalid option for property content, passed: " + typeof this.content);
            else
                this.content = "",
                this.setContent(this.content),
                this._contentReady.reject();
            this.setDialogCenter()
        },
        _stopCountDown: function() {
            clearInterval(this.timerInterval),
            this.$cd && this.$cd.remove()
        },
        _startCountDown: function() {
            var e = this.autoClose.split("|");
            if (/cancel/.test(e[0]) && "alert" === this.type)
                return !1;
            if (/confirm|cancel/.test(e[0])) {
                this.$cd = t('<span class="countdown"></span>').appendTo(this["$" + e[0] + "Button"]);
                var i = this;
                i.$cd.parent().click();
                var n = e[1] / 1e3;
                this.timerInterval = setInterval(function() {
                    i.$cd.html(" (" + (n -= 1) + ")"),
                    0 === n && (i.$cd.html(""),
                    i.$cd.parent().trigger("click"),
                    clearInterval(i.timerInterval))
                }, 1e3)
            } else
                console.error("Invalid option " + e[0] + ", must be confirm/cancel")
        },
        reactOnKey: function e(i) {
            var n = t(".jconfirm");
            if (n.eq(n.length - 1)[0] !== this.$el[0])
                return !1;
            var e = i.which;
            if (this.contentDiv.find(":input").is(":focus") && /13|32/.test(e))
                return !1;
            t.inArray(e, this.cancelKeys) !== -1 && (this.$cancelButton ? this.$cancelButton.click() : this.close()),
            t.inArray(e, this.confirmKeys) !== -1 && this.$confirmButton && this.$confirmButton.click()
        },
        setDialogCenter: function() {
            if ("none" == this.$contentPane.css("display"))
                var e = 0
                  , i = 0;
            else {
                var e = this.$content.outerHeight()
                  , i = this.$contentPane.height();
                0 == i && (i = e)
            }
            var n = this.$content.outerWidth();
            this.$content.css({
                clip: "rect(0px " + (100 + n) + "px " + e + "px -100px)"
            }),
            this.$contentPane.css({
                height: e
            });
            var s = t(window).height()
              , a = this.$b.outerHeight() - i + e
              , o = (s - a) / 2;
            if (a > s - 100) {
                var r = {
                    "margin-top": 50,
                    "margin-bottom": 50
                };
                t("body").addClass("jconfirm-noscroll")
            } else {
                var r = {
                    "margin-top": o
                };
                t("body").removeClass("jconfirm-noscroll")
            }
            this.$b.css(r)
        },
        close: function() {
            var e = this;
            if (this.isClosed())
                return !1;
            "function" == typeof this.onClose && this.onClose(),
            this._unwatchContent(),
            e._lastFocused.focus(),
            t(window).unbind("resize." + this._rand),
            this.keyboardEnabled && t(window).unbind("keyup." + this._rand),
            e.$el.find(".jconfirm-bg").removeClass("seen"),
            t("body").removeClass("jconfirm-noscroll"),
            this.$b.addClass(this.closeAnimation);
            var i = "anim-none" == this.closeAnimation ? 0 : this.animationSpeed;
            return setTimeout(function() {
                e.$el.remove()
            }, 25 * i / 100),
            jconfirm.record.closed += 1,
            jconfirm.record.currentlyOpen -= 1,
            !0
        },
        open: function() {
            var t = this;
            if (this.isClosed())
                return !1;
            t.$el.find(".jconfirm-bg").addClass("seen"),
            this.$b.removeClass(this.animation),
            this.$b.find("input[autofocus]:visible:first").focus(),
            jconfirm.record.opened += 1,
            jconfirm.record.currentlyOpen += 1,
            "function" == typeof this.onOpen && this.onOpen();
            var e = "jconfirm-box" + this._rand;
            return this.$b.attr("aria-labelledby", e).attr("tabindex", -1).focus(),
            this.$title ? this.$title.attr("id", e) : this.$content && this.$content.attr("id", e),
            setTimeout(function() {
                t.$b.css({
                    "transition-property": t.$b.css("transition-property") + ", margin"
                }),
                t._modalReady.resolve()
            }, this.animationSpeed),
            !0
        },
        isClosed: function() {
            return "" === this.$el.css("display")
        }
    },
    jconfirm.pluginDefaults = {
        template: '<div class="jconfirm"><div class="jconfirm-bg"></div><div class="jconfirm-scrollpane"><div class="container"><div class="row"><div class="jconfirm-box-container"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="closeIcon">&times;</div><div class="title-c"><span class="icon-c"></span><span class="title"></span></div><div class="content-pane"><div class="content"></div></div><div class="buttons"></div><div class="jquery-clear"></div></div></div></div></div></div></div>',
        title: "提示",
        content: "确定吗",
        contentLoaded: function() {},
        icon: "",
        opacity: null,
        confirmButton: "确定",
        cancelButton: "取消",
        confirmButtonClass: "btn",
        cancelButtonClass: "btn btn-slight",
        buttonsReverse: !1,
        theme: "white",
        animation: "scale",
        closeAnimation: "none",
        animationSpeed: 500,
        animationBounce: 1.2,
        keyboardEnabled: !1,
        rtl: !1,
        confirmKeys: [13],
        cancelKeys: [27],
        container: "body",
        confirm: function() {},
        cancel: function() {},
        backgroundDismiss: !0,
        autoClose: !1,
        closeIcon: null,
        closeIconClass: !1,
        watchInterval: 100,
        columnClass: "pop-container",
        onOpen: function() {},
        onClose: function() {},
        onAction: function() {}
    },
    jconfirm.record = {
        opened: 0,
        closed: 0,
        currentlyOpen: 0
    }
}(jQuery),
function(t, e, i) {
    "use strict";
    var n = (t(e),
    t(document),
    !-[1] && e.XMLHttpRequest,
    !1)
      , s = function(e) {
        this.settings = t.extend({}, s.defaults, e),
        this.init()
    };
    s.defaults = {
        bind: !1,
        wrapClass: "",
        content: "请稍等...",
        title: "提示",
        onCancel: null,
        onOpen: null,
        onConfirm: null,
        onClose: null,
        closeText: !0,
        confirmText: "确定",
        cancelText: "取消",
        position: "center",
        inline: !1,
        isSelecter: !1,
        element: null,
        preKa: "",
        time: null,
        lock: !0,
        closeLayer: !0,
        opacityLock: !1
    },
    s.prototype = {
        init: function() {
            this.create()
        },
        create: function() {
            var e = ""
              , i = ""
              , n = ""
              , s = ""
              , a = ""
              , o = ""
              , r = "";
            this.settings.type && (e = '<i class="icon-dialog icon-dialog-' + this.settings.type + '"></i>'),
            this.settings.lock && (n = '<div class="dialog-layer"></div>',
            this.settings.opacityLock && (n = '<div class="dialog-layer dialog-opacity-layer"></div>')),
            this.settings.preKa && (s = this.settings.preKa + "_"),
            ("around" == this.settings.position || this.settings.inline) && (a = '<span class="icon-dialog-arrow"></span>'),
            this.settings.closeText && (o = '<a href="javascript:;" class="close" ka="' + s + 'dialog_close"><i class="icon-close"></i></a>'),
            (this.settings.confirmText || this.settings.cancelText) && (r = '<div class="dialog-footer"><div class="btns"></div></div>'),
            i = '<div class="dialog-wrap">' + n + '<div class="dialog-container">' + a + '<div class="dialog-title">' + e + '<h3 class="title">' + this.settings.title + "</h3>" + o + '</div><div class="dialog-con">' + this.settings.content + "</div>" + r + "</div></div>",
            t(".dialog-wrap").length && !this.settings.inline && t(".dialog-wrap").remove(),
            this.settings.inline && this.settings.element ? this.dialog = t(i).appendTo(t(this.settings.element).parent()) : this.dialog = t(i).appendTo("body"),
            (this.settings.onConfirm || this.settings.confirmText) && this.onConfirm(),
            (this.settings.onCancel || this.settings.cancelText) && this.onCancel(),
            this.settings.wrapClass && this.dialog.addClass(this.settings.wrapClass),
            this.settings.type && this.dialog.addClass("dialog-icons-default"),
            this.settings.position && this.position(),
            this.bindEvent(),
            t("body").addClass("dialog-open"),
            t.isFunction(this.settings.onOpen) && (this.settings.bind ? this.settings.onOpen.apply(this, this.dialog) : this.settings.onOpen(this.dialog)),
            this.settings.lock && this.lock(),
            t.isNumeric(this.settings.time) && this.time()
        },
        onConfirm: function() {
            var e = this
              , i = this.dialog.find(".dialog-footer .btns");
            t("<span>", {
                ClASS: "btn btn-sure",
                text: e.settings.confirmText,
                ka: e.settings.preKa ? e.settings.preKa + "_" : "",
                click: function() {
                    t.isFunction(e.settings.onConfirm) ? e.settings.bind ? e.settings.onConfirm.apply(e, e.dialog) : e.settings.onConfirm(e.dialog) : e.close()
                }
            }).prependTo(i)
        },
        onCancel: function() {
            var e = this
              , i = this.dialog.find(".dialog-footer .btns");
            t("<span>", {
                ClASS: "btn btn-outline btn-cancel",
                text: e.settings.cancelText,
                ka: (e.settings.preKa ? e.settings.preKa + "_" : "") + "dialog_cancel",
                click: function() {
                    t.isFunction(e.settings.onCancel) ? e.settings.bind ? e.settings.onCancel.apply(e, e.dialog) : e.settings.onCancel(e.dialog) : e.close()
                }
            }).prependTo(i)
        },
        size: function() {
            var t = this.dialog.find(".dialog-con");
            this.dialog.find(".dialog-container");
            t.css({
                width: this.settings.width,
                height: this.settings.height
            })
        },
        position: function() {
            if (this.settings.element) {
                var i = this
                  , n = i.settings.element
                  , s = i.dialog.find(".dialog-container").outerWidth()
                  , a = t(n).offset()
                  , o = a.left + n.width() / 2;
                o < s && (o = s / 2),
                i.settings.inline || "around" != i.settings.position || i.dialog.css({
                    left: o + "px",
                    top: a.top + "px"
                }),
                i.settings.inline && (i.dialog.get(0).getBoundingClientRect().top > 330 && e.innerHeight - i.dialog.get(0).getBoundingClientRect().top < 280 && i.dialog.addClass("dialog-up-default"),
                i.settings.isSelecter && t(document).on("click", function(e) {
                    e.target == n.get(0) || e.target.parentNode == n.get(0) || t(e.target).closest(".dialog-selecter-default").length || (i.dialog.closest(".dropdown-wrap").removeClass("dropdown-menu-open"),
                    i.close())
                }))
            }
        },
        lock: function() {
            if (!n) {
                var t = this;
                t.dialog.find(".dialog-container");
                this.settings.closeLayer && t.dialog.find(".dialog-layer").on("click", function() {
                    t.close()
                })
            }
        },
        unLock: function() {
            this.settings.lock && n && (t("html,body").css("overflow", "visible"),
            n = !1)
        },
        close: function() {
            t.isFunction(this.settings.onClose) && this.settings.onClose(this.dialog),
            this.dialog.remove(),
            this.unLock(),
            t("body").removeClass("dialog-open")
        },
        time: function() {
            var t = this;
            this.closeTimer = setTimeout(function() {
                t.close()
            }, this.settings.time)
        },
        bindEvent: function() {
            var t = this;
            this.dialog.find(".close").on("click", function() {
                t.close()
            })
        }
    },
    t.dialog = function(t) {
        return new s(t)
    }
}(jQuery, window),
function(t) {
    "use strict";
    Array.prototype.indexOf || (Array.prototype.indexOf = function(t, e) {
        var i;
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var n = Object(this)
          , s = n.length >>> 0;
        if (0 === s)
            return -1;
        var a = +e || 0;
        if (Math.abs(a) === 1 / 0 && (a = 0),
        a >= s)
            return -1;
        for (i = Math.max(a >= 0 ? a : s - Math.abs(a), 0); i < s; ) {
            if (i in n && n[i] === t)
                return i;
            i++
        }
        return -1
    }
    );
    var e = function(e, i) {
        var i = i || {};
        this.selected = [],
        this.$body = t(document.body),
        this.$element = t(e),
        this.option = t.extend({}, i),
        this.init()
    }
      , i = {
        category: function() {
            var e = t.Deferred();
            return t.get("/common/data/industry.json", function(t) {
                e.resolve(t.data)
            }),
            e
        }
    }
      , n = {
        container: function() {
            return '<div class="industry-tip"><div class="industry-tip-item fl"></div><span class="fl gray">最多可选3个行业</span><a class="confirm" href="javascript:;">确定</a></div><div class="industry-panel"><div class="data-tips"><div class="spinner spinner-circle"><div class="loader"></div><span>正在加载数据...</span></div></div></div>'
        },
        industry: function(e, i) {
            var n = "<table>"
              , s = [];
            i && t.each(i, function(t, e) {
                s.push(parseInt(e.code, 10))
            });
            var a = function(e) {
                var i = "";
                return t.each(e, function(t, e) {
                    var n = s.indexOf(e.code) > -1 ? "selected" : "";
                    i += '<p><span class="' + n + '" data-code="' + e.code + '">' + e.name + "</span></p>"
                }),
                i
            };
            return t.each(e, function(t, e) {
                n += "<tr>",
                n += '<td class="industry-category" data-code="' + e.code + '">' + e.name + "</td>",
                n += "<td>",
                n += a(e.subLevelModelList),
                n += "</td>",
                n += "</tr>"
            }),
            n += "</table>"
        }
    };
    e.prototype.init = function() {
        var e = this
          , i = this.$element;
        if (i.hasClass("disabled"))
            return !1;
        i.off("click").on("click", function() {
            t(".industry-wrapper").length || e.show()
        })
    }
    ,
    e.prototype.toggleSelected = function() {
        var e = this
          , i = "";
        e.selected = [],
        t(".industry-multiple-wrapper .selected").each(function(i, n) {
            e.selected.push({
                name: t(n).text(),
                code: t(n).attr("data-code")
            })
        }),
        t.each(e.selected, function(t, e) {
            i += '<p data-code="' + e.code + '"><span class="text">' + e.name + '</span><i class="i-close"></i></p>'
        }),
        t(".industry-multiple-wrapper .industry-tip-item").html(i)
    }
    ,
    e.prototype.show = function() {
        var e = this
          , s = e.option.multiple ? "industry-multiple-wrapper " : "";
        e.$dialog = t.dialog({
            bind: !0,
            title: "请选择行业类别",
            content: n.container(),
            closeText: !0,
            confirmText: !1,
            cancelText: !1,
            inline: !0,
            wrapClass: s + "industry-wrapper",
            lock: !0,
            onOpen: function(s) {
                var a = (new Date).getTime();
                t(s).on("click.industry", "table span", function() {
                    var i = {
                        name: t(this).text(),
                        code: t(this).attr("data-code")
                    };
                    e.option.multiple ? (e.selected.length < 3 ? t(this).addClass("selected") : t(this).hasClass("selected") || t.toast({
                        type: "warning",
                        content: "最多可选择3个行业"
                    }),
                    e.toggleSelected()) : (e.$element.trigger("selected.industry", i),
                    e.$element.data("selected", [i]),
                    e.close())
                }),
                t(s).on("click.industry", ".industry-tip .i-close", function() {
                    var i = t(this).parent("p").attr("data-code");
                    t(s).find(".selected[data-code=" + i + "]").removeClass("selected"),
                    e.toggleSelected()
                }),
                t(s).on("click.industry", ".industry-tip .confirm", function() {
                    e.$element.data("selected", e.selected),
                    e.selected.length ? e.$element.trigger("selected.industry", [e.selected]) : e.$element.trigger("selected.industry", [{
                        name: "不限",
                        code: 0
                    }]),
                    e.close()
                }),
                i.category().then(function(i) {
                    var o = (new Date).getTime() - a
                      , r = o > 500 ? o : 500 - o;
                    setTimeout(function() {
                        t(s).find(".industry-panel").html(n.industry(i, e.$element.data("selected"))),
                        e.toggleSelected()
                    }, r)
                })
            },
            onClose: function(e) {
                t(e).off("click.industry")
            }
        })
    }
    ,
    e.prototype.close = function() {
        this.$dialog && this.$dialog.close()
    }
    ;
    var s = function(i) {
        return this.each(function() {
            var n = t(this)
              , s = n.data("boss.industry");
            s || n.data("boss.industry", s = new e(this,i)),
            "string" == typeof i && s[i].call(n)
        })
    }
      , a = t.fn.industry;
    t.fn.industry = s,
    t.fn.industry.Constructor = e,
    t.fn.industry.noConflict = function() {
        return t.fn.industry = a,
        this
    }
}(jQuery),
function(t, e, i) {
    "use strict";
    var n = (t(e),
    t(document),
    !1)
      , s = function(e) {
        if ("string" == typeof e)
            var e = {
                content: e
            };
        this.settings = t.extend({}, s.defaults, e),
        this.init()
    };
    s.defaults = {
        content: "提示",
        lock: !1,
        wrapClass: null,
        type: null,
        position: "top",
        parentWrap: "body",
        time: 2300
    },
    s.prototype = {
        init: function() {
            this.create(),
            this.settings.lock && this.lock()
        },
        create: function() {
            var e = ""
              , i = ""
              , n = this;
            this.settings.type && (e = '<i class="icon-toast-' + this.settings.type + '"></i>'),
            i = '<div id="toast"><div class="toast-con">' + e + this.settings.content + "</div></div>",
            t("#toast").length && t("#toast").remove(),
            this.toast = t(i).appendTo(this.settings.parentWrap),
            this.settings.wrapClass && this.toast.addClass(this.settings.wrapClass),
            this.settings.position && this.position(),
            this.time(),
            this.toast.on("click", function() {
                n.close()
            })
        },
        position: function() {
            "top" == this.settings.position && this.toast.css("top", 0),
            "center" == this.settings.position && this.toast.css("bottom", 0),
            "bottom" == this.settings.position && this.toast.css("bottom", 0)
        },
        lock: function() {
            n || (t("html,body").css("overflow", "hidden"),
            n = !0)
        },
        unLock: function() {
            this.settings.lock && n && (t("html,body").css("overflow", "visible"),
            n = !1)
        },
        close: function() {
            var t = this;
            t.toast.addClass("slideup"),
            setTimeout(function() {
                t.toast.removeClass("slideup").remove()
            }, 500),
            t.unLock()
        },
        time: function() {
            var t = this;
            this.settings.time && "loading" != this.settings.type && (this.closeTimer = setTimeout(function() {
                t.close()
            }, this.settings.time))
        }
    },
    t.toast = function(t) {
        new s(t)
    }
}(jQuery, window),
function(t) {
    "use strict";
    var e = function(e, i) {
        this.$body = t(document.body),
        this.$element = t(e),
        this.page = 1,
        this.isShowBefore = "false" !== this.$element.attr("isShowBefore"),
        this.isShowNow = "false" !== this.$element.attr("isShowNow"),
        this.isShowToday = "false" !== this.$element.attr("isShowToday"),
        this.order = this.$element.attr("order") || "desc",
        this.init()
    };
    e.prototype.init = function() {
        if (!this.$element.hasClass("disabled")) {
            var e = this;
            this.dates = this.date(),
            e.render(),
            e.$wrap.on("click", ".year", function() {
                e.selectYear(t(this))
            }),
            e.$wrap.on("click", ".month", function() {
                e.selectMonth(t(this))
            }),
            e.$wrap.on("click", ".prev", function(t) {
                e.prev(),
                t.stopPropagation()
            }),
            e.$wrap.on("click", ".next", function(t) {
                e.next(),
                t.stopPropagation()
            }),
            this.$element.on("click", function() {
                e.$wrap.is(":visible") ? e.hide() : e.show()
            }),
            t(document).on("click.workStart", function(t) {
                !e.$wrap.is(":visible") || e.$wrap[0].contains(t.target) || e.$element[0].contains(t.target) || e.hide()
            })
        }
    }
    ,
    e.prototype.getFill = function() {
        var e;
        return e = this.$element.attr("data-fill") ? t("input[name=" + this.$element.attr("data-fill") + "]").val().split("-") : this.$element.val().split("-"),
        {
            year: e.length ? e[0] : "",
            month: e.length > 1 ? e[1] : ""
        }
    }
    ,
    e.prototype.render = function() {
        this.$wrap = t('<div class="workstartpicker-wrap"><div class="year-wrap"></div><div class="month-wrap"></div></div>');
        var e = this.template();
        this.$wrap.find(".year-wrap").html(e),
        t("body").append(this.$wrap)
    }
    ,
    e.prototype.date = function() {
        var t = parseInt(this.$element.attr("data-min"), 10)
          , e = parseInt(this.$element.attr("data-max"), 10)
          , i = [];
        if (this.isShowBefore && i.push({
            name: t + "前",
            value: t - 1
        }),
        "desc" === this.order)
            for (var n = t; n <= e; n++)
                i.push({
                    name: n,
                    value: n,
                    hasChild: !0
                });
        else
            for (var n = t; n <= e; n++)
                i.unshift({
                    name: n,
                    value: n,
                    hasChild: !0
                });
        return this.isShowNow && i.push({
            name: "应届生",
            value: 0
        }),
        i.reverse(),
        i
    }
    ,
    e.prototype.template = function() {
        for (var t = 12 * (this.page - 1), e = 12 * this.page, i = this.dates.slice(t, e), n = "desc" === this.order ? i[i.length - 1].name + " - " + i[0].name : i[0].name + " - " + i[i.length - 1].name, s = this.getFill().year, a = '<div class="title"><i class="prev"></i><i class="next"></i><p class="text">' + n + '</p></div><div class="content"><ul>', o = 0; o < i.length; o++) {
            a += '<li class="year ' + (s == i[o].value ? "selected" : "") + '" data-val="' + i[o].value + '">' + i[o].name + "</li>"
        }
        return a += "</ul></div>"
    }
    ,
    e.prototype.month = function(t) {
        for (var e = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"], i = '<div class="title"><p class="text">' + t + '</p></div><div class="content"><ul>', n = this.getFill(), s = 0; s < 12; s++) {
            i += '<li class="month ' + (n.year == t && parseInt(n.month, 10) == s + 1 ? "selected" : "") + '">' + e[s] + "</li>"
        }
        return i += "</ul></div>"
    }
    ,
    e.prototype.prev = function() {
        if (this.page > 1) {
            this.page--;
            var t = this.template();
            this.$wrap.find(".year-wrap").html(t)
        }
    }
    ,
    e.prototype.next = function() {
        var t = Math.ceil(this.dates.length / 12);
        if (this.page < t) {
            this.page++;
            var e = this.template();
            this.$wrap.find(".year-wrap").html(e)
        }
    }
    ,
    e.prototype.selectMonth = function(t) {
        var e = this.$wrap.find(".month-wrap .text").text()
          , i = t.index() > 9 ? t.index() + 1 : "0" + (t.index() + 1);
        this.fill(e, i)
    }
    ,
    e.prototype.selectYear = function(t) {
        var e = t.attr("data-val")
          , i = this.dates.filter(function(t) {
            return t.value == e
        });
        if (i[0] && i[0].hasChild) {
            var n = this.month(e);
            this.$wrap.find(".month-wrap").html(n),
            this.$wrap.addClass("month-panel")
        } else
            this.fill(e)
    }
    ,
    e.prototype.fill = function(e, i) {
        var e = this.dates.filter(function(t) {
            return t.value == e
        })[0]
          , n = e.value
          , s = e.name
          , a = this.$element.attr("data-fill")
          , o = t("input[name=" + a + "]");
        i && (n += "-" + i,
        s += "-" + i),
        this.$element.val(s),
        o && o.val(n),
        this.hide()
    }
    ,
    e.prototype.show = function() {
        var t = this.$element.offset();
        this.$wrap.css({
            left: t.left + "px",
            top: this.$element.outerHeight() + t.top + "px"
        });
        var e = this.getFill();
        this.$wrap.find(".selected").removeClass("selected"),
        "" !== e.year && this.$wrap.find(".year-wrap li[data-val=" + e.year + "]").addClass("selected"),
        this.$wrap.show()
    }
    ,
    e.prototype.hide = function() {
        this.$wrap.hide(),
        this.$wrap.removeClass("month-panel")
    }
    ;
    var i = function(i) {
        return this.each(function() {
            var n = t(this)
              , s = n.data("boss.date");
            s || n.data("boss.date", s = new e(this,i)),
            "string" == typeof i && s[i].call(n)
        })
    }
      , n = t.fn.workstartpicker;
    t.fn.workstartpicker = i,
    t.fn.workstartpicker.Constructor = e,
    t.fn.workstartpicker.noConflict = function() {
        return t.fn.chosen = n,
        this
    }
}(jQuery),
function(t, e, n, s) {
    var a = function(e, i) {
        var n = this;
        n.$element = e,
        n.defaults = {
            width: 840,
            height: 256,
            start: 1,
            speed: 400,
            interval: 3e3,
            autoPlay: !1,
            dotShow: !0,
            navShow: !0,
            arrShow: !0,
            touch: !0,
            effect: "slide",
            fadeOut: !0,
            afterSlider: function() {}
        },
        n.clickable = !0,
        n.options = t.extend({}, n.defaults, i)
    };
    a.prototype = {
        init: function() {
            var n = this
              , s = n.$element
              , a = s.children("ul")
              , o = a.children("li")
              , r = o.length
              , l = n.options.start
              , c = 0
              , d = 0;
            if (n.options.arrShow) {
                s.append('<a href="javascript:;" class="btn-direction btn-prev prev"></a><a href="javascript:;" class="btn-direction btn-next next"></a>')
            }
            for (i = 1; i <= r; i++)
                l == i && o.eq(l - 1).addClass("cur");
            if (n.options.dotShow) {
                var h = "";
                for (i = 1; i <= r; i++)
                    l == i ? h += '<i data-index="' + i + '" class="cur"></i>' : h += '<i data-index="' + i + '"></i>';
                var u = '<div class="slider-dot">' + h + "</div>";
                s.append(u)
            }
            var p = function() {
                var t = s.width()
                  , e = n.options.height / n.options.width * t;
                s.css("height", e)
            };
            if (s.css("height", n.options.height),
            p(),
            t(e).resize(function() {
                p()
            }),
            n.options.arrShow && (s.find(".next").on("click", function(t) {
                t.preventDefault(),
                n.clickable && (l >= r ? l = 1 : l += 1,
                n.moveTo(l, "next"))
            }),
            s.find(".prev").on("click", function(t) {
                t.preventDefault(),
                n.clickable && (1 == l ? l = r : l -= 1,
                n.moveTo(l, "prev"))
            })),
            n.options.dotShow && s.find(".slider-dot i").on("mouseover", function(e) {
                if (e.preventDefault(),
                n.clickable) {
                    var i = t(this).data("index");
                    dir = i > l ? "next" : "prev",
                    i != l && (l = i,
                    n.moveTo(l, dir))
                }
            }),
            n.options.navShow && s.parent().find(".slider-nav a").on("mouseover", function(e) {
                if (e.preventDefault(),
                n.clickable) {
                    var i = t(this).data("index");
                    dir = i > l ? "next" : "prev",
                    i != l && (l = i,
                    n.moveTo(l, dir))
                }
            }),
            n.options.autoPlay) {
                var f, m = function() {
                    l++,
                    l > r && (l = 1),
                    n.moveTo(l, "next")
                };
                f = setInterval(m, n.options.interval),
                s.hover(function() {
                    f = clearInterval(f)
                }, function() {
                    f = setInterval(m, n.options.interval)
                })
            }
            n.options.touch && o.on({
                touchstart: function(t) {
                    c = t.originalEvent.touches[0].clientY,
                    d = t.originalEvent.touches[0].clientX
                },
                touchend: function(t) {
                    var e = t.originalEvent.changedTouches[0].clientY
                      , i = t.originalEvent.changedTouches[0].clientX
                      , s = c - e
                      , a = d - i;
                    Math.abs(a) > Math.abs(s) && (a > 5 ? (l >= r ? l = 1 : l += 1,
                    n.moveTo(l, "next")) : (1 == l ? l = r : l -= 1,
                    n.moveTo(l, "prev"))),
                    c = null,
                    d = null
                },
                touchmove: function(t) {
                    t.preventDefault && t.preventDefault()
                }
            })
        },
        moveTo: function(e, i) {
            var n = this
              , s = n.$element
              , a = n.clickable
              , o = s.find(".slider-dot i")
              , r = s.parent().find(".slider-nav a")
              , l = s.children("ul")
              , c = l.children("li");
            if (!a)
                return !1;
            if (n.clickable = !1,
            "fade" == n.options.effect)
                1 == n.options.fadeOut ? l.children(".cur").fadeOut(function() {
                    t(this).removeClass("cur")
                }) : l.children(".cur").hide().removeClass("cur"),
                c.eq(e - 1).fadeIn(function() {
                    t(this).addClass("cur"),
                    n.clickable = !0
                });
            else {
                var d = s.width();
                "prev" == i && (d *= -1),
                l.children(".cur").stop().animate({
                    left: -d
                }, n.options.speed, function() {
                    t(this).removeClass("cur")
                }),
                c.eq(e - 1).css("left", d + "px").addClass("cur").stop().animate({
                    left: 0
                }, n.options.speed, function() {
                    n.clickable = !0
                })
            }
            n.options.afterSlider.call(n),
            o.removeClass("cur"),
            o.eq(e - 1).addClass("cur"),
            r.removeClass("cur"),
            r.eq(e - 1).addClass("cur")
        }
    },
    t.fn.hwSlider = function(t) {
        var e = new a(this,t);
        return this.each(function() {
            e.init()
        })
    }
}(jQuery, window, document);
var PlaceholderCheck = {
    init: function(t) {
        if (!placeholderSupport()) {
            var e;
            e = t ? t.find("[placeholder]") : $("[placeholder]"),
            e.focus(function() {
                var t = $(this);
                t.val() == t.attr("placeholder") && (t.val(""),
                t.removeClass("placeholder"))
            }).blur(function() {
                var t = $(this);
                "" != t.val() && t.val() != t.attr("placeholder") || (t.addClass("placeholder"),
                t.val(t.attr("placeholder")))
            }).blur()
        }
    }
};
$(function() {
    PlaceholderCheck.init()
});
var Storage = {
    get: function(t) {
        var e = this._getStorage()
          , i = "";
        if (e)
            return (i = e.getItem(t)) && JSON.parse(i)
    },
    set: function(t, e) {
        var i = this._getStorage();
        t && void 0 !== e && i.setItem(t, JSON.stringify(e))
    },
    del: function(t, e) {
        var i = this._getStorage();
        if (i)
            if (t && e)
                for (var t in i)
                    0 === t.indexOf(prefix) && i.removeItem(t);
            else
                t ? i.removeItem(t) : i.clear()
    },
    _getStorage: function() {
        var t;
        try {
            t = window.localStorage
        } catch (t) {}
        return t
    }
}
  , Report = {
    init: function() {
        Report.uploadCount = 0,
        Report.setContent()
    },
    setContent: function() {
        var t = function(t) {
            t.remove(),
            Report.uploadCount--
        };
        $("body").on("click", ".icon-report", function() {
            var e = $(this).attr("data-uid") || ""
              , i = $(this).attr("data-expect") || "";
            $.get("/user/report/form.json", function(n) {
                n.rescode ? $.dialog({
                    content: n.html,
                    title: "举报",
                    cancelButton: "取消",
                    confirmButton: "确认",
                    wrapClass: "pop-report",
                    onOpen: function(e) {
                        "FormsUI"in window && FormsUI.dropSelect(e),
                        "DropDown"in window && DropDown.init(e),
                        e.find(".verify-box img").on("click", function() {
                            $(this).attr("src", "/captcha/?randomKey=" + $(this).siblings(".randomkey").val() + "&_r=" + (new Date).getTime())
                        }),
                        e.find("#fileupload").on("click", function(t) {
                            $(this).next(".verify-box") ? Report.checkForm($(".verify-box")) ? Report.uploadPictures($(this), e) : t.preventDefault() : Report.uploadPictures($(this), e)
                        }),
                        e.on("click", ".link-close", function() {
                            t($(this).parents("li"))
                        })
                    },
                    onConfirm: function(t) {
                        return Report.submitForm(t, e, i)
                    }
                }) : $.toast({
                    content: n.resmsg,
                    type: "error"
                })
            })
        })
    },
    uploadPictures: function(t, e) {
        var i = /(\.|\/)(png|jpg|jpeg)$/i
          , t = t
          , n = t.siblings(".preview")
          , s = t.closest(".upload")
          , a = e.find(".verify-box .ipt");
        $("#fileupload").fileupload({
            type: "POST",
            url: "/faqfeedback/pc/upload/picture.json",
            dataType: "json",
            acceptFileTypes: i,
            maxFileSize: 3e6,
            add: function(t, n) {
                var a = n.files[0]
                  , o = a.name;
                i.test(o) ? a.size > 3e6 ? alert("请上传3M以内的文件") : Report.uploadCount >= 6 ? e.find(".preview").siblings(".text-error").html("最多可以上传6张照片") : (e.find(".preview").siblings(".text-error").html(""),
                s.find("a").html('上传图片<i class="icon-toast-loading"></i>'),
                n.formData = {
                    randomKey: e.find(".randomkey").val() || "",
                    captcha: e.find(".verify-box input").val() || ""
                },
                n.submit()) : alert("请上传png、jpg、jpeg 格式的文件")
            },
            done: function(t, i) {
                var o = i.result;
                o.rescode ? (Report.uploadCount++,
                setTimeout(function() {
                    n.find("ul").append('<li><img src="' + o.url[0] + '" data-img="' + o.url[1] + '"/><i class="link-close"></i></li>'),
                    e.addClass("upload-complate"),
                    s.find("a").html("上传图片")
                }, 500),
                e.addClass("upload-complate")) : (s.find("a").html("上传图片"),
                $.toast({
                    content: o.resmsg,
                    type: "error"
                }),
                "验证码错误" == o.resmsg && (a.val("").focus(),
                e.find(".verify-box img").click()))
            },
            error: function(t, e) {
                s.find("a").html("上传图片"),
                $.toast({
                    content: "上传失败",
                    type: "error"
                })
            }
        })
    },
    submitForm: function(t, e, i) {
        var n = t
          , s = $.trim(n.find("textarea").val())
          , a = !1
          , o = this
          , r = ""
          , l = ""
          , c = "";
        if (n.find(".ipt-wrap").each(function() {
            return a = o.checkForm($(this)),
            o.checkForm($(this))
        }),
        a && !n.find(".preview img").length)
            return t.find(".preview").siblings(".text-error").html("请上传照片！"),
            !1;
        n.find(".preview img").each(function() {
            r += $(this).attr("data-img") + ","
        }),
        r = r.substring(0, r.length - 1),
        "" != e ? (l = e,
        c = i) : "_reportData"in window ? (l = _reportData.reportedId,
        c = _reportData.targetId) : (l = Chat.curUserData.uid,
        c = Chat.curUserData.infoData.expectId);
        var d = {
            reportedId: l,
            reasonCode: $('input[name="reasonCode"]').val(),
            content: s,
            targetId: c,
            imgUrl: r || "",
            randomKey: n.find(".randomkey").val(),
            captcha: $(".verify-box input").val()
        };
        return a && (a = !1,
        $.ajax({
            url: "/user/report/save.json",
            type: "POST",
            data: d,
            dataType: "JSON",
            timeout: 3e4,
            success: function(e) {
                e.rescode ? ($.toast({
                    content: "发送成功，感谢您的反馈 ：）",
                    type: "success"
                }),
                Report.uploadCount = 0,
                t.remove()) : ($.toast({
                    content: e.resmsg,
                    type: "error"
                }),
                "验证码错误" == e.resmsg && (n.find(".verify-box .ipt").val("").focus(),
                n.find(".verify-box img").click()))
            },
            error: function(t) {}
        })),
        !1
    },
    checkForm: function(t) {
        var e, i = t.find(".ipt").val();
        if (void 0 != t.find(".ipt").attr("data-range")) {
            if (e = t.find(".ipt").attr("data-range").split(",")[1],
            i.length > e)
                return t.next(".text-error").html("请输入" + e + "个字以内的内容"),
                !1;
            t.next(".text-error").html("")
        }
        if ("" == i) {
            var n = t.find(".ipt").attr("data-blank");
            return t.find(".ipt").focus(),
            t.next(".text-error").html(n),
            !1
        }
        return t.next(".text-error").html(""),
        !0
    }
};
$(function() {
    Report.init()
}),
Array.prototype.filter || (Array.prototype.filter = function(t) {
    "use strict";
    if (void 0 === this || null === this)
        throw new TypeError;
    var e = Object(this)
      , i = e.length >>> 0;
    if ("function" != typeof t)
        throw new TypeError;
    for (var n = [], s = arguments.length >= 2 ? arguments[1] : void 0, a = 0; a < i; a++)
        if (a in e) {
            var o = e[a];
            t.call(s, o, a, e) && n.push(o)
        }
    return n
}
);
var EventBus = new EventManger;
$(function() {
    function t() {
        var t = arguments;
        o <= a - 1 && (s.eq(o).stop(!0).animate({
            width: "300px"
        }, 500).siblings().stop(!0).animate({
            width: "98px"
        }, 500),
        ++o == a && (o = 0)),
        n = setTimeout(t.callee, 5e3)
    }
    function e() {
        var t = (r.offset().top,
        $(window).scrollTop(),
        $("body").outerHeight(),
        d.height(),
        $(window).height() - ($("#footer").offset().top - $(document).scrollTop()));
        t > 0 ? l.css("bottom", t) : l.css("bottom", 0)
    }
    function i(t) {
        t.find("img").each(function(t, e) {
            "" == $(this).attr("src") && $(this).attr("src", $(this).attr("data-src"))
        })
    }
    if ($.fn.hoverDelay = function(t) {
        var e, i, n = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function() {
                $.noop()
            },
            outEvent: function() {
                $.noop()
            }
        }, s = $.extend(n, t || {});
        return $(this).each(function() {
            $(this).hover(function() {
                clearTimeout(i),
                e = setTimeout(s.hoverEvent, s.hoverDuring)
            }, function() {
                clearTimeout(e),
                i = setTimeout(s.outEvent, s.outDuring)
            })
        })
    }
    ,
    $(".home-box .slider-main").length && ($(".home-box .slider-main").hwSlider({
        autoPlay: !0,
        arrShow: !0,
        dotShow: !0,
        navShow: !0,
        touch: !0,
        height: 240,
        interval: 5e3,
        effect: "fade"
    }),
    $(".slider-box .pic-all").length)) {
        var n, s = $(".slider-box .pic-all a"), a = s.length, o = 0;
        s.hover(function() {
            clearTimeout(n),
            300 != $(this).width() && $(this).stop(!0).animate({
                width: "300px"
            }, 500).siblings().stop(!0).animate({
                width: "98px"
            }, 500)
        }, function() {
            o = $(this).index(),
            t()
        }),
        t()
    }
    if ($(".semwrap .slider-main").length && $(".slider-main").hwSlider({
        autoPlay: !0,
        arrShow: !0,
        dotShow: !1,
        navShow: !0,
        touch: !0,
        interval: 5e3,
        width: 582,
        speed: 1e3,
        height: 426
    }),
    $(".manager-list .manager-inner").length && $(".manager-list li").length > 1 && ($(".manager-list h3").css("background", "none"),
    $(".manager-list .manager-inner").hwSlider({
        autoPlay: !0,
        arrShow: !1,
        dotShow: !0,
        interval: 5e3,
        speed: 500,
        width: 330,
        height: 163,
        navShow: !0,
        touch: !0,
        effect: "fade",
        fadeOut: !1,
        afterSlider: function() {
            $(".manager-list .fold-text").removeAttr("style"),
            $(".manager-list .more-view").removeAttr("style").html('...展开<i class="fz fz-slidedown"></i></a>').show()
        }
    })),
    $(".picture-list .slider-main").length && $(".picture-list li").length > 1 && $(".picture-list .slider-main").hwSlider({
        autoPlay: !0,
        arrShow: !0,
        dotShow: !0,
        interval: 5e3,
        speed: 500,
        width: 330,
        height: 165,
        navShow: !0,
        touch: !0
    }),
    $(".job-menu dl").each(function(t) {
        var e = $(this);
        e.hoverDelay({
            hoverDuring: 100,
            outDuring: 100,
            hoverEvent: function() {
                switch (e.addClass("cur"),
                t) {
                case 0:
                    break;
                case 1:
                    e.children(".menu-sub").css({
                        top: "-42px"
                    });
                    break;
                case 10:
                    e.children(".menu-sub").css({
                        top: "auto",
                        bottom: "-1px"
                    })
                }
                if (0 != t && 1 != t && 10 != t || 10 == t && $(".ie7").length) {
                    var i = e.get(0).getBoundingClientRect().top
                      , n = e.find(".menu-sub");
                    n.height() < i ? n.css({
                        "margin-top": 53 - n.height() + "px"
                    }) : i < 70 && i > 0 ? n.css({
                        "margin-top": "-1px"
                    }) : i < 0 ? n.css({
                        "margin-top": i + "px"
                    }) : n.css({
                        "margin-top": 47 - i + "px"
                    })
                }
            },
            outEvent: function() {
                e.removeClass("cur").children(".menu-sub")
            }
        })
    }),
    $(".show-all").hover(function() {
        $(".show-all").hide(),
        $(".all-box").show()
    }, function() {}),
    $(".job-menu").hover(function() {}, function() {
        $(".show-all").show(),
        $(".all-box").hide()
    }),
    $(".menu-all .sub-tab li").eq(0).css({
        "border-top-color": "#fff",
        "padding-top": "15px",
        "padding-bottom": "14px"
    }),
    $(".menu-all .sub-tab li").eq(1).css({
        "margin-top": "-1px"
    }),
    $(".menu-all .sub-tab li").on("click", function() {
        var t = $(this).index()
          , e = $(this).parent().find("li")
          , i = $(this).closest(".menu-sub").find(".sub-content ul");
        e.removeClass("cur"),
        $(this).addClass("cur"),
        i.removeClass("show"),
        i.eq(t).addClass("show"),
        0 == t && $(this).css("border-top-color", "#fff"),
        t == e.length - 1 ? $(this).css({
            "border-bottom-color": "#fff",
            "margin-top": "-1px",
            "padding-top": "1px"
        }) : e.eq(e.length - 1).css({
            "border-bottom-color": "#FDFDFE",
            "margin-top": "0",
            "padding-top": "0"
        })
    }),
    $(".condition-insdustry .btn-all").on("click", function() {
        $(this).parent().toggleClass("show-all-insdustry")
    }),
    $(".condition-city .link-district").on("click", function() {
        $(".condition-district").addClass("show-condition-district"),
        $(".condition-area").removeClass("show-condition-area"),
        $(".condition-city .selected").removeClass("selected"),
        $(this).addClass("selected")
    }),
    $(".condition-city .link-area").on("click", function() {
        $(".condition-area").addClass("show-condition-area"),
        $(".condition-district").removeClass("show-condition-district"),
        $(".condition-city .selected").removeClass("selected"),
        $(this).addClass("selected")
    }),
    $(".siderbar-top").on("click", function() {
        $("html,body").animate({
            scrollTop: "0px"
        }, 400)
    }),
    $(window).on("scroll", function() {
        $(this).scrollTop() > 600 ? $("#siderbar").fadeIn() : $("#siderbar").hide()
    }),
    ($(".home-box").length || $(".condition-box").length) && ($(".job-list").on("click", "li", function(t) {
        var e = $(this)
          , i = e.find(".info-primary a")
          , n = i.attr("href")
          , s = $(".job-tab")
          , a = s.attr("data-keyword")
          , o = s.attr("data-l3code")
          , r = s.attr("data-filter")
          , l = s.attr("data-rescount")
          , c = s.attr("data-page")
          , d = i.attr("data-index")
          , h = i.attr("data-lid")
          , u = i.attr("data-itemid")
          , p = s.attr("data-lid")
          , f = i.attr("data-jobid");
        if ("A" != t.target.nodeName && 0 === $(t.target).parents(".name").length) {
            e.wrap('<form action="' + n + '" method="get" target="_blank"></form>'),
            e.append('<input type="hidden" name="ka" value="' + i.attr("ka") + '_blank" />'),
            e.closest("form").submit();
            try {
                _T.sendEvent(i.attr("ka") + "_job")
            } catch (t) {}
            e.find('input[name="ka"]').remove(),
            e.unwrap("form")
        }
        $.ajax({
            type: "POST",
            url: "/actionLog/search.json",
            data: {
                keyword: a,
                l3code: o,
                filter: r,
                rescount: l,
                page: c,
                index: d,
                lid: h,
                itemid: u,
                source: p,
                jobid: f
            },
            dataType: "json",
            success: function(t) {}
        })
    }),
    $(".job-list .info-primary h3.name").each(function(t) {
        var e = $(this);
        e.hoverDelay({
            hoverDuring: 400,
            hoverEvent: function() {
                if ("" === e.find(".info-detail .tags").text()) {
                    var t = e.find("a").first().attr("data-jid");
                    $.ajax({
                        type: "GET",
                        url: "/view/job/desc.json?jid=" + t,
                        data: {},
                        dataType: "json",
                        success: function(t) {
                            var i = t.data;
                            $(i.skillArray).each(function(t, i) {
                                e.find(".info-detail .tags").append("<span>" + i + "</span>")
                            }),
                            e.find(".info-detail p").html(i.postDescription),
                            e.find("a").addClass("cur")
                        }
                    })
                } else
                    e.find("a").addClass("cur")
            },
            outEvent: function() {
                e.find("a").removeClass("cur")
            }
        })
    })),
    $(".filter-select-box .dropdown-select").each(function(t) {
        var e = $(this);
        e.hover(function(t) {
            e.parent().addClass("cur")
        }, function() {
            e.parent().removeClass("cur")
        })
    }),
    $(".now-city-pos .dropdown-wrap").each(function(t) {
        var e = $(this);
        e.hoverDelay({
            hoverDuring: 100,
            outDuring: 100,
            hoverEvent: function() {
                e.addClass("cur")
            },
            outEvent: function() {
                e.removeClass("cur")
            }
        })
    }),
    $(".userinfo-box  .dropdown-select").on("click", function() {
        $(this).toggleClass("dropdown-select-open")
    }),
    $(document).on("click", function(t) {
        $(t.target).closest(".now-state").length || $(".userinfo-box  .dropdown-select").removeClass("dropdown-select-open")
    }),
    $(".filter-select-box .dropdown-select").on("click", "a", function(t) {
        t.stopPropagation()
    }),
    $(".now-state .dropdown-menu").on("click", "li", function() {
        var t = $(this).attr("data-val");
        $(".now-state input").val($(this).text()),
        $.ajax({
            type: "POST",
            url: "/geek/saveApplyStatus.json",
            data: {
                applyStatus: t
            },
            dataType: "json",
            success: function(t) {
                1 == t.rescode && $.toast({
                    content: "修改成功",
                    type: "success"
                })
            }
        })
    }),
    $(this).scrollTop() > 600 ? $("#siderbar").fadeIn() : $("#siderbar").hide(),
    $(".footer-scan").length) {
        $("#siderbar").css({
            bottom: "304px",
            transition: "all 0.2s"
        });
        var r = $("#footer")
          , l = $(".footer-scan")
          , c = $(".home-box .job-list")
          , d = $(window);
        c.css("margin-bottom", "105px"),
        e(),
        $(window).scroll(function() {
            e()
        }),
        l.find(".footer-scan-close").click(function() {
            l.fadeOut(300, function() {
                c.css({
                    "margin-bottom": "15px",
                    transition: "all 0.2s"
                }),
                $("#siderbar").css({
                    bottom: "214px",
                    transition: "all 0.2s"
                })
            })
        })
    }
    $(window).width() < 1348 && $(".footer-scan .btns").css("margin-right", "84px"),
    $(window).resize(function() {
        $(window).width() < 1348 ? $(".footer-scan .btns").css("margin-right", "84px") : $(".footer-scan .btns").css("margin-right", "0")
    }),
    $("#siderbar").on("click", ".siderbar-feedback", function() {
        Feedback.getContent()
    }),
    $("#footer").on("click", ".footer-feedback", function() {
        Feedback.getContent()
    }),
    $(".common-tab-box").on("click", "h3 span", function() {
        var t = $(this).index()
          , e = $(this).parents(".common-tab-box").first();
        $(this).parents("h3").first().find("span").removeClass("cur"),
        $(this).addClass("cur"),
        $(e).find("ul").removeClass("cur"),
        $(e).find("ul").eq(t).addClass("cur"),
        i($(e).find("ul").eq(t))
    }),
    i($(".common-tab-box ul.cur"))
}),
seriesLoadScripts(["/v2/web/geek/chat/mqtt.js", "/v2/web/geek/js/socket.js"], function() {});
var Feedback = {
    getContent: function() {
        var t = this;
        $.get("/faqfeedback/pc/create.json").success(function(e) {
            $.dialog({
                content: e.html,
                title: "发送反馈",
                closeText: !1,
                cancelButton: "取消",
                confirmButton: "确认",
                inline: !0,
                wrapClass: "pop-feedback",
                closeLayer: !1,
                onOpen: function(e) {
                    e.find(".verify-box img").on("click", function() {
                        $(this).attr("src", "/captcha/?randomKey=" + $(this).siblings(".randomkey").val() + "&_r=" + (new Date).getTime())
                    }),
                    e.find("#fileupload").on("click", function(i) {
                        $(this).next(".verify-box") ? t.checkForm($(".verify-box")) ? t.uploadPicture($(this), e) : i.preventDefault() : t.uploadPicture($(this), e)
                    })
                },
                onConfirm: function(e) {
                    return t.submitForm(e)
                }
            })
        })
    },
    uploadPicture: function(t, e) {
        var i = /(\.|\/)(png|jpg|jpeg)$/i
          , t = t
          , n = t.siblings(".preview")
          , s = t.closest(".upload")
          , a = e.find(".verify-box .ipt");
        $("#fileupload").fileupload({
            type: "POST",
            url: "/faqfeedback/pc/upload/picture.json",
            dataType: "json",
            acceptFileTypes: i,
            maxFileSize: 2e6,
            add: function(t, n) {
                var a = n.files[0]
                  , o = a.name;
                i.test(o) ? (s.find("a").html('上传图片<i class="icon-toast-loading"></i>'),
                n.formData = {
                    randomKey: e.find(".randomkey").val() || "",
                    captcha: e.find(".verify-box input").val() || ""
                },
                n.submit()) : alert("请上传png、jpg、jpeg 格式的文件")
            },
            done: function(t, i) {
                var o = i.result;
                o.rescode ? (setTimeout(function() {
                    e.addClass("upload-complate"),
                    n.html("").html('<img src="' + o.url[0] + '" data-img="' + o.url[1] + '"/>'),
                    s.find("a").html("上传图片")
                }, 500),
                e.addClass("upload-complate")) : (s.find("a").html("上传图片"),
                $.toast({
                    content: o.resmsg,
                    type: "error"
                }),
                "验证码错误" == o.resmsg && (a.val("").focus(),
                e.find(".verify-box img").click()))
            },
            error: function(t, e) {
                s.find("a").html("上传图片"),
                $.toast({
                    content: "上传失败",
                    type: "error"
                })
            }
        })
    },
    submitForm: function(t) {
        var e, i = t, n = i.find("textarea").val(), s = this;
        i.find(".ipt-wrap").each(function() {
            return e = s.checkForm($(this)),
            s.checkForm($(this))
        });
        var a = {
            content: n,
            imgurl: i.find(".preview img").attr("data-img") || "",
            screen: $(window).width() + "*" + $(window).height(),
            pk: $("#page_key_name").val(),
            randomKey: i.find(".randomkey").val(),
            captcha: $(".verify-box input").val()
        };
        return e && (e = !1,
        $.ajax({
            url: "/faqfeedback/pc/save.json",
            type: "POST",
            data: a,
            dataType: "JSON",
            timeout: 3e4,
            success: function(e) {
                e.rescode ? ($.toast({
                    content: "发送成功，感谢您的反馈 ：）",
                    type: "success"
                }),
                t.remove()) : ($.toast({
                    content: e.resmsg || "提交失败，请稍后再试",
                    type: "error"
                }),
                i.find(".verify-box .ipt").val(""),
                i.find(".verify-box img").click())
            },
            error: function(t) {}
        })),
        !1
    },
    checkForm: function(t) {
        var e, i = t.find(".ipt").val();
        if (void 0 != t.find(".ipt").attr("data-range")) {
            if (e = t.find(".ipt").attr("data-range").split(",")[1],
            i.length > e)
                return t.next(".text-error").html("请输入" + e + "个字以内的内容"),
                !1;
            t.next(".text-error").html("")
        }
        if ("" == i) {
            var n = t.find(".ipt").attr("data-blank");
            return t.find(".ipt").focus(),
            t.next(".text-error").html(n),
            !1
        }
        return t.next(".text-error").html(""),
        !0
    }
}
  , Search = {
    init: function() {
        Search.searchBox = $(".search-box"),
        Search.isLoading = !1,
        EventBus.subscribe("MESSAGE_STATISTIVS", function(t) {
            0 != t ? $(".nav-chat-num").show().text(t) : $(".nav-chat-num").hide().text("")
        }),
        $(".bottom-banner .closeIcon").on("click", function() {
            $(this).parents(".bottom-banner").hide()
        }),
        Search.searchBox.find(".city-sel").on("click", function(t) {
            if ($(t.target).closest(".city-box").length)
                return void ($(t.target).attr("data-val") && ($(this).find(".label-text b").attr("data-val", $(t.target).attr("data-val")).text($(t.target).text()),
                Search.searchBox.removeClass("show-city")));
            Search.searchBox.toggleClass("show-city")
        }),
        Search.searchBox.find(".industry-sel").on("click", function(t) {
            Search.searchBox.toggleClass("show-industry")
        }),
        Search.searchBox.find(".position-sel").on("click", function(t) {
            Search.searchBox.toggleClass("show-position")
        }),
        Search.searchBox.find(".dorpdown-province").on("mouseover", "li", function() {
            var t = $(this).index()
              , e = $(this).parent().find("li")
              , i = Search.searchBox.find(".dorpdown-city ul");
            e.removeClass("cur"),
            $(this).addClass("cur"),
            i.removeClass("show"),
            i.eq(t).addClass("show");
            var n = i.eq(t).find("li");
            n.length > 0 && i.eq(t).find("li.cur").length < 1 && n.eq(0).addClass("cur")
        }),
        Search.searchBox.find(".dorpdown-province").on("click", "li", function() {
            var t = $(this).index()
              , e = Search.searchBox.find(".dorpdown-city ul")
              , i = e.eq(t);
            i.find("li").length > 0 && i.find("li").eq(0).trigger("click")
        }),
        Search.searchBox.find(".dorpdown-city").on("click", "li", function() {
            var t = Search.searchBox.find(".city-sel").find(".label-text b")
              , e = Search.searchBox.find(".city-code")
              , i = Search.searchBox.find(".city-name");
            t.text($(this).text()),
            e.val($(this).attr("data-val")),
            i.val($(this).text()),
            Search.searchBox.find(".dorpdown-city ul .cur").removeClass("cur"),
            $(this).addClass("cur")
        }),
        Search.loadIndustryData(Search.renderIndustry),
        Search.loadCityData(Search.renderCity),
        Search.searchBox.find(".dropdown-menu").each(function() {
            function t(t) {
                a.length && (3 == a.attr("data-level") && a.html('<ul class="tree-1"></ul><ul class="tree-2"></ul><ul class="tree-3"></ul>'),
                2 == a.attr("data-level") && a.html('<ul class="tree-1"></ul><ul class="tree-2"></ul>'),
                Search.getTreeData(a, t)),
                o.length && Resume.getTag(formEl, !0),
                e.on("mouseenter", "li", function() {
                    if ($(this).closest(".select-tree").length) {
                        var e = $(this).closest(".select-tree").attr("data-level");
                        if ($(this).parent().find("li").removeClass("selected"),
                        $(this).addClass("selected"),
                        3 == e) {
                            if ($(this).closest(".tree-1").length)
                                return $(this).closest(".select-tree").find(".tree-3").hide(),
                                Search.getTreeData(a, t, $(this).attr("data-id")),
                                !1;
                            if ($(this).closest(".tree-2").length)
                                return $(this).closest(".select-tree").find(".tree-3").show(),
                                s.attr("level2", $(this).attr("data-id")),
                                Search.getTreeData(a, t, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")),
                                !1
                        }
                        if (2 == e) {
                            if ($(this).closest(".tree-1").length)
                                return $(this).closest(".select-tree").find(".tree-3").hide(),
                                Search.getTreeData(a, t, $(this).attr("data-id")),
                                !1;
                            if ($(this).closest(".tree-2").length)
                                return $(this).closest(".select-tree").find(".tree-3").show(),
                                s.attr("level2", $(this).attr("data-id")),
                                Search.getTreeData(a, t, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")),
                                !1
                        }
                    }
                }),
                e.on("click", "li", function() {
                    var t = $(this).closest(".select-tree").attr("data-level");
                    if (3 != t || $(this).closest(".tree-1").length || $(this).closest(".tree-2").length) {
                        if (3 != t || !$(this).closest(".tree-1").length)
                            return !1;
                        0 == $(this).attr("data-id") && (n.text("职位类型不限"),
                        s.val($(this).attr("")),
                        Search.searchBox.removeClass("show-position"))
                    } else
                        n.text($(this).text()),
                        s.val($(this).attr("data-val")),
                        Search.searchBox.removeClass("show-position")
                })
            }
            var e = $(this)
              , i = Search.searchBox.find(".position-sel")
              , n = i.find(".label-text b")
              , s = Search.searchBox.find(".position-code")
              , a = e.find(".select-tree")
              , o = e.find(".tags-cells");
            Search.loadPositionData(t)
        }),
        Search.searchBox.find("form").on("submit", function(t) {
            var e = $(this)
              , i = e.find(".ipt-search");
            if ("搜索职位、公司" == i.val() && i.val(""),
            "" != i.val() && window.localStorage) {
                var n = Storage.get("_Search_History");
                if (n)
                    if (n.indexOf(i.val()) === -1)
                        n.unshift(i.val()),
                        Storage.set("_Search_History", n);
                    else {
                        var s = [];
                        $(n).each(function(t, e) {
                            t >= 3 || e != i.val() && s.push(e)
                        }),
                        s.unshift(i.val()),
                        Storage.set("_Search_History", s)
                    }
                else
                    Storage.set("_Search_History", [i.val()])
            }
        }),
        $(document).on("click", function(t) {
            $(t.target).closest(".city-sel").length || $(t.target).closest(".dorpdown-province").length || Search.searchBox.removeClass("show-city"),
            $(t.target).closest(".position-sel").length || $(t.target).closest(".position-box").length || Search.searchBox.removeClass("show-position"),
            $(t.target).closest(".industry-sel").length || Search.searchBox.removeClass("show-industry"),
            $(t.target).closest(".suggest-result").length || $(t.target).closest(".ipt-search").length || Search.searchBox.find(".suggest-result").hide()
        }),
        Search.searchBox.find(".industry-box").on("click", " li a", function(t) {
            return "不限" == $(this).text() ? Search.searchBox.find(".industry-sel").find(".label-text b").text("行业不限") : Search.searchBox.find(".industry-sel").find(".label-text b").text($(this).text()),
            Search.searchBox.find(".industry-code").val($(this).parent().attr("data-val")),
            Search.searchBox.find(".industry-box ul .cur").removeClass("cur"),
            $(this).parent().addClass("cur"),
            t.preventDefault(),
            Search.searchBox.toggleClass("show-industry"),
            !1
        }),
        Search.searchBox.find(".ipt-search").on("paste keyup", function(t) {
            if (13 != t.which && 27 != t.which && 38 != t.which && 40 != t.which) {
                Search.suggestTimer && clearTimeout(Search.suggestTimer);
                var e = $(this);
                Search.suggestTimer = setTimeout(function() {
                    Search.suggest(e)
                }, 200)
            }
        }),
        $(".geek-inside").length || Search.fillHistory(),
        Search.searchBox.find(".ipt-search").on("focus", function(t) {
            $(".geek-inside").length || (Search.fillHistory(),
            $(this).closest(".search-box").find(".suggest-result").show())
        }),
        Search.searchBox.find(".ipt-search").focus(function() {
            $(this).closest("form").addClass("search-form-shadow"),
            $(this).closest(".ipt-wrap").addClass("ipt-wrap-hover"),
            $(this).closest("form").find(".city-sel").addClass("city-sel-hover"),
            $(this).closest("form").find(".industry-sel").addClass("industry-sel-hover"),
            $(this).closest("form").find(".position-sel").addClass("position-sel-hover")
        }),
        Search.searchBox.find(".ipt-search").blur(function() {
            $(this).closest("form").removeClass("search-form-shadow"),
            $(this).closest(".ipt-wrap").removeClass("ipt-wrap-hover"),
            $(this).closest("form").find(".city-sel").removeClass("city-sel-hover"),
            $(this).closest("form").find(".industry-sel").removeClass("industry-sel-hover"),
            $(this).closest("form").find(".position-sel").removeClass("position-sel-hover")
        }),
        Search.searchBox.find(".suggest-result").on("click", "li", function() {
            Search.addInput($(this))
        });
        var t = -1;
        Search.searchBox.find(".ipt-search").keydown(function(e) {
            var i = Search.searchBox.find(".suggest-result li");
            switch (e.which) {
            case 38:
                i.removeClass("selected"),
                t == -1 ? (t = -1,
                t = i.length - 1) : t--,
                i.eq(t).addClass("selected"),
                Search.addInput(i.eq(t), !0),
                Search.scrollVisiable(i.eq(t), "up");
                break;
            case 40:
                e.preventDefault(),
                i.removeClass("selected"),
                t > i.length - 2 && (t = -1),
                t++,
                i.eq(t).addClass("selected"),
                Search.addInput(i.eq(t), !0),
                Search.scrollVisiable(i.eq(t), "down");
                break;
            case 13:
                t = -1;
                break;
            case 27:
                t = -1,
                Search.searchBox.find(".ipt-search").val("")
            }
        }),
        Search.searchBox.length && 0 == $(".company-detail-grab").length && $(".job-list li a,.job-list .company-card a").on("click", function() {
            var t = $(this)
              , e = t.closest(".job-list");
            $.ajax({
                type: "POST",
                url: "/actionLog/search.json",
                dataType: "JSON",
                data: {
                    keyword: e.attr("data-keyword"),
                    l3code: e.attr("data-l3code"),
                    filter: e.attr("data-filter"),
                    rescount: e.attr("data-rescount"),
                    page: e.attr("data-page"),
                    index: t.attr("data-index"),
                    lid: t.attr("data-lid"),
                    itemid: t.attr("data-itemid"),
                    jobid: t.attr("data-jobid"),
                    source: e.attr("data-source")
                }
            })
        }),
        $(".company-card").on("click", function(t) {
            $(t.target).hasClass("btn") || ($(t.target).closest(".company-card").find(".btn").eq(0).click(),
            window.location.href = $(this).find(".btn").eq(0).attr("href"))
        })
    },
    fillHistory: function() {
        try {
            if (window.localStorage) {
                var t = Storage.get("_Search_History");
                $(".suggest-result ul").empty(),
                $(t).each(function(t, e) {
                    t >= 3 || $(".suggest-result ul").append("<li>" + e + "</li>")
                })
            }
        } catch (t) {}
    },
    loadIndustryData: function(t) {
        $.ajax({
            type: "GET",
            url: "/common/data/oldindustry.json",
            data: {},
            dataType: "json",
            success: function(e) {
                t(e.data)
            }
        })
    },
    renderIndustry: function(t) {
        var e = $(".industry-box").find("ul");
        e.empty(),
        e.append('<li data-val=""><a href="javascript:;">不限</a></li>'),
        $(t).each(function(t, i) {
            e.append('<li data-val="' + i.code + '" ka="sel-industry-' + (t + 1) + '"><a href="javascript:;">' + i.name + "</a></li>")
        })
    },
    loadCityData: function(t) {
        $.ajax({
            type: "GET",
            url: "/common/data/city.json",
            data: {},
            dataType: "json",
            success: function(e) {
                t(e.data)
            }
        })
    },
    renderCity: function(t) {
        if (!$(".dorpdown-province").parents(".geek-inside").length) {
            $(".dorpdown-province").empty(),
            $(".dorpdown-city").empty();
            var e = t.hotCityList
              , i = t.cityList;
            $(".dorpdown-province").append('<li class="">热门</li>');
            var n = $("<ul></ul>");
            $(e).each(function(t, e) {
                $(n).append('<li ka="hot-city-' + e.code + '" data-val="' + e.code + '" class="cur">' + e.name + "</li>")
            }),
            $(".dorpdown-city").append(n),
            $(i).each(function(t, e) {
                $(".dorpdown-province").append('<li ka="sel-province-' + (t + 1) + '" class="">' + e.name + "</li>");
                var i = $("<ul></ul>")
                  , n = e.subLevelModelList;
                $(n).each(function(t, e) {
                    $(i).append('<li ka="hot-city-' + e.code + '" data-val="' + e.code + '" class="cur">' + e.name + "</li>")
                }),
                $(".dorpdown-city").append(i)
            })
        }
    },
    loadPositionData: function(t) {
        $.ajax({
            type: "GET",
            url: "/common/data/position.json",
            data: {},
            dataType: "json",
            success: function(e) {
                t(e.data)
            }
        })
    },
    getTreeData: function(t, e, i, n) {
        var s, a, o, r = "", l = "", c = "";
        for (s = 0; s < e.length; s++) {
            var d = e[s].subLevelModelList;
            if (r += '<li data-id="' + e[s].code + '">' + e[s].name + "</li>",
            d && i && e[s].code == i)
                for (a = 0; a < d.length; a++) {
                    var h = d[a].subLevelModelList;
                    if (l += '<li data-id="' + d[a].code + '">' + d[a].name + "</li>",
                    h && n && d[a].code == n)
                        for (o = 0; o < h.length; o++)
                            c += '<li data-val="' + h[o].code + '">' + h[o].name + "</li>"
                }
        }
        i || (t.find(".tree-1").html('<li data-id="0" class="">不限</li>' + r),
        t.find(".tree-2").html('<li class="blank">选择职类</li>')),
        n ? t.find(".tree-3").html(c) : i && t.find(".tree-2").html(l)
    },
    suggest: function(t) {
        var t = t
          , e = t.val().replace(/(^\s*)|(\s*$)/g, "")
          , i = t.closest(".search-box").find(".suggest-result")
          , n = i.find("ul");
        if ("" == e)
            return void i.hide();
        $.ajax({
            type: "GET",
            url: "/autocomplete/query.json",
            dataType: "JSON",
            cache: !1,
            data: {
                query: e
            },
            success: function(t) {
                var e, s, t = t, a = "";
                if (t.data && t.data.length) {
                    for (e = t.data,
                    s = 0; s < e.length; s++)
                        a += "<li>" + e[s].hlname + "</li>";
                    n.html(a),
                    i.show()
                } else
                    n.html('<li class="blank-data">暂无匹配结果</li>');
                Search.isLoading = !1
            },
            error: function(t) {
                Search.isLoading = !1
            }
        })
    },
    hightLight: function(t, e) {
        var e = e.replace(/(^\s*)|(\s*$)/g, "");
        if ("" == e)
            return t;
        var i = e;
        return t.replace(e.toLowerCase(), '<em class="text-blue">' + i + "</em>").replace(e.toUpperCase(), '<em class="text-blue">' + i + "</em>")
    },
    addInput: function(t, e) {
        var t = t
          , i = t.text().replace('<u class="h">', "").replace("</u>", "");
        Search.searchBox.find(".ipt-search").val(i),
        e || (Search.searchBox.find(".suggest-result").hide(),
        Search.searchBox.find("form").submit())
    },
    scrollVisiable: function(t, e) {
        var t = t
          , i = Search.searchBox.find(".suggest-result ul");
        if (!t)
            return !1;
        var n = i.find("li").length
          , s = $(t).index()
          , a = s > 4 ? s - 4 : 0
          , o = "down" == e && (a < n - 4 || 0 === s)
          , r = "up" == e && (s < n - 5 || s == n - 1);
        "up" == e && (a = s),
        (r || o) && i.scrollTop(a * $(t).height())
    }
};
$(function() {
    Search.init()
});
var Filter = {
    init: function() {
        Filter.filterBox = $(".filter-select-box"),
        Filter.filterBox.on("click", "ul li", function() {
            var t = $(this).find(".sub-list");
            t.hasClass("show-sub") ? t.removeClass("show-sub") : (Filter.filterBox.find(".show-sub").removeClass("show-sub"),
            t.addClass("show-sub"))
        }),
        $(document).on("click", function(t) {
            $(t.target).closest(".filter-select-box").length || Filter.filterBox.find(".show-sub").removeClass("show-sub")
        }),
        $(window).on("scroll", function() {
            $(this).scrollTop() > 300 ? $("#filter-box").length && ($("#filter-box").addClass("show-top"),
            $(".job-box").addClass("show-top")) : ($("#filter-box").removeClass("show-top"),
            $(".job-box").removeClass("show-top"))
        })
    }
};
$(function() {
    Filter.init()
});
var PositionHistory = {
    init: function() {
        if ($(".job-box .sider-list").length && window.localStorage) {
            var t = Storage.get("_Job_History");
            t && PositionHistory.renderList(t)
        }
    },
    renderList: function(t) {
        if (0 !== t.length) {
            var e = $(".job-box .sider-list").first();
            $(t).each(function(t, i) {
                t > 4 || $(e).append('<li>\n    <a href="/job_detail/' + i.job_id + '.html" ka="viewed_list_' + (t + 1) + '">\n        <h4>' + i.job_name + ' <span class="salary">' + i.job_salary + "</span></h4>\n        <p>" + i.company + "</p>\n    </a>\n</li>")
            }),
            $(e).show()
        }
    }
};
$(function() {
    PositionHistory.init()
});
var Detail = {
    init: function(t) {
        function e() {
            $(this).scrollTop() >= $(".job-box").offset().top - 80 ? r || (r = !0,
            o.slideDown(300, function() {
                r = !1
            })) : o.hide()
        }
        Detail.firstIn = !0,
        $(".links").css("height", "70px"),
        $(".links label").each(function() {
            var t = $(this).closest(".links")
              , e = !1
              , i = t.hasClass("links-friends");
            $(this).click(function() {
                e ? (i ? t.css("height", "30px") : t.css("height", "70px"),
                e = !1,
                $(this).html('<span>展开</span><i class="fz fz-slidedown"></i>')) : (t.css("height", "auto"),
                e = !0,
                $(this).html('<span>收起</span><i class="fz fz-slideup"></i>'))
            })
        }),
        $(".links-friends").css("height", "27px");
        var i = $(".links-friends label")
          , n = 0
          , s = $(".links-friends dd").width();
        if ($(".links-friends a").each(function() {
            n += $(this).width() + 26
        }),
        n > s ? i.show() : i.hide(),
        $(".business-detail").css("height", "46px"),
        $(".business-detail label").on("click", function() {
            var t = $(this).closest(".business-detail");
            t.toggleClass("show-business-all"),
            t.hasClass("show-business-all") ? ($(this).find("span").text("收起"),
            $(this).find(".fz").removeClass("fz-slidedown").addClass("fz-slideup")) : ($(this).find("span").text("展开"),
            $(this).find(".fz").removeClass("fz-slideup").addClass("fz-slidedown"))
        }),
        $(".btn-signup").on("click", function() {
            $(this).parents(".bottom-banner").length ? Detail.showSign(5) : Detail.showSign(1)
        }),
        $(".fold-text .more-view").on("click", function() {
            $(this).find(".fz-slidedown").length ? ($(this).parent().css({
                "max-height": "none",
                overflow: "visible"
            }),
            $(this).css("bottom", "-20px"),
            $(this).html('收起<i class="fz fz-slideup"></i></a>').show()) : ($(this).parent().removeAttr("style"),
            $(this).removeAttr("style"),
            $(this).html('...展开<i class="fz fz-slidedown"></i></a>').show())
        }),
        $(".company-card").on("click", function(t) {
            $(t.target).hasClass("btn") || (window.location.href = $(this).find(".btn").eq(0).attr("href"))
        }),
        $(".detail-content .job-sec .fold-text").text().length > 175 && $(".detail-content .job-sec .more-view").show(),
        $(".manager-list .fold-text").each(function() {
            $(this).text().length > 69 ? $(this).find(".more-view").show() : $(this).find(".more-view").remove()
        }),
        $(".company-info").length && $(".company-info .text").text().length < 250 && $(".company-info .look-all span").remove(),
        $(".detail-op").on("click", ".btn", function(t) {
            var e = $(this);
            e.hasClass("btn-outline") ? ($(".detail-grab").length || $(".company-detail-grab").length && !e.hasClass("btn-disabled") ? Detail.startChat(e) : Detail.deliveResume(e),
            t.preventDefault()) : e.hasClass("btn-startchat") && ("立即沟通" == e.text() ? (t.preventDefault(),
            Detail.startChat(e)) : Detail.startChat(e))
        }),
        $(".company-detail-grab").length && $(".company-detail-grab .load-more").on("click", function() {
            var t = $(".company-detail-grab").find(".job-list")
              , e = t.find(".load-more")
              , i = parseInt(t.attr("data-page"))
              , n = t.attr("data-companyid");
            "false" != t.attr("data-hasmore") && ($(this).find(".more").text("加载中..."),
            $.ajax({
                type: "GET",
                url: "/gongsi/ljobdata.json",
                data: {
                    companyId: n,
                    page: i + 1
                },
                dataType: "json",
                success: function(n) {
                    t.attr("data-page", i + 1),
                    t.find("ul").append(n.html),
                    n.hasMore || e.hide(),
                    e.find(".more").text("点击加载更多")
                },
                error: function(t) {}
            }))
        }),
        "undefined" != typeof _userInfo) {
            this.showMes();
            var a = this;
            if (_userInfo.isLogin) {
                if (!_userInfo.isPerfect) {
                    $(".container-tip");
                    setTimeout(function() {
                        Detail.canClick = !0,
                        $(".avatar img").on("click", function() {
                            a.showGuide()
                        })
                    }, 4e3),
                    $(".tip-box a").attr("href", "/geek/complete/guide.html")
                }
            } else {
                $(".container-tip");
                setTimeout(function() {
                    Detail.canClick = !0,
                    $(".avatar img").on("click", function() {
                        $(".jconfirm").length && $(".jconfirm").remove(),
                        Detail.canClick && a.showGuide()
                    })
                }, 4e3),
                $(".container-tip .tip-box>a").on("click", function() {
                    if ($(".jconfirm").length && $(".jconfirm").remove(),
                    1 != $(this).data("load")) {
                        var t = $(this);
                        t.data("load", !0),
                        $(".container-tip").fadeOut(function() {
                            $.confirm({
                                content: $("#pop-hide-container").html(),
                                title: !1,
                                confirmButton: !1,
                                cancelButton: !1,
                                closeIcon: !0,
                                columnClass: "pop-sign-box",
                                onOpen: function() {
                                    Singup.init()
                                },
                                onClose: function() {
                                    Singup.cdAni && (clearInterval(Singup.cdAni),
                                    Singup.cdAni = null),
                                    a.showMes()
                                }
                            }),
                            t.data("load", !1)
                        })
                    }
                })
            }
            if (_userInfo.hasKaAnotherS)
                try {
                    _T.sendEvent("detail_with_another_s_from_same_boss")
                } catch (t) {}
        }
        $(".job-detail .slider-main").length && $(".slider-main").hwSlider({
            autoPlay: !1,
            arrShow: !0,
            dotShow: !0,
            navShow: !0,
            touch: !0,
            width: 646,
            height: 386
        }),
        Detail.pushJobLocal();
        var o = ($(".job-banner"),
        $(".smallbanner"))
          , r = !1;
        if (!($(document).height() - $(window).height() < 260))
            return 0 != $(".job-banner").length && (e(),
            void $(window).scroll(function() {
                e()
            }))
    },
    pushJobLocal: function() {
        if ("undefined" != typeof _jobInfo && window.localStorage && _jobInfo) {
            var t = Storage.get("_Job_History");
            if (t)
                if (JSON.stringify(t).indexOf(JSON.stringify(_jobInfo)) === -1)
                    t.unshift(_jobInfo),
                    Storage.set("_Job_History", t);
                else {
                    var e = [];
                    $(t).each(function(t, i) {
                        t >= 5 || i.job_id != _jobInfo.job_id && e.push(i)
                    }),
                    e.unshift(_jobInfo),
                    Storage.set("_Job_History", e)
                }
            else
                Storage.set("_Job_History", [_jobInfo])
        }
    },
    showGrabTip: function(t) {
        $.dialog({
            content: '<div class="tip-text">抱歉，该职位当前无法投递</div>',
            title: "提示",
            type: "warning",
            closeText: !1,
            cancelText: "取消",
            confirmText: "查看推荐职位",
            wrapClass: "",
            onOpen: function(t) {},
            onConfirm: function(t) {
                window.location.href = "/job_detail/"
            }
        }),
        t.text("投递简历").removeClass("btn-loading")
    },
    deliveResume: function(t) {
        var e = t.attr("data-url");
        t.attr("redirect-url");
        t.hasClass("btn-loading") || t.hasClass("btn-disabled") || (t.html('<i class="icon-loading"></i>投递中').addClass("btn-loading"),
        $.ajax({
            url: e,
            type: "post",
            dataType: "json",
            data: {},
            success: function(e) {
                var e = e;
                e.rescode ? 1 == e.rescode ? $.dialog({
                    content: '<div class="tip-text">您的附件简历已经发送给Boss，请静候佳音。</div>',
                    title: "投递成功",
                    type: "success",
                    closeText: !1,
                    cancelText: "",
                    confirmText: "确定",
                    wrapClass: "",
                    onOpen: function(t) {
                        var e = t.find(".btn-sure")
                          , i = 4
                          , n = setInterval(function() {
                            i <= 1 ? (clearInterval(n),
                            t.remove()) : (i--,
                            e.text("确定 (" + i + ")"))
                        }, 1e3);
                        $(".btn-sendresume").text("已投递")
                    },
                    onConfirm: function(t) {
                        $(".btn-sendresume").removeClass("btn-loading").addClass("btn-disabled"),
                        t.remove()
                    }
                }) : 3 == e.rescode || 4 == e.rescode ? (Detail.showSign(e.rescode),
                t.text("投递简历").removeClass("btn-loading")) : 5 == e.rescode ? t.text("已投递").removeClass("btn-loading").addClass("btn-disabled") : 6 == e.rescode ? ($.confirm({
                    content: '<div class="deliver-pop"><p class="text">请您上传附件简历，即可完成投递。</p><div class="resume-attachment"></div><div class="btns"><input id="fileupload" type="file" name="file" class="file" /><button type="button" class="btn">立即上传</button><button type="button" class="btn btn-outline">先聊聊</button></div></div>',
                    title: "上传附件简历",
                    confirmButton: !1,
                    cancelButton: !1,
                    closeIcon: !0,
                    columnClass: "pop-tip-box pop-detail",
                    onOpen: function() {
                        var t = this;
                        t.$content.find(".btn").on("click", function() {
                            "确定" == $(this).text() && ($(".job-detail .btn-sendresume").click(),
                            t.close()),
                            "先聊聊" == $(this).text() && ($(".job-detail .btn-startchat").click(),
                            t.close())
                        }),
                        Resume.setUpload()
                    },
                    onClose: function() {}
                }),
                t.text("投递简历").removeClass("btn-loading")) : 7 == e.rescode ? ($.dialog({
                    content: '<div class="tip-text">' + e.resmsg + "</div>",
                    title: "您不太符合该boss的要求",
                    type: "warning",
                    closeText: !1,
                    cancelText: "再看看",
                    confirmText: "继续投递",
                    wrapClass: "",
                    onOpen: function(e) {
                        e.find(".btn-sure").attr("data-url", t.attr("data-url") + "&isSureSend=1").attr("redirect-url", t.attr("redirect-url"))
                    },
                    onConfirm: function(t) {
                        Detail.deliveResume(t.find(".btn-sure")),
                        t.remove()
                    }
                }),
                t.text("投递简历").removeClass("btn-loading")) : 8 == e.rescode && ($.dialog({
                    content: '<div class="tip-text">此职位不支持投递，请与Boss直接沟通</div>',
                    title: "提示",
                    type: "warning",
                    closeText: !1,
                    cancelText: "",
                    confirmText: "确定",
                    wrapClass: "",
                    onOpen: function(t) {},
                    onConfirm: function(t) {
                        t.remove()
                    }
                }),
                t.text("投递简历").removeClass("btn-loading")) : 1011 == e.code ? (Detail.showSign(1011),
                t.text("投递简历").removeClass("btn-loading")) : (alert(e.resmsg),
                t.text("投递简历").removeClass("btn-loading"))
            },
            error: function(e) {
                t.text("投递简历").removeClass("btn-loading")
            }
        }))
    },
    startChat: function(t) {
        var t = t
          , e = t.attr("data-url")
          , i = t.attr("redirect-url");
        "javascript:;" == t.attr("href") && (t.addClass("btn-disabled"),
        $.ajax({
            type: "POST",
            url: e,
            dataType: "JSON",
            data: null,
            success: function(e) {
                e.rescode ? 9 == e.rescode ? Detail.showGrabTip(t) : 1 == e.rescode ? ("立即沟通" == t.text() ? (null == e.greeting ? e.greeting = "未设置招呼语" : e.greeting = e.greeting,
                $.dialog({
                    content: '<div class="greet-con" id="greet">' + e.greeting + "</div><span>如需修改打招呼内容，请在APP的设置页面中进行修改</span>",
                    title: "已向BOSS发送消息",
                    closeText: !1,
                    cancelText: "取消",
                    confirmText: "继续沟通",
                    inline: !0,
                    wrapClass: "greet-pop",
                    closeLayer: !1,
                    onOpen: function(t) {
                        t.find(".verify-box img").on("click", function() {
                            $(this).attr("src", "/captcha/?randomKey=" + $(this).siblings(".randomkey").val() + "&_r=" + (new Date).getTime())
                        }),
                        t.find("#fileupload").on("click", function(e) {
                            $(this).next(".verify-box") ? _this.checkForm($(".verify-box")) ? _this.uploadPicture($(this), t) : e.preventDefault() : _this.uploadPicture($(this), t)
                        })
                    },
                    onConfirm: function(t) {
                        window.location.href = i
                    }
                })) : window.location.href = i,
                t.attr("href", t.attr("redirect-url")).text("继续沟通"),
                t.removeClass("btn-disabled")) : 3 != e.rescode && 4 != e.rescode || (Detail.showSign(e.rescode),
                t.removeClass("btn-disabled")) : 1011 == e.code ? (Detail.showSign(1011),
                t.removeClass("btn-disabled")) : (alert(e.resmsg),
                t.removeClass("btn-disabled"))
            },
            error: function(e) {
                t.removeClass("btn-disabled")
            }
        }))
    },
    showSign: function(t) {
        $.confirm({
            content: $(".sign-wrap").html(),
            title: !1,
            confirmButton: !1,
            cancelButton: !1,
            closeIcon: !0,
            columnClass: "pop-sign-box",
            onOpen: function() {
                var e = this;
                Sign.init(e.$content),
                4 == t ? (e.$content.find(".sign-welcome").show(),
                Sign.countDown(e.$content.find(".sign-welcome .welcome-box .count-down"), function() {
                    window.location.href = e.$content.find(".sign-welcome .welcome-box .btn").attr("href")
                })) : 5 == t ? (e.$content.find(".sign-register").show(),
                e.$content.find(".sign-register").find(".verifyimg").click()) : e.$content.find(".sign-pwd").show()
            },
            onClose: function() {
                Sign.interCount && (clearInterval(Sign.interCount),
                Sign.interCount = null)
            }
        })
    },
    showMes: function() {
        if (!_userInfo.isLogin || !_userInfo.isPerfect) {
            var t = $(".message");
            Detail.canClick = !1,
            $.each(_userInfo.text, function(e, i) {
                t.find(".text").eq(e).html(i)
            }),
            Detail.firstIn ? (setTimeout(function() {
                $(".container-mes").fadeIn(),
                $(".container-mes").find(".avatar").css("display", "block")
            }, 1e3),
            setTimeout(function() {
                t.css("top", "40px"),
                t.fadeIn(),
                t.find("li").eq(0).fadeIn()
            }, 1800),
            setTimeout(function() {
                t.find("li").eq(1).fadeIn()
            }, 2600),
            setTimeout(function() {
                t.find("li").eq(2).fadeIn(),
                Detail.canClick = !0
            }, 3400),
            Detail.firstIn = !1) : (t.css("top", "40px"),
            t.fadeIn(200),
            $(".container-mes").find(".avatar").fadeIn(200),
            Detail.canClick = !0)
        }
    },
    showTip: function() {
        if ((!_userInfo.isLogin || !_userInfo.isPerfect) && _userInfo.showTip) {
            var t = $(".avatar img");
            Detail.canClick = !1,
            setTimeout(function() {
                $(".message").css("z-index", "101"),
                $(".aladingtip").fadeIn(),
                t.addClass("avatar-ani"),
                t.mouseover(function() {
                    $(this).removeClass("avatar-ani")
                }),
                t.mouseout(function() {
                    $(this).addClass("avatar-ani")
                })
            }, 3400),
            $(".aladingtip").click(function() {
                $(this).fadeOut(function() {
                    t.removeClass("avatar-ani"),
                    t.unbind("mouseover mouseout")
                })
            })
        }
    },
    showGuide: function() {
        var t = $(".container-tip")
          , e = $(".container-mes")
          , i = this;
        e.find(".message").css({
            top: "20px",
            "-webkit-transition": "all linear .2s",
            transition: "all linear .2s"
        }).fadeOut(),
        e.find(".avatar").fadeOut(),
        $(".aladingtip").fadeOut(),
        t.fadeIn(200),
        t.find(".tip-box").css({
            "margin-bottom": "35px",
            "-webkit-transition": "all linear .2s",
            transition: "all linear .2s"
        }),
        t.find(".trangle").css({
            bottom: "69px",
            "-webkit-transition": "all linear .2s",
            transition: "all linear .2s"
        }),
        t.find("a.close").click(function() {
            t.find(".tip-box").css({
                "margin-bottom": "15px",
                "-webkit-transition": "all linear .2s",
                transition: "all linear .2s"
            }),
            t.find(".trangle").css({
                bottom: "49px",
                "-webkit-transition": "all linear .2s",
                transition: "all linear .2s"
            }),
            $(".message").css("top", "160px"),
            t.fadeOut(function() {
                i.showMes()
            }),
            $(".jconfirm").length && $(".jconfirm").remove()
        })
    }
};
$(function() {
    Detail.init()
});
var Deliver = {
    init: function() {
        0 != $(".deliver-list").length && (Deliver.isLoading = !1,
        Deliver.type = "list",
        Deliver.listContainer = $(".job-box"),
        Deliver.listWrap = Deliver.listContainer.find(".deliver-list"),
        Deliver.tipsContainer = Deliver.listWrap.find(".data-tips"),
        Deliver.listCon = Deliver.listWrap.find("ul"),
        Deliver.listMoreEl = Deliver.listWrap.find(".loadmore"),
        Deliver.para = {
            page: 0
        },
        Deliver.getData(1, !0),
        Deliver.listMoreEl.on("click", function() {
            Deliver.isLoading || Deliver.listMoreEl.hasClass("disabled") || Deliver.getData()
        }),
        Deliver.listCon.on("click", ".btn", function(t) {
            var e = $(this);
            Detail.startChat(e),
            t.preventDefault()
        }))
    },
    getData: function(t, e) {
        t && (Deliver.para.page = 0,
        Deliver.listCon.html(""),
        Deliver.listWrap.find(".user-list").hide(),
        Deliver.listWrap.find(".detail-box").hide()),
        Deliver.para.page++,
        Deliver.isLoading = !0,
        Deliver.para.page > 1 && (Deliver.listMoreEl.addClass("disabled"),
        Deliver.listMoreEl.text("正在加载中...")),
        $.ajax({
            type: "GET",
            url: "/geek/deliveryinfo.json",
            dataType: "JSON",
            cache: !1,
            data: Deliver.para,
            success: function(e) {
                var e = e
                  , i = "";
                1 == e.rescode && (1 == e.hasMore ? Deliver.listMoreEl.removeClass("disabled").text("加载更多").show() : Deliver.para.page > 1 && Deliver.listMoreEl.addClass("disabled").text("没有更多了").show(),
                "" == e.html ? t && Deliver.tipsContainer.html('<div class="data-blank"><i class="tip-nodata"></i><b>没有相关数据</b></div>').show() : (i += e.html,
                Deliver.listCon.append(i),
                Deliver.tipsContainer.html("").hide()),
                t && Deliver.listCon.find("li").length < 10 && Deliver.listMoreEl.text("没有更多了").addClass("disabled").hide()),
                Deliver.isLoading = !1
            },
            error: function(e) {
                Deliver.para.page > 1 && Deliver.listMoreEl.removeClass("disabled").text("数据加载出错").show(),
                Deliver.isLoading = !1,
                t && (Deliver.listMoreEl.hide(),
                Deliver.tipsContainer.html('<div class="data-blank"><i class="tip-errordata"></i><b>数据加载出错</b></div>').show())
            }
        })
    }
};
$(function() {
    Deliver.init()
}),
$(function() {
    $(".ie").length && (window.IE = !0);
    var t = function() {
        $.dialog({
            type: "info",
            title: "新头像已提交审核",
            content: '<div class="tip-text">头像修改已提交审核，审核通过后自动更新您的信息</div>',
            closeText: !0,
            confirmText: "知道了",
            cancelText: "",
            closeLayer: !1,
            preKa: "",
            wrapClass: "dialog-icons-default dialog-avatar-tip",
            lock: !0,
            onOpen: function(t) {},
            onConfirm: function(t) {
                t.remove()
            },
            onClose: function(t) {}
        })
    };
    $(".avatar_box").on("click", function() {
        if ($(".profile_form").length)
            window.IE ? $.initUploadPortrait({
                title: "上传照片",
                url: $("[upload]").attr("upload"),
                callback: function(e, i) {
                    var n = $(".profile_form .avatar_line img.avatar");
                    if ($("#user_info").length > 0 && $(window.parent.document).find(".aside_nav_bar .avatar img").attr("src", e[0]),
                    $(".resume-box").length) {
                        var s = n.closest("form");
                        $.ajax({
                            type: "POST",
                            url: s.attr("action"),
                            dataType: "JSON",
                            data: {
                                tiny: e[0],
                                large: e[1]
                            },
                            success: function(e) {
                                1 == e.rescode && (n.attr("src", e.url[1]),
                                n.closest("dd").find("input:hidden[name=large]").val(e.url[1]),
                                n.closest("dd").find("input:hidden[name=tiny]").val(e.url[0]),
                                n.closest("dd").find(".error_hint").html("").hide(),
                                e.verifyTip && t())
                            },
                            error: function(t) {}
                        })
                    }
                }
            }) : crop.show({
                callback: function(e) {
                    e && $.post($("[upload-base64-url]").attr("upload-base64-url"), {
                        data: e
                    }, function(e) {
                        if (e.rescode) {
                            var i = $(".profile_form .avatar_line img.avatar");
                            i.attr("src", e.url[0]),
                            i.closest("dd").find("input:hidden[name=tiny]").val(e.url[0]),
                            i.closest("dd").find("input:hidden[name=large]").val(e.url[1]),
                            $("#user_info").length > 0 && $(window.parent.document).find(".aside_nav_bar .avatar img").attr("src", e.url[0]),
                            e.verifyTip && t()
                        } else
                            alert("图片保存失败")
                    }, "json")
                }
            });
        else if (window.IE)
            $.initUploadPortrait({
                title: "上传照片",
                url: $("[upload]").attr("upload"),
                callback: function(e, i) {
                    var n = $(".profile_form .avatar_line img.avatar");
                    n.attr("src", e[1]),
                    n.closest("dd").find("input:hidden[name=large]").val(e[1]),
                    n.closest("dd").find("input:hidden[name=tiny]").val(e[0]),
                    n.closest("dd").find(".error_hint").html("").hide(),
                    i && i.verifyTip && t()
                }
            });
        else {
            var e = $(".avatar_layer")
              , i = $(this);
            crop.show({
                element: i,
                defaultAvatarHtml: e,
                callback: function(e) {
                    e && $.post($("[upload-base64-url]").attr("upload-base64-url"), {
                        data: e
                    }, function(e) {
                        if (e.rescode) {
                            var n = $(".avatar_box .avatar img");
                            n.attr("src", e.url[0]),
                            n.closest("dd").find("input:hidden[name=tiny]").val(e.url[0]),
                            n.closest("dd").find("input:hidden[name=large]").val(e.url[1]),
                            i.find(".tip-text").remove(),
                            e.verifyTip && t()
                        } else
                            alert("图片保存失败")
                    }, "json")
                }
            })
        }
    })
});
var Validate = {
    init: function(t, e, i) {
        var n = t
          , s = n.find("input,textarea");
        n.on("submit", function(t) {
            var a = !1;
            s.each(function() {
                if ($(this).hasClass("required") && !Validate.check($(this), !0))
                    return a = !1,
                    !1;
                a = !0
            }),
            a && (i ? Guide.postData(n, e) : Resume.postData(n, e)),
            t.preventDefault()
        }),
        s.each(function() {
            var t = $(this).closest("dd").find(".count-num");
            ($(this).hasClass("required") || $(this).attr("data-range")) && (e || Validate.check($(this), !1, t),
            $(this).bind("input keyup", function() {
                Validate.check($(this), !1, t)
            }))
        }),
        n.find(".form-btns .btn-back").on("click", function() {
            n.closest(".resume-item").removeClass("resume-item-open")
        }),
        n.find('input[name="locationName"]').on("blur", function() {
            "" != $(this).val() && "" == $(this).parent().find('input[name="location"]').val() && ($(this).val(""),
            Validate.showError($(this), "请输入正确的城市"))
        })
    },
    getLength: function(t) {
        var e = 0
          , t = t;
        len = t.length,
        charCode = -1;
        for (var i = 0; i < len; i++)
            charCode = t.charCodeAt(i),
            charCode >= 0 && charCode <= 128 || charCode >= 65248 && charCode <= 65373 || 12288 == charCode || 12289 == charCode || 12290 == charCode ? e += .5 : e += 1;
        return Math.round(e)
    },
    check: function(t, e, i) {
        var t = t
          , n = t.attr("data-range")
          , s = Validate.getLength(t.val())
          , a = t.val().replace(/(\s*$)/g, "");
        if ("" == a) {
            if (e)
                return Validate.showError(t, t.attr("data-blank")),
                !1;
            Validate.hideError(t)
        } else
            Validate.hideError(t);
        if ("locationName" == t.attr("name") && "" != a && "" == t.parent().find('input[name="location"]').val())
            return Validate.showError(t, "请输入正确的城市"),
            !1;
        if (n) {
            if (n = n.split(","),
            i && i.length && i.html("<em" + (s > n[1] ? ' class="red"' : "") + ">" + s + "</em>/" + n[1]),
            s > n[1] || s < n[0])
                return Validate.showError(t, "请输入" + n[0] + "-" + n[1] + "个字"),
                !1;
            Validate.hideError(t)
        }
        return !0
    },
    showError: function(t, e) {
        var i = '<div class="tip-text">' + e + "</div>";
        Validate.hideError(t),
        t.closest("dd").find(".tip-text").remove(),
        $(i).appendTo(t.closest("dd")),
        t.addClass("ipt-error")
    },
    hideError: function(t) {
        t.closest("dd").find(".tip-text").remove(),
        t.removeClass("ipt-error")
    }
};
$(function() {
    $(".form-resume").each(function() {
        Validate.init($(this))
    })
});
var FormsUI = {
    init: function(t) {
        var e = t || $(document);
        if (this.dropSelect(e),
        this.prettyRadio(e),
        e.find(".ipt-datetimepicker").length) {
            var i = new Date;
            nowYear = i.getFullYear(),
            nowMonth = i.getMonth() + 1,
            nowThisDate = i.getDate(),
            e.find(".ipt-datetimepicker").each(function(t) {
                var e = $(this)
                  , i = t
                  , n = e.attr("data-format") || "yyyy-mm-dd"
                  , s = e.hasClass("date-range")
                  , a = e.attr("data-today")
                  , o = e.attr("data-type")
                  , r = e.attr("data-minYear") || !1
                  , l = 2
                  , c = 2;
                (o && "y-m-d" == o || "y-m" == o) && (l = 4),
                "yyyy-mm" == n && (c = 3),
                e.datetimepicker({
                    format: n,
                    startView: l,
                    minView: c,
                    autoclose: 1,
                    weekStart: 1,
                    minLimitYear: r,
                    todayHighlight: !0,
                    container: _PAGE && _PAGE.isGeekChat ? "#resume-history" : "body",
                    endDate: nowYear + "-" + nowMonth + "-" + nowThisDate,
                    todayBtn: a ? 1 : 0
                }).on("changeDate", function(t) {
                    var i = e.closest(".form-row").find(".date-range").eq(0);
                    if (a) {
                        if (new Date(t.date) < new Date(i.val()))
                            return alert("结束时间不能小于开始时间"),
                            !1
                    } else if (s && "startDate" == e.attr("name")) {
                        var n = e.closest(".form-row").find(".date-range").eq(1);
                        new Date(t.date).getFullYear() == (new Date).getFullYear() && new Date(t.date).getMonth() == (new Date).getMonth() ? (n.parent().addClass("show-prefix-today"),
                        n.parent().find('input[name="now"]').val("1"),
                        n.removeClass("required")) : (n.parent().removeClass("show-prefix-today"),
                        n.parent().find('input[name="now"]').val(""),
                        n.addClass("required")),
                        "1989-01" == e.val() ? n.datetimepicker("setStartDate", "1990-01") : n.datetimepicker("setStartDate", e.val())
                    }
                    s && "endDate" == e.attr("name") && (new Date(t.date).getFullYear() == (new Date).getFullYear() && new Date(t.date).getMonth() == (new Date).getMonth() ? (e.parent().addClass("show-prefix-today"),
                    e.parent().find('input[name="now"]').val("1"),
                    e.removeClass("required")) : (e.parent().removeClass("show-prefix-today"),
                    e.parent().find('input[name="now"]').val(""),
                    e.addClass("required"))),
                    $(t.target).attr("data-minyear") && (new Date(t.date).getFullYear() <= 1989 ? i.parent().addClass("show-prefix-minyear") : i.parent().removeClass("show-prefix-minyear"))
                }),
                "birthday" == e.attr("name") && (e.datetimepicker("setStartDate", "1968-01"),
                e.datetimepicker("setEndDate", "2003-12")),
                s && "startDate" == e.attr("name") && e.datetimepicker("setStartDate", "1989-01"),
                s && "endDate" == e.attr("name") && ("" == e.val() && "" == e.closest(".form-row").find(".date-range").eq(0).val() ? e.datetimepicker("setStartDate", "1990-01") : e.datetimepicker("setStartDate", e.closest(".form-row").find(".date-range").eq(0).val())),
                e.parent().find(".prefix-minyear,.prefix-today").on("click", function(t) {
                    if (!$(".datetimepicker").eq(i).is(":visible"))
                        return setTimeout(function() {
                            e.datetimepicker("show")
                        }, 1),
                        !1;
                    e.datetimepicker("hide")
                }),
                e.on("click", function() {
                    $(".workstartpicker-wrap").hide().removeClass("month-panel")
                })
            })
        }
        e.find(".ipt-workyear").length && e.find(".ipt-workyear").workstartpicker(),
        e.find(".start-salary").on("click", "li", function() {
            FormsUI.changeSalary($(this).attr("data-val"))
        }),
        e.find(".select-industry .industry-cells").on("click", "span", function() {
            var t = $(this).closest("dd");
            if ($(this).hasClass("selected"))
                $(this).removeClass("selected"),
                t.find(".select-industry .industry-title h3").removeClass("red"),
                t.find(".select-industry .industry-title p.gray").removeClass("red").text("最多可选 3 个技能标签");
            else {
                if (t.find(".select-industry .industry-cells .selected").length > 2)
                    return t.find(".select-industry .industry-title h3").addClass("red"),
                    void t.find(".select-industry .industry-title p.gray").addClass("red").text("最多可选 3 个技能标签");
                $(this).addClass("selected")
            }
        }),
        e.find(".select-industry .industry-title").on("click", ".btn", function(t) {
            t.preventDefault();
            var e = $(this).closest("dd")
              , i = e.find(".industry-title .ipt")
              , n = !1;
            if ("确定" == $(this).text()) {
                var s = []
                  , a = [];
                e.find(".select-industry .industry-cells .selected").each(function() {
                    s.push($(this).text()),
                    a.push($(this).attr("data-val") || $(this).text())
                }),
                s.length || (s.push("不限"),
                a.push("0")),
                e.find(".select-industry").closest("dd").find(".dropdown-select .ipt").val(s.join("·")),
                e.find(".select-industry").closest("dd").find('.dropdown-select input[type="hidden"]').val(a.join("·")),
                e.find(".select-industry").closest("dd").find(".dropdown-select").removeClass("dropdown-select-open"),
                e.find(".select-industry").closest("dd").find(".dropdown-menu").removeClass("dropdown-menu-open")
            } else if ("取消" == $(this).text())
                e.find(".select-industry").closest("dd").find(".dropdown-select").removeClass("dropdown-select-open"),
                e.find(".select-industry").closest("dd").find(".dropdown-menu").removeClass("dropdown-menu-open");
            else if ($(this).hasClass("btn-addtag")) {
                var o = Validate.getLength(i.val())
                  , r = e.find(".select-industry .industry-title p.gray");
                if ("" == i.val().replace(/(\s*$)/g, ""))
                    return r.text("请输入标签名称").addClass("red"),
                    void i.val("");
                if (o > 6)
                    return void r.text("请输入不超过6个字的标签名称").addClass("red");
                if (e.find(".select-industry .industry-cells span").each(function() {
                    if ($(this).text() == i.val())
                        return void (n = !0);
                    n = !1
                }),
                n)
                    r.addClass("red").text("该标签已存在");
                else {
                    if (e.find(".industry-cells .blank-tag").remove(),
                    r.text("最多可选 3 个技能标签"),
                    e.find(".select-industry .industry-cells .selected").length > 2)
                        return void r.addClass("red");
                    r.removeClass("red"),
                    e.find(".industry-cells").prepend('<span class="selected">' + i.val() + "</span>"),
                    i.val("")
                }
            }
        }),
        e.find(".ipt-autocomplete").on("input keyup", function() {
            var t = $(this);
            FormsUI.suggestTimer && clearTimeout(FormsUI.suggestTimer),
            FormsUI.suggestTimer = setTimeout(function() {
                t.parent().find('input[type="hidden"]').val(""),
                FormsUI.getSuggest(t)
            }, 200)
        }),
        e.find(".suggest-complete").on("click", "li", function() {
            FormsUI.setSuggest($(this))
        }),
        FormsUI.initIndustry(e)
    },
    initIndustry: function(t) {
        var e = t.find("input[name=industryStr]").length ? t.find("input[name=industryStr]") : t.find("input[name=industryCategory]")
          , i = t.find("input[name=industryCodes]").length ? t.find("input[name=industryCodes]") : t.find("input[name=industryCode]");
        if (e.length) {
            var n = []
              , s = e.val().split("·")
              , a = i.val().split("·");
            $.each(a, function(t, e) {
                n.push({
                    name: s[t],
                    code: a[t]
                })
            }),
            e.industry({
                multiple: !t.find("input[name=industryCategory]").length
            }).data("selected", n).on("selected.industry", function(t, n) {
                var s = []
                  , a = [];
                $.isArray(n) ? ($.each(n, function(t, e) {
                    s.push(e.name),
                    a.push(e.code)
                }),
                e.val(s.join("·")),
                i.val(a.join("·"))) : (e.val(n.name),
                i.val(n.code))
            })
        }
    },
    prettyRadio: function(t) {
        var t = t || $(document);
        t && t.find(".radio-list").each(function() {
            var t = $(this)
              , e = t.find('input[type="hidden"]');
            t.on("click", "label", function() {
                t.find("label").removeClass("radio-checked"),
                $(this).addClass("radio-checked"),
                e.val($(this).attr("data-val"))
            })
        })
    },
    dropSelect: function(t) {
        function e(t, e, i) {
            if (e.hasClass("ipt-range") && "start" == e.attr("data-range")) {
                var n = e.closest(".form-row")
                  , s = e.closest("dd").find(".dropdown-menu ul")
                  , a = s.find("li").last().attr("data-val")
                  , o = n.find('.ipt-range[data-range="end"]')
                  , r = o.parent().find('input[type="hidden"]')
                  , l = o.closest("dd").find(".dropdown-menu ul")
                  , c = t.attr("data-val") || t.val()
                  , d = '<li data-val="-1">至今</li>'
                  , h = (new Date).getFullYear()
                  , u = parseInt(c) + 4;
                s.find("li").each(function() {
                    $(this).attr("data-val") > c && c != h && $(this).attr("data-val") != a && (d += $(this).prop("outerHTML"))
                }),
                l.html(d),
                i || (u < h ? (o.val(u),
                r.val(u)) : (o.val(l.find("li").eq(0).text()),
                r.val(l.find("li").eq(0).attr("data-val"))))
            }
        }
        var t = t || $(document);
        t && (t.find(".dropdown-select").each(function() {
            var i = $(this)
              , n = i.find('.ipt-range[data-range="start"]')
              , s = i.find('input[name="highSalary"]');
            i.on("click", function() {
                $(this).hasClass("dropdown-disabled") || ($(this).hasClass("dropdown-select-open") || (t.find(".dropdown-select-open").removeClass("dropdown-select-open"),
                t.find(".dropdown-menu-open").removeClass("dropdown-menu-open")),
                $(this).toggleClass("dropdown-select-open"),
                i.next(".dropdown-menu").toggleClass("dropdown-menu-open"))
            }),
            i.find('.ipt-range[data-range="end"]') && e(n, n, !0),
            "" == s.val() && (s.closest(".dropdown-select").addClass("dropdown-disabled"),
            s.closest(".dropdown-select").find(".ipt").attr("disabled", "disabled")),
            s.length && "" != s.val() && ("请选择" == s.val() ? s.parent().hide() : (s.val(s.parent().find(".ipt").val()),
            FormsUI.changeSalary(s.closest("dd").find('input[name="lowSalary"]').val().replace("K", ""), !0)))
        }),
        t.find(".dropdown-menu").each(function() {
            var i = $(this)
              , n = i.prev(".dropdown-select")
              , s = n.find("input[readonly]")
              , a = n.find('input[type="hidden"]')
              , o = i.find(".select-tree")
              , r = i.find(".tags-cells");
            o.length && (3 == o.attr("data-level") && o.html('<ul class="tree-1"></ul><ul class="tree-2"></ul><ul class="tree-3"></ul>'),
            2 == o.attr("data-level") && o.html('<ul class="tree-1"></ul><ul class="tree-2"></ul>'),
            FormsUI.getTreeData(o, jobData)),
            r.length && Resume.getTag(t, !0),
            i.on("click", "li", function() {
                if ($(this).closest(".select-tree").length) {
                    var t = $(this).closest(".select-tree").attr("data-level");
                    if ($(this).parent().find("li").removeClass("selected"),
                    $(this).addClass("selected"),
                    3 == t) {
                        if ($(this).closest(".tree-1").length)
                            return $(this).closest(".select-tree").find(".tree-3").hide(),
                            FormsUI.getTreeData(o, jobData, $(this).attr("data-id")),
                            !1;
                        if ($(this).closest(".tree-2").length)
                            return $(this).closest(".select-tree").find(".tree-3").show(),
                            a.attr("level2", $(this).attr("data-id")),
                            FormsUI.getTreeData(o, jobData, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")),
                            !1
                    }
                    if (2 == t) {
                        if ($(this).closest(".tree-1").length)
                            return $(this).closest(".select-tree").find(".tree-3").hide(),
                            FormsUI.getTreeData(o, jobData, $(this).attr("data-id")),
                            !1;
                        if ($(this).closest(".tree-2").length)
                            return $(this).closest(".select-tree").find(".tree-3").show(),
                            a.attr("level2", $(this).attr("data-id")),
                            FormsUI.getTreeData(o, jobData, $(this).closest(".select-tree").find(".tree-1 .selected").attr("data-id"), $(this).attr("data-id")),
                            !1
                    }
                }
                if (e($(this), s),
                s.val($(this).text()),
                a.val($(this).attr("data-val")),
                a.closest("dd").find(".tip-text").remove(),
                i.removeClass("dropdown-menu-open"),
                n.removeClass("dropdown-select-open"),
                "position" == a.attr("name")) {
                    var r = $(this).closest(".form-resume").find(".select-tags");
                    r.closest("dd").find(".ipt").val(""),
                    r.closest("dd").find('input[type="hidden"]').val(""),
                    Resume.getTag(r.closest(".form-resume"))
                }
                if ("position" == a.attr("name") && $(this).closest(".form-work")) {
                    var r = $(this).closest(".form-work").find(".select-tags");
                    r.closest("dd").find(".ipt").val(""),
                    r.closest("dd").find('input[type="hidden"]').val(""),
                    Resume.getTag(r.closest(".form-work"))
                }
            })
        }),
        $(document).on("click", function(e) {
            $(e.target).closest(".dropdown-menu").length || $(e.target).closest(".dropdown-select").length || (t.find(".dropdown-select").removeClass("dropdown-select-open"),
            t.find(".dropdown-menu").removeClass("dropdown-menu-open"))
        }))
    },
    getTreeData: function(t, e, i, n) {
        var s, a, o, r = "", l = "", c = "";
        for (s = 0; s < e.length; s++) {
            var d = e[s].children;
            if (r += '<li data-id="' + e[s].id + '">' + e[s].name + "</li>",
            d && i && e[s].id == i)
                for (a = 0; a < d.length; a++) {
                    var h = d[a].children;
                    if (l += '<li data-id="' + d[a].id + '">' + d[a].name + "</li>",
                    h && n && d[a].id == n)
                        for (o = 0; o < h.length; o++)
                            c += '<li data-val="' + h[o].id + '">' + h[o].name + "</li>"
                }
        }
        i || (t.find(".tree-1").html(r),
        t.find(".tree-2").html('<li class="blank">选择职类</li>')),
        n ? t.find(".tree-3").html(c) : i && t.find(".tree-2").html(l)
    },
    changeSalary: function(t, e) {
        var i = $(".end-salary")
          , n = i.find(".ipt")
          , s = i.find('input[type="hidden"]')
          , a = i.find("ul")
          , t = t
          , o = 0;
        if (t && (n.closest(".dropdown-select").removeClass("dropdown-disabled"),
        n.removeAttr("disabled")),
        "面议" == t ? (n.val("面议").parent().hide(),
        s.val("面议")) : (t = parseInt(t, 10),
        n.val(n.val() + "K").parent().show()),
        t <= 50) {
            e || (n.val(t + 1 + "K"),
            s.val(t + 1)),
            a.html("");
            for (var r = t + 1; r <= 2 * t; r++) {
                var l = "";
                l += '<li data-val="' + r + '">' + r + "K</li>",
                $(l).appendTo(a)
            }
        }
        if (t > 50 && t < 260) {
            e || (n.val(t + 10 + "K"),
            s.val(t + 10)),
            a.html(""),
            o = t < 160 ? t + 50 : 2 * t,
            o > 200 && (o = 260);
            for (var r = t + 10; r <= o; r += 10) {
                var l = "";
                l += '<li data-val="' + r + '">' + r + "K</li>",
                $(l).appendTo(a)
            }
        }
    },
    getSuggest: function(el) {
        var el = el
          , url = el.attr("data-url")
          , keyword = el.val()
          , resultPannel = el.parent().find(".suggest-complete");
        if ("" == keyword)
            return void resultPannel.removeClass("dropdown-menu-open");
        resultPannel.html("<ul></ul>").addClass("dropdown-menu");
        var resultCon = resultPannel.find("ul");
        $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: {
                query: keyword
            },
            success: function(result) {
                var result = result.data, str = "", i;
                if ("string" == typeof result && (result = eval("(" + result + ")")),
                result && result.length) {
                    for (i = 0; i < result.length; i++)
                        str += '<li data-val="' + result[i].code + '">' + result[i].hlname + "</li>";
                    resultCon.html(str),
                    resultPannel.addClass("dropdown-menu-open")
                }
            },
            error: function(t) {}
        })
    },
    setSuggest: function(t) {
        var e = t.closest("dd").find(".ipt")
          , i = t.closest("dd").find('input[name="location"]');
        e.val(t.text()),
        i.val(t.attr("data-val")),
        t.closest(".suggest-complete").removeClass("dropdown-menu-open"),
        e.parent().find(".tip-text").remove()
    }
};
$(function() {
    ($(".resume").length || $(".job-detail").length) && FormsUI.init()
});
var ResumeEditor = {
    init: function() {}
}
  , Resume = {
    previewUrl: null,
    attachmentName: null,
    ownerTags: [],
    init: function() {
        if ($("#pop-resume").length) {
            if ($("#pop-resume .pop-success .content").css({
                background: "none",
                "overflow-y": "auto",
                "overflow-x": "hidden"
            }),
            $(".resume-loading").hide(),
            $("#pop-resume .pop-item .content").height($(window).height() - 200),
            $("#pop-resume .pop-success .content").height($(window).height() - 100),
            $("#pop-resume .pop-resume-close").on("click", function() {
                Resume.removePopResume(),
                $(".preview-refresh").parent().show(),
                $(".resume-loading").hide()
            }),
            $(".btn-confim").on("click", function() {
                Resume.stateChange(),
                Resume.saveResume(),
                Resume.removePopResume()
            }),
            $(".btn-change , .upload-again").on("click", function() {
                Resume.removePopResume(),
                $(".jconfirm-bg").show(),
                $("#fileupload").click(),
                $(".preview-refresh").parent().show(),
                $(".resume-loading").hide()
            }),
            $(".preview-refresh").click(function(t) {
                $(this).parent().hide(),
                $(".resume-loading").show(),
                Resume.loadResumeImg("/resume/pic4Owner/" + Resume.previewUrl)
            }),
            0 != $(".progress-score").length) {
                var t = $(".progress-score").text();
                $(".progress p").css("width", t)
            }
            Resume.canSubmit = !1,
            $(".resume-item").on("click", ".link-add, .link-edit", function(t) {
                Resume.getData($(this)),
                t.preventDefault()
            }),
            $(".resume-item").on("click", ".link-delete", function(t) {
                Resume.removeData($(this)),
                t.preventDefault()
            }),
            $(".resume-nav .link-edit").on("click", function(t) {
                var e = $(this).attr("data-target");
                Resume.getData($("#" + e).find(".link-edit")),
                t.preventDefault()
            }),
            $(".resume-nav .link-add").on("click", function(t) {
                var e = $(this).attr("data-target");
                Resume.getData($("#" + e).find(".link-add")),
                t.preventDefault()
            }),
            $("#fileupload").length && Resume.setUpload(),
            Resume.deleteFile(),
            $(".figure .upload-layer").on("click", function() {}),
            $(".btn-upload-file").hover(function() {
                $(".file-result").css("background", "#eee")
            }, function() {
                $(".file-result").css("background", "#f7f7f7")
            }),
            $(".upload-op .btn-upload-file").hover(function() {
                $(".upload-op .change").css("color", "#5dd5c8")
            }, function() {
                $(".upload-op .change").css("color", "#000")
            }),
            "undefined" != typeof editItem && (1 == editItem ? $(".fz-positon").parent().find(".link-add").click() : 2 == editItem && $(".fz-info").parent().find(".link-edit").click())
        }
    },
    getTag: function(t, e) {
        var i = t
          , n = i.find(".tags-cells")
          , s = ""
          , a = ""
          , o = (n.closest("dd").find(".ipt"),
        i.find('input[name="position"]').attr("level2"));
        o && $.ajax({
            type: "GET",
            url: " /common/data/positionSkill",
            dataType: "JSON",
            data: {
                positonLv2: o
            },
            success: function(t) {
                var i, t = t, o = "", r = n.closest("dd").find(".ipt").val().split("·"), l = [];
                if (t.length > 0) {
                    for (i = 0; i < t.length; i++)
                        o = $.inArray(t[i], r) > -1 ? ' class="selected"' : "",
                        a += "<span" + o + ' ka="tag-' + t[i] + '">' + t[i] + "</span>",
                        l.push(t[i]);
                    if (e)
                        for (var c = 0; c < r.length; c++)
                            $.inArray(r[c], l) == -1 && (Resume.ownerTags.push(r[c]),
                            s += '<span class="selected" ka="tag-' + r[c] + '">' + r[c] + "</span>")
                } else
                    a = '<div class="blank-tag">还未添加标签</div>';
                n.html(s + a)
            },
            error: function(t) {}
        })
    },
    getData: function(el) {
        var el = el
          , url = el.attr("data-url")
          , formCon = el.closest(".resume-item").find(".item-form");
        $(".resume-item").removeClass("resume-item-open"),
        $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: null,
            success: function(result) {
                var result = result;
                if ("string" == typeof result && (result = eval("(" + result + ")")),
                1 == result.rescode) {
                    formCon.html(result.html),
                    el.closest(".resume-item").addClass("resume-item-open"),
                    formCon.find(".form-btns .btn-back").on("click", function() {
                        el.closest(".resume-item").removeClass("resume-item-open"),
                        $("html,body").animate({
                            scrollTop: el.closest(".resume-item").offset().top + "px"
                        }, 500)
                    }),
                    formCon.find(".form-btns .btn-delete").unbind("click").on("click", function(t) {
                        Resume.removeData(el, $(this)),
                        t.preventDefault()
                    });
                    var isAdd = !1;
                    if (!result.resoper)
                        var isAdd = !0;
                    FormsUI.init(formCon.find("form"), isAdd),
                    Validate.init(formCon.find("form"), isAdd),
                    PlaceholderCheck.init(formCon.find("form"))
                } else
                    Resume.showError(result.resmsg);
                $("html,body").animate({
                    scrollTop: el.closest(".resume-item").offset().top + "px"
                }, 500),
                $(".ipt-workyear").length && $(".ipt-workyear").workstartpicker()
            },
            error: function(t) {
                Resume.showError()
            }
        })
    },
    postData: function(form, isAdd) {
        var formEl = form
          , url = formEl.attr("action")
          , primaryWrap = formEl.closest(".resume-item")
          , primaryCon = primaryWrap.find(".item-primary")
          , primaryModule = primaryWrap.attr("id");
        formEl.find(".show-prefix-today").length && (formEl.find('input[name="endDate"]').val(""),
        formEl.find('input[name="now"]').val("1"));
        var subData = formEl.serialize();
        $("input[name=birthday]").length && $("input[name=birthday]").is(":disabled") && (subData += "&birthday=" + $("input[name=birthday]").val()),
        $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: subData,
            success: function(result) {
                var result = result, str = "", resultId = "", itemEl;
                if ("string" == typeof result && (result = eval("(" + result + ")")),
                result.forceFace && (alert("您的账号当前处于不可使用状态，请登录BOSS直聘手机APP查看详情"),
                window.location.href = "/logout/"),
                1 == result.rescode) {
                    if (primaryWrap.removeClass("resume-item-open"),
                    str = result.html,
                    resultId = $(str).attr("id"),
                    "resume-userinfo" == primaryModule && (result.isAudit && $.confirm({
                        content: '<div class="tip-alert" style="font-size:14px;">修改已提交审核，审核通过后，将更新您的信息</div>',
                        title: "温馨提示",
                        closeIcon: !0,
                        confirmButton: "确定",
                        cancelButton: !1,
                        columnClass: "pop-tip-box pop-tip",
                        onOpen: function() {
                            this.$confirmButton.parent().css({
                                "text-align": "center",
                                "padding-right": "0px"
                            }),
                            this.$confirmButton.css("float", "none")
                        }
                    }),
                    primaryCon.find(".name").remove(),
                    primaryCon.find(".info-labels").remove(),
                    primaryCon.append(str)),
                    "resume-summary" == primaryModule && (primaryCon.find(".text").remove(),
                    primaryCon.append(str)),
                    "resume-purpose" == primaryModule && (primaryWrap.find('div[id="' + resultId + '"]').length ? primaryWrap.find('div[id="' + resultId + '"]').after(str).remove() : primaryCon.find(".info-labels").prepend(str)),
                    "resume-history" == primaryModule || "resume-project" == primaryModule || "resume-education" == primaryModule) {
                        var items, titleEl = primaryCon.find(".title"), loadEl = "";
                        "resume-history" == primaryModule && (loadEl = "history-project"),
                        "resume-project" == primaryModule && (loadEl = "history-project"),
                        "resume-education" == primaryModule && (loadEl = "history-education"),
                        isAdd ? primaryCon.find("." + loadEl).prepend(result.html) : primaryCon.find('div[id="' + resultId + '"]').replaceWith(result.html),
                        "resume-education" == primaryModule && (items = $("#resume-education").find(".item-primary .history-education .history-item"),
                        1 == items.length ? items.find(".op .vline,.op .link-delete").hide() : items.length > 1 && items.find(".op .vline,.op .link-delete").show())
                    }
                    "resume-social" == primaryModule && (primaryCon.find('div[id="' + resultId + '"]').length ? primaryCon.find('div[id="' + resultId + '"]').after(str).remove() : primaryCon.find(".social-account").prepend(str)),
                    $("html,body").animate({
                        scrollTop: formEl.closest(".resume-item").offset().top + "px"
                    }, 500)
                } else
                    result.bizcode ? 1156 == result.bizcode ? Resume.showError("工作经历数量已达上限，可删除部分经历再添加") : 1157 == result.bizcode ? Resume.showError("教育经历数量已达上限，可删除部分经历再添加") : 1158 == result.bizcode && Resume.showError("项目经验数量已达上限，可删除部分经历再添加") : Resume.showError(result.resmsg);
                Resume.canSubmit = !0
            },
            error: function() {
                Resume.canSubmit = !0,
                Resume.showError()
            }
        }),
        Resume.canSubmit = !1
    },
    removeData: function(el, btn) {
        var el = el
          , url = el.attr("data-url")
          , primaryWrap = el.closest(".resume-item")
          , primaryCon = primaryWrap.find(".item-primary")
          , primaryModule = primaryWrap.attr("id")
          , formCon = el.closest(".resume-item").find(".item-form");
        btn && (url = btn.attr("data-url")),
        $.confirm({
            content: '<div class="tip-alert">删除后不可恢复，确认删除吗？</div>',
            title: "温馨提示",
            closeIcon: !0,
            columnClass: "pop-tip-box pop-tip",
            confirm: function() {
                var _self = this;
                return $.ajax({
                    type: "POST",
                    url: url,
                    dataType: "JSON",
                    data: {},
                    success: function(result) {
                        var result = result;
                        if ("string" == typeof result && (result = eval("(" + result + ")")),
                        result.rescode) {
                            if (el.closest(".resume-item").removeClass("resume-item-open"),
                            "resume-purpose" == primaryModule && el.parent().parent().remove(),
                            "resume-history" == primaryModule || "resume-project" == primaryModule || "resume-education" == primaryModule) {
                                var closeParent = el.closest(".item-primary");
                                el.closest(".history-item").remove(),
                                "resume-project" != primaryModule && (1 == closeParent.find(".history-item").length ? (closeParent.find(".history-item .op .link-delete").hide(),
                                closeParent.find(".history-item .op .vline").hide()) : (closeParent.find(".history-item .op .link-delete").show(),
                                closeParent.find(".history-item .op .vline").show()))
                            }
                            "resume-social" == primaryModule && el.closest(".account-item").remove(),
                            $("html,body").animate({
                                scrollTop: primaryWrap.closest(".resume-item").offset().top + "px"
                            }, 500)
                        } else
                            Resume.showError(result.resmsg);
                        _self.close()
                    }
                }),
                !1
            },
            error: function() {
                Resume.showError()
            }
        })
    },
    showError: function(t) {
        if (!t)
            var t = "服务器错误，请稍后再试";
        $.confirm({
            content: '<div class="tip-alert">' + t + "</div>",
            title: "温馨提示",
            closeIcon: !0,
            confirmButton: "确定",
            cancelButton: !1,
            columnClass: "pop-tip-box pop-tip"
        })
    },
    showPopResume: function(t) {
        var e = $("#pop-resume .pop-item");
        $("#pop-resume").show(),
        e.hide(),
        e.eq(t).show(),
        $("body").css("overflow-y", "hidden"),
        $(".jconfirm-bg").hide()
    },
    removePopResume: function() {
        $("#pop-resume").hide(),
        $("body").css("overflow-y", "visible")
    },
    stateChange: function() {
        $(".upload").remove(),
        Resume.reLoadResume = !1,
        0 == $(".file-name").length ? ($(".resume-attachment").first().append('<div class="loadresume"><span class="file-name">' + Resume.attachmentName + "</span></div>"),
        $(".resume-attachment").first().find("h3").append(' <i class="resume-del">删除</i>                            \t<div class="upload-op">                               \t<i class="change">更新</i>                               \t<a class="btn-upload-file"><input id="fileupload" type="file" name="file" accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"></a>\n                                </div>')) : $(".file-name").text(Resume.attachmentName),
        $(".jconfirm-bg").show(),
        $(".deliver-pop .btns .btn").eq(0).text("确定"),
        $(".deliver-pop .btns .file").remove()
    },
    isImgLoad: function() {
        $(".pop-success .content img").each(function() {
            $(this).load(function() {
                $(".preview-refresh").parent().show(),
                $(".resume-loading").hide(),
                Resume.showPopResume(1)
            }),
            $(this).error(function() {
                Resume.showPopResume(3)
            })
        })
    },
    setUpload: function() {
        var url = "/geek/attresume/upload.json"
          , elProgress = $(".progress")
          , typeRule = /(\.|\/)(ppt|pptx|doc|docx|pdf|png|jpg|jpeg)$/i
          , maxSize = 2e6;
        $(".resume-attachment,.deliver-pop").on("click", "#fileupload", function() {
            $(this).blur(),
            $("#fileupload").fileupload({
                type: "POST",
                url: "/geek/attresume/upload.json",
                dataType: "text",
                acceptFileTypes: typeRule,
                maxFileSize: 2e6,
                add: function(t, e) {
                    var i = e.files[0]
                      , n = i.name;
                    $(".resume-title").text(n),
                    typeRule.test(n) ? (Resume.reLoadResume = !1,
                    e.submit(),
                    Resume.showPopResume(0)) : alert("请选择有效的文件")
                },
                done: function(e, data) {
                    var result = data.result;
                    "string" == typeof result && (result = eval("(" + result + ")")),
                    1 == result.rescode ? (Resume.previewUrl = result.previewUrl,
                    Resume.loadResumeImg("/resume/pic4Owner/" + result.previewUrl),
                    Resume.attachmentName = result.attachmentName) : Resume.showPopResume(2)
                },
                fail: function(t, e) {
                    Resume.showPopResume(2)
                }
            }).prop("disabled", !$.support.fileInput).parent().addClass($.support.fileInput ? void 0 : "disabled")
        }),
        $(".resume-attachment").trigger("click")
    },
    saveResume: function() {
        $.ajax({
            type: "POST",
            url: "/geek/attresume/save.json?previewUrl=" + Resume.previewUrl,
            dataType: "JSON",
            data: {},
            success: function(t) {
                1 == t.rescode || alert(t.resmsg)
            }
        })
    },
    loadResumeImg: function(t) {
        var e = new Image;
        e.src = t,
        e.onload = function() {
            Resume.consoleSuccessLog(),
            $(".pop-success .content").html('<img src="' + t + '" />'),
            $(".pop-success .content img").css({
                display: "block",
                width: "810px",
                margin: "0 auto"
            }),
            $(".preview-refresh").parent().show(),
            $(".resume-loading").hide(),
            $(".pop-success .content .msg").hide(),
            $(".pop-success .content .resume-loading").hide(),
            Resume.showPopResume(1)
        }
        ,
        e.onerror = function() {
            Resume.reLoadResume && (Resume.showPopResume(3),
            Resume.consoleLog(),
            $(".preview-fail .content .msg").show(),
            $(".preview-fail .content .resume-loading").hide()),
            Resume.reLoadResume || (Resume.loadResumeImg(t),
            Resume.reLoadResume = !0)
        }
    },
    consoleLog: function() {
        $.ajax({
            type: "POST",
            url: "/actionLog/previewFail.json",
            dataType: "JSON",
            data: {
                previewUrl: Resume.previewUrl
            },
            success: function(t) {}
        })
    },
    consoleSuccessLog: function() {
        $.ajax({
            type: "POST",
            url: "/actionLog/previewSuccess.json",
            dataType: "JSON",
            data: {
                previewUrl: Resume.previewUrl
            },
            success: function(t) {}
        })
    },
    deleteFile: function() {
        $(".resume-attachment").delegate(".resume-del", "click", function() {
            $.confirm({
                content: '<div class="tip-alert">确认删除该附件简历吗？</div>',
                title: "温馨提示",
                closeIcon: !0,
                columnClass: "pop-tip-box pop-tip",
                confirm: function() {
                    var t = this;
                    $.ajax({
                        type: "POST",
                        url: "/geek/attresume/delete.json",
                        dataType: "JSON",
                        data: {},
                        success: function(e) {
                            1 == e.rescode && ($(".resume-attachment").first().find(".loadresume").remove(),
                            $(".resume-attachment").first().find("h3").find(".upload-op").remove(),
                            $(".resume-attachment").first().find("h3").find(".resume-del").remove(),
                            $(".resume-attachment").first().append('<div class="upload"><div class="file-result">上传附件简历</div><div class="file-btn"><a class="btn-upload-file"><input id="fileupload" type="file" name="file" ka="user-resume-upload-file"></a></div><div class="file-tip"><p>支持5M以内doc、docx、pdf、jpg、png 格式附件</p></div></div>')),
                            t.close()
                        }
                    });
                    try {
                        _T.sendEvent("user-resume-delete-submit")
                    } catch (t) {}
                    return !1
                },
                cancel: function() {
                    try {
                        _T.sendEvent("user-resume-delete-cancel")
                    } catch (t) {}
                },
                error: function() {
                    Resume.showError()
                }
            })
        })
    }
};
$(function() {
    ($(".resume").length || $(".job-detail").length || $(".user-center").length) && Resume.init()
});
var Guide = {
    init: function() {
        $(".guide .container form").each(function() {
            FormsUI.init($(this)),
            "" != $(this).find(".required").val() ? Validate.init($(this), !1, !0) : Validate.init($(this), !0, !0)
        }),
        $(".position-info .center span").text(this.setBossCount),
        Guide.showExperance = !0,
        $(".btn-footer .prev").on("click", function() {
            Guide.showPrevForms($(this))
        })
    },
    __conversion: function(t) {
        try {
            _T.sendEvent(t)
        } catch (t) {}
    },
    setBossCount: function() {
        return Math.round(4e3 * Math.random() + 1e3)
    },
    showPrevForms: function(t) {
        "show" == t.attr("data-base") ? (t.parents(".info-box").addClass("hide").siblings(".base-info").removeClass("hide"),
        t.attr("data-base", "")) : t.parents(".info-box").addClass("hide").prev(".info-box").removeClass("hide")
    },
    postData: function(form, isAdd) {
        var formEl = form
          , formWrap = formEl.parents(".info-box")
          , formIndex = formWrap.index()
          , url = formEl.attr("action")
          , btnEl = formEl.find('.btn[type="submit"]')
          , oldText = btnEl.text();
        btnEl.addClass("btn-disabled").text("请稍后").css("pointer-events", "none");
        var ka = "complete-" + formEl.find('button[type="submit"]').attr("ka");
        formEl.find('input[name="startWorkYearCode"]').length && 0 == formEl.find('input[name="startWorkYearCode"]').val() && (Guide.showExperance = !1);
        var subData = formEl.serialize();
        $("input[name=birthday]").length && $("input[name=birthday]").is(":disabled") && (subData += "&birthday=" + $("input[name=birthday]").val()),
        $.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: subData,
            success: function(result) {
                "string" == typeof result && (result = eval("(" + result + ")")),
                result.forceFace && (alert("您的账号当前处于不可使用状态，请登录BOSS直聘手机APP查看详情"),
                window.location.href = "/logout/"),
                1 == result.rescode ? (Guide.__conversion(ka),
                result.toUrl ? ($.toast({
                    content: "资料已完善",
                    type: "success"
                }),
                setTimeout(function() {
                    window.location.href = result.toUrl
                }, 1e3)) : Guide.showExperance ? (formWrap.addClass("hide"),
                formWrap.next().removeClass("hide")) : (formWrap.addClass("hide"),
                formWrap.siblings(".education-info").removeClass("hide"),
                formWrap.siblings(".education-info").find(".prev").attr("data-base", "show"),
                Guide.showExperance = !0),
                result.encryptId && (formEl.find('input[name ="id"]').length ? formEl.find('input[name ="id"]').val(result.encryptId) : formEl.find('input[name ="expectedJobId"]').val(result.encryptId))) : Resume.showError(result.resmsg),
                btnEl.removeClass("btn-disabled").text(oldText).css("pointer-events", "auto")
            },
            error: function() {
                Resume.showError(),
                btnEl.removeClass("btn-disabled").text(oldText).css("pointer-events", "auto")
            }
        })
    }
};
$(function() {
    Guide.init()
});
var browser = {
    versions: function() {
        var t = navigator.userAgent;
        navigator.appVersion;
        return {
            trident: t.indexOf("Trident") > -1,
            presto: t.indexOf("Presto") > -1,
            webKit: t.indexOf("AppleWebKit") > -1,
            gecko: t.indexOf("Gecko") > -1 && t.indexOf("KHTML") == -1,
            mobile: !!t.match(/AppleWebKit.*Mobile.*/),
            ios: !!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            android: t.indexOf("Android") > -1 || t.indexOf("Adr") > -1,
            iPhone: t.indexOf("iPhone") > -1,
            iPad: t.indexOf("iPad") > -1,
            webApp: t.indexOf("Safari") == -1,
            weixin: t.indexOf("MicroMessenger") > -1,
            qq: " qq" == t.match(/\sQQ/i)
        }
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
  , ka_pr = "";
(browser.versions.mobile || browser.versions.android || browser.versions.ios) && (ka_pr = "wap_");
var Sign = {
    init: function(t) {
        t && void 0 !== PlaceholderCheck && PlaceholderCheck.init(),
        localStorageInstance("hasEnterJob", "");
        var e = t || $(".sign-wrap");
        Sign.source = getQueryString("s"),
        Sign.source && (Sign.directUrls = {
            recharge: "/weixin/official/toPay",
            actRecharge: "/special3SignUp/home?signUpId=" + getQueryString("signUpId"),
            wapSem: "/",
            url: getQueryString("jumpUrl") ? decodeURIComponent(getQueryString("jumpUrl")) : "/"
        }),
        function() {
            $(".sign-scan .qrcode-box").length && ($(".scan-help-down li").eq(1).hide(),
            $(".scan-help-top li").eq(0).css({
                "border-top-left-radius": "20px",
                "border-bottom-left-radius": "20px"
            }),
            $(".scan-help-top li").eq(1).css({
                "border-top-right-radius": "20px",
                "border-bottom-right-radius": "20px"
            }),
            $(".sign-scan .qrcode-box").hover(function() {
                $(this).children(".sign-scan-help").show().stop().animate({
                    "margin-left": "0px",
                    opacity: 1
                }, 200)
            }, function() {
                var t = $(this).children(".sign-scan-help");
                $(this).children(".sign-scan-help").stop().animate({
                    "margin-left": "-10px",
                    opacity: 0
                }, 200, function() {
                    t.hide()
                })
            })),
            $(".sign-scan .scan-help-top ul li").on("click", function() {
                var t = $(this).index();
                $(this).addClass("active").siblings().removeClass("active"),
                $(".scan-help-down li").eq(t).show().siblings().hide()
            })
        }(),
        e.find(".sign-tab").on("click", "span", function() {
            var t = $(this);
            t.hasClass("cur") || (t.hasClass("link-signin") && Sign.showPannel(e, "signin"),
            t.hasClass("link-sms") && Sign.showPannel(e, "sms"),
            t.hasClass("link-scan") && Sign.showPannel(e, "scan"))
        }),
        e.find(".purpose-row").on("click", "span", function() {
            var t = $(this).index();
            $(this).closest("form").find('input[name="purpose"]').val(t),
            $(this).addClass("cur").siblings().removeClass("cur")
        }),
        e.find(".text-tip .link-signup").on("click", function() {
            Sign.showPannel(e, "register")
        }),
        e.find(".text-tip .link-signin").on("click", function() {
            Sign.showPannel(e, "signin")
        }),
        e.find(".text-tip .link-sms").on("click", function() {
            Sign.showPannel(e, "sms")
        }),
        Sign.dropSelect(e),
        e.find("form").on("submit", function(t) {
            Sign.checkForm($(this)),
            t.preventDefault()
        }),
        e.find(".btn-sms").on("click", function() {
            var t = $(this).closest("form");
            Sign.checkForm(t, !0)
        }),
        e.find(".ipt").on("focus", function(t) {
            $(this).parent().addClass("focus-wrap")
        }).on("blur", function() {
            $(this).parent().removeClass("focus-wrap")
        }),
        e.find(".ipt-phone").removeAttr("ka").on("click", function() {
            try {
                _T.sendEvent(ka_pr + $(this).closest(".sign-form").data("flow") + "_mobileck")
            } catch (t) {}
        }),
        e.find(".verifyimg").on("click", function() {
            $(this).attr("src", "/captcha/?randomKey=" + $(this).closest(".form-row").find(".randomkey").val() + "&_r=" + (new Date).getTime());
            try {
                _T.sendEvent("signin_verify_code")
            } catch (t) {}
        }),
        e.find(".sign-form").each(function() {
            $(this).find("form").length && !$(this).find('form input[name="pk"]').length && $(this).find("form").prepend('<input type="hidden" name="pk" value="' + $("#page_key_name").val() + '" />');
            var t = "";
            if ($(this).hasClass("sign-pwd") && (t = "sincode"),
            $(this).hasClass("sign-sms") && (t = "sinsms"),
            $(this).hasClass("sign-scan") && (t = "sinqr"),
            $(this).hasClass("sign-register") && (t = "sup"),
            $(this).data("flow", ka_pr + t),
            $(this).is(":visible"))
                try {
                    _T.sendEvent(t + "_load")
                } catch (t) {}
            if ($(this).find(".randomkey").length && "" == $(this).find(".randomkey").val())
                return Sign.getRandomkey(e, $(this)),
                !1
        }),
        $(".sign-scan").is(":visible") && Sign.scanPending(e),
        cookie.get("hasShowLoginTip") ? e.find(".qrcode-tip").hide() : e.find(".qrcode-tip").show(),
        e.find(".qrcode-tip .gray").on("click", function() {
            e.find(".qrcode-tip").hide(),
            cookie.set("hasShowLoginTip", "1", 3e4)
        })
    },
    showPannel: function(t, e) {
        t.find(".sign-form").hide();
        var i, n;
        switch (e) {
        case "signin":
            i = t.find(".sign-pwd"),
            n = "sincodeck";
            break;
        case "sms":
            i = t.find(".sign-sms"),
            n = "sinsmsck";
            break;
        case "scan":
            i = t.find(".sign-scan"),
            n = "sinqrck";
            break;
        case "register":
            i = t.find(".sign-register"),
            n = "supck";
            break;
        case "welcome":
            i = t.find(".sign-welcome");
            break;
        case "history":
            i = t.find(".sign-history");
            break;
        case "deliver":
            i = t.find(".sign-deliver");
            break;
        case "validate":
            i = t.find(".sign-validate")
        }
        if (n) {
            i.data("flow", n);
            try {
                _T.sendEvent(ka_pr + n + "_load")
            } catch (t) {}
        }
        i.show(),
        i.find(".verifyimg").click(),
        "scan" == e && Sign.scanPending(t)
    },
    dropSelect: function(t) {
        t.find(".dropdown-select").each(function() {
            $(this).on("click", function() {
                $(this).hasClass("dropdown-disabled") || ($(this).toggleClass("dropdown-select-open"),
                $(this).closest(".form-row").find(".dropdown-menu").toggleClass("dropdown-menu-open"))
            })
        }),
        t.find(".dropdown-menu").each(function() {
            var t = $(this)
              , e = t.closest(".form-row").find(".dropdown-select")
              , i = e.find(".text-select")
              , n = e.find('input[type="hidden"]');
            t.on("click", "li", function() {
                i.text($(this).attr("data-val")),
                n.val($(this).attr("data-val")),
                n.closest("dd").find(".tip-text").remove(),
                t.removeClass("dropdown-menu-open"),
                e.removeClass("dropdown-select-open")
            })
        }),
        $(document).on("touchend click", function(e) {
            $(e.target).closest(".dropdown-menu").length || $(e.target).closest(".dropdown-select").length || (t.find(".dropdown-select").removeClass("dropdown-select-open"),
            t.find(".dropdown-menu").removeClass("dropdown-menu-open"))
        })
    },
    getRandomkey: function(t, e) {
        var e = e
          , i = e.find(".ipt-code")
          , n = i.attr("data-url")
          , s = e.find(".randomkey");
        "" == s.val() && $.ajax({
            url: n,
            type: "POST",
            dataType: "json",
            data: {
                pk: $("#page_key_name").val()
            },
            success: function(e) {
                1 == e.rescode && (t.find(".randomkey").val(e.randomKey),
                s.parent().find(".verifyimg").click(),
                t.find(".sign-scan .qrcode-box img").attr("src", "/qrcode/" + e.qrId),
                t.find(".uuid").val(e.qrId))
            },
            error: function(t) {}
        })
    },
    checkForm: function(t, e) {
        var t = t
          , i = t.find(".ipt-phone")
          , n = t.find('input[name="regionCode"]')
          , s = t.find(".ipt-pwd")
          , a = t.find(".ipt-code")
          , o = t.find(".ipt-sms")
          , r = (t.closest(".sign-form").find(".tip-error"),
        t.find(".agreement-tip input"));
        if (i.length) {
            if ("" == i.val()) {
                Sign.showError(t, "请填写手机号"),
                i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (t) {}
                return !1
            }
            if (/^\D+$/.test(i.val()))
                return i.val(""),
                !1;
            if ("+86" == n.val() && !/^(1[3456789][0-9]{9})$/.test(i.val())) {
                Sign.showError(t, "请正确填写手机号"),
                i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (t) {}
                return !1
            }
            if (!/^(\d{6,11})$/.test(i.val())) {
                Sign.showError(t, "请正确填写手机号"),
                i.focus();
                try {
                    _T.sendEvent(i.closest(".sign-form").data("flow") + "_mobile")
                } catch (t) {}
                return !1
            }
            if (r.length && !r.is(":checked"))
                return alert("请阅读并同意BOSS直聘用户协议，方可注册"),
                !1;
            Sign.hideError(t)
        }
        if (s.length) {
            if ("" == s.val())
                return Sign.showError(t, "请填写密码"),
                s.focus(),
                !1;
            Sign.hideError(t)
        }
        if (a.length) {
            if ("" == a.val())
                return Sign.showError(t, "请填写验证码"),
                a.focus(),
                !1;
            if (!a.val().match(/^.{4}$/))
                return Sign.showError(t, "请填写正确的验证码"),
                a.focus(),
                !1;
            if (a.val().match(/[\u4e00-\u9fa5]/))
                return Sign.showError(t, "请填写正确的验证码"),
                a.val(""),
                a.focus(),
                !1;
            Sign.hideError(t)
        }
        if (o.length && !e) {
            if ("" == o.val())
                return Sign.showError(t, "请填写短信验证码"),
                o.focus(),
                !1;
            if (!o.val().match(/^.{4}$/))
                return Sign.showError(t, "请填写正确的短信验证码"),
                o.focus(),
                !1;
            if (o.val().match(/\D+/))
                return Sign.showError(t, "请填写正确的短信验证码"),
                o.val(""),
                o.focus(),
                !1;
            Sign.hideError(t)
        }
        Sign.postData(t, e)
    },
    postData: function(formEl, isSms) {
        var formEl = formEl
          , formType = formEl.closest(".sign-form")
          , btnSms = formEl.find(".btn-sms")
          , url = formEl.attr("action")
          , btnEl = formEl.find(".form-btn .btn");
        if (isSms) {
            if (btnSms.hasClass("btn-disabled"))
                return;
            url = btnSms.attr("data-url"),
            btnSms.addClass("btn-disabled").html("请稍后")
        } else {
            if (btnEl.hasClass("btn-disabled"))
                return;
            btnEl.addClass("btn-disabled")
        }
        $.ajax({
            url: url,
            type: "post",
            dataType: "json",
            data: formEl.serialize(),
            success: function(result) {
                var result = result;
                if ("string" == typeof result && (result = eval("(" + result + ")")),
                1 == result.rescode) {
                    if (formType.hasClass("sign-pwd") && Sign.callbackPwd(formEl, result),
                    formType.hasClass("sign-sms"))
                        if (isSms)
                            if (2 == result.type) {
                                btnSms.html('已发送(<em class="num">60s</em>)').addClass("count-down btn-disabled"),
                                Sign.countDown(btnSms, function() {
                                    btnSms.html("发送验证码").removeClass("count-down btn-disabled")
                                }),
                                btnSms.parent().find(".ipt-sms").focus();
                                try {
                                    _T.sendEvent("signin_sms_send_sms")
                                } catch (t) {}
                            } else
                                Sign.showError(formEl, result.resmsg, !0),
                                btnSms.html("发送验证码").removeClass("count-down btn-disabled");
                        else
                            Sign.callbackSms(formEl, result);
                    if (formType.hasClass("sign-register"))
                        if (isSms)
                            if (2 == result.type)
                                Sign.showError(formEl, result.resmsg, !0),
                                btnSms.html("发送验证码").removeClass("count-down btn-disabled");
                            else {
                                btnSms.html('已发送(<em class="num">60s</em>)').addClass("count-down btn-disabled"),
                                Sign.countDown(btnSms, function() {
                                    btnSms.html("发送验证码").removeClass("count-down btn-disabled")
                                }),
                                btnSms.parent().find(".ipt-sms").focus(),
                                formEl.append('<input type="hidden" name="rescode" value="1" />');
                                try {
                                    _T.sendEvent("signin_register_send_sms")
                                } catch (t) {}
                            }
                        else
                            Sign.callbackRegister(formEl, result)
                } else if (0 == result.rescode) {
                    var option = {
                        content: result.resmsg,
                        confirmButton: "知道了",
                        openCallback: function(t) {
                            t.$confirmButton.parent().css("text-align", "center")
                        }
                    };
                    Sign.showConfirm(option),
                    isSms && btnSms.html("发送验证码").removeClass("btn-disabled"),
                    formEl.find(".ipt-code").val(""),
                    formEl.find(".verifyimg").click()
                } else if (7 == result.rescode || 8 == result.rescode) {
                    if (7 == result.rescode && 2 == result.bizcode) {
                        var option = {
                            content: '<div class="sign-hunter-gray">如果您是猎头，请以您的企业邮箱发送邮件至hunter@kanzhun.com申诉。邮件标题为“猎头注册申诉+您的手机号码”。<br />若您的同事已经成功注册Boss直聘猎头版，请在邮件中提供TA的手机号，我们会优先审核。</div>',
                            title: "此账号在BOSS直聘被多次举报，暂不支持使用",
                            confirmButton: "知道了",
                            columnClass: "pop-sign-hunter"
                        };
                        Sign.showConfirm(option)
                    } else if (7 != result.rescode || 3 != result.bizcode && 4 != result.bizcode)
                        if (7 == result.rescode && 5 == result.bizcode) {
                            var option = {
                                content: '<div class="sign-hunter-gray">如果您是猎头，请以您的企业邮箱发送邮件至hunter@kanzhun.com申诉。邮件标题为“猎头注册申诉+您的手机号码”。<br />若您的同事已经成功注册Boss直聘猎头版，请在邮件中提供TA的手机号，我们会优先审核。</div>',
                                title: "此账号在BOSS直聘被多次举报，暂不支持使用",
                                confirmButton: "知道了",
                                columnClass: "pop-sign-hunter"
                            };
                            Sign.showConfirm(option)
                        } else {
                            var option = {
                                content: result.resmsg,
                                confirmButton: "知道了",
                                openCallback: function(t) {
                                    t.$confirmButton.parent().css("text-align", "center")
                                }
                            };
                            Sign.showConfirm(option)
                        }
                    else {
                        var option = {
                            content: '<div class="sign-hunter-gray">您的BOSS直聘账户中有未使用的道具，或钱包中有零钱，切换为猎头身份后将无法使用。<br />请先登录APP将付费产品消耗或提现零钱，再重新登录猎头端。</div>',
                            title: "请您先清空付费产品或提现零钱",
                            confirmButton: "知道了",
                            columnClass: "pop-sign-hunter"
                        };
                        Sign.showConfirm(option)
                    }
                    isSms && btnSms.html("发送验证码").removeClass("btn-disabled"),
                    formEl.find(".ipt-code").val(""),
                    formEl.find(".verifyimg").click()
                } else if (9 == result.rescode) {
                    if (1 == result.bizcode || 0 == result.bizcode) {
                        var option = {
                            content: '<p>您当前身份为BOSS，是否切换为猎头？</p><ul class="pop-content"><li>为牛人服务，严禁猎头冒充BOSS</li><li>切换为猎头身份后，您将获得BOSS直聘的高端牛人简历，享有更具竞争力的猎头会员服务。</li><li>猎头身份生效后，您不能以BOSS身份登录APP</li></ul>',
                            title: "您将要切换为猎头身份",
                            cancelButton: "取消",
                            confirmButton: "切换为猎头",
                            columnClass: "pop-sign-hunter",
                            openCallback: function(t) {
                                t.$confirmButton.parent().css("text-align", "center")
                            },
                            confirmCallback: function() {
                                window.location.href = "/user/transto/headhunter.html?token=" + result.token
                            },
                            cancelCallback: function() {
                                window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                            }
                        };
                        Sign.showConfirm(option)
                    } else if (7 == result.bizcode) {
                        var option = {
                            content: '<p>您当前系统身份为牛人，是否切换为猎头？</p><ul class="pop-content"><li>切换为猎头身份后，您将获得BOSS直聘的高端牛人简历，享有更具竞争力的猎头会员服务。</li><li>猎头身份生效后，您不能以牛人身份登录APP</li></ul>',
                            title: "您将要切换为猎头身份",
                            cancelButton: "取消",
                            confirmButton: "切换为猎头",
                            columnClass: "pop-sign-hunter",
                            openCallback: function(t) {
                                t.$confirmButton.parent().css("text-align", "center")
                            },
                            confirmCallback: function() {
                                window.location.href = "/user/transto/headhunter.html?token=" + result.token
                            },
                            cancelCallback: function() {
                                window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                            }
                        };
                        Sign.showConfirm(option)
                    } else if (6 == result.bizcode || 8 == result.bizcode) {
                        var option = {
                            content: '<p>您已注册过BOSS直聘，是否切换为猎头身份？</p><ul class="pop-content"><li>为牛人服务，严禁猎头冒充BOSS</li><li>切换为猎头身份后，您将获得BOSS直聘的高端牛人简历，享有更具竞争力的猎头会员服务。</li><li class="bold">您的BOSS直聘账户中剩余' + result.beancount + "个直豆，切换为猎头身份后无法使用。但直豆仍会保留。</li><li>猎头身份生效后，您不能以牛人或BOSS身份登录APP</li></ul>",
                            title: "您将要切换为猎头身份",
                            cancelButton: "取消",
                            confirmButton: "切换为猎头",
                            columnClass: "pop-sign-hunter",
                            openCallback: function(t) {
                                t.$confirmButton.parent().css("text-align", "center")
                            },
                            confirmCallback: function() {
                                window.location.href = "/user/transto/headhunter.html?token=" + result.token
                            },
                            cancelCallback: function() {
                                window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                            }
                        };
                        Sign.showConfirm(option)
                    } else if (result.rescode == -1)
                        Sign.showError(formEl, result.resmsg);
                    else {
                        var option = {
                            content: '<p>您当前身份为BOSS，请选择是否将身份切换为猎头</p><ul class="pop-content"><li>选择猎头身份后，您将以猎头身份发布职位、搜索查看\t简历、更高效的联系牛人</li><li>猎头身份与BOSS身份只可选择一个，选择猎头身份后，不能再以Boss身份登录</li></ul>',
                            title: "选择身份",
                            cancelButton: "取消",
                            confirmButton: "切换为猎头",
                            columnClass: "pop-sign-hunter",
                            openCallback: function(t) {
                                wrap.$confirmButton.parent().css("text-align", "center")
                            },
                            confirmCallback: function() {
                                window.location.href = "/user/transto/headhunter.html?token=" + result.token
                            },
                            cancelCallback: function() {
                                window.location.href = "https://www.zhipin.com/logoutToUrl/?toUrl=https://lie.zhipin.com"
                            }
                        };
                        Sign.showConfirm(option)
                    }
                    isSms && btnSms.html("发送验证码").removeClass("btn-disabled"),
                    formEl.find(".ipt-code").val(""),
                    formEl.find(".verifyimg").click()
                } else
                    6 == result.rescode ? Sign.showError(formEl, "短信验证码错误", !0) : (Sign.showError(formEl, result.resmsg, !0),
                    isSms && btnSms.html("发送验证码").removeClass("btn-disabled"),
                    formEl.find(".ipt-code").val(""),
                    formEl.find(".verifyimg").click());
                isSms || btnEl.removeClass("btn-disabled")
            },
            error: function(t) {
                Sign.showError(formEl, "服务器错误，请稍后再试", !0),
                isSms ? btnSms.html("发送验证码").removeClass("btn-disabled") : btnEl.removeClass("btn-disabled")
            }
        })
    },
    callbackPwd: function(t, e) {
        try {
            _T.sendEvent(t.closest(".sign-form").data("flow") + "_done")
        } catch (t) {}
        return Sign.source ? void (window.location.href = Sign.directUrls[Sign.source]) : isZpdesk && 1 != e.identity ? void Sign.showDeskGeekTip() : void (e.toUrl ? window.location.href = decodeURIComponent(e.toUrl) : 1 == e.identity ? window.location.href = "https://www.zhipin.com/chat/im" : $(".page-sign").length ? window.location.href = "https://www.zhipin.com/" : window.location.reload())
    },
    callbackSms: function(t, e) {
        t.closest(".sign-form").find(".tip-error");
        try {
            _T.sendEvent(t.closest(".sign-form").data("flow") + "_done")
        } catch (t) {}
        return Sign.source ? void (window.location.href = Sign.directUrls[Sign.source]) : isZpdesk && 1 != e.identity ? void Sign.showDeskGeekTip() : void (e.toUrl ? window.location.href = decodeURIComponent(e.toUrl) : 1 == e.identity ? window.location.href = "https://www.zhipin.com/chat/im" : $(".page-sign").length ? window.location.href = "https://www.zhipin.com/" : window.location.reload())
    },
    callbackRegister: function(t, e) {
        var i = $(".sign-wrap")
          , n = t.find('input[name="purpose"]').val()
          , s = "g";
        "1" == n && (s = "b");
        try {
            _T.sendEvent(t.closest(".sign-form").data("flow") + "_done_" + s)
        } catch (t) {}
        if (t.closest(".pop-sign-box").length && (i = t.closest(".pop-sign-box")),
        e.toUrl) {
            $.toast({
                content: "注册成功，3s后自动跳转完善页面",
                type: "success"
            });
            var a = "";
            a = e.toUrl.indexOf("http") != -1 ? e.toUrl : "https://www.zhipin.com" + e.toUrl,
            setTimeout(function() {
                window.location.href = decodeURIComponent(a)
            }, 3e3)
        } else
            Sign.source ? ($.toast({
                content: "注册成功",
                type: "success"
            }),
            setTimeout(function() {
                window.location.href = Sign.directUrls[Sign.source]
            }, 3e3)) : Sign.showPannel(i, "welcome")
    },
    callbackCheckRegister: function(t, e) {
        try {
            _T.sendEvent(t.closest(".sign-form").data("flow") + "_done")
        } catch (t) {}
        var i = t.parents(".login-wechat").find(".bind-box")
          , n = i.find("form")
          , s = i.find('form .btn[type="submit"]');
        t.parents(".login-wechat .register-box").addClass("hide"),
        i.removeClass("hide"),
        i.find(".ipt-phone").val(e.account),
        Sign.init(i),
        e.isRegistered ? (n.attr("action", "/login/headhunter/phone.json"),
        n.find('input[name="smsType"]').val(4),
        s.text("登录，并绑定手机号")) : (n.attr("action", "/registe/headhunter/save.json"),
        n.parents(".sign-form").removeClass(".sign-sms"),
        n.find('input[name="smsType"]').val(5),
        s.text("注册"),
        n.parents(".sign-form").removeClass("sign-sms").addClass("sign-register"))
    },
    showConfirm: function(t) {
        $.confirm({
            content: t.content,
            title: t.title,
            closeIcon: !1,
            cancelButton: !!t.cancelButton && t.cancelButton,
            confirmButton: !!t.confirmButton && t.confirmButton,
            columnClass: t.columnClass || "defaultConfirm",
            backgroundDismiss: !1,
            onOpen: function() {
                t.openCallback && t.openCallback(this)
            },
            confirm: function() {
                t.confirmCallback && t.confirmCallback()
            },
            cancel: function() {
                t.cancelCallback && t.cancelCallback()
            }
        })
    },
    showError: function(t, e, i) {
        if (t.closest(".sign-form").find(".tip-error").text(e),
        "短信验证码错误" == e ? t.find(".ipt-sms").focus().val("") : i && t.find(".verifyimg").length && (t.find(".ipt-code").val(""),
        t.find(".verifyimg").click()),
        i)
            try {
                _T.sendEvent(t.closest(".sign-form").data("flow") + "_error")
            } catch (t) {}
        isTouch && $(window).width() < 800 && Sign.showToast(e)
    },
    hideError: function(t) {
        t.closest(".sign-form").find(".tip-error").text("")
    },
    showToast: function(t) {
        var e = $('<div class="toast"><p>' + t + "</p></div>");
        $(".toast").length && $(".toast").remove(),
        Sign.timerToast && clearTimeout(Sign.timerToast),
        $("body").append(e),
        $(".toast").show(),
        Sign.timerToast = setTimeout(function() {
            Sign.hideToast(e)
        }, 2e3)
    },
    hideToast: function() {
        $(".toast").fadeOut(function() {
            $(".toast").remove()
        })
    },
    countDown: function(t, e) {
        var i = parseInt(t.find(".num").text().replace("s"), 10);
        Sign.interCount = setInterval(function() {
            i--,
            t.find(".num").text(i + "s"),
            i <= 0 && (e(),
            clearInterval(Sign.interCount),
            Sign.interCount = null)
        }, 1e3)
    },
    scanPending: function(t) {
        var e = t.find(".uuid").val()
          , i = t.find(".qrcode-box img").attr("data-url");
        e && t.find(".sign-scan").is(":visible") && $.ajax({
            type: "GET",
            url: "/scan?uuid=" + e,
            dataType: "json",
            cache: !1,
            timeout: 1e5,
            success: function(n) {
                if (n.scaned) {
                    var s = t.find(".sign-scan").length ? t.find(".sign-scan").data("flow") : "web";
                    "validate"in n && n.validate ? (Sign.sendKaEvent(s + "_done"),
                    isZpdesk ? Sign.checkDeskIsBoss(function(t) {
                        1 == t ? window.location.href = i + e : Sign.showDeskGeekTip()
                    }) : window.location.href = i + e) : "allweb"in n && n.allweb ? (Sign.sendKaEvent(s + "_done"),
                    isZpdesk ? Sign.checkDeskIsBoss(function(t) {
                        1 == t ? window.location.href = i + e : Sign.showDeskGeekTip()
                    }) : window.location.href = i + e) : ("validate"in n && n.validate,
                    Sign.sendKaEvent(s + "_error"),
                    setTimeout("window.location.reload()", 3e3))
                } else
                    t.find(".sign-scan").is(":visible") && Sign.scanPending(t)
            },
            error: function() {
                t.find(".sign-scan").is(":visible") && setTimeout(function() {
                    Sign.scanPending(t)
                }, 5e3)
            }
        })
    },
    showDeskGeekTip: function() {
        $.confirm({
            content: "你当前是牛人身份，请在 BOSS直聘 APP 的『设置』选项中切换身份后重试",
            title: "请切换为 Boss 身份后登录",
            closeIcon: !1,
            cancelButton: !1,
            confirmButton: "确定",
            columnClass: "",
            backgroundDismiss: !1,
            onOpen: function() {
                this.$confirmButton.parent().css("text-align", "center")
            },
            confirm: function() {},
            error: function(t) {}
        }),
        Cookie.del("t", ".zhipin.com", "/"),
        Cookie.del("wt", ".zhipin.com", "/")
    },
    checkDeskIsBoss: function(t) {
        $.ajax({
            type: "post",
            url: "/user/identity/check.json",
            dataType: "json",
            success: function(e) {
                1 == e.rescode ? t(e.identity) : alert("登录失败，请稍后再试")
            },
            error: function() {
                alert("登录失败，请稍后再试")
            }
        })
    },
    sendKaEvent: function(t) {
        try {
            _T.sendEvent(t)
        } catch (t) {}
    }
};
$(function() {
    $(".sign-wrap").length && $(".sign-wrap").is(":visible") && Sign.init($(".sign-wrap:visible")),
    void 0 !== PlaceholderCheck && PlaceholderCheck.init()
});
var hunterSign = {
    init: function() {
        ($(".hunter-index").length || $(".hunter-register").length) && ($(".hunter-index .btn-sign").on("click", function() {
            hunterSign.showPop($(this))
        }),
        $(".hunter-register").length && Sign.dropSelect($(this).find(".sign-form")),
        hunterSign.setErcode(),
        $(".hunter-index").find(".sign-form .tab span").on("click", function() {
            hunterSign.switchTab($(this))
        }),
        $(".hunter-register").find(".register-op").on("click", function() {
            hunterSign.switchRegister($(this))
        }),
        $(window).scroll(function() {
            hunterSign.elAnimate()
        }),
        hunterSign.elAnimate())
    },
    showPop: function(t) {
        $.confirm({
            content: $(".sign-wrap").html(),
            title: !1,
            confirmButton: !1,
            cancelButton: !1,
            closeIcon: !0,
            columnClass: "pop-sign-box",
            onOpen: function() {
                var e = this;
                t.hasClass("btn-register") && (e.$content.find(".sign-form").hide(),
                e.$content.find(".sign-register").show()),
                Sign.init(e.$content)
            }
        })
    },
    switchTab: function(t) {
        var e = t.index()
          , i = t.parents(".sign-form");
        t.addClass("cur").siblings().removeClass("cur"),
        i.find(".tab-container").eq(e).show().siblings(".tab-container").hide(),
        0 == e && ($(".code-container .overdue").hide(),
        hunterSign.setErcode()),
        i.find(".tip-error").html("")
    },
    switchRegister: function(t) {
        var e = t.parents(".login-container").index()
          , i = t.parents(".login-wechat");
        i.find(".login-container").eq(e).addClass("hide").siblings().removeClass("hide"),
        Sign.init(),
        i.find(".tip-error").html("")
    },
    isVisible: function(t) {
        return $(window).height() > t.offset().top - $(window).scrollTop() + 100
    },
    elAnimate: function() {
        $(".hunter-index .info-box .item").each(function(t) {
            var e = $(this);
            hunterSign.isVisible(e) && (e.find("img").animate({
                opacity: "1"
            }, 1e3),
            e.find(".text").hasClass("text-middle") ? e.find(".text").animate({
                marginRight: "60px",
                opacity: "1",
                marginLeft: "0"
            }, "slow") : e.find(".text").animate({
                marginLeft: "80px",
                opacity: "1"
            }, "slow"))
        }),
        $(".hunter-index .info-box").each(function() {
            var t = $(this);
            hunterSign.isVisible(t.find(".title")) && t.find(".title").animate({
                marginTop: "0",
                opacity: "1"
            }, 300)
        })
    },
    setErcode: function() {
        if ($("#login_container").length && _PAGE.appid) {
            var t = (new WxLogin({
                id: "login_container",
                appid: _PAGE.appid,
                scope: _PAGE.scope,
                redirect_uri: _PAGE.redirectUri,
                state: "",
                style: "",
                href: window.location.origin + "/v2/web/hunter/css/hunter-index.css"
            }),
            $(".code-container .overdue"));
            setTimeout(function() {
                t.is(":visible") || t.show()
            }, 6e4),
            t.find(".btn-refresh").on("click", function() {
                setTimeout(function() {
                    t.is(":visible") || t.show()
                }, 6e4),
                t.hide();
                new WxLogin({
                    id: "login_container",
                    appid: _PAGE.appid,
                    scope: _PAGE.scope,
                    redirect_uri: _PAGE.redirectUri,
                    state: "",
                    style: "",
                    href: window.location.origin + "/v2/web/hunter/css/hunter-index.css"
                })
            })
        }
    }
};
$(function() {
    hunterSign.init()
});
