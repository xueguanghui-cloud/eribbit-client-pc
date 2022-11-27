<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findCommentInfoByGoods, findCommentListByGoods } from "@/api/product";
import goodsCommentImage from "./goods-comment-image.vue";
import type {
  ICommentInfo,
  IRequestParams,
  ICommentList,
} from "@/types/goods/good-comment";

const route = useRoute();

// 定义转换数据的函数（对应vue2.0的过滤器）
const formatSpecs = (specs: { name: string; nameValue: string }[]) => {
  return specs
    .reduce(
      (previousValue, currentValue) =>
        `${previousValue} ${currentValue.name}: ${currentValue.nameValue}`,
      ""
    )
    .trim();
};

// 格式化昵称：省吃俭用 => 省****用
const formatNickName = (nickName: string) => {
  return nickName.substring(0, 1) + "****" + nickName.slice(-1);
};

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
const changeTag = (index: number) => {
  currentTagIndex.value = index;
  // 修改requestParams中的tag,并且将页码重置为1
  requestParams.page = 1;
  switch (index) {
    case 0: // 全部评价
      requestParams.hasPicture = null;
      requestParams.tag = null;
      break;
    case 1: // 有图
      requestParams.hasPicture = true;
      requestParams.tag = null;
      break;
    default: // 正常tag
      requestParams.hasPicture = null;
      requestParams.tag = commentInfo.value!.tags[index].title;
      break;
  }
};

// 修改排序条件
const changeSortField = (type: string | null) => {
  requestParams.page = 1;
  requestParams.sortField = type;
};

// 准备筛选条件数据
const requestParams = reactive<IRequestParams>({
  page: 1,
  pageSize: 10,
  hasPicture: null,
  tag: null,
  // 排序方式
  sortField: null, // [praiseCount: 热度,createTime： 最新]
});

// 初始化需要发送请求，筛选条件发生改变时发送请求，获取评价列表
const total = ref(0);
const commentList = ref<ICommentList[]>([]);
watch(
  requestParams,
  () => {
    // 页码重置为1
    findCommentListByGoods(route.params.id as string, requestParams).then(
      (res: any) => {
        total.value = res.result.counts;
        commentList.value = res.result.items;
      }
    );
  },
  {
    immediate: true,
  }
);
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
            v-for="(tag, index) in commentInfo.tags"
            :key="tag.title"
            href="javascript:;"
            @click="changeTag(index)"
            :class="{ active: currentTagIndex === index }"
          >
            {{ tag.title }}({{ tag.tagCount }})
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a
        @click="changeSortField(null)"
        :class="{ active: requestParams.sortField === null }"
        href="javascript:;"
      >
        默认
      </a>
      <a
        @click="changeSortField('createTime')"
        :class="{ active: requestParams.sortField === 'createTime' }"
        href="javascript:;"
      >
        最新
      </a>
      <a
        @click="changeSortField('praiseCount')"
        :class="{ active: requestParams.sortField === 'praiseCount' }"
        href="javascript:;"
      >
        最热
      </a>
    </div>
    <!-- 评价内容 -->
    <div class="list">
      <div class="item" v-for="comment in commentList" :key="comment.id">
        <div class="user">
          <img :src="comment.member.avatar" alt="" />
          <span>{{ formatNickName(comment.member.nickname) }}</span>
        </div>

        <div class="body">
          <div class="score">
            <i
              v-for="score in comment.score"
              :key="score + 's'"
              class="iconfont icon-wjx01"
            ></i>
            <i
              v-for="score in 5 - comment.score"
              :key="score + 'k'"
              class="iconfont icon-wjx02"
            ></i>
            <span class="attr">{{ formatSpecs(comment.orderInfo.specs) }}</span>
          </div>
          <div class="text">
            {{ comment.content }}
          </div>
          <goodsCommentImage
            v-if="comment.pictures.length"
            :pictures="comment.pictures"
          ></goodsCommentImage>
          <div class="time">
            <span>{{ comment.createTime }}</span>
            <span class="zan"
              ><i class="iconfont icon-dianzan"></i
              >{{ comment.praiseCount }}</span
            >
          </div>
        </div>
      </div>
    </div>
    <xgh-pagination :total="total"></xgh-pagination>
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
  .list {
    padding: 0 20px;
    .item {
      display: flex;
      padding: 25px 10px;
      border-bottom: 1px solid #f5f5f5;
      .user {
        width: 160px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
        }
        span {
          padding-left: 10px;
          color: #666;
        }
      }
      .body {
        flex: 1;
        .score {
          line-height: 40px;
          .iconfont {
            color: #ff9240;
            padding-right: 3px;
          }
          .attr {
            padding-left: 10px;
            color: #666;
          }
        }
      }
      .text {
        color: #666;
        line-height: 24px;
      }
      .time {
        color: #999;
        display: flex;
        justify-content: space-between;
        margin-top: 5px;
      }
    }
  }
}
</style>
