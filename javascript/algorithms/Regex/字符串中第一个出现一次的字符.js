function find(str) {
  for (var i = 0; i < str.length; i++) {
    let char = str[i];
    let reg = new RegExp(char, 'g');
    let l = str.match(reg).length;
    if (l === 1) {
      return char;
    }
  }
  return -1;
}
console.log(find('google')); // l
