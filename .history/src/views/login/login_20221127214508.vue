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
      <!-- 账号登录&扫码登录 -->
    </div>
  </section>
  <loginFooter></loginFooter>
</template>

<style scoped lang="scss">
.login-section {
  background: url(../../assets/image/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: $xghColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
