<!-- https://github.com/themeselection/vue-cheatsheet -->

# Vue Basic

## Data binding

```vue
<script setup lang="ts">
import { ref } from 'vue'

const msg = ref('Hello World!')
const htmlContent = ref('<h1>In Heading Tag</h1>')
</script>

<template>
  <!-- Render `msg` variable -->
  <p>{{ msg }}</p>
  // [!code hl]

  <!-- Bind HTML instead of string. Similar to `.innerHTML` -->
  <div v-html="htmlContent"></div>
  // [!code hl]
</template>
```

## Attribute Bindings

```vue
<!-- Passing `dynamicId` as attribute -->
<div v-bind:id="dynamicId"></div>

<!-- `:id` is a Shorthand of `v-bind:id` -->
<div :id="dynamicId"></div>

<!-- It can be passed directly without specifying a value, using the same name as the attribute. -->
<div v-bind:id></div>

<!-- `:id` is a Shorthand of `v-bind:id` -->
<div :id></div>
```

### Event Bindings

```vue
<!-- method handler -->
<button v-on:click="doThis"></button>

<!-- shorthand -->
<button @click="doThis"></button>
```

::: info
Furthermore, we'll exclusively use shorthand notation
:::

### Boolean Attributes

```vue
<script setup>
import { ref } from 'vue'

const isButtonDisabled = ref(true)
</script>

<template><button :disabled="isButtonDisabled">Button</button> // [!code hl]</template>
```

### Dynamically Binding Multiple Attributes

```vue
<script setup>
const inputAttrs = {
  id: 'container',
  class: 'wrapper'
}
</script>

<template>
  <!-- Bind Multiple attributes by using a single variable -->
  <div v-bind="inputAttrs"></div>
  // [!code hl]
</template>
```

## Using JavaScript Expressions

```vue
<script setup>
import { ref } from 'vue'

const message = ref('Hello')
const number = 5
const ok = true
const id = 'wrapper'
</script>

<template>
  <!-- Mustache can have `JavaScript Expression` -->
  {{ number + 1 }}

  {{ ok ? 'YES' : 'NO' }}

  {{ message.split('').reverse().join('') }}

  <div :id="`list-${id}`">JavaScript Expression</div>
</template>
```

## Directives

> details Vue all Directives with their API
> <https://vuejs.org/api/built-in-directives.html>

```vue
<!-- Bind HTML instead of string. Similar to `.innerHTML` -->
<div v-html="htmlContent"></div>

<!-- bind an attribute -->
<img v-bind:src="imageSrc" />

<!-- conditionally displaying an element -->
<h1 v-show="ok">Hello!</h1>

<!-- Conditionally rendering the element -->
<div v-if="type === 'A'"> A </div>
<div v-else-if="type === 'B'"> B </div>
<div v-else-if="type === 'C'"> C </div>
<div v-else> Not A/B/C </div>

<!-- Render element or template multiple times -->
<div v-for="(item, index) in items"> {{ item }} </div>

<!-- Render the element and component once only, and skip future updates. -->
<span v-once>This will never change: {{msg}}</span>

<!-- Two-way data binding: -->
<input v-model="firstName" />

<!-- method handler -->
<button v-on:click="doThis"></button>

<!-- `Dynamic Arguments`: They are denoted by 'square brackets' after the directive name. -->
<a @[eventName]="doSomething"> ... </a>

<!-- `Modifiers`: They are special postfixes denoted by 'dot'. -->
<form @submit.prevent="onSubmit"> ... </form>

<!-- `v-pre`: Skip compilation for this element and all its children. -->
<span v-pre>{{ this will not be compiled }}</span>

<!-- `v-memo`: Memoize a sub-tree of the template. -->
<div v-memo="[valueA, valueB]"> ... </div>

<!-- `v-cloak`: Used to hide un-compiled template until it is ready -->
<div v-cloak>{{ message }}</div>
```

