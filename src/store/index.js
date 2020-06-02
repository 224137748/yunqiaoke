import Vue from "vue";
import Vuex from "vuex";
// 引入全局vuex
import state from "./state";
import mutations from "./mutations";
import * as actions from "./actions";
// 引入登录 module 子模块
import moduleLogin from "./moduleLogin";

// 引入完善信息 module 子模块
import moduleInformation from "./moduleInformation";

// 个人中心 module 子模块
import moduleUser from "./moduleUser";

// 身份认证
import moduleIdentity from "./moduleIdentity";
// 伙伴
import moduleBuddy from "./moduleBuddy";
// 发布
import modulePublish from "./modulePublish";
import creatLogger from "vuex/dist/logger";
Vue.use(Vuex);
// 开启debug
const debug = process.env.NODE_ENV !== "production";
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    login: moduleLogin,
    information: moduleInformation,
    user: moduleUser,
    identity: moduleIdentity,
    publish: modulePublish,
    buddy: moduleBuddy
  },
  strict: debug,
  plugins: debug ? [creatLogger()] : []
});
