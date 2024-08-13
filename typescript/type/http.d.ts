// 确保这个文件被视为一个模块
export {}

interface ConfigOption {
  toast: boolean
  loading: boolean
  baseURL: string
  headers: Record<string, any>
}

declare global {
  // 可选的 http 接口调用配置项
  type HttpConfigOption = Partial<ConfigOption>

  interface ApiResponse<T> {
    status: number
    message: string
    data: T
  }
}
