> 我的 leetcode: https://leetcode.cn/u/yanyue404/

> Github: https://github.com/yanyue404/leetcode

## 目录

- 字符串
  - 大数相加
- 数组
  - 交集
- 贪心算法
  - 分发饼干
  - 最大数
- 双指针
  - 两数之和
  - 无重复字符的最长子序
  - 移动零
- 二分查找
- 排序
  - 冒泡
  - 快排
- 递归
- 搜索
  - DFS 深度优先搜索
  - BFS 广度优先搜索
- 动态规划
  - 斐波那契数列
  - 爬楼梯
  - 打家劫舍
- 数据结构
  - 堆栈队列：判断括号字符串是否有效

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
console.log(fn([1, 2, 2, 1], [2, 2, 3, 4])) // 正确返回： [2, 2]
console.log(fn([1, 1], [1])) //反例： [1, 1], 应该是 [1]
```

这道题不是工程题，是道算法题。求的是两个数组的最长公共子序列 (子序列要求顺序，交集不需要）。所以上面用一个 filter 一个 includes 或者 indexOf 的都是错的。

反例很简单。

```js
var nums1 = [1]
var nums2 = [1, 1]
```

或者

```js
var nums1 = [1, 1]
var nums2 = [1]
```

交集应该是[1]

跑一下你们的方法就能知道错了。

这道题两种思路，空间换时间，或者不用额外空间就提升时间复杂度。

空间换时间的思路是用个 Hash 表来存数组 1 的元素以及出现的个数（此处需要遍历 n 次，并存一个 n 级别的空间）。
遍历数组 2，发现数组 2 里有 Hash 表里的值就存到 Result 数组里，并把 Hash 表内该值次数减一（为 0 之后就 Delete）。如果不存在 Hash 表里，就跳过。这样时间复杂度就是(m+n)

不用额外空间，就用遍历 n 的时候，判断值在不在 m 里，如果在，把 m 里的该值 push 到 Result 数组里，并将该值从 m 数组里删掉（用 splice）。这样就是不用额外空间，但是提高了时间复杂度。

```js
// 正确解法 空间换时间
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

// 重复就删除，如果在nums2中找到同样的元素，得把此元素从nums2中剔除，以防下次又匹配成功。
const nums1 = [1, 2, 2, 1]
const nums2 = [2, 2]

const doit = (array1, array2) => {
  const tmp = [...array2] // 避免修改array2，使函数doit变得纯洁
  return array1.filter(v => {
    const index = tmp.indexOf(v)
    if (index > -1) {
      tmp.splice(index, 1)
      return true
    }
    return false
  })
}

console.log(doit(nums1, nums2)) // [2,2]
console.log(doit([1, 1], [1])) // [1]
console.log(doit([1], [1, 1])) // [1]
```

### 返回数组中第 k 个最大元素

> https://leetcode.cn/problems/kth-largest-element-in-an-array

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  // 创建一个大小为 k 的小顶堆
  const minHeap = new Heap(k)
  // 将所有整数插入到小顶堆中
  while (nums.length) {
    minHeap.push(nums.pop())
  }
  // 返回小顶堆的堆顶元素
  return minHeap.pop()
}

class Heap {
  constructor(k) {
    this.arr = []
    this.k = k
  }

  // 返回小顶堆当前大小
  size() {
    return this.arr.length
  }

  // 向小顶堆中插入元素
  push(val) {
    if (this.size() < this.k) {
      this.arr.push(val)
      this._sortBack()
    } else if (val > this.arr[0]) {
      this.arr[0] = val
      this._sortFront()
    }
  }

  // 弹出小顶堆的堆顶元素
  pop() {
    const val = this.arr[0]
    const back = this.arr.pop()
    if (this.arr.length) {
      this.arr[0] = back
      this._sortFront()
    }
    return val
  }

  // 从小顶堆尾部向上调整小顶堆的结构
  _sortBack() {
    let i = this.arr.length - 1
    while (i > 0 && this.arr[i] < this.arr[Math.floor((i - 1) / 2)]) {
      ;[this.arr[i], this.arr[Math.floor((i - 1) / 2)]] = [this.arr[Math.floor((i - 1) / 2)], this.arr[i]]
      i = Math.floor((i - 1) / 2)
    }
  }

  // 从小顶堆顶部向下调整小顶堆的结构
  _sortFront() {
    let i = 0
    while (i * 2 + 1 < this.size()) {
      let temp = i
      if (this.arr[temp] > this.arr[i * 2 + 1]) temp = i * 2 + 1
      if (i * 2 + 2 < this.size() && this.arr[temp] > this.arr[i * 2 + 2]) temp = i * 2 + 2
      if (temp === i) break
      ;[this.arr[i], this.arr[temp]] = [this.arr[temp], this.arr[i]]
      i = temp
    }
  }
}
```

