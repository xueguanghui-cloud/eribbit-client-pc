<script setup lang="ts">
import { onUnmounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Form, Field } from "vee-validate";
import Message from "@/baseUI/Message";
import { useUserStore } from "@/stores/user";
import schema from "@/utils/vee-validate-schema";
import { userAccountLogin, userMobileLogin } from "@/api/user";
import { useIntervalFn } from "@vueuse/shared";

const formRef = ref();
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
// 是否短信登录
const isMsgLogin = ref(false);
// 表单信息对象
const form = reactive({
  isAgree: true,
  account: "",
  password: "",
  mobile: "",
  code: "",
});

/*  vee-validate 校验基本步骤
 1. 导入 Form Field 组件，将 form 和 input 进行替换，需要给Field组件提供name属性，用来指定将来的校验规则函数
 2. Field 需要进行数据绑定，字段名称最好和后端保持一致
 3. 定义Field 的 name 属性指定的校验规则，Form 的 validate-schema 接收定义好的校验规则
 4. 自定义组件需要必须先支持v-model 然后Field使用as指定为组件名称
 */
const internalSchema = {
  // 校验规则：返回true就是校验成功，返回字符串就是失败，字符串就是错误提示
  account: schema.account,
  password: schema.password,
  mobile: schema.mobile,
  code: schema.code,
  isAgree: schema.isAgree,
  /*
    如果是没有销毁Field组件，之前的校验结果是不会清除的 例如：v-show切花
    vee-validate 提供了与一个 useResetForm() 函数清除校验结果
  */
};

// 监听isMsgLogin重置表单
watch(isMsgLogin, () => {
  form.account = "";
  form.password = "";
  form.mobile = "";
  form.code = "";
  // 补充校验效果清除，Form组件提供resetForm()
  formRef.value.resetForm();
});
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

// 发送验证码
const sendVerificationMessage = async () => {
  const valid = internalSchema.mobile(form.mobile);
  if (valid === true) {
    await userMobileLogin(form.mobile);
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
const login = async () => {
  const valid = await formRef.value.validate();
  if (isMsgLogin.value) {
    // 手机号登录
    // 1. 发送验证码
    //    - 绑定发送验证码按钮点击事件
    //    - 校验手机号，成功：发送短信（定义API）开启60s倒计时，不能再次点击，知道倒计时结束恢复；失败：校验失败样式提示
    // 2. 手机号登录
    // 3. 准备API做手机号登录
    // 4. 调用API函数
    // 5. 成功：跳转至首页/来源页 + 登录成功的提示；失败：登录失败的提示
  } else {
    // 账号登录
    // 1. 准备API做账号登录
    // 2. 调用API函数
    // 3. 成功：跳转至首页/来源页 + 登录成功的提示；失败：登录失败的提示
    if (valid) {
      const { account, password } = form;
      userAccountLogin(account, password)
        .then((res: any) => {
          const { id, account, avatar, mobile, nickname, token } = res.result;
          userStore.setUser({ id, account, avatar, mobile, nickname, token });
          router.push((route.query.redirectUrl as string) || "/");
          Message({
            type: "success",
            message: "登录成功",
          });
        })
        .catch((err: any) => {
          err.response.data &&
            Message({
              type: "error",
              message: err.response.data.message,
            });
        });
    }
  }
};

onUnmounted(() => {
  pause()
}),
</script>

<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="isMsgLogin = false" href="javascript:;" v-if="isMsgLogin">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="isMsgLogin = true" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <Form
      class="form"
      ref="formRef"
      autocomplete="off"
      v-slot="{ errors }"
      :validation-schema="internalSchema"
    >
      <!-- 账号登录 -->
      <template v-if="!isMsgLogin">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <!-- <input type="text" placeholder="请输入用户名或手机号" /> -->
            <Field
              name="account"
              type="text"
              v-model="form.account"
              placeholder="请输入用户名或手机号"
              :class="{ error: errors.account }"
            ></Field>
            <div class="error" v-if="errors.account">
              <i class="iconfont icon-warning" />{{ errors.account }}
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <!-- <input type="password" placeholder="请输入密码" /> -->
            <Field
              name="password"
              type="password"
              v-model="form.password"
              placeholder="请输入密码"
              :class="{ error: errors.password }"
            ></Field>
            <div class="error" v-if="errors.password">
              <i class="iconfont icon-warning" />{{ errors.password }}
            </div>
          </div>
        </div>
      </template>
      <!-- 短信登录 -->
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <!-- <input type="text" placeholder="请输入手机号" /> -->
            <Field
              name="mobile"
              type="text"
              v-model="form.mobile"
              placeholder="请输入手机号"
              :class="{ error: errors.mobile }"
            ></Field>
            <div class="error" v-if="errors.mobile">
              <i class="iconfont icon-warning" />{{ errors.mobile }}
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <!-- <input type="password" placeholder="请输入验证码" /> -->
            <Field
              name="code"
              type="code"
              v-model="form.code"
              placeholder="请输入验证码"
              :class="{ error: errors.code }"
            ></Field>
            <div class="error" v-if="errors.code">
              <i class="iconfont icon-warning" />{{ errors.code }}
            </div>
            <span class="code" @click="sendVerificationMessage">
              {{ time === 0 ? "发送验证码" : time + "秒后发送" }}
            </span>
          </div>
        </div>
      </template>

      <!-- 同意登录协议 -->
      <div class="form-item">
        <div class="agree">
          <Field name="isAgree" v-model="form.isAgree">
            <xgh-checkbox v-model="form.isAgree" />
          </Field>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
          <div class="error" v-if="errors.isAgree">
            <i class="iconfont icon-warning" />{{ errors.isAgree }}
          </div>
        </div>
      </div>
      <a href="javascript:;" class="btn" @click="login">登录</a>
    </Form>

    <div class="action">
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: $xghColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: $priceColor;
          }
          &.active,
          &:focus {
            border-color: $xghColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
        .error {
          color: $priceColor;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
      .error {
        color: $priceColor;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xghColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
