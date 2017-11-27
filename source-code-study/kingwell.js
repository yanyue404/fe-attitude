/*
 * Name    : Kingwell JavaScript Library v1.5
 * Author  : Kingwell Leng
 * E-mial  : jinhua.leng ### gamil.com
 * Blog    : http://www.cnblogs.com/kingwell/ http://kingwell-leng.iteye.com/admin
 * Date    : 2013-4-31 15:07
 */
(function (w, d) {
	if (!window.KW) {
		window.KW = {};
	}
	var location = window.location,
	de = d.documentElement,
	userAgent = navigator.userAgent.toLowerCase(),
	ie6 = /msie 6.0/.test(userAgent),
	opera = /opera/.test(userAgent),
	ie = /msie/.test(userAgent) && !opera,
	safari = /webkit/.test(userAgent),
	test=yue,
	ff = /firefox/.test(userAgent);
	var tip = {
		require : '缺少参数，参数必须的',
		rule : '参数不合法'
	};
	KW = {
		name : 'Kingwell Javascript Library',
		version : '1.5',
		debug : true,
		namespace : function (name) {
			var parts = name.split('.');
			var current = KW;
			for (var i in parts) {
				if (!current[parts[i]]) {
					current[parts[i]] = {};
				}
				current = current[parts[i]];
			}
		},
		Dom : {
			$ : function (id) {
				return typeof id === 'string' ? d.getElementById(id) : id;
			},
			remove : function (o) {
				var obj = this.$(o);
				if (!obj) {
					return;
				}
				return obj.parentNode.removeChild(obj);
			},
			setOpacity : function (obj, val) {
				var vals = (typeof obj === "number" && val <= 100 && val >= 0) ? val : 100;
				if (!obj) {
					return;
				}
				if (ie) {
					obj.style.filter = 'alpha(opacity=' + vals + ')';
				} else {
					obj.style.opacity = vals / 100;
				}
			},
			getMaxZindex : function (o) {
				var maxZindex = 0;
				var obj = o ? o : '*';
				var divs = d.getElementsByTagName(obj);
				for (z = 0; z < divs.length; z++) {
					maxZindex = Math.max(maxZindex, divs[z].style.zIndex);
				}
				return maxZindex;
			},
			createElement : function (type, prop) {
				var tmp = d.createElement(type);
				for (var i in prop) {
					tmp.setAttribute(i, prop[i]);
				}
				return tmp;
			},
			createTextNode : function (txt) {
				return d.createTextNode(txt);
			},
			hasAttr : function (obj, attr) {
				obj.getAttribute(attr);
				return obj;
			},
			setAttr : function (obj, attr) {
				var self = this;
				for (var i in attr) {
					if (i === 'class') {
						self.addClass(obj, attr[i]);
					} else {
						obj.setAttribute(i, attr[i]);
					}
				}
				return obj;
			},
			removeAttr : function (obj, attr) {
				obj.removeAttribute(attr);
				return obj;
			},
			getClass : function (c, pd) {
				var all = pd ? d.getElementsByName(pd).getElementsByTagName("*") : d.getElementsByTagName("*"),
				str = "",
				n = [];
				for (var i = 0; i < all.length; i++) {
					if (KW.Dom.hasClass(all[i], c)) {
						n.push(all[i]);
					}
				}
				return n;
			},
			addClass : function (o, str) {
				var obj = this.$(o);
				if (!obj) {
					return;
				}
				var className = obj.className;
				var reg = eval("/^" + str + "$ | " + str + "$|^" + str + " | " + str + " /");
				if (reg.test(className)) {
					return;
				}
				if (className !== '') {
					obj.className = className + " " + str;
				} else {
					obj.className = str;
				}
			},
			removeClass : function (o, str) {
				var obj = this.$(o);
				if (!obj) {
					return;
				}
				var className = obj.className;
				if (this.isNull(className)) {
					var reg = new RegExp(str, "g");
					var n = className.replace(reg, "");
					obj.className = n;
				}
			},
			hasClass : function (o, str) {
				if (!o) {
					return;
				}
				var obj = this.$(o);
				var className = obj.className;
				var reg = eval("/^" + str + "$| " + str + "$|^" + str + " | " + str + " /");
				if (reg.test(className)) {
					return true;
				} else {
					return false;
				}
			},
			html : function (obj, html) {
				if (html) {
					obj.innerHTML = html;
				} else {
					return obj.innerHTML;
				}
			},
			text : function (obj, text) {
				if (text) {
					if (document.textContent) {
						obj.textContent = text;
					} else {
						obj.innerText = text;
					}
				} else {
					if (document.textConten) {
						return obj.textContent;
					} else {
						return obj.innerText;
					}
				}
			}
		},
		Events : {
			addEvent : function (oTarget, oType, fnHandler) {
				var self = this;
				if (oTarget.addEventListener) {
					oTarget.addEventListener(oType, fnHandler, false);
				} else if (oTarget.attachEvent) {
					oTarget.attachEvent('on' + oType, fnHandler);
				} else {
					oTarget['on' + oType] = fnHandler;
				}
			},
			removeEvent : function (oTarget, oType, fnHandler) {
				var self = this;
				if (oTarget.removeEventListener) {
					oTarget.removeEventListener(oType, fnHandler, false);
				} else if (oTarget.detachEvent) {
					oTarget.detachEvent('on' + oType, fnHandler);
				} else {
					oTarget['on' + oType] = null;
				}
			},
			getEvent : function (ev) {
				return ev || window.event;
			},
			getTarget : function (ev) {
				return this.getEvent(ev).target || this.getEvent().srcElement;
			},
			stopPropagation : function () {
				if (window.event) {
					return this.getEvent().cancelBubble = true;
				} else {
					return arguments.callee.caller.arguments[0].stopPropagation();
				}
			},
			stopDefault : function () {
				if (window.event) {
					return this.getEvent().returnValue = false;
				} else {
					return arguments.callee.caller.arguments[0].preventDefault();
				}
			}
		},
		Ready : function (loadEvent) {
			if (!loadEvent) {
				return;
			}
			var init = function () {
				if (arguments.callee.done) {
					return;
				} else {
					arguments.callee.done = true;
				}
				loadEvent.apply(d, arguments);
			};
			if (d.addEventListener) {
				d.addEventListener("DOMContentLoaded", init, false);
				return;
			}
			if (safari) {
				var _timer = setInterval(function () {
						if (/loaded|complete/.test(d.readyState)) {
							clearInterval(_timer);
							init();
						}
					}, 10);
			}
			d.write('<script id="_ie_onload" defer src="javascript:void(0)"><\/script>');
			var script = d.getElementById('_ie_onload');
			script.onreadystatechange = function () {
				if (this.readyState == 'complete') {
					init();
				}
			};
			return true;
		},
		Storage : {
			setItem : function (strName, strValue) {
				if (Storage) {}
				else if (Storage) {}
				else {}

			},
			getItem : function (strValue) {},
			removeItem : function (strValue) {},
			removeAll : function () {}

		},
		getScript : function (obj, callback, order) {
			var self = this,
			arr = obj,
			timeout,
			ord = order || true,
			num = 0,
			str = typeof obj === 'string';
			if (!arr) {
				this.Error(tip.require);
				return;
			}
			function add() {
				if (arr[0] === undefined) {
					return;
				}
				var script = KW.Dom.createElement("script", {
						'src' : (str ? obj : arr[num]),
						'type' : 'text/javascript'
					}),
				header = d.getElementsByTagName("head")[0];
				if (str) {
					if (script.readyState) {
						script.onreadystatechange = function () {
							if (script.readyState === 'loaded' || script.readyState === 'complete') {
								script.onreadystatechange = null;
								callback && callback();
							}
						};
					} else {
						script.onload = function () {
							callback && callback();
						};
					}
				} else {
					if (arr.length >= 1) {
						if (script.readyState) {
							script.onreadystatechange = function () {
								if (script.readyState === 'loaded' || script.readyState === 'complete') {
									script.onreadystatechange = null;
									arr.shift();
									timeout = setTimeout(add, 1);
								}
							};
						} else {
							script.onload = function () {
								arr.shift();
								timeout = setTimeout(add, 1);
							};
						}
					} else {
						clearTimeout(timeout);
						callback && callback();
					}
				}
				header.appendChild(script);
			}
			add();
		},
		Ajax : function (obj) {
			if (!obj.url) {
				return false;
			}
			var method = obj.type || "GET";
			var async = obj.async || true;
			var dataType = obj.dataType;
			var XHR = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
			XHR.open(method, obj.url, async);
			XHR.setRequestHeader('If-Modified-Since', 'Thu, 06 Apr 2006 00:00: 00 GMT');
			XHR.send(null);
			if (obj.sendBefore) {
				obj.sendBefore();
			}
			XHR.onreadystatechange = function () {
				if (XHR.readyState == 4 && (XHR.status >= 200 && XHR.status < 300 || XHR.status == 304)) {
					if (obj.success) {
						if (dataType && dataType.toLocaleLowerCase() === "json") {
							obj.success.call(XHR, eval("(" + XHR.responseText + ")"));
						} else if (dataType && dataType.toLocaleLowerCase() === "xml") {
							obj.success.call(XHR, XHR.responseXML);
						} else {
							obj.success.call(XHR, XHR.responseText);
						}
					}
					if (obj.complete) {
						obj.complete();
					}
				} else {
					if (obj.complete) {
						obj.complete();
					}
				}
			};
		},
		Cookies : {
			setCookie : function (sName, sValue, oExpires, sPath, sDomain, bSecure) {
				var sCookie = sName + '=' + encodeURIComponent(sValue);
				if (oExpires) {
					var date = new Date();
					date.setTime(date.getTime() + oExpires * 60 * 60 * 1000);
					sCookie += '; expires=' + date.toUTCString();
				}
				if (sPath) {
					sCookie += '; path=' + sPath;
				}
				if (sDomain) {
					sCookie += '; domain=' + sDomain;
				}
				if (bSecure) {
					sCookie += '; secure';
				}
				d.cookie = sCookie;
			},
			getCookie : function (sName) {
				var sRE = '(?:; )?' + sName + '=([^;]*)';
				var oRE = new RegExp(sRE);
				if (oRE.test(d.cookie)) {
					return decodeURIComponent(RegExp[$1]);
				} else {
					return null;
				}
			},
			removeCookie : function (sName, sPath, sDomain) {
				this.setCookie(sName, '', new Date(0), sPath, sDomain);
			},
			clearAllCookie : function () {
				var cookies = d.cookie.split(";");
				var len = cookies.length;
				for (var i = 0; i < len; i++) {
					var cookie = cookies[i];
					var eqPos = cookie.indexOf("=");
					var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
					name = name.replace(/^\s*|\s*$/, "");
					d.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
				}
			}
		},
		tabSort : function (sTableID, iCol, sDataType) { //排序函数，sTableID为目标,iCol哪列排序，为必需，sDataType可选
			var oTable = document.getElementById(sTableID);
			var oTBody = oTable.tBodies[0];
			var colDataRows = oTBody.rows;
			var aTRs = [];
			var len = colDataRows.length;
			function convert(sValue, sDataType) { //类型转，根据不同类型数据排序，比如，整型，日期，浮点，字符串，接受两个参数，一个是值，一个是排序的数据类型
				switch (sDataType) {
				case "int":
					return parseInt(sValue);
				case "float":
					return parseFloat(sValue);
				case "date":
					return new Date(Date.parse(sValue));
				default:
					return sValue.toString();
				}
			}
			function geterateCompareTRs(iCol, sDataType) { //比较函数，用于sort排序用
				return function compareTRs(oTR1, oTR2) {
					var vValue1,
					vValue2;
					if (oTR1.cells[iCol].getAttribute("value")) { //用于高级排序，比如图片，添加一个额外的属性来排序
						vValue1 = convert(oTR1.cells[iCol].getAttribute("value"), sDataType);
						vValue2 = convert(oTR2.cells[iCol].getAttribute("value"), sDataType);
					} else {
						vValue1 = convert(oTR1.cells[iCol].firstChild.nodeValue, sDataType);
						vValue2 = convert(oTR2.cells[iCol].firstChild.nodeValue, sDataType);
					}
					if (vValue1 < vValue2) {
						return -1;
					} else if (vValue1 > vValue2) {
						return 1;
					} else {
						return 0;
					}
				};
			}
			for (var i = 0; i < len; i++) {
				aTRs[i] = colDataRows[i];
			}
			if (oTable.sortCol == iCol) { //如果已经排序，则倒序
				aTRs.reverse();
			} else {
				aTRs.sort(geterateCompareTRs(iCol, sDataType));
			}
			var oFragment = document.createDocumentFragment();
			var trlen = aTRs.length;
			for (var j = 0; j < trlen; j++) {
				oFragment.appendChild(aTRs[j]);
			}
			oTBody.appendChild(oFragment);
			oTable.sortCol = iCol; //设置一个状态
		},
		Browse : {
			isIE : ie,
			isFF : ff
		},
		trim : function (str) {
			var re = /^\s*(.*?)\s*$/;
			return str.replace(re, '$1');
		},
		escape : function (str) {
			var s = "";
			if (str.length === 0) {
				return "";
			}
			s = str.replace(/&/g, "&amp;");
			s = s.replace(/</g, "&lt;");
			s = s.replace(/>/g, "&gt;");
			s = s.replace(/ /g, "&nbsp;");
			s = s.replace(/\'/g, "&#39;");
			s = s.replace(/\"/g, "&quot;");
			return s;
		},
		getQueryString : function (name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = location.search.substr(1).match(reg);
			if (r !== null)
				return unescape(r[2]);
			return null;
		},
		Error : function (obj, info) {
			if (!this.debug) {
				return;
			}
			throw Error(obj);
		}
	};
	Kingwell = KW;
})(window, document);
