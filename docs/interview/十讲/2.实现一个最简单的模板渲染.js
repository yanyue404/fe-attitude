var render = function(tpl, data) {
  // m 参数为 匹配的子串
  // p1 参数为 (.+?)的匹配结果
  return tpl.replace(/\{\{(.+?)\}\}/g, function(match, p1) {
    return data[p1];
  });
};

var text = render('我是{{name}}，年龄{{age}}，性别{{sex}}', {
  name: 'xiaoyueyue',
  age: 18,
});

// const render2 = (str, ctx) => str.replace(/\{\{(.*?)\}\}/g, (_, $1) => ctx[$1]);

var tpl = "Hei, my name is <%name%>, and I'm <%age%> years old.";
var data = {
  name: 'Rainbow',
  age: '20',
};

let content = tpl.replace(/<%(.+?)%>/g, function(m, n) {
  return data[n];
});
console.log(content);

console.log(text);
