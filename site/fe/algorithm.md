## 两数之和

给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

示例：

```js
给定 nums = [2, 7, 11, 15], target = 9

因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

// 出题者保证
// 1. numbers 中的数字不会重复
// 2. 只会存在一个有效答案
```

```js
var twoSum = function(nums, target) {
  const map = {}
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    if (target - n in map) {
      return [map[target - n], i]
    } else {
      map[n] = i
    }
  }
}
```

## 二分查找

```js
// 先递增后递减数组求减求最大值
const arr1 = [0, 1, 4, 7, 5]
const arr2 = [1, 6, 5, 3, 2]
const arr3 = [1, 2, 3, 4, 5, 6, 7, 9, 3, 2]

function getMax(params) {
  let begin = 0
  let end = params.length - 1
  while (begin <= end) {
    let mid = Math.floor(begin + (end - begin) / 2)
    console.log(mid)

    let element = params[mid]
    if (element > params[mid - 1] && element > params[mid + 1]) {
      console.log('第' + (mid + 1) + '个' + element + '最大')
      return element
      // 当前比右边的数小，向右走
    } else if (element < params[mid + 1]) {
      begin = mid + 1
      // 当前比左边的数小，相左走
    } else if (element < params[mid - 1]) {
      end = mid - 1
    }
  }
  return -1
}
//  console.log(getMax(arr1));
// console.log(getMax(arr2));
console.log(getMax(arr3))
```

## 大树相加

题目

```js
const add = (a, b) => {
  ...
  return sum
}

console.log(add("11111111101234567","77777777707654321"))
console.log(add("911111111101234567","77777777707654321"))
```

```js
function add(a, b) {
  let maxLength = Math.max(a.length, b.length)
  //用0去补齐长度
  a = a.padStart(maxLength, 0) //"0009007199254740991"
  b = b.padStart(maxLength, 0) //"1234567899999999999"
  //定义加法过程中需要用到的变量
  let t = 0
  let f = 0 //"进位"
  let sum = ''
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f
    f = Math.floor(t / 10)
    sum = (t % 10) + sum
  }
  if (f == 1) {
    sum = '1' + sum
  }
  return sum
}

const add = (a, b) => {
  const maxLength = Math.max(a.length, b.length)
  let overflow = false
  let sum = ''
  for (let i = 1; i <= maxLength; i++) {
    const ai = a[a.length - i] || '0'
    const bi = b[b.length - i] || '0'
    let ci = parseInt(ai) + parseInt(bi) + (overflow ? 1 : 0)
    overflow = ci >= 10
    ci = overflow ? ci - 10 : ci
    sum = ci + sum
  }
  sum = overflow ? '1' + sum : sum
  return sum
}
console.log(add('111', '99'))
console.log(add('9007199254740991', '1234567899999999999'))
```

## 无重复最长子串的长度

题目: https://leetcode.cn/problems/longest-substring-without-repeating-characters/

```js
const lengthOfLongestSubstring = str => {
  //...
}

console.log(lengthOfLongestSubstring('abcabcbb'))
// 3
```

**滑动窗口法**

我称之为「两根手指法」。

```js
var lengthOfLongestSubstring = function(s) {
  if (s.length <= 1) return s.length
  let max = 0
  let p1 = 0
  let p2 = 1
  while (p2 < s.length) {
    let sameIndex = -1
    for (let i = p1; i < p2; i++) {
      if (s[i] === s[p2]) {
        sameIndex = i
        break
      }
    }
    let tempMax
    if (sameIndex >= 0) {
      tempMax = p2 - p1
      p1 = sameIndex + 1
    } else {
      tempMax = p2 - p1 + 1
    }
    if (tempMax > max) {
      max = tempMax
    }
    p2 += 1
  }

  return max
}
```

## 移动零

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

```js
输入: [0, 1, 0, 3, 12]
输出: [1, 3, 12, 0, 0]
```

说明:

必须在原数组上操作，不能拷贝额外的数组。

尽量减少操作次数。

```js
let x = [0, 1, 0, 3, 12]
let y = [0, 0, 0, 1, 0, 3, 12]

const zeroMove = function(nums) {
  let j = 0
  for (let i = 0; i < nums.length - j; i++) {
    const element = nums[i]
    if (element === 0) {
      nums.splice(i, 1)
      nums.push(0)
      i--
      j++
    }
  }
  return nums
}

console.log(zeroMove(x)) // [1,3,12,0,0]
console.log(zeroMove(y)) // [1,3,12,0,0,0,0]
```

## 已知数据格式，实现一个函数 fn 找出链条中所有的父级 id

```js
const value = '112'
const fn = (value) => {
...
}
fn(value) // 输出 [1， 11， 112]
```

```js
const data = [
  {
    id: '1',
    name: 'test1',
    children: [
      {
        id: '11',
        name: 'test11',
        children: [
          {
            id: '111',
            name: 'test111'
          },
          {
            id: '112',
            name: 'test112'
          }
        ]
      },
      {
        id: '12',
        name: 'test12',
        children: [
          {
            id: '121',
            name: 'test121'
          },
          {
            id: '122',
            name: 'test122'
          }
        ]
      }
    ]
  }
]
```
