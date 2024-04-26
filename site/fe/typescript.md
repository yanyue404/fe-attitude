## 为什么要使用 TypeScript ? TypeScript 相对于 JavaScript 的优势是什么？

**为什么要使用 Typescript？**

在没有  `Typescript`  以前，大部分项目都是使用原生  `Javascript`  开发。而  `Javascript`  天生是一门"灵活"的语言。所谓所谓"灵活"，表现在：

- 它没有类型约束，一个变量可能初始化时是字符串，过一会儿又被赋值为数字。
- 由于隐式类型转换的存在，有的变量的类型很难在运行前就确定，也可以做一些神奇的操作
- 基于原型的面向对象编程，使得原型上的属性或方法可以在运行时被修改
- 函数是 JavaScript 中的一等公民，可以赋值给变量，也可以当作参数或返回值

而这些灵活通常导致了 JavaScript 代码的肆无忌惮，比如拿数字和数组做求和运算，给函数传入不符合预期的参数等等而这些显而易见的问题编码阶段不会有任何错误提示。

```js
// 数字和数组做求和运算
const number = 1
const arr = [1, 2, 3]
console.log(number + arr)

// 传入不符合预期的参数
function pow2(value) {
  return Math.pow(value, 2)
}
pow2('sister')
```

在大型项目中，一个类型"小改动"可能会导致很多处代码需要跟着调整，而这些需要调整的地方在"小改动"前后可能不会有任何报错提示，开发者只能靠肉眼排查，很难且容易遗漏。

我们使用  `Typescript`  的主要目的就是【类型安全】（type-safe），借助类型声明避免程序做错误的事情。

```js
const number = 1
const arr = [1, 2, 3]
console.log(number + arr)
// 运算符"+"不能应用于类型"number"和"number[]"。

function pow(value: number) {
  return Math.pow(value, 2)
}
pow('sister')
// 类型"string"的参数不能赋给类型"number"的参数。
```

下图是某错误处理平台收集统计的 JavaScript Top10 错误，其中 7 个 TypeError，1 个 ReferenceError：

