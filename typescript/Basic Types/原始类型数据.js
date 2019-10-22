"use strict";
// 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。
//  布尔值
var isDone = false;
// 数字
var decLiteral = 6;
var notANumber = NaN;
var infinityNumber = Infinity;
// 字符串
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
// Array
var list = [1, 2, 3];
var list2 = [1, 2, 3];
// 空值
// 可以用 void 表示没有任何返回值的函数
function alertName() {
    alert('My name is Tom');
}
// let unusable: void = undefined;
var unusable = undefined;
// Null 和 Undefined
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
var u = undefined;
var n = null;
// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：
// 这样不会报错,如果不启用 strict模式
var num = undefined;
// 这样也不会报错
// 而 void 类型的变量不能赋值给 number 类型的变量：
// let u: void;
// let num: number = u;
