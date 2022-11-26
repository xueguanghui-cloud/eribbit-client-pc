<script setup lang="ts">
import { inject, ref } from "vue";
import goodsDetail from "./goods-detail.vue";
import goodsComment from "./goods-comment.vue";
import type { IGoods } from "@/types/goods/goods";
// activeName 的值：GoodsDetail GoodsComments
const activeName = ref("goodsDetail");
const goods: IGoods | undefined = inject("goods");
</script>

<template>
  <div class="goods-tabs">
    <nav>
      <a
        @click="activeName = 'goodsDetail'"
        :class="{ active: activeName === 'goodsDetail' }"
        href="javascript:;"
        >商品详情</a
      >
      <a
        @click="activeName = 'goodsComment'"
        :class="{ active: activeName === 'goodsComment' }"
        href="javascript:;"
        >商品评价<span>({{ goods?.commentCount }})</span></a
      >
    </nav>
    <!-- 切换内容的地方:两个组件（商品详情组件、商品评价组件） -->
    <!-- vue 动态切换组件可以使用 component 组件, is属性用来决定component动态组件渲染为哪个组件 -->
    <component
      :is="activeName === 'goodsDetail' ? goodsDetail : goodsComment"
    ></component>
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
