import axios from "./config";

// 获取手机验证码
/*
@ type -- 类型,1注册,2改密,3换绑
*/
export function getCaptcha(mobile, type) {
  return axios.post("/common/code/store", { mobile, type }).then(res => {
    return Promise.resolve(res.data);
  });
}
