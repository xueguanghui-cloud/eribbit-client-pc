<script setup lang="ts">
import HomePanel from "./home-panel.vue";
import { ref } from "vue";
import { findBrand } from "@/api/home";
import type { IBrand } from "@/types/brand";
import XghSkeleton from "@/baseUI/xgh-skeleton.vue";
import { useIntersectionObserver } from "@vueuse/core";

// 获取数据
const target = ref();
const brands = ref<IBrand[]>([]);
// findBrand().then((res: any)=>{
//   brands.value = res.result;
// })

// 使用数据懒加载方式加载数据
const { stop } = useIntersectionObserver(
  target, // 监听的目标元素
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      stop();
      // 调用API函数获取数据
      findBrand(10).then((res: any) => {
        brands.value = res.result;
      });
    }
  }
);

// 切换效果
const index = ref(0);
const toggle = (step: number) => {
  const newIndex = index.value + step;
  if (newIndex < 0 || newIndex > 1) return;
  index.value = newIndex;
};
</script>

<template>
  <div class="home-brand" ref="target">
    <home-panel title="热门品牌" sub-title="国际经典 品质保证">
      <template v-slot:right>
        <a
          @click="toggle(-1)"
          :class="{ disabled: index === 0 }"
          href="javascript:;"
          class="iconfont icon-angle-left prev"
        ></a>
        <a
          @click="toggle(1)"
          :class="{ disabled: index === 1 }"
          href="javascript:;"
          class="iconfont icon-angle-right next"
        ></a>
      </template>
      <div class="box" ref="box">
        <transition name="fade">
          <ul
            v-if="brands.length"
            class="list"
            :style="{ transform: `translateX(${-index * 1240}px)` }"
          >
            <li v-for="brand in brands" :key="brand.id">
              <RouterLink to="/">
                <img v-lazy="brand.picture" :alt="brand.name" />
              </RouterLink>
            </li>
          </ul>
          <div v-else class="skeleton">
            <xgh-skeleton
              class="item"
              v-for="i in 5"
              :key="i"
              animated
              bg="#e4e4e4"
              width="240px"
              height="305px"
            />
          </div>
        </transition>
      </div>
    </home-panel>
  </div>
</template>

<style scoped lang="scss">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: $xghColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
</style>
