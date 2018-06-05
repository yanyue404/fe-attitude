
let bom = {
  queryString: {
    get: function(name) {
      let getAll = searchString => {
        let query = searchString.replace(/^\?/, '')
        let queryObject = {}
        let queryArray = query.split('&').filter(i => i).forEach((string, index) => {
          let parts = string.split('=')
          queryObject[parts[0]] = decodeURIComponent(parts[1])
        })
        return queryObject
      }
      if (arguments.length === 0) {
        return getAll(location.search)
      } else {
        return getAll(location.search)[name]
      }
    },
    set: function(name, value) {
      let set = (search, name, value) => {
        let regex = new RegExp(`(${encodeURIComponent(name)})=([^&]*)`, '')
        if (regex.test(search)) {
          return search.replace(regex, (match, c1, c2) => `${c1}=${encodeURIComponent(value)}`)
        } else {
          return search.replace(/&?$/, `&${encodeURIComponent(name)}=${encodeURIComponent(value)}`)
        }
      }
      if (arguments.length === 1 && typeof name === 'object' && name !== null) {
        let search = location.search
        for (let key in arguments[0]) {
          search = set(search, key, arguments[0][key])
        }
        location.search = search
      } else {
        location.search = set(location.search, name, value)
      }
    },
  },
}

function scroll() {
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft,
    top: window.pageYOffset || document.documentElement.scrollTop
  };
}

//封装一个方法，兼容获取浏览器可视区域的宽高；
function client() {
  if (window.innerWidth !== undefined) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  } else if (document.compatMode === "CSS1Compat") {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    };
  } else {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    };
  }
}

var device = {
  /**
	 * 获取页面最大高度
	 * @return 属性样式
	 */
	getMaxH: function(){
		return (this.getPageHeight() > this.getWinHeight() ? this.getPageHeight() : this.getWinHeight())
	},
	
	/**
	 * 获取页面最大宽度
	 * @return 属性样式
	 */
	getMaxW: function(){
		return (this.getPageWidth() > this.getWinWidth() ? this.getPageWidth() : this.getWinWidth())
	},
	
	/**
	 * 网页内容高度
	 * @return {int} 网页内容高度
	 */
	getPageHeight: function(){
		var h = (window.innerHeight && window.scrollMaxY) ? (window.innerHeight + window.scrollMaxY) : (document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollHeight : document.body.offsetHeight);
		return h > document.documentElement.scrollHeight ? h : document.documentElement.scrollHeight
	},
	
	/**
	 * 网页内容宽度
	 * @return {int} 网页内容宽度
	 */
	getPageWidth: function(){
		return (window.innerWidth && window.scrollMaxX) ? (window.innerWidth + window.scrollMaxX) : (document.body.scrollWidth > document.body.offsetWidth ? document.body.scrollWidth : document.body.offsetWidth);
	},
	
	/**
	 * 浏览器可视区域高度
	 * @return {int} 网可视区域高度
	 */
	getWinHeight: function(){
		return (window.innerHeight) ? window.innerHeight : 
		(document.documentElement && document.documentElement.clientHeight) 
		? document.documentElement.clientHeight 
		: document.body.offsetHeight
	},
	
	/**
	 * 浏览器可视区域宽度
	 * @return {int} 网可视区域宽度
	 */
	getWinWidth: function(){
		return (window.innerWidth) ? window.innerWidth : (document.documentElement && document.documentElement.clientWidth) ? document.documentElement.clientWidth : document.body.offsetWidth
	},
	
	/**
	 * 设置dom透明度
	 * @param {dom} ele dom对象
	 * @param {int} level 透明度值（0-100的整数）
	 * @return {undefined} 
	 */	
	setOpacity: function(ele, level){
		//level = Math.min(1,Math.max(level,0));
		if(this.browser.msie && (!document.documentMode || document.documentMode < 9)){
			ele.style.filter = 'Alpha(opacity=' + level + ')'
		}else{
			ele.style.opacity = level / 100
		 }
    },
	/**
	 * 获取页面中对象的绝对X位置
	 * @param {dom} e dom对象
	 * @return {int} 
	 */	
	getX: function(e) {
		var t = e.offsetLeft;
		while (e = e.offsetParent) t += e.offsetLeft;
		return t
	},
	/**
	 * 获取页面中对象的绝对Y位置
	 * @param {dom} e dom对象
	 * @return {int} 
	 */	
	getY: function(e) {
		var t = e.offsetTop;
		while (e = e.offsetParent) t += e.offsetTop;
		return t
	}
}

function goBack() {
  history.back();
}

