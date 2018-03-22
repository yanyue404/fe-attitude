


function showDialog(title, content, footer, w, h, ad) {
  if (!content) content = "";
  if (!footer) footer = "";
  if (!w) w = 400;
  if (!h) h = 200;
  var l = document.body.scrollLeft + (document.body.clientWidth / 2 - w / 2);
  var t = document.body.scrollTop + (document.body.clientHeight / 2 - h / 2);
  var dl = document.all("dialog");
  if (dl) {
    var c = dl.length || 1;
    l = l + c * 30;
    t = t + c * 30;
  }
  var h = "  <div id=dialog_body style=width:" + w + "px;height:" + h + "px onmousedown=dl_down(event,this); onmousemove=dl_move(event,this); onmouseup=dl_up(event,this);>";
  h = h + "    <div id=dialog_header style=width:100%><div>" + title + "</div><a id=dialog_close href=javascript:; onclick=dl_close(this)></a></div>";
  if (content.indexOf("/") == 0 || content.indexOf("http://") == 0 || content == "about:blank") {
    h = h + "<iframe name=dialog_content src=" + content + " style=width:338px;height:118px; scrolling=auto frameborder=0></iframe>";
  } else {
    h = h + "<div id=dialog_content style=width:100%;height:100%>" + content + "</div>";
  }
  h = h + "    <div id=dialog_footer style=width:100%;>" + footer + "</div>";
  h = h + "  </div>";
  if (ad) {
    h = h + "  <div id=dialog_ad>" + ad + "</div>";
  }

  var dl = document.createElement("div");
  dl.id = "dialog";
  dl.style.position = "absolute";
  dl.style.left = l;
  dl.style.top = t;
  dl.style.zIndex = ("" + new Date().getTime()).substring(4);
  dl.innerHTML = h;
  document.body.appendChild(dl);
  return dl;
}




//弹出注册层

function sAlert(str, pointout, nextstr) {

  var eSrc = (document.all) ? window.event.srcElement : arguments[1];


  var shield = document.createElement("DIV");
  shield.id = "shield";
  shield.style.position = "absolute";
  shield.style.left = "0px";
  shield.style.top = "0px";
  shield.style.width = "100%";
  //shield.style.height = document.body.scrollHeight+"px";
  shield.style.height = "100%"
  shield.style.background = "#333";
  shield.style.textAlign = "center";
  shield.style.zIndex = "10000";
  shield.style.filter = "alpha(opacity=0)";
  shield.style.opacity = 0;
  var alertFram = document.createElement("DIV");
  alertFram.id = "alertFram";
  alertFram.style.position = "absolute";
  alertFram.style.left = "50%";
  alertFram.style.top = "50%";
  alertFram.style.marginLeft = "-225px";
  alertFram.style.marginTop = -75 + document.documentElement.scrollTop + "px";
  alertFram.style.width = "450px";
  alertFram.style.height = "150px";
  alertFram.style.background = "#ccc";
  alertFram.style.textAlign = "center";
  alertFram.style.lineHeight = "150px";
  alertFram.style.zIndex = "10001";

  strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">\n";
  strHtml += "	<li style=\"background:#80A9D8;text-align:left;padding-left:10px;font-size:14px;font-weight:bold;height:25px;line-height:25px;border:1px solid #90A6BD;\">";
  strHtml += "<span style=width:300px;float:left;display:block;font-size:12px;>" + pointout + "</span>";
  strHtml += "<span style=width:20px;float:right;display:block;font-size:12px;font-weight:normal;padding-top:5px;><a href=# id=do_OK onclick=doOk();><img src='/tea/mt/close.gif'></a></span></li>\n"
  strHtml += "	<li style=\"background:#F1F1F1;text-align:center;font-size:12px;height:120px;line-height:120px;border-left:1px solid #90A6BD;border-right:1px solid #90A6BD;\">" + str + "</li>\n";
  strHtml += "	<li style=\"background:#F1F1F1;text-align:center;font-weight:bold;height:25px;line-height:25px; border:1px solid #90A6BD;\">";
  strHtml += "    " + nextstr + "</li>\n";
  strHtml += "</ul>\n";
  alertFram.innerHTML = strHtml;
  document.body.appendChild(alertFram);
  document.body.appendChild(shield);
  this.setOpacity = function (obj, opacity) {
    if (opacity >= 1) opacity = opacity / 100;
    try { obj.style.opacity = opacity; } catch (e) { }
    try {
      if (obj.filters.length > 0 && obj.filters("alpha")) {
        obj.filters("alpha").opacity = opacity * 100;
      } else {
        obj.style.filter = "alpha(opacity=\"" + (opacity * 100) + "\")";
      }
    } catch (e) { }
  }
  var c = 0;
  this.doAlpha = function () {
    if (++c > 20) { clearInterval(ad); return 0; }
    setOpacity(shield, c);
  }
  var ad = setInterval("doAlpha()", 1);
  this.doOk = function () {// onclick=\"doOk()\"关闭
    //alertFram.style.display = "none";
    //shield.style.display = "none";
    document.body.removeChild(alertFram);
    document.body.removeChild(shield);
    eSrc.focus();
    document.body.onselectstart = function () { return true; }
    document.body.oncontextmenu = function () { return true; }
  }
  document.getElementById("do_OK").focus();
  //eSrc.blur();
  document.body.onselectstart = function () { return false; }
  document.body.oncontextmenu = function () { return false; }
}



