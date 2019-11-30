var Event = (function() {
  var clientList = {},
    pub,
    sub,
    remove;

  var cached = {};

  sub = function(key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    // 使用缓存执行的订阅不用多次调用执行
    cached[key + 'time'] == undefined ? clientList[key].push(fn) : '';
    if (cached[key] instanceof Array) {
      //说明有缓存的 可以执行
      fn.apply(null, cached[key]);
      cached[key + 'time'] = 'XIAOYUEYUE';
    }
  };
  pub = function() {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      //初始默认缓存
      cached[key] = Array.prototype.slice.call(arguments, 0);
      return false;
    }

    for (var i = 0, fn; (fn = fns[i++]); ) {
      // 再次发布更新缓存中的 data 参数
      cached[key + 'time'] != undefined
        ? (cached[key] = Array.prototype.slice.call(arguments, 0))
        : '';
      fn.apply(this, arguments);
    }
  };
  remove = function(key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };
  return {
    pub: pub,
    sub: sub,
    remove: remove,
  };
})();
