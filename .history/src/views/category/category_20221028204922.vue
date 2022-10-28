<script setup lang="ts">
import { ref, computed } from "vue";
import { findBanner } from "@/api/home";
import { findTopCategory } from "@/api/category";
import type { ISlider } from "@/types/sliders";
import type { ISubList } from "@/types/category/topCategorySubList";
import { useCategoryStore } from "@/stores/category";
import { useRoute } from "vue-router";
import GoodsItem from "./components/goods-item.vue";
// 轮播图数据
const sliders = ref<ISlider[]>();
findBanner().then((res: any) => {
  sliders.value = res.result;
});
// 面包屑+子分类数据
const route = useRoute();
const categoryStore = useCategoryStore();
const topCategory = computed(() => {
  // 顶级路由分类 ==> 根据路由上的ID去vuex中category模块的categoryList中查找
  const cate = categoryStore.categoryList.find((item) => {
    return item.id === route.params.id;
  });
  return cate;
});

// 各个子类目下推荐商品
const subList = ref<ISubList[]>();
findTopCategory(route.params.id as string).then((res: any) => {
  subList.value = res.result.children;
});

watch(
  () => route.params.id,
  (newValue: string) => {
    newValue && getSubList();
  }
);
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <xgh-bread>
        <xgh-bread-item to="/">首页</xgh-bread-item>
        <transition name="fade-right" mode="out-in">
          <xgh-bread-item v-if="topCategory" :key="topCategory.id">
            {{ topCategory.name }}
          </xgh-bread-item>
        </transition>
      </xgh-bread>
      <!-- 轮播图 -->
      <div class="category-banner">
        <xgh-carousel :sliders="sliders"></xgh-carousel>
      </div>
      <!-- 全部分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类的推荐商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <goods-item v-for="good in sub.goods" :key="good.id" :good="good" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .category-banner {
    height: 500px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xghColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
