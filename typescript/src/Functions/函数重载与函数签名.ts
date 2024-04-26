// 函数重载发挥作用的场景。通过函数重载，我们可以在同一函数名下定义多个函数实现，根据不同的参数类型、数量或返回类型进行区分
function greet(name: string): string
function greet(age: number): string
function greet(value: any): string {
  if (typeof value === 'string') {
    return `Hello, ${value}`
  } else if (typeof value === 'number') {
    return `You are ${value} years old`
  }
}

type GreetFunction = {
  (name: string): string
  (age: number): string
}

// 箭头函数，虽然它们不直接支持函数重载，但我们可以通过定义函数签名的方式来实现类似的效果。
const greet2: GreetFunction = (value: any): string => {
  if (typeof value === 'string') {
    return `Hello, ${value}`
  } else if (typeof value === 'number') {
    return `You are ${value} years old.`
  }
  return ''
}
