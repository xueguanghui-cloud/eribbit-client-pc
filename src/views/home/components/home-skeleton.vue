<script setup lang="ts">
import { defineProps } from "vue"
import XghSkeleton from "@/baseUI/xgh-skeleton.vue";
defineProps({
  bg: {
    type: String,
    default: "#fff"
  }
})
</script>

<template>
  <div class='home-skeleton'>
    <div class="item" v-for="i in 4" :key="i" :style="{backgroundColor:bg}">
      <xgh-skeleton bg="#e4e4e4" width="306px" height="306px" animated />
      <xgh-skeleton bg="#e4e4e4" width="160px" height="24px" animated />
      <xgh-skeleton bg="#e4e4e4" width="120px" height="24px" animated />
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-skeleton {
  width: 1240px;
  height: 406px;
  display: flex;
  justify-content: space-between;
  .item {
    width: 306px;
    .xgh-skeleton ~ .xgh-skeleton{
      display: block;
      margin: 16px auto 0;
    }
  }
}
</style>
