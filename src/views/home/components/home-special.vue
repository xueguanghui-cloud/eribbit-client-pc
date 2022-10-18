<script setup lang="ts">
import {ref} from "vue";
import {findSpecial} from "@/api/home"
import type { IHomeSpecial } from "@/types/home/home-special"
import {useIntersectionObserver} from "@vueuse/core";
import HomePanel from "@/views/home/components/home-panel.vue";


const target = ref()
const specials = ref<IHomeSpecial[]>([])

// 使用数据懒加载方式加载数据
const { stop } = useIntersectionObserver(
    target, // 监听的目标元素
    ([{ isIntersecting }], observerElement) => {
      if(isIntersecting){
        stop()
        // 调用API函数获取数据
        findSpecial().then((res: any) => {
          specials.value = res.result
        })
      }
    },
)

</script>

<template>
  <home-panel title="最新专题" ref="target">
    <template #:right><xgh-more /></template>
    <div class="special-list" ref="homeSpecial">
      <div class="special-item" v-for="special in specials" :key="special.id">
        <RouterLink :to="`/special/${special.id}`">
          <img :src="special.cover" :alt="special.title" />
          <div class="meta">
            <p class="title">
              <span class="top ellipsis">{{ special.title }}</span>
              <span class="sub ellipsis">{{ special.summary }}</span>
            </p>
            <span class="price">&yen;{{ special.lowestPrice }}起</span>
          </div>
        </RouterLink>
        <div class="foot">
          <span class="like"><i class="iconfont icon-hart1"></i>{{ special.collectNum }}</span>
          <span class="view"><i class="iconfont icon-see"></i>{{ special.viewNum }}</span>
          <span class="reply"><i class="iconfont icon-message"></i>{{ special.replyNum }}</span>
        </div>
      </div>
    </div>
  </home-panel>
</template>

<style scoped lang="scss">
.home-panel {
  background: #f5f5f5;
}
.special-list {
  height: 380px;
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
  .special-item {
    width: 404px;
    background: #fff;
     @include hoverShadow();
    a {
      display: block;
      width: 100%;
      height: 288px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .meta {
        background-image: linear-gradient(to top,rgba(0, 0, 0, 0.8),transparent 50%);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 288px;
        .title {
          position: absolute;
          bottom: 0px;
          left: 0;
          padding-left: 16px;
          width: 70%;
          height: 70px;
          .top {
            color: #fff;
            font-size: 22px;
            display: block;
          }
          .sub {
            display: block;
            font-size: 19px;
            color: #999;
          }
        }
        .price {
          position: absolute;
          bottom: 25px;
          right: 16px;
          line-height: 1;
          padding: 4px 8px 4px 7px;
          color: $priceColor;
          font-size: 17px;
          background-color: #fff;
          border-radius: 2px;
        }
      }
    }
    .foot {
      height: 72px;
      line-height: 72px;
      padding: 0 20px;
      font-size: 16px;

      i {
        display: inline-block;
        width: 15px;
        height: 14px;
        margin-right: 5px;
        color: #999;
      }
      .like,
      .view {
        float: left;
        margin-right: 25px;
        vertical-align: middle;
      }
      .reply {
        float: right;
        vertical-align: middle;
      }
    }
  }
}
</style>
