/**
 * Created by Administrator on 2017/3/17.
 */
window.onload = function () {
    var student = [
        ["周凯", "王玥", "王晨行", "王震", "李晓龙", "韩畅", "孙勇", "张金磊", "周鸣凤", "黄继磊", "连倩", "陈行业", "欧阳炜", "刘慧迪"],
        ["李瑞钢", "刘振伟", "姜娜", "陈丽", "刘冰", "孙玉彤", "陈辰", "张大亮", "任迪", "张敏", "阎强", "赵永哲", "邹赛丽", "李阳阳"],
        ["党欣彤", "林海燕", "刘俊宏", "陆凡", "秦莉莉", "李雅齐", "谷云婷", "刘玉", "", "", "郑朝霞", "杨钰欣", "张立伟", "张瑞春"],
        ["康冬辉", "叶周", "刘锋", "郭召", "刘秋丽", "王长盛", "徐兴丽", "栗志", "孙冬辉", "梁宸", "李延斌", "舒见佳", "尹雪松", "丁梦娟"],
        ["高涛涛", "王涛", "闫晓蕾", "王鑫", "顾万睿", "张连起", "张晶发", "王思野", "贺亚飞", "张酋", "刘丹", "王冰梅", "辛场", "孙领芝"],
        ["张梓袆", "安曾齐", "周颖", "蔡雪飞", "焦颖颖", "史垚鑫", "张谦", "黄小林", "张翔瑜", "郝红敏", "祝建云", "张成", "王艳", "陈煚"],
        ["郎倩倩", "乔石", "赵静", "张雯雯", "赵嘉", "李美玲", "王月", "郝东建", "李树丽", "毕银平", "闫沛珊", "窦迎迎", "温田", "李春阳"],
        ["罗志祥", "徐志敏", "朱超岭", "南晶涛", "刘圆圆", "金承泽", "黄杰", "孙凯丽", "马丹丹", "李亚宾", "苏映雪", "王亚平", "崔郑志", "何绪杰"],
        ["张泽田", "周文涛", "张璇", "张可", "安艳娇", "", "", "", "", "", "李帅", "张凯", "王柯妍", "孙宗倩"]
    ]

    var timer = null;
    var flicker = null;
    var onOffButtom1 = document.getElementById("onOffButtom1");//特效
    var onOffButtom2 = document.getElementById("onOffButtom2");//单点
    var onOffButtom3 = document.getElementById("onOffButtom3");//双点
    var onOffButtom4 = document.getElementById("onOffButtom4");//双点
    var onOffButtom5 = document.getElementById("onOffButtom5");//双点
    var onOffButtom6 = document.getElementById("onOffButtom6");//小组
    var particulars = document.getElementById("particulars");
    var bottomContent = document.getElementById("bottomContent");
    var promptBox = document.getElementById("promptBox");
    var buttons = document.getElementById("buttons");
    var table = document.getElementById("table");
    var music = document.getElementById("music");
    var trs = document.getElementsByTagName("tr");
    var tds = document.getElementsByTagName("td");
    var ps = table.getElementsByTagName("p");
    var spans = document.getElementsByTagName("span");
    var ems = document.getElementsByTagName("em");
    var is = document.getElementsByTagName("i");

    //通过类名获取元素
    var boys = getElementsByClass("boy");
    var girls = getElementsByClass("girl");

    //左侧移入移出
    particulars.onmouseover = function () {
        var image = particulars.children[0].children[0];
        animate(this, {
            "left": 0
        }, function () {
            animate(image, {
                "top": 0
            }, function () {
            })
        })
    }

    for (var i = 0; i < buttons.children.length; i++) {
        buttons.children[i].style.color = getColor();
    }

    particulars.onmouseout = function () {
        var image = particulars.children[0].children[0];
        animate(this, {
            "left": -180
        }, function () {
            image.style.top = "-586px";
        })
    }


    //初始化按钮颜色
    var buttonUl = buttons.getElementsByTagName("ul");
    for (var i = 0; i < buttonUl.length; i++) {
        var buttonList = buttonUl[i].getElementsByTagName("li");
        for (var j = 0; j < buttonList.length; j++) {
            if (j == 0 || j == 2) {
                buttonList[j].style.backgroundColor = getColor();
            }
        }
    }

    //设置底部内容
    getTime();
    setInterval(getTime, 1000)
    function getTime() {
        var bottomDiv = bottomContent.getElementsByTagName("div");
        var day = new Date();
        var year = day.getFullYear();//年
        var month = day.getMonth() + 1;//月
        var dat = day.getDate();//日
        var hour = day.getHours();//小时
        var minitue = day.getMinutes();//分钟
        var second = day.getSeconds();//秒
        month = month < 10 ? "0" + month : month;
        dat = dat < 10 ? "0" + dat : dat;
        hour = hour < 10 ? "0" + hour : hour;
        minitue = minitue < 10 ? "0" + minitue : minitue;
        second = second < 10 ? "0" + second : second;
        bottomDiv[2].innerHTML = hour + ":" + minitue + ":" + second;
        bottomDiv[0].innerHTML = year + "年" + month + "月" + dat + "日";

        var week = "";
        switch (day.getDay()) {
            case 0:
                week = "日";
                break;
            case 1:
                week = "一";
                break;
            case 2:
                week = "二";
                break;
            case 3:
                week = "三";
                break;
            case 4:
                week = "四";
                break;
            case 5:
                week = "五";
                break;
            case 6:
                week = "六";
                break;
        }
        bottomDiv[1].innerHTML = "星期" + week;
        bottomDiv[3].style.color = getColor();
    }

    //初始化链接线颜色
    //横线
    for (var i = 0; i < spans.length; i++) {
        spans[i].style.backgroundColor = getColor();
    }

    //竖线
    for (var i = 0; i < ems.length; i++) {
        ems[i].style.backgroundColor = getColor();
    }


//初始化边框颜色
    for (var i = 0; i < tds.length; i++) {
        tds[i].style.borderColor = getColor();
        tds[i].style.color = getColor();
    }

//初始化成员
    for (var i = 0; i < trs.length; i++) {
        var trsTds = trs[i].getElementsByTagName("td");
        for (var j = 0; j < trsTds.length; j++) {
            trsTds[j].children[0].innerHTML = student[i][j];
        }
    }

//特效开关
    var specialEffects = false;
    onOffButtom1.onclick = function () {
        var ul = this.children[0];
        if (specialEffects) {
            animate(ul, {
                "left": -40
            }, function () {
                ul.children[0].style.backgroundColor = getColor();
            });
            for (var i = 0; i < spans.length; i++) {
                spans[i].style.display = "block";
            }
            for (var i = 0; i < ems.length; i++) {
                ems[i].style.display = "block";
            }
            for (var i = 0; i < is.length; i++) {
                is[i].style.display = "block";
            }
            specialEffects = false;
        } else {
            animate(ul, {
                "left": 0
            }, function () {
                ul.children[2].style.backgroundColor = getColor();
            });
            for (var i = 0; i < spans.length; i++) {
                spans[i].style.display = "none";
            }
            for (var i = 0; i < ems.length; i++) {
                ems[i].style.display = "none";
            }
            for (var i = 0; i < is.length; i++) {
                is[i].style.display = "none";
            }
            specialEffects = true;
        }
    }

//随机生成13组颜色存储到数组中
    var arrColir = [];
    for (var i = 0; i < 13; i++) {
        arrColir[i] = getColor();
    }

    for (var i = 0; i < trs.length; i++) {
        var trIs = trs[i].getElementsByTagName("i");
        for (var j = 0; j < trIs.length; j++) {
            trIs[j].style.backgroundColor = arrColir[j];
        }
    }


    //走马灯特效
    setInterval(function () {
        arrColir.push(arrColir.shift());
        for (var i = 0; i < trs.length; i++) {
            var trIs = trs[i].getElementsByTagName("i");
            for (var j = 0; j < trIs.length; j++) {
                trIs[j].style.backgroundColor = arrColir[j];
            }
        }
    }, 1000);


//单点+闪烁效果
    var onOff1 = true;
    onOffButtom2.onclick = function () {
        var ul = this.children[0];
        if (onOff1) {
            animate(ul, {
                "left": -40
            }, function () {
                ul.children[0].style.backgroundColor = getColor();
            });
            music.play();
            clearInterval(flicker);
            flicker = setInterval(function () {

                //幸运者
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.backgroundColor = "#fff";
                }
                var goodFortune1 = parseInt(Math.random() * ps.length);
                ps[goodFortune1].parentNode.style.backgroundColor = getColor();
                promptBox.children[0].innerHTML = ps[goodFortune1].innerHTML;


                //边框
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.borderColor = getColor();
                    tds[i].style.color = getColor();
                }

                //横线
                for (var i = 0; i < spans.length; i++) {
                    spans[i].style.backgroundColor = getColor();
                }

                //竖线
                for (var i = 0; i < ems.length; i++) {
                    ems[i].style.backgroundColor = getColor();
                }

                //圆点
                for (var i = 0; i < is.length; i++) {
                    is[i].style.backgroundColor = getColor();
                }
            }, 100);
            onOff1 = false;
        } else {
            animate(ul, {
                "left": 0
            }, function () {
                ul.children[2].style.backgroundColor = getColor();
            });
            music.pause();
            clearInterval(flicker);
            onOff1 = true;
        }
    }

