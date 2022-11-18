<script setup lang="ts">
import { findGoods } from "@/api/product";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import type { IGoods } from "@/types/goods/goods";
import goodsRelevant from "./components/goods-relevant.vue";
import goodsImage from "./components/goods-image.vue";
import goodsSales from "./components/goods-sales.vue";
import goodsName from "./components/goods-name.vue";
import goodsSku from "./components/goods-sku.vue";
// 获取商品详情
const route = useRoute();
const goods = ref<IGoods>();
watch(
  () => route.params.id,
  (newValue) => {
    if (newValue) {
      findGoods(route.params.id as string).then((res: any) => {
        goods.value = res.result;
      });
    }
  },
  { immediate: true }
);

const selectedSkuId = ref(goods.value?.skus[0].id);

const changeSku = (sku: any) => {
  // 修改商品的原价现价库存等信息
  if (sku.skuId) {
    goods.value!.price = sku.price;
    goods.value!.oldPrice = sku.oldPrice;
    goods.value!.price = sku.price;
    goods.value!.inventory = sku.inventory;
  }
};

// 选择的商品数量
const selectedCount = ref(1);
</script>

<template>
  <div class="xgh-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <xgh-bread>
        <xgh-bread-item to="/">首页</xgh-bread-item>
        <xgh-bread-item :to="`/category/${goods.categories[1].id}`">
          {{ goods.categories[1].name }}
        </xgh-bread-item>
        <xgh-bread-item :to="`/category/sub/${goods.categories[0].id}`">
          {{ goods.categories[0].name }}
        </xgh-bread-item>
        <xgh-bread-item>
          {{ goods.name }}
        </xgh-bread-item>
      </xgh-bread>
      <!-- 商品信息 -->
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <goodsImage :images="goods.mainPictures"></goodsImage>
          <goodsSales></goodsSales>
        </div>
        <div class="spec">
          <goodsName :goods="goods"></goodsName>
          <goodsSku
            :goods="goods"
            :skuId="selectedSkuId"
            :key="goods.id"
            @change="changeSku"
          ></goodsSku>
          <xgh-numbox
            v-model="selectedCount"
            label="数量"
            :max="goods.inventory"
            :min="1"
          />
          <xgh-button type="primary" style="margin-top: 20px">
            加入购物车
          </xgh-button>
        </div>
      </div>
      <!-- 商品推荐 -->
      <goodsRelevant />
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
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
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
