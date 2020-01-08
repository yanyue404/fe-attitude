String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};
// 替换全部
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

//判断一个字符串是否被包含在另一字符串
String.prototype.iscontains = function(str, value) {
  return str.indexOf(value) > -1 ? true : false;
};

//将字符串拆成字符，并存到数组中
String.prototype.strToChars = function() {
  var chars = [];
  for (var i = 0; i < this.length; i++) {
    chars[i] = [this.substr(i, 1), this.isCHS(i)];
  }
  String.prototype.charsArray = chars;
  return chars;
};

//判断某个字符是否是汉字
String.prototype.isCHS = function(i) {
  if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) return true;
  else return false;
};

/**
 * 按数量分割字符串
 *
 * @param {*} word
 * @param {*} num 按多少个字符分割
 * @returns array
 */
function splitWords(word, num) {
  let slices = [];
  const chars = word.split('');
  while (chars.length > 0) {
    slices = slices.concat(chars.splice(0, num).join(''));
  }
  return slices;
}

// 首字母大写
function upperCaseFirstLetter(string) {
  if (typeof string !== 'string') return string;
  string = string.replace(/^./, match => match.toUpperCase());
  return string;
}
