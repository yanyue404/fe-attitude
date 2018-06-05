/** 
 * @author tiantian
 * @version 0.1.0.0 
 * @class milo.util.AjaxPage 
 * 分页<br/>
 * added to milo by cathzhang on 2011-12-27<br/>
 * 静动态类分离，待修改<br/>
 * @demo http://gameact.qq.com/milo/util/ajaxpage.html
 */
namespace("AjaxPage"); 
/**
 * 数据动态分页
 * oPage 写实例化名，不妥
 * @param {object} opt 配置
 * @return {undefined} 
 */	 
var AjaxPage = function(opt){
	this.option = {
		oPage : '',
		pageId : '',
		pageNow : 1,
		pageShowNum : 5,
		pageTotal : 1,
		onChange : function(i){return true;},
		style : 0
	};
	
	this._AjaxPage = function(opt){
		var $extend = function(option, opt) {
			if(typeof(opt) != 'object' || !opt){
				return option;
			}
			for (var property in opt){
				option[property] = opt[property];
			}
			return option;
		};
		this.option = $extend(this.option, opt);
		//检查当前页与总页数的大小
		if(this.option.pageNow*1 > this.option.pageTotal*1){
			this.option.pageNow = this.option.pageTotal;
		}
		
		if(this.option.pageId.length < 1){
			alert('请配置表单id，分页显示位置id。');
			return false;
		};
		//只有总页数大与1的才显示分页。
		if(this.option.pageTotal > 0){
			this.showList(this.makeList(this.option.style));
		}
	};
	//首页
	this.linkFirst = function(){return '<a href="javascript:'+this.option.oPage+'.to(1);" class="pagepre pagefirst">首页</a>'};
	//上一页
	this.linkFore = function(i){return '<a href="javascript:'+this.option.oPage+'.to('+i+');" class="pagepre previouspage"  >上一页</a>'};
	this.linkForeNone = function(){return '<a href="javascript:;" class="pageprenone previouspageone" title="当前已经是第一页" >上一页</a>'};
	//显示的数字
	this.linkNum = function(i){if(i*1 == this.option.pageNow * 1){return '<span class="pageprenone pagenow">'+i+'</span>';} return '<a href="javascript:'+this.option.oPage+'.to('+i+');" class="pagepre" >'+i+'</a>';};
	this.linkNumNone = function(){return '<span class="pageprenone">...</span>'};
	//下一页
	this.linkNext = function(i){return '<a href="javascript:'+this.option.oPage+'.to('+i+');" class="pagenext" >下一页</a>'};
	this.linkNextNone = function(){return '<a href="javascript:;" class="pagenextnone" title=" 当前已经是最后一页">下一页</a>'};
	//尾页
	this.linkLast = function(){return '<a href="javascript:'+this.option.oPage+'.to('+this.option.pageTotal+');" class="pagenext">尾页</a>'};
	//跳转页面
	this.to = function(i){
		if(isNaN(i) || i <= 1){
			i = 1;
		}
		if(parseInt(i) >= parseInt(this.option.pageTotal)){
			i = this.option.pageTotal;
		}
		//是否有用户自定义的操作
		if(this.option.onChange(i)){
			//如果为true，则执行默认的操作。
			alert(i);
		}
		this.option.pageNow = i;
	};
	
	this.makeList = function(style){
		var pageList = [];
		var pageNow = this.option.pageNow * 1;
		var pageTotal = this.option.pageTotal*1;
		var pageShowNum = this.option.pageShowNum*1;
		
		pageList[0] = "";//空出来为了备用
		pageList[1] = "";//3/5页
		pageList[2] = "";//首页
		pageList[3] = "";//上一页
		pageList[4] = "";//1 ，2，3，4
		pageList[5] = "";//下一页
		pageList[6] = "";//尾页
		pageList[7] = "";//第5页 GO
		pageList[8] = "";//总页数100页

		pageList[1] = ' <span class="c3">'+pageNow+'/'+pageTotal+'页</span> ';
		pageList[8] = ' 共'+pageTotal+'页 ';
		
		if(pageTotal > 5){
			pageList[2] = this.linkFirst();
		}
			
		//显示上一页的按钮
		if(pageNow==1){
			pageList[3] = this.linkForeNone();
		}else if(pageNow>1){
			pageList[3] = this.linkFore(pageNow*1-1);
		};
		
		//显示链接数字
		if(pageShowNum > 0){
			pageList[4] = "";
			var _max = this.option.pageTotal * 1;
			if((pageNow - pageShowNum) > 1){
				pageList[4] += this.linkNumNone();
			}
			for(var i = pageShowNum * (-1); i <= pageShowNum; i++){
				if((pageNow + i) >= 1 && (pageNow + i) <= pageTotal){
					pageList[4] += this.linkNum((pageNow + i));
				}
				_max = pageNow + i;
			}
			if(_max < this.option.pageTotal * 1){
				pageList[4] += this.linkNumNone();
			}
		}
		
		//显示下一页的按钮
		if(pageNow<pageTotal){
			pageList[5] = this.linkNext(pageNow*1+1);
		}else if(pageNow >= pageTotal){
			pageList[5] = this.linkNextNone();
		}
		
		//显示尾页
		if(pageTotal > 5){
			pageList[6] = this.linkLast();
		}
		
		var _v = 'this.parentNode.getElementsByTagName(\'input\')[0].value';
		//输入框
		pageList[7] = ' 第<input size="4" onkeydown="if(event.keyCode==13) '+this.option.oPage+'.to(this.value)" value="'+pageNow+'" style="width:20px">页 <a href="#h" class="pagejump" onclick="'+this.option.oPage+'.to(' + _v + ');" style="cursor:pointer" align="absmiddle">GO</a>';


		//////////////////////范例////////////////////
		/**
		 * 4:1 ，2，3，4
		 * 7:第5页 GO
		 * 14:3/5页 1 ，2，3，4
		 * 17:3/5页 第5页 GO
		 * 35:上一页 下一页
		 * 135:3/5页 上一页 下一页
		 * 147:3/5页 1 ，2，3，4 第5页 GO
		 * 1345:3/5页 上一页 1,2,3 下一页
		 * 1246:3/5页 首页  1 ，2，3，4 尾页
		 * 12356:3/5页 首页 上一页 下一页 尾页
		 * 1234567:3/5页 首页 上一页 1 ，2，3，4 下一页 尾页 第5页 GO
		 */
		var _pageStr = '';
		style += '';
		for(var i = 0; i < style.length; i++){
			var _temp = style.charAt(i);
			if(pageList[_temp]){
				_pageStr += pageList[_temp];
			}
		}
		if(!_pageStr){
			for(var i = 1; i <= 7; i++){
				_pageStr += pageList[i];
			}
		}
		return _pageStr;
	};
	
	this.showList = function(listHtml){
		var arrpageId = [];
		if(typeof(this.option.pageId) != 'object'){
			arrpageId = [this.option.pageId];
		}else{
			if(this.option.pageId && this.option.pageId.join){
				arrpageId = this.option.pageId;
			}
		}
		
		for(var k = 0; k < arrpageId.length; k++){
			var onePageId = arrpageId[k];
			var onePageDom = null;
			if(typeof(onePageId) == 'string'){
				onePageDom = document.getElementById(onePageId);
			}else{
				onePageDom = onePageId;
			}
			
			if(onePageDom){
				try{
					onePageDom.innerHTML = listHtml;
				}catch(e){
					if(typeof($$) != 'undefined'){
						$$(onePageDom).html(listHtml);
					}else{
						alert('翻页程序 innerHTML 出错。');
					}
				}
			}
		}
	};
	this._AjaxPage(opt);
};

