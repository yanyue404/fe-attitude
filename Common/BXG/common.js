// 多个页面共用的js代码

//页面加载后,开关进度条
define(['cookie','jquery','nprogress'],function(x,$,Nprogress){
  //显示进度条

 //ajax全局进度条
 $(document).ajaxStart(function(){
  Nprogress.start();
 })
 $(document).ajaxStop(function(){
   Nprogress.done();
 })

//  检测用户登录状态,如果没有登录,则跳转到登录页面
//  var sessionID = $.cookie("PHPSESSID");
//  if(!sessionID) {
//    window.location.href = "/views/index/login.html";
//    return;
//  }

//  获取cookie中的用户头像和名字
 var cookieObj = JSON.parse($.cookie('userinfo') || '{}');
//  console.log(cookieObj);
  $('.profile img').attr('src', cookieObj.tc_avatar)
  $('.profile h4').text(cookieObj.tc_name)

 //导航栏状态显示收起
 $('.navs > ul >li a').on('click',function(){
   $(this).next('ul').slideToggle();
 })

 //退出登录
 $('.header .fa-sign-out').closest('a').on('click',function(){
   var options = {
     url:'/api/logout',
     type:'post',
     success:function(data){
       if(data.code == 200) {
         window.location.href ='/views/index/login.html'
       }
     }
   }
   $.ajax(options);
   //结束进度条
   Nprogress.done();
 })

 //获取地址栏参数
 function getArg(){
   var query = window.location.search;
   var arrTemp = query.split('?');
   var str = '';
   str = arrTemp[1];
   var arrQuery = str.split('&');
   var obj = {};

   for(var i = 0;i< arrQuery.length;i++){
     var item = arrQuery[i];
     var tmp = item.split('=');
     obj[tmp[0]] = tmp[1];
   }
     return obj;
 }


})