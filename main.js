import App from "./App";

// #ifndef VUE3
import Vue from "vue";
import "./uni.promisify.adaptor";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
  ...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
import VConsole from "vconsole"; // 引入 vConsole

export function createApp() {
  const app = createSSRApp(App);

  // 仅在开发环境使用 vConsole
  if (
    process.env.NODE_ENV === "development" &&
    process.env.UNI_PLATFORM === "h5"
  ) {
    new VConsole(); // 初始化 vConsole
  }
  return {
    app,
  };
}
// #endif
