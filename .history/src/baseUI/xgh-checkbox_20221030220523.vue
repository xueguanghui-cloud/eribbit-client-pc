<script setup lang="ts"></script>

<template>
  <div class="xgh-checkbox" @click="changeChecked()">
    <i class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <!-- <span v-if="$slots.default"><slot /></span> -->
  </div>
</template>

<style scoped lang="scss">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: $xtxColor;
    ~ span {
      color: $xtxColor;
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
