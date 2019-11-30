Page({
  // 获取用户可以领取的优惠券
  getMyCoupons(callback) {
    return new Promise((res, rej) => {
      fetch._post(API.get_coupons, {}).then(res => {
        let error, result;
        if (res.response_data.error_code) {
          error = res.response_data;
        } else {
          result = res.response_data.lists;
        }
        typeof callback === 'function' ? callback(error, result) : '';
      });
    });
  },
});
