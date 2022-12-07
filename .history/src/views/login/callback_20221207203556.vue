<script setup lang="ts">
import { ref } from "vue";
import loginHeader from "./components/login-header.vue";
import loginFooter from "./components/login-footer.vue";
import callbackBind from "./components/callback-bind.vue";
import callbackPatch from "./callback-patch.vue";
import { userQQLogin } from "@/api/user";
import QC from "qc";
const hasAccount = ref(true);

// 首先：默认认为已经注册且绑定手机号
// 通过 QQ 的API获取openId就是后台需要的unionId, 然后去进行登录
// 成功：登录成功；失败：该QQ账号未和小兔仙进行绑定（有账号未绑定QQ，没有账号未绑定QQ）
const isBind = ref(true);
// 确保QQ已经登录
if (QC.Login.check()) {
  QC.Login.getMe((openId: string) => {
    // 第三方唯一标识
    console.log(openId);
    userQQLogin(openId)
      .then((res: any) => {
        // 登录成功：data.result 用户信息
      })
      .catch((err: any) => {
        // 登录失败：没有与小兔仙绑定
        isBind.value = false;
      });
  });
}
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
      <callbackBind />
    </div>
    <div class="tab-content" v-else>
      <callbackPatch />
    </div>
  </section>
  <loginFooter></loginFooter>
</template>

<style scoped lang="scss">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: $xghColor;
      border-color: $xghColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}
</style>
