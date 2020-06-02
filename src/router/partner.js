const partnerRouter = [
  // {
  //   path: "/partner",
  //   meta: {
  //     title: "伙伴",
  //     keepAlive: true
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "partner" */ "../views/partner/index.vue")
  // },
  {
    path: "/partner_detail",
    name: "partner_detail",
    meta: {
      title: "服务详情",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "partner_detail" */ "../views/partner/detail.vue")
  }, {
    path: "/partner_cate",
    name: "partner_cate",
    meta: {
      title: "全部分类",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "partner_cate" */ "../views/partner/cate.vue")
  }, {
    path: "/partner_all",
    name: "partner_all",
    meta: {
      title: "全部服务",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "partner_all" */ "../views/partner/all.vue")
  }, {
    path: "/partner_complaints",
    name: "partner_complaints",
    meta: {
      title: "内容举报",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "partner_complaints" */ "../views/partner/complaints.vue")
  }, {
    path: "/partner_search",
    name: "partner_search",
    meta: {
      title: "搜索",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "partner_search" */ "../views/partner/search.vue")
  }
];

export default partnerRouter;
