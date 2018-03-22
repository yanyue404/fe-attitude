// window.location.href='https://www.baidu.com';
// window.open("http://zkcx.bjeea.cn/zhcxxt/index.jsp");
// window.open("../../../portal/xgzc.html");
function openUrl(b) {
  var a = document.createElement('a');
  a.setAttribute('href', b)
  // a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
openUrl('https://www.baidu.com')