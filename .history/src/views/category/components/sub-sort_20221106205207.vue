<script setup lang="ts">
// 实现交互(实现交互的数据和后台保持一致)

import { reactive } from "vue";
interface ISortParams {
  inventory: boolean;
  onlyDiscount: boolean;
  sortField: null | string;
  sortMethod: null | string;
}

const emit = defineEmits(["sort-change"]);
// 1. 明确交换数据
const sortParams = reactive<ISortParams>({
  inventory: false,
  onlyDiscount: false,
  sortField: null,
  sortMethod: null,
});
// 2. 绑定按钮的点击事件,修改排序字段和排序方式
const changeSort = (sortField: string | null) => {
  if (sortField === "price") {
    sortParams.sortField = sortField;
    // 处理排序
    if (sortParams.sortMethod === null) {
      sortParams.sortMethod = "desc";
    } else {
      sortParams.sortMethod = sortParams.sortMethod === "desc" ? "asc" : "desc";
    }
  } else {
    // 如果已经选中,阻止再次选中
    if (sortParams.sortField === sortField) return;
    sortParams.sortField = sortField;
    sortParams.sortMethod = null;
  }
};

// 触发 sort-change 事件
emit("sort-change", sortParams);

const changeCheck = () => {
  emit("sort-change", sortParams);
};
</script>

<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
      >
        默认排序
      </a>
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
      >
        最新商品
      </a>
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
      >
        最高人气
      </a>
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
      >
        评论最多
      </a>
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <xgh-checkbox @change="changeCheck" v-model="sortParams.inventory">
        仅显示有货商品
      </xgh-checkbox>
      <xgh-checkbox @change="changeCheck" v-model="sortParams.onlyDiscount">
        仅显示特惠商品
      </xgh-checkbox>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: $xghColor;
        border-color: $xghColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: $xghColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: $xghColor;
          }
        }
      }
    }
  }
  .check {
    .xgh-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
