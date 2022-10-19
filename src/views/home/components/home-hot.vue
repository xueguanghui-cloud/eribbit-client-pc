<script setup lang="ts">
import {ref} from "vue";
import HomePanel from "./home-panel.vue"
import {findHot, findNew} from "@/api/home";
import type {IHomeHot} from "@/types/home/home-hot";
import HomeSkeleton from "./home-skeleton.vue";
import {useIntersectionObserver} from "@vueuse/core";
const target = ref();
const list = ref<IHomeHot[]>([]);
// findHot().then((res: any) => {
//   list.value = res.result
// })

// 使用数据懒加载方式加载数据
const { stop } = useIntersectionObserver(
    target, // 监听的目标元素
    ([{ isIntersecting }], observerElement) => {
      if(isIntersecting){
        stop()
        // 调用API函数获取数据
        findHot().then((res: any) => {
          list.value = res.result
        })
      }
    },
)
</script>

<template>
<div class="home-hot" ref="target">
  <home-panel title="人气推荐" sub-title="人气爆款 不容错过">
    <!--  主要内容  -->
    <transition name="fade">
      <ul v-if="list.length" ref="panel" class="goods-list">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img v-lazy="item.picture" :alt="item.alt">
            <p class="name">{{item.title}}</p>
            <p class="desc">{{item.alt}}</p>
          </RouterLink>
        </li>
      </ul>
      <home-skeleton v-else></home-skeleton>
    </transition>
  </home-panel>
</div>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    @include hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
