Function.prototype.bindFn =
  Function.prototype.bindFn ||
  function(context) {
    if (typeof this !== 'function') {
      throw new TypeError(
        'Function.prototype.bindFn - what is trying to be bound is not callable',
      );
    }
    var thatFunc = this;
    // 获取 bind 函数从第二个参数到最后一个参数
    var argsArray = Array.prototype.slice.call(arguments, 1);
    return function F() {
      // 这个时候的arguments是指bind返回的函数传入的参数

      if (this instanceof F) {
        return new thatFunc(...argsArray, ...arguments);
      }

      let innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = argsArray.concat(innerArgs);
      return thatFunc.apply(context, finalArgs);
    };
  };
