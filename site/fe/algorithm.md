> 我的 leetcode: https://leetcode.cn/u/yanyue404/

> Github: https://github.com/yanyue404/leetcode

## 目录

- 排序
- 递归
- 贪心算法
- 双指针
  - 两数之和
  - 无重复字符的最长子序
  - 移动零
- 二分查找
- 数据结构
  - 字符串
    - 大数相加
  - 数组
    - 交集

## 排序

- https://github.com/yanyue404/blog/issues/22

## 递归

- https://github.com/yanyue404/blog/issues/118

## 搜索

深度优先搜索和广度优先搜索是两种最常见的优先搜索方法，它们被广泛地运用在图和树等结构中进行搜索。

### 将 js 数组对象转化为树形结构

> 类：[#139](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/139)

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性 children 数组下，结构如下：

```js
// 转换前：
const list = [
  { id: 1, name: '部门A', parentId: 0 },
  { id: 2, name: '部门B', parentId: 0 },
  { id: 3, name: '部门C', parentId: 1 },
  { id: 4, name: '部门D', parentId: 1 },
  { id: 5, name: '部门E', parentId: 2 },
  { id: 6, name: '部门F', parentId: 3 },
  { id: 7, name: '部门G', parentId: 2 },
  { id: 8, name: '部门H', parentId: 4 }
]
// 转换为:
const tree = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3
          }
        ]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0,
    children: [
      {
        id: 5,
        name: '部门E',
        parentId: 2
      },
      {
        id: 7,
        name: '部门G',
        parentId: 2
      }
    ]
  }
]
```

```js
// BFS(Breadth-First Search) 广度搜索优先
function convert(list) {
  let res = []
  // 使用Map保存id和对象的映射
  const map = list.reduce((res, v) => ((res[v.id] = v), res), {})
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item.parentId === 0) {
      res.push(item)
    }
    if (item.parentId in map) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return res
}

// DFS (Depth-First-Search) 深度优先搜索
// DFS (Depth-First-Search) 深度优先搜索
function convert2(source, parentId = 0) {
  let trees = []
  for (let item of source) {
    // 沿着 parentId 一直往下找
    if (item.parentId === parentId) {
      console.log('find parentId：', item.id)
      let children = convert2(source, item['id'])
      if (children.length > 0) {
        item.children = children
      }
      console.log('set item:', item)
      trees.push(item)
    }
  }

  return trees
}

console.log(JSON.stringify(convert2(list), null, 2))

// find parentId： 1
// find parentId： 3
// find parentId： 6
// set item: {id: 6, name: '部门F', parentId: 3}
// set item: {id: 3, name: '部门C', parentId: 1, children: Array(1)}
// find parentId： 4
// find parentId： 8
// set item: {id: 8, name: '部门H', parentId: 4}
// set item: {id: 4, name: '部门D', parentId: 1, children: Array(1)}
// set item: {id: 1, name: '部门A', parentId: 0, children: Array(2)}
// find parentId： 2
// find parentId： 5
// set item: {id: 5, name: '部门E', parentId: 2}
// find parentId： 7
// set item: {id: 7, name: '部门G', parentId: 2}
// set item: {id: 2, name: '部门B', parentId: 0, children: Array(2)}
```

### 将 树形结构转化为 js 数组对象

```js
const tree = [
  {
    id: 1,
    name: '部门A',
    parentId: 0,
    children: [
      {
        id: 3,
        name: '部门C',
        parentId: 1,
        children: [
          {
            id: 6,
            name: '部门F',
            parentId: 3
          }
        ]
      },
      {
        id: 4,
        name: '部门D',
        parentId: 1,
        children: [
          {
            id: 8,
            name: '部门H',
            parentId: 4
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '部门B',
    parentId: 0,
    children: [
      {
        id: 5,
        name: '部门E',
        parentId: 2
      },
      {
        id: 7,
        name: '部门G',
        parentId: 2
      }
    ]
  }
]

function convert(tree) {
  let res = []
  for (let i = 0; i < tree.length; i++) {
    const element = tree[i]
    if (element.children && element.children.length > 0) {
      const { children, ...item } = element
      res.push(item)
      res.push(...convert(element.children))
    } else {
      res.push(element)
    }
  }
  return res
}
// 参考：https://juejin.cn/post/6952442048708345863
// BFS: 沿着树的宽度遍历节点。采用队列来辅助完成广度遍历
function treeTolist(tree) {
  const list = []
  const queue = [...tree]
  while (queue.length) {
    const node = queue.shift()
    const childs = node.children
    if (childs) {
      queue.push(...childs)
    }
    const { children, ...item } = node
    list.push(item)
  }
  return list
}
// DFS: 沿着树的深度遍历。采用栈来辅助完成深度遍历。
function treeTolist2(tree) {
  const list = []
  const stack = [...tree]
  while (stack.length) {
    const node = stack.pop()
    const childs = node.children
    if (childs) {
      stack.push(...childs)
    }
    const { children, ...item } = node
    list.push(item)
  }
  return list
}

console.log(JSON.stringify(treeTolist2(tree), null, 2))
```

### 把对象键名以[get](https://www.lodashjs.com/docs/lodash.get/)组合的展开为深层对象结构

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/212

```js
var entry = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

// 要求转换成如下对象
var output = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}
```

```js
function change2normal(entry) {
  let o = {}
  const keys = Object.keys(entry)
  for (const str of keys) {
    let val = entry[str]
    let keysArr = str.split(/[\.\[\]]+/)
    keysArr.reduce((prev, curr, index, array) => {
      if (index === array.length - 1) {
        prev[curr] = val
      }
      prev[curr] = prev[curr] || {} // 这里要记录下来
      return prev[curr]
    }, o)
  }
  return o
}

console.log(JSON.stringify(change2normal(entry), null, 2))
```

### 把深层对象结构按对象键名以[get](https://www.lodashjs.com/docs/lodash.get/)组合为普通对象

```js
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

// 要求转换成如下对象
var output = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}
```

```js
function flatObj(entry, startWith = []) {
  let o = {}
  const keys = Object.keys(entry)
  for (const key of keys) {
    let val = entry[key]
    if (typeof val === 'object') {
      let s = flatObj(val, startWith.concat([key]))
      if (JSON.stringify(s) !== '{}') {
        o = Object.assign(o, s)
      }
    } else {
      o[startWith.concat(key).join('.')] = val
    }
  }
  return o
}

function flatObj1(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      let keyName = `${parentKey}${key}`
      if (typeof obj[key] === 'object') flatObj1(obj[key], keyName + '.', result)
      else result[keyName] = obj[key]
    }
  }
  return result
}
const flatObj2 = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? prefix + '.' : ''
    if (typeof obj[k] === 'object') Object.assign(acc, flatObj2(obj[k], pre + k))
    else acc[pre + k] = obj[k]
    return acc
  }, {})

function flatObj3(entry) {
  function rec(entry, parentKey, result) {
    Object.keys(entry).forEach(key => {
      if (typeof entry[key] === 'object') {
        rec(entry[key], parentKey + key, result)
      } else {
        const keyname = parentKey.replace(/(?=\B)/g, '.') + '.' + key
        result[keyname] = entry[key]
      }
    })
  }
  rec(entry, (parentKey = ''), (result = {}))
  return result
}
// BSF
function flatObj4(entry) {
  const queue = Object.entries(entry)
  const res = {}
  while (queue.length) {
    const [key, obj] = queue.pop()
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v !== 'object') {
        res[`${key}.${k}`] = v
      } else {
        queue.push([`${key}.${k}`, v])
      }
    }
  }
  return res
}

console.log(JSON.stringify(flatObj4(entry), null, 2))
```

## 贪心算法

### 455. 分发饼干

> https://leetcode.cn/problems/assign-cookies/

假设你是一位很棒的家长，想要给你的孩子们一些小饼干。但是，每个孩子最多只能给一块饼干。

对每个孩子 i，都有一个胃口值  g[i]，这是能让孩子们满足胃口的饼干的最小尺寸；并且每块饼干 j，都有一个尺寸 s[j] 。如果 s[j] >= g[i]，我们可以将这个饼干 j 分配给孩子 i ，这个孩子会得到满足。你的目标是尽可能满足越多数量的孩子，并输出这个最大数值。

示例  1:

```
输入: g = [1,2,3], s = [1,1]
输出: 1
解释:
你有三个孩子和两块小饼干，3个孩子的胃口值分别是：1,2,3。
虽然你有两块小饼干，由于他们的尺寸都是1，你只能让胃口值是1的孩子满足。
所以你应该输出1。
```

示例  2:

````
输入: g = [1,2], s = [1,2,3]
输出: 2

解释:
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.
``` 

提示：

- 1 <= g.length <= 3 * 104
- 0 <= s.length <= 3 * 104
- 1 <= g[i], s[j] <= 231 - 1


```js
/**
 * @param {number[]} g 孩子的胃口
 * @param {number[]} s 饼干数量
 * @return {number}
 */
var findContentChildren = function(g, s) {
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)
  let num = 0
  let cookie = 0
  let child = 0
  while (child < g.length && cookie < s.length) {
    if (g[child] <= s[cookie]) {
      num++
      child++
    }
    cookie++
  }
  return num
}
````