//静态分页程序。
AjaxPage.StaticPage = function(opt){
	var option = {
		'pageSize' : 10,
		'pageNow' : 1,
		'contentId' : '',
		'pageId' : ''
	};
	
	{//对象合并
		var _extend = function(option, opt) {
			if(typeof(opt) != 'object' || !opt){
				return option;
			}
			for (var property in opt){
				option[property] = opt[property];
			}
			return option;
		};
		option = _extend(option, opt);
	}

	var dataList = [];

	{//数据检测
		if(!option.contentId){
			alert('没有设置内容容器。contentId');
			return;
		}
		if(!option.pageId){
			alert('没有设置分页容器。pageId');
			return;
		}
		if(!option.onChange || typeof(option.onChange) != 'function'){
			option.onChange = function(i){return true;};
		}

		var Mar = document.getElementById(option.contentId);
		dataList = Mar.children;
		
		if(!option.oPage){
			var _name = option.pageId;
			if(typeof(_name) == 'object' && _name.join){
				_name = _name.join('_');
			}
			option.oPage = 'AjaxPage_'+_name+'_' + (+new Date);
		}
		option.pageTotal = (dataList.length % (option.pageSize*1) == 0) ? (dataList.length / (option.pageSize*1)) : (Math.floor(dataList.length / (option.pageSize*1)) + 1);
	}

	var _onChange = function(i){
		//1: 0 -> 9
		//2: 10
		var pageStart = (i - 1) * option.pageSize;
		var pageEnd = (i < option.pageTotal) ? (pageStart + option.pageSize) : (dataList.length);
		
		{
			for(var k = 0; k < dataList.length; k++){
				var _oneChild = dataList[k];
				if(k >= pageStart && k < pageEnd){
					_oneChild.style.display = "";
				}else{
					_oneChild.style.display = "none";
				}
			}
		}
		
		var _pageData = {};
		_pageData = _extend(_pageData, option);
		_pageData.oPage = option.oPage;
		_pageData.pageId = option.pageId;
		_pageData.pageNow = option.pageNow;
		_pageData.pageTotal = option.pageTotal;
		_pageData.onChange = function(p){
			option.pageNow = p;
			AjaxPage.StaticPage(option);
			return false;
		};
		
		window[option.oPage] = new AjaxPage(_pageData);
		option.onChange(i);
	};

	if(dataList.length > 0){
		_onChange(option.pageNow);
	}
};

define( "AjaxPage", [], function () { return AjaxPage; } );/*  |xGv00|16b5ce598674e5be089c40b067e0bcac */