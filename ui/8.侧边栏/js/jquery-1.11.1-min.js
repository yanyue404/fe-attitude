function animateLiu(ele,json,fn){

    clearInterval(ele.timer);
    ele.timer=setInterval(function () {
        var bool=true;
        for(var k in json){

            if(k ==="z-index"){
                ele.style.zIndex=json[k];
            }else if(k ==="opacity"){
                var leader=parseInt(getStyle(ele,k)*10)||10;
                var step=(parseInt(json[k]*10)-leader)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                leader=leader+step;
                ele.style[k]=leader/10;
                //����ie678
                ele.style.filter="alpha(opacity="+leader*10+")";
                //�����ʱ��
                if(parseInt(json[k]*10)!==leader){
                    bool=false;
                }
            }else{
                //��������
                var leader=parseInt(getStyle(ele,k))||0;
                var step=(json[k]-leader)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                leader=leader+step;
                ele.style[k]=leader+"px";
                //�����ʱ��
                if(json[k]!==leader){
                    bool=false;
                }

            }
        }
        console.log(1);
        if(bool){
            clearInterval(ele.timer);
            if(fn){
                fn();
            }
        }

    },30);

}
function lianimate(ele,target) {
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        var step = target > ele.offsetLeft ? 10 : -10;
        ele.style.left = ele.offsetLeft + step + "px";
        if (Math.abs(target - ele.offsetLeft) <= Math.abs(step)) {
            ele.style.left = target + "px";
            clearInterval(ele.timer);
        }
    }, 10);
}
//显示盒子
function show(ele){
    ele.style.display = "block";
}

//隐藏盒子
function hide(ele){
    ele.style.display = "none";
}
/**
 * Created by Lenovo on 2017/4/2.
 */
//封装一个方法，兼容获取浏览器可视区域的宽高；
function client(){
    if(window.innerWidth !== undefined){
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }else if(document.compatMode === "CSS1Compat"){
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        };
    }else{
        return {
            width: document.body.clientWidth,
            height: document.body.clientHeight
        };
    }
}



function getStyle(ele,attr){
    //判断:浏览器是否支持某个方法,支持就调用,不支持就用另外一个
    if(ele.currentStyle !== undefined){//如果该属性不存在返回值就是undefined
        return ele.currentStyle[attr];//中括号获取属性值,比较灵活,传递什么就是什么
    }else{
        //火狐谷歌ie9+支持的方法
        return window.getComputedStyle(ele,null)[attr];
    }
}

/**
 * Created by Lenovo on 2017/3/31.
 */
//封装一个方法,传递过去三个参数,元素/属性/值!
function animate(ele,json,fn){
    //要用定时器,先清定时器
    clearInterval(ele.timer);
    ele.timer = setInterval(function () {
        //一定在for循环之外,还不能超出定时器之外
        var bool = true;
        for(var k in json){
            //要兼容很多属性,就要判断属性值是什么,然后给定逻辑;
            //判断:如果属性时z-index;
            if(k === "z-index"){
                //如果是层级，需求：直接提高到最高。不要一点一点增加；
                ele.style.zIndex = json[k];
                //清除定时器和层级无关；

                //判断:如果属性时opacity;(一定是小数)
            }else if(k === "opacity"){
                //opacity这个属性接受的都是小数，小数运算容易出现精度丢失；
                //所以先放大10倍；然后计算,计算完毕赋值的时候在缩小10倍;
                var leader = parseInt(getStyle(ele,k)*10) || 10;//getStyle();的返回值是一个带有代为的字符串
                var step = (parseInt(json[k]*10)-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader + step;//下一步盒子要到的位置
                //赋值的时候要缩小10倍,不需要单位;
                ele.style[k] = leader/10;
                //兼容ie678:
                ele.style.filter = "alpha(opacity="+leader*10+")";
                //清除定时器;
                if(parseInt(json[k]*10) !== leader){
                    bool = false;
                }
            }else{
                //正常属性,走这一套逻辑
                var leader = parseInt(getStyle(ele,k)) || 0;//getStyle();的返回值是一个带有代为的字符串
                var step = (json[k]-leader)/10;
                step = step>0?Math.ceil(step):Math.floor(step);
                leader = leader + step;//下一步盒子要到的位置
                ele.style[k] = leader + "px";
                //清除定时器;
                if(json[k] !== leader){
                    bool = false;
                }
            }
        }
        //所以清除定时器必须在for循环之外,还需要判断;
        console.log(1);
        if(bool){
            clearInterval(ele.timer);
            //清除定时器之后,就是整个函数执行完毕的时候,这时候我就可以执行另一个函数了
            if(fn){
                fn();
            }
        }
    },20);
}

function getStyle(ele,attr){
    //判断:浏览器是否支持某个方法,支持就调用,不支持就用另外一个
    if(ele.currentStyle !== undefined){//如果该属性不存在返回值就是undefined
        return ele.currentStyle[attr];//中括号获取属性值,比较灵活,传递什么就是什么
    }else{
        //火狐谷歌ie9+支持的方法
        return window.getComputedStyle(ele,null)[attr];
    }
}


function scroll(){
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft,
        top:  window.pageYOffset || document.documentElement.scrollTop
    }
}


