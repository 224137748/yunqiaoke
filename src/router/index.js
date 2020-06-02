import Vue from "vue";
import VueRouter from "vue-router";
// 登录页面路由
import loginRouter from "./login";
import userRouter from "./user";
import publishRouter from "./publish";
import informationRouter from "./information";
import homeRouter from "./home";
import mineRouter from "./mine";
import buddyRouter from "./buddy";
import contentRouter from "./content";
import partnerRouter from "./partner";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/bridge",
    component: () => import("../views/bridge.vue")
  },
  ...loginRouter,
  ...userRouter,
  ...publishRouter,
  ...informationRouter,
  ...homeRouter,
  ...mineRouter,
  ...buddyRouter,
  ...contentRouter,
  ...partnerRouter
];

const router = new VueRouter({
  // 使用hash路由
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// 解决 ios 键盘不回滚的问题
function scrollToTop() {
  window.scrollTo({
    top: window.document.body.scrollHeight,
    left: 0,
    behavior: "smooth"
  });
}
// 路由前置守卫
router.beforeEach((to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.meta.fixblur) {
    document.body.addEventListener("focusout", scrollToTop);
  }
  next();
});
router.afterEach((to, from) => {
  if (from.meta.fixblur && !to.meta.fixblur) {
    document.body.removeEventListener("focusout", scrollToTop);
  }
});

export default router;
