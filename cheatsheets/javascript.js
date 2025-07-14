/* *******************************************************************************************
 * 全局对象 > OBJECT
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object
 * ******************************************************************************************* */

// 全局对象：属性
Object.length                                        // length 是函数对象的属性，表示函数期望的参数个数，即形参的数量。此数字不包括剩余参数。值为1。
Object.prototype                                     // 表示 Object 原型对象，允许向所有 Object 类型的对象添加新的属性和方法。

// Object 构造函数的方法
Object.assign(target, ...sources)                    // 将所有可枚举的自有属性的值从一个或多个源对象复制到目标对象。返回目标对象
Object.create(MyObject)                              // 使用指定的原型对象和属性创建一个新对象。
Object.defineProperty(obj, prop, descriptor)         // 通过给定的描述符为对象添加指定的属性。
Object.defineProperties(obj, props)                  // 通过给定的描述符为对象添加指定的属性。
Object.entries(obj)                                  // 返回一个包含给定对象所有可枚举字符串属性的 [key, value] 对数组。
Object.freeze(obj)                                   // 冻结对象：其他代码不能删除或更改任何属性。
Object.getOwnPropertyDescriptor(obj, prop)           // 返回对象上指定属性的属性描述符。
Object.getOwnPropertyDescriptors(obj)                // 返回包含对象所有自有属性描述符的对象。
Object.getOwnPropertyNames(obj)                      // 返回包含给定对象所有可枚举和不可枚举属性名称的数组。
Object.getOwnPropertySymbols(obj)                    // 返回直接在给定对象上找到的所有 Symbol 属性的数组。
Object.getPrototypeOf(obj)                           // 返回指定对象的原型。
Object.is(value1, value2);                           // 比较两个值是否相同。等同所有 NaN 值（不同于抽象相等比较和严格相等比较）。
Object.isExtensible(obj)                             // 判断对象是否可扩展。
Object.isFrozen(obj)                                 // 判断对象是否被冻结。
Object.isSealed(obj)                                 // 判断对象是否被密封。
Object.keys(obj)                                     // 返回包含给定对象所有可枚举字符串属性名称的数组。
Object.preventExtensions(obj)                        // 阻止对象的任何扩展。
Object.seal(obj)                                     // 阻止其他代码删除对象的属性。
Object.setPrototypeOf(obj, prototype)                // 设置原型（即内部 [[Prototype]] 属性）。
Object.values(obj)                                   // 返回包含给定对象所有可枚举字符串属性值的数组。
Object.hasOwn(obj, prop)                             // 检查对象是否具有自己的属性（非继承）。
Object.fromEntries(iterable)                         // 将键值对列表转换为对象。

// 对象实例和 Object 原型对象 (Object.prototype.property 或 Object.prototype.method())
// 属性
obj.constructor                                      // 指定创建对象原型的函数。
obj.__proto__                                        // 指向实例化对象时用作原型的对象。

// 方法
obj.hasOwnProperty(prop)                             // 返回布尔值，指示对象是否包含指定属性作为该对象的直接属性，而不是通过原型链继承。
prototypeObj.isPrototypeOf(object)                   // 返回布尔值，指示调用此方法的对象是否在指定对象的原型链中。
obj.propertyIsEnumerable(prop)                       // 返回布尔值，指示是否设置了内部 ECMAScript [[Enumerable]] 属性。
obj.toLocaleString()                                 // 调用 toString()。
obj.toString()                                       // 返回对象的字符串表示。
object.valueOf()                                     // 返回指定对象的原始值。

/* *******************************************************************************************
 * 全局对象 > ARRAY
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * ******************************************************************************************* */

// 全局对象：属性
Array.length                                         // 反映数组中元素的个数。
Array.prototype                                      // 表示 Array 构造函数的原型，允许向所有 Array 对象添加新的属性和方法。

// 全局对象：方法
Array.from(arrayLike[, mapFn[, thisArg]])            // 从类数组或可迭代对象创建新的 Array 实例。
Array.isArray(obj)                                   // 如果变量是数组则返回 true，否则返回 false。
Array.of(element0[, element1[, ...[, elementN]]])    // 创建具有可变数量参数的新 Array 实例，无论参数的数量或类型如何。

// 实例：属性
arr.length                                           // 反映数组中元素的个数。