//封装一个方法,根据body的宽给定颜色;
function changeBodyColor() {
    //如果小于640,给定body背景色为黄色;
    //如果小于960,给定body背景色为粉色;
    //如果大于960,给定body背景色为skyblue;

    //判断的时候,一般都是从小到大;
    if(client().width <= 640){
        document.body.style.background = "yellow";
    }else if(client().width<=960){
        document.body.style.background = "pink";
    }else{
        document.body.style.background = "skyblue";
    }
}



/**
 * 功能:获取下一个兄弟节点
 * @param ele
 * @returns {Element|*|Node}
 */
function next(ele){
    var aaa = ele.nextElementSibling || ele.nextSibling;
    return aaa;
}


/**
 * 功能:获取上(前)一个兄弟节点
 * @param ele
 * @returns {Element|*|Node}
 */
function prev(ele){
    return ele.previousElementSibling || ele.previousSibling;
}


/**
 * 功能:获取第一个子节点
 * @param ele
 * @returns {Element|*|Node}
 */
function first(ele){
    return ele.firstElementChild || ele.firstChild;//缺点:ie678中容易获取注释节点
    //拓展
    //var aaa = ele.firstChild;
    //while(aaa.nodeType != 1){//元素节点:1;   属性节点:2;   文本节点:3;   注释节点:8;
    //    //如果不是元素节点,接着往下找!
    //    aaa = aaa.nextSibling;//为aaa覆盖下一个兄弟节点
    //}
    //return aaa;
}

/**
 * 功能:获取最后一个子节点
 * @param ele
 * @returns {Element|*|Node}
 */
function last(ele){
    return ele.lastElementChild || ele.lastChild;//缺点:ie678中容易获取注释节点
    //拓展
    //var aaa = ele.lastChild;
    //while(aaa.nodeType != 1){//元素节点:1;   属性节点:2;   文本节点:3;   注释节点:8;
    //    //如果不是元素节点,接着往下找!
    //    aaa = aaa.previousSibling;//为aaa覆盖下一个兄弟节点
    //}
    //return aaa;
}


//拓展方法1:
/**
 * 功能:根据索引值找兄弟节点
 * @param ele
 * @param index
 * @returns {*|HTMLElement}
 */
function getSibEleOfIndex(ele,index){
    return ele.parentNode.children[index];
}

//拓展方法2:
/**
 * 功能:查找所有兄弟节点(不包括自己)
 * @param ele
 * @returns {*|HTMLElement}
 */
function siblings(ele){
    //先找父亲在找所有儿子,从中寻找不是自己的添加到新的数组中
    var newArr = [];
    var arr = ele.parentNode.children;//ie678中无法取出注释节点;
    for(var i=0;i<arr.length;i++){
        //判断:不是自己就添加
        if(arr[i].nodeType == 1 && arr[i] != ele){
            newArr.push(arr[i]);
        }
    }
    //把新数组返回
    return newArr;
}

//模拟js一部分内置对象的制造方法;
var Event = {
    //事件监听方法:
    addEvent:function (ele,eve,fn){
        //判断:浏览器支持哪个方法,就调用哪个方法;
        if(ele.addEventListener){//不等于undefined就说明浏览器支持该方法;
            //传过来的参数,事件带不带"on";    不带更方便,因为添加比截取方便;
            ele.addEventListener(eve,fn);
        }else if(ele.attachEvent){
            //ie678
            ele.attachEvent("on"+eve,fn);
        }else{
            //dom0;很久很久以前的浏览器......
            //这个时代的浏览器既不支持addEventListener,也不支持attachEvent;我们只能原始方法绑定;
            demo(ele,eve,fn);
        }
    },
    removeEvent:function (ele,eve,fn){
        //判断浏览器支持哪个方法;
        if(ele.removeEventListener){//不加()代表获取该属性(属性值是函数),加()变成执行函数了
            ele.removeEventListener(eve,fn);
            //ie678
        }else if(ele.detachEvent){
            ele.detachEvent("on"+eve,fn);
        }else{
            ele["on"+eve] = null;//一次性全部清除;
        }
    }
};



function demo(ele,eve,fn){
    //1.绑定事件前先获取老事件;
    //2.重新绑定事件,然后判断老事件是否存在;
    //(1).如果没有老的函数直接绑定新的函数;
    //(2).如果有老的函数,先执行函数,在执行新函数;

    //1.绑定事件前先获取老事件;
    var oldEve = ele["on"+eve];//获取老事件上的程序;1.如果没有返回值为null; 2.如果有返回值为函数;
    //2.重新绑定事件,然后判断老事件是否存在;
    ele["on"+eve] = function () {
        //严谨判断:
//            if(oldEve && typeof oldEve === "function"){

        //看看老事件是否存在;在就是一个函数,不在就是一个null;
        if(oldEve){
            //(2).如果有老的函数,先执行函数,在执行新函数;
            oldEve();
            //如果先执行新的就会出现后绑定的逻辑先执行;
            fn();
        }else{
            //(1).如果没有老的函数直接绑定新的函数;
            fn();
        }
    }
}

//1.传递元素之前的所有兄弟节点;//思考题:prevAll();
//2.传递元素之后的所有兄弟节点;//思考题:nextAll();
