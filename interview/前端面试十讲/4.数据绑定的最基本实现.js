// 有一个全局变量 a，有一个全局函数 b，实现一个方法bindData，执行后，a的任何赋值都会触发b的执行。
var a = {
  id: 1,
};

function b() {
  console.log('a 的值发生改变, ' + a.id);
}

bindData(a, b);

a.id = 2;

function bindData(target, event) {
  for (var key in target) {
    if (target.hasOwnProperty(key)) {
      (function() {
        var v = target[key];
        Object.defineProperty(target, key, {
          get: function() {
            return v;
          },
          set: function(_value) {
            v = _value;
            event.call(this);
          },
        });
      })();
    }
  }
}
