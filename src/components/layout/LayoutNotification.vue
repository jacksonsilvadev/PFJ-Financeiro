<template>
  <div v-if="show" :class="`alert-${type}`" class="alert alert-dismissible fade show" role="alert">
    {{ message }}
    <button @click="close()" type="button" class="close">
      <span>&times;</span>
    </button>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return { show: false, type: "danger", message: "" };
  },
  created() {
    this.$root.$on("Notification::show", payload => {
      this.show = true;
      this.message = payload.message;
      this.type = payload.type;

      setTimeout(() => {
        this.close();
      }, payload.timeout || 4000);
    });
  },
  methods: {
    close() {
      this.message = "";
      this.type = "danger";
      this.show = false;
    }
  }
};
</script>

<style scoped>
.alert {
  top: 20px;
  position: absolute;
  z-index: 1000;
  right: 20px;
  max-width: 400px;
}
</style>
