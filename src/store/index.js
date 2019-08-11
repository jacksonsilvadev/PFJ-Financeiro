import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import expensives from './modules/expensives'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    expensives
  }
})
