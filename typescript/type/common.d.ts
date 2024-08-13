//通用对象类型
interface ObjectType {
  [prop: string]: string | number | boolean //索引签名
}

type AnyObjectType = Record<string, any>
