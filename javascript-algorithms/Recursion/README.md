> https://github.com/yanyue404/blog/issues/118

## 前言

今天被问到一个多层嵌套获取属性值的函数方法 `getObjectValue(a.b.c...)`的实现，没有完整做出实现。鉴于递归在日后的开发中也很常见，实践方式可能更难，此篇深入学习递归，从简单例子到复杂，`go`！

## 开始

递归在计算机科学中是指一种通过重复将问题分解为同类的子问题而解决问题的方法，绝大多数编程语言支持函数的自调用，在这些语言中**函数可以通过调用自身**来进行递归。

函数方法自己调用自己，就是递归。

并不是永远的调用，需要停下来：设计一个递归程序，就必须注意设定一个表达式判断（例如 if 语句）来告诉程序是否应该继续递归下去。

**阶乘**

```js
function factorial(n) {
  if (n == 1) return n
  return n * factorial(n - 1)
}

console.log(factorial(5)) // 5 * 4 * 3 * 2 * 1 = 120
```

**斐波那契数列**

斐波那契数列的计算使用了递归：

```js
function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2)
}

console.log(fibonacci(5)) // 1 1 2 3 5
```

### 总结

- 将复杂问题分解为子项，使用子问题继续去做同样的事
- 重点设置边界条件，终止递归程序
- 终止方案设计：自调用时设置下一级调用（结合边界）

## 深拷贝

```js
function deepCopy(obj) {
  if (typeof obj !== 'object') return
  var newObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return newObj
}
```

## 获取多层对象的值(参数为 `a.b.c...`)

```js
const obj = {
  a: 1,
  b: 2,
  c: {
    d: {
      f: 1
    }
  }
}

// get-path

function getObjectValue(obj, href) {
  if (href.indexOf('.') === -1) {
    return obj[href]
  }
  if (href.indexOf('.') !== -1) {
    let hrefStr = href.split('.')
    return getObjectValue(obj[hrefStr[0]], hrefStr.slice(1).join('.'))
  }
}

console.log(getObjectValue(obj, 'c.d.f')) // 1
```

## 数组扁平化

```js
let givenArr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]
let outputArr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 8, 9, 11, 12, 12, 13, 14, 10]

// 实现flatten方法使得
function flatten(arr) {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i]
    if (Array.isArray(item)) {
      res = res.concat(flatten(item))
    } else {
      res.push(item)
    }
  }
  return res
}
console.log(flatten(givenArr))
```

## 判断对象相等

```js
// 对象类型深比较（递归遍历）
function isEqual(obj, obj2, option = {}) {
  if (!obj || !obj2) {
    return obj === obj2
  }
  if (Object.keys(obj).length !== Object.keys(obj2).length) return false
  const ignores = option.ignores || []
  const keys = [...new Set(Object.keys(obj).concat(Object.keys(obj2)))]

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]
    if (!ignores.includes(key)) {
      if (obj[key] && typeof obj[key] === 'object') {
        if (!isEqual(obj[key], obj2[key], option)) {
          return false
        }
      } else if (obj[key] !== obj2[key]) {
        return false
      }
    }
  }
  return true
}
```

#### 参考链接

- [wiki - 递归](<https://zh.wikipedia.org/zh-cn/%E9%80%92%E5%BD%92_(%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%A7%91%E5%AD%A6)>)
- https://github.com/mqyqingfeng/Blog/issues/49
