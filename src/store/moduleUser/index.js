import moduleUserAuth from "./moduleUserAuth";
// import { updateAvatar, updateNickname, updateSex, updateMobile, updateDesc, updateWechat } from '../../api/user';
// 个人基本信息
const moduleUser = {
  namespaced: true,
  modules: {
    userAuth: moduleUserAuth
  },
  state: {
    // user_id
    user_id: "",
    // 头像
    avatar: "",
    // 昵称
    nickname: "",
    // 性别:0未知,1男,2女
    sex: "",
    // 身高
    height: "",
    // 生日
    birthday: "",
    // 体重
    weight: "",
    // 描述
    desc: "",
    // 省
    province: "",
    // 市
    city: "",
    // 国家
    country: "",

    // 服务类型:1找企业,2众筹,3找人派单,4学习财商知识,5技能赚钱,6找项目投资
    type: "",

    // 企业服务:1找同城代办服务,2找供应商;众筹:1企业,2个人;技能赚钱:1企业,2个人;找项目投资:1企业,2个人;
    service_type: "",

    // 企业服务:1一周,2一个月,3长期;找人派单:1一周,2一个月,3长期;学习财商知识:1碎片时间,2一小时内,3二个小时;
    service_time: "",

    // 企业服务:计划月收入;众筹:目标金额;找人派单:目标业绩;技能赚钱:目标业绩;找项目投资:目标投资
    planned: "",

    // 企业服务:目前月收入;众筹:当前金额;找人派单:已完成业绩;技能赚钱:已完成业绩;找项目投资:已完成投资
    current: "",

    // 企业服务:计划收益时长;众筹:多久完成;找人派单:1三十人一下,2三十人到一百人,3一百人以上;技能赚钱(企业):1三十人一下,2三十人到一百人,3一百人以上;技能赚钱(个人):多久完成
    planning_time: "",

    // 技能赚钱:技能分类;学习财商知识:代表作名称;
    category: "",

    // 微信账号
    wechat: "",
    attention: "",
    // 粉丝数量
    fans: "",
    // 关注数量
    collection: "",
    works: "",
    skill: "",
    demand: "",
    service: "",
    //   绝技名称列表
    userStunt: [],
    // 关注用户列表数据
    userCollection: [],
    // 粉丝数据列表
    userFan: [],
    // 用户图片数据列表
    userPic: [],
    // 推荐位数据
    userSite: []
  },
  getters: {
    getBaseInfo(state, getters, rootState, rootGetters) {
      return Object.assign(
        {},
        {
          user_id: state.user_id,
          avatar: state.avatar,
          sex: state.sex,
          desc: state.desc,
          userStunt: state.userStunt.slice(0, 2),
          wechat: state.wechat,
          mobile: rootState.mobile,
          userPic: state.userPic.slice(0, 4),
          nickname: state.nickname
        }
      );
    }
  },
  mutations: {
    setUser(state, userInfo) {
      for (let key in userInfo) {
        state[key] = userInfo[key];
      }
    },
    // 设置绝技列表
    setUserStunt(state, userStunt) {
      state.userStunt = userStunt;
    },
    setUserCollection(state, userCollection) {
      state.userCollection = userCollection;
    },
    setUserFan(state, userFan) {
      state.userFan = userFan;
    },
    setUserPic(state, userPic) {
      state.userPic = userPic;
    },
    setUserSite(state, userSite) {
      state.userSite = userSite;
    },
    // 设置昵称
    setNickName(state, nickName) {
      state.nickname = nickName;
    },
    // 更新头像
    setAvatar(state, avatar) {
      state.avatar = avatar;
    },
    // 更新描述
    setDesc(state, desc) {
      state.desc = desc;
    },
    // 更新性别
    setSex(state, sex) {
      state.sex = sex;
    },
    // 更新描述
    setWechat(state, wechat) {
      state.wechat = wechat;
    },
    // 添加照片墙
    addPic(state, pic) {
      let arr = state.userPic.slice();
      arr.push(pic);
      state.userPic = arr;
    },
    updatePic(state, pic, index) {
      console.log(pic, index);
      // let arr = state.userPic.slice();
      // arr.splice(index, 1, pic);
      // state.userPic = arr;
    }
  },
  actions: {}
};

export default moduleUser;
