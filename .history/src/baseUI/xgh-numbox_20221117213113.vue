<script setup lang="ts">
import { useVModel } from "@vueuse/core";

defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  min: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(["emit"]);
// 绑定按钮的点击事件
// 使用vueuse的useVModel做数据绑定
const count = useVModel(props, "modelValue", emit);
const changeNum = (step: number) => {
  const newValue = count.value + step;
};
</script>

<template>
  <div class="xgh-numbox">
    <div class="label">数量</div>
    <div class="numbox">
      <a @click="changeNum(-1)" href="javascript:;">-</a>
      <input type="text" readonly :value="modelValue" />
      <a @click="changeNum(+1)" href="javascript:;">+</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xgh-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
