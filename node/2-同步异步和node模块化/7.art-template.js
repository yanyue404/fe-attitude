var template = require('art-template');
//渲染函数
var render = template.compile('<h1>123{{username}}</h1>')

var htmlStr = render({username:'李四'});
console.log(htmlStr);