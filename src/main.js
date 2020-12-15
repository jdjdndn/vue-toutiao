import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
import "amfe-flexible"; //自动设置基准值
import "./utils/dayjs"; //时间处理过滤器
import Vant from "vant";
import "vant/lib/index.css";

Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
