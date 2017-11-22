var dedupe = require('./dedupe');

var a=  [1,2,3,2];
var b = dedupe(a);
console.log(b)

var aaa = [{a: 2, b: 1}, {a: 1, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}]
var bbb = dedupe(aaa, value => value.a)  //只看元素的a键的值是否存在
console.log(bbb)