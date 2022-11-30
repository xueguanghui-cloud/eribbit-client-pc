<script setup lang="ts">
import loginHeader from "./components/login-header.vue";
import loginFooter from "./components/login-footer.vue";
</script>

<template>
  <loginHeader>欢迎登录</loginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a href="javascript:;">账户登录</a>
        <a href="javascript:;">扫码登录</a>
      </nav>
    </div>
  </section>
  <loginFooter></loginFooter>
</template>

<style scoped lang="scss"></style>
