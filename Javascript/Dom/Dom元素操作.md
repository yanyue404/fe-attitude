### 创建元素
````
  var elemObj = document.createElement( '元素名' )
````    
### 将元素加入到页面中
  1, 追加

   elem.appendChild( ele ); //ele是新的元素
```
var p = document.createElement("p");
document.body.appendChild(p);
```
2, 插入到某一个元素的前面

 elem.parentNode.insertBefore( newElem, oldElem )
       
3, 要将一个元素( newElem )插入到 某一个元素( oldElem )的后面

- 如果 oldElem 恰好是 最后一个元素, 我们直接 appendChild

````
  if ( oldElem.nextSibling == null ) {
                // 是最后一个
            }
````

- 如果 oldElem 不是最后一个, 找到其后一个元素, 调用 insertBefore 

````
  function insertAfter( newElem, oldElem ) {
        var parent = oldElem.parentNode,
            next = oldElem.nextSibling;
          if ( next ) {
              // 不为空, 即不是最后一个
             parent.insertBefore( newElem, next );
           } else {
               // 为空, 即是最后一个
              parent.appendChild( newElem );
 ````

### 删除
 -> DOM 的操作方案

           父元素.removeChild( 子元素 )
           元素节点.removeAttributeNode( 属性节点 )
           
 -> 快捷的处理方法

          元素节点.removeAttribute( '属性名' )

 -> HTML-DOM( 一般不会用这个方法 )

              元素节点.属性 = null
              元素节点.checked = false 等
### 修改
 修改的是属性, 修改的是样式

-> HTML-DOM

             元素.属性名 = 值
             元素.style.样式名 = 样式值
 -> 处理样式的时候