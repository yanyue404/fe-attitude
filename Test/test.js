function queryCompany() {
  var url = URL + "/app/bill/checkCompany",
    paramJsonStr = "";

  $.ajax({
    type: "post",
    url: url,
    data: paramJsonStr,
    async: false,
    success: function(data) {
      if (typeof data == "string") {
        data = eval("(" + data + ")");
      }

      var html = template("checkcity", {
        list: data
      });

      $("#gyfgs").html(html);
    }
  });
}

$.ajax({
  url: URL + "/front/oilPrice/object/queryObjectPriceByOilId",
  type: "post",
  data: {
    oilPrice: oilPrice,
    ysfs: ysfstext,
    tyfs: tyfstext,
    xsdw: xsdwtext,
    oilinfoId: oilinfoId
  },
  cache: false,
  error: function() {},
  success: function(data) {
    var modelList = JSON.parse(data);
    //alert(modelList.biaoshi);
    //控股公司买油时，价格不可修改，普通客户购油价格可修改
    if (modelList.biaoshi == "并表站") {
      alert("并表站");
      $("#oilPrice").val("");
      // $("#biaoshi").val("并表站");
      document.getElementById("oilPrice").readOnly = "readonly";
    } else if (modelList.biaoshi == "控股") {
      document.getElementById("oilPrice").readOnly = "readonly";
    }
    var oilPrice = fmoney(modelList.price);
    document.getElementById("oilPrice").value = oilPrice;
  }
});
