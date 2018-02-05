# 原生 js 字符串传递参数

### 1.使用 \ 转义

* demo1

html

```
<div id="dd">
    <input type="button" onclick="aaa('aaa')" value="click1" />
  </div>
```

js

```
 document.getElementById("dd").innerHTML += '<input type="button" onclick="aaa(\'bb\')" value="click2" />';
  function aaa(param) {
    alert(param);
  }

orgAttribute = '<span class="" title="单位属性" onclick="onchangeDwsx(\''+ rowdata.cusId+ '\')">单位属性</span>';
```

* demo2

html

```
<select id="gyfgs" class="select"></select>
```

js

```
 Mock.mock('http://api.com', {

      "user|3": [{
        'id': '@id', // 随机生成一个 18 位身份证。
        'name': '@cname',   // 中文名称
        'age|1-100': 100,   // 100以内随机整数
        'birthday': '@date("yyyy-MM-dd")',  // 日期
        'city': '@city(true)',   // 中国城市
        'text': 'true',
      }]
    });

    $.ajax({
      url: 'http://api.com',
      dataType: 'json'
    }).done(function (data, status, xhr) {
      var data = JSON.stringify(data, null, 4);
      var model = JSON.parse(data);
      var modelList = model.user;


      if (modelList && modelList.length != 0) {
        for (var i = 0; i < modelList.length; i++) {
          var option = "<option value=\"" + modelList[i].id + "\"";

          option += ">" + modelList[i].name + "</option>";  //动态添加数据
          $("#gyfgs").append(option);
        }
      }

    });
```

* demo3 data 中的 i 与\使用

```
  function getNoOkOrderCallback(data) {
      appcan.window.closeToast();
      var data = JSON.parse(data);

      listNum = data.length;
      listData = data;

      if (data.length == 0) {
          var listhtml = "<div id='time' class='ub ub-pc' style='margin: 0.8em 0;'>" + "<span class='mf-size2 time'>您没有符合条件的付邮通知单!</span>" + "</div>";
          // $("#fuyou").html("");
          $("#listdetail").append(listhtml);
          return;
      }
      //
      var html = template('Allorder_list', {
          list : data
      })

      $('#listdetail').html(html)
      var orderList = data;
      var listHtml = "";
      var sumprice = 0.00;

      for (var i = 0; i < orderList.length; i++) {

          var orderId = orderList[i].orderId;
          var state = orderList[i].state;

          var oilinfoId = orderList[i].oilinfoId;
          var oilinfoName = orderList[i].oilinfoName;
          var extractType = orderList[i].extractType;

          var oilNumber = orderList[i].oilNumber ? orderList[i].oilNumber : 000;
          var oilPrice = orderList[i].oilPrice;

          var orgType = appcan.locStorage.getVal("orgType");

          if (state == '3' && orgType == '1') {
              //不存在ERP编码
              if (!orderList[i]["erpStatementCode"]) {
                  var appendHtml = "<div id='" + orderList[i]["orderId"] + "' class='ub ub-ac ub-pe m-row4'><span class='y-font umar-l' onclick='confirmIntention(id,\"" + orderList[i].oilAmot + "\",\"" + orderList[i].cusId + "\",\"" + orderList[i].gyfgs + "\",\"" + orderList[i].orderId + "\")'>确认结算并转付</span></div>";

                  $("#position" + i)[0].innerHTML = appendHtml;
              }
          }
      }

  }
```

### 2.将&quot；转义为""

```
    for (var i = 1; i <= pojoList.length; i++) {
      var htmlstr = "",

        oilinfoId = pojoList[i - 1].oilinfoId,
        //图片位置
        zhuanshu = pojoList[i - 1].zhuanshu,
        //油品ID
        oilinfoName = pojoList[i - 1].oilinfoName,
        oilinfoSpec = pojoList[i - 1].oilinfoSpec;

      //"&quot;" 这是HTML语言中的表示引号（"）的字符实体。
      var oilInfoparam = "&quot;" + oilinfoId + "&quot;,&quot;" + zhuanshu + "&quot;,&quot;" + oilinfoName + "&quot;,&quot;" + oilinfoSpec + "&quot;";
      var beizhu = pojoList[i - 1].remark;

      if (cusState == "1") {//激活用户（挂牌价、专属价）

        htmlstr += "<div class='item-wrapper'>" + "<div class='ub ub-ver ub-ac item-content' onclick='showToast(" + oilInfoparam + ");'>" + "<div id='name' class='ub ub-pc t-section mf-color2'>" + viewpage;

      }
      $("#oilDataList").css("opacity", "0");
      $("#oilDataList").append(htmlstr);
      $("#oilDataList").animate({
        opacity: 1
      }, 500);
    }


    function showToast(oilinfoId, oilPrice, oilinfoName, oilinfoSpec) {
      // dosomthing...
    }
```
