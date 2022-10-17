/**
 * 柯里化函数
 */
export const curry = (fn, ...args) => {
  // 函数的参数个数可以直接通过函数数的.length属性来访问
  if (fn.length === args.length) {
    // 传入的参数大于等于原始函数fn的参数个数，则直接执行该函数
    return fn.call(fn, ...args)
  }

  // 传入的参数小于原始函数fn的参数个数时
  // 则继续对当前函数进行柯里化，返回一个接受所有参数（当前参数和剩余参数）的函数
  return (...rest) => curry(fn, ...args, ...rest)
}
