# 属性的操作

  
### ele.属性名=属性值 | ele. 属性名[属性值]= 控制属性的值. 
src/className/title,innerHTML....

````
img.src="image/2.jpg";

var aaa = "className";
ele[aaa] = "erweima hide";
````

字符串使用方法扩展
````
 ele[aaa] = ele.className.replace("show","hide");
````

1. 正常属性: src/title/id....

2. 特殊属性: className/href/innerHTML....

3. 表单属性: value/disabled/checked/selected....

````
inpArr[i].value = i;
inp.disabled = true;
inpArr[i].checked = true;
optArr[2].selected = true;
````

4. style属性: 别人都是字符串,这个货是object;

### ele.set/get/removeAttribute(); 设置获取删除属性.

### 自定义属性
````
for(var i=0;i<liArr.length;i++> {
  liArr[i].index = i; // 自定义属性保存索引值 使用this.index
})
````
### style 属性

  style属性的六个特点:

    1.样式少的时候使用
    2.style是对象
    3.值是字符串,没有设置是""
    4.命名规则,驼峰命名,和css不一样
    5.设置了类样式不能够获取(只和行内式交互,和内嵌和外链无关)
    6.ele.style.cssText="字符串形式的样式"


         
                
