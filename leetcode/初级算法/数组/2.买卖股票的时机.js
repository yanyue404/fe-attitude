/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let maxValue = 0;
  let tmp = 0;
  for (let i = 1; i < prices.length; i++) {
    tmp = prices[i] - prices[i - 1];
    if (tmp > 0) {
      maxValue += tmp;
    }
  }
 
  return maxValue;
};

var arr1 = [7,1,5,3,6,4];
var arr2 = [1,2,3,4,5];
var arr3 = [7,6,4,3,1];

console.log(maxProfit(arr1));
console.log(maxProfit(arr2));
console.log(maxProfit(arr3));
