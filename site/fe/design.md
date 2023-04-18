## 设计模式篇

**实现发布/订阅模式**

```js
class Event {
  constructor() {
    this.events = {}
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    this.events[event].push(callback)
  }

  off(event, callback) {
    if (this.events[event]) {
      if (callback) {
        const cbs = this.events[event]
        let l = cbs.length
        while (l--) {
          if (callback == cbs[l]) {
            cbs.splice(l, 1)
          }
        }
      } else {
        this.events[event] = []
      }
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      for (const func of this.events[event]) {
        func.call(this, ...args)
      }
    }
  }

  once(event, callback) {
    const self = this

    function wrap(...args) {
      callback.call(self, ...args)
      self.off(event, wrap)
    }

    this.on(event, wrap)
  }
}
```

**单例模式**

```js
class Singleton {
  constructor() {}
}

Singleton.getInstance = (function() {
  let instance
  return function() {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()

let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()
console.log(s1 === s2) // true
```

## 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知

[![image](https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png)](https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png)

- reference:
  - [观察者模式 vs 发布-订阅模式](https://juejin.im/post/5a14e9edf265da4312808d86)
