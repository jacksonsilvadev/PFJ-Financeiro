<template>
  <div id="app">
    <base-spinner />
    <layout-notification></layout-notification>
    <div class="container-fluid" v-if="logged">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title">PFJ Financeiro</h1>
          <layout-navigation />
        </div>
        <div class="col">
          <router-view />
        </div>
      </div>
    </div>

    <router-view v-else />
  </div>
</template>

<script>
import BaseSpinner from "./components/global/BaseSpinner";
import LayoutNavigation from "./components/layout/LayoutNavigation";
import LayoutNotification from "./components/layout/LayoutNotification";
import { setTimeout } from "timers";

export default {
  name: "App",
  components: {
    BaseSpinner,
    LayoutNavigation,
    LayoutNotification
  },
  data() {
    return {
      logged: false
    };
  },
  mounted() {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null;
      this.logged = !!user;

      this.$router.push({ name: window.uid ? "home" : "login" }, () => {});

      setTimeout(() => {
        this.$root.$emit("Spinner::hide");
      }, 300);
    });
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: "home" });
      }
    });
  }
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  color: var(--light);
  background-color: var(--darker);
  .navigation-sidebar {
    background-color: var(--dark-medium);
    .app-title {
      text-align: center;
      font-size: 20pt;
      margin-top: 10px;
    }
  }
}
</style>
