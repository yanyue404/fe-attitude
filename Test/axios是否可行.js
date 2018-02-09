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
      $("#oilPrice").val("");
      $("#biaoshi").val("并表站");

      document.getElementById("oilPrice").readOnly = "readonly";
    } else {
      $("#oilPrice").val(modelList.price);
      if (modelList.biaoshi == "控股") {
        document.getElementById("oilPrice").readOnly = "readonly";
      }
    }
  }
});

axios
  .post(URL + "/front/oilPrice/object/queryObjectPriceByOilId", {
    oilPrice: oilPrice,
    ysfs: ysfstext,
    tyfs: tyfstext,
    xsdw: xsdwtext,
    oilinfoId: oilinfoId
  })
  .then(function(data) {
    var modelList = JSON.parse(data);
    console.log(modelList);
    //alert(modelList.biaoshi);
    //控股公司买油时，价格不可修改，普通客户购油价格可修改
    if (modelList.biaoshi == "并表站") {
      $("#oilPrice").val("");
      $("#biaoshi").val("并表站");

      document.getElementById("oilPrice").readOnly = "readonly";
    } else {
      $("#oilPrice").val(modelList.price);
      if (modelList.biaoshi == "控股") {
        document.getElementById("oilPrice").readOnly = "readonly";
      }
    }
  })
  .catch(function(err) {
    console.log(err);
  });
