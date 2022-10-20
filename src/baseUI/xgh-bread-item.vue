<script setup lang="ts">
defineProps({
  to: {
    type: [String, Object],
    default: "",
  },
});
</script>

<template>
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>

<style scoped lang="scss"></style>
