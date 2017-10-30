var range = require('./array-range');

console.log(range());
console.log(range(0))

console.log(range(5));

console.log(range(1,7));

//[]
//[]
//[ 0, 1, 2, 3, 4 ]
//[ 1, 2, 3, 4, 5, 6 ]

array(5)

//vs.

Array.apply(null, new Array(5))