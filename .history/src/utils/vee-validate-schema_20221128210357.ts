/**
 * 为 vee-validata 提供校验规则
 */

// 校验规则：返回true就是校验成功，返回字符串就是失败，字符串就是错误提示
export default {
  // 用户名校验：字母开头6-20字符
  account(value: string) {
    if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return "字母开头且6-20字符";
    return true;
  },
  // 密码校验
  password() {
    if (
      /^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(
        value
      )
    )
      return "请输入密码";
  },
  // 手机号校验
  mobile() {},
  // 验证码校验
  code() {},
};
