<script setup lang="ts">
import type { IGood } from "@/types/good";
type TGood = {
  good: IGood;
};
withDefaults(defineProps<TGood>(), {
  good: {},
});
</script>

<template>
  <RouterLink to="/" class="goods-item">
    <img :src="good.picture" :alt="good.name" />
    <p class="name ellipsis">{{ good.name }}</p>
    <p class="desc ellipsis">火锅食材</p>
    <p class="price">&yen;19.99</p>
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