// 实例：变更方法
arr.copyWithin(target, start, end)                   // 在数组内复制一系列数组元素。
arr.fill(value, start, end)                          // 用静态值填充数组从开始索引到结束索引的所有元素。
arr.pop()                                            // 从数组中删除最后一个元素并返回该元素。
arr.flat(depth)                                      // 将嵌套数组合并为单个数组，depth 参数可选：指定要提取嵌套数组的结构深度，默认值为 1。
arr.push([element1[, ...[, elementN]]])              // 向数组末尾添加一个或多个元素，并返回数组的新长度。
arr.reverse()                                        // 就地反转数组元素的顺序——第一个变成最后一个，最后一个变成第一个。
arr.shift()                                          // 从数组中删除第一个元素并返回该元素。
arr.sort()                                           // 就地对数组元素进行排序并返回数组。
array.splice(start, deleteCount, item1, item2, ...)  // 从数组中添加和/或删除元素。
arr.unshift([element1[, ...[, elementN]]])           // 向数组开头添加一个或多个元素，并返回数组的新长度。

// 实例：访问方法
arr.at(index)                                        // 返回数组中指定索引处的元素。
arr.concat(value1[, value2[, ...[, valueN]]])        // 返回由此数组与其他数组和/或值连接而成的新数组。
arr.includes(searchElement, fromIndex)               // 判断数组是否包含某个元素，适当地返回 true 或 false。
arr.indexOf(searchElement[, fromIndex])              // 返回数组中第一个等于指定值的元素的索引，如果未找到则返回 -1。
arr.join(separator)                                  // 将数组的所有元素连接成字符串。
arr.lastIndexOf(searchElement, fromIndex)            // 返回数组中最后一个等于指定值的元素的索引，如果未找到则返回 -1。
arr.slice(begin, end)                                // 提取数组的一部分并返回新数组。
arr.toString()                                       // 返回表示数组及其元素的字符串。重写 Object.prototype.toString() 方法。
arr.toLocaleString(locales, options)                 // 返回表示数组及其元素的本地化字符串。重写 Object.prototype.toLocaleString() 方法。

// 实例：迭代方法
arr.entries()                                        // 返回包含数组中每个索引的键/值对的新 Array Iterator 对象。
arr.every(callback[, thisArg])                       // 如果此数组中的每个元素都满足提供的测试函数，则返回 true。
arr.filter(callback[, thisArg])                      // 创建一个新数组，其中包含通过提供的过滤函数测试的此数组的所有元素。
arr.find(callback[, thisArg])                        // 返回数组中满足提供的测试函数的第一个元素的值，如果未找到则返回 undefined。
arr.findIndex(callback[, thisArg])                   // 返回数组中满足提供的测试函数的第一个元素的索引，如果未找到则返回 -1。
// eg：const arr1 = [1, 2, 1];
// const result = arr1.flatMap((num) => (num === 2 ? [2, 2] : 1));  
// console.log(result);
// Expected output: Array [1, 2, 2, 1]
arr.flatMap(callback[, thisArg])                     // 对数组中的每个元素应用回调函数并将结果平铺到新数组中
arr.forEach(callback[, thisArg])                     // 为数组中的每个元素调用函数。
arr.keys()                                           // 返回包含数组中每个索引的键的新 Array Iterator。
arr.map(callback[, initialValue])                    // 创建一个新数组，其中包含对此数组中每个元素调用提供函数的结果。
arr.reduce(callback[, initialValue])                 // 对累加器和数组中的每个值（从左到右）应用函数，以将其减少为单个值。
arr.reduceRight(callback[, initialValue])            // 对累加器和数组中的每个值（从右到左）应用函数，以将其减少为单个值。
arr.some(callback[, initialValue])                   // 如果此数组中至少有一个元素满足提供的测试函数，则返回 true。
arr.values()                                         // 返回包含数组中每个索引的值的新 Array Iterator 对象。

/* *******************************************************************************************
 * 全局对象 > STRING
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
 * ******************************************************************************************* */

// 全局对象：属性
str.length                                           // 返回字符串中的字符数

// Object 构造函数的方法
String.fromCharCode(num1[, ...[, numN]])             // 返回由指定的 UTF-16 代码单元序列创建的字符串。
String.fromCodePoint(num1[, ...[, numN]])            // 返回使用指定的代码点序列创建的字符串
String.raw(strings, ...substitutions)                // 用于获取模板字面量的原始字符串形式，即处理替换（如 ${foo}），但不处理转义序列（如 \n）。

