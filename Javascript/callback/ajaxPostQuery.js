function ajaxPostQuery(url, paramJsonStr, func, dataType) {
  var dataType = dataType || "json";
  var url = url || queryUrl;
  var sid = appcan.locStorage.getVal("sid");

  $.ajax({
    type: "POST",
    url: url,
    data: paramJsonStr + "&sid=" + sid,
    headers: {
      accept: "*/*"
    },
    //contentType:"application/x-www-form-urlencoded",
    dataType: dataType,
    timeout: 0,
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      appcan.window.alert("提示", "网络暂时不可用", "确定");
    },
    success: function(data) {
      var errorData;
      if (typeof data == "string") {
        try {
          errorData = eval("(" + data + ")");

          if (errorData.error == "-1") {
            //alert(url);
            relogin(url);
          } else {
            func(data);
          }
        } catch (e) {
          func(data);
        }
      }
    }
  });
}

function getOilInfo() {
  var url = a;
  var paramJsonStr = "";

  var func = callback;
  ajaxPostQuery(url, paramJsonStr, func, dataType);
}

function callback(data) {
  //do somthing
}
