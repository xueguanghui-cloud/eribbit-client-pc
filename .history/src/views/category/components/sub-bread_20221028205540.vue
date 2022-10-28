<script setup lang="ts"></script>

<template>
  <xgh-bread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem to="">电器</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem key="">{{ category.sub.name }}</XtxBreadItem>
    </Transition>
  </xgh-bread>
</template>

<style scoped lang="scss"></style>
