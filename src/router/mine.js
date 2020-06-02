// 我的路由
const mineRouter = [
  {
    path: "/mine",
    meta: {
      title: "我的",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "index" */ "../views/mine/index.vue")
  },
  {
    path: "/make-me",
    meta: {
      title: "预约我的",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "make-me" */ "../views/mine/make-me.vue")
  },
  {
    path: "/me-make",
    meta: {
      title: "我的预约",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "me-make" */ "../views/mine/me-make.vue")
  },
  {
    path: "/details",
    meta: {
      title: "我的预约",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "details" */ "../views/mine/details.vue")
  },
  {
    path: "/approval",
    meta: {
      title: "我的认可",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "approval" */ "../views/mine/approval.vue")
  },
  {
    path: "/approval",
    meta: {
      title: "我的认可",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "approval-index" */ "../views/mine/approval/index.vue"),
    children: [
      {
        path: "quantity",
        meta: {
          title: "我的电量",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "approval-quantity" */ "../views/mine/approval/quantity.vue"
          )
      }
    ]
  },
  {
    path: "/applause",
    meta: {
      title: "我的鼓掌",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "applause" */ "../views/mine/applause.vue")
  },
  {
    path: "/grade",
    meta: {
      title: "我的等级",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "grade" */ "../views/mine/grade.vue")
  },
  {
    path: "/draft",
    meta: {
      title: "草稿箱",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "draft" */ "../views/draft/draft.vue")
  },
  {
    path: "/search",
    meta: {
      title: "搜索",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/mine/search.vue")
  },
  {
    path: "/search",
    meta: {
      title: "搜索",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "search-index" */ "../views/mine/search/index.vue"),
    children: [
      {
        path: "result",
        name: "searchResult",
        meta: {
          title: "搜索结果",
          keepAlive: false
        },
        component: () =>
          import(
            /* webpackChunkName: "search-result" */ "../views/mine/search/result.vue"
          )
      }
    ]
  },
  {
    path: "/topic",
    meta: {
      title: "话题列表",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "topic" */ "../views/mine/topic.vue")
  },
  {
    path: "/user-list",
    meta: {
      title: "推荐",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "user-list" */ "../views/mine/user-list.vue")
  },
  {
    path: "/space",
    meta: {
      title: "个人中心",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "space" */ "../views/mine/space.vue")
  },
  {
    path: "/content",
    meta: {
      title: "个人中心",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "content" */ "../views/mine/content.vue")
  },
  {
    path: "/favorite",
    meta: {
      title: "收藏列表",
      keepAlive: false
    },
    component: () =>
      import(/* webpackChunkName: "favorite" */ "../views/mine/favorite.vue")
  }
];
export default mineRouter;
