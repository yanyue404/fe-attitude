Function.prototype.callFn =
  Function.prototype.callFn ||
  function(context) {
    // 首先要获取调用call的函数，用this可以获取
    var context = context || window;
    context.fn = this;
    let args = [].slice.call(arguments, 1);
    const result = context.fn(...args);
    delete context.fn;
    return result;
  };
