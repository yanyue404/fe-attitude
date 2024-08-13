// ## 将一个联合类型断言为其中一个类型
interface Cat1 {
  name: string
  run(): void
}
interface Fish {
  name: string
  swim(): void
}

function isFish(animal: Cat1 | Fish) {
  //   Property 'swim' does not exist on type 'Cat1'.
  // if (typeof animal.swim === 'function') {
  if (typeof (animal as Fish).swim === 'function') {
    return true
  }
  return false
}

// ## 非空断言
// 对于那些可能为空的变量（即可能等于undefined或null），TypeScript 提供了非空断言，保证这些变量不会为空，写法是在变量名后面加上感叹号!。
function f(x?: number | null) {
  validateNumber(x) // 自定义函数，确保 x 是数值
  console.log(x!.toFixed())
}

function validateNumber(e?: number | null) {
  if (typeof e !== 'number') throw new Error('Not a number')
}

// ## 将任何一个类型断言为 any
// 它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any
// 一方面不能滥用 as any，另一方面也不要完全否定它的作用，我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值。
;(window as any).foo = 1

// ## 将 any 断言为一个具体的类型

// 举例来说，历史遗留的代码中有个 getCacheData，它的返回值是 any：

function getCacheData(key: string): any {
  return (window as any).cache[key]
}
// 那么我们在使用它时，最好能够将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作：

interface Cat2 {
  name: string
  run(): void
}

const tom = getCacheData('tom') as Cat2
tom.run()
// 上面的例子中，我们调用完 getCacheData 之后，立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，后续对 tom 的访问时就有了代码补全，提高了代码的可维护性。
