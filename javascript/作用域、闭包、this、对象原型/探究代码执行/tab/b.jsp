<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" media="all" type="text/css" href="tab/tab.css" />
<script src="tab/tab.js" type="text/javascript"></script>


</head>

<body>
<div id="gallerya">
<div class="ona" title="news"><span>TS评分</span></div>
<div class="offa" title="entertainment"><span>偏差时序图</span></div>
<div class="offa" title="travel"><span>误差分析</span></div>
</div>

<div id="wrap">
<div id="news" class="show">

	rtbgtr

<br class="clear" />
</div>
<div id="entertainment" class="hide item">
dde
<br class="clear" />
</div>

<div id="travel" class="hide item">
<p>Gogh, Vincent (Willem) van (b. March 30, 1853, Zundert, Neth.--d. July 29, 1890, Auvers-sur-Oise, near Paris), generally considered the greatest Dutch painter and draughtsman after <a href="http://www.ibiblio.org/wm/paint/auth/rembrandt/">Rembrandt</a>.</p>
<br class="clear" />
</div>
</div>

<!-- <div id="gallery">
<div class="on" title="news"><span>TS评分</span></div>
<div class="off" title="entertainment"><span>偏差时序图</span></div>
<div class="off" title="travel"><span>误差分析</span></div>
</div>

<div id="wrap">
<div id="news" class="show">
	<div id="container" style="height: 400px;width: 400px;">
		
	</div>

<br class="clear" />
</div>
<div id="entertainment" class="hide item">
dde
<br class="clear" />
</div>

<div id="travel" class="hide item">
<p>Gogh, Vincent (Willem) van (b. March 30, 1853, Zundert, Neth.--d. July 29, 1890, Auvers-sur-Oise, near Paris), generally considered the greatest Dutch painter and draughtsman after <a href="http://www.ibiblio.org/wm/paint/auth/rembrandt/">Rembrandt</a>.</p>
<br class="clear" />
</div>
</div> -->

</body>
<!-- <script type="text/javascript">
window.onload = function() {
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
	
}
</script>
 --></html>
