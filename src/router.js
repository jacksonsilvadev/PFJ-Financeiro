import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'home',
      meta: {
        icon: 'home',
        title: 'Home'
      },
      component: () => import( /* webpackChunkName: "home" */ './views/home/Home')
    },
    {
      path: '/lista-gastos',
      name: 'lista-gastos',
      meta: {
        icon: 'list-ul',
        title: 'Listar Gastos'
      },
      component: () => import( /* webpackChunkName: "lista-gastos" */ './views/lista-gastos/ListaGastos')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        icon: 'home',
        title: 'Home'
      },
      component: () => import( /* webpackChunkName: "login" */ './views/login/Login')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - PFJ Financeiro`
  if (!window.uid && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else {
    next()
  }

})

export default router
