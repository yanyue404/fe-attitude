var URL = "http://www.gouyb.com";
var PICURL = "http://www.gouyb.com";


//var URL = "http://127.0.0.1:9080/BJXSKH";
//var PICURL = "http://127.0.0.1:9080";

//var URL = "http://10.191.5.155:9080/BJXSKH";
//var PICURL = "http://10.191.5.155:9080";


//var URL = "http://10.191.5.151:8080/BJXSKH";
//var URL = "http://app.bgp.cnpc.com.cn/BJXSKH";
//var URL = "http://10.191.5.156:9080/BJXSKH";
//var URL = "http://10.191.5.159:8080/BJXSKH";
//var URL = "http://www.gouyb.com/";

//var URL = "http://11.10.142.71:8880/BJXS";
var offset="1";//从第几条开始   
   var limit="15";//每页显示行数
var pageNo = "1";//页数


function ajaxPostQuery(url,paramJsonStr,func,dataType){
    var dataType = dataType||"json";
    var url = url || queryUrl;
    var sid=appcan.locStorage.getVal("sid");
    $.ajax({ 
        type: "POST",
        url: url,
        data: paramJsonStr+"&sid="+sid,  
        headers:{accept:"*/*"},
        //contentType:"application/x-www-form-urlencoded",
        dataType:dataType,
        timeout:0,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            appcan.window.alert("提示","网络暂时不可用","确定");
        }, 
        success: function (data){ 
            var errorData;
            if (typeof data == "string") {
                try{
                    errorData = eval("(" + data + ")");
                    
                    if(errorData.error=="-1"){
                        //alert(url);
                        relogin(url);
                    }else{
                        func(data);
                    }
                }catch(e){
                    func(data);
                }
            }
        }  
    });
}

function relogin(url2){
    var userName = appcan.locStorage.getVal("username");
    var password = appcan.locStorage.getVal("password");
    
    if((userName==null || userName =="") && (password==null || password =="")){
        //alert(userName);
       appcan.window.open("login", "../userpage/login.html", 5);
      
        //return;
    }else{
        $.ajax({
            type : "POST", //用POST方式传输
            dataType : "text",
            headers : {
                accept : "*/*"
            },
            url : URL + '/comm/user/login',
            data : "loginName=" + userName + "&loginPassword=" + password,
            error : function(XMLHttpRequest, textStatus, errorThrown) {
            },
            success : function(data) {
                if ( typeof data == "string") {
                    data = eval("(" + data + ")");
                }
                var sid = data.sid;
                var cusId = data.cusId;
                if (data.result == 0) {
                    appcan.locStorage.setVal("username", userName);
                    appcan.locStorage.setVal("password", password);
                    appcan.locStorage.setVal("sid", sid);
                    appcan.locStorage.setVal("cusId", cusId);
                    ajaxPostQuery(url2,paramJsonStr,func,dataType);
                } else {
                    appcan.window.open("login", "../userpage/login.html", 5);
                }
            }
        })
    }
}

Date.prototype.formate = function(format){
    var o = {
        "M+" :this.getMonth() + 1, // month
        "d+" :this.getDate(), // day
        "h+" :this.getHours(), // hour
        "m+" :this.getMinutes(), // minute
        "s+" :this.getSeconds(), // second
        "q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
        "S" :this.getMilliseconds()
    // millisecond
    }
 
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
                .substr(4 - RegExp.$1.length));
    }
 
    for ( var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}


function openPopPage(pageName){
    var s = window.getComputedStyle($('#page_0')[0], null);
    //var w = parseInt(s.width);
    //var h = parseInt(s.height);
    appcan.frame.open(pageName, "../common_page/"+pageName+".html", 0);
}
