<script setup lang="ts">
import loginHeader from "./components/login-header.vue";
import loginFooter from "./components/login-footer.vue";
</script>

<template>
  <loginHeader>联合登录</loginHeader>
  <section class="container">
    <nav class="tab">
      <a
        @click="hasAccount = true"
        :class="{ active: hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-bind" />
        <span>已有小兔鲜账号，请绑定手机</span>
      </a>
      <a
        @click="hasAccount = false"
        :class="{ active: !hasAccount }"
        href="javascript:;"
      >
        <i class="iconfont icon-edit" />
        <span>没有小兔鲜账号，请完善资料</span>
      </a>
    </nav>
    <div class="tab-content" v-if="hasAccount">
      <CallbackBind :nickname="nickname" :avatar="avatar" />
    </div>
    <div class="tab-content" v-else>
      <CallbackPatch />
    </div>
  </section>
  <loginFooter></loginFooter>
</template>

<style scoped lang="scss"></style>
