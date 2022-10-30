<script setup lang="ts">
import { ref } from "vue";
// v-model ===> :modelValue + @update:modelValue
const checked = ref(false);
defineProps({ modelValue: { type: Boolean, default: false } });

// 使用 watch 得到父组件传递的数据，给checked数据
const changeChecked = () => {
  checked.value = !checked.value;
};
</script>

<template>
  <div class="xgh-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<style scoped lang="scss">
.xgh-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $xghColor;
    ~ span {
      color: $xghColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
