<script setup lang="ts">
import { computed } from "vue";
import { useVModel } from "@vueuse/core";

const props = withDefaults(
  defineProps<{
    total: number; // 数据总数
    pageSize: number; // 每页数据数量
    currentPage: number; // 当前页码
    buttonCount?: number; // 按钮个数
  }>(),
  { total: 100, pageSize: 10, currentPage: 1, buttonCount: 5 }
);
const emit = defineEmits(["update:currentPage", "change"]);

// 约定按钮的个数 5个；如果需要是动态的数据，需要设置为响应式数据
// const buttonCount = 5;
// 当前显示的页码;
// const currentPage = ref(1);
// 总条数
// const toal = ref(100);
// const pageSize = ref(10);

// 总页数 = 总条数 / 每页条数 向上取整; 起始页码，结束页码，按钮数组
const pager = computed(() => {
  const totalPageCount = Math.ceil(props.total / props.pageSize);

  // 1. 理想情况：
  const offset = Math.floor(props.buttonCount / 2);
  let start = props.currentPage - offset;
  let end = start + props.buttonCount - 1;
  // 2. 如果起始页码 小于1 的情况
  if (start < 1) {
    start = 1;
    end =
      start + props.buttonCount - 1 > totalPageCount
        ? totalPageCount
        : start + props.buttonCount - 1;
  }
  // 3. 如果结束页码大于总页数
  if (end > totalPageCount) {
    end = totalPageCount;
    start = end - props.buttonCount + 1 < 1 ? 1 : end - props.buttonCount + 1;
  }

  // 求出按钮数组
  const buttonArr: number[] = [];
  for (let i = start; i <= end; i++) buttonArr.push(i);
  return { start, end, buttonArr, totalPageCount };
});

// 使用vueuse的useVModel做数据绑定
const currentPage = useVModel(props, "currentPage", emit);

// 上一页
const previousPage = () => {
  if (currentPage.value <= 1) return;

  const newCurrentPage = currentPage.value--;
  currentPage.value = newCurrentPage;
  // 通知父组件
  emit("change", newCurrentPage);
};
// 下一页
const nextPage = () => {
  if (currentPage.value >= pager.value.totalPageCount) return;
  const newCurrentPage = currentPage.value++;
  console.log("newCurrentPage", newCurrentPage);
  currentPage.value = newCurrentPage;
  // 通知父组件
  emit("change", newCurrentPage);
};

// 切换分页
const changeCurrentPage = (item: number) => {
  const newCurrentPage = item;
  currentPage.value = newCurrentPage;
  // 通知父组件
  emit("change", newCurrentPage);
};
</script>

<template>
  <div class="xgh-pagination">
    <a
      :class="{ disabled: currentPage <= 1 }"
      @click="previousPage"
      href="javascript:;"
      >上一页</a
    >
    <span v-if="pager.start > 1">...</span>
    <a
      v-for="item in pager.buttonArr"
      :class="{ active: item === currentPage }"
      @click="changeCurrentPage(item)"
      :key="item"
      href="javascript:;"
    >
      {{ item }}
    </a>
    <span v-if="pager.end < pager.totalPageCount">...</span>
    <a
      @click="nextPage"
      :class="{ disabled: currentPage >= pager.totalPageCount }"
      href="javascript:;"
    >
      下一页
    </a>
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
