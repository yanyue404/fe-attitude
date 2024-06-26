Function.prototype.applyFn =
  Function.prototype.applyFn ||
  function(context) {
    var context = context || window,
      result;
    context.fn = this;
    // 如果存在第二个数组参数，就展开
    if (!arguments[1]) {
      result = context.fn();
    } else {
      result = context.fn(...arguments[1]);
    }

    return result;
  };
