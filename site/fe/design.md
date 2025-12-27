# 设计模式篇

## 工厂模式

**工厂模式（Factory Pattern）：将对象的创建和使用分离，由工厂类负责创建对象并返回。在前端开发中，可以使用工厂模式来动态创建组件。**

前端中的工厂模式是一种创建对象的设计模式，它可以让我们封装创建对象的细节，我们使用工厂方法而不是直接调用 new 关键字来创建对象，使得代码更加清晰、简洁和易于维护。在前端开发中，工厂模式通常用于创建多个相似但稍有不同的对象，比如创建一系列具有相同样式和行为的按钮或者表单。

在实现工厂模式时，通常需要创建一个工厂函数（或者叫做工厂类），该函数可以接受一些参数，并根据这些参数来创建对象。例如，我们可以创建一个 ButtonFactory 函数，它接受一个 type 参数，用于指定按钮的类型，然后根据 type 参数创建不同类型的按钮对象。示例代码如下：

```js
function ButtonFactory(type) {
  switch (type) {
    case 'primary':
      return new PrimaryButton()
    case 'secondary':
      return new SecondaryButton()
    case 'link':
      return new LinkButton()
    default:
      throw new Error('Unknown button type: ' + type)
  }
}

function PrimaryButton() {
  this.type = 'primary'
  this.text = 'Click me!'
  this.onClick = function() {
    console.log('Primary button clicked!')
  }
}

function SecondaryButton() {
  this.type = 'secondary'
  this.text = 'Click me too!'
  this.onClick = function() {
    console.log('Secondary button clicked!')
  }
}

function LinkButton() {
  this.type = 'link'
  this.text = 'Click me as well!'
  this.onClick = function() {
    console.log('Link button clicked!')
  }
}
```

在上面的示例中，ButtonFactory 函数接受一个 type 参数，根据这个参数来创建不同类型的按钮对象。例如，如果 type 为'primary'，则返回一个 PrimaryButton 对象，该对象具有 type、text 和 onClick 属性，表示一个主要按钮。其他类型的按钮也类似。

使用工厂模式可以让我们将对象创建的过程与具体的业务逻辑分离开来，从而提高代码的可重用性和可维护性。

## 发布/订阅模式

**发布-订阅模式（Publish-Subscribe Pattern）：也叫消息队列模式，它是一种将发布者和订阅者解耦的设计模式。在前端开发中，可以使用发布-订阅模式来实现组件之间的通信。**

JavaScript 中的发布/订阅模式（Pub/Sub）是一种常用的设计模式。它允许在应用程序中定义对象之间的一对多的依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都会被通知和更新。

在发布/订阅模式中，有两种类型的对象：发布者和订阅者。发布者是事件的发出者，它通常维护一个事件列表，并且可以向列表中添加或删除事件。当某个事件发生时，它会将这个事件通知给所有订阅者。订阅者则是事件的接收者，它们订阅感兴趣的事件，并且在事件发生时接收通知。。

发布订阅模式可以帮助我们实现松耦合的设计，让对象之间的依赖关系变得更加灵活。它在前端开发中的应用非常广泛，例如 Vue.js 中的事件总线、Redux 中的 store 等。

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

## 单例模式

**单例模式（Singleton Pattern）：保证一个类只有一个实例，并提供一个访问它的全局访问点。在前端开发中，可以使用单例模式来管理全局状态和资源。**

在 JavaScript 中，单例模式可以通过多种方式实现，以下是一些常见的实现方式：

1.  对象字面量

使用对象字面量可以轻松地创建单例对象，例如：

```js
const singleton = {
  property1: 'value1',
  property2: 'value2',
  method1: function() {
    // ...
  },
  method2: function() {
    // ...
  }
}
```

上述代码中，使用了一个对象字面量来创建单例对象，该对象包含了一些属性和方法。由于 JavaScript 中对象字面量本身就是单例的，因此不需要额外的代码来保证单例。

2. 构造函数

在 JavaScript 中，每个构造函数都可以用于创建单例对象，例如：

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

上述代码中，使用了一个构造函数来创建单例对象。在构造函数中，首先判断是否存在单例实例，如果存在则直接返回该实例，否则创建单例对象并将其保存在 Singleton.instance 属性中

3.  模块模式

使用模块模式可以创建一个只有单个实例的对象，例如：

