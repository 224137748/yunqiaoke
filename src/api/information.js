import axios from "./config";

// 完善信息的接口
/*
@token
@sex  性别:1男,2女
@type 服务类型:1找企业,2众筹,3找人派单,4学习财商知识,5技能赚钱,6找项目投资
@service_type 企业服务:1找同城代办服务,2找供应商;
              众筹:1企业,2个人;
              技能赚钱:1企业,2个人;
              找项目投资:1企业,2个人;
              (服务类型:1找企业,2众筹,5技能赚钱,6找项目投资时必传)
@service_time 企业服务:1一周,2一个月,3长期;
              找人派单:1一周,2一个月,3长期;
              学习财商知识:1碎片时间,2一小时内,3二个小时;
              (服务类型:1找企业,3找人派单,4学习财商知识时必传)
@planned  企业服务:计划月收入;
          众筹:目标金额;
          找人派单:目标业绩;
          技能赚钱:目标业绩;
          找项目投资:目标投资;
          (服务类型:1找企业,2众筹,3找人派单,5技能赚钱,6找项目投资时必传)
@current  企业服务:目前月收入;
          众筹:当前金额;
          找人派单:已完成业绩;
          技能赚钱:已完成业绩;
          找项目投资:已完成投资;
          (服务类型:1找企业,2众筹,3找人派单,5技能赚钱,6找项目投资时必传)
@planning_time 企业服务:计划收益时长;
                众筹:多久完成;
                找人派单:1三十人一下,2三十人到一百人,3一百人以上;
                技能赚钱(企业):1三十人一下,2三十人到一百人,3一百人以上;
                技能赚钱(个人):多久完成;
                (服务类型:1找企业,2众筹,3找人派单,5技能赚钱,6找项目投资时必传)
@category 技能赚钱:技能分类;
          学习财商知识:代表作名称;
          (服务类型:4学习财商知识,5技能赚钱必传)
*/

export function completeInfo(params) {
  return axios.post("/api/user/complete", params).then(res => {
    return Promise.resolve(res.data);
  });
}

export function getCategoryData(type) {
  return axios.post("/common/service-category/index", { type }).then(res => {
    return Promise.resolve(res.data);
  });
}
