/**
* @param {number[]} nums
* @return {boolean}
*/
var containsDuplicate = function (nums) {
 var arr = [];
 var isTrue = null;
 if (nums.length < 1) {
   return false;
 }
 for (var i = 0; i < nums.length; i++) {
   if (!arr.includes(nums[i])) {
     arr.push(nums[i]);
     isTrue = false;
   } else {
     return true;
     break
   }
 }
 return isTrue;
};
console.log(containsDuplicate([3,1]));