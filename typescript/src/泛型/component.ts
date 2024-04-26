type Size = 'small' | 'middle' | 'large'

// 统一组件库的基础类型
type BaseProps<T> = {
  /**
   * 自定义样式类名
   */
  className?: string
  /**
   * 自定义样式对象
   */
  style?: Record<string, string | number>
  /**
   * 控制组件是否显示
   */
  visible?: boolean
  /**
   * 定义组件的大小，可选值为 small（小）、middle（中）或 large（大）
   */
  size?: Size
  /**
   * 是否禁用组件
   */
  disabled?: boolean
  /**
   * 组件是否为只读状态
   */
  readOnly?: boolean
  /**
   * 组件的默认值
   */
  defaultValue?: T
  /**
   * 组件的当前值
   */
  value?: T
  /**
   * 当组件值变化时的回调函数
   */
  onChange: (value: T) => void
}

// 基于这些基础类型，定义具体组件的属性类型变得简单而直接：

interface WInputProps extends BaseProps<string> {
  /**
   * 输入内容的最大长度
   */
  maxLength?: number
  /**
   * 是否显示输入内容的计数
   */
  showCount?: boolean
}
