/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
function
    isEmail(str) {

    return

    /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function
    isIdCard(str) {

    return

    /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
}

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function
    isPhoneNum(str) {

    return

    /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}
/**
 * 电话号码检测
 * @param mobile
 * @returns {Boolean}
 */
function CheckTelephone(telephone) {
    var re = /^0\d{2,3}-?\d{7,8}$/;
    if (re.test(telephone)) {
        return true;
    } else {
        return false;
    }
}

/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
function
    isUrl(str) {

    return

    /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    i.test(str);
}

function trim(str) { return str.replace(/^(\s|\u00A0)+/, "").replace(/(\s|\u00A0)+$/, "") }


/**
 * 名称相关检测
 * @param Name
 * @param Minlen
 * @param Maxlen
 * @returns {Number}
 */
function checkName(Name, Minlen, Maxlen) {
    rs = 1;
    if (Name == '') {
        rs = 2;  //请填写名称
    } else if (getStrActualLen(Name) > Maxlen || getStrActualLen(Name) < Minlen) {
        rs = 3; //长度不符合规范
    } else if (!/^[0-9A-Za-z\_\-\u4e00-\u9fa5]+$/.test(Name)) {
        rs = 4; //学校名称只能包含汉字，数字，字母，下划线"_"，连接线"-"
    }
    return rs;
}