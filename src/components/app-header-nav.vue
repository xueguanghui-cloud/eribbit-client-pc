<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
const categoryStore = useCategoryStore();
// 分类数据
const { categoryList } = storeToRefs(categoryStore);
/*
 * 跳转的时候不会关闭二级类目，通过数据来控制
 * 1. 每个分类加上 open 属性
 * 2. 提供显示和隐藏函数，修改 open 属性
 * 3. 在组件中使用store中的函数，使用事件来绑定，提供一个显示隐藏的类名。
 * */

const show = (id: string) => {
  categoryStore.show(id);
};
const hide = (id: string) => {
  categoryStore.hide(id);
};
</script>

<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <!-- 细节：在点击二级类目的时候，页面滚动到顶部，造成进入一级类名事件触发，显示其对应二级弹窗，所以将mousenter改为mousemove -->
    <li
      v-for="item in categoryList"
      :key="item.id"
      @mousemove="show(item.id)"
      @mouseleave="hide(item.id)"
    >
      <router-link :to="'/category/' + item.id" @click="hide(item.id)">{{
        item.name
      }}</router-link>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="child in item.children" :key="child.id">
            <router-link
              :to="'/category/sub/' + child.id"
              @click="hide(item.id)"
            >
              <img v-lazy="child.picture" :alt="child.name" />
              <p>{{ child.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.app-header-nav {
  width: 820px;
  display: flex;
  justify-content: space-around;
  padding-left: 40px;
  position: relative;
  z-index: 998;
  > li {
    margin-right: 40px;
    width: 38px;
    text-align: center;
    > a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;
    }
    &:hover {
      > a {
        color: $xghColor;
        border-bottom: 1px solid $xghColor;
      }
      // 显示二级类目
      //> .layer {
      //  height: 132px;
      //  opacity: 1;
      //}
    }
    .layer {
      &.open {
        height: 132px;
        opacity: 1;
      }
      width: 1240px;
      background-color: #fff;
      position: absolute;
      left: -210px;
      top: 56px;
      height: 0;
      overflow: hidden;
      opacity: 0;
      box-shadow: 0 0 5px #ccc;
      transition: all 0.2s 0.1s;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding: 0 70px;
        align-items: center;
        height: 132px;
        li {
          width: 110px;
          text-align: center;
          img {
            width: 60px;
            height: 60px;
          }
          p {
            padding-top: 10px;
          }
          &:hover {
            p {
              color: $xghColor;
            }
          }
        }
      }
    }
  }
}
</style>