### 数组总和

找出数组中和为 sum 的 n 个数

> https://leetcode.cn/problems/combination-sum/description/

## 贪心算法

贪心算法则是一种**每次选择局部最优解**，并希望**通过多次局部最优解达到全局最优解**的方法。贪心算法通常用于求解问题的近似解，它对于某些问题可以得到最优解，但对于其他问题可能得不到最优解。贪心算法的关键在于每次选择当前看起来最好的选项，并相信这个选择在后面不会被改变。贪心算法简化了问题的复杂性，减少了计算的时间复杂度，但需要注意的是它并不适用于所有问题。

原理： 贪心算法每次选择局部最优解，并希望通过多次局部最优解达到全局最优解。贪心选择的策略通常是基于当前情况下的最佳选择。

例子：举一个最简单的例子：小明和小王喜欢吃苹果，小明可以吃五个，小王可以吃三个。已知苹果园里有吃不完的苹果，求小明和小王一共最多吃多少个苹果。在这个例子中，我们可以选用的贪心策略为，每个人吃自己能吃的最多数量的苹果，这在每个人身上都是局部最优的。又因为全局结果是局部结果的简单求和，且局部结果互不相干，因此局部最优的策略也同样是全局最优的策略。

特点：

- 贪心选择：贪心算法每次都选择当前看起来最好的选项，相信这个选择在后面不会被改变。
- 不回溯：贪心算法做出选择后，不会回溯修改之前的选择。
- 子问题无关：贪心算法不需要求解子问题或保存子问题的解，每一步的选择只与当前状态有关。
- 时间复杂度：贪心算法通常具有线性时间复杂度 O(n)，其中 n 表示问题规模。

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

```
输入: g = [1,2], s = [1,2,3]
输出: 2

解释:
你有两个孩子和三块小饼干，2个孩子的胃口值分别是1,2。
你拥有的饼干数量和尺寸都足以让所有孩子满足。
所以你应该输出2.

提示：

- 1 <= g.length <= 3 * 104
- 0 <= s.length <= 3 * 104
- 1 <= g[i], s[j] <= 231 - 1
```

```js
/**
 * @param {number[]} g 孩子的胃口
 * @param {number[]} s 饼干数量
 * @return {number}
 */
var findContentChildren = function(g, s) {
  // 贪心算法的思想是保证每次操作都是局部最优的，最后得到的结果也是全局最优的。
  // 从小到大排序，方便之后大小比较，依次将给胃口小的孩子分配小饼干，胃口大的孩子分配大饼干
  g = g.sort((a, b) => a - b)
  s = s.sort((a, b) => a - b)
  let num = 0
  let cookie = 0
  let child = 0
  // 双指针：孩子和饼干一起排队，挨个试
  while (child < g.length && cookie < s.length) {
    // 当前饼干大小满足了当前孩子的胃口
    if (s[cookie] >= g[child]) {
      num++
      child++ // 换下一个孩子
    }
    // 换下一个饼干
    cookie++
  }
  return num
}
```

### 179. 最大数

> https://leetcode.cn/problems/largest-number/description/

给定一组非负整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最大的整数。

注意：输出结果可能非常大，所以你需要返回一个字符串而不是整数。

```
示例 1：

输入：nums = [10,2]
输出："210"
示例 2：

输入：nums = [3,30,34,5,9]
输出："9534330"

提示：

1 <= nums.length <= 100
0 <= nums[i] <= 109
```

```js
/**
 * @param {number[]} nums
 * @return {string}
 */
var largestNumber = function(nums) {
  // 只有一个数直接返回
  if (nums.length == 1) {
    return nums[0] + ''
  }
  // 判断是否都是 0
  let isZero = 0
  nums.sort((a, b) => {
    if (a !== 0 || b !== 0) {
      isZero = 1
    }
    let strA = a.toString()
    let strB = b.toString()
    let changed = strB + strA - (strA + strB)
    return changed
  })
  if (isZero === 1) {
    return nums.join('')
  }
  return '0'
}
```

