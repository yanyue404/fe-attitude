import { unref, watch } from 'vue'
function toValue(r) {
  return typeof r === 'function' ? r() : unref(r)
}

/**
 * Watch for an array with additions and removals.
 *
 * @see https://vueuse.org/watchArray
 */
export function watchArray(source, cb, options) {
  let oldList = options?.immediate
    ? []
    : [typeof source === 'function' ? source() : Array.isArray(source) ? source : toValue(source)]

  return watch(
    source,
    (newList, _, onCleanup) => {
      const oldListRemains = Array.from({ length: oldList.length })
      const added = []

      for (const obj of newList) {
        let found = false
        for (let i = 0; i < oldList.length; i++) {
          if (!oldListRemains[i] && obj === oldList[i]) {
            oldListRemains[i] = true
            found = true
            break
          }
        }
        if (!found) added.push(obj)
      }

      const removed = oldList.filter((_, i) => !oldListRemains[i])
      cb(newList, oldList, added, removed, onCleanup)
      oldList = [...newList]
    },
    options
  )
}
