// 登录模块 Ajax api
import { Toast, Indicator } from "mint-ui";
import bridge from "../bridge";
const axios = require("axios");

// 这里可以对axios做全局配置
// 如果为 生产环境则配置host， 否则为空
const baseURL =
  process.env.NODE_ENV !== "production" ? "" : "http://yunqiaoke.sinmore.vip";
const instance = axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Credentials": false,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
  }
});
// Add a response interceptor
instance.interceptors.response.use(
  function(response) {
    if (response.data.error_code === 10001) {
      Indicator.close();
      Toast({
        message: "用户信息失效，请重新登录",
        duration: 1500
      });
      setTimeout(() => {
        bridge.call("setToken", { token: "" });
      }, 1800);
    } else {
      return response;
    }
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
export default instance;
