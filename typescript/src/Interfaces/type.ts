// ! 接口与 type 的不同点
// * type可以声明基本数据类型别名/联合类型/元组等，而interface不行

// 基本类型别名
type UserName = string
type UserName2 = string | number

// 联合类型
type Cat = {
  name: 'cat'
}

type Dog = {
  name: 'dog'
}

type Animal = Cat | Dog

type List = [string, boolean, number]

// * interface能够合并声明，而type不行

interface Person {
  name: string
}
interface Person {
  age: number
}
// 此时 Person 同时具有 name 和age 属性
