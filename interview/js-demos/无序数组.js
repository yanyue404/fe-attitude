// function make(arr) {
//   // let randomArrIndexs = Object.keys(arr);
//   const length = arr.length;
//   for (let index = 0; index < 3; index++) {
//     let randomIndex_m = Math.floor(Math.random() * length);
//     let randomIndex_n = length - 1 - randomIndex_m;

//     console.log(randomIndex_m + ',' + randomIndex_n);

//     if (randomIndex_m != randomIndex_n) {
//       swap(arr, randomIndex_m, randomIndex_n);
//     }
//   }
//   console.log(arr);
// }

// function swap(array, left, right) {
//   let rightValue = array[right];
//   array[right] = array[left];
//   array[left] = rightValue;
// }

function make(array) {
  var _array = array.concat();

  for (var i = _array.length; i--; ) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = _array[i];
    _array[i] = _array[j];
    _array[j] = temp;
  }
  console.log(_array);

  return _array;
}

let array = [1, 2, 3, 4, 5];
make(array);
