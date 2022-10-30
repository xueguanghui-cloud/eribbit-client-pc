<script setup lang="ts">
const checked = ref(false);
</script>

<template>
  <div class="xgh-checkbox">
    <i class="iconfont icon-checked"></i>
    <i class="iconfont icon-unchecked"></i>
    <!-- <span v-if="$slots.default"><slot /></span> -->
  </div>
</template>

<style scoped lang="scss">
.xtx-checkbox {
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
