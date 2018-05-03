//SET UP BEHAVIOR
var isiPad  = navigator.userAgent.match(/iPad/i) != null;
var isiPhone = navigator.userAgent.match(/iPhone/i) != null;
var isiPod = navigator.userAgent.match(/iPod/i) != null;
var isAndroid = navigator.userAgent.match(/Android/i) != null;

//GLOBAL
var HONOR = window.HONOR || {};

//定义照片流
var photo_wall_pic, photo_wall_url,cate;

(function($) {
    HONOR.Global = {
        init: function() { //initialization code goes here
            $.support.cors = true;
            this.initFormElements();
            $('#nav-pro').on({
                mouseenter: function () {
                    $('#J_navMenu').stop(!0, !1).slideDown(200, function () {
                        //$('#nav-pro a').addClass("active")
                    })
                },
                mouseleave :function () {
                    $('#J_navMenu').stop(!0, !1).slideUp(200);
                    //$('#nav-pro a').removeClass("active")
                }
            });
            $('#J_navMenu').on({
                mouseenter: function () {
                    $('#J_navMenu').stop(!0, !1).slideDown(200, function () {
                        //$('#nav-pro a').addClass("active")
                    })
                },
                mouseleave :function () {
                    $('#J_navMenu').stop(!0, !1).slideUp(200);
                    //$('#nav-pro a').removeClass("active")
                }
            });

            $('#wapEnter').on({
                mouseenter: function () {
                    $('#wechat-wap').show();
                },
                mouseleave :function () {
                    $('#wechat-wap').hide()
                }
            });
            $('#share-wechat').on({
                mouseenter: function () {
                    $('#wechat').show();
                },
                mouseleave :function () {
                    $('#wechat').hide()
                }
            });
            $('#share-tribal').on({
                mouseenter: function () {
                    $('#qq-tribal-code').show();
                },
                mouseleave :function () {
                    $('#qq-tribal-code').hide()
                }
            });
            if($(".page-video").length){
                $(".page-video .kv-video").on({
                    mouseenter: function () {
                        $(this).find('.icon-play').show();
                    },
                    mouseleave :function () {
                        $(this).find('.icon-play').hide();
                    }
                }); 
            }
            if($('.video-play-btn').length) {
                this.initVideoBox();
                this.initVideoButton();
            }
            if($('.buy-button').length) {
                this.buyButton();
            }
            if($('.article-button').length) {
                this.articleButton();
            }
            $('.dropdown-toggle').dropdown();

            //全站首页
            if($('.home-container').length) {
                this.initFixedNav();
                this.initKvSwiper();
                this.page_home();
            }

            //产品首页
            if($('.page-products').length) {
                this.initFixedNav();
                this.initKvSwiper();
                this.page_product();
                this.page_products();
                this.initProductSliders();
            }
            //产品搜索页
            if( $('.page-pro-search').length ){
                this.initFixedNav();
                this.page_proSearch();
            }
            //产品详情页
            if($('.page-product').length) {
            	if(!$('.page-product-video').length){
            		$("html,body").animate({scrollTop:500},0)
            	}
            	
                this.initKvSwiper();
                this.page_product();
                this.initProductSliders();
                //产品内部导航
                $('.product-header').affix({
                    offset: {
                        top: $('.product-header').offset().top+5
                    }
                });
                
//              if($('.page-product-detail').length) {
//                  $("html,body").animate({scrollTop:$('.product-header').offset().top},0)
//              }
            }
            //关于荣耀
            if($('.page-brand').length) {
                this.initFixedNav();
                this.initBrandPage();
                this.initMilestoneDialog();
            }
            if($('.page-brand-people').length) {
                this.initFixedNav();
            }
            if($('.page-brand-news').length) {
                this.initFixedNav();
            }
            //新闻页面
            if($('.page-news').length) {
                this.initFixedNav();
                this.page_news();
            }
            //视频页面
            if($('.page-video').length) {
                this.initFixedNav();
                this.page_video();
            }
            //对比
            if($('.page-campare').length){
                this.initFixedNav();
                this.page_campare()
            }
            //活动页面
            if($('.page-activity').length) {
                this.initFixedNav();
                this.initKvSwiper();
                this.page_activity();
            }
            if($('.page-support').length) {
                this.initFixedNav();
            }
			if($('.page-sharedetail').length) {
                this.initFixedNav();
            }
            if($('.photo-wall').length) {
                this.photoWall();
                // this.photo_wookmark();
            }
            //个人中心
            if($('.page-profile').length){
                this.initFixedNav();
            }
			//产品详情页
			if($('.honorPro').length) {
                this.initStickyNav();
                this.honorPro();
            }

            if($('.page-common').length){
                this.initFixedNav();
            }
            //猫活动
            if($('.page-honor9-cat').length) {
                this.initFixedNav();
            }

        },

        initFormElements: function() {
            $('input, textarea').placeholder(); //enable placeholder support for all browsers

            //Radio Wrapper
            $(".radio-wrapper .input-radio").each(function() {
                if ($(this).is(":checked")) {
                    $('.input-radio[name="' + $(this).attr('name') + '"]').parents(".radio-selected").removeClass("radio-selected");
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            $(document).on('change', ".radio-wrapper .input-radio", function() {

                $('input[name="' + $(this).attr('name') + '"]').each(function() {
                    if ($(this).not(':checked')) {
                        $(this).parent().removeClass("radio-selected");
                    }
                });

                if ($(this).is(":checked")) {
                    $(this).parents('.radio-wrapper').addClass("radio-selected");
                }
            });

            //Checkbox Wrapper
            $('.checkbox-wrapper .input-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked')
                }
            });

            $(document).on('click', '.checkbox-wrapper .input-checkbox', function() {

                if ($(this).is(':checked')) {
                    $(this).parents('.checkbox-wrapper').addClass('checked');
                } else if ($(this).not(':checked')) {
                    $(this).parents('.checkbox-wrapper').removeClass('checked');
                }
            });

            //Select Wrapper
            $('.select-wrapper').each(function() {
                if ($(this).find('span').length <= 0) {
                    $(this).prepend('<span>' + $(this).find('select option:selected').text() + '</span>');
                }
            });

            $(document).on('change', '.select-wrapper select', function() {
                $(this).prev('span').replaceWith('<span>' + $(this).find('option:selected').text() + '</span>');
            });

            // 杩斿洖椤堕儴
            $("#gotoTop").click(function(){
                $("html,body").animate({scrollTop:0},700)
                _smq.push(['custom','homepage_downside_pc','BacktoTop']);
            });

            // 杞挱宸﹀彸绠ご閫忔槑搴�
            window.onload = function(){
                var s=$(window).scrollTop();
                var _t 
                if($('.site-footer').length){
                	_t = $('.site-footer').offset().top
                }
                if(s<=100 && $(window).height()>=(_t+360)){
                    console.log(111);
                    $(".floating-social-bar").show();
                    $(".floating-social-bar").css({'position':'absolute','bottom':'360px'});
                }
                else if(s>100){
                     $(".floating-social-bar").fadeIn(100);
                 }else{
                     $(".floating-social-bar").fadeOut(200);
                 }
                 if( $('.site-footer').length && s > (_t - $(window).height()) ){
                     $(".floating-social-bar").css({'position':'absolute','bottom':'360px'});
                 }else{
                     $(".floating-social-bar").css({'position':'fixed','bottom':'0'});
                 }
            }

            $(window).scroll(function(){
                var s=$(window).scrollTop();
                if(s<=100 && $(window).height()>=($('.site-footer').offset().top+360)){
                    $(".floating-social-bar").show(100);
                    $(".floating-social-bar").css({'position':'absolute','bottom':'360px'});
                }
                else if(s>100){
                     $(".floating-social-bar").fadeIn(100);
                 }else{
                     $(".floating-social-bar").fadeOut(200);
                 }
                 if( $('.site-footer').length && s > ($('.site-footer').offset().top - $(window).height())){
                     $(".floating-social-bar").css({'position':'absolute','bottom':'360px'});
                 }else{
                     $(".floating-social-bar").css({'position':'fixed','bottom':'0'});
                 }

            });
        },

        checkScreen: function() {
            if($('.visible-xs').css('display') == 'block') {
                return 'x-small';
            } else if($('.visible-sm').css('display') == 'block') {
                return 'small';
            } else if($('.visible-md').css('display') == 'block') {
                return 'medium';
            } else if($('.visible-lg').css('display') == 'block') {
                return 'large';
            }
        },

        initHandleResizeWebsite: function() {
            if ($(window).width() > 1000) {

            } else {
                var scaleRatio = ($(window).width() / 1000) - 0.15;

            }
        },

        initStorySlider: function() {
            $('.slider-story-block').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'horizontal'
            });
        },

        page_home: function() {
            //首页弹窗轮播
            $(".focus-img:first").fancybox({
            	'padding':10,
              	'afterLoad':function(){}
             });
             $(".focus-img:first").click();
            //$(".focus-img:first").click();
//          $(".fancybox-inner").css('cursor','pointer');
            $(".fancybox-inner").attr('title','');
            $(".fancybox-inner").on('click',function(){
                //$(".fancybox-close").click();
                //$(".video-play-btn").click();
                //_smq.push(['custom','homepage_pc','homepage_honorv9FastRightNow']);
                //window.open('http://www.honor.cn/products/mobile-phones/honorv9/','_blank');
             });
            $('.index-recommend').find('.btn-duibi').click(function () {
//              $(this).siblings('.duibi-sort').toggle();
				$(this).find('.duibi_list').toggle();
//				$(this).find('.duibi_list').css({'z-index':999})
            });
            $('.index-recommend .figure').on('mouseenter', function () {
//              $(this).siblings('.handle').find('.duibi-sort').hide();
                $(this).siblings('.handle').find('.duibi_list').hide();
            });
            $('.index-recommend').on('mouseleave', function () {
//              $(this).find('.duibi-sort').hide();
                $(this).find('.duibi_list').hide();
            });
            $('.duibi-sort span').click(function () {
                $(this).toggleClass('active')
            })
            
            $('.range-slider').jRange({
                from: 0, to: 3000, step:1,
                scale: ['￥0','￥500','￥1000','￥1500','￥2000','￥2500','￥3000+'],
                format: '%s',
                width: 530,
                showLabels: true,
                isRange : true
            });
            
            //首页输入框位置
			$('#searchPro').focus(function(){
				$('#searchPro').attr({'placeholder':''})
				$('#H_searchForm .search-hot-words').hide()
			})
			$('#searchPro').blur(function(){
				if($('#searchPro').val() == ''){
					$('#searchPro').attr({'placeholder':'输入关键词'})
				}
				$('#H_searchForm .search-hot-words').show()
			})
			
			HONOR.Global.NewButton();
        },

        initProductSliders: function() {
            $('#product-slider-1').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                touchEnabled: false,
                auto: true
            });

            $('#product-slider-2').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                touchEnabled: false,
                auto: true
            });

            $('#product-slider-3').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                touchEnabled: false,
                auto: true
            });

            $('#product-slider-3b').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                touchEnabled: false
            });

            $('#product-slider-4').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                pagerCustom: '#custom-pager',
                touchEnabled: false
            });


            $('#product-slider-h4').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                auto: true,
                speed:500,
                pause: 5000,
                touchEnabled: true
            });

            $('#product-slider-h5').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                auto: true,
                speed:500,
                pause: 5000,
                touchEnabled: true
            });
            $('#product-slider-h6').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                auto: true,
                speed:500,
                pause: 5000,
                touchEnabled: true
            });
        },

        initPhoneColorPopup: function() {
            if ( $('.custom-pager').length ) {
                // Init current active color
                $('.color-wrapper').each(function() {
                    if ($(this).find('a').hasClass('active')) {
                        $(this).find('.color-name').addClass('active');
                    }
                });

                // Change popup on click
                $('.colors').on('click', function() {
                    $('.color-name').removeClass('active');
                    $(this).parent().find('.color-name').addClass('active');
                });

            }
        },

        initStickyNav: function() {
            $(document).on('click', '.sticky-nav a', function() {
                var targetSection = $(this).data('target');
                $("html, body").animate({ scrollTop: $(targetSection).offset().top - 130 }, 300);
                return false;
            });


            // DETECT SCROLL DIRECTION
            $(window).bind('mousewheel', function(event) {
                if (event.originalEvent.wheelDelta >= 0) {
                    $('.sticky-nav').removeClass('scrolling-down').addClass('scrolling-up');
                }
                else {
                    $('.sticky-nav').addClass('scrolling-down').removeClass('scrolling-up');
                }
            });
            // DETECT STOP SCROLLING
            $(window).scroll(function() {
                clearTimeout($.data(this, 'scrollTimer'));
                $.data(this, 'scrollTimer', setTimeout(function() {
                    $('.sticky-nav').removeClass('scrolling-down').removeClass('scrolling-up');
                }, 3000));
            });

            // DETECT SCROLL DIRECTION FOR TOUCH DEVICE
            $(document).bind('touchstart', function (e){
                ts = e.originalEvent.touches[0].clientY;
            });

            $(document).bind('touchend', function (e){
                var te = e.originalEvent.changedTouches[0].clientY;
                if(ts > te+5){
                    $('.sticky-nav').addClass('scrolling-down').removeClass('scrolling-up');
                }else if(ts < te-5){
                    $('.sticky-nav').removeClass('scrolling-down').addClass('scrolling-up');
                }
            });
        },

        initFixedNav: function () {            
            if($('.page-campare').length){
            	$('.campare-title').affix({
	                offset: {
	                    top: 100
	                }
	            });
	            $('.choicecont').affix({
	                offset: {
	                    top: 100
	                }
	            });
	            $(window).scroll(function(){
	            	if($('.choicecont').hasClass('affix')){
	            		$('.campare-content').addClass('add')
	            		$('.text-ul-pic').hide()
	            		$('.js-btn-delete').addClass('add')
	            	}
	            	else{
	            		$('.campare-content').removeClass('add')
	            		$('.text-ul-pic').show()
	            		$('.js-btn-delete').removeClass('add')
	            	}
	            })
            }
            else{
            	$('.site-topbar').affix({
	                offset: {
	                    top: 5
	                }
	            });
	            $('.site-header').affix({
	                offset: {
	                    top: 5 
	                }
	            });
	            $('.site-header-m').affix({
	                offset: {
	                    top: 5
	                }
	            });
            }
        },

        initKvSwiper: function () {
            if($("#bannerSwiper").find('.swiper-slide').length>1){
                $("#bannerSwiper .swiper-button-prev").show();
                $("#bannerSwiper .swiper-button-next").show();
                var kvSwiper = new Swiper('#bannerSwiper',{
                	effect : 'fade',
                    pagination : '#bannerSwiper .swiper-pagination',
                    paginationClickable: true,
                    prevButton:'#bannerSwiper .swiper-button-prev',
                    nextButton:'#bannerSwiper .swiper-button-next',
                    speed : 500,
                    slidesPerView: 1,
                    loop : true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction : false
                });
                
                $("#bannerSwiper").mouseenter(function () {//滑过悬停
				    kvSwiper.stopAutoplay();
				}).mouseleave(function(){//离开开启
				    kvSwiper.startAutoplay();
				});
            }
        },

        initBrandPage: function() {
            $('.year-line').affix({
                offset: {
                    top: $('.year-line').offset().top -150
                }
            });
            $('.year-line li').click(function () {
                $('.year-line li').removeClass('active');
                $(this).addClass('active')
            })
            $(document).on('click', '.year-line li', function() {
            	allowChange = false;
                var targetSection = $(this).attr('data-target');
                $("html, body").animate({ scrollTop: $(targetSection).offset().top - 110 }, 300, function(){
                	allowChange = true;
                });
                return false;
            });
        },

        initMilestoneDialog: function() {

            $('.details-btn').on('click',function(){
                $('#milestoneModal').modal('show');
                if(HONOR.Global.checkScreen() != 'x-small') {
                    $('.modal-backdrop').css({
                        'background-color': '#000',
                        'opacity': 0.7
                    });
                } else {
                    $("html, body").animate({ scrollTop: 0 }, 200);
                }

                $('#milestoneModal .desc-l .txt').html($(this).siblings('.bxlist-hidden').html());
                // $('#milestoneModal .desc-l .txt').text($(this).data('txt'));


            })
        },

        initVideoBox: function(videoType, videoRatio, videoURL, videoWebmURL, videoOggURL) {
            var videoHTML;

            if(videoType == 'embed') {
                videoHTML = '<video id="div_video" class="video-js vjs-default-skin vjs-big-play-centered" controls autoplay="false" preload="auto" width="100%"><source src="' + videoURL + '" type="video/mp4" /><source src="' + videoWebmURL + '" type="video/webm" /><source src="' + videoOggURL + '" type="video/ogg" /></video>';
            } else if(videoType == 'youtube') {
                videoHTML = '<div class="embed-responsive embed-responsive-' + videoRatio + '"><iframe class="embed-responsive-item"  src="https://www.youtube.com/embed/' + videoURL + '?rel=0&amp;autoplay=1&amp;showinfo=0" allowfullscreen></iframe></div>';
            } else if(videoType == 'youku') {
                videoHTML = '<div class="embed-responsive embed-responsive-' + videoRatio + '"><iframe src="http://player.youku.com/embed/' + videoURL + '" allowfullscreen></iframe></div>';
            } else if(videoType == 'tudou') {
                videoHTML = '<div class="embed-responsive embed-responsive-' + videoRatio + '"><iframe src="http://www.tudou.com/programs/view/html5embed.action?type=0&code=' + videoURL + '" allowfullscreen></iframe></div>';
            }

            return videoHTML;
        },

        initVideoButton: function() {
            videojs.options.flash.swf = "../../common/css/video-js.swf";

            var videoPlayer = null;
            var isBlur = false;
            var isIE = true;

            if(BrowserDetect.init() == 'Chrome' || BrowserDetect.init() == 'Safari') {
                isIE = false;
            }
			
			$(document).on('click','.video-play-btn',function(){
//          $('.video-play-btn').on('click',function() {
                // if(HONOR.Global.checkScreen() == 'x-small' || isIE == true) {
                //  isBlur = false;
                // } else {
                //  isBlur = true;
                // }

                if(isBlur != false) {
                    $('#main, #sideNav, header, footer').foggy({
                        blurRadius: 8,
                        opacity: 0.8,
                        cssFilterSupport: true
                    });
                }
                var t=$(this).attr('data-title');
                if($(this).attr('data-url')){
                    $('#video-dialog').attr('data-url',$(this).attr('data-url'))
                }else{
                    $("#share_icons").hide();
                }
                if($(this).attr('data-img')){
                    $('#video-dialog').attr('data-title',t)
                }
                $('#video-dialog').modal('show').attr('data-img',$(this).attr('data-img'));
                $('#v_t').html(t);
                if($(this).data('video-type') != 'embed') {
                    $('#video-dialog').find('.video-content').empty().html(HONOR.Global.initVideoBox($(this).data('video-type'), $(this).data('ratio'), $(this).data('video-source-mp4')));
                } else {
                    $('#video-dialog').find('.video-content').empty().html(HONOR.Global.initVideoBox($(this).data('video-type'), $(this).data('ratio'), $(this).data('video-source-mp4'), $(this).data('video-source-webm'), $(this).data('video-source-ogg')));
                    videojs("div_video", {}, function(){
                        videoPlayer = this;
                        console.log(videoPlayer);
                        $('#div_video').css({
                            'height': $('#video-dialog .modal-body').height()
                        });
                    });
                }
                
                if($('.page-video').length){
                	if($(this).hasClass('kv-video')){
                		_smq.push(['custom','videomainpage_mainpush_pc',$(this).attr('data-code')]);
		            	console.log('监听代码执行')
		            	console.log('videomainpage_mainpush_pc'+'&&'+$(this).attr('data-code'))
                	}
                	else{
                		if($(this).attr('data-from') == 'topiclist'){
                			_smq.push(['custom','videomainpage_list_'+$('.video-items').attr('data-lei')+'_pc',$(this).attr('data-code')]);
		            		console.log('监听代码执行')
		            		console.log('videomainpage_list_'+$('.video-items').attr('data-lei')+'_pc'+'&&'+$(this).attr('data-code'))
                		}
                		else{
                			_smq.push(['custom','videomainpage_'+$(this).attr('data-lei')+'_pc',$(this).attr('data-code')]);
		            		console.log('监听代码执行')
		            		console.log('videomainpage_'+$(this).attr('data-lei')+'_pc'+'&&'+$(this).attr('data-code'))
                		}
                		
                	}
                }
                
                if($('.page-product').length){
                	_smq.push(['custom','Brand_'+$('.video-items').attr('data-pro')+'_pc',$(this).attr('data-code')]);
	            	console.log('监听代码执行')
	            	console.log('Brand_'+$('.video-items').attr('data-pro')+'_pc'+'&&'+$(this).attr('data-code'))
                }

                return false;
            });

            $('#video-dialog .close-video-btn').click(function() {
                $('#video-dialog').modal('hide');
                return false;
            });
            $('#video-dialog').on('shown.bs.modal', function (e) {
                if(videoPlayer != null) {
                    $('#div_video').css('height', $('#video-dialog .modal-body').height());
                }
                if(!isBlur) {
                    $('.modal-backdrop').css({
                        'background-color': '#000'
                    });
                }
            });
            $('#video-dialog').on('hidden.bs.modal', function (e) {

                if(videoPlayer != null) {
                    videoPlayer.dispose();
                }
                $('#video-dialog').find('.video-content').empty();

                if(isBlur) {
                    $('#main, #sideNav, header, footer').foggy(false);
                } else {
                    $('.modal-backdrop').css({
                        'background-color': 'transparent'
                    });
                }
            });

            $(window).bind('resizeEnd', function() {
                if(videoPlayer != null) {
                    $('#div_video').css('height', $('#video-dialog .modal-body').height());
                }
            });
        },

        buyButton: function() {
            $('.buy-button').click(function() {
                $('#buy-dialog').modal('show');
                $('.modal-backdrop').css({'background-color': '#000'});
            })
            $(".shop-close").on("click",function(){
                $('#buy-dialog').modal('hide');
            });
        },

        articleButton: function () {
            $('.article-button').click(function() {
                var articleDialog = $('<div></div>')
                articleDialog.attr('id','article-dialog');
                articleDialog.html('<a href="#" class="close-article-btn"></a><iframe name="articleLayer_150390404981828" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes" style="width:100%;height:100%;border:0;" src="'+ $(this).attr('data-source') +'"></iframe>')
                //$('body').append( articleDialog )
                console.log($(this).find('.share_img').attr('src'));
                $('#article-dialog').show().attr('src',$(this).find('.share_img').attr('src'));
                $('#article-dialog').attr('data-url', $(this).attr('data-url'));
                $('#article-dialog').attr('data-title', $(this).attr('data-title'));
                $('#article-dialog iframe').attr('src', $(this).attr('data-source'));
                $('body').css('overflow','hidden')
                $('#article_div').css('height', $(window).height());

                $('.close-article-btn').on('click',function() {
                    $('body').css('overflow','auto')
                    $('#article-dialog').hide();
                    $('#article-dialog iframe').attr('src', '');
                    return false;
                });
                
                _smq.push(['custom','Brand_'+$(this).attr('data-pro')+'_pc',$(this).attr('data-code')]);
            	console.log('监听代码执行')
            	console.log('Brand_'+$(this).attr('data-pro')+'_pc'+'&&'+$(this).attr('data-code'))
            })

            $(window).bind('resizeEnd', function() {
                $('#article_div').css('height', $(window).height());
            });
        },
        NewButton: function () {
        	console.log("inclick...")
            $('.news-list').delegate('.new-button','click',function() {
                var articleDialog = $('<div></div>')
                articleDialog.attr('id','article-dialog');
                articleDialog.html('<a href="#" class="close-article-btn"></a><iframe name="NewLayer_150390404981828" frameborder="no" border="0" marginwidth="0" marginheight="0" allowtransparency="yes" style="width:100%;height:100%;border:0;" src="'+ $(this).attr('data-source') +'"></iframe>')
                //$('body').append( articleDialog )
                $('#article-dialog').show().attr('src',$(this).find('.share_img').attr('src'));
                $('#article-dialog').attr('data-url',$(this).attr('data-url'));
                $('#article-dialog').attr('data-title', $(this).attr('data-title'));
                $('#article-dialog').attr('data-code', $(this).attr('data-code'));
                $('#article-dialog iframe').attr('src', $(this).attr('data-source'));
                $('body').css('overflow','hidden')
                $('#article_div').css('height', $(window).height());
                
                console.log($(this).attr('data-code'))
                if($(this).attr('data-from') == 'index'){
                	_smq.push(['custom','homepage_latestnews_pc',$(this).attr('data-code')]);
                	var _latestM = parseInt($(this).attr('data-key'))+1;
                	_jcq.push(['_track', "LatestM"+_latestM,{name:$(this).attr('data-code')}]);
                	console.log('监听代码执行')
                	console.log('homepage_latestnews_pc'+'&&'+$(this).attr('data-code'))
                }
                else if($(this).attr('data-from') == 'news'){
                	_smq.push(['custom',$('.news-list').attr('data-lei'),$(this).attr('data-code')]);
                	console.log('监听代码执行')
                	console.log($('.news-list').attr('data-lei')+'&&'+$(this).attr('data-code'))
                }
                
            })
            $(window).bind('resizeEnd', function() {
                $('#article_div').css('height', $(window).height());
            });
        },
        //产品列表
        page_products: function(){
			$('.item').find('.btn-duibi').click(function () {
//              $(this).siblings('.duibi-sort').toggle();
				$(this).find('.duibi_list').toggle();
				$(this).find('.duibi_list').css({'z-index':999})
            });
            $('.item .figure').on('mouseenter', function () {
//              $(this).siblings('.handle').find('.duibi-sort').hide();
                $(this).siblings('.handle').find('.duibi_list').hide();
            });
            $('.item').on('mouseleave', function () {
//              $(this).find('.duibi-sort').hide();
                $(this).find('.duibi_list').hide();
            });
        },

        page_proSearch: function () {
        	$('.item').find('.btn-duibi').click(function () {
//              $(this).siblings('.duibi-sort').toggle();
				$(this).find('.duibi_list').toggle();
				$(this).find('.duibi_list').css({'z-index':999})
            });
            $('.item .figure').on('mouseenter', function () {
//              $(this).siblings('.handle').find('.duibi-sort').hide();
                $(this).siblings('.handle').find('.duibi_list').hide();
            });
            $('.item').on('mouseleave', function () {
//              $(this).find('.duibi-sort').hide();
                $(this).find('.duibi_list').hide();
            });
            
            $('.range-slider').jRange({
                from: 0, to: 3000, step:1,
                scale: ['￥0','￥500','￥1000','￥1500','￥2000','￥2500','￥3000+'],
                format: '%s',
                width: 530,
                showLabels: true,
                isRange : true
            });
            
//          $("#btnSearch").click(function(){
//              var aa = $(".range-slider").val();
//              if($('#proType span').html() == '产品类型' && $('#proSize span').html() == '屏幕尺寸' && $('#proStandard span').html() == '网络制式' && $('#publishTime span').html() == '发布时间'){
//              	if( $('#proType span').html() == '产品类型' ){
//	                    alert('请选择产品类型')
//	                    return;
//	                }else if( $('#proSize span').html() == '屏幕尺寸' ){
//	                    alert('请选择屏幕尺寸')
//	                    return;
//	                }else if( $('#proStandard span').html() == '网络制式' ){
//	                    alert('请选择网络制式')
//	                    return;
//	                }else if( $('#publishTime span').html() == '发布时间' ){
//	                    alert('请选择发布时间')
//	                    return;
//	                }
//              }
//          });
        },

        page_product: function(){
            var mySwiper2 = new Swiper('#pro-banner',{
                prevButton:'.left-swiper .swiper-prev',
                nextButton:'.left-swiper .swiper-next',
                pagination : '.left-swiper .swiper-pagination',
                speed : 1000,
                //loop : true,
                onSlideChangeEnd: function(swiper){
                    $('.step-list li').removeClass('active').eq(swiper.activeIndex).addClass('active')
                }
            });
            var mySwiper3 = new Swiper('#pro-activity-banner',{
                pagination : '#pro-activity-banner .swiper-pagination',
                speed : 1000,
                loop : true
            });
            $('.buy-other').hover(function () {
                $(this).find('.other-link').show()
            }, function () {
                $(this).find('.other-link').hide()
            });
            $('.step-list').on('click','li',function(){
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                mySwiper2.slideTo( $(this).index() )
            });
            $('.volume').on('click','span', function () {
                $('.volume span').removeClass('active');
                $(this).addClass('active');
            })
            $('.buddies-list').on('click','li a',function(){
                $(this).addClass('selected');
                $(this).parent().siblings().children('a').removeClass('selected');
//              $("html, body").animate({ scrollTop: $('.product-header').offset().top }, 1000);
            })

        },

        page_news: function () {
            $('.buddies-list').on('click','li a',function(){
                $(this).addClass('selected');
                $(this).parent().siblings().children('a').removeClass('selected');
                $("html, body").animate({ scrollTop: $('#wrap-perfect-buddies').offset().top - 90 }, 1000);
            })
            
            HONOR.Global.NewButton();
        },

        page_video: function () {
            $('.video-list .item').hover(function () {
                $(this).addClass('active')
            }, function () {
                $(this).removeClass('active')
            });

            var colorArr = ['#00b4e4', '#70c1ec', '#f08b38', '#f4cd27', '#9fc6af'];
            $('#video-nav .swiper-slide').each(function () {
                var index = $(this).index();
                if(index == 0){
                    $(this).css('background-color', colorArr[0])
                }else{
                    $(this).css('background-color', colorArr[(index-1)%4+1])
                }
            })
            var videoNav = new Swiper('#video-nav',{
                prevButton:'.swiper-button-prev',
                nextButton:'.swiper-button-next',
                //centeredSlides : true,
                slidesPerView: 'auto',
                spaceBetween : 15
            });
        },

        page_campare: function(){
            $('.followcon').affix({
                offset: {
                    top: $('.followcon').offset().top -90
                }
            });
            $('.followcon-ul li').click(function () {
                $('.followcon-ul li').removeClass('active');
                $(this).addClass('active')
            })
            $(document).on('click', '.followcon-ul li', function() {
            	allowScroll = false;
            	clearTimeout(allowScrollTimer)
                var targetSection = $(this).attr('data-target');
                $("html, body").animate({ scrollTop: $(targetSection).offset().top - 430 }, 300,function(){
                	allowScrollTimer = setTimeout(function(){
                		allowScroll = true
                	},300)
                });
                return false;
            });
            //仅显示不同项目
            $(".campare-title .different").on("click",function(){
                $(this).hasClass("on")? $(this).removeClass("on"):$(this).addClass("on");
                $(this).hasClass("on")?$(".checkbox-different").attr("checked",true):$(".checkbox-different").attr("checked",false);
                changeDifferent();
            })
            $('.select').on('click', function (event) {
            	console.log('this way')
//              $(this).parents('.js-items-select').siblings('.js-items-select').find('.select').removeClass('active');
//              $(this).toggleClass('active');
                event.stopPropagation();
            })
            $('.select .dropdown').on('click', 'li', function () {
                $(this).parent('ul').siblings('span').text($(this).text());
            })
        },

        page_activity:function(){
            
            $('.year-line').affix({
                offset: {
                    top: $('#wrap-perfect-buddies').offset().top
                }
            });
        },

        photoWall: function(){

            var has = GetQueryString('has')
            if(has == 'true'){
                $('.icon-productbox').css('display','block');
                $('.enter-category').addClass("opacity-flex");
            }

            cate = GetQueryString('Category');
            switch(cate){
                case 'honor7i':
                    document.title="荣耀7i 秀恩爱-最具创意情侣照-荣耀 这一刻-荣耀";
                    $('#myTabs').empty().append($('#honor7i-category li'));
                    $('#myTabContent').empty().load('../../honor-moment/photo-wall/page/honor7i-1.html');
                    break;
                case 'honor6plus':
                    document.title="荣耀6Plus 双眼让TA成为焦点-荣耀 这一刻-荣耀";
                    $('#myTabs').empty().append($('#honor6plus-category li'));
                    $('#myTabContent').empty().load('../../honor-moment/photo-wall/page/honor6plus-1.html');
                    break;
                case 'celebrate20151212':
                    document.title="2015.12.12荣耀周年庆-荣耀 这一刻-荣耀";
                    $('#myTabs').empty().append($('#celebrate20151212-category li'));
                    $('#myTabContent').empty().load('../../honor-moment/photo-wall/page/celebrate20151212-1.html');
                    break;
                case 'yearatmo2016':
                    document.title="荣耀7 镜头下的中国年-荣耀 这一刻-荣耀";
                    $('#myTabs').empty().append($('#yearatmo2016 li'));
                    $('#myTabContent').empty().load('../../honor-moment/photo-wall/page/yearatmo2016-1.html');
                    break;
                case 'supergirl2016':
                    document.title="超级女声荣耀手机直选通道现场图集-荣耀 这一刻-荣耀";
                    $('#myTabs').empty().append($('#supergirl2016 li'));
                    $('#myTabContent').empty().load('../../honor-moment/photo-wall/page/supergirl2016.html');
                    break;
                case 'honorv8-sample':
                    document.title="荣耀V8样张秀-荣耀 这一刻-荣耀";
                    $('#myTabs').empty().append($('#honorv8-sample li'));
                    $('#myTabContent').empty().load('../../honor-moment/photo-wall/page/honorv8-sample.html');
                    break;
                // case 'adream':
                //     document.title="真爱梦想 荣耀公益活动-荣耀 这一刻-荣耀";
                //     $('#myTabs').empty().append($('#adream-category li'));
                //     $('#myTabContent').empty().load('../../honor-moment/photo-wall/page/adream-1.html');
            }

            setInterval(function(){
                $('.wookmark').masonry({
                    itemSelector : '[class*="col-sm-"]'
                });
            },2000)

            $('.dropdown-menu a:first-child').addClass('active');
            $(document).on("click", "#myTabs li:first-child a", function(e){
                    e.preventDefault()
                    $(this).addClass('active');
                    $(this).siblings().removeClass('active');
                    // $(this).tab('show');
                    setTimeout(function(){
                        $('.wookmark').masonry({
                            itemSelector : '[class*="col-sm-"]'
                        });

                    },1000);
                })
                .on("click",".js-photo-close",function(e){
                })


            // 超女照片流
            $('.buddies-list').on('click','li',function(){
                var index = $(this).index();
                var $getData = $('.all-data').children('div').eq(index-1);
                // alert($getData.html());
                $(this).children('a').addClass('active');
                $(this).siblings().children('a').removeClass('active');
                supergrilChange($getData);
            })

            function supergrilChange (data){
                var $container = $('.photoStream');
                $('.photoStream').empty().masonry('destroy').append($(data).html());
                $container.imagesLoaded(function(){
                    $('.photoStream').masonry({
                        itemSelector : '[class*="col-sm-"]'
                        // columnWidth: 15,
                    });
                    HONOR.Global.initVideoButton();
                })
            }

            $(document).ready(function() {
                $('.buddies-list li:eq(1)').click()
            });



        },

		honorPro:function(){
            $('#section-kv').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: false,
                moveSlides: 1,
                infiniteLoop: true,
                controls: true,
                mode: 'horizontal',
                auto: true,
                touchEnabled: true
            });

            $('#product-img-id').bxSlider({
                minSlides: 1,
                maxSlides: 1,
                pager: true,
                moveSlides: 1,
                infiniteLoop: true,
                controls: false,
                mode: 'fade',
                auto: true,
                touchEnabled: true
            });
        }

    };
})(jQuery);

