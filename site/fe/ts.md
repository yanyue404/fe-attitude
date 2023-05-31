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

## any、never、unknown 和 void 有什么区别？

## 什么是泛型？
