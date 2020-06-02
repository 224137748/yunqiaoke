// 个人职业信息
const moduleUserAuth = {
  namespaced: true,
  state: {
    // 用户id
    user_id: "",
    // name
    name: "",
    // 认证状态:1技能者,2雇主方,3个人投资者,4企业投资者
    auth_status: "",
    // 1认证中,2通过,3拒绝
    status: "",
    // id_number
    id_number: "",
    // 身份证正面图片
    id_card_front: "",
    //   身份证背面图片
    id_card_back: "",
    //   手持身份证图片
    hold_id_card: "",
    //   机构名称
    company: "",
    //   营业执照图片
    license: "",
    //   职位
    job: "",
    //   目标投资
    planned: "",
    //   string
    current: ""
  },
  getters: {
    getUserInfo(state, getters, rootState, rootGetters) {
      return Object.assign(
        {},
        {
          auth_status: state.auth_status,
          mobile: rootState.mobile
        }
      );
    }
  },
  mutations: {
    setUserAuth(state, userAuthInfo) {
      for (let key in userAuthInfo) {
        if (state.hasOwnProperty(key)) {
          state[key] = userAuthInfo[key];
        } else {
          console.log("key 不在moduleUserAuth - state中： ", key);
        }
      }
    }
  },
  actions: {}
};

export default moduleUserAuth;
