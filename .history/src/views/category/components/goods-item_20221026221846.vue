<script setup lang="ts">
import { defineProps, withDefaults } from "vue";
import type { IGood } from "@/types/good";
type TGood = {
  good: IGood;
};
withDefaults(defineProps<TGood>(), {
  good: () => {},
});
</script>

<template>
  <RouterLink to="/" class="goods-item">
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
