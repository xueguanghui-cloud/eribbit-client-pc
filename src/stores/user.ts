/* 用户模块 */

import { defineStore } from "pinia"
import type { IUser } from "@/types/user"

export const useUserStore = defineStore("user", {
    state: ()=>({
        // 用户信息
        profile: {
            id: "",
            avatar: "",
            nickname: "",
            account: "",
            mobile: "",
            token: ""
        } as IUser
    }),
    getters: {

    },
    actions: {
        // 修改用户信息
        setUser(payload: IUser) {
            this.profile = payload;
        }
    },
    persist: true, // 模块持久化
})
