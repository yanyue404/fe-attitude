/**
 * @param {number[]} nums
 * @return {number}
 */
var nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];

var removeDuplicates = function (nums) {
  var newArr = [];
  for (var i = 0; i < nums.length; i++) {
    if (!newArr.includes(nums[i])) {
      newArr.push(nums[i]);
    } else {
      nums.splice(i, 1);
      i--;
    }
  }
  return nums.length;
};

var len = removeDuplicates(nums);
for (var i = 0; i < len; i++) {
  console.log(nums[i]);
}