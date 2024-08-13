// ## 定义变量，只用来给出类型描述，是纯的类型代码，不允许设置变量的初始值，即不能涉及值。
declare let gx: number
gx = 1

declare var doc: Document
doc.title = 'Hello'

// 设置了变量的初始值就报错
declare let gx1: number = 1

// ## 声明 interface 和 type

// ## declare function

// 除了全局变量之外，可能有一些类型我们也希望能暴露出来。在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型

interface AjaxSettings {
  method?: 'GET' | 'POST'
  data?: any
}
declare namespace jQuery {
  function ajax(url: string, settings?: AjaxSettings): void
}

// 这样的话，在其他文件中也可以使用这个接口或类型了：
let settings: AjaxSettings = {
  method: 'POST',
  data: {
    name: 'foo'
  }
}
jQuery.ajax('/api/post_something', settings)

// 防止命名冲突 ./jq.ts

// ## declare 声明外部函数的类型描述。

declare function sayHello(name: string): void

sayHello('张三')

// 报错，只能声明类型且，不能带有函数的具体实现
function sayHello(name: string): void
function sayHello(name) {
  return '你好，' + name
}

// ## declare class

// ## declare module，declare namespace

declare namespace myLib {
  function makeGreeting(s: string): string
  let numberOfGreetings: number
}

// 下面的例子是当前脚本使用了myLib这个外部库，它有方法 makeGreeting() 和属性 numberOfGreetings。
let result = myLib.makeGreeting('你好')
console.log('欢迎词：' + result)
let count = myLib.numberOfGreetings

// 声明第三方模块，从该模块输入的所有接口都将为any类型。
declare module 'hot-new-module'

// 应对引用.vue不识别的处理
declare module '*.vue' {
  import { App, defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent> & {
    install(app: App): void
  }
  export default component
}

declare module '*.md' {
  const raw: string
  export default raw
}

// declare global
// 如果要为 JavaScript 引擎的原生对象添加属性和方法，可以使用declare global {}语法。

// 这个第一行的空导出语句export {}，作用是强制编译器将这个脚本当作模块处理。这是因为declare global必须用在模块里面。
export {}

declare global {
  interface String {
    toSmallString(): string
  }
}

String.prototype.toSmallString = (): string => {
  // 具体实现
  return ''
}

// 下面的示例是为 window 对象添加一个属性myAppConfig。
export {}

declare global {
  interface Window {
    myAppConfig: object
  }
}

const config = window.myAppConfig
