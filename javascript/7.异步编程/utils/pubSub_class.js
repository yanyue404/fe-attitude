class Event {
  constructor() {
    this._cache = {};
  }
  on(type, fn) {
    if (!this._cache[type]) {
      this._cache[type] = [];
    }
    this._cache[type].push(fn);
    return this;
  }
  emmit(type, params) {
    if (Array.isArray(this._cache[type])) {
      this._cache[type].forEach(fn => {
        fn.apply(null, [params]);
      });
    }
    return this;
  }
  off(type, fn) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      if (fn) {
        let index = fns.indexOf(fn);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      } else {
        fns.length = 0;
      }
    }
    return this;
  }
}
