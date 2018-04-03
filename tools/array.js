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
//兼容IE8
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (elt /*, from*/) {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
      ? Math.ceil(from)
      : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++) {
      if (from in this && this[from] === elt)
        return from;
    }
    return -1;
  };
}

Array.prototype.remove = function (val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};
// 判断数组里是否有某个元素

Array.prototype.isContains = function (e) {
  for (i = 0; i < this.length && this[i] != e; i++);
  return !(i == this.length);
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
// 得到n1-n2下标的数组
//getArrayNum([0,1,2,3,4,5,6,7,8,9],5,9)
//[5, 6, 7, 8, 9]

//getArrayNum([0,1,2,3,4,5,6,7,8,9],2) 不传第二个参数,默认返回从n1到数组结束的元素
//[2, 3, 4, 5, 6, 7, 8, 9]
function getArrayNum(arr,n1,n2){
  var arr1=[],len=n2||arr.length-1;
  for(var i=n1;i<=len;i++){
      arr1.push(arr[i])
  }
  return arr1;
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
// 数组最大值，最小值
function maxArr(arr){
  return Math.max.apply(null,arr);
}
function minArr(arr){
  return Math.min.apply(null,arr);
}
//randomOne([1,2,3,6,8,5,4,2,6])
//2
//randomOne([1,2,3,6,8,5,4,2,6])
//8
//randomOne([1,2,3,6,8,5,4,2,6])
//8
//randomOne([1,2,3,6,8,5,4,2,6])
//1
function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 筛选数组
//删除值为'val'的数组元素
//removeArrayForValue(['test','test1','test2','test','aaa'],'test','%')
//["aaa"]   带有'test'的都删除
    
//removeArrayForValue(['test','test1','test2','test','aaa'],'test')
//["test1", "test2", "aaa"]  //数组元素的值全等于'test'才被删除
function removeArrayForValue(arr,val,type){
  return arr.filter(function (item) {
      return type? item.indexOf(val) === -1 : item !== val
  })
}




