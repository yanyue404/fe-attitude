//返回顶部按钮
$(function($){
	var gotop = $('<a title="返回顶部" class="returnTop" href="javascript:;"> </a>').hide().appendTo(document.body);
	var visiable = false;
	gotop.bind('click',function(){
		$('html,body').animate({
			scrollTop : 0
		});
		return false;
	});
	
	var resize = function(){
		var shw
		$(window).width()<=1024?shw=39:shw=0
		gotop.css('left',Math.max(($(window).width() - 1002)/2 + 1002,1000)-shw);
	};
	resize();
	
	$(window).bind('resize',resize);
	$(window).scroll(function(){
		var top = $(window).scrollTop();
		if(top > 10){
			if(!visiable){
				gotop.show();
				visiable = 1;
			}
		}else{
			if(visiable){
				gotop.hide();
				visiable = 0;
			}
		}
	});
});
