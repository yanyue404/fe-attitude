// Array isArray

function isArray(arr) {
  return Object
    .prototype
    .toString
    .call(arr) === '[object Array]'
}


//数组原型扩展remove方法
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
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
Array.prototype.isContains = function (e) {
  for (i = 0; i < this.length && this[i] != e; i++);
  return !(i == this.length);
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

function arrayIndex(element, array) {
  var index = array.indexOf(element);
  return index;
}

function delArrayByIndex(element, array) {
  var index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  }
}

// 去除重复的数据
function dedupe(client, hasher) {
  hasher = hasher || JSON.stringify

  const clone = []
  const lookup = {}

  for (let i = 0; i < client.length; i++) {
    let elem = client[i]  //数组元素
    let hashed = hasher(elem) //键



    if (!lookup[hashed]) {  //对象中没有键
      clone.push(elem)   //放到新数组
      lookup[hashed] = true //标识符
    }
  }

  return clone
}

// dedupe.test.js
/* var a=  [1,2,3,2];
var b = dedupe(a);
console.log(b)

var aaa = [{a: 2, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}]
var bbb = dedupe(aaa, value => value.a)  //只看元素的a键的值是否存在
console.log(bbb) */


//兼容IE8
if (!Array.prototype.indexOf){
  Array.prototype.indexOf = function(elt /*, from*/){
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++){
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}


