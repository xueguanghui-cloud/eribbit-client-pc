<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import type { IGood } from "@/types/good";

withDefaults(
  defineProps<{
    good: IGood,;
  }>(),
  {
    good: () => {
      return {
        id: "",
        name: "",
        orderNum: "",
        desc: "",
        discount: "",
        picture: "",
        price: "",
      };
    },
  }
);
</script>

<template>
  <RouterLink :to="`/product/${good.id}`" class="goods-item">
    <img :src="good.picture" :alt="good.name" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">{{ good.desc }}</p>
    <p class="price">&yen;{{ good.price }}</p>
  </RouterLink>
</template>

<style scoped lang="scss">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  @include hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>
