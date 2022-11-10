<script setup lang="ts"></script>

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

<style scoped lang="scss"></style>
