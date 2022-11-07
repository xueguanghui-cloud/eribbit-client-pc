<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import SubBread from "./components/sub-bread.vue";
import SubFilter from "./components/sub-filter.vue";
import SubSort from "./components/sub-sort.vue";
import GoodsItem from "./components/goods-item.vue";
import { findSubCategoryGoods } from "@/api/category";
import type { IParams } from "@/types/category/params";
import type { IGood } from "@/types/good";
const route = useRoute();
const loading = ref(false);
const finished = ref(false);
const goodsList = ref<IGood[]>([]);

let requestParams: IParams = {
  categoryId: "",
  page: 1,
  pageSize: 20,
};

const getData = () => {
  loading.value = true;
  // 设置二级分类ID
  requestParams.categoryId = route.params.id as string;
  findSubCategoryGoods(requestParams).then((res: any) => {
    if (res.result.items.length) {
      console.log(res.result.items);
      res.result.items.forEach((goods: IGood) => {
        goodsList.value.push(goods);
      });
      requestParams.page++;
      loading.value = false;
    } else {
      loading.value = false;
      finished.value = true;
    }
  });
};

// 在更改了二级分类的时候需要重新加载数据
watch(
  () => route.params.id,
  (newVal) => {
    if (newVal) {
      finished.value = false;
      goodsList.value = []; // 导致列表为空,加载更多组件进入可视区,触发加数据
      requestParams = { categoryId: "", page: 1, pageSize: 20 };
    }
  }
);
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter></SubFilter>
      <!-- 商品面板 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort></SubSort>
        <!-- 商品列表 -->
        <ul>
          <li v-for="good in goodsList" :key="good.id">
            <GoodsItem :good="good" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <xgh-infinite-loading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
