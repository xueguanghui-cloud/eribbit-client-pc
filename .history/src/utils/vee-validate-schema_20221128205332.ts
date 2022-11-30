/**
 * 为 vee-validata 提供校验规则
 */
// 校验规则：返回true就是校验成功，返回字符串就是失败，字符串就是错误提示
export default {
  // 用户名校验
  account(value: string) {
    if (!value) return "请输入用户名";
    return true;
  },
  //   密码校验
  password() {},
  //   账号校验
  mobile() {},
  code() {},
};
