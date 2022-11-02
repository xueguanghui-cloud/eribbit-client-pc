<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

const emit = defineEmits(["infinite"]);
const props = defineProps({
  loading: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
});

const target = ref(null);
// 监听 target 是否进入可视区
const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      console.log("进入可视区");
      // 触发加载事件条件: 请求完成(loading: false), 数据未加载完毕(finished: false)
      if (!props.loading && !props.finished) {
        emit("infinite");
      }
    }
  },
  {
    threshold: 0,
  }
);
</script>

<template>
  <div class="xgh-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xgh-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 50px;
      height: 50px;
      background: url(../assets/image/loading.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    .img {
      width: 200px;
      height: 134px;
      background: url(../assets/image/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>
