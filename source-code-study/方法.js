function setOpacity(e, a) {
        e.style.opacity = a / 100;
        e.style.filter = 'alpha(opacity=' + a + ')';
        if (isIE)
            e.style.zoom = 1
    }
    function setStyle(e, a) {
        var i;
        for (i in a) {
            e.style[i] = a[i]
        }
    }
    // setStyle(c, {
    //     backgroundColor: this.bgcolor,
    //     display: 'block'
    // })

    function addEvent(a, b, c, d) {
        a.addEventListener ? a.addEventListener(b, c, d) : a.attachEvent("on" + b, c)
    }

    // addEvent(objWin, 'scroll', fixIECenter)
    function removeEvent(a, b, c, d) {
        a.removeEventListener ? a.removeEventListener(b, c, d) : a.detachEvent("on" + b, c)
    }
    // removeEvent(objOverLay, 'click', eMsgClose)
    // 事件什么时候解绑


    function delay_script(A) {
        var B = document.createElement("script")
          , C = "src"
          , D = "text/javascript";
        B.setAttribute(C, A);
        B.setAttribute("type", D);
        document.body.appendChild(B);
        return B
    }
    // delay_script("//ossweb-img.qq.com/images/js/eas/eas.js");

    loadjs: function(url, callback, charset) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        if (charset) {
            script.setAttribute("charset", charset)
        }
        if (script.readyState) {
            script.onreadystatechange = function() {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                    document.getElementsByTagName("head")[0].removeChild(this)
                }
            }
        } else {
            script.onload = function() {
                callback();
                document.getElementsByTagName("head")[0].removeChild(this)
            }
        }
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script)
    }

    getScript : function(src, func){
		var script = document.createElement('script');
        script.async = "async";
        script.charset = "utf-8";
        script.src = src;
        if (func) {
          script.onload = func;
        }
        document.getElementsByTagName("head")[0].appendChild( script );
    }
    
    function delay_js(url) {
        var type = url.split(".")
          , file = type[type.length - 1];
        if (file == "css") {
            var obj = document.createElement("link")
              , lnk = "href"
              , tp = "text/css";
            obj.setAttribute("rel", "stylesheet");
        } else
            var obj = document.createElement("script")
              , lnk = "src"
              , tp = "text/javascript";
        obj.setAttribute(lnk, url);
        obj.setAttribute("type", tp);
        file == "css" ? document.getElementsByTagName("head")[0].appendChild(obj) : document.body.appendChild(obj);
        return obj;
    }

    function addload(func) {
        var old = window.onload;
        if (typeof window.onload != "function") {
            window.onload = func;
        } else {
            window.onload = function() {
                old();
                func();
            }
        }
    }
    function addsize(func) {
        var old = window.onresize;
        if (typeof window.onresize != "function") {
            window.onresize = func;
        } else {
            window.onresize = function() {
                old();
                func();
            }
        }
    }