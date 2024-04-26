// 对象类型类型：
// # Array
let list: number[] = [1, 2, 3]
let fruits: string[] = []
let list2: Array<number> = [1, 2, 3]
let list3: Array<any> = []
let numbers: (number | string)[] = [1, 2, 3, 4, '5']

// object表示非原始类型, 也就是除number/ ss/ boolean/ symbol/ null/ undefined之外的类型:
let obj1: object = []
let obj2: object = { a: 1, b: 2 }

// 任意的对象
type AnyObjectType = Record<string, any>
let normal: Record<string, any> = {}
normal.foo

//分享数组类型
type shareArrayType = {
  shareDesc: string
  shareState: number
  fromId?: string // 可选的
  [prop: string]: any // 除了以上还有其他的属性
}

//带出信息返回类型接口
interface LoginInfotype {
  isLogin: Boolean
  customerInfo: AnyObjectType
  [prop: string]: any
}

// 类型复用 - 扩展对象
// * type

type Image = {
  w: number
  h: number
}

type ClickArea = Image & {
  x: number
  y: number
}

// * interface
interface Image2 {
  w: number
  h: number
}

interface ClickArea2 extends Image2 {
  x: number
  y: number
}

// interface 复用 type 定义的类型：
interface ClickArea3 extends Image {
  x: number
  y: number
}

type ClickArea4 = Image2 & {
  x: number
  y: number
}

// 复用时新增属性的定义
// 这里的 Props 也可以使用type 进行定义
interface Props {
  a: string
  b: string
  c: string
}

// Props1，仅包含Props中的属性a和b，同时添加新属性e。

interface Props1 extends Omit<Props, 'c'> {
  e: string
}

interface Props2 extends Pick<Props1, 'a' | 'b'> {
  e: string
}

let cusProps: Props2 = {
  a: 'a',
  b: 'b',
  e: 'e'
}

// 组件属性定义：使用type还是interface, 推荐 interface
// 同名的接口可以自动合并，同名的类型别名会冲突，因此使用 interface 定义组件属性是不错的选择
interface UserInfo {
  name: string
}
interface UserInfo {
  age: number
}

const userInfo: UserInfo = { name: '张三', age: 23 }

// 自定义的 Write表示合并两个类型，如果有重复的key，用后面的覆盖前面。

type Write<T, U> = Omit<T, keyof U> & U
interface userA {
  name: string
  sex: number
}

interface userB {
  name: number
  sex: number
}

type W = Write<userA, userB>

const w: W = {
  name: 123,
  sex: 1
}
