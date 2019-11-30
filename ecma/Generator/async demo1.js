var fetch = require('node-fetch');

function* gen() {
  var result;
  result = yield fetch('a');
  console.log(result);
  result = yield fetch('b');
  console.log(result);
  result = yield fetch('c');
  console.log(result);
}

var g = gen();
var result = g.next();

result.value
  .then(function(data) {
    return data.json();
  })
  .then(function(data) {
    g.next(data);
  });
