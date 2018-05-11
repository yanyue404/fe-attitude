## 	列表动画一上一下
````

	$('.workList').hover(function(){
		$(this).animate({
			'top' : -2,
			'box-shadow' : '0 2px 6px rgba(0,0,0,0.6)'
			},200)
	}, function(){
		$(this).animate({
			'top' : 0,
			'box-shadow' : '0 2px 3px rgba(0,0,0,0.06)'
			},200)
	})
````