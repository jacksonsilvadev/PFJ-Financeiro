<template>
  <div id="app">
    <base-spinner />
    <router-view />
  </div>
</template>

<script>
import BaseSpinner from "./components/global/BaseSpinner";
import { setTimeout } from "timers";

export default {
  name: "App",
  components: {
    BaseSpinner
  },
  mounted() {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null;

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
}
</style>
