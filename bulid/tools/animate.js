//封装一个方法,传递过去三个参数,元素/属性/值!
function animate(ele, json, fn) {
  clearInterval(ele.timer);
  ele.timer = setInterval(function () {
    var bool = true;
    for (var k in json) {
      if (k === "z-index") {
        //如果是层级，需求：直接提高到最高。不要一点一点增加；
        ele.style.zIndex = json[k];
      } else if (k === "opacity") {
        //opacity这个属性接受的都是小数，小数运算容易出现精度丢失；
        //所以先放大10倍；然后计算,计算完毕赋值的时候在缩小10倍;
        var leader = parseInt(getStyle(ele, k) * 10) || 10; //getStyle();的返回值是一个带有代为的字符串
        var step = (parseInt(json[k] * 10) - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step; //下一步盒子要到的位置
        //赋值的时候要缩小10倍,不需要单位;
        ele.style[k] = leader / 10;
        //兼容ie678:
        ele.style.filter = "alpha(opacity=" + leader * 10 + ")";
        //清除定时器;
        if (parseInt(json[k] * 10) !== leader) {
          bool = false;
        }
      } else {
        //正常属性,走这一套逻辑
        var leader = parseInt(getStyle(ele, k)) || 0; //getStyle();的返回值是一个带有代为的字符串
        var step = (json[k] - leader) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        leader = leader + step; //下一步盒子要到的位置
        ele.style[k] = leader + "px";
        //清除定时器;
        if (json[k] !== leader) {
          bool = false;
        }
      }
    }
    //所以清除定时器必须在for循环之外,还需要判断;
    if (bool) {
      clearInterval(ele.timer);
      //清除定时器之后,就是整个函数执行完毕的时候,这时候我就可以执行另一个函数了
      if (fn) {
        fn();
      }
    }
  }, 30);
}