<script setup lang="ts">
import { useRoute } from "vue-router";
import SubBread from "./components/sub-bread.vue";
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
