function checkArray(array) {
  if (!Array.isArray(array)) {
    throw new Error('not an array')
  }
}

function swap(array, left, right) {
  ;[array[left], array[right]] = [array[right], array[left]]
}

// https://juejin.cn/post/6844903863812620296
function shuffle(arr) {
  let m = arr.length
  while (m > 1) {
    let index = Math.floor(Math.random() * m--)
    ;[arr[m], arr[index]] = [arr[index], arr[m]]
  }
  return arr
}
