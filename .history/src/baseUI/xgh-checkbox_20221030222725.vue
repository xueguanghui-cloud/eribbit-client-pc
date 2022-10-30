<!-- <script setup lang="ts">
// 基本实现
import { ref, watch } from "vue";
// v-model ===> :modelValue + @update:modelValue
const checked = ref(false);
const emits = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: { type: Boolean, default: false } });

const changeChecked = () => {
  checked.value = !checked.value;
  // 使用emit通知父组件数据的改变
  emits("update:modelValue", checked.value);
};

// 使用 watch 得到父组件传递的数据，给checked数据
watch(
  () => props.modelValue,
  () => {
    checked.value = props.modelValue;
  },
  { immediate: true }
);
</script> -->

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({ modelValue: { type: Boolean, default: false } });
const checked = useVModel(props, "modelValue", emit);
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
