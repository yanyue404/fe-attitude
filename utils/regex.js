/**
 * 按类型校验字符串
 *
 * @param {*} str
 * @param {*} type
 * @returns
 */
export function checkType(str, type) {
  switch (type) {
    case 'empty':
      return (
        str == null ||
        str == '' ||
        str == undefined ||
        typeof str == typeof undefined
      );
    case 'email':
      return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
    case 'phone':
      // 碰到 16* 开头的手机号 update
      return /^1[3|4|5|6|7|8][0-9]{9}$/.test(str);
    case 'tel':
      return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
    case 'number':
      return /^[0-9]$/.test(str);
    //  校验邮政编码
    case 'isZipCode':
      return /^(\d){6}$/.test(str);
    // 验证码校验
    case 'Vcode':
      return !(isNaN(str) || str.length != 6);
    case 'isURL':
      return /^(https|http):\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/.test(
        str,
      );
    case 'english':
      return /^[a-zA-Z]+$/.test(str);
    case 'allChinese':
      return /^[\u4E00-\u9FA5]+$/.test(str);
    case 'hasChinese':
      return /^[\u4E00-\u9FA5]/.test(str);
    case 'lower':
      return /^[a-z]+$/.test(str);
    case 'upper':
      return /^[A-Z]+$/.test(str);
    case 'IDCard':
      // (15位、18位数字)，最后一位是校验位，可能为数字或字符X
      return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
    default:
      return true;
  }
}

// 字符转实体
export function escape2Html(str) {
  if (!str) {
    return '';
  }

  var arrEntities = {
    lt: '<',
    gt: '>',
    nbsp: ' ',
    '↵': ' ',
    amp: '&',
    quot: '"',
  };

  return str.replace(/&(lt|gt|nbsp|amp|quot);/gi, function(all, t) {
    return arrEntities[t];
  });
}
/**
 * 获取富文本中的中文信息
 * @param {*} html
 * @returns
 */
export function getChineseTextFormHtml(html) {
  let temp = escape2Html(html);
  var reg = /[\u4e00-\u9fa5|\‰]+/g;
  let content;
  if (reg.test(temp)) {
    content = temp.match(reg).join('，');
  } else {
    content = '点击查看详情';
  }
  return content;
}

export default {
  checkType,
  escape2Html,
  getChineseTextFormHtml,
};

// 参考
// - https://github.com/chenhuiYj/ec-do/tree/master/src
// - https://github.com/any86/any-rule
// - https://github.com/dunizb/JS-Regular-expression-awesome
