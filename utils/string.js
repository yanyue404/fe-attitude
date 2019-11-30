var util = {
  strlen: function(str) {
    return BROWSER.ie && str.indexOf('\n') != -1
      ? str.replace(/\r?\n/g, '_').length
      : str.length;
  },

  // 字符转实体
  xssFilter: function(str) {
    str = str.replace(/<br\/*>/gi, '');
    str = str.replace(/</gi, '&lt;');
    str = str.replace(/>/gi, '&gt;');

    return str;
  },
  //字符串替换(字符串,要替换的字符,替换成什么)
  replaceAll: function(str, AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, 'g');
    return str.replace(raRegExp, ARepText);
  },

  // 字符串长度截取,多余的用...代替
  cutstr: function(str, len) {
    var temp,
      icount = 0,
      patrn = /[^\x00-\xff]/,
      strre = '';
    for (var i = 0; i < str.length; i++) {
      if (icount < len - 1) {
        temp = str.substr(i, 1);
        if (patrn.exec(temp) == null) {
          icount = icount + 1;
        } else {
          icount = icount + 2;
        }
        strre += temp;
      } else {
        break;
      }
    }
    return strre + '...';
  },
};
String.prototype.trim = function() {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};
// 替换全部
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
String.prototype.replaceAll2 = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

//判断一个字符串是否被包含在另一字符串
String.prototype.iscontains = function(str, value) {
  return str.indexOf(value) > -1 ? true : false;
};

// 判断是否以某个字符串开头
String.prototype.startWith = function(s) {
  return this.indexOf(s) == 0;
};

// 判断是否以某个字符串结束
String.prototype.endWith = function(s) {
  var d = this.length - s.length;
  return d >= 0 && this.lastIndexOf(s) == d;
};

//计算字符串长度
String.prototype.strLen = function() {
  var len = 0;
  for (var i = 0; i < this.length; i++) {
    if (this.charCodeAt(i) > 255 || this.charCodeAt(i) < 0) len += 2;
    else len++;
  }
  return len;
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

//截取字符串（从start字节到end字节）
String.prototype.subCHString = function(start, end) {
  var len = 0;
  var str = '';
  this.strToChars();
  for (var i = 0; i < this.length; i++) {
    if (this.charsArray[i][1]) len += 2;
    else len++;
    if (end < len) return str;
    else if (start < len) str += this.charsArray[i][0];
  }
  return str;
};

//截取字符串（从start字节截取length个字节）
String.prototype.subCHStr = function(start, length) {
  return this.subCHString(start, start + length);
};

// 字符串去空格
console.log('134 3478 8909'.replace(/\s+/g, ''));

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
function escape2Html(str) {
  if (!str) {
    return '';
  }

  var arrEntities = { lt: '<', gt: '>', nbsp: ' ', amp: '&', quot: '"' };

  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}
// 首字母大写
function upperCaseFirstLetter(string) {
  if (typeof string !== 'string') return string;
  string = string.replace(/^./, match => match.toUpperCase());
  return string;
}
