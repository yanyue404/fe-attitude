function mitt(all) {
  return {
    all: (all = all || new Map()),
    on(eventName, func) {
      var cbs = all.get(eventName)
      ;(cbs && cbs.push(func)) || all.set(eventName, [func])
    },
    once(eventName, func) {
      let fn = (...arg) => func(...arg)
      fn._once = true
      this.on(eventName, fn)
    },
    off(eventName, func) {
      var cbs = all.get(eventName)
      cbs && cbs.splice(cbs.indexOf(func) >>> 0, 1)
    },
    emit(eventName, ...arg) {
      ;(all.get(eventName) || []).slice().map(cb => {
        cb(...arg)
        cb._once && this.off(eventName, cb)
      })
      ;(all.get('*') || []).slice().map(cb => {
        cb(eventName, ...arg)
        cb._once && this.off(eventName, cb)
      })
    }
  }
}

const eventHub = mitt()

export { mitt, eventHub }
export default eventHub
