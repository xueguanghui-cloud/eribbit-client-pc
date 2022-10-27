<script setup lang="ts">
import { findBanner } from "@/api/home";
import { ref } from "vue";
import { ISlider } from "@/types/sliders";
// 轮播图数据
const sliders = ref<ISlider[]>();
findBanner().then((res: any) => {
  console.log(res.result);

  sliders = res.result;
});
// 面包屑+子分类数据
</script>

<template>
  <div class="category">
    <div class="container">
      <!-- 面包屑 -->
      <xgh-bread>
        <xgh-bread-item to="/">首页</xgh-bread-item>
        <xgh-bread-item to="/categroy/1000500">电器</xgh-bread-item>
        <xgh-bread-item>空调</xgh-bread-item>
      </xgh-bread>
      <!-- 轮播图 -->
      <xgh-carousel :sliders="[]"></xgh-carousel>
      <!-- 全部分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in 8" :key="i">
            <a href="javascript:;">
              <img
                src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(9).png"
              />
              <p>空调</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类的推荐商品 -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: $xghColor;
          }
        }
      }
    }
  }
}
</style>
