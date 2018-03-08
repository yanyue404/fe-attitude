
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

function dedupe (client, hasher) {
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
