<script setup lang="ts">
const props = withDefaults(defineProps<{ pictures: string[] }>(), {});
</script>

<template>
  <div class="goods-comment-image">
    <div class="list">
      <a href="javascript:;">
        <img src="" alt="" />
      </a>
    </div>
    <div class="preview"></div>
  </div>
</template>

<style scoped lang="scss"></style>