> `v-if` vs. `v-show`
>
> `v-if`: Use when the condition is unlikely to change often.
>
> `v-show`: Use when you need to toggle frequently.

### Example: Quick review of using 'v-for' with arrays and objects

```vue
<script setup>
import { ref } from 'vue'

const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

const myObject = ref({
  title: 'How to do lists in Vue',
  author: 'John Doe',
  publishedAt: '2016-04-10'
})
</script>

<template>
  <!-- Array -->
  <ul>
    <li v-for="(item, index) in items" :key="index">{{ index }} - {{ item.message }}</li>
  </ul>

  <!-- Array w/ Destructure -->
  <ul>
    <li v-for="({ message }, index) in items" :key="index">{{ index }} - {{ message }}</li>
  </ul>

  <!-- Object -->
  <ul>
    <!-- v-for="value in myObject" -->
    <!-- v-for="(value, key) in myObject" -->
    <li v-for="(value, key, index) in myObject" :key="index">{{ index }}. {{ key }}: {{ value }}</li>
  </ul>
</template>
```

## Template Refs

Give access to DOM elements.

```vue
<script setup>
import { ref, onMounted } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null)

onMounted(() => input.value.focus())
</script>

<template>
  <input ref="input" />
</template>
```

## Lifecycle Hooks

|      Hooks      |               Descpriton                |
| :-------------: | :-------------------------------------: |
|  beforeCreate   | After the instance has been initialized |
|     created     |      After the instance is created      |
|  onBeforeMount  |           Before mounting DOM           |
|    onMounted    |           DOM can be accessed           |
| onBeforeUpdate  |          Reactive data changes          |
|    onUpdated    |          DOM has been updated           |
| onBeforeUnmount |        Component still complete         |
|   onUnmounted   |            Teardown complete            |

## Event Handling

```vue
<!-- Inline Handler -->
<button v-on:click="console.log('hello')">print</button>

<!-- Method Handler -->
<button v-on:click="greet">Greet</button>

<!-- use shorthand for v-on `@` -->
<button @click="console.log('hello')">print</button>

<!-- Calling methods in inline handler -->
<button @click="say('hello')">Say hello</button>

<!-- Access Event Argument -->
<!-- using $event special variable -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>

<!-- using inline arrow function -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>

<!-- Event Modifiers -->
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>

<!-- use capture mode when adding the event listener     -->
<!-- i.e. an event targeting an inner element is handled -->
<!-- here before being handled by that element           -->
<div @click.capture="doThis">...</div>

<!-- the click event will be triggered at most once -->
<a @click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div @scroll.passive="onScroll">...</div>
```

### Key Modifiers

| Key Modifier      | Example Usage                             |
| ----------------- | ----------------------------------------- |
| keyup.enter       | Triggers Enter key up event               |
| keyup.tab         | Triggers Tab key up event                 |
| keyup.delete      | Triggers Delete or Backspace key up event |
| keyup.esc         | Triggers Escape key up event              |
| keyup.space       | Triggers Space key up event               |
| keyup.arrow-up    | Triggers arrow up key up event            |
| keyup.arrow-down  | Triggers arrow down key up event          |
| keyup.arrow-left  | Triggers arrow left key up event          |
| keyup.arrow-right | Triggers arrow right key up event         |

### Mouse modifiers

| Mouse Modifier   | Example Usage                     |
| ---------------- | --------------------------------- |
| mousedown.left   | Triggers Mouse left click event   |
| mousedown.right  | Triggers Mouse right click event  |
| mousedown.middle | Triggers Mouse middle click event |

# Reactivity

## `ref()`

A ref will make its value deeply reactive. This means you can expect changes to be detected even when you mutate nested objects or arrays.

```ts
const count = ref(0)

console.log(count.value) // 0

count.value = 10 // Will update the DOM as well

console.log(count.value) // 10
```

## `reactive()`

Unlike a ref which wraps the inner value in a special object, reactive() makes an object itself reactive.

