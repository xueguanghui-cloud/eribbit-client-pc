// 用户相关接口

import { post } from "@/utils/request";

export const userAccoutLogin = (accout: string, password: string) => {
  return post("/login", { accout, password });
};
