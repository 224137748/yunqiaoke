// 内容管理 API 根据不同类型 最终返回一个只有 4个接口的 对象，
import axios from "./config";

// 课程
// 课程列表
const getCourseList = function(params) {
  return axios.post("/api/user/content/course/index", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 课程上架下架
const editCourse = function(token, id) {
  let params = { token, course_id: id };
  return axios.post("/api/user/content/course/status", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 删除课程
const deleteCourse = function(token, id) {
  let params = { token, course_id: id };
  return axios.post("/api/user/content/course/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 派单
// 派单列表
const getDispatchList = function(params) {
  return axios.post("/api/user/content/dispatch/index", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 上架 下架操作
const editDispatch = function(token, id) {
  let params = { token, dispatch_id: id };
  return axios.post("/api/user/content/course/status", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 删除
const deleteDispatch = function(token, id) {
  let params = { token, dispatch_id: id };
  return axios.post("/api/user/content/dispatch/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 融资
const getFinancingList = function(params) {
  return axios.post("/api/user/content/financing/index", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 上架 下架操作
const editFinancing = function(token, id) {
  let params = { token, financing_id: id };
  return axios.post("/api/user/content/financing/status", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 删除
const deleteFinancing = function(token, id) {
  let params = { token, financing_id: id };
  return axios.post("/api/user/content/financing/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 投资
const getInvestmentList = function(params) {
  return axios.post("/api/user/content/investment/index", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 上架 下架操作
const editInvestment = function(token, id) {
  let params = { token, investment_id: id };

  return axios.post("/api/user/content/investment/status", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 删除
const deleteInvestment = function(token, id) {
  let params = { token, investment_id: id };

  return axios
    .post("/api/user/content/investment/destroy", params)
    .then(res => {
      return Promise.resolve(res.data);
    });
};

// 服务
const getServiceList = function(params) {
  return axios.post("/api/user/content/service/index", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 上架 下架操作
const editService = function(token, id) {
  let params = { token, service_id: id };
  return axios.post("/api/user/content/service/status", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 删除
const deleteService = function(token, id) {
  let params = { token, service_id: id };
  return axios.post("/api/user/content/service/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 技能
const getSkillList = function(params) {
  return axios.post("/api/user/content/skill/index", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 上架 下架操作
const editSkill = function(token, id) {
  let params = { token, skill_id: id };

  return axios.post("/api/user/content/skill/status", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 删除
const deleteSkill = function(token, id) {
  let params = { token, skill_id: id };
  return axios.post("/api/user/content/skill/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
};

// 转让
const getTransferList = function(params) {
  return axios.post("/api/user/content/transfer/index", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 上架 下架操作
const editTransfer = function(token, id) {
  let params = { token, transfer_id: id };
  return axios.post("/api/user/content/transfer/status", params).then(res => {
    return Promise.resolve(res.data);
  });
};
// 删除
const deleteTransfer = function(token, id) {
  let params = { token, transfer_id: id };
  return axios.post("/api/user/content/transfer/destroy", params).then(res => {
    return Promise.resolve(res.data);
  });
};

const getApi = function(type) {
  switch (parseInt(type)) {
    case 1: // 服务
      return {
        getContentList: getServiceList,
        editContent: editService,
        deletContent: deleteService
      };
    case 2: // 技能
      return {
        getContentList: getSkillList,
        editContent: editSkill,
        deletContent: deleteSkill
      };
    case 3: // 投资
      return {
        getContentList: getInvestmentList,
        editContent: editInvestment,
        deletContent: deleteInvestment
      };
    case 4: // 融资
      return {
        getContentList: getFinancingList,
        editContent: editFinancing,
        deletContent: deleteFinancing
      };
    case 5: // 派单
      return {
        getContentList: getDispatchList,
        editContent: editDispatch,
        deletContent: deleteDispatch
      };
    case 6: // 转让
      return {
        getContentList: getTransferList,
        editContent: editTransfer,
        deletContent: deleteTransfer
      };
    case 7: // 代表作，课程
      return {
        getContentList: getCourseList,
        editContent: editCourse,
        deletContent: deleteCourse
      };
  }
};

export default getApi;
