  // 模板引擎补充
  template.defaults.imports.Balance = function (number) {
    return number.toFixed(2);
  }
  
  // 当所有组件准备好后执行内部回调方法
  appcan.ready(function () {

    uexWindow.setWindowScrollbarVisible('false');

    appcan.frame.setBounce(1, function (type) {
      $("#pullstatus").html("");
    }, function (type) {
      $("#pullstatus").html("");
    }, function (type) {
      $("#pullstatus").html("松手了,产生事件了,开始更新数据！");
      // 下拉事件发生
      appcan.frame.resetBounce(1);
      var num = Number(pageNo) * limit;

      $("#pullstatus" + type).html("");
      // alert("totalRows=" + totalRows)

      if (Number(totalRows) <= num) {
        appcan.window.openToast({
          msg: '没有更多',
          duration: 1000,
          position: 5,
          type: 0
        });
        return;
      }

      pageNo = Number(pageNo) + 1;
      addData();
    });
    queryCusBasOrg();

  });
  // 城市名称改变
  function changeCompany() {

    $('#bills_list').html = '';
    var linkId = $('#companyList')[0].value;
    pageNo = 1;
    queryBills(linkId)
  }

  //  获取公司列表
  function queryCusBasOrg() {
    var url = URL + "/app/cus/queryCusBasOrg";

    var paramJsonStr = "";
    var func = showCompanyCallback;
    var dataType = "text";
    ajaxPostQuery(url, paramJsonStr, func, dataType);
    appcan.window.openToast('正在加载...', '0', '5', '1');

  }

  // 获取公司列表回调
  function showCompanyCallback(data) {

    appcan.window.closeToast();

    if (typeof data == "string") {
      data = JSON.parse(data);
    };

    var html = template('Company_tmpl', {
      list: data
    });

    $('#companyList').html(html);
    document.querySelector("#tishi").style.height = "5em"

    var linkId = $('#companyList')[0].value;

    queryBills(linkId);
  }

  // 获取订单数据
  function queryBills(linkId) {

    var url = URL + "/app/cus/queryCusPayMoney";
    var paramJsonStr = "&pager.pageNo=" + pageNo + "&pager.pageSize=" + pageSize + "&cusOrgLinkid=" + linkId;

    var func = showBillsCallback;
    var dataType = "text";
    ajaxPostQuery(url, paramJsonStr, func, dataType);
    appcan.window.openToast('正在加载...', '0', '5', '1');

  }

  // 获取订单数据回调
  function showBillsCallback(data) {

    appcan.window.closeToast();

    if (typeof data == "string") {
      data = JSON.parse(data)
    };
    totalRows = data["pager.totalRows"];
    // alert(totalRows)

    var html = '';
    if (data === 0) {
      html = "<div id='' class='ub ub-pc pc time-wrapper''>" + "<span class='mf-size2 time'>暂无历史账单</span>" + "</div>";
      $('#tishi').html(html);
    } else {
      html = template('bills_tmpl', {
        list: data.rows
      });
      $('#bills_list').html(html);
      document.getElementById('tishi').innerHTML = '';
    }

    // document.querySelector(".list-content:last-child").style.margin = "0  0 6em"

  }

  // 下拉刷新添加数据
  function addData() {
    var linkId = $('#companyList')[0].value;
    var url = URL + "/app/cus/queryCusPayMoney";
    var paramJsonStr = "&pager.pageNo=" + pageNo + "&pager.pageSize=" + pageSize + "&cusOrgLinkid=" + linkId;

    var func = addDataCallback;
    var dataType = "text";
    ajaxPostQuery(url, paramJsonStr, func, dataType);
    appcan.window.openToast('正在加载...', '0', '5', '1');
  }

  // 下拉刷新添加数据回调
  function addDataCallback(data) {
    appcan.window.closeToast();

    if (typeof data == "string") {
      data = JSON.parse(data)
    };
    totalRows = data["pager.totalRows"];
    // alert(totalRows)

    var html = '';
    if (data === 0) {
      html = "<div id='' class='ub ub-pc pc time-wrapper''>" + "<span class='mf-size2 time'>暂无历史账单</span>" + "</div>";
      $('#tishi').html(html);
    } else {
      html = template('bills_tmpl', {
        list: data.rows
      });

      $('#bills_list').append(html);
      document.getElementById('tishi').innerHTML = '';
    }
  }

  // 打开详情页
  function openDetail(id) {
    appcan.locStorage.setVal('FUNDSUB_ID', id);
    appcan.window.open("detail", 'order_detail.html', 10);
  }