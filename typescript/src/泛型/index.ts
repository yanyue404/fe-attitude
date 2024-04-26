// 为什么需要泛型？在定义函数、接口或类的时候，不预先指定具体的类型，而是在使用的时候指定其类型的一种特性

// 创建一个返回参数的函数
function identity(arg: any): any {
  return arg
}

function identity2<T>(arg: T): T {
  return arg
}
// ”泛型函数”，调用有两种方式
let output1 = identity2<string>('myString')
let output2 = identity2('myString') // 类型推论”, 编译器会根据传入的参数类型自动确定 T 的类型

// 泛型接口
interface TODO<T> {
  id: T
  title: string
  isCompleted: boolean
}

let learnTs: TODO<number> = { id: 1, title: '学习 TS', isCompleted: false }
let Cook: TODO<string> = { id: '2', title: '做晚饭', isCompleted: false }

type SuccessResponse<T> = {
  code: number
  data: T
  message: string
}

type ErrorResponse<T> = {
  code: number
  data: T
  message: string
}

// 定义接口的时候指定泛型
interface KeyValue<T, U> {
  key: T
  value: U
}

const person1: KeyValue<string, number> = {
  key: '树哥',
  value: 18
}
const person2: KeyValue<number, string> = {
  key: 20,
  value: '张麻子'
}

// 泛型推导

function merge<T, U>(a: T, b: U): T & U {
  return { ...a, ...b }
}

const u1 = {
  name: 'hello'
}

const u2 = {
  sex: 1
}

const u3 = merge<typeof u1, typeof u2>(u1, u2)

// 简写
const u4 = merge(u1, u2)

// 实现一个 pick 方法

function pick<T, U extends keyof T>(data: T, keys: U[]): { [K in U]: T[K] } {
  const temp: any = {}
  for (const key of keys) {
    temp[key] = data[key]
  }

  return temp
}

// 上面代码中定义了两个范型T和U，T表示对象，U被限定为T的属性名(U extends keyof T)，返回值的类型为{[K in U]: T[K]}，in的作用就是遍历U这个数组。

const user = {
  name: 'tom',
  age: 18
}

const userC = pick(user, ['name']) //  {"name": "tom"}

// 泛型工具类型

//* typeof 除了做类型保护，还可以从实现推出类型，

//先定义变量，再定义类型
let pp1 = {
  name: '树哥',
  age: 18,
  gender: 'male'
}

type People = typeof pp1

function getName(p: People): string {
  return p.name
}
getName(pp1)

// * keyof 可以用来获取一个对象接口中的所有 key 值

interface Person {
  name: string
  age: number
  gender: 'male' | 'female'
}

type PersonKey = keyof Person //type PersonKey = 'name'|'age'|'gender';

function getValueByKey(p: Person, key: PersonKey) {
  return p[key]
}
let val = getValueByKey({ name: '树哥', age: 18, gender: 'male' }, 'name')
console.log(val) // 树哥

// * in 用来遍历枚举类型：

type Keys = 'a' | 'b' | 'c'

type Obj = {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }

// * infer 在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。
// infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

type ReturnType1<T> = T extends (...args: any[]) => infer R ? R : any

// * extends 有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

interface Lengthwise {
  length: number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}

// 现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

// loggingIdentity(3) // Error, number doesn't have a .length property

// 当我们传入合法的类型的值，即包含 length 属性的值时：

loggingIdentity({ length: 10, name: '张麻子' }) // 编译正确