```js
const Singleton = (function() {
  let instance

  function init() {
    // 创建单例对象
    const object = new Object('I am the instance')
    return object
  }

  return {
    getInstance: function() {
      if (!instance) {
        instance = init()
      }
      return instance
    }
  }
})()

const instance1 = Singleton.getInstance()
const instance2 = Singleton.getInstance()

console.log(instance1 === instance2) // 输出 true
```

上述代码中，使用了一个立即执行函数来创建单例对象。在该函数中，定义了一个私有变量 `instance` 用于存储单例实例，而 `init` 函数则是用于创建单例实例的方法。最后，返回一个对象，该对象包含一个 `getInstance` 方法，该方法用于获取单例实例。

通过上述方式实现的单例模式，可以确保在程序运行期间，某个类只有一个实例，并且该实例可以在任何地方访问。

## 适配器模式

适配器模式的作用是解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本由于接口不兼容而不能工作的两个软件实体可以一起工作。

适配器的别名是包装器（wrapper），这是一个相对简单的模式。在程序开发中有许多这样的

场景：当我们试图调用模块或者对象的某个接口时，却发现这个接口的格式并不符合目前的需求。这时候有两种解决办法，第一种是修改原来的接口实现，但如果原来的模块很复杂，或者我们拿到的模块是一段别人编写的经过压缩的代码，修改原接口就显得不太现实了。第二种办法是创建一个适配器，将原接口转换为客户希望的另一个接口，客户只需要和适配器打交道。

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

## 观察者模式

**观察者模式（Observer Pattern）：当对象间存在一对多的关系时，使用观察者模式。当被观察的对象发生变化时，其所有的观察者都会收到通知并进行相应的操作。在 JavaScript 中，可以使用回调函数或事件监听来实现观察者模式。**

在前端开发中，观察者模式常被用来实现组件间的数据传递和事件处理。比如，当一个组件的状态发生改变时，可以通过观察者模式来通知其他组件更新自身的状态或视图。

在观察者模式中，通常会定义两种角色：

1.  Subject（主题）：它是被观察的对象，当其状态发生改变时会通知所有的观察者。

1.  Observer（观察者）：它是观察主题的对象，当主题状态发生改变时会接收到通知并进行相应的处理。

以下是一个简单的实现示例：

```js
class Subject {
  constructor() {
    this.observers = []
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }

  notify(data) {
    this.observers.forEach(obs => obs.update(data))
  }
}

class Observer {
  update(data) {
    console.log(`Received data: ${data}`)
  }
}

// Usage
const subject = new Subject()
const observer1 = new Observer()
const observer2 = new Observer()

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.notify('Hello, world!')
// Output:
// Received data: Hello, world!
// Received data: Hello, world!

subject.removeObserver(observer1)

subject.notify('Goodbye, world!')
// Output:
// Received data: Goodbye, world!
```

在上面的示例中，我们定义了一个 Subject 类和一个 Observer 类。Subject 类有三个方法，addObserver 用于添加观察者，removeObserver 用于移除观察者，notify 用于通知所有观察者。

Observer 类只有一个方法 update，用于接收主题传递的数据。我们创建了两个 Observer 实例并将它们添加到了 Subject 实例中，然后调用了 notify 方法来通知它们更新数据。

在实际开发中，我们通常会使用现成的库或框架来实现观察者模式，比如 React 中的状态管理库 Redux 和事件处理库 EventEmitter。

## 介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景

观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知

