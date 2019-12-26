# README

## 纯函数

- 函数的返回结果只依赖于它的参数
- 函数执行过程没有副作用

## 在数组中插入和删除数据

通常，一个 Javascript 数组中内容使用变化的函数来修改，例如，push , unshift, shift 。因为我们不想在 reducer 中直接修改状态，这些通常应该被避免。正因如此，你可能会看到 “插入” 和 “删除” 的行为如下所示：

```js
function insertItem(array, action) {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index),
  ];
}

function removeItem(array, action) {
  return [...array.slice(0, action.index), ...array.slice(action.index + 1)];
}
```

但是，请记住，关键是原始内存中的引用没有被修改。只要首先我们做了复制，我们就可以安全的变化这个复制。 请注意，这个对于数组和对象都是正确的，但嵌套的数据仍然必须使用相同的规则更新。

这意味着我们也可以编写插入和删除函数如下所示：

```js
function insertItem(array, action) {
  let newArray = array.slice();
  newArray.splice(action.index, 0, action.item);
  return newArray;
}

function removeItem(array, action) {
  let newArray = array.slice();
  newArray.splice(action.index, 1);
  return newArray;
}
```

删除函数也可以是这样：

```js
function removeItem(array, action) {
  return array.filter((item, index) => index !== action.index);
}
```

## 在一个数组中更新一个项目

更新数组的一项可以使用 Array.map, 返回我们想要更新那项的一个新值，和其他项原先的值：

```js
function updateObjectInArray(array, action) {
  return array.map((item, index) => {
    if (index !== action.index) {
      // 这不是我们关心的项-保持原来的值
      return item;
    }

    // 否则, 这是我们关心的-返回一个更新的值
    return {
      ...item,
      ...action.item,
    };
  });
}
```

## 不可变更新工具库

- https://github.com/markerikson/redux-ecosystem-links/blob/master/immutable-data.md#immutable-update-utilities
- https://github.com/peterlxb/Frontend-react/issues/28

#### 参考链接

- [动手实现 Redux（四）：共享结构的对象提高性能](http://huziketang.mangojuice.top/books/react/lesson33)
- http://huziketang.mangojuice.top/books/react/lesson32
- [不可变更新模式](https://www.redux.org.cn/docs/recipes/reducers/ImmutableUpdatePatterns.html)
