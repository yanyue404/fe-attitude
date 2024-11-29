import { onBeforeUnmount, getCurrentInstance } from 'vue'

/**
 * Call onBeforeUnmount() if it's inside a component lifecycle, if not, do nothing
 *
 * @param fn
 * @param target
 */
export function tryOnBeforeUnmount(fn, target) {
  const instance = target || getCurrentInstance()
  if (instance) onBeforeUnmount(fn, target)
}
