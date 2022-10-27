<script setup lang="ts"></script>

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
      <xgh-carousel :sliders="sliders"></xgh-carousel>
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

<style scoped lang="scss"></style>