//双点+闪烁效果
    var onOff2 = true;
    onOffButtom3.onclick = function () {
        var ul = this.children[0];
        if (onOff2) {
            animate(ul, {
                "left": -40
            }, function () {
                ul.children[0].style.backgroundColor = getColor();
            });
            music.play();
            clearInterval(flicker);
            flicker = setInterval(function () {

                //幸运者
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.backgroundColor = "#fff";
                }
                var goodFortune1 = parseInt(Math.random() * ps.length);
                var goodFortune2 = parseInt(Math.random() * ps.length);
                ps[goodFortune1].parentNode.style.backgroundColor = getColor();
                ps[goodFortune2].parentNode.style.backgroundColor = getColor();
                promptBox.children[0].innerHTML = ps[goodFortune1].innerHTML + "、" + ps[goodFortune2].innerHTML;

                //边框
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.borderColor = getColor();
                    tds[i].style.color = getColor();
                }

                //横线
                for (var i = 0; i < spans.length; i++) {
                    spans[i].style.backgroundColor = getColor();
                }

                //竖线
                for (var i = 0; i < ems.length; i++) {
                    ems[i].style.backgroundColor = getColor();
                }

                //圆点
                for (var i = 0; i < is.length; i++) {
                    is[i].style.backgroundColor = getColor();
                }
            }, 100);
            onOff2 = false;
        } else {
            animate(ul, {
                "left": 0
            }, function () {
                ul.children[2].style.backgroundColor = getColor();
            });
            music.pause();
            clearInterval(flicker);
            onOff2 = true;
        }
    }


    //=======================================================================================================
    //只选女生+闪烁效果
    var onOff3 = true;
    onOffButtom4.onclick = function () {
        var ul = this.children[0];
        if (onOff3) {
            animate(ul, {
                "left": -40
            }, function () {
                ul.children[0].style.backgroundColor = getColor();
            });
            music.play();
            clearInterval(flicker);
            flicker = setInterval(function () {

                //幸运者
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.backgroundColor = "#fff";
                }
                var goodFortune1 = parseInt(Math.random() * girls.length);

                girls[goodFortune1].parentNode.style.backgroundColor = getColor();

                promptBox.children[0].innerHTML = girls[goodFortune1].innerHTML;

                //边框
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.borderColor = getColor();
                    tds[i].style.color = getColor();
                }

                //横线
                for (var i = 0; i < spans.length; i++) {
                    spans[i].style.backgroundColor = getColor();
                }

                //竖线
                for (var i = 0; i < ems.length; i++) {
                    ems[i].style.backgroundColor = getColor();
                }

                //圆点
                for (var i = 0; i < is.length; i++) {
                    is[i].style.backgroundColor = getColor();
                }
            }, 100);
            onOff3 = false;
        } else {
            animate(ul, {
                "left": 0
            }, function () {
                ul.children[2].style.backgroundColor = getColor();
            });
            music.pause();
            clearInterval(flicker);
            onOff3 = true;
        }
    }
    //=======================================================================================================

    //=======================================================================================================
    //只选女生+闪烁效果
    var onOff4 = true;
    onOffButtom5.onclick = function () {
        var ul = this.children[0];
        if (onOff4) {
            animate(ul, {
                "left": -40
            }, function () {
                ul.children[0].style.backgroundColor = getColor();
            });
            music.play();
            clearInterval(flicker);
            flicker = setInterval(function () {

                //幸运者
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.backgroundColor = "#fff";
                }
                var goodFortune1 = parseInt(Math.random() * boys.length);

                boys[goodFortune1].parentNode.style.backgroundColor = getColor();

                promptBox.children[0].innerHTML = boys[goodFortune1].innerHTML;

                //边框
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.borderColor = getColor();
                    tds[i].style.color = getColor();
                }

                //横线
                for (var i = 0; i < spans.length; i++) {
                    spans[i].style.backgroundColor = getColor();
                }

                //竖线
                for (var i = 0; i < ems.length; i++) {
                    ems[i].style.backgroundColor = getColor();
                }

                //圆点
                for (var i = 0; i < is.length; i++) {
                    is[i].style.backgroundColor = getColor();
                }
            }, 100);
            onOff4 = false;
        } else {
            animate(ul, {
                "left": 0
            }, function () {
                ul.children[2].style.backgroundColor = getColor();
            });
            music.pause();
            clearInterval(flicker);
            onOff4 = true;
        }
    }
    //=======================================================================================================


    //小组模式
    var onOff6 = true;
    onOffButtom6.onclick = function () {
        var ul = this.children[0];
        if (onOff6) {
            animate(ul, {
                "left": -40
            }, function () {
                ul.children[0].style.backgroundColor = getColor();
            });
            music.play();
            clearInterval(flicker);
            flicker = setInterval(function () {

                //幸运者
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.backgroundColor = "#fff";
                }
                var num = parseInt(Math.random() * 18);
                switch (num) {
                    case 0:
                        group(num);
                        promptBox.children[0].innerHTML = "第一组";
                        break;
                    case 1:
                        group(num);
                        promptBox.children[0].innerHTML = "第二组";
                        break;
                    case 2:
                        group(num);
                        promptBox.children[0].innerHTML = "第三组";
                        break;
                    case 3:
                        group(num);
                        promptBox.children[0].innerHTML = "第四组";
                        break;
                    case 4:
                        group(num);
                        promptBox.children[0].innerHTML = "第五组";
                        break;
                    case 5:
                        group(num);
                        promptBox.children[0].innerHTML = "第六组";
                        break;
                    case 6:
                        group(num);
                        promptBox.children[0].innerHTML = "第七组";
                        break;
                    case 7:
                        group(num);
                        promptBox.children[0].innerHTML = "第八组";
                        break;
                    case 8:
                        group(num);
                        promptBox.children[0].innerHTML = "第九组";
                        break;
                    case 9:
                        newGroup(0);
                        promptBox.children[0].innerHTML = "第十组";
                        break;
                    case 10:
                        newGroup(1);
                        promptBox.children[0].innerHTML = "第十一组";
                        break;
                    case 11:
                        newGroup(2);
                        promptBox.children[0].innerHTML = "第十二组";
                        break;
                    case 12:
                        newGroup(3);
                        promptBox.children[0].innerHTML = "第十三组";
                        break;
                    case 13:
                        newGroup(4);
                        promptBox.children[0].innerHTML = "第十四组";
                        break;
                    case 14:
                        newGroup(5);
                        promptBox.children[0].innerHTML = "第十五组";
                        break;
                    case 15:
                        newGroup(6);
                        promptBox.children[0].innerHTML = "第十六组";
                        break;
                    case 16:
                        newGroup(7);
                        promptBox.children[0].innerHTML = "第十七组";
                        break;
                    case 17:
                        newGroup(8);
                        promptBox.children[0].innerHTML = "第十八组";
                        break;
                }

                function group(num) {
                    var groupMember = trs[num].children;
                    var groupColor = getColor();
                    for (var i = 0; i < 8; i++) {
                        groupMember[i].style.backgroundColor = groupColor;
                    }
                }

                function newGroup(num) {
                    var groupMember = trs[num].children;
                    var groupColor = getColor();
                    for (var i = 8; i < groupMember.length; i++) {
                        groupMember[i].style.backgroundColor = groupColor;
                    }
                }


                //边框
                for (var i = 0; i < tds.length; i++) {
                    tds[i].style.borderColor = getColor();
                    tds[i].style.color = getColor();
                }

                //横线
                for (var i = 0; i < spans.length; i++) {
                    spans[i].style.backgroundColor = getColor();
                }

                //竖线
                for (var i = 0; i < ems.length; i++) {
                    ems[i].style.backgroundColor = getColor();
                }

                //圆点
                for (var i = 0; i < is.length; i++) {
                    is[i].style.backgroundColor = getColor();
                }
            }, 100);
            onOff6 = false;
        } else {
            animate(ul, {
                "left": 0
            }, function () {
                ul.children[2].style.backgroundColor = getColor();
            });
            music.pause();
            clearInterval(flicker);
            onOff6 = true;
        }
    }