function Alert(title, msg, w, h) {
  var s = document.getElementsByTagName("select"); //--------------把所有select标签捉住
  for (var j = 0; j < s.length; j++) { s[j].style.display = "none"; } //--------------设为不显示，再进行下面操作
  var titleheight = "20px"; // 提示窗口标题高度
  var bordercolor = "#666699"; // 提示窗口的边框颜色
  var titlecolor = "#FFFFFF"; // 提示窗口的标题颜色
  var titlebgcolor = "#1d5798"; // 提示窗口的标题背景色
  var bgcolor = "#FFFFFF"; // 提示内容的背景色
  var iWidth = document.documentElement.clientWidth;
  var iHeight = document.documentElement.clientHeight;
  var bgObj = document.createElement("div");
  bgObj.style.cssText = "position:absolute;left:0px;top:0px;width:" + iWidth + "px;height:" + Math.max(document.body.clientHeight, iHeight) + "px;filter:Alpha(Opacity=30);opacity:0.3;background-color:#000000;z-index:101;";
  document.body.appendChild(bgObj);
  var msgObj = document.createElement("div");
  msgObj.style.cssText = "position:absolute;font:11px '宋体';top:" + (iHeight - h) / 2 + "px;left:" + (iWidth - w) / 2 + "px;width:" + w + "px;height:" + h + "px;text-align:center;border:1px solid " + bordercolor + ";background-color:" + bgcolor + ";padding:1px;line-height:22px;z-index:102;";
  document.body.appendChild(msgObj);
  var table = document.createElement("table");
  msgObj.appendChild(table);
  table.style.cssText = "margin:0px;border:0px;padding:0px;";
  table.cellSpacing = 0;
  var tr = table.insertRow(-1);
  var titleBar = tr.insertCell(-1);
  titleBar.style.cssText = "width:100%;height:" + titleheight + "px;text-align:left;padding:3px;margin:0px;font:bold 13px '宋体';color:" + titlecolor + ";border:1px solid " + bordercolor + ";cursor:move;background-color:" + titlebgcolor;
  titleBar.style.paddingLeft = "10px";
  titleBar.innerHTML = title;
  var moveX = 0;
  var moveY = 0;
  var moveTop = 0;
  var moveLeft = 0;
  var moveable = false;
  var docMouseMoveEvent = document.onmousemove;
  var docMouseUpEvent = document.onmouseup;
  titleBar.onmousedown = function () {
    var evt = getEvent();
    moveable = true;
    moveX = evt.clientX;
    moveY = evt.clientY;
    moveTop = parseInt(msgObj.style.top);
    moveLeft = parseInt(msgObj.style.left);
    document.onmousemove = function () {
      if (moveable) {
        var evt = getEvent();
        var x = moveLeft + evt.clientX - moveX;
        var y = moveTop + evt.clientY - moveY;
        if (x > 0 && (x + w < iWidth) && y > 0 && (y + h < iHeight)) {
          msgObj.style.left = x + "px";
          msgObj.style.top = y + "px";
        }
      }
    };
    document.onmouseup = function () {
      if (moveable) {
        document.onmousemove = docMouseMoveEvent;
        document.onmouseup = docMouseUpEvent;
        moveable = false;
        moveX = 0;
        moveY = 0;
        moveTop = 0;
        moveLeft = 0;
      }
    };
  }
  var closeBtn = tr.insertCell(-1);
  closeBtn.style.cssText = "cursor:pointer; padding:2px;background-color:" + titlebgcolor;
  closeBtn.innerHTML = "<span  style='font-size:9pt; word-break:keep-all;white-space:nowrap; color:" + titlecolor + ";'>关闭</span>";
  closeBtn.onclick = function () {
    for (var j = 0; j < s.length; j++) { s[j].style.display = ""; } //--------------再给select显出来
    document.body.removeChild(bgObj);
    document.body.removeChild(msgObj);
  }
  var msgBox = table.insertRow(-1).insertCell(-1);
  msgBox.style.cssText = "font:10pt '宋体';";
  msgBox.colSpan = 2;
  msgBox.innerHTML = msg;
  // 获得事件Event对象，用于兼容IE和FireFox
  function getEvent() {
    return window.event || arguments.callee.caller.arguments[0];
  }
}










