<script setup lang="ts">
import QC from "qc";
import { reactive, ref } from "vue";
import { Form, Field } from "vee-validate";
// 1. unionId(openId), qq头像，昵称
// 2. 完成表单校验
// 3. 发送验证码(校验,定义api, 调用,完成倒计时)
// 4. 进行绑定(绑定成功就是登录成功)
withDefaults(defineProps<{ unionId: string }>(), { unionId: "" });

const nickName = ref("");
const avatar = ref("");

if (QC.Login.check()) {
  //
  QC.api("get_user_info").success((res: any) => {
    console.log(res);
    nickName.value = res.data.nickName;
    avatar.value = res.data.figureurl_1;
  });
}
// 表单数据对象
const from = reactive({
  mobile: "",
  code: "",
});
// 表单校验规则对象
</script>

<template>
  <Form class="xgh-form">
    <div class="user-info">
      <img :src="avatar" alt="" />
      <p>Hi，{{ nickName }} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <div class="xgh-form-item">
      <div class="field">
        <i class="icon iconfont icon-phone"></i>
        <Field
          name="mobile"
          class="input"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div class="error"></div>
    </div>
    <div class="xgh-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field name="code" class="input" type="text" placeholder="短信验证码" />
        <span class="code">发送验证码</span>
      </div>
      <div class="error"></div>
    </div>
    <a href="javascript:;" class="submit">立即绑定</a>
  </Form>
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
