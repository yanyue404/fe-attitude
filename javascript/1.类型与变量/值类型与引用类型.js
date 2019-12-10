// 值类型
var a = 10;
var b = a;
b = 20;
console.log(a); // 10
console.log(b); // 20

// 引用类型
var a = { x: 10, y: 20 };
var b = a;
b.x = 100;
b.y = 200;
console.log(a); // {x: 100, y: 200}
console.log(b); // {x: 100, y: 200}

// 例子
// 为什么

/* JS 中这种设计的原因是：按值传递的类型，复制一份存入栈内存，这类类型一般不占用太多内存，而且按值传递保证了其访问速度。
按共享传递的类型，是复制其引用，而不是整个复制其值（C 语言中的指针），保证过大的对象等不会因为不停复制内容而造成内存的浪费。 */

function foo(a) {
  a = a * 10;
}
function bar(b) {
  b.value = 'new';
}
var a = 1;
var b = { value: 'old' };
foo(a);
bar(b);
console.log(a); // 1
console.log(b); // value: new
