const inofrmationRouter = [
  {
    path: "/information",
    redirect: "/information/sex",
    component: () =>
      import(
        /* webpackChunkName: "inforIndex" */ "../views/information/index.vue"
      ),
    children: [
      {
        path: "sex",
        meta: {
          title: " "
        },
        component: () =>
          import(
            /* webpackChunkName: "inforSex" */ "../views/information/sex.vue"
          )
      },
      {
        path: "type",
        meta: {
          title: " "
        },
        component: () =>
          import(
            /* webpackChunkName: "inforType" */ "../views/information/type.vue"
          )
      },
      {
        path: "main",
        meta: {
          title: " ",
          fixblur: true
        },
        component: () =>
          import(
            /* webpackChunkName: "inforType1" */ "../views/information/main.vue"
          )
      }
    ]
  }
];

export default inofrmationRouter;
