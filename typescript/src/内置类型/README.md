# 内置对象

JavaScript 中有很多[内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)，它们可以直接在 TypeScript 中当做定义好了的类型。

内置对象是指根据标准在全局作用域（Global）上存在的对象。这里的标准是指 ECMAScript 和其他环境（比如 DOM）的标准。

## ECMAScript 的内置对象[§](https://ts.xcatliu.com/basics/built-in-objects.html#ecmascript-%E7%9A%84%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1)

ECMAScript 标准提供的内置对象有：

`Boolean`、`Error`、`Date`、`RegExp`  等。

我们可以在 TypeScript 中将变量定义为这些类型：

```
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

```

更多的内置对象，可以查看  [MDN 的文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)。

而他们的定义文件，则在  [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。

## DOM 和 BOM 的内置对象[§](https://ts.xcatliu.com/basics/built-in-objects.html#dom-%E5%92%8C-bom-%E7%9A%84%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1)

DOM 和 BOM 提供的内置对象有：

`Document`、`HTMLElement`、`Event`、`NodeList`  等。

TypeScript 中会经常用到这些类型：

```
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});

```

它们的定义文件同样在  [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中。

## TypeScript 核心库的定义文件[§](https://ts.xcatliu.com/basics/built-in-objects.html#typescript-%E6%A0%B8%E5%BF%83%E5%BA%93%E7%9A%84%E5%AE%9A%E4%B9%89%E6%96%87%E4%BB%B6)

[TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)中定义了所有浏览器环境需要用到的类型，并且是预置在 TypeScript 中的。

当你在使用一些常用的方法的时候，TypeScript 实际上已经帮你做了很多类型判断的工作了，比如：

```
Math.pow(10, '2');

// index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.

```

上面的例子中，`Math.pow`  必须接受两个  `number`  类型的参数。事实上  `Math.pow`  的类型定义如下：

```
interface Math {
    /**
     * Returns the value of a base expression taken to a specified power.
     * @param x The base value of the expression.
     * @param y The exponent value of the expression.
     */
    pow(x: number, y: number): number;
}

```

再举一个 DOM 中的例子：

```
document.addEventListener('click', function(e) {
    console.log(e.targetCurrent);
});

// index.ts(2,17): error TS2339: Property 'targetCurrent' does not exist on type 'MouseEvent'.

```

上面的例子中，`addEventListener`  方法是在 TypeScript 核心库中定义的：

```
interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
    addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
}

```

所以  `e`  被推断成了  `MouseEvent`，而  `MouseEvent`  是没有  `targetCurrent`  属性的，所以报错了。

注意，TypeScript 核心库的定义中不包含 Node.js 部分。

## 用 TypeScript 写 Node.js[§](https://ts.xcatliu.com/basics/built-in-objects.html#%E7%94%A8-typescript-%E5%86%99-nodejs)

Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件：

```
npm install @types/node --save-dev

```

## 参考[§](https://ts.xcatliu.com/basics/built-in-objects.html#%E5%8F%82%E8%80%83)

- [内置对象](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects)
- [TypeScript 核心库的定义文件](https://github.com/Microsoft/TypeScript/tree/master/src/lib)
