/**
 * 获取当前时间戳
 * @returns {number}
 */
function getTimestamp() {
  return Date.now()
}

/**
 * 格式化日期
 * @param {Date} date
 * @param {string} format
 * @returns {string}
 */
function formatDate(date, format) {
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length))
  }

  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
    }
  }

  return format
}

/**
 * 格式化已过时间
 * @param {Date} startTime
 * @returns {string}
 */
function formatPassTime(startTime) {
  const currentTime = Date.now()
  const time = currentTime - startTime
  const day = parseInt(time / (1000 * 60 * 60 * 24))
  const hour = parseInt(time / (1000 * 60 * 60))
  const min = parseInt(time / (1000 * 60))
  const month = parseInt(day / 30)
  const year = parseInt(month / 12)

  if (year) return `${year}年前`
  if (month) return `${month}个月前`
  if (day) return `${day}天前`
  if (hour) return `${hour}小时前`
  if (min) return `${min}分钟前`
  return '刚刚'
}

/**
 * 格式化剩余时间
 * @param {Date} endTime
 * @returns {string}
 */
function formatRemainTime(endTime) {
  const startDate = new Date()
  const endDate = new Date(endTime)
  const t = endDate.getTime() - startDate.getTime()
  let d = 0,
    h = 0,
    m = 0,
    s = 0

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor((t / 1000 / 60 / 60) % 24)
    m = Math.floor((t / 1000 / 60) % 60)
    s = Math.floor((t / 1000) % 60)
  }

  return `${d}天 ${h}小时 ${m}分钟 ${s}秒`
}

/**
 * 日期差异
 * @param {string} sDate1
 * @param {string} sDate2
 * @returns {number}
 */
function dateDiff(sDate1, sDate2) {
  const aDate1 = sDate1.split('-').map(Number)
  const aDate2 = sDate2.split('-').map(Number)
  const oDate1 = new Date(aDate1[0], aDate1[1] - 1, aDate1[2])
  const oDate2 = new Date(aDate2[0], aDate2[1] - 1, aDate2[2])
  const iDays = Math.abs(oDate1 - oDate2) / (1000 * 60 * 60 * 24)
  return Math.round(iDays)
}

/**
 * 获取指定天数之前或之后的日期
 * @param {number} num
 * @param {string} [type]
 * @returns {string|object}
 */
function getDate(num, type) {
  const dt = new Date()
  dt.setDate(dt.getDate() + num)
  const year = dt.getFullYear()
  const month = dt.getMonth() + 1
  const day = dt.getDate()

  if (type === 'obj') {
    return { year, month, day }
  }

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getCurrentDate() {
  const dt = new Date()
  return formatDate(dt, 'yyyy-MM-dd hh:mm:ss')
}

/**
 * 获取距离目标时间之后的时间
 * @param {Date} origin
 * @param {number} hour
 * @returns {Date}
 */
function getTimeInAFewHours(origin, hour) {
  const date = new Date(origin)
  date.setHours(date.getHours() + hour)
  return date
}

/**
 * 获取几天后的时间
 * @param {number} number
 * @returns {string}
 */
function aFewDayLater(number) {
  const date = new Date()
  date.setDate(date.getDate() + number)
  return date.toISOString().split('T')[0]
}

/**
 * 获取两个日期之间的天数差
 * @param {Date} dateInitial
 * @param {Date} dateFinal
 * @returns {number}
 */
function getDaysDiffBetweenDates(dateInitial, dateFinal) {
  return Math.floor((dateFinal - dateInitial) / (1000 * 3600 * 24))
}

/**
 * 判断当前时间是否在给定的时间范围内
 * @param {string} beginTime
 * @param {string} endTime
 * @returns {boolean}
 */
function belongTimeRange(beginTime, endTime) {
  const currentTime = Date.now()
  const start = new Date(beginTime).getTime()
  const end = new Date(endTime).getTime()
  return currentTime >= start && currentTime <= end
}

/**
 * 补零
 * @param {string} str
 * @returns {string}
 */
function dateAddZero(str) {
  return str.replace(/(?=\b\d\b)/g, '0')
}

/**
 * 判断日期是否在另一个日期之前
 * @param {Date} dateA
 * @param {Date} dateB
 * @returns {boolean}
 */
function isBeforeDate(dateA, dateB) {
  return dateA < dateB
}

/**
 * 判断日期是否在另一个日期之后
 * @param {Date} dateA
 * @param {Date} dateB
 * @returns {boolean}
 */
function isAfterDate(dateA, dateB) {
  return dateA > dateB
}

/**
 * 格式化时间
 * @param {Date} date
 * @returns {string}
 */
function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour
    .toString()
    .padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}

export {
  getTimestamp,
  formatDate,
  formatPassTime,
  formatRemainTime,
  dateDiff,
  getDate,
  getCurrentDate,
  getTimeInAFewHours,
  aFewDayLater,
  getDaysDiffBetweenDates,
  belongTimeRange,
  dateAddZero,
  isBeforeDate,
  isAfterDate,
  formatTime
}
