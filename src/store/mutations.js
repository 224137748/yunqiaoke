import * as types from "./mutation-types";

const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token;
  },
  [types.SET_PUSHID](state, pushid) {
    state.pushid = pushid;
  },
  [types.SET_MOBILE](state, mobile) {
    state.mobile = mobile;
  },
  [types.SET_OPENID](state, openid) {
    state.openid = openid;
  },
  [types.SET_BASE_INFO](state, userinfo) {
    for (let key in userinfo) {
      if (state.hasOwnProperty(key)) {
        state[key] = userinfo[key];
      } else {
        console.log("key 不在main - state中： ", key);
      }
    }
  }
};

export default mutations;
