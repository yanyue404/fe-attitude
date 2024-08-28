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
export function compose(...funcs) {
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
export const composeRight = (...fns) => fns.reduce((f, g) => (...args) => g(f(...args)))

/**
 * 防抖 一定时间内连续调用只允许执行一次
 *
 * @param {*} func
 * @param {*} wait 等待时间
 * @param {*} immediate 传 true，首次调用即立即执行
 * @returns
 */
export function debounce(func, wait, immediate) {
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

export function throttle(fn, gapTime = 1500) {
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
export function once(fn) {
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

// 尝试使用提供的参数调用函数，返回结果或捕获的错误对象。
// 示例
/* var elements = attempt(function(selector) {
  return document.querySelectorAll(selector);
}, '>_>');
if (elements instanceof Error) elements = []; // elements = [] */

export const attempt = (fn, ...args) => {
  try {
    return fn(...args)
  } catch (e) {
    return e instanceof Error ? e : new Error(e)
  }
}

// 创建一个使用给定上下文调用 fn 的函数，可以选择将任何其他提供的参数添加到参数的开头。
/* function greet(greeting, punctuation) {
  return greeting + ' ' + this.user + punctuation;
}
const freddy = { user: 'fred' };
const freddyBound = bind(greet, freddy);
console.log(freddyBound('hi', '!')); // 'hi fred!' */
export const bind = (fn, context, ...boundArgs) => (...args) => fn.apply(context, [...boundArgs, ...args])

// 链式异步函数。
// 循环遍历包含异步事件的函数数组，在每个异步事件完成时调用 next。

/* chainAsync([
  next => {
    console.log('0 seconds')
    setTimeout(next, 1000)
  },
  next => {
    console.log('1 second')
    setTimeout(next, 1000)
  },
  () => {
    console.log('2 second')
  }
]) */
export const chainAsync = fns => {
  let curr = 0
  const last = fns[fns.length - 1]
  const next = () => {
    const fn = fns[curr++]
    fn === last ? fn() : fn(next)
  }
  next()
}

// 函数柯里化
// curry(Math.pow)(2)(10) // 1024
// curry(Math.min, 3)(10)(50)(2) // 2
export const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args)

// 运行承诺系列
export const runPromisesInSeries = ps => ps.reduce((p, next) => p.then(next), Promise.resolve());