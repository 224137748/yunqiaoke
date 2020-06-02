/*
 * @Author: patrick
 * @Date: 2019-12-31 21:30:10
 * @LastEditTime : 2019-12-29 12:54:53
 * @LastEditors  : Please set LastEditors
 * @Description: 发布模块 路由
 * @FilePath: \coded:\yuanqiaoke_h5\src\api\login.js
 */
import axios from "./config";

// 获取服务类型列表 类型,1服务,2技能,3投资,4融资,5派单,6转让,7代表作
export function getServiceList(type) {
  return axios
    .post("/common/service-category/index", {
      type
    })
    .then(res => {
      return Promise.resolve(res.data);
    });
}
// 获取临时上传地址
export function getTempUploadUrl(data) {
  return axios.post("/common/upload/security-visit", data).then(res => {
    return Promise.resolve(res.data);
  });
}

/**
 *
 * @param {*} data form
 * @param {*} isAdd 是否是添加服务 否为 修改服务
 */
export function addService(data, isAdd) {
  if (isAdd) {
    return axios.post("/api/user/content/service/store", data).then(res => {
      return Promise.resolve(res.data);
    });
  } else {
    return axios.post("/api/user/content/service/update", data).then(res => {
      return Promise.resolve(res.data);
    });
  }
}
/**
 *
 * // 添加技能  修改技能
 */
export function addSkill(data, isAdd) {
  if (isAdd) {
    return axios.post("/api/user/content/skill/store", data).then(res => {
      return Promise.resolve(res.data);
    });
  } else {
    return axios.post("/api/user/content/skill/update", data).then(res => {
      return Promise.resolve(res.data);
    });
  }
}
/**
 *
 * // 添加投资 修改投资
 */
export function addInvest(data, isAdd) {
  if (isAdd) {
    return axios.post("/api/user/content/investment/store", data).then(res => {
      return Promise.resolve(res.data);
    });
  } else {
    return axios.post("/api/user/content/investment/update", data).then(res => {
      return Promise.resolve(res.data);
    });
  }
}
/**
 *
 * // 添加融资 修改融资
 */
export function addFinance(data, isAdd) {
  if (isAdd) {
    return axios.post("/api/user/content/financing/store", data).then(res => {
      return Promise.resolve(res.data);
    });
  } else {
    return axios.post("/api/user/content/financing/update", data).then(res => {
      return Promise.resolve(res.data);
    });
  }
}
/**
 *
 * // 添加派单或者供应商 修改
 */
export function addSupporter(data, isAdd) {
  if (isAdd) {
    return axios.post("/api/user/content/dispatch/store", data).then(res => {
      return Promise.resolve(res.data);
    });
  } else {
    return axios.post("/api/user/content/dispatch/update", data).then(res => {
      return Promise.resolve(res.data);
    });
  }
}
/**
 *
 * // 添加转让 或修改转让
 */
export function addTransfer(data, isAdd) {
  if (isAdd) {
    return axios.post("/api/user/content/transfer/store", data).then(res => {
      return Promise.resolve(res.data);
    });
  } else {
    return axios.post("/api/user/content/transfer/update", data).then(res => {
      return Promise.resolve(res.data);
    });
  }
}
/**
 *
 * // 添加公开课或修改公开课
 */
export function addLesson(data, isAdd) {
  if (isAdd) {
    return axios.post("/api/user/content/course/store", data).then(res => {
      return Promise.resolve(res.data);
    });
  } else {
    return axios.post("/api/user/content/course/update", data).then(res => {
      return Promise.resolve(res.data);
    });
  }
}
/**
 *
 * @param {*} data form  获取服务
 */
export function getService(data) {
  return axios.post("/api/user/content/service/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * // 获取技能
 */
export function getSkill(data) {
  return axios.post("/api/user/content/skill/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * // 获取投资
 */
export function getInvest(data) {
  return axios.post("/api/user/content/investment/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * // 获取融资
 */
export function getFinance(data) {
  return axios.post("/api/user/content/financing/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * // 获取派单或者供应商
 */
export function getSupporter(data) {
  return axios.post("/api/user/content/dispatch/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * // 获取转让
 */
export function getTransfer(data) {
  return axios.post("/api/user/content/transfer/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * // 获取公开课
 */
export function getLesson(data) {
  return axios.post("/api/user/content/course/show", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * 查询话题
 */
export function getAllTopic(data) {
  return axios.post("/api/topic/index", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * 添加话题name pic
 */
export function addTopic(data) {
  return axios.post("/api/topic/store", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 *
 * 根据视频id 获取视频播放凭证的接口
 */
export function getVideoUrl(data) {
  return axios.post("/common/alivod/getplayauth", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助计划发布-服务token service_id battery num
 */
export function publishService(data) {
  return axios.post("/api/user/content/service/envelope", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助计划发布-技能token skill_id battery num
 */
export function publishSkill(data) {
  return axios.post("/api/user/content/skill/envelope", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助计划发布-公开课 课程token course_id battery num
 */
export function publishLesson(data) {
  return axios.post("/api/user/content/course/envelope", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助计划发布-投资token investment_id battery num
 */
export function publishInvest(data) {
  return axios.post("/api/user/content/investment/envelope", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助计划发布-融资token financing_id battery num
 */
export function publishFinance(data) {
  return axios.post("/api/user/content/financing/envelope", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助计划发布-派单token dispatch_id battery num
 */
export function publishSupporter(data) {
  return axios.post("/api/user/content/dispatch/envelope", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助计划发布-转让token transfer_id battery num
 */
export function publishTransfer(data) {
  return axios.post("/api/user/content/transfer/envelope", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助互助金充值-生成订单 token  battery
 */
export function generateOrder(data) {
  return axios.post("/api/order/battery/store", data).then(res => {
    return Promise.resolve(res.data);
  });
}
/**
 * 互助互助金充值-支付订单 token  order_battery_id type 1支付宝 2微信
 */
export function payOrder(data) {
  return axios.post("/api/pay/battery", data).then(res => {
    return Promise.resolve(res.data);
  });
}
