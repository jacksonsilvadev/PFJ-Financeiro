import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "*",
      redirect: "/login"
    },
    {
      path: "/",
      name: "home",
      meta: {
        icon: "home",
        title: "Home",
        requiresAuth: true
      },
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/home/Home")
    },
    {
      path: "/lista-gastos",
      name: "lista-gastos",
      meta: {
        icon: "list-ul",
        title: "Listar Gastos",
        requiresAuth: true
      },
      component: () =>
        import(
          /* webpackChunkName: "lista-gastos" */ "./views/lista-gastos/ExpensiveList"
        )
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "Login"
      },
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/login/Login")
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "Register"
      },
      component: () =>
        import(/* webpackChunkName: "login" */ "./views/login/Register")
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} - PFJ Financeiro`;

  const user = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !user) next("login");
  else if (!requiresAuth && user) next("home");
  else next();
});

export default router;
