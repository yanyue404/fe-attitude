//在obj中是否有key
var has = function(obj,key){
  return obj != null && hasOwnProperty.call(obj,key);
}

var nativeKeys = Object.keys;
//此对象包含函数与对象
var isObject = function(obj){

  var type = typeof(obj);
  return type === 'function' || type==='object'&& !!obj;

}


//获取所有对象的键
var keys = function (obj){
  if(!isObject(obj)) return [];
  if(nativeKeys){ return nativeKeys(obj)}
  var keys = [];
  for(var key in obj){
    if(has(obj,key)) keys.push(key);
  }
  return keys;

}


//将一个对象上的value放入到数组
var values = function(obj){
  var keys1 = keys(obj);
  var length = keys1.length;
  var values = Array(length);

  for(var i=0;i<length;i++){
    values[i]= obj[keys1[i]];
  }

  return values;

}

//
var pairs = function(obj){
  var keys2 = keys(obj);
  var length = keys2.length;
  var pairs = Array(length);
  for(var i=0;i<length;i++){
    pairs= [keys2[i],obj[keys2[i]]];
  }

  return pairs;
}