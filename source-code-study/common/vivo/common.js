var evalFun = eval;
!(function(t, e, i) {
  var n = {
    jsonParse: t.JSON && JSON.parse ? JSON.parse : evalFun,
    getBrowser: function() {
      var t = navigator.userAgent.toLowerCase();
      if (t.indexOf("android") >= 0) return "android";
      if (t.indexOf("iphone") >= 0) return "iphone";
      if (t.match(/.*mac.*os/gi)) return "mac";
      if (t.indexOf("chrome") >= 0) return "chrome";
      if (t.indexOf("firefox") >= 0) return "firefox";
      if (t.indexOf("msie") >= 0) {
        var e =
          t.match(/msie\s\d+/)[0].match(/\d+/)[0] ||
          t.match(/trident\s?\d+/)[0];
        return t.match(/.*msie.*10\.0/gi) ? "IE10" : 9 > e ? "IE8-" : "IE";
      }
      return t.indexOf("Safari") >= 0
        ? "safari"
        : t.indexOf("Camino") >= 0
          ? "camino"
          : t.indexOf("Gecko/") >= 0 ? "gecko" : !1;
    },
    browser: (function() {
      var e = navigator.userAgent.toLowerCase();
      if (e.indexOf("android") >= 0)
        return e.indexOf("ucbrowser") >= 0 ? "android-uc" : "android";
      if (e.indexOf("iphone") >= 0) return "iphone";
      if (e.indexOf("chrome") >= 0) return "chrome";
      if (e.indexOf("firefox") >= 0) return "firefox";
      if (e.indexOf("msie") >= 0) {
        var i =
          e.match(/msie\s\d+/)[0].match(/\d+/)[0] ||
          e.match(/trident\s?\d+/)[0];
        return e.match(/.*msie.*10\.0/gi) ? "IE10" : 9 > i ? "IE8-" : "IE";
      }
      if (e.indexOf("trident") >= 0) return "IE11";
      if (e.indexOf("Safari") >= 0) return "safari";
      if (e.indexOf("Camino") >= 0) return "camino";
      if (e.indexOf("Gecko/") >= 0) return "gecko";
      if (e.match(/.*mac.*os/gi)) return "mac";
      if (
        !(
          (e.match(/msie\s\d+/) && e.match(/msie\s\d+/)[0]) ||
          (e.match(/trident\s?\d+/) && e.match(/trident\s?\d+/)[0])
        )
      )
        return !1;
      var i =
        e.match(/msie\s\d+/)[0].match(/\d+/)[0] || e.match(/trident\s?\d+/)[0];
      return 9 > i ? ((t.location.href = "http://www.baidu.com"), !1) : void 0;
    })(),
    domReady: function(i) {
      var n,
        o = !1,
        s = [].concat(i),
        r = function() {
          for (var e = 0; e < s.length; e++) s[e].apply(t);
          s = null;
        },
        a = function() {
          o ||
            ((o = !0),
            r.call(t),
            e.removeEventListener
              ? e.removeEventListener("DOMContentLoaded", a, !1)
              : e.attachEvent &&
                (e.detachEvent("onreadystatechange", a),
                t == t.top && (clearInterval(n), (n = null))));
        };
      e.addEventListener
        ? e.addEventListener("DOMContentLoaded", a, !1)
        : e.attachEvent &&
          (e.attachEvent("onreadystatechange", function() {
            /loaded|complete/.test(e.readyState) && a();
          }),
          t === t.top &&
            (n = setInterval(function() {
              try {
                o || t.g.doScroll("left");
              } catch (e) {
                return;
              }
              a();
            }, 5)));
    },
    screenWidth: function(t) {
      return (t = t || e), t.body.offsetWidth;
    },
    setEmFun: function(t) {
      var t = t ? t : {};
      if (t.setEm) {
        var i = t.setEm,
          n = i.dom ? i.dom : e;
        if (n.body) {
          var o = i.UIWidth ? i.UIWidth : 1080,
            s = i.unitMatrix ? i.unitMatrix : 100;
          (this.actualPx = this.screenWidth(n) * s / o),
            (n.documentElement.style.fontSize = this.actualPx + "px");
        }
      }
    },
    deleteEmptyNode: function(t) {
      for (var e = t, i = e.childNodes, n = 0; n < i.length; n++)
        (("#text" === i[n].nodeName && /\s/.test(i[n].nodeValue)) ||
          "#comment" == i[n].nodeName) &&
          (e.removeChild(i[n]), n--);
      return e;
    },
    appendChilds: function(t, e) {
      for (var i = e || [], n = 0, o = i.length; o > n; n++)
        t.appendChild(i[n]);
    },
    prevNode: function(t) {
      var e = n.deleteEmptyNode(t.parentNode),
        i = n.childIndex(t);
      return i - 1 >= 0 && e.childNodes[i - 1];
    },
    nextNode: function(t) {
      var e,
        i = function(t) {
          var e = t.nextSibling;
          return (
            ("#text" == e.nodeName || "#comment" == e.nodeName) && (e = i(e)), e
          );
        };
      return (e = i(t));
    },
    ancestorNode: function(t, e) {
      if ((e = parseInt(e))) {
        for (var i = t; e; ) (i = i.parentNode), e--;
        return i;
      }
      return null;
    },
    nodeDescendant: function(t, e) {
      if (t) {
        var i = [],
          n = function(t) {
            if (t.children && t.children.length)
              for (var e = t.children, o = 0, s = e.length; s > o; o++)
                i.push(e[o]), n(e[o]);
          };
        if ((n(t), !e)) return i;
        var o = [];
        switch (e.charAt(0)) {
          case ".":
            for (var s = 0, r = i.length; r > s; s++) {
              var a = i[s].getAttribute("class");
              a && a.match(e.substr(1, e.length - 1)) && o.push(i[s]);
            }
            if (o[0]) return o;
            break;
          case "#":
            for (var s = 0, r = i.length; r > s; s++) {
              var h = i[s].getAttribute("id");
              if (h && h.match(e.substr(1, e.length - 1))) {
                o.push(i[s]);
                break;
              }
            }
            if (o[0]) return o[0];
            break;
          case "[":
            for (var s = 0, r = i.length; r > s; s++) {
              var l = i[s].getAttribute(
                e.substr(1, e.length - 1).substr(0, e.length - 2)
              );
              (l || "" === l) && o.push(i[s]);
            }
            if (o[0]) return o;
            break;
          case "<":
            for (var s = 0, r = i.length; r > s; s++) {
              var d = i[s].nodeName;
              d.toLowerCase() == e.substr(1, e.length - 2).toLowerCase() &&
                o.push(i[s]);
            }
            if (o[0]) return o;
        }
      }
    },
    childIndex: function(t) {
      if (t instanceof HTMLElement) {
        for (
          var e = null,
            i = this.deleteEmptyNode(t.parentNode).childNodes,
            n = 0,
            o = i.length;
          o > n;
          n++
        )
          i[n] === t && (e = n);
        return e;
      }
    },
    addClass: function(t, e) {
      t.className.match(e) || (t.className += " " + e);
    },
    minusClass: function(t, e) {
      if (t.className.match(e)) {
        var i = new RegExp("(\\s|^)" + e + "(\\s|$)");
        t.className = t.className.replace(i, " ");
      }
    },
    getDomCss: function(t, e) {
      if (!t || (t && "#text" == t.nodeName)) return "0";
      if (t.currentStyle) return t.currentStyle[e];
      var i = t.style[e];
      0 === parseFloat(i) && (t.style[e] = "auto");
      var n = document.defaultView.getComputedStyle(t, null);
      if (n[e]) {
        var o = n[e];
        return 0 === parseFloat(i) && (t.style[e] = i), o;
      }
      return (n = t[e]), 0 === parseFloat(i) && (t.style[e] = i), n ? n : "0";
    },
    setOpacity: function(t, e) {
      t.style.opacity != i
        ? (t.style.opacity = e / 100)
        : (t.style.filter = "alpha(opacity=" + e + ")");
    },
    addTransition: function(t, e, i, n) {
      var o = (t && t.style) || t;
      return t && !e
        ? ((o.transition = ""),
          (o.webkitTransition = ""),
          (o.oTransition = ""),
          void (o.mozTransition = ""))
        : ((n = n || "ease-in-out"),
          (i = i || "500ms"),
          (e = e || "all"),
          (o.transition = e + " " + i + " " + n),
          (o.webkitTransition = e + " " + i + " " + n),
          (o.oTransition = e + " " + i + " " + n),
          void (o.mozTransition = e + " " + i + " " + n));
    },
    rotate: function(t, e) {
      if (t && t.style != i && e) {
        var n = t.style,
          o = parseInt(e.duration || 300) + "ms",
          s = e.timing || "ease";
        (n.transition = "transform " + o + " " + s),
          (n.webkitTransition = "transform " + o + " " + s),
          (n.oTransition = "transform " + o + " " + s),
          (n.mozTransition = "transform " + o + " " + s),
          (n.transform = "rotate(" + e.deg + "deg)"),
          (n.transformOrigin = e.origin || "center center");
      }
    },
    show: function(t, e, i) {
      return void n.showN(t, e, i);
    },
    showN: function(t, e, o) {
      if (t && e) {
        var s = n.getBrowser();
        if (!s || "IE" == s)
          return (
            (t.style.visibility = "visible"),
            (t.style.display = "block"),
            void (t.style.height = "auto")
          );
        var r = t.style;
        e.opacity != i &&
          ((r.transition = "all 0 ease 0"),
          (r.webkitTransition = "all 0 ease 0"),
          (r.oTransition = "all 0 ease 0"),
          (r.mozTransition = "all 0 ease 0"),
          r.opacity != i ? (r.opacity = 0) : (r.filter = "alpha(opacity=0)")),
          (o = o || "ease-in-out");
        var a,
          h = function(t) {
            var e = n.getDomCss(t, "height").replace("px", ""),
              i = function(t) {
                var e = 0;
                if (!t.childNodes || t.childNodes.length <= 1) return 0;
                var i = n.deleteEmptyNode(t).childNodes;
                if (!i) return 0;
                for (var o = 0; o < i.length; o++) {
                  var s = i[o],
                    r = h(s);
                  e += parseFloat(r);
                }
                return e;
              };
            return (e = parseFloat(e)), e || (e = i(t)), e;
          },
          l = "number" == typeof o,
          d = parseInt(o) > 0,
          c = this.getDomCss(t, "paddingTop"),
          u = this.getDomCss(t, "paddingBottom");
        (a = r.height),
          parseFloat(a) &&
            a.match("em") &&
            (a = parseFloat(a) * $$.actualPx + "px"),
          (r.height = "0px"),
          (r.overflow = "hidden"),
          parseFloat(c) && (r.paddingTop = "0"),
          parseFloat(u) && (r.paddingBottom = "0"),
          (t.style.visibility = "visible"),
          $$.getDomCss(t, "display") && (t.style.display = "block"),
          e.height == i ||
            parseFloat(a) ||
            (a =
              h(t) +
              (e.notAddPadding
                ? 0
                : (parseFloat(c) ? parseFloat(c) : 0) +
                  (parseFloat(u) ? parseFloat(u) : 0)));
        var p = l ? o + "ms" : d ? parseInt(o) + "ms" : "300ms",
          m =
            l || d || ("linear" !== o && !o.match("ease")) ? "ease-in-out" : o;
        (r.transition = "all  " + p + " " + m),
          (r.webkitTransition = "all " + p + " " + m),
          (r.oTransition = "all " + p + " " + m),
          (r.mozTransition = "all " + p + " " + m),
          setTimeout(function() {
            e.height != i &&
              ((r.height = parseFloat(a) + "px"),
              parseFloat(c) && (r.paddingTop = c),
              parseFloat(u) && (r.paddingBottom = u)),
              e.opacity != i && n.setOpacity(t, e.opacity.end || "100");
          }, -1),
          setTimeout(function() {
            e.height == i || e.notHeightAuto || (r.height = "auto");
          }, 1.2 * parseInt(p));
      }
    },
    hide: function(t, e, o) {
      if (t) {
        var s = t.style;
        if (t && !o) return void (s.display = "none");
        if (e) {
          e.opacity != i &&
            ((s.transition = "all 0 ease 0"),
            (s.webkitTransition = "all 0 ease 0"),
            (s.oTransition = "all 0 ease 0"),
            (s.mozTransition = "all 0 ease 0"),
            s.opacity != i
              ? (s.opacity = 1)
              : (s.filter = "alpha(opacity=100)")),
            (o = o || "ease-in-out");
          var r,
            a,
            h,
            l = "number" == typeof o,
            d = parseInt(o) > 0;
          e.height != i &&
            ((r = this.getDomCss(t, "height").replace("px", "")),
            r && (s.height = r + "px"),
            (a = this.getDomCss(t, "paddingTop")),
            (h = this.getDomCss(t, "paddingBottom")));
          var c = l ? o + "ms" : d ? parseInt(o) + "ms" : "300ms",
            u =
              l || d || ("linear" !== o && !o.match("ease"))
                ? "ease-in-out"
                : o;
          (s.transition = "all " + c + " " + u),
            (s.webkitTransition = "all " + c + " " + u),
            (s.oTransition = "all " + c + " " + u),
            (s.mozTransition = "all " + c + " " + u),
            (s.overflow = "hidden"),
            (s.visibility = "hidden"),
            setTimeout(function() {
              (s.paddingTop = "0px"),
                (s.paddingBottom = "0px"),
                (s.height = "0px"),
                n.setOpacity(t, (e && e.opacity && e.opacity.end) || "0"),
                setTimeout(function() {
                  (s.display = "none"),
                    (s.paddingTop = a),
                    (s.paddingBottom = h),
                    (s.height = r + "px"),
                    n.setOpacity(t, "100");
                }, parseInt(c));
            }, -1);
        }
      }
    },
    hideN: function(t, e, i) {
      return void n.hide(t, e, i);
    },
    fadein: function(t, e, i, n) {
      if (t) {
        var o =
          t.style.filter.replace("alpha(opacity=", "").replace(")", "") ||
          t.style.opacity;
        if ((1 > o && (o = 100 * o), o > e)) return;
        var s = o,
          r = 2,
          a = null;
        a = setInterval(function() {
          e > o
            ? ((o += r), $$ && $$.setOpacity(t, o > e ? e : o))
            : (clearInterval(a), n && n());
        }, i / Math.floor((e - s) / r));
      }
    },
    fadeout: function(t, e, i) {
      if (t) {
        var n =
          t.style.filter.replace("alpha(opacity=", "").replace(")", "") ||
          t.style.opacity ||
          100;
        if ((1 >= n && (n = 100 * n), e > n)) return;
        var o = n,
          s = 2,
          r = null;
        r = setInterval(function() {
          n > e
            ? ((n -= s), $$ && $$.setOpacity(t, e > n ? e : n))
            : clearInterval(r);
        }, i / Math.floor((o - e) / s));
      }
    },
    ajax$: function(t) {
      if (
        ((t = t || {}),
        (t.method = t.method.toUpperCase() || "POST"),
        (t.url = t.url || ""),
        (t.async = t.async || !0),
        (t.data = t.data || null),
        t.data)
      )
        for (var e in t.data) {
          if ("length" == e) break;
          t.data[e] = encodeURIComponent(t.data[e]);
        }
      t.success = t.success || function() {};
      var i = null;
      i = XMLHttpRequest
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
      var n = [];
      for (var o in t.data) n.push(o + "=" + t.data[o]);
      var s = n.join("&");
      "POST" === t.method.toUpperCase()
        ? (i.open(t.method, t.url, t.async),
          i.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded;charset=utf-8"
          ),
          i.send(s))
        : "GET" === t.method.toUpperCase() &&
          (i.open(t.method, t.url + "?" + s, t.async), i.send(null)),
        (i.onreadystatechange = function() {
          4 == i.readyState && 200 == i.status
            ? t.success(i.responseText)
            : 4 == i.readyState && t.error && t.error(i.readyState, i.status);
        });
    },
    getQueryString: function(t) {
      if (!t) {
        for (
          var e = location.search.match(new RegExp("[?&][^?&]+=[^?&]+", "g")),
            i = 0;
          i < e.length;
          i++
        )
          e[i] = e[i].substring(1);
        return e;
      }
      if ("string" == typeof t) {
        var e = location.search.match(new RegExp("[?&]" + t + "=([^&]+)", "i"));
        return null == e || e.length < 1 ? "" : e[1];
      }
      if ("number" == typeof t) {
        var n = this.getQueryString();
        if (t >= n.length) return "";
        var e = n[t],
          o = e.indexOf("=") + 1;
        return (e = e.substring(o));
      }
    },
    scroll: function(t) {
      if (t.$box) {
        var e,
          i,
          o,
          s,
          r,
          a,
          h,
          l,
          d,
          c,
          u,
          p = 50,
          m = null,
          f = function() {
            event.preventDefault();
          };
        "android-uc" === n.browser &&
          t.$box.addEventListener("touchmove", f, !1);
        var g = function(t, e, i, o, s) {
            var r = function(t, e, i, o) {
              var r = t && t.style;
              if (r) {
                var a = r.marginLeft || r.left || r.paddingLeft;
                if (a) {
                  var h = a.match("rem")
                    ? "rem"
                    : a.match("px") ? "px" : a.match("em") ? "em" : "px";
                  if (
                    (("rem" == h || "em" == h) && (o /= $$.actualPx), i && !s)
                  ) {
                    var l = 0.4,
                      d = 1,
                      c = Math.abs(i);
                    c = c > d ? d : l > c ? l : c;
                    var u = e.maxX - e.minX,
                      f = c == l ? o : d > c ? u * i / d : i * u / c,
                      g = function(t, i, o) {
                        m || (m = i / p);
                        var s = o || r.marginLeft;
                        s = parseFloat(s);
                        var a = s + i;
                        return (
                          n.addTransition(t, "all", "250ms", "ease-in-out"),
                          a < e.minX
                            ? void (t.marginLeft = e.minX + h)
                            : a > e.maxX
                              ? void (t.marginLeft = e.maxX + h)
                              : void (t.marginLeft = a + h)
                        );
                      };
                    g(r, f);
                  }
                }
              }
            };
            switch (e.type) {
              case "01":
                (u = $$.deleteEmptyNode(t).firstChild), r(u, e, i, o);
            }
          },
          v = function() {
            e &&
              o &&
              e !== o &&
              ((r = o - e),
              (a = s - i),
              Math.abs(a) / Math.abs(r) > 2 ||
                ((d = l - h), (c = r / d), g(t.$box, t.posType, c, r)));
          };
        t.$box.addEventListener(
          "touchstart",
          function(t) {
            var n = t.targetTouches;
            if (!(n.length <= 0)) {
              h = new Date().getTime();
              var o = n[0];
              (e = o.clientX), (i = o.clientY);
            }
          },
          !1
        ),
          t.$box.addEventListener("touchmove", function(o) {
            var s = o.targetTouches[0].clientX,
              r = o.targetTouches[0].clientY,
              a = s - e,
              h = r - i;
            Math.abs(a) < Math.abs(h) || Math.abs(a) < Math.abs(h)
              ? t.$box.removeEventListener("touchmove", f, !1)
              : "android-uc" !== n.browser &&
                t.$box.addEventListener("touchmove", f, !1);
          }),
          t.$box.addEventListener(
            "touchend",
            function(e) {
              var i = e.changedTouches;
              if (!(i.length <= 0)) {
                l = new Date().getTime();
                var n = i[0];
                switch (((o = n.clientX), (s = n.clientY), t.direction)) {
                  case "x":
                    v();
                }
              }
            },
            !1
          );
      }
    },
    scrollN: function(t) {
      if (t.$box) {
        var e,
          i,
          o,
          s,
          r,
          a,
          h,
          l,
          d,
          c,
          u,
          p,
          m,
          f,
          g,
          v,
          $,
          y = 6,
          b = 10,
          x = 0.05,
          w = 5,
          L = 0.1,
          k = 0,
          I = 150,
          E = !1,
          A = function(t, e) {
            switch (e.type) {
              case "01":
                (g = $$.deleteEmptyNode(t).firstChild),
                  (v = g && g.style),
                  ($ = e.maxX.match(/[a-z]+/)[0]),
                  (e.maxX =
                    parseFloat(e.maxX).toFixed(2) *
                    ($.match("em") ? $$.actualPx : 1)),
                  (e.minX =
                    parseFloat(e.minX).toFixed(2) *
                    ($.match("em") ? $$.actualPx : 1)),
                  (m = f = parseFloat($$.getDomCss(g, "marginLeft")));
            }
          },
          S = function() {
            event.preventDefault();
          };
        "android-uc" !== n.browser &&
          t.$box.addEventListener("touchmove", S, !1);
        var _ = function(t, e, i, n, o, s) {
            var r = 0;
            if (Math.abs(o) <= 0 && Math.abs(s) <= 0) return r;
            var a = 180 * Math.atan2(s, o) / Math.PI;
            return (
              a >= -45 && 45 > a
                ? (r = 2)
                : a >= 45 && 135 > a
                  ? (r = 1)
                  : a >= -135 && -45 > a
                    ? (r = 3)
                    : ((a >= 135 && 180 >= a) || (a >= -180 && -135 > a)) &&
                      (r = 4),
              r
            );
          },
          T = function(t, e) {
            var i = function(t, e) {
              if (e) {
                var i = 0,
                  n = function(t, e, i, n) {
                    return parseFloat(
                      (t * i + 0.5 * e * Math.pow(i, 2) + e * i * n).toFixed(4)
                    );
                  },
                  o = function(i, s) {
                    var r = n(i, x, y, s),
                      a = f + r;
                    (v.marginLeft = a + "px"),
                      (f = a),
                      r * e >= 0
                        ? ((s += y),
                          (f < t.minX - I || f > t.maxX + I) && (i = 0.8 * i),
                          setTimeout(function() {
                            o(i, s);
                          }, b))
                        : ($$.addTransition(
                            g,
                            "margin",
                            "200ms",
                            "ease-in-out"
                          ),
                          f < t.minX &&
                            ((v.marginLeft = t.minX + "px"),
                            (f = t.minX),
                            (E = !0)),
                          f > t.maxX &&
                            ((v.marginLeft = t.maxX + "px"),
                            (f = t.maxX),
                            (E = !0)),
                          (m = f));
                  };
                e * x > 0 && (x = -x), o(e, i);
              }
            };
            i(t, e);
          },
          C = function() {
            e &&
              r &&
              e !== r &&
              ((u = c - d), (p = h / u * (E ? L : w)), T(t.posType, p));
          },
          N = function(t, e) {
            var i = e - t,
              n = f + i;
            Math.abs(n - m) > I || ((v.marginLeft = n + "px"), (f = n));
          };
        A(t.$box, t.posType),
          t.$box.addEventListener(
            "touchstart",
            function(r) {
              "android-uc" === n.browser &&
                t.$box.addEventListener("touchmove", S, !1);
              var a = r.targetTouches;
              if (!(a.length <= 0)) {
                d = new Date().getTime();
                var h = a[0];
                (e = h.clientX),
                  (i = h.clientY),
                  (o = e),
                  (s = i),
                  $$.addTransition(v, !1);
              }
            },
            !1
          ),
          t.$box.addEventListener("touchmove", function(r) {
            var a = r.targetTouches[0].clientX,
              h = r.targetTouches[0].clientY,
              l = a - e,
              d = h - i,
              c = _(o, s, a, h, l, d);
            switch (((4 == c || 2 == c) &&
              "android-uc" !== n.browser &&
              t.$box.addEventListener("touchmove", S, !1),
            c)) {
              case 0:
                break;
              case 1:
              case 3:
                t.$box.removeEventListener("touchmove", S, !1);
                break;
              case 2:
              case 4:
                "android-uc" !== n.browser &&
                  t.$box.addEventListener("touchmove", S, !1),
                  N(o, a);
            }
            (o = a), (s = h);
          }),
          t.$box.addEventListener(
            "touchend",
            function(t) {
              var n = t.changedTouches;
              if (!(n.length <= 0)) {
                c = new Date().getTime();
                var o = n[0];
                (r = o.clientX), (a = o.clientY), (h = r - e), (l = a - i);
                var s = k;
                switch (((k = _(e, i, r, a, h, l)),
                E && s !== k && (E = !1),
                k)) {
                  case 0:
                    break;
                  case 1:
                    break;
                  case 2:
                    C();
                    break;
                  case 3:
                    break;
                  case 4:
                    C();
                }
              }
            },
            !1
          );
      }
    },
    pause: function(t) {
      for (var e = new Date(), i = e.getTime() + t; ; )
        if (((e = new Date()), e.getTime() > i)) return;
    },
    isArray: function(t) {
      return "[object Array]" === Object.prototype.toString.call(t);
    },
    setCookie: function(t, e, i, n) {
      var o,
        s = t;
      "object" == typeof s
        ? ((t = s.name),
          (e = s.value),
          (o = s.days || 365),
          (n = s.domain || null))
        : (o = i || 365);
      var r = 60,
        a = 24,
        h = 60,
        l = new Date(),
        d = "";
      "browserClose" !== o &&
        (l.setTime(l.getTime() + o * a * r * h * 1e3),
        (d = ";expires=" + l.toGMTString())),
        (document.cookie =
          t + "=" + encodeURI(e) + d + "; path=/" + (n ? "; domain=" + n : ""));
    },
    getImei: function() {
      for (
        var t,
          e,
          i,
          n = navigator.userAgent,
          o = n.substring(n.indexOf("?") + 1),
          s = o.split("&"),
          r = 0,
          a = s.length;
        a > r;
        r++
      )
        if (((t = s[r].split("=")), (e = t[0]), (i = t[1]), "imei" === e))
          return i || "";
      return "";
    },
    getCookie: function(t) {
      if ("imei" === t) return this.getImei();
      var e = decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            "(?:(?:^|.*;)\\s*" +
              encodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") +
              "\\s*\\=\\s*([^;]*).*$)|^.*$"
          ),
          "$1"
        )
      );
      return ("vvc_model" !== t ? e : e.replace(/vivo\+/gi, "")) || null;
    },
    delCookie: function(t) {
      var e = new Date();
      e.setTime(e.getTime() - 1);
      var i = n.getCookie(t);
      null != i &&
        (document.cookie =
          t + "=" + i + ";expires=" + e.toGMTString() + "; path=/");
    },
    newGuid: function() {
      for (var t = "", e = 1; 32 >= e; e++) {
        var i = Math.floor(16 * Math.random()).toString(16);
        (t += i), (8 == e || 12 == e || 16 == e || 20 == e) && (t += "-");
      }
      return t;
    },
    compatibilityEvent: function(t, e, i, o) {
      if (e && (!t || "object" == typeof t)) {
        (t = t || document.body), (o = o || !1);
        var s = n.getBrowser();
        "IE" === s ? t.attachEvent("on" + e, i) : t.addEventListener(e, i, o);
      }
    }
  };
  (t.$$ = t.yuJS = t.commonFun = n),
    String.prototype.trim ||
      (String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
      });
})(window, document),
  (function(t, e, i) {
    var n = {
      init: function(t) {
        t && $$.isArray(t) && this.setSameStyle();
      },
      setSameStyle: function() {
        for (var t = e.all, n = {}, o = 0, s = t.length; s > o; o++) {
          var r = t[o].getAttribute("same-height");
          r !== (i || null) &&
            (n.height || (n.height = {}),
            n.height[r] ||
              (n.height[r] = {
                list: [],
                style: "height"
              }),
            n.height[r].list.push(t[o]));
        }
        for (var o in n) {
          var a = n[o];
          for (var h in a) {
            var l = a[h].list,
              s = l && l.length;
            if (s && !(s && 0 >= s)) {
              var d = a[h].style,
                c = $$.getDomCss(l[0], d),
                u = c;
              $$.browser.indexOf("IE") >= 0 &&
                "auto" === c &&
                "height" === d &&
                ((c = l[0].offsetHeight || c), c !== u && (c = u = c + "px"));
              var p = c.match("px")
                ? "px"
                : c.match("rem") ? "rem" : c.match("em") ? "em" : c;
              p != c && (c = parseFloat(c));
              for (var m = 1; s > m; m++) {
                var f = $$.getDomCss(l[m], d),
                  g = f;
                $$.browser.indexOf("IE") >= 0 &&
                  "auto" === f &&
                  "height" === d &&
                  ((f = l[m].offsetHeight || f), f !== g && (f = g = f + "px"));
                var v = f.match("px")
                  ? "px"
                  : f.match("rem") ? "rem" : f.match("em") ? "em" : f;
                p == u && ((p = v), (u = f)),
                  v != f && (f = parseFloat(f)),
                  parseFloat(c)
                    ? parseFloat(f) && (c = c > f ? c : f)
                    : (c = f);
              }
              !(function() {
                for (var t = 0; s > t; t++)
                  l[t].style[d] = (parseFloat(c) ? c : "") + p;
              })();
            }
          }
        }
      },
      buryingPoint: function(t, i) {
        if (t && i)
          for (
            var n = $$.nodeDescendant(e.body, "[" + i + "]"),
              o = 0,
              s = n.length;
            s > o;
            o++
          ) {
            var r = n[o];
            r.addEventListener(
              "click",
              function() {
                var e = t;
                "true" === this.getAttribute("data-nav") &&
                  (e = e.replace(/&?series=.*?((?=&)|$)/, ""));
                for (
                  var n, o, s, r, a = this.getAttribute(i).split("&"), h = 0;
                  h < a.length;
                  h++
                )
                  (o = a[h].split("=")),
                    (s = o[0]),
                    (r = o.slice(1).join("=")),
                    (a[h] = s ? s + "=" + encodeURIComponent(r) : "");
                (n = a.join("&")),
                  (e += "&" == n.charAt(0) ? n : "&" + n),
                  (new Image().src = e + "&visittime=" + Date.now());
              },
              !0
            );
          }
      }
    };
    t.yuCSS = t.$$$ = n;
  })(window, document),
  (function(t, e, i) {
    var n = {
      select: function() {
        var n = function(t) {
          (this.options = t || {}),
            (this.duration = 400),
            (this.browser = $$.getBrowser()),
            this.init();
        };
        return (
          (n.prototype = {
            constructor: n,
            keywords: "",
            _isRended: !1,
            _isListShow: !1,
            _isResetSize: !1,
            _highlightIndex: -1,
            _seletedIndex: -1,
            _isLageScreen: $$.screenWidth() > 767,
            init: function() {
              this.options.container &&
                ((this.dataList = this.options.dataJson
                  ? $$.jsonParse(this.options.dataJson)
                  : [{}]),
                (this.isHoverShow = this.options.isHoverShow || !1),
                this.initContainer(),
                this.listenFocus(),
                this.listenBlur(),
                this.listenTrigger(),
                this.listenSearch(),
                this.listenBodyClick(),
                this.listenMouseover(),
                this.listenMove(),
                this.dataList.length <= 0 || this.listenSelect());
            },
            initContainer: function(t) {
              (this.$container = yuJS.deleteEmptyNode(this.options.container)),
                (this.$container.innerHTML = ""),
                (this.$container.style.position = "relative"),
                (this.allowInput =
                  "undefined" != typeof this.options.allowInput
                    ? this.options.allowInput
                    : !0),
                (this.style = t || this.options.styleObj || {}),
                (this.v1 = this.$container.getAttribute("default-value"));
              var i = this.$container.getAttribute("placeholder");
              (this.v1 =
                !this.v1 && this.dataList.length > 0
                  ? this.dataList[0].name
                  : this.v1),
                (i = i ? i : ""),
                (this.$dom1 = this.$dom1 || e.createElement("div")),
                (this.$dom2 = this.$dom2 || e.createElement("div")),
                this.$dom1.setAttribute("inBody", "true"),
                this.$dom1.setAttribute("first-line", "true"),
                this.$dom2.setAttribute("inBody", "true"),
                this.$dom1.setAttribute(
                  "style",
                  "position: relative;width:100%;height: " +
                    (this.style.inputHeight || "30px") +
                    ";overflow: hidden;background-color: transparent;"
                ),
                this.$dom2.setAttribute(
                  "style",
                  "width: 100% ;height: auto;background-color: transparent;z-index: 9999;display:none;padding:15px 0px"
                ),
                this.$dom2.setAttribute("class", "select_list_#fes4/ef5"),
                (this.$dom1_1 = this.$dom1_1 || e.createElement("input")),
                this.$dom1_1.setAttribute("first-line", "true"),
                (this.$dom1_2 = this.$dom1_2 || e.createElement("div")),
                this.$dom1_2.setAttribute("first-line", "true"),
                this.$dom1_1.setAttribute("inBody", "true"),
                this.$dom1_2.setAttribute("inBody", "true"),
                this.$dom1_1.setAttribute(
                  "readonly",
                  this.allowInput ? "" : "readonly"
                ),
                this.$dom1_1.setAttribute(
                  "disabled",
                  this.allowInput ? "" : "disabled"
                ),
                this.$dom1_1.setAttribute(
                  "style",
                  "width:80%;max-width:calc(92% - 30px); height: calc(100% - 1px);position: absolute;left: 8%;background-color: transparent;-ms-text-overflow: ellipsis;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding-right:20px;font-size: " +
                    (this.style.inputFontSize || "14px") +
                    ";color:" +
                    (this.style.inputColor || "#333333") +
                    ";line-height:" +
                    (this.style.inputHeight || "30px") +
                    ";" +
                    (this.allowInput ? "" : "cursor:pointer;")
                ),
                this.$dom1_1.setAttribute("value", this.v1),
                this.$dom1_1.setAttribute("placeholder", i),
                this.$dom1_2.setAttribute(
                  "style",
                  "height: 30px;width: 30px;position: absolute;right: 0;top:calc(50% - 15px);background-color: transparent;"
                ),
                this.$dom1_2.setAttribute(
                  "onmouseover",
                  "this.style.cursor='pointer';"
                ),
                (this.$dom1_2_1 = this.$dom1_2_1 || e.createElement("div")),
                this.$dom1_2_1.setAttribute("first-line", "true"),
                this.$dom1_2_1.setAttribute(
                  "style",
                  "width: 9px;height: 9px;transform: rotate(-45deg);transform-origin:0% 100%;background-color: transparent;position:absolute;top:calc(50% - 6px);left:calc(50% - 6px);border-left:1px;border-bottom: 1px;border-style: solid;border-color: #333333;"
                ),
                this.$dom1_2_1.setAttribute("inBody", "true"),
                this.$dom1_2.appendChild(this.$dom1_2_1),
                $$.appendChilds(this.$dom1, [this.$dom1_1, this.$dom1_2]),
                $$.appendChilds(this.$container, [this.$dom1, this.$dom2]),
                (this.clickBack = this.options.clickBack
                  ? this.options.clickBack
                  : function() {}),
                (this.$input = yuJS.deleteEmptyNode(
                  this.$container.childNodes[0]
                ).childNodes[0]),
                (this.$list = this.$container.childNodes[1]),
                (this.$filterList = {}),
                (this.$trigger = yuJS.nextNode(this.$input)),
                (this.$container.data = {
                  customSelect: this,
                  id: ""
                });
            },
            arrowRotate: function(t, e) {
              (t = parseInt(t)),
                t &&
                  $$.rotate(e || this.$dom1_2_1, {
                    deg: t,
                    origin: 0 > t ? "0% 100%" : "15% 55%"
                  });
            },
            highlight: function(t) {
              var e = this;
              (t = t !== i && t > -1 ? t : this._highlightIndex),
                t >= 0 &&
                  null != t &&
                  (function() {
                    for (
                      var i = yuJS.deleteEmptyNode(e.$list).childNodes, n = 0;
                      n < i.length;
                      n++
                    )
                      i[n].style.color =
                        t == n
                          ? e.style.listHoverFontColor || "black"
                          : e.style.listColor || "black";
                  })();
            },
            drawInputLine: function(t) {
              "iphone" !== this.browser &&
                (this.$dom1_1.style.borderBottom =
                  1 == t ? "1px solid #454545" : "none");
            },
            renderList: function(t) {
              var i = "",
                n = t.length;
              if (n > 0) {
                for (var o = 0; n > o; o++) {
                  var s = e.createElement("div");
                  s.setAttribute("name", t[o].id || "null"),
                    (s.innerHTML = decodeURI(t[o].des || "")),
                    s.setAttribute(
                      "style",
                      "background-color: transparent; padding-left: 8%;width:auto;height:" +
                        (this.style.listHeight || "25px") +
                        ";line-height: " +
                        (this.style.listHeight || "25px") +
                        ";font-size: " +
                        (this.style.listFontSize || "14px") +
                        ";text-align: left;text-overflow: ellipsis;overflow: hidden;color:" +
                        (this.style.listColor || "#808080") +
                        ";cursor:pointer;"
                    ),
                    this.$list.appendChild(s);
                }
                $$.show(
                  this.$list,
                  {
                    height: "",
                    notAddPadding: !0,
                    notHeightAuto: !0
                  },
                  this.duration
                ),
                  this.drawInputLine(!0),
                  (this._isListShow = !0),
                  this.arrowRotate(135),
                  this.highlight();
              } else
                (this.$list.innerHTML = i),
                  $$.hide(
                    this.$list,
                    {
                      height: ""
                    },
                    "300"
                  ),
                  this.drawInputLine(!1),
                  (this._isListShow = !1),
                  this.arrowRotate(-45),
                  this.$input.onblur();
              (this.filterDataList = t), (this._isRended = !0);
            },
            search: function() {
              if ("" === this.keywords || this.keywords === this.v1)
                return (
                  this.renderList(this.dataList),
                  void (this.$filterList = this.$list)
                );
              for (
                var t = [],
                  e = this.dataList.length,
                  i = new RegExp(this.keywords, "ig"),
                  n = 0;
                e > n;
                n++
              ) {
                var o = this.dataList[n];
                o.name.match(i) && t.push(o);
              }
              this.renderList(t);
            },
            listenFocus: function() {
              var t = this;
              (this.inputTouchend = function() {
                return t._isRended &&
                  t.filterDataList.length > 0 &&
                  !t._isListShow
                  ? (t.highlight(t._seletedIndex),
                    $$.show(
                      t.$list,
                      {
                        notAddPadding: !0,
                        height: "",
                        notHeightAuto: !0
                      },
                      t.duration
                    ),
                    t.drawInputLine(!0),
                    (t._isListShow = !0),
                    t.arrowRotate(135),
                    void t.highlight())
                  : t._isListShow
                    ? ($$.hide(
                        t.$list,
                        {
                          height: ""
                        },
                        "300"
                      ),
                      t.arrowRotate(-45),
                      t.drawInputLine(!1),
                      void (t._isListShow = !1))
                    : void t.search();
              }),
                this._isLageScreen ||
                  this.$input.addEventListener("touchend", t.inputTouchend, !1);
            },
            listenBlur: function() {
              var t = this;
              this.$input.onblur = function() {
                t.filterDataList && 0 === t.filterDataList.length
                  ? ((t.$input.value = t.v1), (t.keywords = ""))
                  : "" === t.$input.value.trim() && (t.$input.value = t.v1);
              };
            },
            keyboardSelect: function(t) {
              38 === t
                ? (this._highlightIndex > 0 ? this._highlightIndex-- : null,
                  this.highlight())
                : 40 === t &&
                  (this._highlightIndex < this.filterDataList.length
                    ? this._highlightIndex++
                    : null,
                  this.highlight()),
                (this._seletedIndex = this._highlightIndex);
            },
            listenSearch: function() {
              var t = this;
              this.$input.onkeyup = function(e) {
                var i = e.keyCode || e.which;
                if (
                  ((t.keywords = t.$input.value.trim()), 38 === i || 40 === i)
                )
                  t.keyboardSelect(i);
                else if (
                  13 === i &&
                  t._highlightIndex >= 0 &&
                  t.filterDataList.length > t._highlightIndex - 1
                ) {
                  var n = t.filterDataList[t._highlightIndex];
                  (t.$input.value = n.name),
                    (t.$container.data.value = n.id),
                    $$.hide(
                      t.$list,
                      {
                        height: ""
                      },
                      "300"
                    ),
                    (t._isListShow = !1),
                    t.drawInputLine(!1),
                    t.arrowRotate(-45),
                    t.$input.onblur();
                } else t.search();
              };
            },
            listenTrigger: function() {
              var t = this;
              this._isLageScreen ||
                this.$trigger.addEventListener(
                  "touchend",
                  function() {
                    t.inputTouchend();
                  },
                  !1
                );
            },
            listenSelect: function() {
              var t = this;
              t.$container.onclick = function(e) {
                var i = e.target.getAttribute("name");
                if (i) {
                  var n = e.target;
                  (t.keywords = n.innerHTML),
                    $$.hide(
                      t.$list,
                      {
                        height: ""
                      },
                      "300"
                    ),
                    (t._isListShow = !1),
                    t.drawInputLine(!1),
                    t.arrowRotate(-45),
                    (t.$container.data.id = i),
                    (t._highlightIndex = t._seletedIndex = yuJS.childIndex(n)),
                    (t.$input.value = n.innerHTML),
                    t.clickBack(n.getAttribute("name"));
                }
              };
            },
            listenMouseover: function() {
              var t = this,
                e = null;
              (this.$container.onmouseover = function(i) {
                var n = i.target;
                n.getAttribute("name")
                  ? ((n.style.color = t.style.listHoverFontColor || "black"),
                    e && (e.style.color = t.style.listColor || "black"),
                    (e = n))
                  : !t._isListShow &&
                    $$.screenWidth() > 767 &&
                    t.inputTouchend();
              }),
                (this.$container.onmouseout = function(e) {
                  {
                    var i;
                    e.target;
                  }
                  i = e.relatedTarget ? e.relatedTarget : e.toElement;
                  var n = (function() {
                    var e;
                    if (i == t.$container) return !0;
                    for (e = (i && i.parentNode) || null; e; ) {
                      if (e == t.$container) return !0;
                      e = e.parentNode;
                    }
                    return !1;
                  })();
                  n || (t._isListShow && t.inputTouchend());
                });
            },
            listenBodyClick: function() {
              var t = this;
              e.body.onclick = function(i) {
                var n = i.target;
                if (
                  !n.getAttribute("inBody") &&
                  "v_h_usercenter" !== n.getAttribute("class")
                )
                  for (
                    var o = e.getElementsByClassName("select_list_#fes4/ef5"),
                      s = 0,
                      r = o.length;
                    r > s;
                    s++
                  )
                    if ("none" != o[s].style.display) {
                      $$.hide(
                        o[s],
                        {
                          height: ""
                        },
                        "200"
                      );
                      var a = yuJS.deleteEmptyNode(o[s].parentNode)
                          .childNodes[0],
                        h = yuJS.deleteEmptyNode(a).lastChild,
                        l = yuJS.deleteEmptyNode(h).lastChild;
                      t.arrowRotate.call(l, -45, l),
                        yuJS.deleteEmptyNode(a).firstChild.onblur();
                    }
              };
            },
            listenMove: function() {
              var e = this,
                i = $$.getBrowser(),
                n = document.addEventListener || null,
                o = function() {
                  $$.hide(
                    e.$list,
                    {
                      height: ""
                    },
                    "200"
                  ),
                    e.drawInputLine(!1),
                    e.$input.blur();
                };
              n && i && !i.match("IE")
                ? (e._isLageScreen && n("DOMMouseScroll", o, !1),
                  "iphone" === $$.browser
                    ? document.addEventListener("touchmove", o, !1)
                    : n("touchmove", o, !1))
                : i &&
                  "IE" != i &&
                  (document.attachEvent("DOMMouseScroll", o),
                  document.attachEvent("touchmove", o)),
                (t.onmousewheel = document.onmousewheel = o);
            },
            setStyle: function(t) {
              t && this.initContainer(t);
            }
          }),
          n
        );
      },
      toast: function() {
        var t = function(t) {
          (this.context = t.context ? t.context : e),
            (this.message = t.message),
            (this.time = t.time ? t.time : 3e3),
            (this.left = t.left),
            (this.top = t.top),
            this.init(),
            this.show();
        };
        return (
          (t.prototype = {
            init: function() {
              this.$toastMessage = e.getElementById("#toastMessage");
              var t = this;
              t.$toastMessage && t.context.removeChild(t.$toastMessage),
                (t.msgDIV = e.createElement("div")),
                t.msgDIV.setAttribute("id", "toastMessage"),
                t.msgDIV.setAttribute(
                  "style",
                  "background-color:transparent;position:fixed;top:50%;z-index:999;width: 100%;text-align:center;color:white;font-size:18px;border-radius:2px;"
                ),
                (t.msgDIV.innerHTML =
                  '<div  style="background-color: black;display:inline-block;padding:10px;"><span style="color:white" >    ' +
                  this.message +
                  "</span></div>"),
                $$.setOpacity(t.msgDIV, 0),
                this.context.appendChild(t.msgDIV);
            },
            show: function() {
              if (this.msgDIV) {
                var t = this;
                $$.fadein(t.msgDIV, 100, 2 * t.time / 3, function() {
                  $$.fadeout(t.msgDIV, 0, t.time / 3);
                }),
                  setTimeout(function() {
                    t.msgDIV.parentNode.removeChild(t.msgDIV);
                  }, t.time + 100);
              }
            }
          }),
          t
        );
      }
    };
    t.commonTemplate = n;
  })(window, document),
  (function(t, e) {
    var i = {
        LGScreen: !0,
        resizeFunList: null,
        onresize: function(e) {
          function i() {
            if (n.resizeFunList)
              for (var t = 0; t < n.resizeFunList.length; t++)
                n.resizeFunList[t]();
            (n.LGScreen = yuJS.screenWidth() > 767),
              yuJS.setEmFun({
                setEm: {
                  dom: document,
                  UIWidth: 1e3,
                  unitMatrix: 100
                }
              });
          }
          var n = this;
          e && (this.resizeFunList = e), i(), t.addEventListener("resize", i);
        },
        getLGScreen: function() {
          return (this.LGScreen = yuJS.screenWidth() > 767), this.LGScreen;
        },
        searchBox: function() {
          var e = this,
            i = function(t) {
              (this.options = t || {}),
                (this.dataList = {}),
                (this.oldData = {}),
                (this.$container = {}),
                (this.$input = {}),
                (this.duration = 400),
                (this.$list = {}),
                (this.type =
                  (this.options.ajax && this.options.ajax.type) || "POST"),
                (this.url = (this.options.ajax && this.options.ajax.url) || ""),
                (this.reqData = {
                  words: ""
                }),
                (this.success =
                  (this.options.ajax && this.options.ajax.success) ||
                  function() {}),
                this.init();
            };
          return (
            (i.prototype = {
              constructor: i,
              keywords: "",
              init: function() {
                this.options.container &&
                  ((this.dataList = []),
                  (this.isLG = e.getLGScreen()),
                  (this.browser = $$.getBrowser()),
                  this.initContainer(),
                  this.listenFocus(),
                  this.listenBlur(),
                  this.listenKeyup(),
                  this.listenBodyClick(),
                  this.listenSelect(),
                  this.listenSearch(),
                  this.listenScroll());
              },
              initContainer: function() {
                if (
                  ((this.$container = document.getElementById(
                    this.options.container
                  )),
                  this.$container)
                ) {
                  (this.$container.style.position = "relative"),
                    (this.v1 =
                      this.$container.getAttribute("default-value") || "");
                  var t = this.$container.getAttribute("placeholder");
                  t = t ? t : "";
                  var e = document.createDocumentFragment();
                  (this.$input = document.createElement("input")),
                    this.$input.setAttribute(
                      "style",
                      "position: absolute;top:0;left: 0;width:100%;background-color:transparent;height: 100%;border: none 0;outline: none;"
                    ),
                    this.$input.setAttribute("value", this.v1),
                    this.$input.setAttribute("placeholder", t),
                    e.appendChild(this.$input),
                    (this.$list = document.createElement("div")),
                    this.$list.setAttribute(
                      "style",
                      " width: 100% ;height:auto;position: absolute;left: 0;top:" +
                        (this.isLG ? "100%" : "2.3rem") +
                        " ;background-color:" +
                        (this.isLG ? "#fdfdfd" : "transparent") +
                        " ;border-radius: 1px;z-index: 999;display: none;padding: " +
                        (this.isLG ? "17px 0px" : "0.3rem 0rem") +
                        ";"
                    ),
                    e.appendChild(this.$list),
                    (this.$mobBG = document.createElement("div")),
                    this.$mobBG.setAttribute("id", "service_mob_black_bg"),
                    this.$mobBG.setAttribute(
                      "style",
                      "width: 100%;height: 100%;position: fixed;left:0;top:0;background-color:rgba(0,0,0,.95);z-index:2;cursor:pointer;display:none;"
                    ),
                    document.body.appendChild(this.$mobBG),
                    (this.$mobInputLine = document.createElement("div")),
                    this.$mobInputLine.setAttribute(
                      "id",
                      "service_mob_inputBottom_line"
                    ),
                    this.$mobInputLine.setAttribute(
                      "style",
                      "width:calc(100% - 0.8rem);height:0;border-width:0 0 1px 0;border-style:solid;border-color:#666666;position:absolute;" +
                        ("iphone" === this.browser
                          ? "top:4.4rem"
                          : "top:3.75rem") +
                        ";left:0;margin-left:0.4rem;"
                    ),
                    this.$mobBG.appendChild(this.$mobInputLine),
                    (this.clickBack = this.options.clickBack
                      ? this.options.clickBack
                      : function() {}),
                    (this.selectBack = this.options.selectBack
                      ? this.options.selectBack
                      : function() {}),
                    this.$container.appendChild(e),
                    (this.$input = yuJS.deleteEmptyNode(
                      this.$container
                    ).childNodes[0]),
                    (this.$list = this.$input.nextSibling),
                    (this.$filterList = {}),
                    (this.$container.data = {
                      value: ""
                    });
                }
              },
              _isRended: !1,
              _isResetSize: !1,
              _highlightIndex: -1,
              _seletedIndex: -1,
              mobMoveInput: function(t) {
                if (!e.getLGScreen()) {
                  var i = this,
                    n = $$.ancestorNode(i.$input, 2);
                  t
                    ? ((i.$mobBG.style.display = "block"),
                      n.setAttribute(
                        "style",
                        "position:fixed;top:" +
                          ("iphone" === i.browser ? "3rem" : "2.15rem") +
                          ";"
                      ),
                      i.$mobBG.addEventListener(
                        "touchmove",
                        function(t) {
                          t.preventDefault();
                        },
                        !1
                      ),
                      i.$list &&
                        i.$list.addEventListener(
                          "touchmove",
                          function(t) {
                            t.preventDefault();
                          },
                          !1
                        ),
                      i.$input &&
                        i.$list.addEventListener(
                          "touchmove",
                          function(t) {
                            t.preventDefault();
                          },
                          !1
                        ),
                      $(window).scrollTop(0))
                    : ((i.$mobBG.style.display = "none"),
                      n.setAttribute("style", ""));
                }
              },
              highlight: function(t) {
                t = void 0 !== t && t > -1 ? t : this._highlightIndex;
                var e = this.$list.childNodes;
                if (e && this.isLG)
                  for (var i = 0; i < e.length; i++)
                    e[i].style.backgroundColor =
                      i == t ? "#f5f5f5" : "rgb(245,245,245)";
              },
              renderList: function(t) {
                var e = "",
                  i = t.length,
                  n = this.isLG ? "40px" : "1rem",
                  o = this.isLG ? "14px" : "0.32rem";
                if ((this.$list && (this.$list.style.height = "auto"), i > 0)) {
                  for (var s = 0; i > s; s++)
                    e +=
                      '<span name="' +
                      t[s].id +
                      '"class="' +
                      s +
                      '"style="background-color: transparent; padding: ' +
                      (this.isLG ? "0px 24px" : "0") +
                      ";display: block;height: " +
                      n +
                      ";line-height: " +
                      n +
                      ";font-size: " +
                      o +
                      ";text-align: left;text-overflow: ellipsis;overflow: hidden;color:" +
                      (this.isLG ? "#1a1a1a" : "white") +
                      ';cursor: pointer;" onmouseover="this.style.backgroundColor=\'#f5f5f5\';this.style.color=\'#008bd6\';" onmouseout="this.style.backgroundColor=\'#fdfdfd\';this.style.color=\'#1a1a1a\';" data-track=\'{"type":"click","params":{"version":"1.2.0","pageview":"官网服务搜索区","cfrom":"4113","kw":"' +
                      this.keywords +
                      '","q_id":"' +
                      t[s].id +
                      "\"}}'>" +
                      t[s].des +
                      "</span>";
                  (this.$list.innerHTML = e),
                    $$.show(
                      this.$list,
                      {
                        notAddPadding: !0,
                        height: "const"
                      },
                      this.duration
                    ),
                    this.mobMoveInput(!0);
                } else
                  (this.$list.innerHTML = e),
                    yuJS.hide(
                      this.$list,
                      {
                        height: ""
                      },
                      "200"
                    ),
                    this.mobMoveInput(!1);
                (this.filterDataList = t), (this._isRended = !0);
              },
              search: function() {
                if ("" === this.keywords || this.keywords === this.v1)
                  return (
                    (this.$input.innerHTML = ""),
                    void this.renderList(this.dataList)
                  );
                for (var t = [], e = this.dataList.length, i = 0; e > i; i++) {
                  var n = this.dataList[i];
                  t.push(n);
                }
                this.renderList(t);
              },
              listenFocus: function() {
                var t = this;
                this.$input.addEventListener("focus", function() {
                  return t._isRended && t.filterDataList.length > 0
                    ? void t.highlight(t._seletedIndex)
                    : void 0;
                });
              },
              listenBlur: function() {
                var t = this;
                this.$input.onblur = function() {
                  t.filterDataList && 0 === t.filterDataList.length
                    ? ((t.$input.innerHTML = t.v1), (t.keywords = ""))
                    : "" === t.$input.innerHTML.trim() &&
                      (t.$input.innerHTML = t.v1);
                };
              },
              mouseHighlight: function() {
                if (this.isLG) {
                  this.$list = yuJS.deleteEmptyNode(this.$list);
                  var t = this.$list.childNodes;
                  this._highlightIndex >= 0 &&
                    (t[this._highlightIndex].style.backgroundColor =
                      "rgba(223,223,223,0.95)");
                  for (var e = 0; e < t.length; e++)
                    this._highlightIndex =
                      "rgb(245, 245, 245)" == t[e].style.backgroundColor
                        ? e
                        : this._highlightIndex;
                }
              },
              keyboardSelect: function(t) {
                this.mouseHighlight(),
                  38 === t
                    ? (this._highlightIndex > 0 ? this._highlightIndex-- : null,
                      this.highlight())
                    : 40 === t &&
                      (this._highlightIndex < this.filterDataList.length - 1
                        ? this._highlightIndex++
                        : null,
                      this.highlight()),
                  (this._seletedIndex = this._highlightIndex);
              },
              request: function(t, e, i, n) {
                $$.ajax$({
                  method: t,
                  url: e,
                  data: i,
                  success: n
                });
              },
              listenKeyup: function() {
                var t = this,
                  e = !1,
                  i = function() {
                    if (!e && t.keywords !== t.$input.value.trim()) {
                      t.keywords = t.$input.value.trim();
                      var i = t.keywords.length,
                        n = commonTemplate.toast();
                      i > 20 &&
                        (new n({
                          context: document.body,
                          message: "输入内容过长",
                          time: 1500
                        }),
                        (t.keywords = t.keywords.substr(0, 20)),
                        (t.$input.value = t.keywords)),
                        (t.reqData.words = t.keywords),
                        t.request(t.type, t.url, t.reqData, function(e) {
                          var i = "string" == typeof e && $$.jsonParse(e);
                          (t.dataList = i.data),
                            t.dataList != t.oldData && t.search();
                        });
                    }
                  };
                t.$input.addEventListener("input", i, !1),
                  t.$input.addEventListener("compositionstart", function() {
                    e = !0;
                  }),
                  t.$input.addEventListener("compositionend", function() {
                    (e = !1), i();
                  }),
                  this.$input.addEventListener("keyup", function(e) {
                    var i = e.keyCode || e.which;
                    if (38 === i || 40 === i) t.keyboardSelect(i);
                    else if (13 === i) {
                      var n = e.target,
                        o = n.value;
                      yuJS.hide(
                        t.$list,
                        {
                          height: ""
                        },
                        "200"
                      ),
                        t.mobMoveInput(!1),
                        (t.keywords = o),
                        (t.$container.data.value = o),
                        $("footer")
                          .attr(
                            "data-track",
                            '{"type":"click","params":{"version":"1.2.0","pageview":"官网服务搜索区","cfrom":"4111","kw":"' +
                              t.keywords +
                              '"}}'
                          )
                          .trigger("click")
                          .removeAttr("data-track"),
                        t.clickBack(t.keywords);
                    }
                  });
              },
              listenSelect: function() {
                var t = this;
                t.$container.onclick = function(e) {
                  var i = e.target;
                  if ("search_home_input" != i.parentNode.getAttribute("id")) {
                    var n = i.innerHTML;
                    (t.$input.value = n),
                      (t.keywords = n),
                      yuJS.hide(
                        t.$list,
                        {
                          height: ""
                        },
                        "200"
                      ),
                      t.mobMoveInput(!1),
                      (t.$container.data.value = n),
                      (t._seletedIndex = i.getAttribute("class"));
                    var o = i.getAttribute("name");
                    o && t.selectBack(o);
                  } else {
                    yuJS.getDomCss(t.$list, "display");
                  }
                };
              },
              listenBodyClick: function() {
                var t = this;
                document.body.onclick = function(e) {
                  e.target.parentNode !== t.$list &&
                    e.target.parentNode !== t.$container &&
                    (yuJS.hide(
                      t.$list,
                      {
                        height: ""
                      },
                      "200"
                    ),
                    t.mobMoveInput(!1));
                };
              },
              listenSearch: function() {
                var t = yuJS.deleteEmptyNode(this.$container.parentNode),
                  e = t.lastChild,
                  i = this;
                e.onclick = function() {
                  (i.$container.data.value = i.keywords = i.$input.value),
                    yuJS.hide(
                      i.$list,
                      {
                        height: ""
                      },
                      "200"
                    ),
                    i.mobMoveInput(!1),
                    $("footer")
                      .attr(
                        "data-track",
                        '{"type":"click","params":{"version":"1.2.0","pageview":"官网服务搜索区","cfrom":"4111","kw":"' +
                          i.keywords +
                          '"}}'
                      )
                      .trigger("click")
                      .removeAttr("data-track"),
                    i.clickBack(i.keywords);
                };
              },
              listenScroll: function() {
                var e = this;
                if (e.isLG) {
                  var i = document.addEventListener || null,
                    n = function() {
                      yuJS.hide(
                        e.$list,
                        {
                          height: ""
                        },
                        "200"
                      ),
                        e.mobMoveInput(!1),
                        e.$input.blur();
                    };
                  i && e.browser && !e.browser.match("IE")
                    ? (i("DOMMouseScroll", n, !1), i("touchmove", n, !1))
                    : e.browser &&
                      "IE" != e.browser &&
                      (document.attachEvent("DOMMouseScroll", n),
                      document.attachEvent("touchmove", n)),
                    (t.onmousewheel = document.onmousewheel = n);
                }
              }
            }),
            i
          );
        },
        pagingIO: function(t, e) {
          var i,
            n,
            o = !t && document.getElementsByClassName("pageNum"),
            s = function(t) {
              var o = t,
                s = o.innerHTML.split("</span>&nbsp;/&nbsp;<span");
              return (
                (i = s[0].replace(/[^0-9]/gi, "")),
                (n = s[1].replace(/[^0-9]/gi, "")),
                e
                  ? [i, n]
                  : void ("1" === i && i !== n
                      ? ($$.addClass($$.prevNode(o), "pagingLU"),
                        $$.minusClass($$.nextNode(o), "pagingRU"))
                      : i === n && "1" !== i
                        ? ($$.minusClass($$.prevNode(o), "pagingLU"),
                          $$.addClass($$.nextNode(o), "pagingRU"))
                        : ($$.minusClass($$.prevNode(o), "pagingLU"),
                          $$.minusClass($$.nextNode(o), "pagingRU")))
              );
            };
          if (t) {
            var r = s(t);
            return r || [];
          }
          if (o && o.length) for (var a = 0, h = o.length; h > a; a++) s(o[a]);
        },
        backTop: function() {
          var i = e.createElement("div");
          i.setAttribute("class", "back_top_div"), e.body.appendChild(i);
          var n,
            o = !1,
            s = t.screen.availHeight;
          (e.onscroll = function() {
            (n = t.scrollY || t.pageYOffset),
              !o && n >= s
                ? ((i.style.display = "block"), (o = !0))
                : o && s > n && ((i.style.display = "none"), (o = !1));
          }),
            (i.onclick = function() {
              (e.body.scrollTop = 0), (e.documentElement.scrollTop = 0);
            });
        },
        lazyloadImg: function(t) {
          t(function() {
            t(".lazyload").lazyload();
          });
        },
        lightHead: function(t) {
          var i = e.querySelector("." + t);
          i && (i.style.color = "#AAAAAA");
        }
      },
      n = function() {
        var t = event.srcElement;
        (t.src =
          "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="),
          (t.onerror = null);
      };
    (t.nofind = n), (t.officialWebFun = i);
  })(window, document);
