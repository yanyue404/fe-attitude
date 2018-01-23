

## art-template模板引擎的用法
  > 模板引擎作用是根据指定的模板和数据，动态的生成相应的html字符串  


  > 这里的模板可以写在script标签中, 数据是从js中获取的  
  list  str  for(){str +='<div>'+str+'</div>'}

### 使用方式如下:  
  1. 通过npm下载: `npm install art-template`
  - [官方文档](https://aui.github.io/art-template/zh-cn/docs/)
  2. 在页面引入 art-template, *注意，要引入lib/template-web.js*
  3. 在html添加一个script标签  

  这个script标签中的内容就称之为模板  

  ```html
  <!--记得加上这个type属性，和id-->
  <!--这个script标签中可以书写任意的html代码-->
  <!--修改type属性的目的，就是不让浏览器把我们写的标签当js执行-->
  <script id="tmpl" type="text/html">
    <div>{{name}}</div>
    <p>{{age}}</p>
  </script>
  ```

   {{@content}} 转义
  4. 在js中添加如下代码:  

  ```js
  // template是模板引擎提供的全局变量
  // template(3中script标签的id, 要在3中script中使用的数据)
  // 【注意】: 在模板中能够使用的name和age这两个数据，就是data对象的属性,所以这里的data必需要是一个对象
  var data = {name: '小明', age: 18}
  var result = template('tmpl', data)
  // 把result值插入到页面想要插入的位置就可以了,这里的template方法是可以多次调用的，只要data的数据不一样，或者指定的模板不一样，得到的结果也一定是没一样的
  ```
  >以上代码执行后, 得到的`result`便是已经拥有数据的html字符串了, `result`的内容如下:  
  ```html
    <div>小明</div>
    <p>18</p>
  ```

### if逻辑
  > 在模板中写书写{{if 条件}}内容{{/if}}  //  if(条件){ }
  > 或者书写 {{if 条件}} 内容1 {{else if 条件}} 内容2 {{/if}}  
  >或者书写 {{if 条件}} 内容1 {{else}} 内容2 {{/if}} 这种形式来写一些简单的逻辑  

  例如我们有如下需求:  
  有一个数据sex, 值0为表示男，值为1表示女,我们需要根据值0/1 在html显示男/女。  
  用模板引擎来实现此功能，如下:  

  1. 通过npm下载: `npm install art-template`
  2. 在页面引入 art-template, *注意，要引入lib/template-web.js*
  3. 在html添加一个script标签
  ```html
  <script id="tmpl" type="text/html">
  <!--只要是大括号中使用的数据，一定要是data中的属性,data需要是一个对象-->
  {{if sex==0}}
  <span>男</span>
  {{/if}}
  {{if sex==1}}
  <span>女</span>
  {{/if}}
  </script>
  <!--// var str = ''
  if( sex == 0){
    str += '<span>男</span'
  }
  if(sex ==1){
    str += '<span>女</span>
  }-->
  ```
  4. 在js中添加如下代码  
  ```js
  var data = {sex: 0}
  var result = template('tmpl', data)
  ```
  > 最终得到的这个result的值如下: 

  ```html
  <span>男</span>
  ```
  > 另外3中的script标签中也可以使用`{{if 条件}} 内容 {{else if 条件}} 内容 {{/if}}` 这样的方式来书写

### 循环遍历
  > 假如我们有一个数组类型的数据要在模板中使用，该怎么做呢?  
  > 比如说有个数组list，包含了所有用户的信息,要在模板使用这个list 
  > 做法如下:  

  1. 通过npm下载: `npm install art-template`
  2. 在页面引入 art-template, *注意，要引入lib/template-web.js*
  3. 在html添加一个script标签
  ```html
  <script id="tmpl" type="text/html">
  <div>
    <!--这里的 each users 表示遍历 users-->
    <!-- $index表示要遍历的数组的索引,无论遍历哪个数组，都使用$index表示索引-->
    <!-- $value 表示遍历的数组中的元素-->
    {{each users}}  //for(var i, ) arr[i]
      <span>{{$index}}<span><p>{{$value.name}}</p>
    {{/each}}
  </div>
  </script>
  ```
  4. 在js中添加如下代码  
  ```js
  var list = [{name: '小明'}, {name: '小红'}]
  // 注意，这里的list一定要做为data的一个属性值，才能名传递给template方法  
  // 不能直接把list传递给template
  // template('tmpl', list) // 这是错误的
  var data = {users: list}
  var result = template('tmpl', data)
  ```
  > 最终得到的这个result的值如下: 

  ```html
  <div>
      <span>0<span><p>小明</p>
      <span>1<span><p>小红</p>
  </div>
  ```


### 使用过滤器
  > 首先什么是过滤器，可能只是一个很陌生的名词罢了  
  > 过滤器的作用是: 改变我们要展示的数据的形式。  
  > 例如: 有一个生日的数据 `var birthday = '1998-2-27'`,但是我们并不想直接在模板中使用birthday, 我希望最终得到的是生日对应的年龄。这该怎么做呢?  
  1. 首先，得先定义一个方法,用于根据生日计算出年龄  
  ```js
  // 定义一个getAge方法
  // 【注意】,我们是所getAge方法放在了template.defaults.imports对象的属性上，必需做这么做,这是该模板引擎中推荐的写法  
  // 方法的参数，就是生日的字符串形式  getAge()
  template.defaults.imports.getAge = function (birth) {
    var birthYear = new Date(birth).getFullYear()
    var nowYear = new Date().getFullYear()
    return nowYear - birthYear
  }
  ```
  2. 然后在模板中可以直接使用这个getAge方法, 但是要注意写法
  ```html
  <script id="tmpl" type="text/html">
  // 下面的写法，其实就是模板引擎中调用方法的写法
  // 相当于调用getAge这个方法，并把birthday作为参数传递给getAge， getAge(birthday)
  <div>{{birthday|getAge}}</div>
  </script>
  ```
  ```html
   <div>19</div>
  ```
  3.金额例子
  
```
<div id="" class="money">
            {{if $value.OPE_TYPE == '0'}}
            <span style="color:#78C44F">
            +{{$value.OPE_MONEY|Balance}}
            </span>

            {{else}}
            <span id="">
            - {{$value.OPE_MONEY|Balance}}
            </span>

            {{/if}}

            </div>
```
- 处理函数

```
template.defaults.imports.Balance = function(number) {
                return number.toFixed(2);
            }
```



