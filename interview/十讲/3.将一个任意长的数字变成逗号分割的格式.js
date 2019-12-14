var parseToMoney = function(number) {
  return number.toString().replace(/\B(?=(\d{3})+$)/g, ',');
};
console.log(parseToMoney(1234567)); // 1,234,567

function parseMoney2(num) {
  var num = (num || 0).toString(),
    result = '';
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result;
    num = num.slice(0, num.length - 3);
  }
  if (num) {
    result = num + result;
  }
  return result;
}
console.log(parseMoney2(1234567)); // 1,234,567

var string = '我的账户余额：2,235,467.20';
console.log(new Number(string.replace(/[^0-9.]/g, '')));
