function myJsonp(url, data, callback) {
  var fnName =
    'myJsonp_' +
    Math.random()
      .toString()
      .replace('.', '');
  window[fnName] = callback;
  var querystring = '';
  for (var attr in data) {
    querystring += attr + '=' + data[attr] + '&';
  }
  var script = document.createElement('script');
  script.src = url + '?' + querystring + 'callback=' + fnName;
  script.onload = function() {
    document.body.removeChild(script);
  };
  document.body.appendChild(script);
}

/**
 * 获取地址栏request中的参数
 *
 * @param {*} name
 * @returns
 */
function GetQueryString(name) {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

// form表单序列化 摘自高程
function serialize(form) {
  var parts = [],
    field = null,
    i,
    len,
    j,
    optLen,
    option,
    optValue;

  for (i = 0, len = form.elements.length; i < len; i++) {
    field = form.elements[i];

    switch (field.type) {
      case 'select-one':
      case 'select-multiple':
        if (field.name.length) {
          for (j = 0, optLen = field.options.length; j < optLen; j++) {
            option = field.options[j];
            if (option.selected) {
              optValue = '';
              if (option.hasAttribute) {
                optValue = option.hasAttribute('value')
                  ? option.value
                  : option.text;
              } else {
                optValue = option.attributes['value'].specified
                  ? option.value
                  : option.text;
              }
              parts.push(
                encodeURIComponent(field.name) +
                  '=' +
                  encodeURIComponent(optValue),
              );
            }
          }
        }
        break;

      case undefined: //fieldset
      case 'file': //file input
      case 'submit': //submit button
      case 'reset': //reset button
      case 'button': //custom button
        break;

      case 'radio': //radio button
      case 'checkbox': //checkbox
        if (!field.checked) {
          break;
        }
      /* falls through */

      default:
        //don't include form fields without names
        if (field.name.length) {
          parts.push(
            encodeURIComponent(field.name) +
              '=' +
              encodeURIComponent(field.value),
          );
        }
    }
  }
  return parts.join('&');
}
