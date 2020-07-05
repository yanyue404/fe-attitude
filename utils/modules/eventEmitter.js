class EventEmitter {
  constructor() {
    this._cache = {};
  }
  // 绑定
  $on(type, callback) {
    if (this._cache[type]) {
      this._cache[type].push(callback);
    } else {
      this._cache[type] = [callback];
    }
    return this;
  }
  // 触发
  $emit(type, data) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
        fn(data);
      });
    }
    return this;
  }
  // 解绑
  $off(type, callback) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      this._cache[type] = fns.filter(event => {
        return event !== callback;
      });
    }
    return this;
  }
  $once(type, callback) {
    let that = this;
    function func() {
      var args = Array.prototype.slice.call(arguments, 0);
      callback.apply(that, args);
      that.$off(type, func);
    }
    this.$on(type, func);
  }
}

var Event = new EventEmitter();

Event.$once('addAddress', function(detail) {
  console.log(detail);
});

Event.$emit('addAddress', {
  location: '北京',
  longitude: '116°20′',
  latitude: '39°56′',
});

Event.$on('once', function(detail) {
  console.log(detail);
});

Event.$emit('once', {
  content: '我希望只能执行一次',
});
Event.$emit('once', {
  content: '我希望只能执行一次',
});
Event.$emit('once', {
  content: '我希望只能执行一次',
});
