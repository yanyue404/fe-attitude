let timestamp = +new Date();

// 获取当前日期 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2
// 个占位符， 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
// (new Date()).formate("yyyy-MM-dd")            ==>  2018-07-18
// (new Date()).formate("yyyy-MM-dd hh:mm:ss")   ==>  2018-07-18 10:01:49
// (new Date()).formate("yyyy-MM-dd hh:mm:ss.S") ==>  2018-07-18 10:10:01.956
// (new Date()).formate("yyyy-M-d h:m:s.S")      ==>  2018-7-18 10:11:9.724

Date.prototype.formate = function(format) {
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
  var startDate = new Date();
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

  return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}

// 时间比较
function DateDiff(sDate1, sDate2) {
  //sDate1和sDate2是年-月-日格式
  var aDate, oDate1, oDate2, iDays;

  aDate = sDate1.split("-");

  oDate1 = new Date(aDate[0], aDate[1], aDate[2]);
  aDate = sDate2.split("-");

  oDate2 = new Date(aDate[0], aDate[1], aDate[2]);
  oDate3 = new Date();
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
  return iDays;
}

// 根据num选择当前时间之前或之后,默认选择当天，支持区间（-15,15）
function getDate(num, type) {
  var dt = new Date();
  var getMonthDays = function(year, month) {
    var d = new Date(year, month, 0);
    return d.getDate();
  };
  var year = dt.getFullYear();
  var month = dt.getMonth() + 1;
  var prevMonth = month - 1 || 12;
  var day = dt.getDate();

  var thisMonthDays = getMonthDays(year, month);
  var prevMonthDays = getMonthDays(year, prevMonth);
  if (day + num > 0) {
    day = day + num;
  } else if (day + num > thisMonthDays) {
    day = day + num - thisMonthDays;
    month++;
  } else if (day + num <= 0) {
    month--;
    day = prevMonthDays + day + num;
  }
  if (type === "obj") {
    var obj = {
      year: year,
      month: month,
      day: day
    };
    return obj;
  }
  // default
  var date = [
    [year, month, day].join("-"),
    [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(":")
  ]
    .join(" ")
    .replace(/(?=\b\d\b)/g, "0");

  // 正则补零 (略微改动)
  return date;
}
// 测试用例子
/* var logThisDate = function (num) {
  var str = getDate(num).split(" ")[0];
  console.log(str);
} */

// logThisDate(0) // 2018-08-08
// logThisDate(7) //2018-08-15
// logThisDate(15) //2018-08-23

// logThisDate(-7) //2018-08-1
// logThisDate(-15) //2018-07-24
//传统浏览器
function getDate1() {
  var dt = new Date();
  var date = [
    [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()].join("-"),
    [dt.getHours(), dt.getMinutes(), dt.getSeconds()].join(":")
  ]
    .join(" ")
    .replace(/(?=\b\d\b)/g, "0");
  // 正则补零 (略微改动)
  return date;
  // => 2018-05-29 10:26:30
}
// 现代浏览器
function getDate2() {
  var d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // 修正时区偏移
  var date = d
    .toISOString()
    .slice(0, -5)
    .replace(/[T]/g, " ");
  return date;
}

var Time = {
  // 获取当前时间戳
  getUnix: function() {
    var date = new Date();
    return date.getTime();
  },
  // 获取今天0点0分0秒的时间戳
  getTodayUnix: function() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取今年1月1日0点0分0秒的时间戳
  getYearUnix: function() {
    var date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取标准年月日
  getCurrentDate: function(time) {
    var date = new Date(time);
    var month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + day;
  },
  // 转换时间
  getFormatTime: function(timestamp) {
    var now = this.getUnix(); //当前时间戳
    var today = this.getTodayUnix(); //今天0点时间戳
    var year = this.getYearUnix(); //今年0点时间戳
    var timer = (now - timestamp) / 1000; // 转换为秒级时间戳
    var tip = "";

    if (timer <= 0) {
      tip = "刚刚";
    } else if (Math.floor(timer / 60) <= 0) {
      tip = "刚刚";
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + "分钟前";
    } else if (timer >= 3600 && timestamp - today >= 0) {
      tip = Math.floor(timer / 3600) + "小时前";
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + "天前";
    } else {
      tip = this.getLastDate(timestamp);
    }
    return tip;
  }
};

/**
 * 判断当前的操作是否在 允许的时间范围内
 * @param {*} begin_time "2019/04/26"
 * @param {*} end_time "2019-05-05"
 * @returns Boolean
 */
function belongTimeRange(begin_time, end_time) {
  var timeStr = new Date().getTime();
  var start = new Date(begin_time).getTime();
  var end = new Date(end_time).getTime();
  return timeStr >= start && timeStr <= end;
}

/**
 * 不规则的时间格式 补 0
 * @param {*} str "2019-5-21" "5"
 * @returns "2019-05-21"  "05"
 */
function dateAddZero(str) {
  return str.replace(/(?=\b\d\b)/g, "0");
}
/* 在某时间之前 */
// isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); // true
const isBeforeDate = (dateA, dateB) => dateA < dateB;
/* 在某时间之后 */
// isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); // true
const isAfterDate = (dateA, dateB) => dateA > dateB;
// console.log("21:00"<"09:10");  // false
// console.log("21:00"<"9:10");   // true   时间形式注意补0

// 几天后的时间 aFewDayLater(1) => 2019-07-18
const aFewDayLater = number => {
  let t = new Date();
  t.setDate(t.getDate() + number);
  return t.toISOString().split("T")[0];
};

// 两天时间差
// getDaysDiffBetweenDates(new Date('2017-12-13'), new Date('2017-12-22')); // 9
const getDaysDiffBetweenDates = (dateInitial, dateFinal) =>
  (dateFinal - dateInitial) / (1000 * 3600 * 24);

const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("-") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
/**
 * 获取距离参考时间之后的时间
 *
 * @param {*} origin 原始参照时间
 * @param {*} hour 几小时
 * @returns
 */
function getTimeInAFewHours(origin, hour) {
  var now = new Date(origin);
  var time = now.getTime() + 1000 * 60 * 60 * hour;
  return new Date(time);
}
