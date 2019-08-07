<template>
  <div id="app">
    <base-spinner />
    <router-view />
  </div>
</template>

<script>
import BaseSpinner from "./components/global/BaseSpinner";

export default {
  components: {
    BaseSpinner
  },
  mounted() {
    console.log(this.$firebase);
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
