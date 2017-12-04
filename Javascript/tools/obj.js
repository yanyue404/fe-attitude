 // Object 在obj中是否有key
  
 function has(obj, key) {
  return obj != null && hasOwnProperty.call(obj, key);
}
//此对象包含函数与对象
function isObject(obj) {

  var type = typeof(obj);
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
