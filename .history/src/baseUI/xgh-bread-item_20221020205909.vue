<script setup lang="ts">
defineProps({
  to: {
    type: [String, Object],
    default: "/",
  },
});
</script>

<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to">首页</RouterLink>
  </div>
  <i class="iconfont icon-angle-right"></i>
</template>

<style scoped lang="scss"></style>
