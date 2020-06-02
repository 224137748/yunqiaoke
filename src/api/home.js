import axios from "./config";

// 设置新目标
export function getUpdate(token, planned, days) {
  let params = { token, planned, planning_time: days };
  return axios.post("/api/homepage/update", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 收入记录
export function getStore(params) {
  return axios.post("/api/income/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 日历百分比
export function getPercent(params) {
  return axios.post("/api/income/percent", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 历史收入明细
export function getHistory(params) {
  return axios.post("/api/income/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 经验宝石收支明细
export function getEffect(params) {
  return axios.post("/api/user/content/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 邀请注册数量
export function getInviteTimes(params) {
  return axios.post("/api/user/invite/register/times", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 邀请注册用户列表
export function getInviteRegister(params) {
  return axios.post("/api/user/invite/register/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 邀请打榜数量的接口
export function getHitTimes(params) {
  return axios.post("/api/user/invite/hit/times", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 邀请打榜用户列表
export function getHitRegister(params) {
  return axios.post("/api/user/invite/register/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 邀请下单数量的接口
export function getOrderTimes(params) {
  return axios.post("/api/user/invite/order/times", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 邀请下单用户列表
export function getOrderRegister(params) {
  return axios.post("/api/user/invite/order/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 互助金收支明细
export function getCourseBattery(params) {
  return axios.post("/api/content/course/battery/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 经验宝石收支明细
export function getUserGem(params) {
  return axios.post("/api/content/gem/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 预约列表
export function getOrderIndex(params) {
  return axios.post("/api/order/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 预约详情
export function getOrderShow(params) {
  return axios.post("/api/order/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 我的电量
export function getCourseBatteryIndex(params) {
  return axios.post("/api/content/course/battery/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 我的掌声
export function getlikeIndex(params) {
  return axios.post("/api/content/like/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 获取富文本内容
export function getPageData(params) {
  return axios.post("/common/single/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 我的等级
export function getUserLevel(params) {
  return axios.post("/api/user/level", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 话题列表
export function getTopicIndex(params) {
  return axios.post("/api/topic/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 我的话题列表
export function getTopicmyIndex(params) {
  return axios.post("/api/topic/myIndex", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 用户信息查询
export function getUserShow(params) {
  return axios.post("/api/user/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 推荐用户列表
export function getUserSiteIndex(params) {
  return axios.post("/api/user/site/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 浏览数据
export function getHomePage(params) {
  return axios.post("/api/homepage/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 互动列表
export function getMessageIndex(params) {
  return axios.post("/api/message/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 收藏列表
export function getUserCollectIndex(params) {
  return axios.post("/api/user/content/collect/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}
