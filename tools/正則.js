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

var passwordReg = /^[A-Za-z0-9]{6,16}$/;
var nameReg = /^[a-zA-Z\u4e00-\u9fa5]{2,6}$/;
var mobileReg = /^1[3|4|5|7|8]\d{9}$/;
var emailReg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/;

//checkType('165226226326','phone')
//false
//大家可以根据需要扩展
function checkType (str, type) {
    switch (type) {
        case 'email':
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'phone':
            return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
        case 'tel':
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'number':
            return /^[0-9]$/.test(str);
        case 'english':
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese':
            return /^[\u4E00-\u9FA5]+$/.test(str);
        case 'lower':
            return /^[a-z]+$/.test(str);
        case 'upper':
            return /^[A-Z]+$/.test(str);
        default :
            return true;
    }
}

var Validator = (function ($) {

	//Validates a date input -- http://jquerybyexample.blogspot.com/2011/12/validate-date-    using-jquery.html
	function isDate(str) {
		var currVal = str;
		if (currVal == '')
			return false;

		//Declare Regex
		var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
		var dtArray = currVal.match(rxDatePattern); // is format OK?

		if (dtArray == null)
			return false;

		//Checks for dd/mm/yyyy format.
		var dtDay = dtArray[1];
		var dtMonth = dtArray[3];
		var dtYear = dtArray[5];

		if (dtMonth < 1 || dtMonth > 12)
			return false;
		else if (dtDay < 1 || dtDay > 31)
			return false;
		else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
			return false;
		else if (dtMonth == 2) {
			var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
			if (dtDay > 29 || (dtDay == 29 && !isleap))
				return false;
		}

		return true;
	}

	/*
	 * Check whether email is valid
	 */
	var isValidEmail = function (strEmail) {
		
		validRegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
		
		if (strEmail.search(validRegExp) == -1) {
			return false;
		}
		
		return true;
	}

	/*
	 * Check whether mobile phone number is valid
	 */
	var isValidMobile = function (str) {
	
		str = str.replace(/([- ])/g, '');
		validRegExp = /^[0-9]{10,}$/i;
		
		if (str.search(validRegExp) == -1)
			return false;
			
		return true;
	}

	/*
	 * Check whether desk phone number is valid
	 */
	var isValidPhone = function (str) {
	
		//validRegExp = /^[ 0-9]{8,}$/i;
		str = str.replace(/([- ])/g, '');
		validRegExp = /^[0-9]{8,}$/i;
		
		if (str.search(validRegExp) == -1) {
		
			return false;
		}
		
		return true;
	}

	var isValidUrl = function (str) {
		validRegExp = /^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/i;
		if (str.search(validRegExp) == -1)
			return false;
		return true;
	}

	var isValidPostCode = function (postCode) {
		var validRegExp = /^\d{5}$|^\d{5}-\d{4}$/;
		return validRegExp.test(postCode);
	}

	/**
	 * Format XXXXXXXXXX.
	 */
	var isValidIdCard = function (str) {
		validRegExp = /^[0-9]{9,15}$/i;
		if (str.search(validRegExp) == -1)
			return false;
		return true;
	}


	/**
	 * Format XXXXXX-XX-XXXX Or XXXXXX XX XXXX Or XXXXXXXXXXXX with X = a number.
	 */
	var isICNo = function (str) {
		if (str.length != 12 && str.length != 14)
			return false;
		if (str.length == 14) {
			if (str.indexOf('-') != -1)
				var validRegExp = /^\d{6}-\d{2}-\d{4}$/;
			else if (str.indexOf(' ') != -1)
				var validRegExp = /^\d{6} \d{2} \d{4}$/;
			else
				return false;

			return validRegExp.test(str);
		} else {
			var validRegExp = /^\d{12}$/;
			return validRegExp.test(str);
		}

	}

	/**
	 * Format XXXXXX-XX-XXXX Or XXXXXX XX XXXX Or XXXXXXXXXXXX with X = a number.
	 */
	var isBRNo = function (str) {
		var validRegExp = /^[0-9a-zA-Z]{7}$/;
		return validRegExp.test(str);
	}

	/**
	 * cellphone 	0xxx-xxx-xxx 
	 * phone 		0x-xxxx-xxxx
	 */
	var isTaiwanMobile = function (str) {
		var cellPhoneRegExp = /^0\d{3}-\d{3}-\d{3}$/;
		var phoneRegExp = /^0\d{1}-\d{4}-\d{4}$/;
		var validRegExp = /^0[0-9]{9}$/;

		str = str.replace(/([- ])/g, '');

		if (cellPhoneRegExp.test(str))
			return true;
		else if (phoneRegExp.test(str))
			return true;
		else if (validRegExp.test(str))
			return true;
		else
			return false;
	}

	/**
	 * Validate Malaysia mobile.
	 *
	 * Minimum 10 digits & maximum 11 digits. Need to start with "0"
	 */
	var isMalaysiaMobile = function (str) {
		var validRegExp = /^0\d{9,10}$/;
		str = str.replace(/([- ])/g, '');
		if (validRegExp.test(str))
			return true;
		else
			return false;
	}

	return {
		"isDate" : isDate,
		"isEmail" : isValidEmail,
		"isValidEmail" : isValidEmail,
		"isMobile" : isValidMobile,
		"isValidMobile" : isValidMobile,
		"isPhone" : isValidPhone,
		"isValidPhone" : isValidPhone,
		"isPostCode" : isValidPostCode,
		"isValidPostCode" : isValidPostCode,
		"isUrl" : isValidUrl,
		"isValidUrl" : isValidUrl,
		"isICNo" : isICNo,
		"isBRNo" : isBRNo,
		"isValidIdCard" : isValidIdCard,
		"isIdCard" : isValidIdCard,
		"isTaiwanMobile" : isTaiwanMobile,
		"isMalaysiaMobile" : isMalaysiaMobile
	};
})(jQuery);

