// 对象类型类型：
// # Array
let list: number[] = [1, 2, 3];
let fruits: string[] = [];
let list2: Array<number> = [1, 2, 3];
let list3: Array<any> = [];
let numbers: (number | string)[] = [1, 2, 3, 4, '5'];

// object表示非原始类型, 也就是除number/ ss/ boolean/ symbol/ null/ undefined之外的类型:
let obj1: object = [];
let obj2: object = { a: 1, b: 2 };
