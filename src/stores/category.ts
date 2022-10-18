/* 分类模块 */
import { defineStore } from "pinia"
import { topCategory } from "@/api/constants"
import { findAllCategory } from "@/api/category"
import type { ICategory } from "@/types/category"

export const useCategoryStore = defineStore("category", {
    state: ()=>({
        // 分类数据集合，依赖topCategory重新设置，保证初始化就要数据，避免白屏
        categoryList: topCategory.map(item =>({ name: item })) as ICategory[]
    }),
    getters: {

    },
    actions: {
        // 定义 show 和 hide 函数，控制当前分类的二级分类显示和隐藏
        show(id: string){
            const curCategory = this.categoryList.find(item => item.id === id);
            curCategory!.open = true;
        },
        hide(id:string){
            const curCategory = this.categoryList.find(item => item.id === id);
            curCategory!.open = false;
        },
        async getCategoryList() {
            // 获取分类数据
            const data: any = await findAllCategory();
            // 给每个分类加上控制二级显示隐藏的属性 open
            data.result.forEach((item: ICategory) => {
                item.open = false;
            })
            // 修改分类数据
            this.categoryList = data.result;
        }
    },
    persist: true
})
