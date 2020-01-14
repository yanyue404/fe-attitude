# JS

## 数组方法分类

IE8 之前可以用的数组方法

- Array.prototype.toString() 返回一个由所有数组元素组合而成的字符串。遮蔽了原型链上的 Object.prototype.toString() 方法。
- Array.prototype.reverse() 返回倒序排列后的数组，改变原数组
- Array.prototype.sort() 返回正序或倒序排列的数组，改变原数组，识别字母排序
- Array.prototype.shift() 删除数组的第一个元素，并返回这个元素，改变原数组
- Array.prototype.pop() 删除数组的最后一个元素，并返回这个元素，改变原数组
- Array.prototype.unshift() 在数组的开头增加一个或多个元素，并返回数组的新长度，改变原数组
- Array.prototype.push() 在数组的末尾增加一个或多个元素，并返回数组的新长度，改变原数组
- Array.prototype.splice() 在任意的位置给数组添加或删除任意个元素，改变原数组
- Array.prototype.slice() 抽取当前数组中的一段元素组合成一个新数组，不改变原数组
- Array.prototype.concat() 返回一个合并组合而成的新数组，不改变原数组，浅拷贝
- Array.prototype.join() 连接所有数组元素组成一个字符串，不改变原数组

es5 新加的数组方法

- Array.prototype.indexOf() 返回数组中第一个与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。不改变原数组
- Array.prototype.lastIndexOf() 返回数组中最后一个（从右边数第一个）与指定值相等的元素的索引，如果找不到这样的元素，则返回 -1。不改变原数组
- Array.prototype.every() 如果数组中的每个元素都满足测试函数，则返回 true，否则返回 false。不改变原数组
- Array.prototype.some() 如果数组中至少有一个元素满足测试函数，则返回 true，否则返回 false。不改变原数组
- Array.prototype.forEach() 为数组中的每个元素执行一次回调函数。可能改变原数组
- Array.prototype.map() 遍历数组，返回回调返回值组成的新数组，不改变原数组
- Array.prototype.filter() 将所有在过滤函数中返回 true 的数组元素放进一个新数组中并返回。不改变原数组
- Array.prototype.reduce() `reduce(fn(prev, cur)， defaultPrev)`: 两两执行，prev 为上次化简函数的 return 值，cur 为当前值(从第二项开始)
- Array.prototype.reduceRight() 与 reduce 一样，方向为从右到左
- Array.isArray() 是否为数组类型

es2015(es6)新加的数组方法

- Array.from() 传一个带 length 属性的参数 ，将它转换成数组
- Array.of() 传入多个参数，将它们合并成一个数组
- Array.prototype.find() 找到第一个满足测试函数的元素并返回那个元素的值，如果找不到，则返回 undefined。
- Array.prototype.findIndex() 找到第一个满足测试函数的元素并返回那个元素的索引，如果找不到，则返回 -1。
- Array.prototype.fill() `arr.fill(value[, start[, end]])` 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。
- Array.prototype.copyWithin() 浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

es2016 新加的数组方法

- Array.prototype.includes() 判断当前数组是否包含某指定的值，如果是返回 true，否则返回 false。

es2018 新加的数组方法

- Array.prototype.flat()
- Array.prototype.flatMap()

#### 参考链接

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
- https://zhuanlan.zhihu.com/p/67244840
