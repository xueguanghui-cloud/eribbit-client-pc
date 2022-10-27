<script setup lang="ts">
import { ref, computed } from "vue";
import { findBanner } from "@/api/home";
import type { ISlider } from "@/types/sliders";
import { useCategoryStore } from "@/stores/category";
import { useRoute } from "vue-router";
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
</script>

<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <xgh-bread>
        <xgh-bread-item to="/">首页</xgh-bread-item>
        <xgh-bread-item v-if="topCategory">
          {{ topCategory.name }}
        </xgh-bread-item>
      </xgh-bread>
      <!-- 轮播图 -->
      <xgh-carousel :sliders="sliders"></xgh-carousel>
      <!-- 全部分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
        <h3>全部分类</h3>
        <ul>
          <li v-for="category in topCategory.children" :key="category.id">
            <a href="javascript:;">
              <img
                src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(9).png"
              />
              <p>空调</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类的推荐商品 -->
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
}
</style>
