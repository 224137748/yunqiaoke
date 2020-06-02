// 登录页面路由
const loginRouter = [
  {
    path: "/login",
    meta: {
      title: "账号登录",
      keepAlive: true,
      fixblur: true
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login/login.vue")
  },
  {
    path: "/wxlogin",
    meta: {
      title: "授权登录",
      keepAlive: true
    },
    component: () =>
      import(
        /* webpackChunkName: "weixinLogin" */ "../views/login/weixin-login.vue"
      )
  },
  {
    path: "/agreement",
    meta: {},
    component: () =>
      import(/* webpackChunkName: "agreement" */ "../views/login/agreement.vue")
  },
  {
    path: "/register-phone",
    meta: {
      title: "完善手机号",
      // 使用缓存
      keepAlive: true,
      fixblur: true
    },
    component: () =>
      import(
        /* webpackChunkName: "register-phone" */ "../views/login/register-phone.vue"
      )
  },
  {
    path: "/register-captcha",
    meta: {
      title: "验证码",
      keepAlive: true,
      fixblur: true
    },
    component: () =>
      import(
        /* webpackChunkName: "register-captcha" */ "../views/login/register-captcha.vue"
      )
  },
  {
    path: "/set-psw",
    meta: {
      title: "设置密码",
      keepAlive: true,
      fixblur: true
    },
    component: () =>
      import(/* webpackChunkName: "setPsw" */ "../views/login/set-psw.vue")
  },
  {
    path: "/reset-psw",
    meta: {
      title: "忘记密码",
      fixblur: true
    },
    component: () =>
      import(/* webpackChunkName: "reset-psw" */ "../views/login/reset-psw.vue")
  }
];

export default loginRouter;
