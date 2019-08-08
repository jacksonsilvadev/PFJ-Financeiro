<template>
  <div class="expense-list-item row">
    <div class="col-10">
      <div>{{data.description}}</div>
      <small v-date-format="data.createdAt"></small>
    </div>
    <div class="col-2" v-money-format="data.value"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped lang="scss">
.expense-list-item {
  border-bottom: 1px solid var(--dark-medium);
  padding: 20px 0;
}
</style>
