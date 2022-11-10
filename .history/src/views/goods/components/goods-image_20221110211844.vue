<script setup lang="ts">
import { ref } from "vue";
interface Porps {
  images: string[];
}
withDefaults(
  defineProps<Porps>({
    images: () => [],
  })
);

const currIndex = ref(0);
</script>

<template>
  <div class="goods-image">
    <div class="middle">
      <img :src="images[currIndex]" alt="" />
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid $xghColor;
      }
    }
  }
}
</style>