### 1663. 具有给定数值的最小字符串

小写字符 的 数值 是它在字母表中的位置（从 1 开始），因此 a 的数值为 1 ，b 的数值为 2 ，c 的数值为 3 ，以此类推。

字符串由若干小写字符组成，字符串的数值 为各字符的数值之和。例如，字符串 "abe" 的数值等于 1 + 2 + 5 = 8 。

给你两个整数 n 和 k 。返回 长度 等于 n 且 数值 等于 k 的 字典序最小 的字符串。

注意，如果字符串 x 在字典排序中位于 y 之前，就认为 x 字典序比 y 小，有以下两种情况：

- x 是 y 的一个前缀；
- 如果 i 是 x[i] != y[i] 的第一个位置，且 x[i] 在字母表中的位置比 y[i] 靠前。

```
示例 1：

输入：n = 3, k = 27
输出："aay"
解释：字符串的数值为 1 + 1 + 25 = 27，它是数值满足要求且长度等于 3 字典序最小的字符串。
示例 2：

输入：n = 5, k = 73
输出："aaszz"
```

```js
// 这里我们用 k-26(n-1)这个公式来推导，假设 n-1 个字符都是 z ，还是比 k 小，即 k-26(n-1) > 0
// 那么第一个字符只能是 k-26(n-1) 对应的字符了
// 如果 k-26(n-1) <= 0 ，那么说明第一个字符可以是 a 。然后再进行递归获取第二个字符。依次类推。
var getSmallestString = function(n, k) {
  let rest = n
  let str = ''
  while (rest) {
    const temp = k - 26 * (rest - 1)
    if (temp > 0) {
      str += String.fromCharCode('a'.charCodeAt() + temp - 1)
      k -= temp
    } else {
      str += 'a'
      k--
    }
    rest--
  }
  return str
}

console.log(getSmallestString(2, 28)) // bz
```

## 双指针

双指针主要用于遍历数组，两个指针指向不同的元素，从而协同完成任务。也可以延伸到多个数组的多个指针。

若两个指针指向同一数组，遍历方向相同且不会相交，则也称为滑动窗口（两个指针包围的区域即为当前的窗口），经常用于区间搜索。

