export function mergeObject(obj1, obj2, newObject) {
  const wrap = newObject || obj1;
  const keys = new Set(Object.keys(obj1).concat(Object.keys(obj2)));
  keys.forEach(key => {
    if (!(key in obj1)) {
      wrap[key] = obj2[key];
    } else if (!(key in obj2)) {
      wrap[key] = obj1[key];
    } else if (obj2[key] && obj2[key].constructor === Object) {
      wrap[key] = mergeObject(obj1[key], obj2[key]);
    } else {
      wrap[key] = obj2[key];
    }
  });

  return wrap;
}

// 对象类型深比较（递归遍历）
export function isEqual(obj, obj2, option = {}) {
  if (!obj || !obj2) {
    return obj === obj2;
  }
  if (Object.keys(obj).length !== Object.keys(obj2).length) return false;
  const ignores = option.ignores || [];
  const keys = [...new Set(Object.keys(obj).concat(Object.keys(obj2)))];

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    if (!ignores.includes(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (!isEqual(obj[key], obj2[key], option)) {
          return false;
        }
      } else if (obj[key] !== obj2[key]) {
        return false;
      }
    }
  }
  return true;
}
// var object = { 'a': [{ 'b': { 'c': 3 } }] };

// _.get(object, 'a[0].b.c');
// => 3
function get(obj, href) {
  if (href.indexOf('.') === -1) {
    return obj[href];
  }
  if (href.indexOf('.') !== -1) {
    let hrefStr = href.split('.');
    return getObjectValue(obj[hrefStr[0]], hrefStr.slice(1).join('.'));
  }
}

export default { hasOwn, deepCopy, only, omit, isEqual, mergeObject };
