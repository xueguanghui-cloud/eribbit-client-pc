<script setup lang="ts">
import { ref } from "vue";
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
const isAllChecked = ref(true);
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 测试复选框 -->
      <xgh-checkbox v-model="isAllChecked"></xgh-checkbox>{{ isAllChecked }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
