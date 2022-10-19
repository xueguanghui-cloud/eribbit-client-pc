<script setup lang="ts">
import { ref } from "vue";
import { findProduct } from "@/api/home";
import HomeGoods from "./home-goods.vue";
import { useIntersectionObserver } from "@vueuse/core";
import HomePanel from "./home-panel.vue";
import XghMore from "@/baseUI/xgh-more.vue";
import type { IHomeProduct } from "@/types/home/home-product";
const target = ref();
const products = ref<IHomeProduct[]>([]);

// 使用数据懒加载方式加载数据
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      stop();
      // 调用API函数获取数据
      findProduct().then((res: any) => {
        products.value = res.result;
      });
    }
  },
  {
    // 相交比列大于0，就触犯回调
    threshold: 0,
  }
);
</script>

<template>
  <div class="home-product">
    <div class="container" ref="target">
      <home-panel
        :title="product.name"
        v-for="product in products"
        :key="product.id"
      >
        <template #right>
          <div class="sub">
            <RouterLink
              v-for="sub in product.children"
              :key="sub.id"
              :to="`/category/sub/${sub.id}`"
              >{{ sub.name }}</RouterLink
            >
          </div>
          <xgh-more :path="`/category/${product.id}`" />
        </template>
        <div class="box">
          <RouterLink class="cover" :to="`/category/${product.id}`">
            <img :alt="product.name" v-lazy="product.picture" />
            <strong class="label">
              <span>{{ product.name }}馆</span>
              <span>{{ product.saleInfo }}</span>
            </strong>
          </RouterLink>
          <ul class="goods-list">
            <li v-for="good in product.goods" :key="good.id">
              <home-goods :good="good" />
            </li>
          </ul>
        </div>
      </home-panel>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: $xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
