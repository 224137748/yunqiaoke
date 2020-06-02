// 发布相关页面路由
const publishRouter = [
  {
    path: "/publish",
    meta: {
      title: "发布服务",
      keepAlive: true
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/publish/index.vue"),
    children: [
      {
        path: "topic",
        meta: {
          title: "话题列表",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-topic" */ "../views/publish/topic.vue"
          )
      },
      {
        path: "area",
        meta: {
          title: "选择区域",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-area" */ "../views/publish/area.vue"
          )
      },
      {
        path: "service-type",
        meta: {
          title: "发布服务",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-service-type" */ "../views/publish/service/type-select.vue"
          )
      },
      {
        path: "service-form",
        meta: {
          title: "发布服务",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-service-form" */ "../views/publish/service/form.vue"
          )
      },
      {
        path: "skill-type",
        meta: {
          title: "发布技能",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-skill-type" */ "../views/publish/skill/type-select.vue"
          )
      },
      {
        path: "skill-form",
        meta: {
          title: "发布技能",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-skill-form" */ "../views/publish/skill/form.vue"
          )
      },
      {
        path: "request-type",
        meta: {
          title: "发布需求",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-request-type" */ "../views/publish/request/type-select.vue"
          )
      },
      {
        path: "request-form-invest",
        meta: {
          title: "发布投资",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-request-form" */ "../views/publish/request/form-invest.vue"
          )
      },
      {
        path: "request-form-finance",
        meta: {
          title: "发布融资",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-request-form" */ "../views/publish/request/form-finance.vue"
          )
      },
      {
        path: "request-form-supporter",
        meta: {
          title: "发布派单",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-request-form" */ "../views/publish/request/form-supporter.vue"
          )
      },
      {
        path: "request-form-transfer",
        meta: {
          title: "发布转让",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-request-form" */ "../views/publish/request/form-transfer.vue"
          )
      },
      {
        path: "lesson-type",
        meta: {
          title: "发布公开课",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-lesson-type" */ "../views/publish/lesson/type-select.vue"
          )
      },
      {
        path: "lesson-form",
        meta: {
          title: "发布公开课",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-lesson-form" */ "../views/publish/lesson/form.vue"
          )
      },
      {
        path: "plan",
        meta: {
          title: "互助计划",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-plan" */ "../views/publish/redbag/plan.vue"
          )
      },
      {
        path: "charge",
        meta: {
          title: "互助金充值",
          keepAlive: true
        },
        component: () =>
          import(
            /* webpackChunkName: "publish-plan" */ "../views/publish/redbag/charge.vue"
          )
      }
    ]
  }
];

export default publishRouter;
