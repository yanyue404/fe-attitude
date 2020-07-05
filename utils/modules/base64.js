export const Base64 = {
  //加密
  encode(str) {
    return escape(btoa(str));
  },
  //解密
  decode(str) {
    return atob(unescape(str));
  },
};
