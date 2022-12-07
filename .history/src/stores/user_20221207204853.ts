/* 用户模块 */

import { defineStore } from "pinia";
import type { IUser } from "@/types/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    // 用户信息
    profile: {
      id: "",
      avatar: "",
      nickname: "",
      account: "",
      mobile: "",
      token: "",
    } as IUser,
    // 登录后的回跳地址
    redirectUrl: "/",
  }),
  getters: {},
  actions: {
    // 修改用户信息
    setUser(payload: IUser) {
      this.profile = payload;
    },
    // 清空用户信息
    clearUser() {
      this.profile = {
        id: "",
        avatar: "",
        nickname: "",
        account: "",
        mobile: "",
        token: "",
      };
    },
  },
  persist: true, // 模块持久化
});
