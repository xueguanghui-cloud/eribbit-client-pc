// 扩展 vue 原有功能：全局组件，自定义指令，挂载原型方法。

// 插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数,Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例,app基础之上扩展
// import type App from "../App.vue";
import XghSkeleton from "./xgh-skeleton.vue"
import XghCarousel from "./xgh-carousel.vue"
import XghMore from "./xgh-more.vue"

export default {
    install (app: any){
        // 在app上进行扩展。app 提供 component directive 函数
        // 如果要挂载原型 app.config.globalProperties 方式
        app.component("xgh-skeleton", XghSkeleton);
        app.component("xgh-carousel", XghCarousel);
        app.component("xgh-more", XghMore);
    }
}
