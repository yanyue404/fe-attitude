        // 模板引擎补充
        template.defaults.imports.Balance = function(number) {
          return number.toFixed(2);
      }
      // 当所有组件准备好后执行内部回调方法
      appcan.ready(function() {

          uexWindow.setWindowScrollbarVisible('false');

          appcan.frame.setBounce(1, function(type) {
              $("#pullstatus").html("");
          }, function(type) {
              $("#pullstatus").html("");
          }, function(type) {
              $("#pullstatus").html("松手了,产生事件了,开始更新数据！");
              // 下拉事件发生
              appcan.frame.resetBounce(1);
              var num = Number(pageNo) * limit;

              $("#pullstatus").html("");
              // alert("totalRows=" + totalRows)

              if (Number(totalRows) <= num) {
                  appcan.window.openToast({
                      msg : '没有更多',
                      duration : 1000,
                      position : 5,
                      type : 0
                  });
                  return;
              }

              pageNo = Number(pageNo) + 1;
              Orders.addData();
          });
          Orders.init();

      });
      var Orders = {
          init : function() {
              this.queryCusBasOrg();
              this.options().bind();
          },
          options : function() {
              var yue = this,
                  options = {};
              yue.options.companyList = document.getElementById('companyList');
              yue.options.bills_list = document.getElementById("bills_list");
              yue.options.tishi = document.getElementById('tishi');
              return yue;
          },
          bind : function() {
              var yue = this;
              this.options.companyList.onchange = function() {
                  yue.changeCompany();
              }
          },

          // 获取公司列表
          queryCusBasOrg : function() {
              var yue = this;
              var func = yue.showCompanyCallback.bind(yue);

              ajaxPostQuery(URL + "/app/cus/queryCusBasOrg", "", func, "text");

          },
          // 回调
          showCompanyCallback : function(data) {
              var yue = this;
              var tishi = yue.options.tishi;
              var companyList = yue.options.companyList;

              if ( typeof data == "string") {
                  data = JSON.parse(data);
              };

              var html = template('Company_tmpl', {
                  list : data
              });

              $('#companyList').html(html);
              tishi.style.height = "5em"

              var linkId = companyList.value;

              Orders.queryBills(linkId);
          },
          // 获取订单数据
          queryBills : function(linkId) {
              var yue = this;
              var paramJsonStr = "&pager.pageNo=" + pageNo + "&pager.pageSize=" + pageSize + "&cusOrgLinkid=" + linkId;
              var func = yue.showBillsCallback.bind(yue);
              ajaxPostQuery(URL + "/app/cus/queryCusPayMoney", paramJsonStr, func, "text");
              appcan.window.openToast('正在加载...', '0', '5', '1');

          },
          // 获取订单数据回调
          showBillsCallback : function(data) {
              var yue = this;
              var tishi = yue.options.tishi;
              var bills_list = yue.options.bills_list;

              appcan.window.closeToast();

              if ( typeof data == "string") {
                  data = JSON.parse(data)
              };
              totalRows = data["pager.totalRows"];
              // alert(totalRows)

              var html = '';
              if (data === 0) {
                  html = "<div id='' class='ub ub-pc pc time-wrapper''>" + "<span class='mf-size2 time'>暂无历史账单</span>" + "</div>";
                  tishi.innerHTML = html;
              } else {
                  html = template('bills_tmpl', {
                      list : data.rows
                  });
                  bills_list.innerHTML = html;
                  tishi.innerHTML = "";
              }

          },
          // 下拉刷新添加数据
          addData : function() {
              var yue = this;
              var linkId = yue.options.companyList.value;
              var paramJsonStr = "&pager.pageNo=" + pageNo + "&pager.pageSize=" + pageSize + "&cusOrgLinkid=" + linkId;

              ajaxPostQuery(URL + "/app/cus/queryCusPayMoney", paramJsonStr, yue.addDataCallback, "text");
              appcan.window.openToast('正在加载...', '0', '5', '1');
          },
          // 下拉刷新添加数据回调
          addDataCallback : function(data) {
              var yue = this;
              var tishi = yue.options.tishi;
              appcan.window.closeToast();

              if ( typeof data == "string") {
                  data = JSON.parse(data)
              };
              totalRows = data["pager.totalRows"];
              // alert(totalRows)

              var html = '';
              if (data === 0) {
                  html = "<div id='' class='ub ub-pc pc time-wrapper''>" + "<span class='mf-size2 time'>暂无历史账单</span>" + "</div>";
                  tishi.innerHTML = html;
              } else {
                  html = template('bills_tmpl', {
                      list : data.rows
                  });

                  $('#bills_list').append(html);
                  tishi.innerHTML = '';
              }
          },
          // 城市名称改变
          changeCompany : function() {
              var yue = this;
              yue.options.bills_list.innerHTML = "";
              var linkId = yue.options.companyList.value;
              pageNo = 1;
              yue.queryBills(linkId)
          },
          // 打开详情页
          openDetail : function(id) {
              appcan.locStorage.setVal('FUNDSUB_ID', id);
              appcan.window.open("detail", 'order_detail.html', 10);
          }
      }