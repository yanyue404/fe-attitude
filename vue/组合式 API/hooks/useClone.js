import { unref, isRef, ref, watch } from 'vue'
function toValue(r) {
  return typeof r === 'function' ? r() : unref(r)
}

function cloneFnJSON(source) {
  return JSON.parse(JSON.stringify(source))
}

// https://vueuse.org/core/useCloned/
export function useCloned(source, options = {}) {
  const cloned = ref({}) // 假设 ref 是已定义的
  const {
    manual, // 手动同步裁判, 默认 false
    clone = cloneFnJSON, // 默认克隆函数 JSON.parse(JSON.stringify())
    // watch options
    deep = true,
    immediate = true
  } = options

  function sync() {
    cloned.value = clone(toValue(source)) // 假设 toValue 是已定义的
  }

  if (!manual && (isRef(source) || typeof source === 'function')) {
    // 假设 isRef 是已定义的
    watch(source, sync, {
      ...options,
      deep,
      immediate
    }) // 假设 watch 是已定义的
  } else {
    sync()
  }

  return { cloned, sync }
}
