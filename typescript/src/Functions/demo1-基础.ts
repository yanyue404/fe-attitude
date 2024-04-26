// 内联注解
function add(x: number, y: number) {
  return x + y
}

interface Foo {
  x: number
  y: number
}
// 接口注解
let myAdd = function(ParamObj: Foo) {
  return ParamObj.x + ParamObj.y
}
console.log(myAdd({ x: 10, y: 20 }))
