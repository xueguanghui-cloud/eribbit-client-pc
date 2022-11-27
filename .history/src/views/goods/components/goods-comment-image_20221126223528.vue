<script setup lang="ts"></script>

<template>
  <div class="goods-comment-image">
    <div class="list">
      <a
        href="javascript:;"
        :class="{ active: currImage === url }"
        @click="currImage = url"
        v-for="url in pictures"
        :key="url"
      >
        <img :src="url" alt="" />
      </a>
    </div>
    <div class="preview"></div>
  </div>
</template>

<style scoped lang="scss"></style>
