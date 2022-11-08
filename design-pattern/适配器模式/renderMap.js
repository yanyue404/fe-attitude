/* ;(() => {
  var googleMap = {
    show: function() {
      console.log('开始渲染谷歌地图')
    }
  }
  var baiduMap = {
    show: function() {
      console.log('开始渲染百度地图')
    }
  }
  var renderMap = function(map) {
    if (map.show instanceof Function) {
      map.show()
    }
  }
  renderMap(googleMap) // 输出：开始渲染谷歌地图
  renderMap(baiduMap) // 输出：开始渲染百度地图
})() */

var googleMap = {
  show: function() {
    console.log('开始渲染谷歌地图')
  }
}

var baiduMap = {
  show: function() {
    console.log('开始渲染百度地图')
  }
}

// tencentMap 提供的显示地图的方法不叫 show 而叫 display
// tencentMap 这个对象来源于第三方，正常情况下我们都不应该去改动它。此时我们可以通过增加 tencentMapAdapter 来解决问题
var tencentMap = {
  display: function() {
    console.log('开始渲染腾讯地图')
  }
}

var renderMap = function(map) {
  if (map.show instanceof Function) {
    map.show()
  }
}

var tencentMapAdapter = {
  show: function() {
    return tencentMap.display()
  }
}

renderMap(googleMap) // 输出：开始渲染谷歌地图
renderMap(baiduMap) // 输出：开始渲染百度地图
renderMap(tencentMapAdapter) // 输出：开始渲染百度地图
