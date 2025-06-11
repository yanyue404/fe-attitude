function calc(a, operator, b) {
  // 使用 new Function 动态生成计算函数
  return new Function('a', 'operator', 'b', `return ${a} ${operator} ${b}`)()
}

console.log(calc(5, '+', 3)) // 输出 8
console.log(calc(10, '-', 1)) // 输出 9
console.log(calc(6, '*', 7)) // 输出 42
console.log(calc(99, '/', 9)) // 输出 11

function createCalculator(operator) {
  // 支持的运算符
  const operators = {
    '+': 'a + b',
    '-': 'a - b',
    '*': 'a * b',
    '/': 'a / b'
  }

  // 验证运算符是否有效
  if (!operators[operator]) {
    throw new Error('无效的运算符！支持：+, -, *, /')
  }

  // 使用 new Function 动态生成计算函数
  return new Function('a', 'b', `return ${operators[operator]};`)
}

// 包装函数，处理输入验证和错误，operator 为第二个参数
function calculate(a, operator, b) {
  // 确保输入是数字
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('请输入有效的数字！')
  }

  // 处理除以零
  if (operator === '/' && b === 0) {
    throw new Error('除数不能为零！')
  }

  // 创建计算函数并执行
  const calc = createCalculator(operator)
  return calc(a, b)
}

// 测试用例
try {
  console.log(calculate(10, '+', 5)) // 输出：15
  console.log(calculate(10, '-', 5)) // 输出：5
  console.log(calculate(10, '*', 5)) // 输出：50
  console.log(calculate(10, '/', 5)) // 输出：2
  console.log(calculate(10, '/', 0)) // 抛出错误：除数不能为零！
  console.log(calculate(10, '%', 5)) // 抛出错误：无效的运算符！
  console.log(calculate('abc', '+', 5)) // 抛出错误：请输入有效的数字！
} catch (error) {
  console.error(error.message)
}

window.other = 'hanmeimei'

// 但是当使用 new Function 创建函数时，其 [[Environment]] 被设置为引用全局环境，而不是当前词法环境。因此，这样的函数无法访问外部变量，只能访问全局变量。
const sayMyFriend = new Function(
  'data',
  'other',
  `
  console.log(this.name + "'s friends " + data.friend + ' and ' + window.other);
  `
).bind({ name: 'yanyue404' }, { friend: 'lilei' }) // yanyue404's friends lilei and hanmeimei

sayMyFriend()