## 双指针

### 1. 两数之和

> https://leetcode.cn/problems/two-sum

给定一个整数数组 nums  和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

```
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
```

示例 2：

```
输入：nums = [3,2,4], target = 6
输出：[1,2]
```

示例 3：

```
输入：nums = [3,3], target = 6
输出：[0,1]
```

提示：

- 2 <= nums.length <= 104
- -109 <= nums[i] <= 109
- -109 <= target <= 109
- 只会存在一个有效答案
- 进阶：你可以想出一个时间复杂度小于 O(n2) 的算法吗？

```js
// 具题意可知，出题者保证
// 1. numbers 中的数字不会重复
// 2. 只会存在一个有效答案

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

var twoSum2 = function(nums, target) {
  var _result
  nums.some(function(item, index) {
    var _index = nums.indexOf(target - item)
    if (_index !== -1 && index !== _index) {
      _result = [index, _index]
      return true
    }
  })
  return _result
}

// 双指针法
var twoSum3 = function(nums, target) {
  // Array.from 浅拷贝一个新的排序后的数组
  let arr = Array.from(nums).sort((a, b) => a - b)
  let i = 0,
    j = arr.length - 1
  while (i < j) {
    if (arr[i] + arr[j] === target) {
      return [nums.indexOf(arr[i]), nums.indexOf(arr[j])]
    } else if (arr[i] + arr[j] > target) {
      j--
    } else {
      i++
    }
  }
}
```

