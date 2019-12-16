const baseUrl = '';
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  throw new Error(`Request rejected with status ${response.status}`);
};
const http = (url = '', options = {}) => {
  if (options.method != 'GET' && !options.body.noToken) {
    options.body.access_token = localStorage.getItem('token');
  } else {
    options.method != 'GET' && delete options.body.noToken;
  }
  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(checkStatus)
      .then(res => resolve(res.json()))
      .catch(err => reject(err));
  });
};
const transformRequest = function(obj) {
  let _rs = [];
  for (let p in obj) {
    if (obj[p] != null && obj[p] != '') {
      _rs.push(p + '=' + obj[p]);
    }
  }
  return _rs.join('&');
};
const _get = url => {
  return http(url, { method: 'GET' });
};

const _post = (url, params) => {
  return http(url, {
    method: 'POST',
    body: transformRequest(params),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
};
