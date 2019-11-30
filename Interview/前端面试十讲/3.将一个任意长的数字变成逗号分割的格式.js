var parseToMoney = function(number) {
  return number.toString().replace(/\B(?=(\d{3})+$)/g, ',');
};
console.log(parseToMoney(123456));

var string = '我的账户余额：2,235,467.20';
console.log(new Number(string.replace(/[^0-9.]/g, '')));
