import { nextTick, onMounted, getCurrentInstance } from 'vue'

//vueuse.org/shared/tryOnMounted/
export function tryOnMounted(fn, sync = true, target) {
  const instance = target || getCurrentInstance()
  if (instance) onMounted(fn, target)
  else if (sync) fn()
  else nextTick(fn)
}
