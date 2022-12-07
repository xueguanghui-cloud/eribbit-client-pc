<script setup lang="ts">
import QC from "qc";
import { onMounted, reactive, ref } from "vue";
import { Form, Field } from "vee-validate";
import schema from "@/utils/vee-validate-schema";
import { userQQBindCode, userQQBindLogin } from "@/api/user";
import Message from "@/baseUI/Message";
import { useIntervalFn } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
// 1. unionId(openId), qq头像，昵称
// 2. 完成表单校验
// 3. 发送验证码(校验,定义api, 调用,完成倒计时)
// 4. 进行绑定(绑定成功就是登录成功)
const props = withDefaults(defineProps<{ unionId: string }>(), { unionId: "" });

const isMsgLogin = ref(false);
const nickName = ref("");
const avatar = ref("");
const formRef = ref();
if (QC.Login.check()) {
  //
  QC.api("get_user_info").success((res: any) => {
    console.log(res);
    nickName.value = res.data.nickName;
    avatar.value = res.data.figureurl_1;
  });
}
// 表单数据对象
const form = reactive({
  mobile: "",
  code: "",
});
// 表单校验规则对象
const internalSchema = {
  mobile: schema.mobile,
  code: schema.code,
};

// pause: 暂停，resume:开启
// useIntervalFn(callback, interval, 是否立即开启)
const time = ref(0);
const { pause, resume } = useIntervalFn(
  () => {
    time.value--;
    if (time.value <= 0) pause();
  },
  1000,
  { immediate: false }
);

/*
 发送验证码
  - 绑定发送验证码按钮点击事件
  - 校验手机号，成功：发送短信（定义API）开启60s倒计时，不能再次点击，知道倒计时结束恢复；失败：校验失败样式提示
*/
const sendVerificationCode = async () => {
  const valid = internalSchema.mobile(form.mobile);
  if (valid === true) {
    await userQQBindCode(form.mobile);
    if (time.value === 0) {
      time.value = 60;
      resume();
    }
  } else {
    // 失败，使用vee的错误函数显示错误信息 setFieldError(字段, 错误信息)
    formRef.value.setFieldError("mobile", valid);
  }
};

// 需要在登录时对整体表单校验
// vee-validate 提供了与一个 validate 函数作为整体表单校验，返回的是一个promise
const bind = async () => {
  const valid = await formRef.value.validate();
  let data;
  try {
    if (valid) {
      data = await userQQBindLogin(props.unionId, form.mobile, form.code);

      const { id, account, avatar, mobile, nickname, token } = data.result;
      userStore.setUser({ id, account, avatar, mobile, nickname, token });
      router.push((route.query.redirectUrl as string) || "/");
      Message({
        type: "success",
        message: "登录成功",
      });
    }
  } catch (err: any) {
    err.response.data &&
      Message({
        type: "error",
        message: err.response.data.message,
      });
  }
};

onMounted(() => {
  pause();
});
</script>

<template>
  <Form
    ref="formRef"
    class="xgh-form"
    :validation-schema="internalSchema"
    autocomplete="off"
    v-slot="{ errors }"
  >
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
          v-model="form.mobile"
          :class="{ err: errors.mobile }"
          type="text"
          placeholder="绑定的手机号"
        />
      </div>
      <div class="error" v-if="errors.mobile">{{ errors.mobile }}</div>
    </div>
    <div class="xgh-form-item">
      <div class="field">
        <i class="icon iconfont icon-code"></i>
        <Field
          name="code"
          :class="{ err: errors.code }"
          class="input"
          type="text"
          v-model="form.code"
          placeholder="短信验证码"
        />
        <span class="code" @click="sendVerificationCode">
          {{ time === 0 ? "发送验证码" : time + "秒后发送" }}
        </span>
      </div>
      <div class="error" v-if="errors.code">{{ errors.code }}</div>
    </div>
    <a href="javascript:;" class="submit" @click="bind">立即绑定</a>
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
