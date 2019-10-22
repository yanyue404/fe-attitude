var twoSum = function (nums, target) {
  var len = nums.length;
  for (var i = 0; i < len; i++) {
    for (var j = i + 1; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return null
};
var two = twoSum(
  [3, 2, 4], 6
);
console.log(two);