<script setup lang="ts">
import HomeCategory from "./components/home-category.vue"
import HomeBanner from "./components/home-banner.vue"
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
    <!--  人气推荐  -->
  </div>
</template>

<style scoped lang="scss">

</style>
