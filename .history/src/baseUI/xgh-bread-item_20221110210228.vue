<script setup lang="ts">
import { toRefs } from "vue";

const props = defineProps({
  to: {
    type: [String, Object],
    default: "",
  },
});

const { to: toRef } = toRefs(props);
</script>

<template>
  <div class="xgh-bread-item">
    <RouterLink v-if="to" :to="toRef"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>

<style scoped lang="scss"></style>
