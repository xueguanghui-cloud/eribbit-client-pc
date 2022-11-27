<script setup lang="ts">
import { computed, ref } from "vue";

// 约定按钮的个数 5个；如果需要是动态的数据，需要设置为响应式数据
const buttonCount = 5;
// 当前显示的页码;
const myCurrentPage = ref(1);
// 总条数
const myToal = ref(100);
const myPageSize = ref(10);
// 总页数 = 总条数 / 每页条数 向上取整; 起始页码，结束页码，按钮数组
const pager = computed(() => {
  const totalPageCount = Math.ceil(myToal.value / myPageSize.value);

  // 1. 理想情况：
  const offset = Math.floor(buttonCount / 2);
  let start = myCurrentPage.value - offset;
  let end = start + buttonCount - 1;
  // 2. 如果起始页码 小于1 的情况
  if (start < 1) {
    start = 1;
    end =
      start + buttonCount - 1 > totalPageCount
        ? totalPageCount
        : start + buttonCount - 1;
  }
  // 3. 如果结束页码大于总页数
  if (end > totalPageCount) {
    end = totalPageCount;
    start = end - buttonCount + 1 < 1 ? 1 : end - buttonCount + 1;
  }

  // 求出按钮数组
  const buttonArr: number[] = [];
  for (let i = start; i <= end; i++) buttonArr.push(i);
  return { start, end, buttonArr };
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
