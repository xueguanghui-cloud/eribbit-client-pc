<script setup lang="ts">
import { useRoute } from "vue-router";
import SubBread from "./components/sub-bread.vue";
import { useCategoryStore } from "@/stores/category";
import { computed } from "vue";
import type { ICategory } from "@/types/category/category";
interface ISub {
  id: "";
  name: "string";
}
interface ICate {
  top: ISub;
  sun: ISub;
}
// 通过计算属性从vuex获取顶级和二级类目的信息
// 数据对象：{ top: {id, name}, sub: {id  , name} }
const route = useRoute();
const categoryStore = useCategoryStore();
const category = computed(() => {
  const cate: ICate = {};
  categoryStore.categoryList.forEach((top: ICategory) => {
    if (top.children) {
      const sub = top.children.find(
        (sub: ICategory) => sub.id === route.params.id
      );
      if (sub) {
        cate.top = { id: top.id, name: top.name };
      }
    }
  });
  return cate;
});
</script>

<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
