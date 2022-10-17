Function.prototype.before = function(beforefn) {
  var __self = this // 保存原函数的引用
  return function() {
    // 返回包含了原函数和新函数的"代理"函数
    beforefn.apply(this, arguments) // 执行新函数，且保证 this 不被劫持，新函数接受的参数
    // 也会被原封不动地传入原函数，新函数在原函数之前执行
    return __self.apply(this, arguments) // 执行原函数并返回原函数的执行结果，
    // 并且保证 this 不被劫持
  }
}
Function.prototype.after = function(afterfn) {
  var __self = this
  return function() {
    var ret = __self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return ret
  }
}
// 执行从右到左的功能组合 https://github.com/30-seconds/30-seconds-of-code#compose
// const compose = (...fns) => fns.reduce((f, g) => (...args) => f(g(...args)));
// 摘自 https://github.com/reduxjs/redux/blob/master/src/compose.js
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
// 摘自 https://github.com/30-seconds/30-seconds-of-code#composeright
// 执行从左到右的功能组合
const composeRight = (...fns) =>
  fns.reduce((f, g) => (...args) => g(f(...args)))

/**
 * 防抖 一定时间内连续调用只允许执行一次
 *
 * @param {*} func
 * @param {*} wait 等待时间
 * @param {*} immediate 传 true，首次调用即立即执行
 * @returns
 */
function debounce(func, wait, immediate) {
  var timeout
  return function() {
    var context = this
    var args = arguments
    if (timeout) clearTimeout(timeout)
    if (immediate) {
      var canApply = !timeout
      timeout = setTimeout(function() {
        timeout = null // 在 wait 时间后防抖函数才可以再次被触发
      }, wait)
      if (canApply) func.apply(context, args) // 第一次 !undefined 执行
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

function throttle(fn, gapTime = 1500) {
  let _lastTime = null
  // 返回新的函数
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}
/**
 * 只允许执行一次的 once 方法
 * @param {*} fn
 * @returns
 */
function once(fn) {
  return function() {
    if (typeof fn === 'function') {
      var ret = fn.apply(this, arguments)
      fn = null
      return ret
    } else {
      throw new TypeError('Expected a function')
    }
  }
}
