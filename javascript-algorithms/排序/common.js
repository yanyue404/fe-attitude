function checkArray(array) {
  if (!array) return;
}
function swap(array, left, right) {
  let rightValue = array[right];
  array[right] = array[left];
  array[left] = rightValue;
}
