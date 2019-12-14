// “兔子问题”：
// “假定一对大兔子每月能生一对小兔子，且每对新生的小兔子经过一个月可以长成一对大兔子,具备繁殖能力，
// 如果不发生死亡，且每次均生下一雌一雄，问一年后共有多少对兔子？

function fibonacci(n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
}
console.log(fibonacci(5));
// 1，1，2，3，5，8，13，21
