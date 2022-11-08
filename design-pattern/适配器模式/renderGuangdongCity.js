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
