<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useMouseInElement } from "@vueuse/core";
type TProps = {
  images: string[];
};

withDefaults(defineProps<TProps>(), {
  images: () => [],
});

const currIndex = ref(0);
// 监听鼠标移动的对象
const target = ref(null);
// 是否显示遮罩层和大图
const show = ref(true);
// 遮罩层坐标
const layerPosition = reactive({
  left: 0,
  top: 0,
});
// 大图的背景定位
const largePosition = reactive({
  backgroundPositionX: 0,
  backgroundPositionY: 0,
});
const { elementX, elementY, isOutside } = useMouseInElement(target);
watch([elementX, elementY, isOutside], () => {
  // 根据得到的数据设置样式数和是否显示数据
  show.value = !isOutside.value;
  const position = { x: 0, y: 0 };
  if (elementX.value < 100) position.x = 0;
  else if (elementX.value > 300) position.x = 200;
  else position.x = elementX.value - 100;

  if (elementY.value < 100) position.y = 0;
  else if (elementY.value > 300) position.y = 200;
  else position.y = elementY.value - 100;
});
</script>

<template>
  <div class="goods-image">
    <div
      class="large"
      v-show="show"
      :style="[{ backgroundImage: `url(${images[currIndex]})` }, layerPosition]"
    ></div>
    <div class="middle" ref="target">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩层 -->
      <div class="layer" v-show="show" :style="layerPosition"></div>
    </div>
    <ul class="small">
      <li
        v-for="(img, i) in images"
        :key="img"
        :class="{ active: i === currIndex }"
      >
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move;
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid $xghColor;
      }
    }
  }
}
</style>
