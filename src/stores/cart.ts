/* 购物车模块 */

import { defineStore } from "pinia"

export const useCartStore = defineStore("cart", {
    state: ()=>({
        cartList: []
    }),
    getters: {

    },
    actions: {

    },
    persist: true
})
