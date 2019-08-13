import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import store from "../store/index";
import AuthGuard from "../router/auth-guard";

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
        import(/* webpackChunkName: "home" */ "../views/home/Home")
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
          /* webpackChunkName: "lista-gastos" */ "../views/lista-gastos/ExpensiveList"
        )
    },
    {
      path: "/login",
      name: "login",
      meta: {
        title: "Login"
      },
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/login/Login")
    },
    {
      path: "/register",
      name: "register",
      meta: {
        title: "Register"
      },
      component: () =>
        import(/* webpackChunkName: "login" */ "../views/login/Register")
    }
  ]
});

router.beforeEach((to, from, next) => {
  
  if (to.matched.some(record => record.meta.requiresAuth)) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (!user) {
        next({ name: "login" });
      } else {
        next();
      }
    });
  } else {
    next();
  }

});

export default router;
