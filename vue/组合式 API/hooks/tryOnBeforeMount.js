import { nextTick, onBeforeMount, getCurrentInstance } from 'vue'

// https://vueuse.org/shared/tryOnBeforeMount/
export function tryOnBeforeMount(fn, sync = true, target) {
  const instance = target || getCurrentInstance()
  if (instance) onBeforeMount(fn, target)
  else if (sync) fn()
  else nextTick(fn)
}
