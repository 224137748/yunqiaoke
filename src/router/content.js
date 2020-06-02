const contentRouter = [
  {
    path: "/works",
    meta: {
      title: "作品管理"
    },
    component: () =>
      import(
        /* webpackChunkName: "help-list" */ "../views/user/content/works-manage.vue"
      )
  }
  // {
  //   path: "/draft",
  //   meta: {
  //     title: "草稿箱"
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "draft" */ "../views/draft/draft.vue")
  // }
];

export default contentRouter;
