// 已知 Pick、Omit

// * Required， 将类型的属性变成必选，一个都不能少

interface PersonType {
  name?: string
  age?: number
  hobby?: string[]
}

const userT: Required<PersonType> = {
  name: '树哥',
  age: 18,
  hobby: ['code']
}

// * Partial， 与 Required 相反，将所有属性转换为可选属性

type UserZ = Partial<PersonType>

const shuge: UserZ = {
  name: '树哥'
}

// * Exclude 排除，Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉,剩余的属性构成新的类型

type T0 = Exclude<'a' | 'b' | 'c', 'a'> // "b" | "c"
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'> // "c"
type T2 = Exclude<string | number | (() => void), Function> // string | number

// * Extract， 和 Exclude 相反，Extract<T,U> 从 T 中提取出 U。

type T3 = Extract<'a' | 'b' | 'c', 'a' | 'f'> // "a"
type T4 = Extract<string | number | (() => void), Function> // () =>void

// * Readonly，把数组或对象的所有属性值转换为只读的，这就意味着这些属性不能被重新赋值。

interface PersonPPP {
  name: string
  age: number
  gender?: 'male' | 'female'
}

let p: Readonly<PersonPPP> = {
  name: 'hello',
  age: 10,
  gender: 'male'
}
// p.age = 11 // error  Cannot assign to 'age' because it is a read-only property.

// * Record， Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

type Property = 'key1' | 'key2'
type PersonOO = Record<Property, string>

const p23: PersonOO = {
  key1: 'hello 啊',
  key2: '树哥'
}

// * NonNullable，去除类型中的 null 和 undefined

type P1 = NonNullable<string | number | undefined> // string | number
type P2 = NonNullable<string[] | null | undefined> // string[]

// * ReturnType， 用来得到一个函数的返回值类型
type Func = (value: string) => string
const test: ReturnType<Func> = '1'

// * Parameters， 用于获得函数的参数类型所组成的元组类型。
type P22 = Parameters<(a: number, b: string) => void> // [number, string]

// * InstanceType，返回构造函数类型T的实例类型

class C {
  x = 0
  y = 0
}

type D = InstanceType<typeof C> // C
