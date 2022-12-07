<script setup lang="ts">
import QC from "qc";
import { ref } from "vue";
// 1. unionId(openId), qq头像，昵称
// 2. 完成表单校验
// 3. 发送验证码(校验,定义api, 调用,完成倒计时)
// 4. 进行绑定(绑定成功就是登录成功)
withDefaults(defineProps<{ unionId: string }>(), { unionId: "" });

const nickName = ref();

if (QC.Login.check()) {
  //
  QC.api("get_user_info").success((res: any) => {
    console.log(res);
  });
}
</script>

<template>
  <div class="xgh-form">
    <div class="user-info">
      <img
        src="http://qzapp.qlogo.cn/qzapp/101941968/57C7969540F9D3532451374AA127EE5B/50"
        alt=""
      />
      <p>Hi，Tom 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xgh-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <input class="input" type="text" placeholder="绑定的手机号" />
      </div>
      <div class="error"></div>
    </div>
    <div class="xgh-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <input class="input" type="text" placeholder="短信验证码" />
        <span class="code">发送验证码</span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit">立即绑定</a>
  </div>
</template>

<style scoped lang="scss">
.user-info {
  width: 320px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  background: #f2f2f2;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 25px;
  img {
    background: #f2f2f2;
    width: 50px;
    height: 50px;
  }
  p {
    padding-left: 10px;
  }
}
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
