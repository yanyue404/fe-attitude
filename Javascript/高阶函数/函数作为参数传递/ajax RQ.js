var getUserInfo = function (userId, callback) {
  $.ajax('http://xxx.com/getUserInfo?' + userId, function (data) {
    if (typeof callback === 'function') {
      callback(data);
    }
  });
}
getUserInfo(13157, function (data) {
  alert(data.userName);
});