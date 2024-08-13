// @ts-nocheck

// @ts-ignore 直接禁用掉对下一行代码的类型检查
const name: string = 599

// @ts-expect-error 只有在下一行代码真的存在错误时才能被使用，否则它会给出一个错误, 错误使用此指令，报错
const age: number = 599

// @ts-nocheck 禁用整个文件的 ts 类型检查，以下代码均不会抛出错误（仅当文件投声明时生效）
const name: string = 599
const age: number = 'linbudu'
const element = document.getElementById(123)
