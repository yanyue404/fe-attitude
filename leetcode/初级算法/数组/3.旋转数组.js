
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    var rotate = function (nums, k) {
      for (var i = 1; i <= k; i++) {
        nums.unshift(nums.pop());
      }
    };
    var nums1 = [1, 2, 3, 4, 5, 6, 7]
    var nums2 = [1, 2, 3];
    var nums3 = [1, 2];
    rotate(nums1, 3)
    rotate(nums2, 1)
    rotate(nums3, 0)
    console.log(nums1);
    console.log(nums2);
    console.log(nums3);
