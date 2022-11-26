<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import goodsItem from "@/views/category/components/goods-item.vue";

const props = withDefaults(defineProps<{ type: number }>(), {
  type: 1,
});
const titleObj: { [key: number]: string } = {
  1: "24小时热销榜",
  2: "周热销榜",
  3: "总热销榜",
};
const title = computed(() => titleObj[props.type]);

// 发送请求，获取数据
const route = useRoute();
const goodsList = ref([]);
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <div v-if="goodsList">
      <goodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  :deep(.goods-item) {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
