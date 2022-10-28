<script setup lang="ts">
import SubBread from "./components/sub-bread.vue";
// 通过计算属性从vuex获取顶级和二级类目的信息
// 数据对象：{ top: {id, name}, sub: {id:name} }
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
