var filledArray = require('./filled-array');

var a = filledArray('x',3);


console.log(a);

var b =filledArray(0, 3);
console.log(b);

//=> [0, 0, 0]

var c =filledArray(i => {
	return (++i % 3 ? '' : 'Fizz') + (i % 5 ? '' : 'Buzz') || i;
}, 15);

console.log(c);

var  d = filledArray(i=>{return i+1});
console.log(d);

//=>1,2,3,4,5

