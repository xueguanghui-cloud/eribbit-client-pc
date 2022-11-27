<script setup lang="ts">
import { computed, ref } from "vue";

// 约定按钮的个数 5个；如果需要是动态的数据，需要设置为响应式数据
const buttonCount = 5;
// 当前显示的页码;
const myCurrentPage = ref(1);
// 总条数
const myToal = ref(100);
const myPageSize = ref(10);
//总页数 = 总条数 / 每页条数 向上取整; 起始页码，结束页码，按钮数组
const pager = computed(() => {
  const totalPageCount = Math.ceil(myToal.value / myPageSize.value);
  return {};
});
</script>

<template>
  <div class="xgh-pagination">
    <a href="javascript:;" class="disabled">上一页</a>
    <span>...</span>
    <a href="javascript:;" class="active">3</a>
    <a href="javascript:;">4</a>
    <a href="javascript:;">5</a>
    <a href="javascript:;">6</a>
    <a href="javascript:;">7</a>
    <span>...</span>
    <a href="javascript:;">下一页</a>
  </div>
</template>

<style scoped lang="scss">
.xgh-pagination {
  display: flex;
  justify-content: center;
  padding: 30px;
  > a {
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: $xghColor;
    }
    &.active {
      background: $xghColor;
      color: #fff;
      border-color: $xghColor;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>
