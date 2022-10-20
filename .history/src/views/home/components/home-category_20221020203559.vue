<script setup lang="ts">
import { useCategoryStore } from "@/stores/category";
import { computed, reactive, ref } from "vue";
import { findBrand } from "@/api/home";
import type { IMenuCategory } from "@/types/menuCategory";
import XghSkeleton from "@/baseUI/xgh-skeleton.vue";
// 分类数据 = 9个分类+1个品牌
const categoryStore = useCategoryStore();
const brand = reactive({
  id: "brand",
  name: "品牌",
  children: [
    {
      id: "brand-children",
      name: "品牌推荐",
      goods: [],
      children: [],
      picture: "",
      open: false,
    },
  ],
  brands: [],
});
// 得到9个分类，且每个一级分类只有两个
const menuList: IMenuCategory[] = categoryStore.categoryList.map((item) => {
  return {
    id: item.id,
    name: item.name,
    children: item.children && item.children.slice(0, 2),
    goods: item.goods,
  };
});
menuList.push(brand);

// 实现：得到弹出层的推荐商品数据
const categoryId = ref<string>();
const currCategory = computed(() => {
  return menuList.find((item) => item.id === categoryId.value);
});

// 获取品牌数据
findBrand().then((res: any) => {
  brand.brands = res.result;
});
</script>

<template>
  <div class="home-category" @mouseleave="categoryId = undefined">
    <ul class="menu">
      <li
        v-for="menu in menuList"
        :key="menu.id"
        @mouseenter="categoryId = menu.id"
        :class="{ active: categoryId === menu.id }"
      >
        <RouterLink :to="`category/${menu.id}`">{{ menu.name }}</RouterLink>
        <template v-if="menu.children.length">
          <RouterLink
            v-for="sub in menu.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
            >{{ sub.name }}</RouterLink
          >
        </template>
        <!--  骨架 -->
        <template v-else>
          <XghSkeleton
            width="60px"
            height="18px"
            style="margin-right: 5px"
            bg="rgba(255,255,255,0.2)"
          />
          <XghSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </template>
      </li>
    </ul>
    <!--  弹层  -->
    <div class="layer">
      <h4>
        {{ currCategory && currCategory.id === "brand" ? "品牌" : "分类" }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="good in currCategory.goods" :key="good.id">
          <RouterLink :to="`/category/`">
            <img v-lazy="good.picture" :alt="good.name" />
            <div class="info">
              <p class="name ellipsis-2">{{ good.name }}</p>
              <p class="desc ellipsis">{{ good.desc }}</p>
              <p class="price"><i>¥</i>{{ good.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="brand in currCategory.brands" :key="brand.id">
          <RouterLink to="/">
            <img v-lazy="brand.picture" :alt="brand.name" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ brand.place }}
              </p>
              <p class="name ellipsis">{{ brand.name }}</p>
              <p class="desc ellipsis-2">{{ brand.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background: $xghColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: $priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
  .xgh-skeleton {
    animation: fade 1s linear infinite alternate;
  }
  @keyframes fade {
    from {
      opacity: 0.2;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
