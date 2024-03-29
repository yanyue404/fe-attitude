> [排序算法]（https://github.com/yanyue404/blog/issues/22）

## 效率权衡

如何权衡一个算法的优势劣势？

主要是从算法所占用的「时间」和「空间」两个维度去考量。

- 时间维度：是指执行当前算法所消耗的时间，我们通常用「时间复杂度」来描述。
- 空间维度：是指执行当前算法需要占用多少内存空间，我们通常用「空间复杂度」来描述。

因此，评价一个算法的效率主要是看它的时间复杂度和空间复杂度情况。然而，有的时候时间和空间却又是「鱼和熊掌」，不可兼得的，那么我们就需要从中去取一个平衡点。

### 时间复杂度

常见的时间复杂度量级有：

- 常数阶 O(1)，算法未涉及循环等语句
- 对数阶 O(logN)，在算法循环 O(n)中，临界条件中的决定性变量累乘变化，加快循环的退出,例如： `let i = 1; while(i<n) { i = i * 2; }`
- 线性阶 O(n)，算法中的循环会执行 n 次
- 线性对数阶 O(nlogN)，把 O(logN)的代码再嵌套循环一遍
- 平方阶 O(n²)，把 O(n) 的代码再嵌套循环一遍
- 立方阶 O(n³)
- K 次方阶 O(n^k)
- 指数阶(2^n)

面从上至下依次的时间复杂度越来越大，执行的效率越来越低。

### 空间复杂度

常见的时间复杂度量级有：

- O(1), 算法执行时所需要的空间和算法的输入值无关, 对于输入数据量来说是一个常数的话，则称该算法为 原地工作
- O(n), 随着输入数据量 n 的增大，程序申请的临时空间成线性增长
- O(n2), 随着输入数据量 n 的增大，程序申请的临时空间成 n^2^ 关系增长

## 冒泡排序

冒泡排序的原理如下:

从第一个元素开始，把当前元素和下一个元素进行比较。如果当前元素大，那么就交换位置，重复操作直到比较到最后一个元素，那么此时(一轮结束后)最后一个元素就是该数组中最大的数；

下一轮重复以上操作，但是此时最后一个元素已经是最大数了，所以不需要再比较最后一个元素，只需要比较到 `length - 1 -i` 的位置

```js
function bubble(array) {
  for (let i = 0; i < array.length - 1; i++) {
    console.log('第' + (i + 1) + '轮开始')
    let flag = true
    // 从 0 到 `length - 1` 遍历
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        flag = false
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        console.log('第' + (j + 1) + '次：' + array.toString(array))
      }
    }
    if (flag) {
      console.log('第' + (i + 1) + '轮后数据结束变化更新')
      break
    }
  }
  return array
}
console.log(bubble([3, 2, 1, 4, 8, 6, 7]))
```

**打印：**

```bash
第1轮开始
第1次：2,3,1,4,8,6,7
第2次：2,1,3,4,8,6,7
第5次：2,1,3,4,6,8,7
第6次：2,1,3,4,6,7,8
第2轮开始
第1次：1,2,3,4,6,7,8
第3轮开始
第3轮后数据结束变化更新
[1, 2, 3, 4, 6, 7, 8]
```

## 快速排序

在数组中取一个数作为基准项，一般取中间的，没有正中间的这里向下取数，然后根据基准生成左右两边的数组，再分别对这两个数组进行排序，直到整个数组排列有序。

**大致分三步：**

1、找基准（一般是以中间项为基准）

2、遍历数组，小于基准的放在 left，大于基准的放在 right

3、递归

```js
function quickSort(arr) {
  //如果数组<=1,则直接返回
  if (arr.length <= 1) {
    return arr
  }
  var pivotIndex = Math.floor(arr.length / 2) //向下
  //找基准，并把基准从原数组删除
  var pivot = arr.splice(pivotIndex, 1)[0]
  //定义左右数组
  var left = []
  var right = []

  //比基准小的放在left，比基准大的放在right
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  //递归
  return quickSort(left).concat([pivot], quickSort(right))
}
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

#### 参考

- https://www.cnblogs.com/dll-ft/p/5850487.html
- http://hyuhan.com/2017/03/02/sorting-with-javascript/
- [算法的时间与空间复杂度](https://zhuanlan.zhihu.com/p/50479555)
