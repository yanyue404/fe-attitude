var util = {
  each: function(obj, callback) {
    var length,
      i = 0;
    if (this.isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    }

    return obj;
  },
};
/**
 *
 * @isArrayLike
 * @param {*} value
 * @returns Boolearn
 */
function isArrayLike(value) {
  return (
    value != null && typeof value != 'function' && this.isLength(value.length)
  );
}

/**
 * isContains
 * @param {*} arr
 * @param {*} current
 * @returns
 */
function isContains(arr, current) {
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
function arrayIndex(array, element) {
  var index = array.indexOf(element);
  return index;
}
// 数组最大值，最小值
function maxArr(arr) {
  return Math.max.apply(null, arr);
}

function minArr(arr) {
  return Math.min.apply(null, arr);
}
// 从数组中随机取出一个
function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

//去除数组中假值元素，比如undefined,null,0,"",NaN都是假值
function compact(arr) {
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

Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

function isArray(obj) {
  return (
    Object.prototype.toString
      .call(obj)
      .split(' ')[1]
      .slice(0, -1) === 'Array'
  );
}
// 将一组类数组转换为数组
function toArray(obj) {
  return Array.from ? Array.from(obj) : Array.prototype.slice.call(obj);
}

// 选择数组中的一个随机项
function arrRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 打乱数字数组的顺序
function randomArr(arr) {
  let temp = arr.sort(function() {
    return Math.random() - 0.5;
  });
  return temp;
}

/**
 * 数组对象根据某一个相同的键去重
 *
 * @param {*} arr
 * @param {*} name 去除所有数组子项与此key值重复项
 * @returns
 */
function uniqueArrayObj(arr, name) {
  var hash = {};
  return arr.reduce(function(item, next) {
    hash[next[name]] ? '' : (hash[next[name]] = true && item.push(next));
    return item;
  }, []);
}

function uniqueArray(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  return [...new set(arr)];
}

// 利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等
function uniqueArray2(arr) {
  '';
  if (!Array.isArray(arr)) {
    console.log('type error!');
    return;
  }
  return Array.prototype.filter.call(arr, function(item, index) {
    return arr.indexOf(item) === index;
  });
}
/**
 * 为数组添加新的自定义键值以及过滤每个子项的方法
 *
 * @param {*} arr
 * @param {*} obj { isShow:false,isStar:false} 第二个参数为 Function 时
 * @param {*} filterFn 第二个参数为 Object 时
 * @returns Array
 */
function addKey(sourceArray, extendObj, filterFn) {
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
// --------------------------------------- sort | filter----------------------------------------------

/**
 *
 * @param {*} arr
 * @param {*} props 数组子项排序的key
 * @param {*} type 默认正序，传 'desc`为倒序排列
 * @returns
 */
function sortBy(arr, props, type) {
  return arr.sort(function(a, b) {
    if (type === 'desc') {
      return b[props] - a[props];
    }
    return a[props] - b[props];
  });
}

// 根据 stick 排序，同时对每个数据处理
function sortByStick(arr, otherChoose) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i];
    item.stick === '1' ? newArr.push(item) && arr.splice(i, 1) && i-- : '';
    typeof otherChoose === 'function' ? otherChoose(item) : '';
  }
  return newArr.concat(arr);
}
