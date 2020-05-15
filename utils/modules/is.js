// 是否已定义
export function isDefined(val) {
  return val !== undefined && val !== null;
}
export function isFunction(val) {
  return typeof val === 'function';
}

export function isString(obj) {
  return Object.prototype.toString.call(obj) === '[object String]';
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
}