若两个指针指向同一数组，但是遍历方向相反，则可以用来进行搜索，待搜索的数组往往是排好序的。

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
  // Array.from 浅拷贝一个新递增的排序后的数组
  let arr = Array.from(nums).sort((a, b) => a - b)
  let i = 0,
    j = arr.length - 1
  while (i < j) {
    // 左右正好
    if (arr[i] + arr[j] === target) {
      return [nums.indexOf(arr[i]), nums.indexOf(arr[j])]
      //左右大于目标，右指针向左滑动
    } else if (arr[i] + arr[j] > target) {
      j--
      //左右小于目标，左指针向右滑动
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

### 88. 归并两个有序数组

**题目描述**

给定两个有序数组，把两个数组合并为一个。

**输入输出样例**

输入是两个数组和它们分别的长度 m 和 n。其中第一个数组的长度被延长至 m + n，多出的 n 位被 0 填补。题目要求把第二个数组归并到第一个数组上，不需要开辟额外空间。

```
示例 1：

输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
示例 2：

输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
解释：需要合并 [1] 和 [] 。
合并结果是 [1] 。
示例 3：

输入：nums1 = [0], m = 0, nums2 = [1], n = 1
输出：[1]
解释：需要合并的数组是 [] 和 [1] 。
合并结果是 [1] 。
注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。
```

> 注意 这里我们使用了 ++ 和--的小技巧：a++ 和 ++a 都是将 a 加 1，但是 a++ 返回值为 a，而
> ++a 返回值为 a+1。如果只是希望增加 a 的值，而不需要返回值，则推荐使用 ++a，其运行速度
> 会略快一些。

我们直接利用 m 和 n 当作两个数组的指针，再额外创立一个 pos 指针，起始位置为 m+n−1。每次向前移动 m 或 n 的时候，也要向前移动 pos。这里需要注意，如果 nums1 的数字已经复制完，不要忘记把 nums2 的数字继续复制；如果 nums2 的数字已经复制完，剩余 nums1 的数字不需要改变，因为它们已经被排好序。

```js
const merge = (nums1, m, nums2, n) => {
  let pos = m-- + n-- - 1
  while (m >= 0 && n >= 0) {
    nums1[pos--] = nums1[m] > nums2[n] ? nums1[m--] : nums2[n--]
  }
  while (n >= 0) {
    nums1[pos--] = nums2[n--]
  }
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

二分查找也常被称为二分法或者折半查找，每次查找时通过将待查找区间分成两部分并只取一部分继续查找，将查找的复杂度大大减少。对于一个长度为 O(n) 的数组，二分查找的时间复
杂度为 O(logn)。

举例来说，给定一个排好序的数组 {3,4,5,6,7}，我们希望查找 4 在不在这个数组内。第一次折半时考虑中位数 5，因为 5 大于 4, 所以如果 4 存在于这个数组，那么其必定存在于 5 左边这一半。于是我们的查找区间变成了 {3,4,5}。（注意，根据具体情况和您的刷题习惯，这里的 5 可以保留也可以不保留，并不影响时间复杂度的级别。）第二次折半时考虑新的中位数 4，正好是我们需要查找的数字。于是我们发现，对于一个长度为 5 的数组，我们只进行了 2 次查找。如果是遍历数组，最坏的情况则需要查找 5 次。

二分查找也可以看作双指针的一种特殊情况，但我们一般会将二者区分。双指针类型的题，指针通常是一步一步移动的，而在二分查找里，指针每次移动半个区间长度。

### 704. 二分查找

> https://leetcode.cn/problems/binary-search/

给定一个  n  个元素有序的（升序）整型数组  nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

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

## 排序

- https://github.com/yanyue404/blog/issues/22

### 冒泡排序

冒泡排序（Bubble Sort），是一种计算机科学领域的较简单的排序算法。
它重复地走访过要排序的元素列，依次比较两个相邻的元素，如果顺序（如从大到小、首字母从 Z 到 A）错误就把他们交换过来。走访元素的工作是重复地进行直到没有相邻元素需要交换，也就是说该元素列已经排序完成。
这个算法的名字由来是因为越小的元素会经由交换慢慢“浮”到数列的顶端（升序或降序排列），就如同碳酸饮料中二氧化碳的气泡最终会上浮到顶端一样，故名“冒泡排序”。

```js
const arr = [5, 2, 7, 8, 34, 7, 39, 12, 56, 9, 1]

function bubbleSort(arr) {
  const len = arr.length
  // 外层循环i控制比较的轮数
  for (let i = 0; i < len; i++) {
    // 里层循环控制每一轮比较的次数j，arr[i] 只用跟其余的len - i个元素比较, 一轮搞定一个最大的放到末尾
    for (let j = 1; j < len - i; j++) {
      // 若前一个元素"大于"后一个元素，则两者交换位置
      if (arr[j - 1] > arr[j]) {
        ;[arr[j - 1], arr[j]] = [arr[j], arr[j - 1]]
      }
    }
  }
  return arr
}

console.log(bubbleSort(arr)) // [1, 2,  5,  7,  7, 8, 9, 12, 34, 39, 56]
```

改进的冒泡排序法：

```js
function bubbleSort(arr) {
  let temp = null,
    flag = 1
  const len = arr.length
  for (let i = 0; i <= len - 1 && flag === 1; i++) {
    flag = 0
    for (let j = 0; j < len - i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j + 1]
        arr[j + 1] = arr[j]
        arr[j] = temp
        flag = 1 // 发生数据交换flag置为1
      }
    }
  }
  return arr
}
```

### 快速排序

快速排序（Quick Sort）是对冒泡排序的一种改进。

快速排序由 C. A. R. Hoare 在 1960 年提出。它的基本思想是：通过一趟排序将要排序的数据分割成独立的两部分，其中一部分的所有数据都比另外一部分的所有数据都要小，然后再按此方法对这两部分数据分别进行快速排序，整个排序过程可以递归进行，以此达到整个数据变成有序序列。

```js
// http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html
// 快排
// 快排的原理如下：
//  第一步，选择中间的元素作为"基准", 在原有的数组中把它移除。（基准值可以任意选择，但是选择中间的值比较容易理解。）
//  第二步，按照顺序，将每个元素与"基准"进行比较，形成两个子集，一个"小于基准"，另一个"大于基准"。
//  第三步，对两个子集不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr //递归出⼝
  }
  var pivotIndex = Math.floor(arr.length / 2)
  // 取出基准值
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(pivot, quickSort(right))
}
// 该算法的复杂度和归并排序是相同的，但是额外空间复杂度比归并排序少，只需 O(logN)，并且相比归并排序来说，所需的常数时间也更少。
console.log(quickSort([3, 2, 1, 4, 8, 6, 7]))
```

**原地快排**

```js
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low >= high) return
  let left = low
  let right = high
  let flag = arr[left]
  // 判断左右游标是否重合，如果重合，循环结束
  while (left < right) {
    // 右边大,继续向左比较
    if (flag <= arr[right]) {
      right--
    }
    // 交换下一个可能不合理的位置
    arr[left] = arr[right]
    // 左边大,继续向右比较
    if (flag >= arr[left]) {
      left++
    }
    // 交换下一个
    arr[right] = arr[left]
  }
  //重合之后，交换基准数
  arr[left] = flag
  quickSort(arr, low, left - 1)
  quickSort(arr, left + 1, high)

  return arr
}
console.log(quickSort([4, 3, 8, 1, 9, 6, 2]))
```

## 递归

- https://github.com/yanyue404/blog/issues/118

## 搜索

深度优先搜索（depth-first seach，DFS）和广度优先搜索（breadth-first search，BFS）是两种最常见的优先搜索方法，它们被广泛地运用在图和树等结构中进行搜索。

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
  // 使用Map保存id和对象的映射, 浅拷贝，操作 map 就是操作 list
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

## 动态规划

动态规划的核心思想是将复杂的问题拆分成更小的子问题，并通过保存子问题的解来避免重复计算。它适用于求解最优化问题，例如最长公共子序列、背包问题等。动态规划的关键在于找到子问题与原问题之间的关系，利用子问题的解构建起整个问题的解。通过迭代求解子问题，最终得到原问题的解。动态规划的优势在于它能够减少重复计算，提高计算效率，并且可以处理一些复杂度较高的问题。

原理： 动态规划通过将复杂问题拆解为更小的子问题，并保存子问题的解来避免重复计算。通过求解子问题，最终得到原问题的解。

特点：

- 最优子结构：原问题的最优解包含子问题的最优解。子问题的最优解可以通过递归或迭代的方式求解。
- 重叠子问题：子问题之间存在重叠，即相同的子问题会被多次求解。为了避免重复计算，动态规划使用表格或数组来存储子问题的解。
- 自底向上求解：动态规划通常从最小的子问题开始，逐步求解更大规模的子问题，直至求解原问题。
- 状态转移方程：动态规划通过定义状态和状态之间的关系，建立状态转移方程，用于计算子问题的解。
- 时间复杂度：动态规划的时间复杂度通常为 O(n^2)或 O(n^3)，其中 n 表示问题规模。

在面试中，动态规划的常用状态转移方程可以根据问题的具体情况有所不同。以下是几个常见的动态规划问题和它们对应的状态转移方程示例：（参 https://juejin.cn/post/7240751116701728805）

1.  **斐波那契数列**（Fibonacci Sequence）：

    - `dp[i] = dp[i-1] + dp[i-2]`，其中 `dp[i]` 表示第 `i` 个斐波那契数。

2.  **爬楼梯问题**（Climbing Stairs）：

    - `dp[i] = dp[i-1] + dp[i-2]`，其中 `dp[i]` 表示爬到第 `i` 级楼梯的方法数。

3.  **背包问题**（Knapsack Problem）：

    - `dp[i][j] = max(dp[i-1][j], dp[i-1][j-weight[i]] + value[i])`，其中 `dp[i][j]` 表示在前 `i` 个物品中选择总重量不超过 `j` 的最大价值，`weight[i]` 表示第 `i` 个物品的重量，`value[i]` 表示第 `i` 个物品的价值。

4.  **最长递增子序列**（Longest Increasing Subsequence）：

    - `dp[i] = max(dp[j] + 1, dp[i])`，其中 `dp[i]` 表示以第 `i` 个元素结尾的最长递增子序列的长度，`j` 为 `0` 到 `i-1` 的索引，且 `nums[i] > nums[j]`。

5.  **最大子数组和**（Maximum Subarray Sum）：

    - `dp[i] = max(nums[i], nums[i] + dp[i-1])`，其中 `dp[i]` 表示以第 `i` 个元素结尾的最大子数组和。

6.  **最长公共子序列**（Longest Common Subsequence）：

    - 如果 `str1[i]` 等于 `str2[j]`，则 `dp[i][j] = dp[i-1][j-1] + 1`；

    - 否则，`dp[i][j] = max(dp[i-1][j], dp[i][j-1])`，其中 `dp[i][j]` 表示 `str1` 的前 `i` 个字符和 `str2` 的前 `j` 个字符的最长公共子序列的长度。

7.  **编辑距离**（Edit Distance）：

    - 如果 `word1[i]` 等于 `word2[j]`，则 `dp[i][j] = dp[i-1][j-1]`；

    - 否则，`dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`，其中 `dp[i][j]` 表示将 `word1` 的前 `i` 个字符转换为 `word2` 的前 `j` 个字符所需的最少操作次数。

8.  **打家劫舍**（House Robber）：

    - `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`，其中 `dp[i]` 表示前 `i` 个房屋能够获得的最大金额，`nums[i]` 表示第 `i` 个房屋中的金额。

9.  **最大正方形**（Maximal Square）：

    - 如果 `matrix[i][j]` 等于 1，则 `dp[i][j] = min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1`；

    - 否则，`dp[i][j] = 0`，其中 `dp[i][j]` 表示以 `matrix[i][j]` 为右下角的最大正方形的边长。

### 斐波那契数列

斐波那契数列（Fibonacci sequence），又称黄金分割数列 [1]，因数学家莱昂纳多·斐波那契（Leonardo Fibonacci）以兔子繁殖为例子而引入，故又称“兔子数列”，其数值为：1、1、2、3、5、8、13、21、34……在数学上，这一数列以如下递推的方法定 z 义：F(0)=1，F(1)=1, F(n)=F(n - 1)+F(n - 2)（n ≥ 2，n ∈ N\*）。

斐波那契数列是指这样一个数列：1，1，2，3，5，8，13，21，34，55，89……这个数列从第 3 项开始 ，每一项都等于前两项之和。

```js
// 单纯递归 O(2^n)
function fib(n) {
  if (n <= 1) {
    return n
  }
  return fib(n - 1) + fib(n - 2)
}

