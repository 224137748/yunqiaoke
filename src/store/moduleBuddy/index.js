// 身份认证 module
const moduleBuddy = {
  namespaced: true,
  state: {
    // 地址加坐标
    buddyAddres: [],
    // 搜索历史
    buddySearch: [],
    // 七大类数据储存
    buddyContent: ""
  },
  mutations: {
    setAddStatus(state, addStatus) {
      state.buddyAddres = addStatus;
    },
    setSearchStatus(state, searchStatus) {
      if (searchStatus === "0") {
        state.buddySearch = [];
      } else {
        state.buddySearch.splice(0, 0, searchStatus);
        if (state.buddySearch.length > 10) {
          state.buddySearch.pop();
        }
      }
    },
    setContentStatus(state, ContentStatus) {
      state.buddyContent = ContentStatus;
    }
  }
};

export default moduleBuddy;
