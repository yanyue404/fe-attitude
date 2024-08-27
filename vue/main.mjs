import {
  computed,
  defineComponent,
  getCurrentInstance,
  h as hDemi,
  isVue2,
  isVue3,
  onMounted,
  onUnmounted,
  ref,
  unref,
  watch,
  watchEffect
} from 'vue-demi'
if (isVue2) {
  // Vue 2 only
  console.log('now is vue2')

  const state = ref('hello')

  console.log('state: ', state)
} else {
  // Vue 3 only
  console.log('now is vue3')
}

function adaptOnsV3(ons) {
  if (!ons) return null
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1)
    key = `on${key}`
    return { ...ret, [key]: handler }
  }, {})
}

function h(type, options, children) {
  if (isVue2) return hDemi(type, options, children)

  const { props, domProps, on, ...extraOptions } = options

  const ons = adaptOnsV3(on)
  const params = { ...extraOptions, ...props, ...domProps, ...ons }
  return hDemi(type, params, children)
}

const comp = defineComponent({
  name: 'VueComponent',
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  emits: ['load'],
  data() {
    return {}
  },
  watch: {},
  mounted() {
    console.log('mounted')
    this.handler()
  },
  methods: {
    handler() {
      this.$emit('load', 'loaded!')
    }
  },
  render() {
    const handlers = {
      load: this.handler
    }
    return h('div', { class: 'hello', on: handlers }, 'hello')
  }
})

console.log('comp: ', comp)