console.log(fib(10)) // 55

// 动态规划避免重复计算，重叠子问题
function fibonacci(n) {
  if (n <= 1) {
    return n
  }
  let fib = [0, 1] // 保存斐波那契数列的结果

  for (let i = 2; i <= n; i++) {
    // 状态转移方程为dp[i] = dp[i-1] + dp[i-2]
    fib[i] = fib[i - 1] + fib[i - 2] // 计算第i个斐波那契数
  }

  return fib[n]
}

console.log(fibonacci(100)) // 354224848179262000000
```

### 爬楼梯

```
题目描述：假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 n 是一个正整数。

示例 1：

输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。

1 阶 + 1 阶
2 阶

示例 2：
输入： 3
输出： 3

解释： 有三种方法可以爬到楼顶。

1 阶 + 1 阶 + 1 阶
1 阶 + 2 阶
2 阶 + 1 阶
```

从第 4 节分析，可以有五种方法爬到楼梯

- 1 + 1 + 1 + 1
- 1 + 2 + 1
- 1 + 1 + 2
- 2 + 1 + 1
- 2 + 2

在这道题里，“问题的终点”指的就是走到第 n 阶楼梯这个目标对应的路径数，我们把它记为 f(n)。

那么站在第 n 阶楼梯这个视角， 有哪些后退的可能性呢？按照题目中的要求，一次只能后退 1 步或者 2 步。因此可以定位到从第 n 阶楼梯只能后退到第 n-1 或者第 n-2 阶。我们把抵达第 n-1 阶楼梯对应的路径数记为 f(n-1)，把抵达第 n-2 阶楼梯对应的路径数记为 f(n-2)，不难得出以下关系：

```js
// 爬楼梯问题与斐波那契数列 状态转移方程相同
f(n) = f(n - 1) + f(n - 2)
```

```js
/**
 * 记忆化搜索提效递归解法
 * @param {number} n
 * @return {number}
 */
