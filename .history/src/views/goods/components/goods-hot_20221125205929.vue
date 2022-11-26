<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  type: {
    type: Number,
    required: true,,
  },
});
const titleObj = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
const title = computed(() => {
  return titleObj[props.type];
});
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
  </div>
</template>

<style scoped lang="scss"></style>
