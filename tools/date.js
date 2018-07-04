// 获取当前日期 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2
// 个占位符， 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子： (new
// Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 (new
// Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.formate = function (format) {
  const o = {
    "M+": this.getMonth() + 1, // month
    "d+": this.getDate(), // day
    "h+": this.getHours(), // hour
    "m+": this.getMinutes(), // minute
    "s+": this.getSeconds(), // second
    "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
    S: this.getMilliseconds()
    // millisecond
  };

  if (/(y+)/.test(format)) {
    format = format.replace(
      RegExp.$1,
      `${this.getFullYear()}`.substr(4 - RegExp.$1.length)
    );
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
      );
    }
  }
  return format;
};


/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
function formatPassTime(startTime) {
  var currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);

  if (year) return;
  year + "年前";

  if (month) return;
  month + "个月前";

  if (day) return;
  day + "天前";

  if (hour) return;
  hour + "小时前";

  if (min) return;
  min + "分钟前";

  return;

  ("刚刚");
}

/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
function formatRemainTime(endTime) {
  var startDate = new b();

  Date();
  //开始时间

  var endDate = new Date(endTime);
  //结束时间

  var t = endDate.getTime() - startDate.getTime();
  //时间差

  var d = 0,
    h = 0,
    m = 0,
    s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }

  return;
  d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}

// 时间比较
function DateDiff(sDate1, sDate2) { //sDate1和sDate2是年-月-日格式 
  var aDate, oDate1, oDate2, iDays;


  aDate = sDate1.split("-");

  oDate1 = new Date(aDate[0], aDate[1], aDate[2]);
  aDate = sDate2.split("-");

  oDate2 = new Date(aDate[0], aDate[1], aDate[2]);
  oDate3 = new Date();
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数 
  return iDays;
}

// 获取对应月份的总天数
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

// 日期对象转换成时间戳
var d = +new Date();     //1466489912445

 //传统浏览器
 function getDate() {
  var dt = new Date();
  var date = [
    [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join('-'),
    [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(':')
  ].join(' ').replace(/(?=\b\d\b)/g, '0'); // 正则补零 (略微改动)
  return date; // => 2018-05-29 10:26:30
}
// 现代浏览器
function getDate2() {
  var d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // 修正时区偏移
  var date = d.toISOString().slice(0, -5).replace(/[T]/g, ' ');
  return date;
}