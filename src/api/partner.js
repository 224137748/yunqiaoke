import axios from "./config";

// 获取所有服务列表数据
export function getAllServiceList(data) {
  return axios.post("/api/content/service/index", data).then(res => {
    return Promise.resolve(res.data);
  });
}

// 获取服务详情
export function getServiceInfo(data) {
  return axios.post("/api/content/service/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}

// 鼓掌
export function applause(data) {
  return axios.post("/api/content/like/store", data).then(res => {
    return Promise.resolve(res.data);
  });
}

// 赞推
export function praise(data) {
  return axios.post("/api/content/gem/store", data).then(res => {
    return Promise.resolve(res.data);
  });
}
