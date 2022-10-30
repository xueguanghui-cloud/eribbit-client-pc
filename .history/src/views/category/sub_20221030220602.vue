<script setup lang="ts">
import XghCheckbox from "@/baseUI/xgh-checkbox.vue";
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <XghCheckbox></XghCheckbox>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
