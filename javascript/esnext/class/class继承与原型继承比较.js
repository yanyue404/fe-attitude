/* // 动物
function Animal() {
  this.eat = function() {
    console.log('animal eat');
  };
}
// 狗
function Dog() {
  this.bark = function() {
    console.log('dog bark');
  };
}
Dog.prototype = new Animal();
// 哈士奇
var hashiqi = new Dog(); */

class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} eat`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
    this.name = name;
  }
  say() {
    console.log(`${this.name} say`);
  }
}
const dog = new Dog('哈士奇');
dog.say();
dog.eat();

// 1. 使用 extends 即可实现继承，更加符合经典面向对象语言的写法，如 Java
// 2. 子类的 constructor 一定要执行 super() ，以调用父类的 constructor 