// 方法
str.charAt(index)                                    // 接受整数并返回传递位置的字符，如果未找到则返回空字符串
str.charCodeAt(index)                                // 接受对应字符串中位置的整数，并返回该位置字符的 Unicode
str.codePointAt(index)                               // 接受整数并返回作为参数传递的位置的 Unicode
str.concat(string2[, ...stringN])                    // 接收 N 个字符串并返回它们的连接
str.endsWith(searchString[, endPosition])            // 检查字符串是否以一个或多个字符结尾，返回布尔值
str.includes(searchString[, position])               // 检查作为参数传递的字符是否存在于字符串中
str.indexOf(searchValue[, fromIndex])                // 返回 searchValue 中提供的值在第一次出现的索引
str.lastIndexOf(searchValue[, fromIndex])            // 返回 searchValue 中提供的值在最后一次出现的索引
str.localeCompare(compareString[,locales[,options]]) // 检查引用字符串是否在作为参数传递的字符串之前或之后
str.match(regexp)                                    // 检索将字符串与正则表达式匹配的结果。
str.matchAll(regexp)                                 // 返回字符串与正则表达式匹配的所有结果的迭代器，包括捕获组
str.normalize([form])                                // 返回字符串的 Unicode 规范化形式
str.padEnd(targetLength [, padString])               // 返回从右端用 padString 中指定的字符或字符组填充的新字符串
str.padStart(targetLength [, padString])             // 返回从开头用 padString 中指定的字符或字符组填充的新字符串
str.repeat(count)                                    // 构造并返回一个新字符串，其中包含被调用字符串的指定数量的副本，连接在一起
str.replace(regexp|substr, newSubStr|func)           // 第一个参数是要匹配或替换的字符串或正则表达式，第二个参数是新字符串或函数，返回值将替换匹配项，并返回带有替换的新字符串
str.replaceAll(regexp|substr, newSubStr|func)        // 第一个参数是要匹配替换的字符串或正则表达式，第二个参数是新字符串或函数，返回值将替换匹配项，并返回带有替换的新字符串
str.search(regexp)                                   // 以正则表达式作为参数并返回满足它的位置索引
str.slice(start, end)                                // 删除字符串的一部分并返回新字符串
str.split([separator[, limit]])                      // 从第一个参数中定义的分隔符分割字符串并返回字符串数组
str.startsWith(searchString[, position])             // 检查字符串是否以一个或多个字符开头，返回布尔值
str.toLocaleLowerCase(locale)                        // 将所有字母转换为小写，并根据作为参数指定的区域设置返回带有转换值的字符串
str.toLocaleUpperCase(locale)                        // 将所有字母转换为大写，并根据作为参数指定的区域设置返回带有转换值的字符串
str.toLowerCase()                                    // 将所有字母转换为小写并返回带有转换值的字符串
str.toString()                                       // 返回表示指定字符串值的字符串。
str.toUpperCase()                                    // 将所有字母转换为大写返回带有转换值的字符串
str.trim()                                           // 删除字符串开头和结尾的空白
str.trimStart()                                      // 删除开头的空白
str.trimEnd()                                        // 删除字符串结尾的空白
str.valueOf()                                        // 返回 String 对象的原始值。

/* *******************************************************************************************
 * 全局对象 > NUMBER
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
 * ******************************************************************************************* */

// 全局对象：方法
Number.EPSILON                                       // 两个可表示数字之间的最小间隔。
Number.MAX_SAFE_INTEGER                              // JavaScript 中的最大安全整数 (253 - 1)。
Number.MAX_VALUE                                     // 最大的正可表示数字。
Number.MIN_SAFE_INTEGER                              // JavaScript 中的最小安全整数 (-(253 - 1))。
Number.MIN_VALUE                                     // 最小的正可表示数字——即最接近零的正数（不实际为零）。
Number.NaN                                           // 特殊的"非数字"值。
Number.NEGATIVE_INFINITY                             // 表示负无穷大的特殊值。溢出时返回。
Number.POSITIVE_INFINITY                             // 表示正无穷大的特殊值。溢出时返回。
Number.isFinite(value)                               // 确定传递的值是否为有限数，返回布尔值。
Number.isInteger(value)                              // 确定传递的值是否为整数，返回布尔值。
Number.isNaN(value)                                  // 确定传递的值是否为 NaN，返回布尔值。
Number.isSafeInteger()                               // 确定传递的值是否为安全整数（介于 -(253 - 1) 和 253 - 1 之间的数字），返回布尔值。
Number.parseFloat()                                  // 解析字符串参数并返回浮点数，这与全局 parseFloat() 函数相同。
Number.parseInt()                                    // 解析字符串参数并返回指定基数的整数，这与全局 parseInt() 函数相同。

// 方法
number.toExponential(fractionDigits)                 // 返回表示数字的指数表示法的字符串。
number.toFixed(digits)                               // 返回表示数字的定点表示法的字符串。
number.toLocaleString(locales, options)              // 返回此数字的语言敏感表示的字符串。
number.toPrecision(precision)                        // 返回表示数字到指定精度的定点或指数表示法的字符串。
number.toString(radix)                               // 返回表示指定数字值的字符串。
number.valueOf(radix)                                // 返回表示指定数字值的字符串。
