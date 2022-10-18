<script setup lang="ts">
import { ref } from "vue";
import { findBanner } from "@/api/home"
import { ISlider } from "@/types/sliders"
const sliders = ref<ISlider[]>([]);
findBanner().then((res: any)=>{
  sliders.value = res.result;
})
</script>

<template>
  <div class="home-banner">
    <xgh-carousel :sliders="sliders" :autoPlay="true"></xgh-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  .xgh-carousel {
    :deep(.carousel-btn.prev){
      left: 270px;
    }
    :deep(.carousel-indicator){
      padding-left: 250px;
    }
  }
}
</style>
