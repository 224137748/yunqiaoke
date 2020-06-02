// 身份认证 module
const moduleIdentity = {
  namespaced: true,
  state: {
    // 认证状态:1技能者,2雇主方,3个人投资者,4企业投资者
    auth_status: "",

    // 身份证号(1技能者必选)
    id_number: "",

    // 姓名(1技能者必选)
    name: "",

    // 身份证正面图片(1技能者必选)
    id_card_front: "",

    // 身份证背面图片(1技能者必选)
    id_card_back: "",

    // 手持身份证图片(1技能者必选)
    hold_id_card: "",

    // 机构名称(2雇主方必选)
    company: "",

    // 营业执照图片(2雇主方必选)
    license: "",

    // 职位(3个人投资者,4企业投资者必选)
    job: "",

    // 目标投资(3个人投资者,4企业投资者必选)
    planned: "",

    // 已完成投资(3个人投资者,4企业投资者必选)
    current: ""
  },
  mutations: {
    setAuthStatus(state, authStatus) {
      state.auth_status = authStatus;
    },
    setIdNumber(state, idNumber) {
      state.id_number = idNumber;
    },
    setName(state, name) {
      state.name = name;
    },
    setIdCardFront(state, idCardFront) {
      state.id_card_front = idCardFront;
    },
    setIdCardBack(state, idCardBack) {
      state.id_card_back = idCardBack;
    },
    setHoldIdCard(state, holdIdCard) {
      state.hold_id_card = holdIdCard;
    },
    setCompany(state, company) {
      state.company = company;
    },
    setLicense(state, license) {
      state.license = license;
    },
    setJob(state, job) {
      state.job = job;
    },
    setPlanned(state, planned) {
      state.planned = planned;
    },
    setCurrent(state, current) {
      state.current = current;
    }
  }
};

export default moduleIdentity;
