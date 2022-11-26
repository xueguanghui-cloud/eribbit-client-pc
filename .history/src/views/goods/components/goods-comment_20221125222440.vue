<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import { findCommentInfoByGoods } from "@/api/product";
import type { ICommentInfo } from "@/types/goods/commentInfo";

const route = useRoute();
const commentInfo = ref<ICommentInfo>();
// 获取评价信息
findCommentInfoByGoods(route.params.id as string).then((res: any) => {
  // 设置数据之前，tags 数组前面追加 有图tag, 全部tag
  res.result.tags.unshift({
    tagCount: res.result.hasPictureCount,
    title: "有图",
  });
  res.result.tags.unshift({
    tagCount: res.result.evaluateCount,
    title: "全部评价",
  });
  commentInfo.value = res.result;
});

// 激活tag
const currentTagIndex = ref(0);
</script>

<template>
  <div class="goods-comment" v-if="commentInfo">
    <!-- 评价头部 -->
    <div class="head">
      <div class="data">
        <p>
          <span>{{ commentInfo.salesCount }}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{ commentInfo.praisePercent }}</span>
          <span>好评率</span>
        </p>
      </div>
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a
            v-for="tag in commentInfo.tags"
            :key="tag.title"
            href="javascript:;"
            class="active"
          >
            {{ tag.title }}({{ tag.tagCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" class="active">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
    <!-- 评价内容 -->
    <div class="list"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width: 340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: $priceColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1;
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: $xghColor;
            background: lighten($xghColor, 50%);
            color: $xghColor;
          }
          &.active {
            border-color: $xghColor;
            background: $xghColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,
      &:hover {
        color: $xghColor;
      }
    }
  }
}
</style>
