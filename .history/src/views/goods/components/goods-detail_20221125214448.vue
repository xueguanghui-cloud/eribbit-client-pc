<script setup lang="ts">
import type { IGoods } from "@/types/goods/goods";
import { inject } from "vue";
const goods: IGoods = inject("goods");
</script>

<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{ item.name }}</span>
        <span class="dd">{{ item.value }}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img
      v-for="item in goods.details.pictures"
      :key="item"
      :src="item"
      alt=""
    />
  </div>
</template>

<style scoped lang="scss"></style>
