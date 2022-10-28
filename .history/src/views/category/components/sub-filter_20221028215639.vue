<script setup lang="ts">
import { findSubCategoryFilter } from "@/api/category";
import type { ICategoryFilter } from "@/types/category/category-filter";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// 监听二级类目id变化获取筛选数据
const route = useRoute();
const filterData = ref<ICategoryFilter>();
watch(
  () => route.params.id,
  (newValue: string) => {
    // 变化后的id有值 且 处于二级路由
    if (newValue && `/category/sub/${newValue}` === route.path) {
      // 发送请求获取数据
      findSubCategoryFilter(route.params.id as string).then((res: any) => {
        // 每一组可选的筛选条件确实 全部 条件，处理下数据加上全部
        // 1. 品牌
        res.result.brands.unshift({ id: null, name: "全部" });
        res.result.saleProperties.forEach((item: any) => {
          item.properties.unshift({ id: null, name: "全部" });
        });
        filterData.value = res.result;
      });
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item" v-for="i in 4" :key="i">
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:;" v-for="item in filterData?.brands" :key="item.id"
          >全部</a
        >
        <a href="javascript:;" v-for="i in 4" :key="i">小米</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: $xghColor;
        }
      }
    }
  }
}
</style>
