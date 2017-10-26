const mayArray = require('map-array');

var obj = {
  'age':12,
  'name':'zhangsan'
}

console.log(mayArray(obj,(key,value)=>key+''+value));