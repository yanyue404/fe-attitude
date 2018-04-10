/**
 * @todo 成长守护平台基础类
 * @author dennyhuang<dennyhuang@tencent.com> 2017-03-25
 */
var xyfw_base_common = {
    version: '1.0.0',
    environment: 'production', // test or stage or production
    access_func_cookie_token: 'xyfw_jiazhang_access_func_token', //验证码COOKIE-KEY
    domain: '',
    operate_type: '',
    currentOperationType: '',
    is_bind_as_child: '',
    is_black_name: false, //是否黑名单，默认非黑名单
    black_name_tip: '您所登录的帐号异常，无法进行下一步。如有疑问，请拨打成长守护热线0755-86013799求助。',
    //统一请求链接，不使用属于，避免被赋值污染数据
    getBaseUrl: function () {
        var protocol = this.getProtocol();
        if (this.environment == 'production') {
            return protocol + '//jz.game.qq.com/php/tgclub/v2/';
        } else {
            return protocol + '//test.jz.game.qq.com/php/tgclub/v2/';
        }
    },
    //访问控制，false：可执行，true：不可执行
    access_flag: false,
    init: function () {
        this.domain = window.location.host;
    },
    getPrefix: function () {
        return this.domain + '/jz/';
    },
    //微信登录使用这个前缀
    getWxPrefix: function () {
        if ('production' == this.environment) {
            return this.domain + '/jz/';
        } else {
            return 'jiazhang.qq.com/staging/jz/';
        }
    },
    //设置访问同，防止多次点击
    setAccessFlag: function () {
        this.access_flag = true;
    },
    //释放访问控制
    releaseAccessFlag: function () {
        this.access_flag = false;
    },
    /**
     * todo 重新加载
     */
    reload: function () {
        window.location.href = 'http://' + this.domain;
    },
    /**
     * @todo 处理黑名单
     */
    dealBlackName: function () {
        if (this.is_black_name) {
            this.showTip(this.black_name_tip);
            return false;
        } else {
            return true;
        }
    },
    /**
     * @todo 设置cookie
     * @param {type} name
     * @param {type} value
     * @param {type} second 默认半小时
     * @param {type} domain 默认家长域名
     */
    setCookie: function (name, value, second, domain) {
        second = second || 1800;
        //默认家长域名
        domain = domain || this.domain;
        var exp = new Date();
        exp.setTime(exp.getTime() + second * 1000);
        document.cookie = name + "=" + escape(value) + ";domain=." + domain + ";path=/;expires=" + exp.toGMTString();
    },
    /**
     * @todo 获取cookie值
     * @param {type} name
     * @returns {String}
     */
    getCookie: function (name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : '';
    },
    /**
     * @todo 删除cookie值
     * @param {type} name
     * @returns {String}
     */
    delCookie: function (name, domain) {
        var domain = domain || this.domain;
        var exp = new Date();
        exp.setTime(exp.getTime() - 1000);
        var cval = this.getCookie(name);
        if (cval != null)
            document.cookie = name + "=" + cval + ";domain=." + domain + ";path=/;expires=" + exp.toGMTString();
    },
    /**
     * @todo 验证身份证
     */
    checkIdCard: function (code) {
        if (code.length == 18) {
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            //校验位
            var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++) {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            if (parity[sum % 11] != code[17]) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },
    /**
     * @todo 处理cookie里的QQ号
     * @param {type} uin
     * @returns {Boolean}
     */
    dealCookieUin: function (uin) {
        var reg = /^o0*/;
        uin = uin.replace(reg, "");
        return uin;
    },
    /**
     * @todo 分页
     * @param {type} items_total 总记录数
     * @param {type} page_total 总页数
     * @param {type} current_page 当前页数
     * @param {type} cb 回调方法
     * @returns eg://分页 $('.page').html(xyfw_base_common.page(ret.data.total_items, ret.data.total_pages, ret.data.current_page,'xyfw_base_common.getList'));
     */
    page: function (items_total, page_total, current_page, cb) {
        if (items_total < 1) {
            return '';
        }
        var before_page_num = 3, midle_page_num = 4, after_page_num = 4, start_num = 1, end_num = 0;
        var links = {};
        //第一个节点
        start_num = (current_page > 3) ? current_page - 3 : start_num;
        var dif_num = (current_page < before_page_num) ? before_page_num - current_page + 1 : 0;
        //第二个节点
        var second_num = current_page + midle_page_num + dif_num;
        var dif_second = 0;
        if (page_total <= second_num) {
            dif_second = second_num - page_total;
            start_num = (start_num - dif_second - after_page_num > 0) ? start_num - dif_second - after_page_num : 1;
            second_num = page_total;
        }
        //第三个节点
        var third_start_num = 0;
        var third_end_num = -1;
        var dif_third = 0;
        if (page_total > second_num) {
            third_start_num = page_total - after_page_num + 1;
            third_end_num = page_total;
            if (third_start_num <= second_num) {
                dif_third = second_num - third_start_num + 1;//补差
                start_num = (start_num - dif_third > 0) ? start_num - dif_third : 1;
                third_start_num = second_num + 1;
            }
        }
        for (var i = start_num; i <= second_num; i++) {
            links[i] = i;
        }
        for (i = third_start_num; i <= third_end_num; i++) {
            links[i] = i;
        }

        cb = cb || 'xyfw_base_common.getList';
        var html = '<a class="last-page pointer" href="javascript:;" onclick="' + (current_page > 1 ? (cb + '(' + (parseInt(current_page - 1)) + ')') : '') + '">‹</a>';
        html += '<ul class="page-num-wrap">';
        for (var idx in links) {
            html = html + '<li class="' + (current_page == idx ? 'curpage ' : '') + 'pointer"><a href="javascript:;" onclick="' + cb + '(' + idx + ')">' + idx + '</a></li>';
        }
        html += '</ul>';
        html = html + '<a class="next-page pointer" href="javascript:;" onclick="' + (page_total > current_page ? (cb + '(' + (parseInt(current_page) + 1) + ')') : '') + '">›</a>';
        return html;
    },
    //验证手机号格式
    checkUserPhone: function (phone) {
        if (!(/^1[345789]\d{9}$/.test(phone))) {
            return false;
        }
        return true;
    },
    //验证座机
    checkCallNumber: function (phone) {
        if (!(/^([0-9]{3,4}-)?[0-9]{7,8}$/.test(phone))) {
            return false;
        }
        return true;
    },
    /**
     * @todo 检测验证码
     * @returns {undefined}
     */
    checkUserCode: function (code) {
        if (isNaN(code) || code.length != 6) {
            return false;
        }
        return true;
    },
    /**
     * @todo 获取url的参数
     * @param {type} name
     * @returns {String}
     */
    getQueryStringValue: function (name) {
        var str_url, str_pos, str_para;
        var arr_param = new Array();
        str_url = window.location.href;
        str_pos = str_url.indexOf("?");
        str_para = str_url.substring(str_pos + 1);
        if (str_pos > 0) {
            str_para = str_para.split("#")[0];
            arr_param = str_para.split("&");
            for (var i = 0; i < arr_param.length; i++) {
                var temp_str = new Array()
                temp_str = arr_param[i].split("=")
                if (temp_str[0].toLowerCase() == name.toLowerCase()) {
                    return temp_str[1];
                }
            }
        }
        return "";
    },
    /**
     * @todo 日期转换处理
     * 秒 转为 X时X分X秒
     */
    dealLoginTime: function (value) {
        var theTime = parseInt(value);// 秒 
        var theTime1 = 0;// 分 
        var theTime2 = 0;// 小时 
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
            }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + "分" + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + "小时" + result;
        }
        return result;
    },
    /**
     * @todo 异步请求
     * @param {type} url
     * @param {type} params
     * @param {type} callBack 过滤status == 0和登录态问题，其它的参数需要自己处理
     * @param {type} date_type
     * @param {type} failCallBack 请求失败处理方法
     * @param {type} time_out 超时
     * @returns {undefined}
     */
    postAjax: function (url, params, toShowLoading, callBack, failCallBack, config) {
        var params = (params == '') ? {} : params;
        if (!params.multi) {
            //防止多次点击
            if (this.access_flag) {
                return false;
            }
            this.setAccessFlag();
        }
        //处理黑名单
        var rs = this.dealBlackName();
        if (!rs) {
            return false;
        }
        var _this = this;
        //请求类型
        var access_type = (config != undefined && config.access_type) ? config.access_type : 'jsonp';
        //超时限制
        var time_out = (config != undefined && config.time_out) ? config.time_out : 10000;
        time_out = parseInt(time_out);

        params.version = this.version;
        //是否异步请求
        var async = (config != undefined && config.async) ? config.async : true;
        params.channel_id = xyfw_base_login != undefined ? xyfw_base_login.channel_id : 1;
        if (params.channel_id == 0) {
            window.location.href = "./home.html#pop";
            return false;
        }
        $.ajax({
            url: url,
            type: 'POST',
            data: params,
            dataType: access_type,
            async: async, //异步请求
            timeout: time_out, //毫秒
            beforeSend: function () {
                toShowLoading ? showLoading('#Loading') : '';
            },
            success: function (ret) {
                toShowLoading ? hideLoading('#Loading') : '';
                _this.releaseAccessFlag();
                var err_code = ret.err_code;
                if (err_code == '0') {
                    callBack(ret.data);
                } else if (err_code == '30001' || err_code == '30002' || err_code == '30003' || err_code == '30004' || err_code == '30007' || err_code == '40001') {
                    //jump back to home
                    _this.delCookie('uin');
                    _this.delCookie('skey');
                    _this.delCookie('uin', 'qq.com');
                    _this.delCookie('skey', 'qq.com');
                    _this.delCookie('p_uin');
                    _this.delCookie('p_skey');
                    _this.delCookie('p_uin', 'qq.com');
                    _this.delCookie('p_skey', 'qq.com');
                    _this.delCookie('p_uin_jz', 'qq.com');
                    _this.delCookie('p_skey_jz', 'qq.com');
                    _this.delCookie('p_uin_m', 'qq.com');
                    _this.delCookie('p_skey_m', 'qq.com');

                    _this.delCookie('pwxacs', 'qq.com');
                    _this.delCookie('pwxico', 'qq.com');
                    _this.delCookie('pwxnm', 'qq.com');
                    _this.delCookie('pwxid', 'qq.com');

                    _this.delCookie('bind_child_id');
                    _this.delCookie('sync_child_id');

                    window.location.href = "./home.html#pop";
                    return;
                } else if (err_code == '40026') {
                    //处理黑名单
                    _this.is_black_name = true;
                    _this.dealBlackName();
                } else {
                    if (typeof failCallBack == 'function') {
                        failCallBack(ret);
                    } else {
                        _this.showNotice(ret.err_msg, true);
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                _this.releaseAccessFlag();
                toShowLoading ? hideLoading('#Loading') : '';
            }
        });
    },
    showNotice: function (msg, recover) {
        msg = this.trimHTML(msg);
        $('#Notice #msg').html(msg);
        $('#Notice #ok').unbind();
        $('#Notice #ok').click(function () {
            if (recover) {
                if (typeof _OLD_DIALOG == 'undefined' || '' == _OLD_DIALOG) {
                    showDialog.hide()
                } else {
                    //恢复现场
                    showDia(_OLD_DIALOG);
                }
            } else {
                showDialog.hide();
            }
        });
        showDia('Notice');
    },
    /**
     * @todo 统一弹窗
     * @param {type} text 提示的内容
     * @param {type} id 上一个窗口的ID,不传则不显示上一个窗口
     */
    showTip: function (text, id) {
        text = this.trimHTML(text);
        $('#Notice #msg').html(text);
        showDia('Notice');
        id = id || '';
        $('#Notice #ok').attr('onclick', "xyfw_base_common.hideTip(\'" + id + "\')");
    },
    /**
     * @todo 统一关窗
     * @param {type} id
     */
    hideTip: function (id) {
        id = id || '';
        showDialog.hide();
        if (id != '') {
            showDia(id);
        }
    },
    /** 
     * @param {type} 设置调用token
     */
    setCurrentToken: function (current_token) {
        this.setCookie(this.access_func_cookie_token, current_token, 3600);
    },
    /** 
     * @param {type} 获取调用token
     */
    getCurrentToken: function () {
        return 123456;
        //return this.getCookie(this.access_func_cookie_token);
    },
    /** 
     * 获取用户头像
     * @param {type} 
     */
    getUserIcon: function (account_id, account_type) {
        if ('qq' == account_type) {
            return '//q3.qlogo.cn/headimg_dl?bs=qq&dst_uin=' + account_id + '&src_uin=' + account_id + '&fid=xxxxx&spec=100&url_enc=0&referer=bu_interface&term_type=PC';
        } else if ('wx' == account_type) {
            return '//ossweb-img.qq.com/images/chanpin/tgclub/public/jiazhang/wx_logo.png';
        } else {
            return '';
        }
    },
    //中文名处理
    maskName: function (name) {
        if (typeof name != 'string') {
            return '';
        }
        name = name.trim();
        if (2 == name.length) {
            return name[0] + '*';
            ;
        } else if (3 == name.length) {
            return name[0] + '*' + name[2];
        } else if (3 < name.length) {
            var _name = name[0];
            _name += '**';
            _name += name[name.length - 1];
            return _name;
        }
    },

    getGamePlayTime: function (time) {
        var str = '';
        if (time <= 0) {
            return '0秒';
        }
        if (time < 60) {
            //只有秒
            str = time + "秒";
        } else if (time < 3600) {
            //分，秒
            var minite = parseInt(time / 60);
            var second = time - minite * 60;
            str = minite + "分";
            str += (second != 0) ? second + '秒' : '';
        } else {
            //时分秒
            var hours = parseInt(time / 3600);
            var dif = time - hours * 3600;
            if (dif == 0) {
                str = hours + '小时';
            } else if (dif < 60) {
                str = hours + '小时' + dif + '秒';
            } else {
                var minte = parseInt(dif / 60);
                var dif_s = dif - minte * 60;
                str = hours + '小时' + minte + '分';
                str += (dif_s > 0) ? dif_s + '秒' : '';
            }
        }
        return str;
    },
    //处理用户昵称 
    getUserName: function (channel_id) {
        if (channel_id == '1') {
            var uin = this.getCookie("p_uin");
            return this.dealCookieUin(uin);
        } else {
            var wxName = this.getCookie('pwxnm');
            return decodeURIComponent(wxName);
        }
    },
    /** 
     * 获取平台logo
     * @param {type} 
     */
    getPlatformIcon: function (platformType) {
        if ('qq' == platformType) {
            return '//ossweb-img.qq.com/images/jiazhang/pc/dialog/qq_icon2.png';
        } else {
            //return '//ossweb-img.qq.com/images/jiazhang/pc/dialog/wx_icon3.png';
            return '//ossweb-img.qq.com/images/jiazhang/pc/weix_bg.png';
            //return '//ossweb-img.qq.com/images/jiazhang/pc/dialog/wx_icon3.png';
        }
    },

    validateToken: function (operate_type, succ_callback, fail_callback) {
        var current_token = this.getCurrentToken();
        if (!current_token || current_token == undefined) {
            if ('function' == typeof fail_callback) {
                fail_callback();
            }
            return false;
        }
        var url = this.getBaseUrl() + 'jiazhang_phonecode/validateToken';
        var params = {
            type: operate_type,
            code: current_token
            //	channel_id: xyfw_base_login != undefined ? xyfw_base_login.channel_id : 1,
        };
        var _this = this;
        this.postAjax(url, params, true, function (data) {
            if (data.is_valid) {
                _this.setCookie('wx_token', data.wx_token, 3600, 'qq.com');
                if ('function' == typeof succ_callback) {
                    succ_callback();//token生效
                }
                return true;
            } else {
                if ('function' == typeof fail_callback) {
                    fail_callback();//token失效
                }
                return false;
            }
        });
        return false;
    },

    /**
     * @todo 点击数据上报
     * @param {type} eid
     * @param {type} data 数据内容:格式:k1=v2&k2=v2
     * @param {type} errcode 错误码
     */
    clickReport: function (eid, data, errcode) {
        if (eid == '') {
            return true;
        }
        var uin = this.getCookie('p_uin').substr(2);
        var uid = this.getCookie('pwxid');

        if (uin) {
            var user_id = uin;
            var user_type = 0;
            var channel_id = 1;
        } else {
            var user_id = uid;
            var user_type = 1;
            var channel_id = 3;
        }
        var params = {
            'pvid': '',
            'uvid': '',
            'user_id': user_id, //QQ or wxid
            'user_type': user_type, //0:QQ 1:WX
            'visit_type': channel_id, //1PCQQ 2: H5 3: PCWX
            'module_id': parseInt(eid / 1000),
            'event_id': eid, //event id
            'con_id': '',
            'url': '',
            'err_code': errcode ? errcode : 0,
            'data': data == undefined ? '' : data
        }

        $.ajax({
            url: this.getBaseUrl() + 'jiazhang_clicklog/click',
            type: 'POST',
            data: params,
            dataType: 'jsonp',
            async: true, //异步请求
            timeout: 600, //毫秒
            success: function (ret) {
            },
            error: function (err) {
            }
        });
    },
    //过滤标签,只保留br换行
    trimHTML: function (str) {
        if (!str) {
            return str;
        }
        var reg = /<(?!\/?BR|\/?br)[^<>]*>/ig;
        str = str.replace(reg, '');
        return str;
    },
    /**
     * @todo 获取协议
     */
    getProtocol: function () {
        return ('https:' == document.location.protocol) ? 'https:' : 'http:';
    },
    isEmpty: function (obj) {
        for (var name in obj) {
            return false;
        }
        return true;
    }
};
xyfw_base_common.init();

!function (a, b) {
    function d(a) {
        var e, c = b.createElement("iframe"), d = "https://open.weixin.qq.com/connect/qrconnect?appid=" + a.appid + "&scope=" + a.scope + "&redirect_uri=" + a.redirect_uri + "&state=" + a.state + "&login_type=jssdk";
        d += a.style ? "&style=" + a.style : "", d += a.href ? "&href=" + a.href : "", c.src = d, c.frameBorder = "0", c.allowTransparency = "true", c.scrolling = "no", c.width = "300px", c.height = "400px", e = b.getElementById(a.id), e.innerHTML = "", e.appendChild(c)
    }
    a.WxLogin = d
}(window, document);