//模拟下拉框
function DropDown(el) {
    this.dd = el;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            event.stopPropagation();
        });
    }
}

var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";

        return this.browser;
    },

    searchString: function(data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1) {
                return data[i].identity;
            }
        }
    },

    searchVersion: function(dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
    },

    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.userAgent,
        subString: "Safari",
        identity: "Safari"
    }, {
        string: navigator.userAgent,
        subString: "Opera",
        identity: "Opera"
    }]

};

$(document).ready(function($) {
    BrowserDetect.init();
    HONOR.Global.init();
});

$(window).load(function() {

});
$(window).on("scroll",function(){

});
$(window).bind('resizeEnd', function() {

});

$(window).resize(function() {

});
//头部搜索处理
$('#search').focus(function(){
	$('#J_searchForm .search-hot-words').hide()
})
$('#search').blur(function(){
	$('#J_searchForm .search-hot-words').show()
})

//照片流分享
function shareToSNS (name){
    if(cate == 'honor6plus'){
        var title = encodeURIComponent('双眼让TA成为焦点 荣耀6Plus摄影大赛！');
    }else if(cate == 'honor7i'){
        var title = encodeURIComponent('荣耀7i 秀恩爱最具创意情侣照！');
    }else if(cate == 'celebrate20151212'){
        var title = encodeURIComponent('2015.12.12 荣耀周年庆');
    }else if(cate == 'yearatmo2016'){
        var title = encodeURIComponent('荣耀7 镜头下的中国年');
    }else if(cate == 'supergirl2016'){
        var title = encodeURIComponent('超级女声荣耀手机直选通道现场图集');
    }else if(cate == 'honorv8-sample'){
        var title = encodeURIComponent('荣耀V8样张秀');
    }
    pic = encodeURIComponent(photo_wall_pic),
        l = encodeURIComponent(photo_wall_url);
    switch(name){
        case "sina":
            openwin('http://v.t.sina.com.cn/share/share.php?title='+title+'&url='+l+'&pic='+pic,'weibo',900,600);
            break;
        case "renren":
            openwin('http://widget.renren.com/dialog/share?title='+title+'&url='+l+'&pic='+pic+'&message='+title,'renren',900,600);
            break;
        case "kaixin":
            openwin('http://www.kaixin001.com/rest/records.php?style=12&content='+title+'&url='+l+'&pic='+pic,'kaixin001',900,600);
            break;
        case "douban":
            openwin('http://www.douban.com/recommend/?url='+l+'&title='+title+'&image='+pic,'douban',900,600);
            break;
        case "qq":
            openwin('http://v.t.qq.com/share/share.php?url='+l+'&title='+title+'&pic='+pic,'qq',900,600);
            break;
        case "qzone":
            openwin('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+l+'&desc='+title+'&pics='+pic,'tencent',900,600);
            break;
    }
    function openwin(url,name,width,height){
        var top = (window.screen.availHeight-30-height)/2;
        var left = (window.screen.availWidth-10-width)/2;
        window.open(url,name,'height='+height+',width='+width+',top='+top+',left='+left+',toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no');
    }
};





