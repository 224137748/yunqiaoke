// 引入设置呢 baseUrl 的 axios 实例
import instance from "./config";
// 身份识别，单独创建一个axios实例
const axios = require("axios");

// 如果为 生产环境则配置host， 否则为空
const identity = axios.create({
  headers: {
    Authorization: "APPCODE 6967defab5714586b505f40766ad0fb5"
  }
});

// 身份证图文识别接口
export const checkIdCard = function(img) {
  if (!img) return;
  return identity({
    method: "post",
    url: "http://idcard.sinosecu.com.cn/api/recogliu.do",
    data: "img=" + img
  }).then(res => {
    return Promise.resolve(res.data);
  });
};

// 身份证认证接口
export const checkIdCard2 = function(cardno, name) {
  return identity({
    method: "get",
    url: `http://idcard.market.alicloudapi.com/lianzhuo/idcard?cardno=${cardno}&name=${name}`
  }).then(res => {
    return Promise.resolve(res.data);
  });
};

export const postIdentityInfo = function(params) {
  return instance.post("/api/user/auth/update", params).then(res => {
    return Promise.resolve(res.data);
  });
};
