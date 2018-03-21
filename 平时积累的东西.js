
// *                         ☆★☆★☆★☆★☆★☆JavaScript草稿集☆★☆★☆★☆★☆★☆

// ★★★★★★★★★★★★★★★★★数据类型★★★★★★★★★★★★★★★★★★★
// 1.数字验证

var str = parseInt(document.getElementById(str).value);
var typeString = toString.call(str);
if (isNaN(str)) {
  alert('请输入数字')
}

if (typeString !== "[object Number]") {
  alert('请输入数字')
}

// input type为numer和为text的区别
// parseInt 作用
// 属性为text document.getElementById(ele).value 任意输入值都可获取
// 属性为number 获取value属性只能获取输入值为number类型的情况

// 对象属性的链式访问
var obj = {
  name: "Carrot",
  "for": "Max",
  details: {
    color: "orange",
    size: 12
  }
}

console.log(obj.details.color) // orange
console.log(obj["details"]["color"]) //orange


// 星期几获取
var weekDayLabels = ["星期日", "星期一",
  "星期二", "星期三", "星期四", "星期五", "星期六"];
alert(weekDayLabels[(new Date()).getDay()])
//setTime以毫秒数设置日期，会改变整个日期
var dd = new Date();
dd.setTime(dd.getTime() + AddDayCount * 24 * 60 * 60 * 1000);//获取AddDayCount天后的日期


// ★★★★★★★★★★★★★★★★★对数组，字符串的操作★★★★★★★★★★★★★


//1.map方法与forEach方法区别，map方法重新生成了一个数组并返回，forEach没有

//2.类数组对象转化为真正的javascript数组
// jQuery
$.makeArray(arrayLike);

// Native
Array.prototype.slice.call(arrayLike);

// ES6-way
Array.from(arrayLike);


// ★★★★★★★★★★★★★★★★★★对dom的操作★★★★★★★★★★★★★★★★★★


// Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

const bar = document.querySelectorAll('.slider-list__item, .slider-list__item--selected');

var dom1 = document.querySelector('.slider-list_item--selected')
console.log(Array.from(bar).indexOf(dom))

//多元素绑定事件监听

var btn = document.querySelectorAll('button');

for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', function (e) {
    alert(e.target.innerText)
  })
}

//点击事件中的 event对象
document.querySelector('span').onclick = function (e) {
  console.log(e.target.id)
}

// setAttribute设置onclick事件
document.getElementById('box').setAttribute('onclick', "func()");

function func() {
  alert(2)
}

// 监听键盘回车事件
document.onkeydown = function (event) {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 13) { // enter 键
    //要做的事情
    alert('enter')
  }
};


// 原生js字符编码传参  https://github.com/xiaoyueyue165/blog/issues/6

// DOMContentLoaded事件(https://www.cnblogs.com/caizhenbo/p/6679478.html)
// jQuery
$(document).ready(eventHandler);

// Native
// 检测 DOMContentLoaded 是否已完成
if (document.readyState === 'complete' || document.readyState !== 'loading') {
  eventHandler();
} else {
  document.addEventListener('DOMContentLoaded', eventHandler);
}

// style与setAttribute
imgsArray[0].style.src = "./img/wait.png"; //错误
imgsArray[i].setAttribute("src", "./img/wait.png") //正确

// 获取对应月份的总天数
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}
