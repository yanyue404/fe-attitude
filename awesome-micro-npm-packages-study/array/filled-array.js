'use strict';
module.exports = function (item, n) {
	var ret = new Array(n); //n位数组
	var isFn = typeof item === 'function';

	if (!isFn && typeof ret.fill === 'function') {//非函数
		return ret.fill(item);
	}
    

  
	for (var i = 0; i < n; i++) {
		ret[i] = isFn ? item(i, n,ret) : item; //是函数,ret的位置？？？
	}

	return ret;
};