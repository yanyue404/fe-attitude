// Array isArray

function isArray(arr) {
  return Object
    .prototype
    .toString
    .call(arr) === '[object Array]'
}

// 是否为类数组对象

property = function (key) {
  return function (obj) {
    return obj === null
      ? void 0
      : obj[key];
  }
}
var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
var getLength = property('length');
function isArrayLike(collection) {
  var length = getLength(collection);

  return typeof length == 'number' && length > 0 && length <= MAX_ARRAY_INDEX;
}

// 判断数组里是否有某个元素

function isIncluded(element, array) {
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i] == element) {
      return true;
    }
  }
  return false;
}

// 是否排序

function defaultComparator(a, b) {
  return a - b
}

function isorted(array, comparator) {

  comparator = comparator || defaultComparator;
  for (var i = 1; i < array.length; ++i) {
    if (comparator(array[i - 1], array[i]) > 0) 
      return false
  }

  return true
}

 // 将一组值转换为数组
 function arrayOf() {
  return []
      .slice
      .call(arguments);
};
//去除数组中假值元素，比如undefined,null,0,"",NaN都是假值
function compact(arr) {
  var index = -1,
      resIndex = -1,
      result = [],
      len = arr
          ? arr.length
          : 0;
  while (++index < len) {
      var value = arr[index];
      if (value) {
          result[++resIndex] = value;
      }
  }
  return result;
};

