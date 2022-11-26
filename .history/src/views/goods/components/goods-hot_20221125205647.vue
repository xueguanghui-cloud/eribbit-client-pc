<script setup lang="ts">
defineProps({
  type: {
    type: Number,
    defult: 1,
  },
});
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
  </div>
</template>

<style scoped lang="scss"></style>
