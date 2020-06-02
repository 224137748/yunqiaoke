const moduleLogin = {
  namespaced: true,
  state: {
    // 存储注册手机号
    registPhone: "",
    // 存储注册验证码
    registCaptcha: "",
    // 存储注册密码
    registPassword: ""
  },
  mutations: {
    setRegistPhone(state, phone) {
      state.registPhone = phone;
    },
    setRegistCaptcha(state, captcha) {
      state.registCaptcha = captcha;
    },
    setRegistPassword(state, password) {
      state.registPassword = password;
    }
  },
  actions: {},
  getters: {}
};

export default moduleLogin;
