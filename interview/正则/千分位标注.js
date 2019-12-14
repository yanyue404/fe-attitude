function exchange(num) {
  num += ''; //转成字符串
  if (num.length <= 3) {
    return num;
  }

  num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, v => {
    console.log(v);
    return v + ',';
  });
  return num;
}

console.log(exchange(1234567)); //  1,234,567 
