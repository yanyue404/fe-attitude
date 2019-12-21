// 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。拓展：元组，枚举。。。
// # Boolean 布尔值
var isDone = false;
// # Number 数字
var decLiteral = 6;
var notANumber = NaN;
var infinityNumber = Infinity;
// # String 字符串
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello, my name is " + myName + ".\nI'll be " + (myAge + 1) + " years old next month.";
// # Array
var list = [1, 2, 3];
var list2 = [1, 2, 3];
var list3 = [];
// # Tuple 元组类型
// 声明一个元组类型
var x;
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"]; // Error
// # Enum 枚举类型
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
// 空值
// # Any 任意类型
var notSure = 4;
notSure = 'maybe a string instead';
notSure = false; // okay, definitely a boolean
// # Void
// 可以用 void 表示没有任何返回值的函数
function alertName() {
    alert('My name is Tom');
}
// let unusable: void = undefined;
var unusable = undefined;
// # Null and Undefined
// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
var u = undefined;
var n = null;
create({ prop: 0 }); // OK
create(null); // OK
// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error
// Type assertions
// 使用 let关键字
// 您可能已经注意到，到目前为止，我们一直在使用let关键字而不是您可能更熟悉的JavaScript的var关键字。 let关键字实际上是TypeScript提供的较新的JavaScript构造。 我们稍后会讨论细节，但是使用let可以减轻JavaScript中的许多常见问题，所以你应该尽可能使用它而不是var。
