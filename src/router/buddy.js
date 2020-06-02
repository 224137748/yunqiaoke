// 我的路由
const buddyRouter = [
  {
    path: "/partner",
    meta: {
      title: "我的",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/buddy/index.vue")
  },
  {
    path: "/partner",
    meta: {
      title: "我的",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/buddy/base/index.vue"),
    children: [
      {
        path: "list",
        meta: {
          title: "全部分类",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "partner-list" */ "../views/buddy/base/list.vue"
          )
      },
      {
        path: "makeOrder",
        meta: {
          title: "邀请下单",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "partner-makeOrder" */ "../views/buddy/base/makeOrder.vue"
          )
      },
      {
        path: "makeList",
        meta: {
          title: "邀请打榜",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "partner-makeList" */ "../views/buddy/base/makeList.vue"
          )
      },
      {
        path: "city",
        meta: {
          title: "地区",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "base-city" */ "../views/buddy/base/city.vue")
      },
      {
        path: "complaint",
        meta: {
          title: "内容举报",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "base-complaint" */ "../views/buddy/base/complaint.vue")
      }
    ]
  },
  {
    path: "/mList",
    meta: {
      title: "全部服务",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "mList" */ "../views/buddy/mList.vue")
  },
  {
    path: "/detail",
    meta: {
      title: "全部服务",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "detail-index" */ "../views/buddy/detail/index.vue"),
    children: [
      {
        path: "server",
        meta: {
          title: "服务详情",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-server" */ "../views/buddy/detail/server.vue")
      },
      {
        path: "investment",
        meta: {
          title: "投资详情",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-investment" */ "../views/buddy/detail/investment.vue")
      },
      {
        path: "dispatch",
        meta: {
          title: "派单详情",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-dispatch" */ "../views/buddy/detail/dispatch.vue")
      },
      {
        path: "transfer",
        meta: {
          title: "转让详情",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-transfer" */ "../views/buddy/detail/transfer.vue")
      },
      {
        path: "financing",
        meta: {
          title: "融资详情",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-financing" */ "../views/buddy/detail/financing.vue")
      },
      {
        path: "skill",
        meta: {
          title: "技能详情",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-skill" */ "../views/buddy/detail/skill.vue")
      },
      {
        path: "public",
        meta: {
          title: "公开课详情",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-public" */ "../views/buddy/detail/public.vue")
      },
      {
        path: "reser",
        meta: {
          title: "预约下单",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "detail-reser" */ "../views/buddy/detail/reser.vue")
      }
    ]
  },
  {
    path: "/aliplay",
    meta: {
      title: "播放器测试",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "aliVideo" */ "../views/buddy/aliVideo.vue")
  }
];
export default buddyRouter;
