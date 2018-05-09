/**
 * Created by lenovo on 2017/3/31.
 */
window.onload = function () {
    //需求1: 页面加载的时候,让每一个li标签缓动到指定位置;(宽高透明层级位置...)
    //需求2: 点击右侧按钮,让当前的最高亮的样式组,变成第二个盒子的样式;
    //删除样式数组中的第一个,赋值给数组的最末尾;
    //需求3: 点击左侧按钮,让当前的最高亮的样式组,变成第四个盒子的样式;
    //删除样式数组中的最后一个,赋值给数组的第一位;

    //原理: 删除样式数组中的一个添加到最前面或者最末尾;让所有li重新加载一次样式;

    //样式数组;
    var arrOfJson = [
        {   //  1
            width: 400,
            top: 70,
            left: 50,
            opacity: 0.2,
            "z-index": 2
        },
        {  // 2
            width: 600,
            top: 120,
            left: 0,
            opacity: 0.8,
            "z-index": 3
        },
        {   // 3
            width: 800,
            top: 100,
            left: 200,
            opacity: 1,
            "z-index": 4
        },
        {  // 4
            width: 600,
            top: 120,
            left: 600,
            opacity: 0.8,
            "z-index": 3
        },
        {   //5
            width: 400,
            top: 70,
            left: 750,
            opacity: 0.2,
            "z-index": 2
        }
    ];

    var slide = document.getElementById("slide");
    var liArr = slide.getElementsByTagName("li");
    var arrow = document.getElementById("arrow");
    var prev = arrow.children[0];
    var next = arrow.children[1];

    //初始化li标签样式
    autoPlay();


    //显示隐藏小三角
    slide.onmouseover = function () {
        animate(arrow, {"opacity": 1});
    }
    slide.onmouseout = function () {
        animate(arrow, {"opacity": 0});
    }

    //右侧按钮,调用函数的时参数传true;
    next.onclick = function () {
        autoPlay(true);
    }

    //左侧按钮,调用函数的时参数传false;
    prev.onclick = function () {
        autoPlay(false);
    }

    function autoPlay(flag) {
        if (flag !== undefined) {
            if (flag) {
                //如果flag是true;点击的就是右侧按钮,如果是false,点击的就是左侧按钮;
                //删除样式数组中的第一个,赋值到数组的最末尾
                arrOfJson.push(arrOfJson.shift());
            } else {
                //删除样式数组中最后一个,赋值到数组的第一个
                arrOfJson.unshift(arrOfJson.pop());
            }
        }
        for (var i = 0; i < liArr.length; i++) {
            animate(liArr[i], arrOfJson[i]);
        }
    }

}