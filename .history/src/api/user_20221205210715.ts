// 用户相关接口

import { post } from "@/utils/request";

/**
 *
 * @param accout 账号
 * @param password 密码
 * @returns Promise
 */
export const userAccoutLogin = (accout: string, password: string) => {
  return post("/login", { accout, password });
};
