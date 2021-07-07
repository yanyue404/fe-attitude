class KVue {
  constructor(options) {
    this.$options = options;
    this.$el = options.el;
    this.$data = options.data;
    //  响应化数据
    this.observe(this.$data);
    // new Watcher(this, 'tabIndex');
    // this.tabIndex;
    new Compile(options.el, this);

    if (options.created) {
      options.created.call(this);
    }
  }
  observe(value) {
    if (!value || typeof value !== 'object') {
      return;
    }
    // 遍历对象
    Object.keys(value).forEach(key => {
      this.defineReactive(value, key, value[key]);
      // 代理理到vm上
      this.proxyData(key);
    });
  }
  defineReactive(obj, key, val) {
    // 依赖收集：管理每一个 响应 key
    const dep = new Dep(); // 每个 dep 实例和data 中的每一个 key 有一一对应的关系
    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          console.log(`当前管理依赖项 ${key} 的:`, dep);
          dep.notify();
        }
      },
    });
    // 递归
    this.observe(val);
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      },
    });
  }
}

// 依赖收集：管理所有的 watcher
class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep);
  }
  notify() {
    this.deps.forEach(dep => dep.update());
  }
}

// 保存 data 中的数值和页面中的挂钩关系

class Watcher {
  constructor(vm, key, cb) {
    // 创建实例时立刻将该实例指向 Dep.target 便于依赖收集
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this; 
    this.vm[this.key]; // ! 触发依赖收集 (到这一步 get 调用 target 才有值了 )
    Dep.target = null; // ! 收集完清空（等待其他 Watcher 实例化，每一个 watcher 只与自己的 dep 发生关系）
  }
  update() {
    // console.log(this.key + '更新了！');
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
