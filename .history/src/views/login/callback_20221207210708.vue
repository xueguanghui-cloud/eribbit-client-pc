<script setup lang="ts">
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { userQQLogin } from "@/api/user";
import callbackPatch from "./callback-patch.vue";
import loginHeader from "./components/login-header.vue";
import loginFooter from "./components/login-footer.vue";
import callbackBind from "./components/callback-bind.vue";
import Message from "@/baseUI/Message";
import QC from "qc";

const router = useRouter();
const userStore = useUserStore();

const hasAccount = ref(true);
// 首先：默认认为已经注册且绑定手机号
// 通过 QQ 的API获取openId就是后台需要的unionId, 然后去进行登录
// 成功：登录成功；失败：该QQ账号未和小兔仙进行绑定（有账号未绑定QQ，没有账号未绑定QQ）
const isBind = ref(true);
const unionId = ref("");

// 确保QQ已经登录
console.log("sss", QC.Login.check());

if (QC.Login.check()) {
  QC.Login.getMe((openId: string) => {
    // 第三方唯一标识
    unionId.value = openId;
    userQQLogin(openId)
      .then((res: any) => {
        // 登录成功：data.result 用户信息
        // 1. 存储用户信息
        console.log("success", res);

        const { id, account, avatar, mobile, nickname, token } = res.result;
        userStore.setUser({ id, account, avatar, mobile, nickname, token });
        // 2. 跳转来源页或者首页
        router.push(userStore.redirectUrl);
        // 3. 成功提示
        Message({
          type: "success",
          message: "登录成功",
        });
      })
      .catch((err: any) => {
        // 登录失败：没有与小兔仙绑定
        isBind.value = false;
        console.log("err", err);
      });
  });
}
</script>

<template>
  <loginHeader>联合登录</loginHeader>
  <section class="container" v-if="isBind">
    <div class="unbind">
      <div class="loading"></div>
    </div>
  </section>
  <section class="container" v-else>
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
    <div class="tab-content" :unionId="unionId" v-if="hasAccount">
      <callbackBind />
    </div>
    <div class="tab-content" :unionId="unionId" v-else>
      <callbackPatch />
    </div>
  </section>

  <loginFooter></loginFooter>
</template>

<style scoped lang="scss">
.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../assets/image/load.gif) no-repeat center / 100px
        100px;
    }
  }
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
