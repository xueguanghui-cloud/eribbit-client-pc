<script setup lang="ts">
import type { IGoods, IValue } from "@/types/goods/goods";

type TGoods = {
  goods: IGoods | undefined;
};
withDefaults(defineProps<TGoods>(), {
  goods: undefined,
});
// 选中与取消选中,约定在每一个按钮都拥有自己的选中状态数据:selected
// 点击的是已选中,只需要取消当前选中,点击的是未选中,把同一个规格的按钮改为未选中,当前点击的改为选中
const selectSku = (value: IValue, values: IValue[]) => {
  if (value.selected) {
    value.selected = false;
  } else {
    values.forEach((value: any) => {
      value.selected = false;
    });
    value.selected = true;
  }
};
</script>

<template>
  <div class="goods-sku" v-if="goods">
    <dl v-for="spec in goods.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values" :key="value.name">
          <img
            :class="{ selected: value.selected }"
            @click="selectSku(value, spec.values)"
            v-if="value.picture"
            :src="value.picture"
            :title="value.name"
          />
          <span
            v-else
            :class="{ selected: value.selected }"
            @click="selectSku(value, spec.values)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin() {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: $xghColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        @include sku-state-mixin();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        @include sku-state-mixin();
      }
    }
  }
}
</style>
