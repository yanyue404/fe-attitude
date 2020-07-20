/**
 *
 * @isArrayLike
 * @param {*} value
 * @returns Boolearn
 */
export function isArrayLike(value) {
  return (
    value != null && typeof value != 'function' && this.isLength(value.length)
  );
}



/**
 * isContains
 * @param {*} arr
 * @param {*} current
 * @returns
 */
export function isContains(arr, current) {
  if (Array.prototype.includes) {
    return arr.includes(current);
  }
  for (i = 0; i < arr.length && arr[i] != current; i++);
  return !(i == arr.length);
}

export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

/**
 * arrayIndex
 * @param {*} array
 * @param {*} element
 * @returns
 */
export function arrayIndex(array, element) {
  var index = array.indexOf(element);
  return index;
}

// 从数组中随机取出一个
export function randomOne(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// 数组乱序
export function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a;
}
