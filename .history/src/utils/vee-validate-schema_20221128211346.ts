/**
 * 为 vee-validata 提供校验规则
 */

// 校验规则：返回true就是校验成功，返回字符串就是失败，字符串就是错误提示
export default {
  // 用户名校验：字母开头6-20字符
  account(value: string) {
    if (!/^[a-zA-Z]\w{5,19}$/.test(value))
      return "您输入的密码不合法(字母开头且6-20字符)";
    return true;
  },
  // 密码校验
  password(value: string) {
    if (
      !/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/.test(
        value
      )
    )
      return "您输入的密码不合法(最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符)";
    return true;
  },
  // 手机号校验
  mobile(value: string) {
    if (
      !/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(
        value
      )
    )
      return "请输入合法的手机号";
    return true;
  },
  // 验证码校验
  code(value: string) {
    if (!value) return "请输入短信验证码";
    return true;
  },
};
