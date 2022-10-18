<script setup lang="ts">
import {useCategoryStore} from "@/stores/category";
import AppNavBar from "@/components/app-navbar.vue"
import AppHeader from  "@/components/app-header.vue"
import AppFooter from  "@/components/app-footer.vue"
import AppHeaderSticky from "@/components/app-header-sticky.vue"


// 获取分类数据
const categoryStore = useCategoryStore()
categoryStore.getCategoryList();
</script>

<template>
  <app-nav-bar />
  <app-header-sticky />
  <app-header />
  <div class="app-body">
    <!-- 二级路由-->
    <RouterView />
  </div>
  <app-footer />

</template>



<style scoped lang="scss">
.app-body{
  min-height: 500px;
}
</style>
