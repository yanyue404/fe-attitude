/**
 *
 * @isArrayLike
 * @param {*} value
 * @returns Boolearn
 */
export function isArrayLike(value) {
  return (
    value != null && typeof value != 'function' && this.isLength(value.length)
  );
}

export function isArray(obj) {
  return (
    Object.prototype.toString
      .call(obj)
      .split(' ')[1]
      .slice(0, -1) === 'Array'
  );
}

// 将一组类数组转换为数组
export function toArray(obj) {
  return Array.from ? Array.from(obj) : Array.prototype.slice.call(obj);
}

/**
 * isContains
 * @param {*} arr
 * @param {*} current
 * @returns
 */
export function isContains(arr, current) {
  if (Array.prototype.includes) {
    return arr.includes(current);
  }
  for (i = 0; i < arr.length && arr[i] != current; i++);
  return !(i == arr.length);
}

/**
 * arrayIndex
 * @param {*} array
 * @param {*} element
 * @returns
 */
export function arrayIndex(array, element) {
  var index = array.indexOf(element);
  return index;
}

// 从数组中随机取出一个
export function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//去除数组中假值元素，比如undefined,null,0,"",NaN都是假值
export function compact(arr) {
  var index = -1,
    resIndex = -1,
    result = [],
    len = arr ? arr.length : 0;
  while (++index < len) {
    var value = arr[index];
    if (value) {
      result[++resIndex] = value;
    }
  }
  return result;
}

/**
 * 数组对象根据某一个相同的键去重
 *
 * @param {*} arr
 * @param {*} name 去除所有数组子项与此key值重复项
 * @returns
 */
export function uniqueArrayObj(arr, name) {
  var hash = {};
  return arr.reduce(function(item, next) {
    hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next));
    return item;
  }, []);
}

export function uniqueArray(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Param must be Array type.');
  }
  try {
    return [...new set(arr)];
  } catch (error) {
    return Array.prototype.filter.call(arr, function(item, index) {
      return arr.indexOf(item) === index;
    });
  }
}

/**
 * 为数组添加新的自定义键值以及过滤每个子项的方法
 *
 * @param {*} arr
 * @param {*} obj { isShow:false,isStar:false} 第二个参数为 Function 时
 * @param {*} filterFn 第二个参数为 Object 时
 * @returns Array
 */
export function addKey(sourceArray, extendObj, filterFn) {
  var getType = function(a) {
    var typeArray = Object.prototype.toString.call(a).split(' ');
    return typeArray[1].slice(0, -1);
  };
  var secondParamType = getType(arguments[1]);

  if (!getType(sourceArray) == 'Array') {
    throw new Error('第一个参数必须为数组类型');
  }
  if (secondParamType === 'Object') {
    return sourceArray.forEach((v, index, sourceArray) => {
      for (var key in extendObj) {
        v[key] = extendObj[key];
      }
      typeof filterFn === 'function' ? filterFn(v, index, sourceArray) : '';
    });
  } else if (secondParamType === 'Function') {
    return sourceArray.forEach((v, index, sourceArray) => {
      typeof arguments[1] === 'function'
        ? arguments[1](v, index, sourceArray)
        : '';
    });
  } else {
    return sourceArray;
  }
}

/**
 *
 * @param {*} arr
 * @param {*} props 数组子项排序的key
 * @param {*} type 默认正序，传 'desc`为倒序排列
 * @returns
 */
export function sortBy(arr, props, type) {
  return arr.sort(function(a, b) {
    if (type === 'desc') {
      return b[props] - a[props];
    }
    return a[props] - b[props];
  });
}

export default {
  isArrayLike,
  isArray,
  toArray,
  isContains,
  arrayIndex,
  randomOne,
  compact,
  uniqueArrayObj,
  uniqueArray,
  addKey,
  sortBy,
};
