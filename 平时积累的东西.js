
// *                         ☆★☆★☆★☆★☆★☆JavaScript草稿集☆★☆★☆★☆★☆★☆


// map方法
var arr = [{
  id: '1',
  color: 'green'
}, {
  id: '2',
  color: 'red'
}]

arr.map((v, index) => {
  if (v.id === '2') {
    console.log(v.color)
  }
})

// Array.from() 方法从一个类似数组或可迭代对象中创建一个新的数组实例。

const bar = document.querySelectorAll('.slider-list__item, .slider-list__item--selected');

var dom1 = document.querySelector('.slider-list_item--selected')
console.log(Array.from(bar).indexOf(dom))

// 重复数据的删除

function dedupe(client, hasher) {
  hasher = hasher || JSON.stringify

  const clone = []
  const lookup = {}

  for (let i = 0; i < client.length; i++) {
    let elem = client[i]  //数组元素
    let hashed = hasher(elem) //键



    if (!lookup[hashed]) {  //对象中没有键
      clone.push(elem)   //放到新数组
      lookup[hashed] = true //标识符
    }
  }

  return clone
}
// 数字验证

/* var str = parseInt(document.getElementById(str).value);
var typeString = toString.call(str);
if (isNaN(str)) {
  alert('请输入数字')
}

if (typeString !== "[object Number]") {
  alert('请输入数字')
} */

// input type为numer和为text的区别
// parseInt 作用
// 属性为text document.getElementById(ele).value 任意输入值都可获取
// 属性为number 获取value属性只能获取输入值为number类型的情况

//多元素绑定事件监听

/* 
<button>点击</button>

<button>还有</button>

  var btn = document.querySelectorAll('button');

 for(var i=0;i<btn.length;i++){
   btn[i].addEventListener('click',function(e){
     alert(e.target.innerText)
   })
 } */

 // 原生js字符编码传参  https://github.com/xiaoyueyue165/blog/issues/6

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