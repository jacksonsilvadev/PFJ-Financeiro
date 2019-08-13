import Vue from "vue";
import App from "./App.vue";
import firebase from "./firebase";
import "./assets/scss/app.scss";
import "./utils/directives";
import vuetify from "./plugins/vuetify";
import store from "./store/index";
import VeeValidate from "vee-validate";
import router from "./router";

Vue.use(VeeValidate);

Vue.use(firebase);

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
