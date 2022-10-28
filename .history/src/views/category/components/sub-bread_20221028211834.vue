<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCategoryStore } from "@/stores/category";
import { computed } from "vue";
import type { ICategory } from "@/types/category/category";
interface ISub {
  id: string;
  name: string;
}
interface ICate {
  top: ISub;
  sub: ISub;
}
// 通过计算属性从vuex获取顶级和二级类目的信息
// 数据对象：{ top: {id, name}, sub: {id  , name} }
const route = useRoute();
const categoryStore = useCategoryStore();
const category = computed(() => {
  const cate: ICate = {
    top: { id: "", name: "" },
    sub: { id: "", name: "" },
  };
  categoryStore.categoryList.forEach((top: ICategory) => {
    if (top.children) {
      const sub = top.children.find(
        (sub: ICategory) => sub.id === route.params.id
      );
      if (sub) {
        cate.top = { id: top.id, name: top.name };
        cate.sub = { id: sub.id, name: sub.name };
      }
    }
  });
  return cate;
});
</script>

<template>
  <xgh-bread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{
      category.top.name
    }}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem key="">空调</XtxBreadItem>
    </Transition>
  </xgh-bread>
</template>

<style scoped lang="scss"></style>
