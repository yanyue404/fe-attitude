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
