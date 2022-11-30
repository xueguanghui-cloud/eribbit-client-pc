<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { Form, Field, useValidateForm } from "vee-validate";
import schema from "@/utils/vee-validate-schema";

// 是否短信登录
const isMsgLogin = ref(false);
// 表单信息对象
const form = reactive({
  isAgree: true,
  account: null,
  password: null,
  mobile: null,
  code: null,
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
  /*
    如果是没有销毁Field组件，之前的校验结果是不会清除的 例如：v-show切花
    vee-validate 提供了与一个 useResetForm() 函数清除校验结果
  */
};

// 监听isMsgLogin重置表单
watch(isMsgLogin, () => {
  form.account = null;
  form.password = null;
  form.mobile = null;
  form.code = null;
  form.isAgree = false;
});

// 需要在登录时对整体表单校验
const login = () => {
  // vee-validate 提供了与一个 validate 函数作为整体表单校验，返回的是一个promise
  const validate = useValidateForm();

  console.log(result);
};
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
    <Form class="form" :validation-schema="internalSchema" v-slot="{ errors }">
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
            <span class="code">发送验证码</span>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
          <Field name="isAgree">
            <xgh-checkbox v-model="form.isAgree" />
          </Field>
          <div class="error" v-if="errors.isAgree">
            <i class="iconfont icon-warning" />{{ errors.isAgree }}
          </div>
          <span>我已同意</span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
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
