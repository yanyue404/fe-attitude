// window.location.href='https://www.baidu.com';
// window.open("http://zkcx.bjeea.cn/zhcxxt/index.jsp");
// window.open("../../../portal/xgzc.html");
function openUrl(url) {
	var a = document.createElement('a');
	a.target = '_blank';
	a.href = url;
	a.style.display = 'none';
	var body = document.getElementsByTagName('body').item(0);
	body.appendChild(a);
	a.click();
	body.removeChild(a);
};