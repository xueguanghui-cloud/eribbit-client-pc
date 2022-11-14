<script setup lang="ts">
import axios from "axios";
import { ref, computed, reactive } from "vue";
import { onClickOutside } from "@vueuse/core";
import type { ICity } from "@/types/city";

defineProps({
  fullLocation: {
    type: String,
    default: "",
  },
});

// 显示隐藏数据
const visible = ref(false);

// 所有省市区数据
const allCiytData = ref<ICity[]>([]);
// 是否正在加载数据
const loading = ref(false);

// 提供打开和关闭的方法
const open = () => {
  visible.value = true;
  loading.value = true;
  getCityData().then((res: ICity[]) => {
    allCiytData.value = res;
    loading.value = false;
  });
};
const close = () => {
  visible.value = false;
};
// 提供一个切换函数给select使用
const toggle = () => {
  visible.value ? close() : open();
};

// 点击组件外部元素 进行关闭操作
const target = ref(null);
onClickOutside(target, () => {
  close();
});

// 获取省市区数据函数
const getCityData = () => {
  // 数据：https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
  // 1. 当本地没有缓存，发送请求获取数据 - 异步
  // 2. 当本地有缓存，取出本地数据 - 同步
  // 3. 返回Promise，在then中获取数据，原因：可能是同步数据或异步数据
  return new Promise<ICity[]>((resolve) => {
    // 约定：数据存储在window上的cityData字段
    if (window.cityData) {
      resolve(window.cityData);
    } else {
      const url =
        "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json";
      axios.get(url).then((res: any) => {
        window.cityData = res.data;
        resolve(res.data);
      });
    }
  });
};

// 实现计算属性：获取当前显示的地区数据
const currCityList = computed(() => {
  // 默认省级
  const list = allCiytData.value;
  // 可能：市级城市
  // 可能：县区级城市
  return list;
});

// 定义选择的 省市区 数据
const changeResult = reactive({
  provinceCode: "",
  provinceName: "",
  cityCode: "",
  cityName: "",
  countyCode: "",
  countyName: "",
  fullLocation: "",
});
// 当点击按钮的时候
</script>

<template>
  <div class="xgh-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span class="placeholder" v-if="!fullLocation">请选择配送地址</span>
      <span class="value" v-else>{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="city in currCityList" :key="city.code">
          {{ city.name }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.xgh-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../assets/image/loading.gif) no-repeat center;
    }
  }
}
</style>