// 定义记忆数组 f
const f = []
const climbStairs = function(n) {
  if (n == 1) {
    return 1
  }
  if (n == 2) {
    return 2
  }
  // 若f[n]不存在，则进行计算
  if (f[n] === undefined) f[n] = climbStairs(n - 1) + climbStairs(n - 2)
  // 若f[n]已经求解过，直接返回
  return f[n]
}

/**
 * 记忆化搜索转化为动态规划
 * @param {number} n
 * @return {number}
 */
const climbStairs2 = function(n) {
  // 初始化状态数组
  const f = []
  // 初始化已知值
  f[1] = 1
  f[2] = 2
  // 动态更新每一层楼梯对应的结果
  for (let i = 3; i <= n; i++) {
    f[i] = f[i - 2] + f[i - 1]
  }
  // 返回目标值
  return f[n]
}
console.log(climbStairs(5))
// console.log(climbStairs2(10))
```

### 打家劫舍

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。

```
示例 1：
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
  偷窃到的最高金额 = 1 + 3 = 4 。

示例 2：
输入：[2,7,9,3,1]
输出：12
解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
  偷窃到的最高金额 = 2 + 9 + 1 = 12 。

提示：

1 <= nums.length <= 100
0 <= nums[i] <= 400
```

如果只有一个房间，则偷窃该房间能得到最大金额，如果只有两个房间，则偷金额最大的一个房间。由题可知不能偷连续两个房间，当房间数大于 2 时，有两个偷窃选项：

偷窃第 k 间房屋，那么就不能偷窃第 k−1 间房屋，偷窃总金额为前 k−2 间房屋的最高总金额与第 k 间房屋的金额之和。
不偷窃第 k 间房屋，偷窃总金额为前 k−1 间房屋的最高总金额。

在两个选项中选择偷窃总金额较大的选项，该选项对应的偷窃总金额即为前 k 间房屋能偷窃到的最高总金额。假设 dp[k] 是前 k 个房间偷到的最大金额，则可以得到公式：dp[k] = max(dp[k-2] + nums[k], dp[k-1])

```ts
function rob(nums: number[]): number {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]

  const bp: number[] = []
  bp[0] = nums[0]
  bp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < nums.length; i++) {
    bp[i] = Math.max(bp[i - 2] + nums[i], bp[i - 1])
  }

  return bp[nums.length - 1]
}
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
    // 遇到左括号，入栈
    if (map[s[i]]) {
      stack.unshift(s[i])
      // 遇到右括号，拿栈顶元素与当前匹配，不一样直接退出
    } else if (s[i] !== map[stack.shift()]) {
      return false
    }
  }
  // 防止全部为左括号
  return stack.length === 0
}

