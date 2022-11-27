<script setup lang="ts">
const props = withDefaults(defineProps<{ pictures: string[] }>(), {
  pictures: () => [],
});
</script>

<template>
  <div class="goods-comment-image">
    <div class="list">
      <a v-for="url in pictures" :key="url" href="javascript:;">
        <img src="" alt="" />
      </a>
    </div>
    <div class="preview"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: $xghColor;
      }
    }
  }
}
</style>
