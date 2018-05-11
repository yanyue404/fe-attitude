
var data = {
  ordersubId: "97cf849122a711e884160050568d787a",
  createDate: "2018-03-08 16:13:48",
  createId: "960E682409F945D8A248D099AD047239",
  cusCompany: "公司1",
  cusId: "960E682409F945D8A248D099AD047239",
  deportName: "海滨油库",
  extractType: 0,
  gyfgs: "上海销售",
  noticeCode: "201803081601n",
  oilAmot: 12027000,
  oilNumber: 1900,
  oilPrice: 6330,
  oilinfoId: "BEF9EF0B03904B59851CD6191F1C5F87",
  oilinfoName: "0号 车用柴油(V)"

}

//传递固定的字符串

var html0 = '<input type="button" onclick="aaa(\'123\')" />';

// 单个参数

var html1 = "<span onclick=\"gotoDelivery('" + data.ordersubId + "')\">自提</span>";
var html2 = '<span  onclick="onchangeDwsx(\'' + data.oilinfoId + '\')">单位属性</span>';




//多个参数
var html3 = '<p onclick="func(' + data.ordersubId + ',' + data.createDate + ')">点击这段话</p>';

// 将 & quot；转义为""

for (var i = 1; i <= pojoList.length; i++) {
      
  //"&quot;" 这是HTML语言中的表示引号（"）的字符实体。
  var oilInfoparam = "&quot;" + oilinfoId + "&quot;,&quot;" + zhuanshu + "&quot;,&quot;" + oilinfoName + "&quot;,&quot;" + oilinfoSpec + "&quot;";
 
  if (cusState == "1") {//激活用户（挂牌价、专属价）

    htmlstr += "<div class='item-content' onclick='showToast(" + oilInfoparam + ");'>";
  }
 
}
function showToast(oilinfoId, oilPrice, oilinfoName, oilinfoSpec) {
  // dosomthing...
}



// 例子 select
for (var i = 0; i < modelList.length; i++) {
  var option = "<option value=\"" + modelList[i].id + "\"";

  option += ">" + modelList[i].name + "</option>";  //动态添加数据
  $("#gyfgs").append(option);
}

// 多层传参

for (var i = 0; i < orderList.length; i++) {

  if (state == '3' && orgType == '1') {
    //不存在ERP编码
    if (!orderList[i]["erpStatementCode"]) {
      var appendHtml = "<div id='" + orderList[i]["orderId"] + "' class='ub ub-ac ub-pe m-row4'><span class='y-font umar-l' onclick='confirmIntention(id,\"" + orderList[i].oilAmot + "\",\"" + orderList[i].cusId + "\",\"" + orderList[i].gyfgs + "\",\"" + orderList[i].orderId + "\")'>确认结算并转付</span></div>";

      $("#position" + i)[0].innerHTML = appendHtml;
    }
  }
}