//带回调函数的animate函数
    function animate(tag, obj, fun) {
        clearInterval(tag.timer);
        tag.timer = setInterval(function () {
            var flag = true;
            for (var k in obj) {
                if (k == "zIndex") {
                    tag.style[k] = obj[k];
                } else if (k == "opacity") {
                    var target = obj[k] * 100;
                    var leader = getStyle(tag, k) * 100;
                    var step = (target - leader) / 15;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    tag.style[k] = (leader + step) / 100;
                } else {
                    target = obj[k];
                    leader = parseInt(getStyle(tag, k));
                    var step = (target - leader) / 15;
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    tag.style[k] = leader + step + "px";
                }
                if (leader != target) {
                    flag = false;
                }
            }
            if (flag) {
                clearInterval(tag.timer);
                fun();
            }

        }, 17);
    }

//获取css样式属性值
    function getStyle(tag, sty) {
        if (tag.currentStyle) {
            return tag.currentStyle[sty];
        } else {
            return getComputedStyle(tag, null)[sty];
        }
    }

//随机获取十六进制颜色#
    function getColor() {
        var str = "#";
        var arr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        for (var i = 0; i < 6; i++) {
            str += arr[Math.floor(Math.random() * 16)];
        }
        return str;
    }
}

function getElementsByClass(className) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(className);
    } else {
        var tagNames = [];
        var tags = document.body.getElementsByTagName("*");
        var classs;
        for (var i = 0; i < tags.length; i++) {
            classs = tags[i].className.split(" ");
            for (var k = 0; k < classs.length; k++) {
                if (classs[k] == className) {
                    tagNames[tagNames.length] = tags[i].className;
                    break;
                }
            }
        }
        return tagNames;
    }
}