```ts
const state = reactive({ count: 1 })

console.log(state) // {count: 1}
console.log(state.count) // 1
```

## `shallowRef()`

The inner value of a `shallowRef` is stored and exposed as-is, and will not be made deeply reactive

```ts
const state = shallowRef({ count: 1 })

// does NOT trigger change
state.value.count = 2

// does trigger change
state.value = { count: 2 }
```

## Computed Property

```vue
<script setup>
const value = ref(5)

const doubleValue = computed(() => value.value * 2) // [!code hl]
</script>

<template>
  <div>
    <p>Original value: {{ value }}</p>
    <p>Computed value: {{ doubleValue }}</p>
  </div>
</template>
```

创建一个可写的计算属性 ref：

```vue
<script setup>
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
</script>
```

调试：

```vue
<script setup>
const plusOne = computed(() => count.value + 1, {
  onTrack(e) {
    debugger
  },
  onTrigger(e) {
    debugger
  }
})
</script>
```

## Class and Style Bindings

```vue
<script setup>
import { ref } from 'vue'

const isActive = ref(true)
const hasError = ref(false)

const activeClass = ref('active')
const errorClass = ref('text-danger')

const activeColor = ref('red')
const fontSize = ref(30)

const styleObject = reactive({
  color: 'red',
  fontSize: '13px'
})
</script>

<template>
  <!-- Class Binding -->
  <div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>

  <!-- Binding class using Array -->
  <div :class="[activeClass, errorClass]"></div>

  <!-- toggle a class in the list conditionally -->
  <div :class="[isActive ? activeClass : '', errorClass]"></div>

  <!-- Style Binding -->
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

  <!-- Multiple Style Binding -->
  <div :style="styleObject"></div>

  <!-- style binding using v-bind -->
  <div class="error-text"></div>
</template>

<style scoped>
/* dynamically bind color */
.error-text {
  color: v-bind(error-color);
}
</style>
```

> tip: When a `<style>` tag has the scoped attribute, its CSS will apply to elements of the current component only.

## Events

```vue
<button @click="addToCart"> ... </button>

<!-- Arguments can be passed -->
<button @click="addToCart(product)"> ...  </button>

<!-- To prevent default behavior (e.g. page reload) -->
<form @submit.prevent="addProduct"> ... </form>

<!-- Only trigger once -->
<img @mouseover.once="showImage" />

<!-- Keyboard entry example -->
<input @keyup.enter="submit" />

<!-- Call execute when `Ctrl+C` is pressed -->
<input @keyup.ctrl.c="onCopy" />
```

::: details Vue all Modifiers

------- **_Key Modifiers_** -------

- **`.tab`**
- **`.delete`**
- **`.esc`**
- **`.space`**
- **`.up`**
- **`.down`**
- **`.left`**
- **`.right`**
- **`.ctrl`**

------- **_Mouse Modifiers_** -------

- **`.left`**
- **`.right`**
- **`.middle`**  
  :::

## Watchers

```ts
// Watcher
watch(myProperty, (newValue, oldValue) => {
  console.log(`myProperty changed from ${oldValue} to ${newValue}`)
})

// ----- By using Getter -----
watch(
  () => obj.count,
  (count) => console.log(`count is: ${count}`)
)

// ------ array of multiple sources ------
watch([x, () => y.value], ([newX, newY], [oldX, oldY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
```

## `WatchEffect()`

```ts
import { ref, watchEffect } from 'vue'

const site = ref('vue.org')

watchEffect(() => {
  console.log(site.value)
})

// Expose site for template usage
const siteData = site
```

> `watch` vs. `watchEffect` > **watch** and **watchEffect** are both used for reactive side effects in Vue.js.
>
> - **`watch`**: Precisely tracks only explicitly specified data changes and triggers the callback only when those changes occur.
> - **`watchEffect`**: Automatically tracks all accessed reactive > properties during its execution, combining dependency tracking and side effect in one step.

## Utilities

