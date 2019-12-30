// 为什么需要泛型？在定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候指定其类型的一种特性
// 创建一个返回参数的函数
function identity(arg) {
    return arg;
}
function identity2(arg) {
    return arg;
}
// ”泛型函数”，调用有两种方式
var output1 = identity2('myString');
var output2 = identity2('myString'); // 类型推论”, 编译器会根据传入的参数类型自动确定 T 的类型
var learnTs = { id: 1, title: '学习 TS', isCompleted: false };
var Cook = { id: '2', title: '做晚饭', isCompleted: false };
