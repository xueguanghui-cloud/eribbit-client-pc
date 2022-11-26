<script setup lang="ts">
import { ref } from "vue";
import goodsDetail from "./goods-detail.vue";
import goodsComment from "./goods-comment.vue";
// activeName 的值：GoodsDetail GoodsComments
const activeName = ref("GoodsDetail");
</script>

<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeName = 'GoodsDetail'"
        :class="{ active: activeName === 'GoodsDetail' }"
        href="javascript:;"
        >商品详情</a
      >
      <a
        @click="activeName = 'GoodsComments'"
        :class="{ active: activeName === 'GoodsComments' }"
        href="javascript:;"
        >商品评价<span>(500+)</span></a
      >
    </nav>
    <!-- 切换内容的地方:两个组件（商品详情组件、商品评价组件） -->
  </div>
</template>

<style scoped lang="scss">
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: $xghColor;
        }
      }
    }
  }
}
</style>
