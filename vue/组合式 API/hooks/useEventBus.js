const events = new Map()

// https://vueuse.org/core/useEventBus/
export function useEventBus(key) {
  const scope = getCurrentScope() // 获取当前的作用域

  function on(listener) {
    const listeners = events.get(key) || new Set()
    listeners.add(listener)
    events.set(key, listeners)

    const _off = () => off(listener)
    // 自动取消订阅当作用域被处理时
    scope?.cleanups?.push(_off)
    return _off
  }

  function once(listener) {
    function _listener(...args) {
      off(_listener)
      listener(...args)
    }
    return on(_listener)
  }

  function off(listener) {
    const listeners = events.get(key)
    if (!listeners) return

    listeners.delete(listener)

    if (!listeners.size) reset()
  }

  function reset() {
    events.delete(key)
  }

  function emit(event, payload) {
    events.get(key)?.forEach(v => v(event, payload))
  }

  return { on, once, off, emit, reset }
}
