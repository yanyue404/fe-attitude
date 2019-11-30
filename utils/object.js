const keyList = Object.keys;
const hasProp = Object.prototype.hasOwnProperty;

function mergeObjects(obj1, obj2) {
  const result = Object.assign({}, obj1);
  if (isObject(obj1) && isObject(obj2)) {
    for (const p in obj2) {
      if (isObject(obj1[p]) && isObject(obj2[p])) {
        result[p] = mergeObjects(obj1[p], obj2[p]);
      } else {
        result[p] = obj2[p];
      }
    }
  }
  return result;
}
/**
 * Object 在obj中是否有key
 *
 * @param {*} obj
 * @param {*} key
 * @returns
 */
function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}
function shallowCopy(obj) {
  // 只拷贝对象
  if (typeof obj !== 'object') return;
  // 根据obj的类型判断是新建一个数组还是对象
  var newObj = obj instanceof Array ? [] : {};
  // 遍历obj，并且判断是obj的属性才拷贝
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
// 对象深度克隆，支持[]和{}
// 在拷贝的时候判断一下属性值的类型，如果是对象，我们就递归调用深拷贝函数
function deepCopy(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}

/**
 * 获取所有对象的键放入到数组中
 *
 * @param {*} obj
 * @returns
 */
function keys(obj) {
  var nativeKeys = Object.keys;
  if (!isObject(obj)) return [];
  if (nativeKeys) {
    return nativeKeys(obj);
  }
  var keys = [];
  for (var key in obj) {
    if (has(obj, key)) keys.push(key);
  }
  return keys;
}

/**
 * 将一个对象的值放入到数组中
 *
 * @param {*} obj
 * @returns
 */
function values(obj) {
  var keys1 = keys(obj),
    length = keys1.length,
    values = Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = obj[keys1[i]];
  }
  return values;
}

/**
 * 把一个对象转变为一个[key, value]形式的数组
 *
 * @param {*} obj
 * @returns
 */
function pairs(obj) {
  var keys2 = keys(obj);
  var length = keys2.length;
  var pairs = Array(length);
  for (var i = 0; i < length; i++) {
    pairs = [keys2[i], obj[keys2[i]]];
  }
  return pairs;
}
