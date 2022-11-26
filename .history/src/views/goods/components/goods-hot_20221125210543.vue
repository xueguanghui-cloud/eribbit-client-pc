<script setup lang="ts">
import { computed } from "vue";
import goodsItem from "@/views/category/components/goods-item.vue";

const props = withDefaults(defineProps<{ type: number }>(), {
  type: 1,
});
const titleObj: { [key: number]: string } = {
  1: "24小时热销榜",
  2: "周热销榜",
  3: "总热销榜",
};
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
