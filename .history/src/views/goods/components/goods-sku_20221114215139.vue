<script setup lang="ts">
import type { IGoods } from "@/types/goods/goods";

type TGoods = {
  goods: IGoods | undefined;
};
const props = withDefaults(defineProps<TGoods>(), {
  goods: undefined,
});
</script>

<template>
  <div class="goods-sku" v-if="goods">
    <dl v-for="spec in goods.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template>
          <img class="selected" :src="val." alt="" />
          <img
            class="disabled"
            src="https://yanxuan-item.nosdn.127.net/d77c1f9347d06565a05e606bd4f949e0.png"
            alt=""
          />
        </template>
      </dd>
    </dl>
    <dl>
      <dt>尺寸</dt>
      <dd>
        <span class="disabled">10英寸</span>
        <span class="selected">20英寸</span>
        <span>30英寸</span>
      </dd>
    </dl>
    <dl>
      <dt>版本</dt>
      <dd>
        <span>美版</span>
        <span>港版</span>
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
