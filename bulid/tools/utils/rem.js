(function(doc, win) {
  var resizeEvt =
      "orientationchange" in window ? "orientationchange" : "resize",
    setRemResponse = function() {
      var vM = 750;
      var vfontSize = 16;
      var html = doc.documentElement;
      var newfontSize = (vfontSize * html.clientWidth) / vM;
      html.style.fontSize = newfontSize + "px";
    };
  doc.addEventListener("DOMContentLoaded", setRemResponse, false);
  win.addEventListener(resizeEvt, setRemResponse, false);
})(document, window);
