import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "lib-flexible";
// 引入插件 Toast Indicator MessageBox;
import plugins from "./pulgins";
// 引入mint-ui
// import MintUI from "mint-ui";
import "mint-ui/lib/style.css";

import VConsole from "vconsole";
import VueHtml2Canvas from "vue-html2canvas";
import {
  Picker,
  Actionsheet,
  InfiniteScroll,
  Loadmore,
  Switch,
  DatetimePicker,
  Radio,
  Popup,
  Lazyload,
  CellSwipe,
  Swipe,
  SwipeItem,
  IndexList,
  IndexSection
} from "mint-ui";
const vConsole = new VConsole();
console.log(vConsole.version);

Vue.use(VueHtml2Canvas);
Vue.component(Picker.name, Picker);
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(DatetimePicker.name, DatetimePicker);
Vue.component(Radio.name, Radio);
Vue.component(Popup.name, Popup);
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Switch.name, Switch);
Vue.component(CellSwipe.name, CellSwipe);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(IndexList.name, IndexList);
Vue.component(IndexSection.name, IndexSection);
Vue.use(Lazyload);
// Vue.use(MintUI);
Vue.use(plugins);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
