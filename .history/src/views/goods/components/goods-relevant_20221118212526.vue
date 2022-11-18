<script setup lang="ts">
import { findRelevantGoods } from "@/api/product";
import type { IGood } from "@/types/good";
import { ref } from "vue";

const props = defineProps({
  goodsId: {
    type: String,
    default: "",
  },
});
// 最终需要的数据是 sliders 提供给轮播图使用
// 数据的结构: slider = [[4],[4],[4]]

const sliders = ref<IGood[][]>([]);
findRelevantGoods(props.goodsId).then((res: any) => {
  const pageSize = 4;
  const pageTotal = Math.ceil(res.result.length / pageSize);
  for (let i = 0; i < pageTotal; i++) {
    sliders.value.push(res.result.slice(pageSize * i, pageSize * (i + 1)));
  }
});
</script>

<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造 后的xgh-carousel.vue -->
    <xgh-carousel :sliders="sliders"></xgh-carousel>
  </div>
</template>

<style scoped lang="scss">
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid $xghColor;
      border-right: 4px solid $xghColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten($xghColor, 40%);
      }
    }
  }
}
:deep(.xtx-carousel) {
  height: 380px;
  .carousel {
    &-indicator {
      bottom: 30px;
      span {
        &.active {
          background: @xtxColor;
        }
      }
    }
    &-btn {
      top: 110px;
      opacity: 1;
      background: rgba(0, 0, 0, 0);
      color: #ddd;
      i {
        font-size: 30px;
      }
    }
  }
}
</style>
