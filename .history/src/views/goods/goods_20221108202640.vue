<script setup lang="ts">
import { findGood } from "@/api/product";
import { ref } from "vue";
import { useRoute } from "vue-router";
import GoodsRelevant from "./components/goods-relevant.vue";
const route = useRoute();

// 获取商品详情数据
const useGoods = () => {
  const goods = ref(null);
  findGood(route.params.id);
  return goods;
};
</script>

<template>
  <div class="xgh-goods-page">
    <div class="container">
      <!-- 面包屑 -->
      <xgh-bread>
        <xgh-bread-item to="/">首页</xgh-bread-item>
        <xgh-bread-item to="/">手机</xgh-bread-item>
        <xgh-bread-item to="/">华为</xgh-bread-item>
        <xgh-bread-item to="/">p30</xgh-bread-item>
      </xgh-bread>
      <!-- 商品信息 -->
      <div class="goods-info"></div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
