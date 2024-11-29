import { ref, getCurrentInstance, onMounted } from 'vue'

// https://vueuse.org/core/useMounted/#usage
export default function useMounted() {
  const isMounted = ref(false)
  const instance = getCurrentInstance()
  if (instance) {
    onMounted(
      () => {
        isMounted.value = true
      },
      isVue2 ? void 0 : instance
    )
  }
  return isMounted
}