```ts
const counter = ref(true)

// isRef() -- checks if counter is ref, returns true
console.log(isRef(counter))

// unRef() -- returns inner value of ref
console.log(unRef(counter))

// toRef() -- returns existing refs as-is
toRef(existingRef)

// creates a readonly ref that calls the getter on .value access
toRef(() => props.foo)

// creates normal refs from non-function values
// equivalent to ref(1)
toRef(1)

// toValue() -- normalizes values / refs / getters to values
toValue(1) //       --> 1
toValue(ref(1)) //  --> 1
toValue(() => 1) // --> 1

// toRefs() -- Converts a reactive object to object where each property of object is a ref.
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)

// nextTick() -- A utility for waiting for the next DOM update flush.
async function increment() {
  count.value++

  // DOM not yet updated
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM is now updated
  console.log(document.getElementById('counter').textContent) // 1
}
```

# Form Input Bindings

## Basic form input

```vue
<template>
  <!-- Text Input -->
  <input v-model="text"> {{ text }}

  <!-- Checkbox -->
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">Checked: {{ checked }}</label>

  <!-- Multi checkbox -->
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames">
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
  <label for="mike">Mike</label>
  <p>Checked names: <pre>{{ checkedNames }}</pre></p>

  <!-- Radio -->
  <input type="radio" id="one" value="One" v-model="picked">
  <label for="one">One</label>

  <input type="radio" id="two" value="Two" v-model="picked">
  <label for="two">Two</label>

  <span>Picked: {{ picked }}</span>

  <!-- Select -->
  <select v-model="selected">
    <option disabled value="">Please select one</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>

  <!-- Multi select -->
  <select v-model="multiSelected" multiple style="width:100px">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ multiSelected }}</span>
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNq9VUtP4zAQ/iveXLorUcoutypEAsQBJB4CbmQPaTKlBse2bKeAqvz3nbHzRAW6Fy5tZuabxzf2jDfRsdb76wqieRTb3HDtmAVX6SSVvNTKOLZhBpasZkujSjZB6CSVqcyVtI45eHXsiAA/J2cFd6yEya/WmK8gf4aisTtTwXvTVVaCbewPk4ssf5787TCaD7wn13IQ2YKA3PXG495UVsLxu7H9AQEUN54FhsgNBQelFpkDlBiLV3+SeyJzLnXl4hmKXs1JZOtpqQoQR2lEhNMoYZtN4F7XFCv4nxKphXp97+3eNKCr54zmNGK8GMt9/KYxmMIHENkCBFsqM8KHTFDMqYy2y3Udzzzcs0PfH9Mp/bPQEi0gQDEC9jzPJFtwWTCnmFsBs3gSAZ0Zk721FbF1JipvmE67Pl1SPPafbJ/wcIkpxUORznobcX8jtrEP/gn59Ty/TKpWcpi0EXdP6h0S8ts9acmfYZD0shF3Thr8E/IbJdXtsTNJrnPUGEj6GxCGia4B6fG3vQh4PrdZwdUHJ2XI1hav5LB2HLpR6WEktxXt/RLEj0pemK/yuRf6bPPdB2mHfN4vQfzWfFZnMrnxzn5GmlVCvfGmvjFhU/SdCZtlUEK7apoiEKK040qygttsITBqWzwibgRkFocpBMGexLOAHvsmxx/oTz7Qn470SMInGHBtF55n223HLXzD7H7JerRF8Ui6FWLdmyCyL7xwq/nvgwNN++g72Y0X/IBiPOs2erQXOYvvwZI/7j9ZJfFx21A4HD5Vai7AXPuEOH8YM1STRpkQ6uXC6+ix2mv1fr626J8scp/jx40BC2aNE9DZXGYeAV8KMp/dXflXozNilyuB6E+Mt2CVqKjGADupZIFlD3C+2nP/RHP5eG/PXh1I25KiQglZe3wa4bN9+gn1vtzD/UPvl8o6qv8BvGa6DQ==)

# Component

## Register Component

### Global Registration

```ts
import MyComponent from './MyComponent.vue'

