# 设计模式篇

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

**适配器模式**

适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本
由于接口不兼容而不能工作的两个软件实体可以一起工作。

适配器的别名是包装器（wrapper），这是一个相对简单的模式。在程序开发中有许多这样的
场景：当我们试图调用模块或者对象的某个接口时，却发现这个接口的格式并不符合目前的需求。
这时候有两种解决办法，第一种是修改原来的接口实现，但如果原来的模块很复杂，或者我们拿
到的模块是一段别人编写的经过压缩的代码，修改原接口就显得不太现实了。第二种办法是创建
一个适配器，将原接口转换为客户希望的另一个接口，客户只需要和适配器打交道。

```js
// 假设我们正在编写一个渲染广东省地图的页面。目前从第三方资源里获得了广东省的所有城市以及它们所对应的 ID，并且成功地渲染到页面中：
;(() => {
  var getGuangdongCity = function() {
    var guangdongCity = [
      {
        name: 'shenzhen',
        id: 11
      },
      {
        name: 'guangzhou',
        id: 12
      }
    ]
    return guangdongCity
  }
  var render = function(fn) {
    console.log('开始渲染广东省地图')
    console.log(JSON.stringify(fn()))
  }
  render(getGuangdongCity)
})()

// 新的数据结构如下：

/* var guangdongCity = {
  shenzhen: 11,
  guangzhou: 12,
  zhuhai: 13
} */
;(() => {
  var getGuangdongCity = function() {
    var guangdongCity = [
      {
        name: 'shenzhen',
        id: 11
      },
      {
        name: 'guangzhou',
        id: 12
      }
    ]
    return guangdongCity
  }

  // 新增一个数据格式转换的适配器
  const addressAdapter = oldAddressfn => {
    var address = {},
      oldAddress = oldAddressfn()
    for (let i = 0; i < oldAddress.length; i++) {
      let c = oldAddress[i]
      address[c.name] = c.id
    }
    return function() {
      return address
    }
  }

  var render = function(fn) {
    console.log('开始渲染广东省地图')
    console.log(JSON.stringify(fn()))
  }

  render(addressAdapter(getGuangdongCity))
})()
```

## 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知

[![image](https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png)](https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png)

- reference:
  - [观察者模式 vs 发布-订阅模式](https://juejin.im/post/5a14e9edf265da4312808d86)
