import axios from "./config";

// 获取 基本信息
export function getUserInfor(id, token) {
  let params = {};
  if (id && typeof id === "number") {
    params.id = id;
  } else {
    params.token = id;
  }
  if (token) params.token = token;
  return axios.post("/common/user/show", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 修改用户头像
export function updateAvatar(token, avatar) {
  return axios.post("/api/user/avatar", { token, avatar }).then(res => {
    return Promise.resolve(res.data);
  });
}
// 修改昵称
export function updateNickname(token, nickname) {
  return axios.post("/api/user/nickname", { token, nickname }).then(res => {
    return Promise.resolve(res.data);
  });
}

// 修改性别
export function updateSex(token, sex) {
  return axios.post("/api/user/sex", { token, sex }).then(res => {
    return Promise.resolve(res.data);
  });
}

// 修改手机号
export function updateMobile(token, mobile, code) {
  return axios.post("/api/user/mobile", { token, mobile, code }).then(res => {
    return Promise.resolve(res.data);
  });
}

// 修改描述
export function updateDesc(token, desc) {
  return axios.post("/api/user/desc", { token, desc }).then(res => {
    return Promise.resolve(res.data);
  });
}
// 修改微信号
export function updateWechat(token, wechat) {
  return axios.post("/api/user/wechat", { token, wechat }).then(res => {
    return Promise.resolve(res.data);
  });
}

// 照片墙
// 添加照片墙
export function addPic(params) {
  return axios.post("/api/user/pic/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}
// 修改照片墙
export function updatePic(params) {
  return axios.post("/api/user/pic/update", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 修改用户绝技
// 参数 token stunt_id name
export function updateSkill(token, stuntId, name) {
  let params = { token, stunt_id: stuntId, name };
  return axios.post("/api/user/stunt/update", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加绝技
// 参数  token name
export function addSkill(token, name) {
  let params = { token, name };
  return axios.post("/api/user/stunt/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 获取绝技列表的接口
// 参数 token page页码 per_page 每页长度
export function getSkillList(token, page, pageNum) {
  let params = { token, page, per_page: pageNum };
  return axios.post("/api/user/stunt/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 删除绝技
export function deleteSkill(token, stuntId) {
  let params = { token, stunt_id: stuntId };
  return axios.post("/api/user/stunt/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 我的粉丝
export function getFans(token, page, pageNum) {
  let params = { token, page, per_page: pageNum };
  return axios.post("/api/user/fans/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 添加关注
export function collectionAdd(token, userId) {
  let params = { token, user_id: userId };
  return axios.post("/api/user/collect/store", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 取消关注
export function collectDelete(token, userId) {
  let params = { token, user_id: userId };
  return axios.post("/api/user/collect/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 帮助中心列表接口
export function getHelpList(token, type = 5, page, pageNum) {
  let params = { token, type, page, per_page: pageNum };
  return axios.post("/api/help/index", params).then(res => {
    return Promise.resolve(res.data);
  });
}

// 提交留言 反馈帮助
export function feedback(token, type, contact, message) {
  return axios
    .post("/common/feedback/store", { token, type, contact, message })
    .then(res => {
      return Promise.resolve(res.data);
    });
}

// 开启，关闭信息通知
export function toggleMsg(token) {
  return axios.post("/api/user/msg", { token }).then(res => {
    return Promise.resolve(res.data);
  });
}