### 3. 无重复字符的最长子序

> https://leetcode.cn/problems/longest-substring-without-repeating-characters/

给定一个字符串 s ，请你找出其中不含有重复字符的最长子串的长度。

示例  1:

```
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
```

示例 2:

```
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。
```

示例 3:

```
输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。
```

提示：

- 0 <= s.length <= 5 \* 104
- s  由英文字母、数字、符号和空格组成

```js
const lengthOfLongestSubstring = str => {
  //...
}

console.log(lengthOfLongestSubstring('abcabcbb')) // 3
console.log(lengthOfLongestSubstring('bbbbb')) // 1
console.log(lengthOfLongestSubstring('pwwkew')) // 3
console.log(lengthOfLongestSubstring(' ')) // 1
console.log(lengthOfLongestSubstring('abba')) // 2
```

**滑动窗口法**

```js
const lengthOfLongestSubstring = s => {
  let max = 0
  let begin = 0
  const map = {}
  for (let i = 0; i < s.length; i++) {
    const element = s[i]
    if (map.hasOwnProperty(element)) {
      // 重复了，得出最大值，滑动左边界
      max = Math.max(max, i - begin)
      begin = map[element] < begin ? begin : map[element] + 1
      map[element] = i
    } else {
      // 无重复，继续滑动
      map[element] = i
    }
  }
  max = Math.max(max, s.length - begin)
  return max
}

var lengthOfLongestSubstring2 = function(s) {
  if (!s) {
    return 0
  }
  let result = 0
  let tmp = ''
  for (let i = 0; i < s.length; i++) {
    const index = tmp.indexOf(s[i])
    if (index === -1) {
      tmp += s[i]
      if (tmp.length > result) {
        result = tmp.length
      }
    } else {
      tmp = tmp.substring(index + 1) + s[i]
    }
  }
  return result
}

// 我称之为「两根手指法」。
var lengthOfLongestSubstring3 = function(s) {
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

### 283. 移动零

> https://leetcode.cn/problems/move-zeroes/

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/132

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

## 二分查找

### 704. 二分查找

> https://leetcode.cn/problems/binary-search/

给定一个  n  个元素有序的（升序）整型数组  nums 和一个目标值  target  ，写一个函数搜索  nums  中的 target，如果目标值存在返回下标，否则返回 -1。

示例 1:

```
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

示例  2:

```
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
```

解释: 2 不存在 nums 中因此返回 -1

提示：

- 你可以假设 nums  中的所有元素是不重复的。
- n  将在  [1, 10000]之间。
- nums  的每个元素都将在  [-9999, 9999]之间。

