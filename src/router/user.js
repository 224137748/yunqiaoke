// 个人中心路由
const userRouter = [
  {
    path: "/user",
    meta: {
      title: "基本信息",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "user" */ "../views/user/user.vue")
  },
  {
    path: "/skill",
    meta: {
      title: "绝技列表"
    },
    component: () =>
      import(/* webpackChunkName: "user-skill" */ "../views/user/skill.vue")
  },
  {
    path: "/fans",
    meta: {
      title: "我的粉丝"
    },
    component: () =>
      import(/* webpackChunkName: "user-fans" */ "../views/user/fans.vue")
  },
  {
    path: "/update",
    component: () =>
      import(/* webpackChunkName: "user-update" */ "../views/user/update.vue")
  },
  {
    path: "/identity",
    redirect: "/identity/type",
    component: () =>
      import(
        /* webpackChunkName: "user-identity" */ "../views/user/identity/identity.vue"
      ),
    children: [
      {
        path: "type",
        meta: {
          title: "认证类型",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user-identity-type" */ "../views/user/identity/select-type.vue"
          )
      },
      {
        path: "type-skill",
        meta: {
          title: "个人认证",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user-identity-skill" */ "../views/user/identity/type-skill.vue"
          )
      },
      {
        path: "type-employer",
        meta: {
          title: "企业认证",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user-identity-employer" */ "../views/user/identity/type-employer.vue"
          )
      },
      {
        path: "type-invest",
        meta: {
          title: "投资人认证",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "user-identity-invest" */ "../views/user/identity/type-invest.vue"
          )
      }
    ]
  },
  {
    path: "/setting",
    redirect: "/setting/main",
    component: () =>
      import(
        /* webpackChunkName: "setting-index" */ "../views/user/setting/index.vue"
      ),
    children: [
      {
        path: "main",
        meta: {
          title: "设置"
        },
        component: () =>
          import(
            /* webpackChunkName: "setting-main" */ "../views/user/setting/main.vue"
          )
      },
      {
        path: "help",
        meta: {
          title: "帮助中心",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "setting-help" */ "../views/user/setting/help.vue"
          )
      },
      {
        path: "quelist",
        component: () =>
          import(
            /* webpackChunkName: "help-list" */ "../views/user/setting/queList.vue"
          )
      },
      {
        path: "feedback",
        meta: {
          title: "反馈"
        },
        component: () =>
          import(
            /* webpackChunkName: "help-list" */ "../views/user/setting/feedback.vue"
          )
      }
    ]
  }
];

export default userRouter;
