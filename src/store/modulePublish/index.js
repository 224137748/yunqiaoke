// 发布 module
const modulePublish = {
  namespaced: true,
  state: {
    serviceForm: null, // 服务form
    skillForm: null, // 技能form
    investForm: null, // 投资form
    financeForm: null, // 融资form
    supporterForm: null, // 派单/找供应商form
    transferForm: null, // 转让form
    lessonForm: null // 公开课form
  },
  mutations: {
    saveServiceForm(state, form) {
      state.serviceForm = form;
    },
    saveSkillForm(state, form) {
      state.skillForm = form;
    },
    saveInvestForm(state, form) {
      state.investForm = form;
    },
    saveFinanceForm(state, form) {
      state.financeForm = form;
    },
    saveSupporterForm(state, form) {
      state.supporterForm = form;
    },
    saveTransferForm(state, form) {
      state.transferForm = form;
    },
    saveLessonForm(state, form) {
      state.lessonForm = form;
    }
  }
};

export default modulePublish;
