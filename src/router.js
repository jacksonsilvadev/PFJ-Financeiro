import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: () => import( /* webpackChunkName: "home" */ './views/home/Home')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ './views/login/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {

  if (!window.uid && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }

})

export default router
