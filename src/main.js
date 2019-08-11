import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "./firebase";
import "./assets/scss/app.scss";
import "./utils/directives";
import store from './store/index'

Vue.use(firebase);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
