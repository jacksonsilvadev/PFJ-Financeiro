<template>
  <div id="app">
    <v-app id="inspire">
      <LayoutNavigation ></LayoutNavigation>

      <v-content>
        <v-container fluid fill-height>
          <router-view></router-view>
        </v-container>
      </v-content>

      <v-footer app>
        <span>&copy; 2019</span>
      </v-footer>
    </v-app>
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
  data: () => ({
    drawer: null,
    logged: true
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  mounted() {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null;
      this.logged = !!user;

      // this.$router.push({ name: window.uid ? "home" : "login" }, () => {});

      setTimeout(() => {
        this.$root.$emit("Spinner::hide");
      }, 300);
    });
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (window.uid) {
  //       vm.$router.push({ name: "home" });
  //     }
  //   });
  // }
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
