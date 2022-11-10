<script setup lang="ts">
defineProps({
  to: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="xgh-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>

<style scoped lang="scss"></style>
