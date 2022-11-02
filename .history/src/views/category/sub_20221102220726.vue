<script setup lang="ts">
import { ref } from "vue";
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
const goodList = ref<IGood[]>([]);

const requestParams: IParams = {
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
      goodList.value.push([...res.result.items]);
      loading.value = false;
    } else {
      finished.value = true;
    }
  });
};
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
          <li v-for="i in 20" :key="i">
            <GoodsItem :goods="{}" />
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
