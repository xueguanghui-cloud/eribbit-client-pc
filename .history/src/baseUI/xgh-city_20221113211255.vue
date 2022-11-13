<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

// 显示隐藏数据
const visible = ref(false);

// 提供打开和关闭的方法
const open = () => {
  visible.value = true;
};
const close = () => {
  visible.value = false;
};
// 提供一个切换函数给select使用
const toggle = () => {
  visible.value ? close() : open();
};

// 点击组件外部元素 进行关闭操作
const target = ref(null);
onClickOutside(target, () => {
  close();
});

// 获取省市区数据函数
const getCityData = () => {};
</script>

<template>
  <div class="xgh-city" ref="target" @click="toggle">
    <div class="select" :class="{ active: visible }">
      <span class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <span class="ellipsis" v-for="i in 24" :key="i">北京市</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xgh-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>
