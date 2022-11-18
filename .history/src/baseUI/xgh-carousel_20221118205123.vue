<script setup lang="ts">
import { defineProps, onUnmounted, ref, watch, withDefaults } from "vue";
import type { ISlider } from "@/types/sliders";
import type { IGood } from "@/types/good";

type TSlider = {
  sliders: ISlider[] | IGood[][];
  duration?: number;
  autoPlay?: boolean;
};
const props = withDefaults(defineProps<TSlider>(), {
  sliders: () => [], // 图片数据
  duration: 3000, // 自动播放时间间隔 ms
  autoPlay: false, // 是否自动播放
});

// 控制显示图片索引
const shouSliderIndex = ref(0);

// 自动轮播图的逻辑
let timer: any;
const autoPlayFun = () => {
  // 防止定时器重复叠加
  timer && clearInterval(timer);
  // 自动播放，时间间隔
  timer = setInterval(() => {
    shouSliderIndex.value++;
    if (shouSliderIndex.value >= props.sliders.length) {
      shouSliderIndex.value = 0;
    }
  }, props.duration);
};

// 需要监听sliders数据变化，判断如果 autoPlay 为true,才执行 autoPlayFun()
watch(
  () => props.sliders,
  (newValue) => {
    if (newValue.length && props.autoPlay) {
      autoPlayFun();
    }
  },
  { immediate: true }
);

// 如果有自动播放，鼠标进入离开，暂停，开启
const stop = () => {
  if (timer) clearInterval(timer);
};

const start = () => {
  if (props.sliders.length && props.autoPlay) {
    autoPlayFun();
  }
};

// 点击箭头切换图
const toggle = (step: number) => {
  const newIndex = shouSliderIndex.value + step;
  if (newIndex > props.sliders.length - 1) {
    shouSliderIndex.value = 0;
    return;
  }
  if (newIndex < 0) {
    shouSliderIndex.value = props.sliders.length - 1;
    return;
  }
  shouSliderIndex.value = newIndex;
};

// 组件卸载时，销毁定时器
onUnmounted(() => {
  timer && clearInterval(timer);
});
</script>

<template>
  <div class="xgh-carousel" @mouseleave="start" @mouseenter="stop">
    <!--  fade 显示的图片加上  -->
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(slider, index) in sliders"
        :key="slider.id"
        :class="{ fade: shouSliderIndex === index }"
      >
        <!-- 图片 -->
        <RouterLink v-if="slider.imgUrl" :to="slider.hrefUrl">
          <img v-lazy="slider.imgUrl" :alt="slider.imgUrl" />
        </RouterLink>
        <!-- 商品列表 -->
        <div class="slider" v-else>
          <router-link
            v-for="good in slider"
            :key="good.id"
            :to="`/product/${good.id}`"
          >
            <img :src="good.picture" alt="" />
            <p class="name ellipsis">{{ good.name }}</p>
            <p class="price">{{ good.price }}</p>
          </router-link>
        </div>
      </li>
    </ul>
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <!-- active 激活指示器 -->
      <!-- 点击指示器，切换 -->
      <span
        v-for="(slider, index) in sliders"
        :key="slider.id"
        @click="shouSliderIndex = index"
        :class="{ active: shouSliderIndex === index }"
      ></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xgh-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
// 轮播商品
.slider {
  display: flex;
  justify-content: space-around;
  padding: 0 40px;
  > a {
    width: 240px;
    text-align: center;
    img {
      padding: 20px;
      width: 230px !important;
      height: 230px !important;
    }
    .name {
      font-size: 16px;
      color: #666;
      padding: 0 40px;
    }
    .price {
      font-size: 16px;
      color: $priceColor;
      margin-top: 15px;
    }
  }
}
</style>
