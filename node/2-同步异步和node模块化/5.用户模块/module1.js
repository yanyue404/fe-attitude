module.exports.username = '张三';
// module.exports = {
//   name: 'zs',
//   age: 12
// }
console.log('OKOK');

// 不能直接给 exports 赋值，否则在外部拿不到要导出的成员
exports = {
  name: 'zs',
  age: 12
}

// 模块向外暴露成员，永远以 module.exports 指向的对象为准
module.exports = exports;