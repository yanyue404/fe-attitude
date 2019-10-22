/**
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number[]}
*/
var intersect = function (nums1, nums2) {
 var same = [];
 for (var i = 0; i < nums1.length; i++) {
   for (var j = 0; j < nums2.length; j++) {
     let x = nums1[i];
     let y = nums2[j];
     if (x == y) {
       same.push(x);
       nums1.splice(i, 1);
       nums2.splice(j, 1);
       i--;
     }
   }
 }
 return same;
}

console.log(intersect([1, 2, 2, 1], [1, 2]))