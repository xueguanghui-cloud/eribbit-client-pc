// 用户相关接口

import { get, post } from "@/utils/request";

/**
 *  账号密码登录
 * @param accout 账号
 * @param password 密码
 * @returns Promise
 */
export const userAccountLogin = (account: string, password: string) => {
  return post("/login", { account, password });
};

/**
 * 获取手机号的短信验证码
 * @param mobile 手机号
 * @returns Promise
 */
export const userVerificationCodeByMobile = (mobile: string) => {
  return get("/login/code", { mobile });
};

/**
 * 手机号登录
 * @param mobile 手机号
 * @param code 验证码
 * @returns Promise
 */
export const userMobileLogin = (mobile: string, code: string) => {
  return post("/login/code", { mobile, code });
};

/**
 *
 * @param unionId QQ 唯一标识 openId
 * @param source 客户端类型（1：pc，2：webapp，3：微信小程序，4：Android，5：ios，6：qq，7：微信）
 * @returns Promise
 */
export const userQQLogin = (unionId: string, source = 1) => {
  return post("/login/social", { unionId, source });
};