[![top10_javascript_error](https://camo.githubusercontent.com/5ef2cb627cca5c8992cfe73a549df8029ee87d2aa9a9dd0cb1023c7fddbe98ad/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303231303830333036333630342e6a706567)](https://camo.githubusercontent.com/5ef2cb627cca5c8992cfe73a549df8029ee87d2aa9a9dd0cb1023c7fddbe98ad/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303231303830333036333630342e6a706567)

而这 8 种问题，我们都能用 TypeScript 在编码早期及时应对

**TypeScript 相对于 JavaScript 的优势是什么？**

#### 1\. TypeScript 是添加了类型系统的 JavaScript，适用于任何规模的项目，增加了代码的可读性和可维护性

尤其是在第三方开源库中（例如组件库），类型系统尤为重要，现在很多项目都是用 TypeScript 写的，如果依赖的库没有 TypeScript 声明，在调用时就会传递大量类型为 any 的值，最终影响项目自身使用 TypeScript 应该获得的价值（强类型推导）。

因此在开发设计第三方库时，大都会使用 TypeScript 声明。一个库如果足够热门的话，你不做 TypeScript 声明也会有热心用户做一个发布出来的。

#### 2\. TypeScript 是一门静态类型、弱类型的语言，它是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性

类型系统按照「类型检查的时机」来分类，可以分为：

- 动态类型：在运行时才会进行类型检查，往往会导致运行时错误
- 静态类型：指编译阶段就能确定每个变量的类型，往往会导致语法错误

JavaScript 就是一门解释型语言，没有编译阶段，所以它是动态类型：

```js
let foo = 1
foo.split(' ')
// Uncaught TypeError: foo.split is not a function
// 运行时会报错（foo.split 不是一个函数），造成线上 bug
```

TypeScript 在运行前需要先编译为 JavaScript，而在编译阶段就会进行类型检查，所以  TypeScript 是静态类型，这段 TypeScript 代码在编译阶段就会报错了：

```js
let foo = 1
foo.split(' ')
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

另外，得益于 TypeScript 强大的   类型推论，上面的代码并没有手动声明变量  `foo`  的类型，但在变量初始化时自动推论出它是一个  `number`  类型：

```js
let foo: number = 1
foo.split(' ')
// Property 'split' does not exist on type 'number'.
// 编译时会报错（数字没有 split 方法），无法通过编译
```

以下这段代码不管是在 JavaScript 中还是在 TypeScript 中都是可以正常运行的

```js
console.log(1 + '2')
// 打印出字符串 '12'
```

所以，TypeScript 是完全兼容 JavaScript 的，它不会修改 JavaScript 运行时的特性，所以它们都是弱类型

#### 3\. TypeScript 增强了编辑器（IDE）的功能，提供了代码补全、接口提示、跳转到定义、代码重构等能力

TypeScript 增强了编辑器（IDE）的功能，包括代码补全、接口提示、跳转到定义、代码重构等，这在很大程度上提高了开发效率。给开发 TypeScript 项目、中小型项目中迁移 TypeScript 提供了便捷

#### 4\. TypeScript 与标准同步发展，符合最新的 ECMAScript 标准（stage 3）

TypeScript 坚持与 ECMAScript 标准同步发展，并推进了很多 ECMAScript 语法提案，比如可选链操作符（`?.`）、空值合并操作符（`??`）、Throw 表达式、正则匹配索引等

#### 5\. TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript

在老 JavaScript 项目中，如果你想使用 TypeScript，可以使用 TypeScript 编写新文件，老的 JavaScript 文件可以继续使用

## typescript 的数据类型有哪些？

## 对 TypeScript 中接口的理解？应用场景？

- https://vue3js.cn/interview/typescript/interface.html

## 对 TypeScript 中类的理解？应用场景？

## 对 TypeScript 中函数的理解？与 JavaScript 函数的区别？

## 对 TypeScript 中泛型的理解？应用场景？

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

比如 Vue3 的 [ref](https://cn.vuejs.org/guide/typescript/composition-api.html#typing-ref) 的类型属性就是泛型:

```ts
function ref<T>(value: T): Ref<UnwrapRef<T>>

interface Ref<T> {
  value: T
}
```

有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 Ref 这个类型：

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！
```

或者，在调用 ref() 时传入一个泛型参数，来覆盖默认的推导行为：

```ts
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
```

如果你指定了一个泛型参数但没有给出初始值，那么最后得到的就将是一个包含 undefined 的联合类型：

```ts
// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()
```

TODO: 使用方式及应用场景

## any、never、unknown 和 void 有什么区别？

![](https://camo.githubusercontent.com/d7a34d6ec94282d47a4b807ee1a8593fbdc51468f045f5c11741d4d8ab662db6/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303231303831303037353232382e706e67)

### any

`any`  类型用于描述一个我们根本不知道类型的变量，或者说可以是任意类型的变量，不作任何约束，编译时会跳过对其的类型检查

```ts
let notSure: any

// 可以被赋值任意类型
notSure = 'sisterAn!'
notSure = 512
notSure = { hello: () => 'Hello sisterAn!' }

// 它也兼容任何类型
let num: number = 12
notSure = num
num = notSure
```

### unknown

`unknown`  表示未知类型，即写代码的时候还不知道具体会是怎样的数据类型，是  `typescript 3.0`  中引入的新类型，  与  `any`  类似，所有类型都可以分配给`unknown`  类型

```ts
let notSure: unknown = 'sisterAn!'

// 可以被赋值任意类型
notSure = 'sisterAn!'
notSure = 512
notSure = { hello: () => 'Hello sisterAn!' }
```

但与  `any`  不同的是， `unknown`  类型的变量不允许被  `any`  或  `unknown`  以外的变量赋值，也不允许执行  `unknown`  类型变量的方法

```ts
let notSure: unknown = 'sisterAn'
let notSure1: unknown = 'Hello'
let any1: any = 12
let num: number = 12

notSure = notSure1
notSure = any1

num = notSure
// error: Type 'unknown' is not assignable to type 'number'.

notSure.toLowerCase()
// error: Object is of type 'unknown'.
```

这种限制有很强的防御性，但如果我们要对未知类型执行某些操作，也不是没有办法

#### 方式一：使用类型断言缩小未知范围

```ts
let notSure: unknown = 'sisterAn'

console.log((notSure as string).toLowerCase())
```

#### 方式二：使用类型守卫进行类型收缩

```ts
let notSure: unknown = 'sisterAn'

if (typeof notSure === 'string') {
  console.log((notSure as string).toLowerCase())
}
// 或使用 instanceof 来缩小变量的类型
```

我们仅在  `notSure`  为  `string`  类型时，才执行  `toLowerCase`  方法，TypeScript 编译器会理解这一点，并假设类型

### never

`never` ，永不存在的值的类型，是  typescript 2.0  中引入的新类型，那什么是永不存在的类型，我们知道变量一旦声明，都会默认初始化为  `undefined` ，也不是永不存在的值，但其实有一些场景，值会永不存在，例如，那些总是会抛出异常或函数中执行无限循环的代码（死循环）的函数返回值类型

```ts
// 抛出异常
function error(msg: string): never {
  throw new Error(msg)
} // 抛出异常会直接中断程序运行，这样程序就运行不到返回值那一步了，即具有不可达的终点，也就永不存在返回了

// 死循环
function loopForever(): never {
  while (true) {}
} //同样程序永远无法运行到函数返回值那一步，即永不存在返回
```

变量也可以声明为  `never`  类型，因为它是永不存在值的类型，所以任何类型都不能赋值给  `never`  类型（除了`never`本身之外）。 即使  `any`  也不可以赋值给  `never`

```ts
let never1: never

// any 也不能分配给 never
let any1: any = 'sisterAn'
never1 = any1 // Error

// 作为函数返回类型的 never
let never2: never = (() => {
  throw new Error('Throw error')
})()

never1 = never2
```

### void

`void`  某种程度上来说正好与  `any`  相反，表示无任何类型，没有类型，如果是函数则应没有返回值或者返回  `undefined` ：

```ts
function hello(): void {
  console.log('Hello sisterAn')
}
```

也可以声明一个  `void`  类型的变量，不过你只能为它赋予  `undefined` 、 `null` （注意，`"strictNullChecks": true`  时会报错）和  `void`  类型的值

```ts
let void1: void
let null1: null = null
let und1: undefined = undefined
let void2: void

void1 = void2
void1 = und1
void1 = null1 // Type 'null' is not assignable to type 'void'.
```

### any、unknown、never、void 区别

#### 1\. 定义

- `any` ：用于描述任意类型的变量，不作任何约束，编译时会跳过对其的类型检查
- `unknown` ：表示未知类型，即写代码的时候还不知道具体会是怎样的数据类型
- `never` ：永不存在的值的类型，常用于表示永不能执行到终点的函数返回值，例如抛出异常或函数中执行无限循环的代码（死循环）的函数返回值类型
- `void` ：表示无任何类型，没有类型，例如没有返回值的函数的返回值类型

any 与 unknown 的区别：

`unknown`  与  `any`  类似，但使用前必须进行断言或守卫

never 与 void 的区别：

用于函数时， `never`  表示函数用于执行不到返回值那一步（抛出异常或死循环）的返回值类型，即永不存在的值的类型，而  `void`  则表示没有返回值，不返回或返回  `undefined`

#### 2\. 使用

- `any`  类型导致问题太多了，如类型污染，使用不存在的属性或方法而不报错等，而且不不方便后期维护，所以，建议能不用  `any`  就不用  `any` ，但是如果声明时并不确定具体的类型，则可以使用  `unknown`  代替，在使用时用类型断言或类型守卫进行类型收缩
- `never`  类型用于表示永不存在的值的类型，所以常用于构造条件类型来组合出更灵活的类型定义

```ts
// never: 从未出现的值的类型
// 如果 T 是 U 的子类型的话，那么就会返回 X，否则返回 Y
// 构造条件类型 : T extends U ? X : Y

type Exclude<T, U> = T extends U ? never : T

// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>
```

- `void`  常用于表示函数没有返回值

- [参考原文](https://github.com/sisterAn/blog/issues/128)

## interface 与 type 异同点，如何选择？

### 及格线

- interface 与 type 都可以描述对象类型、函数类型、Class 类型，但 interface 无法像 type 那样表达元组、一组联合类型等等。

```ts
// 接口
interface Sister {
  name: string
  age: number
}

interface SetSister {
  (name: string, age: number): void
}

// 类型别名
type Sister = {
  name: string
  age: number
}

type SetSister = (name: string, age: number) => void
```

- 在对象扩展情况下，interface 使用 extends 关键字，而 type 使用交叉类型（`&`）。

```js
// 接口
interface SisterAn {
  name: string;
}

// 类型别名
type SisterRan = {
  age: number
}

// interface 和 type 可以混合扩展，也就是说 interface 可以扩展 type，type 也可以扩展 interface。
// 接口扩展接口
interface Sister extends SisterAn {
  age: number;
}
// 类型别名扩展类型别名
type SisterPro = SisterRan & {
  name: string
}
// 接口扩展类型别名
interface Sister extends SisterRan {
  name: string;
}
// 类型别名扩展接口
type SisterPro = SisterAn & {
  age: number
}
```

- 同名的 interface 会自动合并，并且在合并时会要求兼容原接口的结构, 而 type 类型别名定义多次会报错
- interface 无法使用映射类型等类型工具，也就意味着在类型编程场景中我们还是应该使用 type 。

### 优秀回答

使用 interface 来定义对象类型，使用类型别名来处理函数签名、联合类型、工具类型等等。这同样也代表了你对这两个工具的理解：interface 就是描述对象对外暴露的接口，其不应该具有过于复杂的类型逻辑，最多局限于泛型约束与索引类型这个层面。而 type alias 就是用于将一组类型的重命名，或是对类型进行复杂编程。

**如何选择 Interface 、 Type**

虽然 [官方](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)  中说几乎接口的所有特性都可以通过类型别名来实现，但建议优先选择接口，接口满足不了再使用类型别名，在 typescript 官网  [Preferring Interfaces Over Intersections](https://github.com/microsoft/TypeScript/wiki/Performance#writing-easy-to-compile-code)  有说明，具体内容如下：

> 大多数时候，对象类型的简单类型别名的作用与接口非常相似
>
> ```ts
> interface Foo {
>   prop: string
> }
>
> type Bar = { prop: string }
> ```
>
> 但是，一旦你需要组合两个或多个类型来实现其他类型时，你就可以选择使用接口扩展这些类型，或者使用类型别名将它们交叉在一个中（交叉类型），这就是差异开始的时候。
>
> - 接口创建一个单一的平面对象类型来检测属性冲突，这通常很重要！  而交叉类型只是递归的进行属性合并，在某种情况下可能产生  `never`  类型
> - 接口也始终显示得更好，而交叉类型做为其他交叉类型的一部分时，直观上表现不出来，还是会认为是不同基本类型的组合。
> - 接口之间的类型关系会被缓存，而交叉类型会被看成组合起来的一个整体。
> - 最后一个值得注意的区别是，在检查到目标类型之前会先检查每一个组分。
>
> 出于这个原因，建议使用接口/扩展扩展类型而不是创建交叉类型。
>
> ```ts
> - type Foo = Bar & Baz & {
> -     someProp: string;
> - }
> + interface Foo extends Bar, Baz {
> +     someProp: string;
> + }
> ```

简单的说，接口更加符合 JavaScript 对象的工作方式，简单的说明下，当出现属性冲突时：

```ts
// 接口扩展
interface Sister {
  sex: number
}

interface SisterAn extends Sister {
  sex: string
}
// index.ts(5,11): error TS2430: Interface 'SisterAn' incorrectly extends interface 'Sister'.
//  Types of property 'sex' are incompatible.
//    Type 'string' is not assignable to type 'number'.
```

```ts
// 交叉类型
type Sister1 = {
  sex: number
}

type Sister2 = {
  sex: string
}

type SisterAn = Sister1 & Sister2
// 不报错，此时的 SisterAn 是一个'number & string'类型，也就是 never
```

## 什么是类型谓词

收窄类型，类型守卫。

**类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内**。 换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。

换句话说：**类型守卫是运行时检查，确保一个值在所要类型的范围内**

目前主要有四种的方式来实现类型保护：

- 1、in 关键字

```ts
interface InObj1 {
  a: number
  x: string
}
interface InObj2 {
  a: number
  y: string
}
function isIn(arg: InObj1 | InObj2) {
  // x 在 arg 打印 x
  if ('x' in arg) console.log('x')
  // y 在 arg 打印 y
  if ('y' in arg) console.log('y')
}
isIn({ a: 1, x: 'xxx' })
isIn({ a: 1, y: 'yyy' })
```

- 2、typeof 关键字

```ts
function isTypeof(val: string | number) {
  if (typeof val === 'number') return 'number'
  if (typeof val === 'string') return 'string'
  return '啥也不是'
}
```

> typeof 只支持：typeof 'x' === 'typeName' 和 typeof 'x' !== 'typeName'，x 必须是 'number', 'string', 'boolean', 'symbol'。

- 3、instanceof

```ts
function creatDate(date: Date | string) {
  console.log(date)
  if (date instanceof Date) {
    date.getDate()
  } else {
    return new Date(date)
  }
}
```

- 4、自定义类型保护的类型谓词

```ts
function isNumber(num: any): num is number {
  return typeof num === 'number'
}
function isString(str: any): str is string {
  return typeof str === 'string'
}
```

## 对 TypeScript 中高级类型的理解？有哪些？

## 对 TypeScript 装饰器的理解？应用场景？

## 对 TypeScript 中命名空间与模块的理解？区别？

## 如何在 Vue 项目中应用 TypeScript？

## 参考

- https://vue3js.cn/interview/typescript/data_type.html
