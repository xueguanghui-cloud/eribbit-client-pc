<script setup lang="ts">
import HomeCategory from "./components/home-category.vue";
import HomeBanner from "./components/home-banner.vue";
import HomeNew from "./components/home-new.vue";
import HomeHot from "./components/home-hot.vue";
import HomeBrand from  "./components/home-brand.vue"
import HomeProduct from "./components/home-product.vue"
import HomeSpecial from "./components/home-special.vue"

</script>

<template>
  <!--  首页入口文件（分类 + 广告）-->
  <div class="home-entry">
    <div class="container">
      <div class="home-entry">
        <!--  左侧分类  -->
        <home-category></home-category>
        <!--  轮播图-->
        <home-banner></home-banner>
      </div>
    </div>
    <!--  新鲜好物  -->
    <home-new></home-new>
    <!--  人气推荐  -->
    <home-hot></home-hot>
    <!--  品牌推荐  -->
    <home-brand></home-brand>
    <!--  产品区块  -->
    <home-product></home-product>
    <!--  最新推荐  -->
    <home-special></home-special>
  </div>
</template>

<style scoped lang="scss">
/*
  使用 Transaction 组件实现动画，一个元素或者组件（显示|隐藏，创建|移除）
  进入（进入前 v-enter(vue3: v-enter-from)，进入中 v-enter-active，进入后 v-enter-to）
  离开（离开前 v-leave(vue3: v-leave-from)，离开中 v-leave-active，离开后 v-leaver-to）
*/
</style>