```js
// 递增的
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let m = 0
  let n = nums.length
  while (m < n) {
    let mid = Math.floor((n + m) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      n = mid - 1
    } else {
      m = mid + 1
    }
  }
  return -1
}
console.log(search([5], 5))
console.log(search([1, 2, 3, 4, 5, 7, 9, 11, 14, 16, 17, 22, 33, 55, 65], 4)) // 3
```

```js
// 这个是递减的
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  let m = 0
  let n = nums.length
  while (m < n) {
    let mid = Math.floor((n + m) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      m = mid + 1
    } else {
      n = mid
    }
  }
  return -1
}

// m = 0 n = 5 mid 2 => m3, n5
// m = 3 n = 5 mid 4 => m5,n5
// m = 5 n = 5 mid 5 => res
console.log(search([5, 4, 3, 2, 1], 5))
```

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

## 数据结构

栈

队列

链表

集合

哈希表

树

### 20. 有效的括号

> https://leetcode.cn/problems/valid-parentheses

给定一个只包括 '('，')'，'{'，'}'，'['，']'  的字符串 s ，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。
3. 每个右括号都有一个对应的相同类型的左括号。

示例 1：

```
输入：s = "()"
输出：true
```

示例  2：

```
输入：s = "()[]{}"
输出：true
```

示例  3：

```
输入：s = "(]"
输出：false
```

提示：

- 1 <= s.length <= 104
- s 仅由括号 '()[]{}' 组成

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const map = {
    '{': '}',
    '[': ']',
    '(': ')'
  }
  const stack = []
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i])
    } else if (s[i] !== map[stack.pop()]) {
      return false
    }
  }
  return stack.length === 0
}

console.log(isValid('()')) // true
console.log(isValid('()[]{}')) // true
console.log(isValid('(]')) // false
```

## 字符串

### 415. 字符串相加（大数加法）

> https://leetcode.cn/problems/add-strings/

给定两个字符串形式的非负整数  num1 和 num2 ，计算它们的和并同样以字符串形式返回。

你不能使用任何內建的用于处理大整数的库（比如 BigInteger），  也不能直接将输入的字符串转换为整数形式。

示例 1：

```
输入：num1 = "11", num2 = "123"
输出："134"
```

示例 2：

```
输入：num1 = "456", num2 = "77"
输出："533"
```

示例 3：

```
输入：num1 = "0", num2 = "0"
输出："0"
```

提示：

- 1 <= num1.length, num2.length <= 104
- num1 和 num2 都只包含数字  0-9
- num1 和 num2 都不包含任何前导零

```js
/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function(num1, num2) {}

console.log(addStrings('111', '99'))
console.log(addStrings('11111111101234567', '77777777707654321'))
console.log(addStrings('911111111101234567', '77777777707654321'))
```

```js
function addStrings(a, b) {
  let maxLength = Math.max(a.length, b.length)
  //用0去补齐长度
  a = a.padStart(maxLength, 0) //"111"
  b = b.padStart(maxLength, 0) //"099"
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

const addStrings = (a, b) => {
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
```

## 数组

### 给定两个数组，写一个方法来计算它们的交集

> https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/102

```js
var nums1 = [1, 2, 2, 1],
  nums2 = [2, 2, 3, 4]

// 错误解法
var fn = (num1, num2) =>
  num1.filter(function(item) {
    return num2.indexOf(item) > -1
  })
console.log(fn([1, 2, 2, 1], [2, 2, 3, 4])) // [2, 2]
console.log(fn([1, 1], [1])) //反例： [1, 1]

// 正确解法
const intersect = (nums1, nums2) => {
  const map = {}
  const res = []
  for (let n of nums1) {
    if (map[n]) {
      map[n]++
    } else {
      map[n] = 1
    }
  }
  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n)
      map[n]--
    }
  }
  return res
}

console.log(intersect([1, 2, 2, 1], [2, 2, 3, 4])) // [2, 2]
console.log(intersect([1, 1], [1])) // [1]
console.log(intersect([2, 2, 1], [1, 2, 2, 3, 4])) // [1, 2, 2]
```

## 动态规划

## 参考

- https://github.com/Advanced-Frontend/Daily-Interview-Question
- https://github.com/sisterAn/JavaScript-Algorithms
- http://www.caoyuanpeng.com/
- 谷歌高畅的 leetcode 刷题笔记
