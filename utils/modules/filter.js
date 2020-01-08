// console.log((new Date(dateStr)).formate("yyyy-MM-dd"))
// (new Date()).formate("yyyy-MM-dd hh:mm:ss")   ==>  2018-07-18 10:01:49
Date.prototype.formate = function(format) {
  const o = {
    'M+': this.getMonth() + 1, // month
    'd+': this.getDate(), // day
    'h+': this.getHours(), // hour
    'm+': this.getMinutes(), // minute
    's+': this.getSeconds(), // second
    'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds(),
    // millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length),
    );
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
      );
    }
  }
  return format;
};

export function parseCtime(str, showHoursMinutes) {
  var temp = str;
  if (typeof temp === 'string') {
    temp = Number(str) * 1000;
  }
  if (!showHoursMinutes) {
    return new Date(temp).formate('yyyy-MM-dd');
  } else {
    return new Date(temp).formate('yyyy-MM-dd hh:mm');
  }
}

/**
 * 不规则的时间格式 补 0
 * @param {*} str "2019-5-21"
 * @returns "2019-05-21"
 */

export function dateAddZero(str) {
  return str.replace(/(?=\b\d\b)/g, '0');
}

// compact([0, false, true, undefined, null, "", 12, 15]); // [true, 12, 15]
// 使用Boolean过滤数组中的所有假值
export const compact = arr => arr.filter(Boolean);

export const formatPrice = (number, sign) => {
  !sign && (sign = ',');
  var parts = number.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, sign);
  return parts.join('.');
};
