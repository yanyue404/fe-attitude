1. 使用 reduce API map 的效果 `[1,2,3]`=》 `[2,4,6]`

```js
source.map(item => item * 2);
```

```js
let arr = [1, 2, 3];

let res = arr.reduce((result, v) => {
  result.push(v * 2);
  return result;
}, []);
console.log(res);
```

2. 从`1.45` 中取出整数和小数部分 1 45

```js
function logResult(str) {
  let last = String(str).split('.')[1];

  return [parseInt(str), last];
}
logResult(1.45);
```

3. 计算字符串`abcab`中最多出现的字母和次数

```js
let str = 'abcab';
let arr = str.split('');
let result = {};
for (var i = 0; i < arr.length; i++) {
  let key = arr[i];
  if (!result[key]) {
    result[key] = 1;
  } else {
    result[key] += 1;
  }
}
var max = 0;
var k = [];
for (let m in result) {
  if (result[m] > max) {
    max = result[m];
  }
  // 处理相同最大次数
  if (result[m] === max) {
    k.push(m);
  }
}
console.log('最多出现的字母:' + k.join(','));
console.log('最多出现的次数:' + max);
```

4. 完整功能的 `fetch`请求
