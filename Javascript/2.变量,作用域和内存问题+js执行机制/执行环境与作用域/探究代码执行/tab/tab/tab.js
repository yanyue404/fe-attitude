/* ================================================================ 
6.7  一个图文混排的网页选项卡
=================================================================== */
onload = function(){


	var e, i = 0;
	while (e = document.getElementById('gallerya').getElementsByTagName ('DIV') [i++]) {
		if (e.className == 'ona' || e.className == 'offa') {
		e.onclick = function () {
			var getEls = document.getElementsByTagName('DIV');
				for (var z=0; z<getEls.length; z++) {
				getEls[z].className=getEls[z].className.replace('show', 'hide');
				getEls[z].className=getEls[z].className.replace('ona', 'offa');
				}
			this.className = 'ona';
			var target = this.getAttribute('title');
			document.getElementById(target).className = "show";
			}
		}
	}
var a, j = 0;
	
	while (a = document.getElementById('gallery').getElementsByTagName ('DIV') [j++]) {
		if (a.className == 'on' || a.className == 'off') {
		a.onclick = function () {
			var getEls = document.getElementsByTagName('DIV');
				for (var z=0; z<getEls.length; z++) {
				getEls[z].className=getEls[z].className.replace('show', 'hide');
				getEls[z].className=getEls[z].className.replace('on', 'off');
				}
			this.className = 'on';
			var target = this.getAttribute('title');
			document.getElementById(target).className = "show";
			}
		}
	}
	
}

//onload=function(){
//	var a, j = 0;
	
//	while (a = document.getElementById('gallery').getElementsByTagName ('DIV') [j++]) {
//		if (a.className == 'on' || a.className == 'off') {
//		a.onclick = function () {
//			var getEls = document.getElementsByTagName('DIV');
//				for (var z=0; z<getEls.length; z++) {
//				getEls[z].className=getEls[z].className.replace('show', 'hide');
//				getEls[z].className=getEls[z].className.replace('on', 'off');
//				}
//			this.className = 'on';
//			var target = this.getAttribute('title');
//			document.getElementById(target).className = "show";
//			}
//		}
//	}

//}

