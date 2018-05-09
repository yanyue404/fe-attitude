/**
 * Created by admin on 2017-4-4.
 */
$(function () {
    var cityBox = document.getElementById("cityBox");
    var cityList = document.getElementById("cityList");
    var city = cityBox.children[0];

    //省会列表
    cityBox.onmouseenter = function () {
        show(cityList);
        city.style.color = "#f10180";
        city.style.backgroundColor = "#fff";
        city.style.width = (city.offsetWidth-2)+"px";
        city.style.borderLeft = "1px solid #ccc";
        city.style.borderRight = "1px solid #ccc";
        city.children[0].innerHTML = "▲";
        var spanArr = cityList.getElementsByTagName("span");
        for(var i = 0;i < spanArr.length;i++){
            spanArr[i].colorBox = "";
            spanArr[i].onmouseenter = function () {
                this.colorBox = this.style.backgroundColor
                this.style.backgroundColor = "#f10180";
                this.style.color = "#fff";
            }
            spanArr[i].onmouseleave = function () {
                this.style.backgroundColor = this.colorBox;
                this.style.color = "#676767";
            }
            spanArr[i].onclick = function () {
                city.innerHTML = this.innerHTML+"&nbsp;"+"<i>▼</i>";
                hide(cityList);
            }
        }
    }
    cityBox.onmouseleave = function () {
        hide(cityList);
        city.style.color = "#676767";
        city.style.backgroundColor = "#f5f5f5";
        city.style.border = "0";
        city.style.width = (city.offsetWidth+2)+"px";
        city.children[0].innerHTML = "▼";
    }
    
    //最顶部导航栏
    var navUl = document.getElementById("navUl");
    var navUlliArr = navUl.getElementsByTagName("li");
    var userInfo = document.getElementById("userInfo");
    navUlliArr[0].onmouseenter = function () {
        this.style.backgroundColor = "#fff";
        show(userInfo);
        var userInFolist = document.getElementById("userInFolist");
        var spanArr = userInFolist.getElementsByTagName("span");
        var aArr = userInFolist.getElementsByTagName("a");
        for(var i = 0;i < aArr.length;i++){
            animate(spanArr[i],{paddingLeft:0,paddingRight:40});
            aArr[i].index = i;
            aArr[i].onmouseenter = function () {
                animate(spanArr[this.index],{paddingLeft:10,paddingRight:30});
            }
            aArr[i].onmouseleave = function () {
                animate(spanArr[this.index],{paddingLeft:0,paddingRight:40});
            }
        }
    }
    navUlliArr[0].onmouseleave = function () {
        this.style.backgroundColor = "#f5f5f5";
        hide(userInfo);
        var userInFolist = document.getElementById("userInFolist");
        var spanArr = userInFolist.getElementsByTagName("span");
        for (var i = 0; i < spanArr.length; i++) {
            animate(spanArr[i],{paddingLeft: 40, paddingRight: 0});
        }
    }
    var shouChang = document.getElementById("shouChang");
    navUlliArr[3].onmouseenter = function () {
        this.style.backgroundColor = "#fff";
        show(shouChang);
    }
    navUlliArr[3].onmouseleave = function () {
        this.style.backgroundColor = "#f5f5f5";
        hide(shouChang);
    }
    var vipClubNav = document.getElementById("vipClubNav");
    navUlliArr[4].onmouseenter = function () {
        this.style.backgroundColor = "#fff";
        show(vipClubNav);
    }
    navUlliArr[4].onmouseleave = function () {
        this.style.backgroundColor = "#f5f5f5";
        hide(vipClubNav);
    }
    var servceNav = document.getElementById("servceNav");
    navUlliArr[5].onmouseenter = function () {
        this.style.backgroundColor = "#fff";
        show(servceNav);
    }
    navUlliArr[5].onmouseleave = function () {
        this.style.backgroundColor = "#f5f5f5";
        hide(servceNav);
    }

    var phoneNav = document.getElementById("phoneNav");
    navUlliArr[6].onmouseenter = function () {
        this.style.backgroundColor = "#fff";
        show(phoneNav);
    }
    navUlliArr[6].onmouseleave = function () {
        this.style.backgroundColor = "#f5f5f5";
        hide(phoneNav);
    }
    var moreList = document.getElementById("moreList");
    var navUlLiMore = document.getElementById("navUlLiMore");
    var sanjiao = navUlLiMore.getElementsByTagName("i")[0];
    navUlliArr[7].onmouseenter = function () {
        this.style.backgroundColor = "#fff";
        show(moreList);
        sanjiao.innerHTML = "△";
    }
    navUlliArr[7].onmouseleave = function () {
        this.style.backgroundColor = "#f5f5f5";
        hide(moreList);
        sanjiao.innerHTML = "▽";
    }

    //中间购物袋
    var Bag = document.getElementById("Bag");
    var myBag = document.getElementById("myBag");
    var bagList = document.getElementById("bagList");
    var iii = myBag.getElementsByTagName("i")[0];
    var myBagSpan = myBag.getElementsByTagName("span")[0];
    Bag.onmouseenter = function () {
        myBag.style.width = "109px";
        myBag.style.border = "1px solid #ccc";
        iii.style.left = "-1px";
        iii.style.top = "-1px";
        myBagSpan.style.marginLeft = "-1px";
        myBagSpan.style.marginTop = "-1px";
        show(bagList);
    }
    Bag.onmouseleave = function () {
        myBag.style.width = "111px";
        myBag.style.border = "0";
        iii.style.left = "0px";
        iii.style.top = "0px";
        myBagSpan.style.marginLeft = "0px";
        myBagSpan.style.marginTop = "0px";
        hide(bagList);
    }

    //主导航栏效果
    var headTop = document.getElementById("headTop");
    var headCon = document.getElementById("headCon");
    var headNav = document.getElementById("headNav");
    window.onscroll = function () {
        if(scroll().top >= headTop.clientHeight+headCon.clientHeight){
            headNav.className = "nav fixed";
            animate(headNav,{top:0});
        }else{
            headNav.className = "nav";
            animate(headNav,{top:-40});
        }
    }

    var morePic = document.getElementById("morePic");

    //主导航内更多菜单显示图片
    morePic.onmouseenter = function () {
        $(morePic.getElementsByClassName("second-ul-more-pic")[0]).stop(true,true);
        $(morePic.getElementsByClassName("second-ul-more-pic")[0]).slideDown("fast");
        var divArr = morePic.getElementsByClassName("more-pic");
        for(var i = 0;i < divArr.length;i++){
            divArr.index = i;
            //移入图片
            divArr[i].onmouseenter = function () {
                var iShow = this.getElementsByTagName("i")[0];
                var pShow = this.getElementsByTagName("p")[0];
                animate(iShow,{top:0});
                animate(pShow,{bottom:45});
            }
            divArr[i].onmouseleave = function () {
                var iShow = this.getElementsByTagName("i")[0];
                var pShow = this.getElementsByTagName("p")[0];
                animate(iShow,{top:38});
                animate(pShow,{bottom:10});
            }
        }
    };
    morePic.onmouseleave = function () {
        $(morePic.getElementsByClassName("second-ul-more-pic")[0]).stop(true,true);
        $(morePic.getElementsByClassName("second-ul-more-pic")[0]).slideUp("fast");
    };

    //右侧边栏效果
    $("#zymSideBar").animate({"right":"0"},"slow");
    $("#sidebarCharge").mouseenter(function () {
        $("#sidebarChargeLogin").stop(true,true);
        $("#sidebarChargeLogin").fadeIn(500);
        $("#vipClubClose").click(function () {
            $("#sidebarCharge").mouseleave();
        })
    });
    $("#sidebarCharge").mouseleave(function () {
        $("#sidebarChargeLogin").fadeOut(500);
    });

    $("#shopBag").click(function () {
        $("#shopBagIn").stop(true,true);
        $("#shopBagIn").fadeIn("fast");
    });
    $("#shopBag").mouseleave(function () {
        $("#shopBagIn").stop(true,true);
        $("#shopBagIn").fadeOut("fast");
    });
    $("#shopBagIn span").click(function (e) {
        e = e || window.event;
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
        $("#shopBag").mouseleave();
    });

    //四个小图标
    var $smallILists = $("#smallList i");
    var $smallPLists = $("#smallList p");
    for(var i = 0;i < $smallILists.length;i++){
        $smallILists[i].index = i;
        $smallILists[i].onmouseenter = function () {
            $($smallPLists[this.index]).stop(true,true);
            $($smallPLists[this.index]).animate({right:36},"fast");
        }
        $smallILists[i].onmouseleave = function () {
            $($smallPLists[this.index]).stop(true,true);
            $($smallPLists[this.index]).animate({right:-70},"fast");
        }
    }
    $("#vipTick").mouseenter(function () {
        $("#vipTick p").stop(true,true);
        $("#vipTick p").animate({right:36},"fast");
    });
    $("#vipTick").mouseleave(function () {
        $("#vipTick p").stop(true,true);
        $("#vipTick p").animate({right:-70},"fast");
    });
    $("#backTop").mouseenter(function () {
        $("#backTop p").stop(true,true);
        $("#backTop p").animate({right:36},"fast");
    });
    $("#backTop").mouseleave(function () {
        $("#backTop p").stop(true,true);
        $("#backTop p").animate({right:-70},"fast");
    });

    //返回顶部
    $("#backTop p").click(function () {
        var target = 0;
        var leader = scroll().top;
        var timer = null;
        timer = setInterval(function () {
            var step = (target - leader)/10;
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader + step;
            window.scrollTo(0,leader);
            if(leader === target){
                clearInterval(timer);
            }
        },10);
    });


});