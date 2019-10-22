// 原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。拓展：元组，枚举。。。


// # Boolean 布尔值
let isDone: boolean = false;


// # Number 数字
let decLiteral: number = 6;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;


// # String 字符串
let myName: string = 'Tom';
let myAge: number = 25;
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;


// # Array
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
let list3: Array<any> = [];


// # Tuple 元组类型

// 声明一个元组类型
let x: [string, number];
// Initialize it
x = ["hello", 10]; // OK
// Initialize it incorrectly
// x = [10, "hello"]; // Error


// # Enum 枚举类型

enum Color { Red, Green, Blue }
let c: Color = Color.Green;
// 空值

// # Any 任意类型

let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean

// # Void
// 可以用 void 表示没有任何返回值的函数
function alertName(): void {
  alert('My name is Tom');
}

// let unusable: void = undefined;
let unusable: void = undefined;

// # Null and Undefined

// undefined 类型的变量只能被赋值为 undefined，null 类型的变量只能被赋值为 null
let u: undefined = undefined;
let n: null = null;

// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：

// 这样不会报错,如果不启用 strict模式
// let num: number = undefined;
// 这样也不会报错
// 而 void 类型的变量不能赋值给 number 类型的变量：

// let u: void;
// let num: number = u;

// # Never

// # Object 
//object是一种表示非基本类型的类型，即任何不是数字，字符串，布尔值，符号，空值或未定义的东西。

// 使用对象类型，可以更好地表示Object.create等API。 例如：

declare function create(o: object | null): void;

create({ prop: 0 }); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error
// Type assertions


// 使用 let关键字

// 您可能已经注意到，到目前为止，我们一直在使用let关键字而不是您可能更熟悉的JavaScript的var关键字。 let关键字实际上是TypeScript提供的较新的JavaScript构造。 我们稍后会讨论细节，但是使用let可以减轻JavaScript中的许多常见问题，所以你应该尽可能使用它而不是var。