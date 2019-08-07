<template>
  <div id="app">
    <base-spinner></base-spinner>

    <!-- <router-view/> -->
  </div>
</template>

<script>
import BaseSpinner from './components/global/BaseSpinner';

export default {
  components: {
    BaseSpinner
  },
  methods: {
    showSpinner () {
      this.$root.$emit('Spinner::show')
    }
  }
}
</script>

<style lang="scss">

</style>
