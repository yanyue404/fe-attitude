var render = function(tpl, data) {
  return tpl.replace(/\{\{(.+?)\}\}/g, function(m, m1) {
    return data[m1];
  });
};

var text = render("我是{{name}}，年龄{{age}}，性别{{sex}}", {
  name: "xiaoyueyue",
  age: 18
});

console.log(text);
