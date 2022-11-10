<script setup lang="ts">
import { findGoods } from "@/api/product";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import GoodsRelevant from "./components/goods-relevant.vue";
const route = useRoute();

// 获取商品详情
const useGoods = () => {
  // 路由地址商品id发生变化，但是不会重新初始化组件
  const goods = ref(null);
  watch(
    () => route.params.id,
    () => {
      findGoods(route.params.id as string).then((res: any) => {
        goods.value = res.result;
      });
    }
  );

  return goods;
};

// 获取商品详情数据
const goods = useGoods();
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
