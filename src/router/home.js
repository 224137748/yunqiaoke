// 首页面路由
const homeRouter = [
  {
    path: "/target",
    meta: {
      title: "设置新目标",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "target" */ "../views/home/target.vue")
  },
  {
    path: "/sign",
    meta: {
      title: "打卡",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "sign" */ "../views/home/sign.vue")
  },
  {
    path: "/sign",
    meta: {
      title: "打卡",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "sign" */ "../views/home/sign/index.vue"),
    children: [
      {
        path: "income",
        meta: {
          title: "收入记录",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "sign-income" */ "../views/home/sign/income.vue"
          )
      }
    ]
  },
  {
    path: "/effect",
    meta: {
      title: "邀请注册",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "effect" */ "../views/home/effect.vue")
  },
  {
    path: "/effect",
    meta: {
      title: "邀请注册",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "effect" */ "../views/home/effect/index.vue"),
    children: [
      {
        path: "mark",
        meta: {
          title: "邀请打榜",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "effect-mark" */ "../views/home/effect/mark.vue"
          )
      },
      {
        path: "order",
        meta: {
          title: "邀请下单",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "effect-order" */ "../views/home/effect/order.vue"
          )
      }
    ]
  },
  {
    path: "/business",
    meta: {
      title: "商机分析",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "business" */ "../views/home/business.vue")
  },
  {
    path: "/share",
    meta: {
      title: "分享收入",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "share" */ "../views/home/share.vue")
  },
  {
    path: "/share",
    meta: {
      title: "分享收入",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "share" */ "../views/home/share/index.vue"),
    children: [
      {
        path: "experience",
        meta: {
          title: "经验宝石收支明细",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "share-experience" */ "../views/home/share/experience.vue")
      },
      {
        path: "shareImg",
        meta: {
          title: "互助金收支明细",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "share-shareImg" */ "../views/home/share/shareImg.vue")
      },
      {
        path: "mutual",
        meta: {
          title: "互助金收支明细",
          keepAlive: false
        },
        component: () =>
          import(/* webpackChunkName: "share-mutual" */ "../views/home/share/mutual.vue")
      }
    ]
  },
  {
    path: "/withdraw",
    meta: {
      title: "提现",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "withdraw" */ "../views/home/withdraw.vue")
  },
  {
    path: "/withdraw",
    meta: {
      title: "提现",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "withdraw-index" */ "../views/home/withdraw/index.vue"),
    children: [
      {
        path: "info",
        meta: {
          title: "收款信息",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "withdraw-info" */ "../views/home/withdraw/info.vue"
          )
      },
      {
        path: "edit",
        meta: {
          title: "编辑收款信息",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "withdraw-edit" */ "../views/home/withdraw/edit.vue"
          )
      },
      {
        path: "record",
        meta: {
          title: "提现记录",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "withdraw-record" */ "../views/home/withdraw/record.vue"
          )
      }
    ]
  },
  {
    path: "/pmc",
    meta: {
      title: "PMC数据大师",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "pmc" */ "../views/home/pmc.vue")
  }
];

export default homeRouter;