// 不用栈可以做吗？

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid2 = function(s) {
  let len = s.length
  // 长度不是偶数直接返回 false
  if (len % 2 !== 0) {
    return false
  }

  // 是偶数，遍历长度为一半，每次遍历找到对应的括号将它替换成""
  // 每一轮至少可以替换一对括号
  let length = len / 2
  for (let i = 0; i < length; i++) {
    s = s.replace(/(\(\))|(\[\])|(\{\})/g, '')
    // 优化轮次
    if (s.length === 0) {
      return true
    }
  }

  return s.length === 0
}

// 找到最内层的括号对，消去，重复此过程，若存在无法消去的字符则说明字符串无效。
var isValid3 = function(s) {
  if (s.length % 2 !== 0) return false
  while (s.length) {
    let temp = s
    s = s.replace(/(\(\))|(\[\])|(\{\})/g, '')
    // 消不了直接返回
    if (s == temp) return false
  }
  return true
}

console.log(isValid3('()')) // true
console.log(isValid3('()[]{}')) // true
console.log(isValid3('(]')) // false
console.log(isValid3('{([])}')) // false
```

## 参考

- https://github.com/Advanced-Frontend/Daily-Interview-Question
- https://github.com/sisterAn/JavaScript-Algorithms
- http://www.caoyuanpeng.com/
- 谷歌高畅的 leetcode 刷题笔记
- [点亮思维火花：动态规划和贪心算法的启示与应用](https://juejin.cn/post/7316797749518352411)