app.component('MyComponent', MyComponent)

// We can chain component method
app.component('ComponentA', ComponentA).component('ComponentB', ComponentB).component('ComponentC', ComponentC)
```

Now `MyComponent` is globally available. We can use it in any component like below:

```vue
<MyComponent />
```

### Local Registration

```vue
<script setup>
import ComponentA from './ComponentA.vue'
</script>

<template>
  <ComponentA />
</template>
```

## Defining a Component

### 1. SFC

```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times.</button>
</template>
```

### 2. `defineComponent`

```ts
import { ref, h, defineComponent } from 'vue'

const Comp = defineComponent(
  (props) => {
    return () => {
      return h('div', props.title)
    }
  },
  {
    props: {
      title: String
    }
  }
)

export default Comp
```

### 3. `defineAsyncComponent`

```ts
defineAsyncComponent(() => import('@/components/TestCompo.vue'))
```

### 4. Using tsx

```vue
<script setup lang="tsx">
const Foo = (props: { msg: string }) => {
  return <div> {props.msg} </div>
}
</script>

<template>
  <Foo :msg="message" />
</template>
```

::: warning Warning
If using Vite - you need `@vitejs/plugin-vue-jsx` for this
:::

## Props

### Defining Props

```vue
<script setup lang="ts">
// Recommended way to define props
interface Props {
  title: string
  likes: number
}
defineProps<Props>()

// define props using Object
defineProps({
  title: String,
  id: Number
})

// define props using Array
defineProps(['title', 'id'])

// Extending props with existing interface
interface CustomProps extends Props {
  name: string
}
defineProps<CustomProps>()
</script>
```

### Prop Validation

We can validate prop using its types, required parameter, validator function. We can also pass default value to the prop.

```ts
defineProps({
  // Basic type check
  //  (`null` and `undefined` values will allow any type)
  propA: Number,

  // Multiple possible types
  propB: [String, Number],

  // Required string
  propC: {
    type: String,
    required: true
  },

  // Number with a default value
  propD: {
    type: Number,
    default: 100
  },

  // Object with a default value
  propE: {
    type: Object,
    // Object or array defaults must be returned from
    // a factory function. The function receives the raw
    // props received by the component as the argument.
    default(rawProps) {
      return { message: 'hello' }
    }
  },

  // Custom validator function
  // All props passed as 2nd argument in 3.4+
  propF: {
    validator(value, props) {
      // The value must match one of these strings
      return ['success', 'warning', 'danger'].includes(value)
    }
  },

  // Function with a default value
  propG: {
    type: Function,
    // Unlike object or array default, this is not a factory
    // function - this is a function to serve as a default value
    default() {
      return 'Default function'
    }
  },

  // If you don't pass value to prop by default it will take false.
  propH: Boolean,

  // Change the default behavior of Boolean type prop.
  propI: {
    type: Boolean,
    default: undefined
  }
})
```

### Binding Props

```vue
<script setup lang="ts">
const propsData = {
  title: 'title',
  likes: 1,
  views: 1000
}

const id = ref(1)
const title = ref('vuexy')
</script>

<template>
  <!-- prop binding -->
  <MyComponent :title="title"></MyComponent>

  <!-- use v-bind directive prop to bind multiple props -->
  <MyComponent v-bind="propsData"></MyComponent>

  <!-- Same name shorthand (available in vue 3.4+) -->
  <Post :id :title />

  <!-- Boolean Casting -->

  <!-- equivalent of passing :disabled="true" -->
  <MyComponent disabled />

  <!-- equivalent of passing :disabled="false" -->
  <MyComponent />
</template>
```

### Two Way binding

```vue
<script>
// two way binding with defineModel
const model = defineModel()
</script>

<template>
  <input v-model="model" />
