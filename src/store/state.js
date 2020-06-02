import { checkDevice } from "../utils/lang";
// 全局 app 状态
const state = {
  // 判断 安卓 ios
  deviceInfo: checkDevice(),
  // 用户id
  id: "",
  // 存储全局token
  token: "",
  // 存储极光id
  pushid: "",
  // 用户手机号
  mobile: "",
  // 1正常,2临时冻结,3永久冻结
  status: "",
  // 冻结时间
  froze_at: "",
  // 冻结天数
  froze_days: "",
  // 认证状态,0未认证,1认证中,2技能者,3雇主方,4个人投资者,5企业投资者,6已拒绝
  auth_status: "",
  openid: "",
  // token过期时间
  expired_at: "",
  // 创建时间
  created_at: "",
  // 1安卓,2iOS
  terminal: "",
  collections: "",
  fans: ""
};

export default state;
