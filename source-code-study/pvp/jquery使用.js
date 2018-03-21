
document.domain = 'qq.com';
jQuery(function($) {

    var $picIframe = $(top.document.body).find("#picPlayIframe")
    var picId = $picIframe.attr("data-id");
    var order = $picIframe.attr("data-order");

    var total = $picIframe.attr("data-total");
    var flag = $picIframe.attr("data-flag");

    var coralDoc = '';

    if($(top.document.getElementById('commentIframe1')).length){

         coralDoc = top.document.getElementById('commentIframe1').contentWindow.document;

    }else if($(top.document.getElementById('commentIframe')).length){

         coralDoc = top.document.getElementById('commentIframe').contentWindow.document;

    }else{
         coralDoc = top.document;
    }

    var clickFlag = 1;
    var $picList;
    if (flag=='relation') {
        coralDoc = top.document.getElementById('np-pop-iframe').contentWindow.document;

    }
    $picList = $(coralDoc).find('#' + picId).clone();
        var winH = $(top.window.document).height();

        var windocumentH = $(top.window).height();

        var winW = $(top.window).width();


    $picIframe.height(winH);


    var $imgListHtml = $('.picPlayTable');//浜嬩欢缁戝畾瀵硅薄

    function init(){

        // ie6,ie7涓嶆敮鎸� position:fixed
        // if( /MSIE 6/.test(navigator.appVersion) || /MSIE 7/.test(navigator.appVersion) ){
        if( /MSIE 6/.test(navigator.appVersion) ){

            $('.picPlayBoxBg').height(winH)

            $picIframe.css('top',$(top.window).scrollTop())

            //ie6
            $(top.window).scroll(function(event) {
               $picIframe.css('top',$(top.window).scrollTop())
            });
        }

        var imgH = 0;
        var imgW = 0;
        var picPageFlag = 'none';
        var picCurrent = 0;
        var picTotal = 0;
        $('#picPlayBox').height(windocumentH);
        $('#picPageNun i').html(parseInt(order)+1)
        $('#picPageNun span').html(total)

        if(total>1){
            // if(order==0){
            //     classTypePrve ='none'
            //     $('.picPrve').hide();
            // }
            // if(order==total-1){
            //     classTypeNext ='none'
            //     $('.picNext').hide();
            // }
            // //鍥剧墖涓婁笅缈讳互鍚庡姞
            // //btnHtml = '<div class="picPrve picIconBg '+ classTypePrve +'"><span></span></div>'+'<div class="picNext picIconBg '+ classTypeNext +'"><span></span></div>'
            // $('.picPrve,.picNext').show()
        }
        else{
            $('.picPrve,.picNext').hide()
        }


        $picData = $picList
        $.each($picData.find('img'), function(index, val) {

            var picH = $(this).attr('data-height');
            var picW = $(this).attr('data-width');

            /*if( picW > winW*0.8){//瀹藉害澶т簬绐楀彛瀹藉害鐨�0.8鏃讹紝璁剧疆picW瀹藉害涓虹獥鍙�0.8锛宲icH璺熼殢picW绛夋瘮缂╂斁
                picH = picH*winW*0.8/picW; //鍏堢畻楂�
                picW = winW*0.8;
            }

            if (picH > winH - 50 ) {
                imgH = winH - 50 ;
            } else {
                imgH = picH
            }*/
            if($(this).attr('src') == '//mat1.gtimg.com/v/coral_yp_square/img/img-150-150.png' || $(this).attr('src') == '//mat1.gtimg.com/v/coral_yp_square/img/video-222-149.png'){
              $(this).attr('src',$(this).attr('data-src')); //鍏ュ彛椤甸粯璁ゅ浘
            }
            var imgSrc = $(this).attr('src');
            imgSrc = imgSrc.match('p.qpic.cn/vshpic')? imgSrc.replace('/300','/0'):imgSrc.replace(/\/[\d]+$/, '/0');//濡傛灉涓嶆槸鑵捐瑙嗛app渚х殑鍥剧墖锛岄摼鎺ュ湴鍧€鍚庨潰鍔�0锛屽惁鍒欏姞612
            $(this).attr('src',imgSrc);
            $(this).removeAttr('width');
            $(this).removeAttr('height');

            $(this).css({'max-width':'1000px','max-height':($(top.window).height()*0.9),'_width':'612px','overflow':'hidden'});
            $(this).parent().attr({
                'href': $(this).attr('src').replace(/\/[\d]+$/, '/0'),
                'target': '_blank'
            })

            if (order != $(this).attr('data-order')) {
                $(this).hide();
            }
        });

        $('.list_w100').html($picList.html())

    }
    init();




    //浜嬩欢缁戝畾
    $imgListHtml.delegate('.picIconBg', 'hover', function(event) {
        $(this).toggleClass("phover");

    })

    $('body').delegate('#picPlayBoxClose', 'click', function() {

        $(top.document.body).find("#picPlayIframe").remove();

    })

    $('body').delegate('.picPlayTable', 'click', function() {

        $(top.document.body).find("#picPlayIframe").remove();

    })
    $('.list_w100 a').click(function(event) {
        /* Act on the event */
        event.stopPropagation(); // 闃绘鍐掓场
    });

    // 鑾峰彇鐒︾偣锛屾敮鎸侀敭鐩樹簨浠�
    $(window).focus();
    // 閿洏浜嬩欢锛屽乏銆佸彸閿垏鎹㈠浘鐗�
    $(window,top.window).keydown(function(event) {
        event.stopPropagation(); // 闃绘鍐掓场
        switch(event.keyCode){
            //case 13 : ;
            //case 40 :
            case 39 :$('.picNext').click()
                    break;

            //case 37:
            case 37: $('.picPrve').click()
                    break;
            case 27:$('#picPlayBoxClose').click();
        }
    });

    var $listBox = $('.picPlayTable .list_w100');
    var $listBoxLi = $listBox.find('img');
    var picLength = $listBoxLi.length;
     var i =0;

    for (var j=0;j<$listBox.find('img').length;j++){
        if($listBoxLi.eq(j).css('display')=='inline-block')
        {
            i = j;break;
        }
    }
    //document.getElementById('picPlayIframe').style.'top'=0;
    $('.picIconBg').click(function(event) {

        event.stopPropagation(); // 闃绘鍐掓场
        //$listBox = $(this).closest('.picPlayTable').find('.list_w100');

       // var i = $listBox.find('img:visible').index();

        //$(this).parent().find('.picIconBg').show();


        if(clickFlag == 1){

            clickFlag = 0;

            if (/picPrve/.test($(this).attr('class'))) { //涓婁竴涓�

                if (i == 0) {
                    $listBoxLi.hide()//fadeOut(400)
                    $listBoxLi.eq(picLength - 1).fadeIn(200,function(){clickFlag = 1});
                    $('#picPageNun i').html(picLength)
					i = picLength - 1;	
                }else
                if (i > 0) {
                    $listBoxLi.hide()
                    $listBoxLi.eq(i - 1).fadeIn(200,function(){clickFlag = 1});
					i-=1;	
                }
                
                $('#picPageNun i').html(parseInt(i)+1)
            } else { //涓嬩竴涓�

                if (i == $listBox.find('img').length - 2) {
                    // $(this).hide()
                }
                if (i >= $listBox.find('img').length - 1) {
                    // $(this).hide()
                    $listBoxLi.hide()//.fadeOut(400);
                    $listBoxLi.eq(0).fadeIn(200,function(){clickFlag = 1});
                    $('#picPageNun i').html(1);
                    i=0;
                    return;
                }
                if (i < picLength - 1) {
                    $listBoxLi.hide()//.fadeOut(400);
                    $listBoxLi.eq(i + 1).fadeIn(200,function(){clickFlag = 1});
                }

                $('#picPageNun i').html(parseInt(i)+2);
                 i+=1;


            }

        }






       // $('#picPageNun span').html(total)
    });

})
/*  |xGv00|1bcb93d8a64ae8efb674e7d0163b4ce1 */