</template>
```

```vue
<script>
// making the v-model required
const model = defineModel({ required: true })

// providing a default value
const model = defineModel({ default: 0 })

// multiple v-model binding
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```

```vue
<script>
// Handling v-model modifier
const [model, modifiers] = defineModel({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
})
</script>

<template>
  <MyComponent v-model.capitalize="myText" />
</template>
```

## Events

### Declaring events

```vue
<script setup lang="ts">
// defineEmits with typescript
defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// with Array
defineEmits(['inFocus', 'submit'])
</script>
```

### Using Events

```vue
<!-- Emitting the events -->
<button @click="$emit('someEvent')">click me</button>

<!-- Listening to events -->
<MyComponent @some-event="handleEvent" />

<!-- Modifier can also be used on the event -->
<MyComponent @some-event.once="callback" />

<!-- Emit event with argument -->
<button @click="$emit('increaseBy', 1)">Increase by 1</button>
```

### Event Validation

```vue
<script setup>
const emit = defineEmits({
  // No validation
  click: null,

  // Validate submit event
  submit: ({ email, password }) => {
    if (email && password) {
      return true
    } else {
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})

function submitForm(email, password) {
  emit('submit', { email, password })
}
</script>
```

## Slots

```vue
<template>
  <!-- slot -->
  <button>
    <slot></slot>
    <!-- slot Outlet -->
  </button>

  <!-- slot with fallback content -->
  <button type="submit">
    <slot>
      Submit
      <!-- fallback content -->
    </slot>
  </button>

  <!-- Named slots -->
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
      <!-- slot without name will be considered as default slot-->
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>

  <!-- Dynamic Slot names -->
  <base-layout>
    <template v-slot:[dynamicSlotName]> ... </template>

    <!-- with shorthand -->
    <template #[dynamicSlotName]> ... </template>
  </base-layout>

  <!-- Scoped Slots -->
  <MyComponent v-slot="slotProps"> {{ slotProps.text }} {{ slotProps.count }} </MyComponent>

  <!-- Named Scoped Slots -->
  <MyComponent>
    <template #header="headerProps">
      {{ headerProps }}
    </template>

    <template #default="defaultProps">
      {{ defaultProps }}
    </template>

    <template #footer="footerProps">
      {{ footerProps }}
    </template>
  </MyComponent>
</template>
```

## Provide & Inject

![Provide and Inject](https://vuejs.org/assets/provide-inject.tIACH1Z-.png)

::: code-group

```vue{2,8} [Parent.vue]
<script setup>
import { ref, provide } from 'vue'
import Child from './Child.vue'

// by providing a ref, the GrandChild
// can react to changes happening here.
const message = ref('hello')
provide('message', message)
</script>

<template>
  <input v-model="message">
  <Child />
</template>
```

```vue [Child.vue]
<script setup>
import GrandChild from './GrandChild.vue'
</script>

<template>
  <GrandChild />
</template>
```

```vue{2,4} [GrandChild.vue  ]
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>

<template>
  <p>
    Message to grand child: {{ message }}
  </p>
</template>
```

# Composable

A composable is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic.

```ts
// mouse.ts
import { ref, onMounted, onUnmounted } from 'vue'

// by convention, composable function names start with "use"
export function useMouse() {
  // state encapsulated and managed by the composable
  const x = ref(0)
  const y = ref(0)

  // a composable can update its managed state over time.
  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  return { x, y }
}
```

## Convention & Best Practices

### Naming

It is a convention to name composable functions with camelCase names that start with `use`.

Example: `useMouse()`

### Input Arguments

```ts
import { toValue } from 'vue'

function useFeature(maybeRefOrGetter) {
  // If maybeRefOrGetter is a ref or a getter,
  // its normalized value will be returned.
  // Otherwise, it is returned as-is.
  const value = toValue(maybeRefOrGetter)
}
```

### Return values

```ts
// x and y are refs
const { x, y } = useMouse()
```

# Built-in Components

## Transition

`<Transition>` : It can be used to apply enter and leave animations on elements or components passed to it via its default slot.

![Transition Image](https://vuejs.org/assets/transition-classes.2BufuvZR.png)

```vue{9-11}
<script setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<template>
  <button @click="show = !show">Toggle</button>
  <Transition>
    <p v-if="show">hello</p>  // Applied fade transition
  </Transition>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9UstOwzAQ/BXjCyDRBKniUtKKh3qAAyDo0ZfgblO3jm3Zm7RV1X9nHUelSKineGdnxrMb7/mjc1nbAB/xIkivHLIA2LiJMKp21iPbMw8LdmALb2t2SdRLYYSR1gSiLu2GjSPhCn0D18IUeXIhPRUItdMlAlWMFd8NojXsQWol12PBe/VF/Ao+mdmq0lDkiZYkM1+aoFD1NSGOtQO16NWkWoLWtshjYOrmfwRFfhKAyoA7HY9ZOwCD4AelRNXCTYdoKFvoEbaPbnj0GjHrSqlwx26zu8CgDHAvzCGaHr3ifk6d0CaXXjlit0lCG+pi8BuOgda4UFW2CtbQH+j4gktbO6XBv7t4dxB8lJxir6RpN68dFjdOFyZcLkGu/8FXYRsxwT88BPAtCH7sYekrwNSefr3Bls7HZm3njSb2meYnBKubmDHRnhozp9gnvC7tS/eOlKlmYbpFoJX2Q8WgkXno+ILT23o+M/pv3GE27HS0T374AbBs70k=)

### Using Javascript Hooks

```vue
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>
```

## TransitionGroup

`<TransitionGroup>`: It is designed for animating the insertion, removal, and order change of elements or components that are rendered in a list.

```vue{5-9}
<template>
  <button @click="insert">insert at random index</button>
  <button @click="reset">reset</button>

  <TransitionGroup tag="ul" name="list" class="container">
    <li v-for="item in items" class="item" :key="item">
      {{ item }}
    </li>
  </TransitionGroup>
</template>

<style>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
```

[Try it in the Playground](https://play.vuejs.org/#eNp9VMFu2zAM/RXCwJBkdZ10WS9eGmzriqEDthVbDwPqHjSbjtXKkmHRaYog/z5KStIka3syST0+PtKiltGnpknmHUZpNLF5KxsCi9Q100zLujEtwRJaLGEFZWtq6DG0l+lM50ZbghnSpZYkhbokrC2cQX8AZ1O4OYnhXQzjGN7HcHq7gcs1iAn7B6n9wSDTChlTMMADk7lQHSYK9YwqOIITV7fsdE7SaJDaYktcbplpgDU/p34XVCWt6XTRD6bQhakZ9/YZVq4Je2HbKJljX8YwilnK0REjVnt1W+T5bMrupHLp/1rykNf68dSTYRg8j5wdRjZKELIHMPnbEXHRjznLuj/LotB1Fk2DAYIgNMjzKHAxGYaE55O9dM713x2oB18zj2XxRn/l6TVAYsYpncoi0KJGtpW0nA25EtayyyMnITW2zOgYmENJmB+XpnVCuQ/WFDrfyXI+u+k9Pm69dTrAcunxsOK5eMKhkqGV4YE8jk6GO6Ni19KjcmbiKfzveZAFVSmcjEZvPji/QjmrKIXxqFlwwE8/cW0doyZsjwX/4jnGm6BCMcd1MBDSVkUKQikYJacWUFgMbLtcbl0OmMgEFtOIXNJjCiOvypPy1Oo0mK6lP32ncRBo+YL43qI4IstjL+UsubNG8856Pvcv6kYqbH82ThvPOw2V3BnrNA/ffIzaznUX4nmF+f0z8Tu7cLEsunL3pJ1jFm3PSLR8ycPxxe8fuGB7e1ibolOMfuXwF1qjOqcxwD7zmrLsHZxXe+lfHqln1/ZiQcgjXzflhDrkyuOziF+j81daf5I7TsY+j+fJUzyvpCpeePXCS9K0pnEvVYElX/Er5/VveiRJYe+W9/rFnZ0Ucv7CikwqFAW2zrLK0GatQpQRzMlhf7OfkDXnbzKmX7AUnSL32vFUeIW3CRtYaQxfvsMSIbpf4gk5ZMn7+xSt/gH4Zxci)

## KeepAlive

`<KeepAlive>`: It allows us to conditionally cache component instances when dynamically switching between multiple components.

::: code-group

```vue{13-15} [App.vue]
<script setup>
  import { shallowRef } from 'vue'
  import CompA from './CompA.vue'
  import CompB from './CompB.vue'

  const current = shallowRef(CompB)
</script>

<template>
  <div class="demo">
    <label><input type="radio" v-model="current" :value="CompA" /> A</label>
    <label><input type="radio" v-model="current" :value="CompB" /> B</label>
    <KeepAlive>
      <component :is="current"></component>
    </KeepAlive>
  </div>
</template>
```

```vue [CompA.vue]
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <p>Current component: A</p>
  <span>count: {{ count }} </span>
  <button @click="count++">Increase Count</button>
</template>
```

```vue [CompB.vue]
<script setup>
import { ref } from 'vue'

const msg = ref('')
</script>

<template>
  <p>Current component: B</p>
  <span>Message is: </span>
  <input v-model="msg" />
</template>
```

[Try it in the Playground](https://play.vuejs.org/#eNqtU01vnDAQ/SuWL5sq6VIpN0RQlyiHtOqH0h65EJglToxt+YNuhfjvHdssYbf5kKLc8Jvn8XvzhoFulFr3DmhKM1NrpiwxYJ3KS0EI65TUlgzE3FWcyz83sCUj2WrZkRXeWS04l7JTm6m0TsLJtz2mFAeUYqJ4Ui2FsaR2WoOw5GLx5EmgfihFlkSFqA0PFjrFKwtBadawntS8MuaipA10sqQBxwqvboHnGRPKWWL/KkCGrhqGFNJ/7GQDHJHpYcTSvuLOk4IJBJKcbLIktnmPnkXsWRz1/AqgNpz10VCAamRL4eeRMm9sbphnyVzb308OG2QJjgS/smQxKHoWXb2euP4v6kVI0oWIkHPy6ZVcVH45RToLTv0443OZUZXIQ7+UDMPUeRxRfagEzq2zVgryueasfvBT8KTTU5zCtag1VAZwtRDKksh8xnRYtreb7kw7WV6t3uIZ4156/gbGVC0QZtIDs3GlHncInw2rfOzIGpS1Ze363kiBrgZ/28+mU4yD/qEsQ9klxbHG/Shp+J++BMxqB2d7vL6D+uEJ/N7sPFbSnxoM6B5KOtdspVvARfTlq1/fYYffcxG1O47sF4o3YCR3XmOkFU40KHvBC2qvQzJMtL/N1c6CMHtTXqhnjoFfUkzLZ/yc9Ue55+vzcK8UIx3/AY/eq8Q=)

## Teleport

The `<teleport>` component in Vue.js allows you to render a component's HTML in a different part of the DOM than where the component is declared.

```vue
<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

## Suspense

`<Suspense>` is a built-in component for orchestrating async dependencies in a component tree. It can render a `loading state` while waiting for multiple nested async dependencies down the component tree to be resolved.

```vue
<template>
  <Suspense>
    <!-- component with nested async dependencies -->
    <Dashboard />

    <!-- loading state via #fallback slot -->
    <template #fallback> Loading... </template>
  </Suspense>
</template>
```

### Combining Suspense with other components

```vue
<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- main content -->
            <component :is="Component"></component>

            <!-- loading state -->
            <template #fallback> Loading... </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>
```
