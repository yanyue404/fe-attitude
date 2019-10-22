/**
 * 
 * @param {array} ary 创建节点时需要用到的数据 
 * @param {*} fn 创建节点逻辑的函数
 * @param {*} count 每一批创建的节点数量
 */
var timeChunk = function (ary, fn, count) {
  var obj,
    t;
  var len = ary.length;
  var start = function () {
    for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
      var obj = ary.shift();
      fn(obj);
    }
  };
  return function () {
    t = setInterval(function () {
      if (ary.length === 0) { // 如果全部节点都已经被创建好
        return clearInterval(t);
      }
      start();
    }, 200); // 分批执行的时间间隔，也可以用参数的形式传入
  };
};