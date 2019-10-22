/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  var arr = nums.sort();
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1]) {
      arr.splice(i, 2);
      i--;
    }
  }
  return arr[0];

};


console.log(singleNumber([4, 1, 2, 1, 2]));