[![image](https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png)](https://user-images.githubusercontent.com/18718461/53536375-228ba180-3b41-11e9-9737-d71f85040cfc.png)

- reference:
  - [观察者模式 vs 发布-订阅模式](https://juejin.im/post/5a14e9edf265da4312808d86)

## 策略模式

**策略模式（Strategy Pattern）：定义一系列的算法，将每一个算法都封装起来，并且使它们可以相互替换。在前端开发中，可以使用策略模式来动态切换组件的算法和行为。**

它可以让我们在不改变对象本身的情况下，通过修改其内部的算法实现不同的行为。策略模式常常被用于实现一些复杂的业务逻辑，特别是需要根据不同的条件进行处理的情况。

下面是一个简单的示例，演示了如何使用策略模式来实现一个计算器：

```js
// 定义一个策略对象
const strategies = {
  add: function(num1, num2) {
    return num1 + num2
  },
  subtract: function(num1, num2) {
    return num1 - num2
  },
  multiply: function(num1, num2) {
    return num1 * num2
  },
  divide: function(num1, num2) {
    return num1 / num2
  }
}

// 定义一个计算器对象
const Calculator = function(strategy) {
  this.calculate = function(num1, num2) {
    return strategy(num1, num2)
  }
}

// 使用策略模式来创建一个计算器对象
const addCalculator = new Calculator(strategies.add)
const subtractCalculator = new Calculator(strategies.subtract)
const multiplyCalculator = new Calculator(strategies.multiply)
const divideCalculator = new Calculator(strategies.divide)

// 使用计算器对象进行计算
console.log(addCalculator.calculate(10, 5)) // 输出 15
console.log(subtractCalculator.calculate(10, 5)) // 输出 5
console.log(multiplyCalculator.calculate(10, 5)) // 输出 50
console.log(divideCalculator.calculate(10, 5)) // 输出 2
```

在上面的示例中，我们首先定义了一个策略对象，其中包含了四个不同的算法：加、减、乘和除。然后我们定义了一个计算器对象，它接收一个策略对象作为参数，并将其保存在内部。最后，我们使用策略模式来创建四个不同的计算器对象，每个对象使用不同的算法进行计算。

这个示例展示了如何使用策略模式来实现一个简单的计算器，但实际上它可以应用于许多其他的场景中，例如表单验证、图表绘制等。策略模式可以让我们通过修改策略对象来改变对象的行为，从而实现更加灵活和可扩展的代码。

## 代理模式

**代理模式（Proxy Pattern）：前端设计模式中的代理模式是一种结构型模式，它允许在不改变原始对象的情况下，通过引入一个代理对象来控制对原始对象的访问。代理对象充当原始对象的中介，客户端与代理对象交互，代理对象再将请求转发给原始对象。**

代理模式在前端开发中经常被用来处理一些复杂或者耗时的操作，例如图片的懒加载、缓存等。代理对象可以在加载图片时显示占位符，当图片加载完成后再替换占位符，从而提高页面加载速度和用户体验。

另外，代理模式还可以用来实现一些权限控制的功能。例如，在用户登录后，代理对象可以检查用户的权限，只有具有相应权限的用户才能够访问某些功能或者页面。

在 JavaScript 中，代理模式通常使用 ES6 中新增的 Proxy 对象来实现。Proxy 对象允许拦截对对象的各种操作，包括读取、赋值、函数调用等。通过使用 Proxy 对象，我们可以在不改变原始对象的情况下，控制对原始对象的访问。

当我们需要为某个类或者对象添加一些额外的行为或者控制访问时，可以使用代理模式。下面是一个简单的示例，使用代理模式实现图片懒加载的功能。

```js
// 原始对象 - 图片
class Image {
  constructor(url) {
    this.url = url
  }

  // 加载图片
  load() {
    console.log(`Image loaded: ${this.url}`)
  }
}

// 代理对象 - 图片
class ProxyImage {
  constructor(url) {
    this.url = url
    this.image = null // 延迟加载
  }

  // 加载图片
  load() {
    if (!this.image) {
      this.image = new Image(this.url) // 延迟加载图片
      console.log(`Placeholder loaded for ${this.url}`)
    }
    this.image.load() // 显示图片
  }
}

// 客户端代码
const img1 = new ProxyImage('https://example.com/image1.jpg')
const img2 = new ProxyImage('https://example.com/image2.jpg')

img1.load() // Placeholder loaded for https://example.com/image1.jpg, Image loaded: https://example.com/image1.jpg
img1.load() // Image loaded: https://example.com/image1.jpg

img2.load() // Placeholder loaded for https://example.com/image2.jpg, Image loaded: https://example.com/image2.jpg
```

在上面的示例中，原始对象是 `Image` 类，代理对象是 `ProxyImage` 类。当客户端代码调用 `load()` 方法时，代理对象会首先加载占位符，并延迟加载图片。如果图片已经被加载过了，代理对象会直接显示图片，否则代理对象会加载图片并显示。通过使用代理模式，我们可以在不影响原始对象的情况下，实现了图片的懒加载功能，提高了页面加载速度和用户体验。
