<script setup lang="ts">
import { findSubCategoryFilter } from "@/api/category";
import type { ICategoryFilter } from "@/types/category/category-filter";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

// 监听二级类目id变化获取筛选数据
const route = useRoute();
const filterLoading = ref(false);
const filterData = ref<ICategoryFilter>();
watch(
  () => route.params.id,
  (newValue: string) => {
    filterLoading.value = true;
    // 变化后的id有值 且 处于二级路由
    if (newValue && `/category/sub/${newValue}` === route.path) {
      // 发送请求获取数据
      findSubCategoryFilter(route.params.id as string).then((res: any) => {
        // 每一组可选的筛选条件确实 全部 条件，处理下数据加上全部
        // 给每一组数据加上一个选中的id
        // 品牌
        res.result.selectedBrand = null;
        res.result.brands.unshift({ id: null, name: "全部" });
        // 属性
        res.result.saleProperties.forEach((item: any) => {
          item.selectedAttr = null;
          item.properties.unshift({ id: null, name: "全部" });
        });

        filterData.value = res.result;
        filterLoading.value = false;
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
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          @click="filterData& & filterData.selectedBrand = item.id"
          href="javascript:;"
          v-for="item in filterData.brands"
          :key="item.id"
          :class="{ active: item.id === filterData.selectedBrand }"
        >
          {{ item.name }}
        </a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}</div>
      <div class="body">
        <a
          @click="item.selectedAttr = prop.id"
          href="javascript:;"
          v-for="prop in item.properties"
          :key="prop.id"
          :class="{ active: prop.id === item.selectedAttr }"
        >
          {{ prop.name }}
        </a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <xgh-skeleton class="item" width="800px" height="40px" />
    <xgh-skeleton class="item" width="800px" height="40px" />
    <xgh-skeleton class="item" width="600px" height="40px" />
    <xgh-skeleton class="item" width="600px" height="40px" />
    <xgh-skeleton class="item" width="600px" height="40px" />
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
  .xgh-skeleton {
    padding: 10px 0;
  }
}
</style>
