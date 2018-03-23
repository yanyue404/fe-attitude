'use strict';
/*
http://trace.qq.com/collect?pj=1990&dm=guanjia.qq.com&url=/&arg=&rdm=&rurl=&rarg=&icache=&uv=&nu=&ol=&loc=http%3A//guanjia.qq.com/&column=&subject=&nrnd=360375320&rnd=78902
*/
//
(function(){
	//mgr tongji
	var API='//p.guanjia.qq.com/bin/monitor/report.php?';
	var PV_COOKIE_NAME='m_pvid'

	//监控点击的tag
	var watchTag=null
	var prefix=''
	var MTJ=function(){
		//master of gj tongji
		var loc=window.location
		var ua=window.navigator||{};
		ua=ua.userAgent||''

		this.arg={
			domain:loc.host,
			url:loc.pathname,
			tag:'',
			h_id:'0',
			type:0,
			adtag:'',
			refer:document['referrer'],
			browser:getBrowserInfo(),
			useragent:ua
		}
		
		//get adtag
		var s=window.location.search
		if(s[0]=='?'){
			s=s.substring(1)
		}
		s=s.split('&')
		for (var i = 0; i < s.length; i++) {
			var a=s[i].split('=')
			if(a[0]=='ADTAG'){
				this.arg['adtag']=a[1]
				break;
			}
		}
		
		//pvid，标记id
		var pvid=getCookie(PV_COOKIE_NAME)
		if(!pvid){
			//双random，减少重复的机率，单机测试500w样本重复率为0
			pvid=(Math.random()+'').split('.')[1]+''+(Math.random()+'').split('.')[1]
			setCookie(PV_COOKIE_NAME,pvid,30)
		}
		this.arg[PV_COOKIE_NAME]=pvid

		
	}
	/*
		private functions
	*/
	function watchClickEvent(e){
		if(!watchTag){
			return ;
		}
		e=e||window.event
		var ele=e.srcElement||e.target
		var t=null
		do{
			if(ele.getAttribute)
				t=ele.getAttribute(watchTag)
			if(t){
				t=t.replace(/[ ]*/,'')
				if(t!=''){
					mtj.click(t)
				}
				return
			}

			ele=ele.parentNode
		}while(ele);
	}

	function setCookie(name,value,expiredays){
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=name+ "=" +escape(value)+';path=/'+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	}
	function getCookie(name){
		if (document.cookie.length>0){
			var start=document.cookie.indexOf(name + "=")
			if (start!=-1){ 
				start=start + name.length+1 
				var end=document.cookie.indexOf(";",start)
				if (end==-1) end=document.cookie.length
				return unescape(document.cookie.substring(start,end))
			}
		}
		return ""
	}

	// name:x.x.x
	function getBrowserInfo(){
		var Sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var re =/(msie|firefox|chrome|opera|version).*?([\d.]+)/;
		var m = ua.match(re);
		var browser = m[1].replace(/version/, "'safari");
		var ver = m[2];
		return browser+':'+ver;
	}


	/*
		prototype functions
	*/
	MTJ.prototype={
		/*
			如果指定不监控 click，必须传入false
		*/
		run:function(watch){
			//page info
			mtj.send({
				//tag:'page.gj.web.load',
				type:0
				/*
				browser:'',
				platform:window.navigator.platform,
				*/
			})

			if(watch!==false){
				//watch click event
				if(watch===undefined || watch===''){
					watchTag='data-stats'
				}else{
					watchTag=watch
				}

				if(document['addEventListener']){
					document.addEventListener('click',watchClickEvent,false)
				}else{
					document.attachEvent('onclick',watchClickEvent)
				}
			}
			return this
		},
		prefix:function(pre){
			prefix=pre.split(/[\. ]+/).join('.')
			return this
		},
		//设置ID
		id:function(val){
			this.arg['h_id']=val
			return this
		},
		name:function(name){
			this.arg['name']=name
			return this
		},
		send:function(opt){
			var uin=getCookie('uin')
			if(uin==''){
				uin=getCookie('o_cookie')
			}
			this.arg['uin']=uin.replace(/^0*[^0-9]*0*/,'')
			this.arg['rand']=parseInt(Math.random()*100000)

			var arg=this.arg
			for(var o in arg){
				//merge to opt
				if(opt[o]==undefined){
					opt[o]=arg[o]
				}
			}

			//修正 tag
			var tagSplit=opt['tag'].split('.')
			if( prefix!='' && tagSplit.length<4 ){
				opt['tag']=prefix+'.'+tagSplit.join('.')
			}

			var url=API
			for(var i in opt){
				url+= i+'='+encodeURIComponent(opt[i])+'&'
			}

			var img=new Image()
			img.onload=function(){
				img=null
			}
			img.src=url

			return this
		},
		//
		click:function(tag){
			var dft={

			}
			this.send({
				tag:tag,
				type:1
			})
			//不用链式返回，老的IE浏览器会当成链接跳转
		}
	}

	window.mtj=new MTJ()
})()
