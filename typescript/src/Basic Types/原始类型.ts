// 原始数据类型包括：布尔值、数值、字符串、null、undefined

// # Boolean 布尔值
let isDone: boolean = false;

// # Number 数字
let decLiteral: number = 6;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;

// # String 字符串
let myName: string = 'Tom';
let sentence: string = `Hello, my name is ${myName}`;

// # Null and Undefined
// undefined 和 null 是所有类型的子类型
let u: undefined = undefined;
let n: null = null;

// 这样不会报错
let num2: number = undefined;

// 非字面量
const num3: Number = Number(123);
const s: String = new String('456');
