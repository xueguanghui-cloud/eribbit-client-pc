<script setup lang="ts">
import { ref } from "vue";
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
const isAllChecked = ref(true);
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 商品面板 -->
      <div class="goods-list">
        <SubSort></SubSort>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
