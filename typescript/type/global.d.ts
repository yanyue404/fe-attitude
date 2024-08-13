// 应对window挂载属性 没有定义的处理
declare interface Window {
  ELEMENT: AnyObjectType
  urlParams: ObjectType
}

declare const urlParams: ObjectType

// 使用 jQuery 的脚本
declare var $: any
