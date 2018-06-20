// Object 在obj中是否有key

function has(obj, key) {
    return obj != null && hasOwnProperty.call(obj, key);
}
//此对象包含函数与对象
function isObject(obj) {

    var type = typeof (obj);
    return type === 'function' || type === 'object' && !!obj;

}

// 获取所有对象的键(属性名)放入到数组中

function keys(obj) {
    var nativeKeys = Object.keys;
    if (!isObject(obj))
        return [];
    if (nativeKeys) {
        return nativeKeys(obj)
    }
    var keys = [];
    for (var key in obj) {
        if (has(obj, key))
            keys.push(key);
    }
    return keys;

}

//  将一个对象的value放入到数组中

function values(obj) {
    var keys1 = keys(obj),
        length = keys1.length,
        values = Array(length);

    for (var i = 0; i < length; i++) {
        values[i] = obj[keys1[i]];
    }

    return values;

}
// 把一个对象转变为一个[key, value]形式的数组

function pairs(obj) {
    var keys2 = keys(obj);
    var length = keys2.length;
    var pairs = Array(length);
    for (var i = 0; i < length; i++) {
        pairs = [
            keys2[i],
            obj[keys2[i]]
        ];
    }

    return pairs;
}

// obj转化为字符串 password=1&sid=1&username=12&
function signParam(obj) {
    var arr = [];
    for (key in obj) {
        arr.push(key);
    };
    arr.sort();
    var objSign = '';
    for (var i = 0; i < arr.length; i++) {
        i < arr.length - 1 ? objSign += arr[i] + '=' + obj[arr[i]] + '&' : objSign += arr[i] + '=' + obj[arr[i]];
    }
    return objSign;
}
// 对象深度克隆，支持[]和{}
Object.prototype.clone = function () {
    var obj = this;
    if (typeof obj !== 'object') return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = typeof obj[key] === 'object' ? (obj[key]).clone() : obj[key];
      }
    }
    return newObj;
  }
/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
function deepClone(values) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || "object" != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy values! Its type isn't supported.");
}

