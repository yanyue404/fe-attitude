> vue 源码 https://github.dev/yanyue404/vue
>
> 思维导图： https://www.processon.com/view/link/5d1eb5a0e4b0fdb331d3798c

## 调试 Vue 项目源码的方式

1. 安装依赖：npm i
2. 安装打包⼯具：npm i rollup -g
3. 修改 package.json ⾥⾯ dev 脚本：

```json
{
  "scripts": {
    "//": "实时构建完整版 umd 模块的 Vue (sourcemap 调试)",
    "dev": "rollup -w -c scripts/config.js --sourcemap --environment TARGET:web-full-dev"
  }
}
```

4. 执⾏打包 `npm run dev`
5. 修改 examples ⾥⾯的⽂件(先从 simple 开始)引⽤新⽣成的 vue.js

```js
new Vue({
  el: "#app",
  data: {
    test: 1,
  },
  created() {
    console.log(this);
  },
  mounted() {
    console.dir(document.getElementById("app"));
  },
});
```

## 生命周期

下图展示了实例的生命周期。你不需要立马弄明白所有的东西，不过随着你的不断学习和使用，它的参考价值会越来越高。（真的如此啊！）

![](https://v2.cn.vuejs.org/images/lifecycle.png)

- vue 初始化前的准备
  - Vue 基础构造函数（最内层）
  - vm 实例混入属性方法
  - global api 注册
  - runtime web 平台运行时注册方法
  - entry-runtime-with-compiler 运行时带编译（最外层）
- `new Vue()`
- `_init`
  - init Events & Lifecycle 往 vm 上挂载各种初始化属性方法
  - `callHook(vm, "beforeCreate")` 实例刚刚创建
  - init Injections & reactivity 初始化注入组件的各种状态（data, methods, props, computed, watch、provide）
  - `callHook(vm, "created")` 创建完成，属性已经绑定，但还未生成真实 dom
  - 进行元素的挂载： `$el / vm.$mount()`
  - 是否有 template，解析成 render 函数
    - `*.vue` 文件： vue-loader 会将 `<template>` 编译成 render 函数
  - beforeMount: 模板编译/挂载之前
  - 绑定**渲染 watcher**监听 **updateComponent**, updateComponent 的作用：执行 render 函数，生成真实的 dom，并替换到 dom tree 中
  - `mounted`: 组件已挂载
- `_update`
  - 执行 diff 算法，对比改变是否需要触发 UI 更新
  - flushSchedulerQueue 清空异步队列计划
    - watcher.before(): 触发 beforeUpdate 钩子， **渲染 watcher**及其他 watcher `run()` 通知所有依赖项 diff 更新 UI
    - 触发 updated 钩子，组件已更新
- `$destroy`
  - `callHook(vm, 'beforeDestroy')`: 销毁开始
  - 销毁自身且递归销毁子组件以及事件监听
    - remove() 删除节点
    - watcher.teardown() 清空依赖
    - vm.$off() 解绑监听
  - `callHook(vm, 'destroyed')` : 销毁完成的钩子

## 代码形式看 Vue 的初始化

初始化顺序从里到外，但源码查看却是从外到内，=> 寻找 vue 的出生构造函数。

### 带编译的入口文件

- scripts/config.js

```js
// Runtime+compiler development build (Browser) 完整版
"web-full-dev": {
  entry: resolve("web/entry-runtime-with-compiler.js"),
  dest: resolve("dist/vue.js"),
  format: "umd",
  env: "development",
  alias: { he: "./entity-decoder" },
  banner,
}
```

- platforms/web/entry-runtime-with-compiler.js

```js
// web 公共的 $mount
const mount = Vue.prototype.$mount;
// 重写Vue.prototype.$mount 方法
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el);

  const options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    let template = options.template;
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(
        template,
        {
          outputSourceRange: process.env.NODE_ENV !== "production",
          shouldDecodeNewlines,
          shouldDecodeNewlinesForHref,
          delimiters: options.delimiters,
          comments: options.comments,
        },
        this
      );
      options.render = render;
      options.staticRenderFns = staticRenderFns;
    }
  }
  return mount.call(this, el, hydrating);
};
```

### web 平台运行时定义

- src\platforms\web\runtime\index.js

绑定关键的渲染函数以及更新函数。

```js
// install platform patch function
Vue.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating);
};
```

- src\core\instance\lifecycle.js 真实的渲染方法 mountComponent

### 全局 API 定义

- src\core\index.js

```js
// 全局 api 实现
import { initGlobalAPI } from "./global-api/index";
// 扩展 {... config,set,delete,nextTick,options,use,mixin,extend,component,directive,filter}
initGlobalAPI(Vue);
```

### Vue 构造函数定义

- src\core\instance\index.js

```js
import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";

function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}

initMixin(Vue); // _init，_uid，$options 当前 Vue 实例的初始化选项，注意：这是经过 mergeOptions() 后的
stateMixin(Vue); // $data, $props 设为只读属性，继续添加 $set, $delete, $watch
eventsMixin(Vue); // $on, $emit, $off, $once
lifecycleMixin(Vue); // _update, $forceUpdate, $destroy
renderMixin(Vue); // $nextTick，_render

export default Vue;
```

### new Vue()

- src\core\instance\init.js initMixin

```js
function initMixin(Vue: Class<Component>) {
  Vue.prototype._init = function (options?: Object) {
    const vm: Component = this;
    initLifecycle(vm); // $partent,$root,$children
    initEvents(vm); // 事件监听初始化 vm._event,$on,$emit,$off
    initRender(vm); // 定义$createElement
    callHook(vm, "beforeCreate");
    initInjections(vm); // resolve injections before data/props, 获取注⼊数据并做响应化
    initState(vm); // 初始化 _props methods _data _computedWatchers（computed） watch
    initProvide(vm); // _provided（resolve provide after data/props）, 注⼊数据处理
    callHook(vm, "created");

    // 渲染，挂载节点
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}
```

- src\core\instance\state.js initState

```js
export function initState(vm: Component) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm);
  } else {
    observe((vm._data = {}), true /* asRootData */);
  }
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```

### 初始化渲染（$mount）及增量 diff 更新

在运行时阶段就绑定好真实的 mountComponent 渲染方法

```js
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
  }
  // 触发钩子
  callHook(vm, "beforeMount");
  //创建 updateComponent
  let updateComponent;

  updateComponent = () => {
    // 根据 diff 出的 paths 挂载成真实的 dom
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  // 初始化观察者
  // render 渲染成 vdom， 数据变化时，虚拟dom re-render 和 patch
  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        if (vm._isMounted && !vm._isDestroyed) {
          callHook(vm, "beforeUpdate");
        }
      },
    },
    true /* isRenderWatcher */
  );
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, "mounted");
  }
  return vm;
}
```

- src\core\instance\lifecycle.js \_update

```js
// Vue.prototype.__patch__ 在运行时中已定义

Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
  const vm: Component = this;
  const prevEl = vm.$el;
  const prevVnode = vm._vnode;
  const restoreActiveInstance = setActiveInstance(vm);
  vm._vnode = vnode;
  // Vue.prototype.__patch__ is injected in entry points
  // based on the rendering backend used.
  if (!prevVnode) {
    // initial render
    vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
  } else {
    // updates
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
  restoreActiveInstance();
  // update __vue__ reference
  if (prevEl) {
    prevEl.__vue__ = null;
  }
  if (vm.$el) {
    vm.$el.__vue__ = vm;
  }
  // if parent is an HOC, update its $el as well
  if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
    vm.$parent.$el = vm.$el;
  }
};
```

### 数据响应式

- src\core\instance\state.js initData

```js
proxy(vm, `_data`, key);
observe(data, true /* asRootData */);
```

- src\core\observer\index.js observe

Observer 数组和对象响应化处理逻辑

```js
export class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor(value: any) {
    this.value = value;
    this.dep = new Dep();
    this.vmCount = 0;
    def(value, "__ob__", this);
    if (Array.isArray(value)) {
      if (hasProto) {
        // 数组存在原型就覆盖其原型
        protoAugment(value, arrayMethods);
      } else {
        // 不存在就直接定义拦截⽅法
        copyAugment(value, arrayMethods, arrayKeys);
      }
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }

  /**
   * value type is Object.
   */
  walk(obj: Object) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray(items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}
```

defineReactive 数据拦截

```js
Object.defineProperty(obj, key, {
  enumerable: true,
  configurable: true,
  get: function reactiveGetter() {
    const value = getter ? getter.call(obj) : val;
    if (Dep.target) {
      dep.depend();
      if (childOb) {
        childOb.dep.depend();
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
    }
    return value;
  },
  set: function reactiveSetter(newVal) {
    const value = getter ? getter.call(obj) : val;
    if (newVal === value || (newVal !== newVal && value !== value)) {
      return;
    }
    if (setter) {
      setter.call(obj, newVal);
    } else {
      val = newVal;
    }
    childOb = !shallow && observe(newVal);
    dep.notify();
  },
});
```

- src\core\observer\array.js arrayMethods

修改数组 7 个变更⽅法使其可以发送更新通知

```js
/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method];
  def(arrayMethods, method, function mutator(...args) {
    // 该⽅法默认⾏为
    const result = original.apply(this, args);
    //得到observer
    const ob = this.__ob__;
    let inserted;
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);
    // notify change
    ob.dep.notify();
    return result;
  });
});
```

- src\core\observer\dep.js Dep

watcher 管理

```js
depend () {
  if (Dep.target) {
   Dep.target.addDep(this)
  }
}
```

- src\core\observer\watcher.js Watcher

watcher 和 dep 互相添加引⽤

```js
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }
```

### 异步更新机制

watcher 更新逻辑：通常情况下会执⾏ queueWatcher，执⾏异步更新

```js
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  },
  run () {
      tip('\nwatcher id:' + this.id + '\n表达式：' + this.expression + '\n视图更新啦～');
      // 调用 this.get 方法对 watcher 重新求值
      const value = this.get()
  }
```

src\core\observer\scheduler.js queueWatcher

```js
/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher(watcher: Watcher) {
  const id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      // 推⼊队列
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      // 下个事件循环执⾏批量任务，这是vue异步更新实现的关键
      nextTick(flushSchedulerQueue);
    }
  }
}

/**
 * 清空队列计划
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue() {
  flushing = true;
  let watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort((a, b) => a.id - b.id);

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
  }

  // keep copies of post queues before resetting state
  const activatedQueue = activatedChildren.slice();
  const updatedQueue = queue.slice();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue); //   callHook(vm, "activated");
  callUpdatedHooks(updatedQueue); // callHook(vm, "updated"); 更新完毕
}
```

- src\core\util\next-tick.js nextTick

```js
const callbacks = [];
let pending = false;

function flushCallbacks() {
  pending = false;
  const copies = callbacks.slice(0);
  callbacks.length = 0;
  for (let i = 0; i < copies.length; i++) {
    copies[i]();
  }
}
let timerFunc;

// timerFunc指定了vue异步执⾏策略，根据执⾏环境，⾸选Promise
// 备选依次为：MutationObserver (微任务)、setImmediate （宏任务）、setTimeout
if (typeof Promise !== "undefined" && isNative(Promise)) {
  const p = Promise.resolve();
  timerFunc = () => {
    p.then(flushCallbacks);
  };
  isUsingMicroTask = true;
}

export function nextTick(cb?: Function, ctx?: Object) {
  let _resolve;
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, "nextTick");
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== "undefined") {
    return new Promise((resolve) => {
      _resolve = resolve;
    });
  }
}
```

**总结**

数据响应的实现由两部分构成: 观察者( watcher ) 和 依赖收集器( Dep )，其核心是 defineProperty 这个方法，它可以 重写属性的 get 与 set 方法，从而完成监听数据的改变。

- Observe (观察者)观察 props 与 state
  - 遍历 props 与 state，对每个属性创建独立的监听器( watcher )
- 使用 defineProperty 重写每个属性的 get/set(defineReactive）
  - get: 收集依赖
    - Dep.depend()
      - watcher.addDep()
  - set: 派发更新
    - Dep.notify() 通知 watcher 更新
    - watcher.update() watcher 更新
    - queenWatcher() 加入 watcher 队列，异步等待更新
    - nextTick 事件循环控制更新时机
    - flushSchedulerQueue 清空队列计划
    - watcher.run() 正式触发新旧值的 callback
    - updateComponent() 组件更新

核心数据响应的伪代码实现：

```js
let data = { a: 1 };
// 数据响应性
observe(data);

// 初始化观察者
new Watcher(data, "name", updateComponent);
data.a = 2;

// 简单表示用于数据更新后的操作
function updateComponent() {
  vm._update(); // patchs
}

// 监视对象
function observe(obj) {
  // 遍历对象，使用 get/set 重新定义对象的每个属性值
  Object.keys(obj).map((key) => {
    defineReactive(obj, key, obj[key]);
  });
}

function defineReactive(obj, k, v) {
  // 递归子属性
  if (type(v) == "object") observe(v);

  // 新建依赖收集器
  let dep = new Dep();
  // 定义get/set
  Object.defineProperty(obj, k, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      // 当有获取该属性时，证明依赖于该对象，因此被添加进收集器中
      if (Dep.target) {
        dep.addSub(Dep.target);
      }
      return v;
    },
    // 重新设置值时，触发收集器的通知机制
    set: function reactiveSetter(nV) {
      v = nV;
      dep.nofify();
    },
  });
}

// 依赖收集器
class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.map((sub) => {
      sub.update();
    });
  }
}

Dep.target = null;

// 观察者
class Watcher {
  constructor(obj, key, cb) {
    Dep.target = this;
    this.cb = cb;
    this.obj = obj;
    this.key = key;
    this.value = obj[key];
    Dep.target = null;
  }
  addDep(Dep) {
    Dep.addSub(this);
  }
  update() {
    // queueWatcher 方法见上文
    queueWatcher(this);
  }
  run() {
    const oldValue = this.value;
    this.value = value;
    this.cb.call(this.vm, value, oldValue);
  }
  before() {
    callHook("beforeUpdate");
  }
}
```

### 卸载节点

- src\core\instance\lifecycle.js $destroy

```js
Vue.prototype.$destroy = function () {
  const vm: Component = this;
  if (vm._isBeingDestroyed) {
    return;
  }
  callHook(vm, "beforeDestroy");
  vm._isBeingDestroyed = true;
  // remove self from parent
  const parent = vm.$parent;
  if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
    remove(parent.$children, vm);
  }
  // teardown watchers (删除依赖)
  if (vm._watcher) {
    vm._watcher.teardown();
  }
  let i = vm._watchers.length;
  while (i--) {
    vm._watchers[i].teardown();
  }
  // remove reference from data ob
  // frozen object may not have observer.
  if (vm._data.__ob__) {
    vm._data.__ob__.vmCount--;
  }
  // call the last hook...
  vm._isDestroyed = true;
  // invoke destroy hooks on current rendered tree
  vm.__patch__(vm._vnode, null);
  // fire destroyed hook
  callHook(vm, "destroyed");
  // turn off all instance listeners. （删除监听）
  vm.$off();
  // remove __vue__ reference
  if (vm.$el) {
    vm.$el.__vue__ = null;
  }
};
```

### 参考

- https://juejin.cn/post/6844903776512393224
