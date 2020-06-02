// import axios from 'axios';
import { Toast, Indicator, MessageBox } from "mint-ui";
// 注册bridge
import bridge from "../bridge";
import Vue from "vue";
// 定义 eventBus
const evt = new Vue();

const plugins = {
  install: function(Vue) {
    Vue.prototype.$Toast = Toast;
    Vue.prototype.$Indicator = Indicator;
    Vue.prototype.$MessageBox = MessageBox;
    Vue.prototype.$evt = evt;
    Vue.prototype.$bridge = bridge;
  }
};
export default plugins;
