# JS

## 目录

## css

- 1 像素边框问题
- flex 布局最后一列
- 对栅格的理解

## 功能

- 图片懒加载
- 实现页面加载进度条
- 瀑布流
- 图片上传

## 目录

- 什么是闭包，以及在哪些地方使用？
- this 指向
- 原型，构造函数，实例
- 原型链
- Dom 事件流，事件委托
- new 运算符的执行过程
- EventLoop 机制
- 宏任务，微任务
- [数组 API 有哪些，其中哪些改变了原数组，哪些没有改变](#数组-API，哪些改变了原数组，哪些没有改变)
- 深拷贝，浅拷贝
- ES6
  - let,const && var
  - Promise
  - async/await 怎么用，如何捕获异常？
  - 不用 class 如何实现继承？用 class 又如何实现？
- 常考：如何用正则实现 trim()？

**手写**

- [尽可能全面正确的解析一个任意 url](#尽可能全面正确的解析一个任意-url)
- `Event loop` 宏任务，微任务,打印结果？
- 对象深拷贝
- 数组排序
- 数组去重
- 数组扁平化
- bind 方法
- apply，call 方法
- [函数节流与防抖](#函数节流与防抖)
- 发布订阅模式 Event
- AJAX

## Dom 事件流，事件委托

Dom 事件流分为三个阶段，事件捕获阶段，事件目标阶段，事件冒泡阶段。

在事件发生前是自上而下的捕获阶段，当寻找到事件目标进入事件目标阶段，然后再自下而上的发起事件冒泡。

## new 运算符的执行过程

- 新创建一个对象
- 对象链接到原型
- 绑定 this，执行构造函数
- 返回新对象(如果构造函数有自己 retrun 时，则返回该值)

## 数组 API，哪些改变了原数组，哪些没有改变

- 改变原数组：push,pop,shift,unshift,reverse,sort,splice
- 未改变原数组:slice,join,concat,indexOf,every,some,forEach,map,filter,reduce,findIndex,includes

## Promise、Promise.all、Promise.race 分别怎么用？

Promise 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值的后续操作。

特点：1. 拥有三个状态进行中，已成功，已失败；2. 一旦状态改变，就不会再变。

```js
const promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});
```

**实例方法**

Promise.all 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。只有当所有的参数对象都成功时才会触发成功，一旦任何一个 promise 对象失败则立即触发该 promise 对象的失败。这个新的 promise 对象，所有 promise 参数都执行成功时返回的参数顺序与 promise 对象数组的排列方式一致；失败时会将 promise 参数中第一个触发失败的 promise 对象错误信息作为返回的参数

```js
const promises = [2, 3, 5, 7, 11, 13].map(function(id) {
  return getJSON('/post/' + id + '.json');
});

Promise.all(promises)
  .then(function(posts) {
    // ...
  })
  .catch(function(reason) {
    // ...
  });
```

Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。在新的 promise 对象中，promise 对象参数里任何一个子 promise 处理成功或失败后，会作为它的返回参数。

```js
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('request timeout')), 5000);
  }),
]);

p.then(console.log).catch(console.error);
```

### 尽可能全面正确的解析一个任意 url

```js
var url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';
// parseParam(url);
/**
结果：
{
   user: 'anonymous',
   id: [123, 456], // 重复出现的 key 要组装成数组
   ，能被转成数字的就转成数字类型
   city: '北京', // 中文
   enabled: true, // 未指定值的 key 约定值为 true
}
*/

function parseParam(url) {
  var paramArr = decodeURI(url)
      .split('?')[1]
      .split('&'),
    obj = {};
  for (var i = 0; i < paramArr.length; i++) {
    var item = paramArr[i];
    if (item.indexOf('=') != -1) {
      var tmp = item.split('=');
      obj[tmp[0]] = tmp[1];
    } else {
      obj[item] = true;
    }
  }
  return obj;
}
var obj = parseParam(url);
console.log(obj);
```

### `Event loop` 宏任务，微任务,打印结果？

```js
new Promise(resolve => {
  console.log(1);
  setTimeout(() => {
    console.log(2);
  }, 0);
  Promise.resolve().then(() => {
    console.log(3);
  });
  resolve();
}).then(() => {
  console.log(4);
});
console.log(5);
```

// log: 1,5,3,4,2

### 对象深拷贝

```js
function deepCopy(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
    }
  }
  return newObj;
}
```

### 数组排序

```js
function bubble(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('arr 参数必须为数组类型');
  }
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // 交换
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
console.log(bubble([3, 2, 1, 4, 8, 6, 7]));
```

### 数组去重

```js
function unique(arr) {
  return Array.from(new Set(arr));
}
function unique2(arr) {
  return arr.filter(function(item, index, arr) {
    //当前元素，在原始数组中的第一个索引==当前索引值，否则返回当前元素
    return arr.indexOf(item, 0) === index;
  });
}
```

### 数组扁平化

```js
let givenArr = [
  [1, 2, 2],
  [3, 4, 5, 5],
  [6, 7, 8, 9, [11, 12, [12, 13, [14]]]],
  10,
];
let outputArr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10];

// 实现flatten方法使得
function flatten(arr) {
  let res = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      res = res.concat(flatten(item));
    } else {
      res.push(item);
    }
  }
  return res;
}
console.log(flatten(givenArr));
```

### 函数节流与防抖

```js
// 函数防抖
function debounce(fn, wait = 1000) {
  let timer;
  return function() {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
```

```js
// 函数节流
function throttle(fn, wait = 1500) {
  let _lastTime;
  return function() {
    let _nowTime = +new Date();
    if (_nowTime - _lastTime > wait || !_lastTime) {
      fn.apply(this, arguments);
      _lastTime = _nowTime;
    }
  };
}
```

### bind 方法

```js
Function.prototype.bind =
  Function.prototype.bind ||
  function(context) {
    var me = this;
    var args = Array.prototype.slice.call(arguments, 1);
    return function() {
      var innerArgs = Array.prototype.slice.call(arguments);
      var finalArgs = args.concat(innerArgs);
      return me.apply(context, finalArgs);
    };
  };
```

### 发布订阅模式 Event

```js
class Event {
  constructor() {
    this._cache = {};
  }
  // 绑定
  on(type, callback) {
    let fns = (this._cache[type] = this._cache[type] || []);
    if (fns.indexOf(callback) === -1) {
      fns.push(callback);
    }
    return this;
  }
  // 触发
  trigger(type, data) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
        fn(data);
      });
    }
    return this;
  }
  // 解绑
  off(type, callback) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      if (callback) {
        let index = fns.indexOf(callback);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      } else {
        //全部清空
        fns.length = 0;
      }
    }
    return this;
  }
}
// 测试用例
const event = new Event();
event.on('test', a => {
  console.log(a);
});
event.trigger('test', 'hello world');

event.off('test');
event.trigger('test', 'hello world');
```

#### 参考链接

- https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
- https://zhuanlan.zhihu.com/p/67244840
