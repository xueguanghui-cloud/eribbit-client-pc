<!-- 面包屑 组件 -->
<script setup lang="ts">
defineProps({
  parentPath: {
    type: [String, Object],
    default: "/",
  },
  parentName: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="xgh-bread">
    <div class="xtx-bread-item">
      <RouterLink to="/">首页</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item" v-if="parentName">
      <RouterLink to="/category/10000">电器</RouterLink>
    </div>
    <i class="iconfont icon-angle-right"></i>
    <div class="xtx-bread-item">
      <span>空调</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xgh-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: $xghColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
