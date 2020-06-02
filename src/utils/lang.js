// 检验手机格式
const checkPhone = function(phone) {
  let regPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/;
  return regPhone.test(phone);
};

// 校验密码格式
const checkPassword = function(password) {
  //  6 - 16位数字，大小写英文和基础英文符号
  let regPsw = /[a-z_A-Z0-9-\\.!@#\\$%\\\\^&\\*\\)\\(\\+=\\{\\}\\[\]\\/",'<>~\\·`\\?:;|]{6,16}$/g;
  return regPsw.test(password);
};

// 检验手机系统
const checkDevice = function(type) {
  var u = window.navigator.userAgent;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; // g
  var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  if (isAndroid) {
    return "android";
  }
  if (isIOS) {
    return "ios";
  }
};
const uais = function(name) {
  const ua = navigator.userAgent.toLowerCase();
  let rs = false;
  switch (name) {
    case "weixin":
      rs = ua.match(/(micromessenger);?/i);
      break;
    case "ios":
      rs = ua.match(/(iphone|ipod|ipad);?/i);
      break;
    case "browser":
      rs = ua.match(/(applewebkit);?/i);
      break;
    default:
      rs = ua.indexOf(name) > -1;
  }
  return !!rs;
};
/**
 * 获取URL参数
 * @param {*} name
 * @param {*} url
 */
const getQueryString = function(name, url) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (url) {
    var s = url.split("?");
    r = s[1] ? s[1].match(reg) : s[0].match(reg);
  }
  // if (r != null) return unescape(r[2]); return null;
  if (r != null) return r[2];
  return null;
};
module.exports = {
  checkPhone,
  checkPassword,
  checkDevice,
  uais,
  getQueryString
};
