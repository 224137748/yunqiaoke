import axios from "./config";

// 检查手机号
export function checkMobile(mobile) {
  return axios
    .post("/api/mobile/check", {
      mobile
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}

// 获取 协议 条款 富文本内容
export function getPageData(id) {
  return axios.post("/common/single/show", { id }).then(res => {
    return Promise.resolve(res.data);
  });
}

/**
 * @description: 忘记密码/ 重置密码的接口
 * @param {code} 验证码(发送验证码时type为2)
 * @return:
 */
export function restPassword(mobile, password, code) {
  return axios
    .post("/api/mobile/reset-password", { mobile, password, code })
    .then(res => {
      return Promise.resolve(res.data);
    });
}

/**
 * @description: 账户注册 为一个API
 * @param {code} 验证码
 * @param {terminal} 1安卓,2iOS
 * @return: data
 */
export function register(mobile, password, code, terminal) {
  return axios
    .post("/api/mobile/register", { mobile, password, code, terminal })
    .then(res => {
      return Promise.resolve(res.data);
    });
}

/**
 * @description: 账户登录
 * @param {pushid} 极光id
 * @return:
 */
export function login(mobile, password, pushid) {
  return axios
    .post("/api/mobile/login", { mobile, password, pushid })
    .then(res => {
      return Promise.resolve(res.data);
    });
}

/**
 * @description: 判断系统产量，是否展示微信登录按钮
 * @param {type}
 * @return:
 */
export function checkLoginEnv(id, type) {
  return axios.post("/common/sysconfig/index", { id, type }).then(res => {
    return Promise.resolve(res.data);
  });
}

// 微信登录
export function wechatLogin(openid, pushid) {
  return axios.post("/api/wechat/login", { openid, pushid }).then(res => {
    return Promise.resolve(res.data);
  });
}

// 微信注册
export function wechatRegister(mobile, password, code, openid, terminal) {
  return axios
    .post("/api/wechat/register", { mobile, password, code, openid, terminal })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
