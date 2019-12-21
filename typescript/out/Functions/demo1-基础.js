// 内联注解
function add(x, y) {
    return x + y;
}
// 接口注解
var myAdd = function (ParamObj) {
    return ParamObj.x + ParamObj.y;
};
console.log(myAdd({ x: 10, y: 20 }));
