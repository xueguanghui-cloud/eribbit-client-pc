<script setup lang="ts">
import {onMounted, ref} from "vue";
import {findNew} from "@/api/home";
import type {IHomeNew} from "@/types/home/home-new";
import HomePanel from "./home-panel.vue";
import HomeSkeleton from "./home-skeleton.vue"
import {useIntersectionObserver} from "@vueuse/core";
const target = ref();
const goods = ref<IHomeNew[]>([])
// findNew().then((res: any) => {
//   goods.value = res.result;
// })
// 使用数据懒加载方式加载数据
const { stop } = useIntersectionObserver(
    target, // 监听的目标元素
    ([{ isIntersecting }], observerElement) => {
      if(isIntersecting){
        stop()
        // 调用API函数获取数据
        findNew().then((res: any) => {
          goods.value = res.result
        })
      }
    },
)

</script>

<template>
<div class="home-new" ref="target">
  <home-panel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <template #right><xgh-more path="/"></xgh-more></template>
    <div style="position: relative; height: 426px">
      <!--  主要内容  -->
      <transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink :to="`/product/${item.id}`">
              <img :src="item.picture" :alt="item.name">
              <p class="name ellipsis">{{item.name}}</p>
              <p class="price">&yen;{{item.price}}</p>
            </RouterLink>
          </li>
        </ul>
        <home-skeleton bg="#f0f9f4" v-else></home-skeleton>
      </transition>
    </div>
  </home-panel>
</div>
</template>

<style scoped lang="scss">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    @include hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: $priceColor;
    }
  }
}
</style>
