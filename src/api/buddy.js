import axios from "./config";

// 派单列表的接口
export function getDispatchList(params) {
  return axios.post("/api/content/dispatch/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 融资列表的接口
export function getFinancingList(params) {
  return axios.post("/api/content/financing/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 投资列表的接口
export function getInvestmentList(params) {
  return axios.post("/api/content/investment/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 转让列表的接口
export function getTransferList(params) {
  return axios.post("/api/content/transfer/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 服务列表的接口
export function getServiceList(params) {
  return axios.post("/api/content/service/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 技能列表的接口
export function getSkillList(params) {
  return axios.post("/api/content/skill/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 公开课内容列表的接口
export function getCourseList(params) {
  return axios.post("/api/content/course/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 派单详情的接口
export function getDispatchDetail(params) {
  return axios.post("/api/content/dispatch/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 融资详情的接口
export function getFinancingDetail(params) {
  return axios.post("/api/content/financing/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 投资详情的接口
export function getFInvestmentDetail(params) {
  return axios.post("/api/content/investment/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 转让详情的接口
export function getFTransferDetail(params) {
  return axios.post("/api/content/transfer/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 服务详情的接口
export function getServiceDetail(params) {
  return axios.post("/api/content/service/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 技能详情的接口
export function getSkillDetail(params) {
  return axios.post("/api/content/skill/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 公开课内容详情的接口
export function getCourseDetail(params) {
  return axios.post("/api/content/course/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 推荐用户列表的接口
export function getSiteList(params) {
  return axios.post("/api/user/site/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 话题列表的接口
export function getTopicList(params) {
  return axios.post("/api/topic/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// banner列表的接口
export function getBannerList(params) {
  return axios.post("/api/banner/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 关注用户的接口
export function getCollectStore(params) {
  return axios.post("/api/user/collect/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 取消关注用户的接口
export function getCollectDestroy(params) {
  return axios.post("/api/user/collect/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加赞推的接口
export function getGemStore(params) {
  return axios.post("/api/content/gem/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加鼓掌的接口
export function getLikeStore(params) {
  return axios.post("/api/content/like/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 服务类目列表的接口
export function getCategory(params) {
  return axios.post("/common/service-category/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 服务类目列表的接口
export function getAlivod(params) {
  return axios.post("/common/alivod/getplayinfo", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 地区热门地区列表的接口
export function getHotCity(params) {
  return axios.post("/api/city/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 系统常量-列表的接口
export function getSysconfig(params) {
  return axios.post("/common/sysconfig/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 购买公开课的接口
export function getCourseBuy(params) {
  return axios.post("/api/content/course/buy", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加评论的接口
export function getCourseStore(params) {
  return axios.post("/api/content/course/comment/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 评论列表的接口
export function getForumList(params) {
  return axios.post("/api/content/course/comment/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 预约下单的接口
export function getOrderStore(params) {
  return axios.post("/api/order/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 评论点赞的接口
export function getCourseLike(params) {
  return axios.post("/api/content/course/comment/like/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加投诉
export function getReport(params) {
  return axios.post("/api/content/report", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 打榜二维码
export function getInviteHit(params) {
  return axios.post("/api/user/invite/hit/qrcode", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 邀请下单二维码
export function getInviteOrder(params) {
  return axios.post("/api/user/invite/order/qrcode", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 内容排名
export function getContentRanking(params) {
  return axios.post("/common/content-ranking", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 他的作品列表
export function getHisWork(params) {
  return axios.post("/api/content/course/hisIndex", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加收藏
export function getUserStore(params) {
  return axios.post("/api/user/content/collect/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 删除收藏
export function getUserDestroy(params) {
  return axios.post("/api/user/content/collect/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 为Ta充电
export function getCourseBattery(params) {
  return axios.post("/api/content/course/battery/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}
