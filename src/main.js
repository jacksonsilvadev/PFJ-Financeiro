import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Firebase from './firebase'
import './assets/scss/app.scss'

Vue.use(Firebase)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
