// 扩展 vue 原有功能：全局组件，自定义指令，挂载原型方法。

// 插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数,Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例,app基础之上扩展
import type { App } from "vue";
/**import XghSkeleton from "./xgh-skeleton.vue";
import XghCarousel from "./xgh-carousel.vue";
import XghMore from "./xgh-more.vue";
import XghBread from "./xgh-bread.vue";
import XghBreadItem from "./xgh-bread-item.vue";
import defaultImg from "@/assets/image/200.png";

export default {
  install(app: App) {
    // 在app上进行扩展。app 提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component("xgh-skeleton", XghSkeleton);
    app.component("xgh-carousel", XghCarousel);
    app.component("xgh-more", XghMore);
    app.component("xgh-bread", XghBread);
    app.component("xgh-bread-item", XghBreadItem);
    // 定义指令
    defineDirective(app);
  },
};
*/

// 上面的逐个导入及注册很麻烦,改为批量导入
// 使用 import.meta.glob 方法 加载某一目录下的所有 .vue 的文件
const importFn: any = import.meta.globEager("./*.vue");
export default {
  install(app: App) {
    // 在app上进行扩展。app 提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // app.component("xgh-skeleton", XghSkeleton);
    // app.component("xgh-carousel", XghCarousel);
    // app.component("xgh-more", XghMore);
    // app.component("xgh-bread", XghBread);
    // app.component("xgh-bread-item", XghBreadItem);
    for (const key in importFn) {
      const component = importFn[key];
      const name = key.replace("./", "").replace(".vue", "");
      app.component(name, component.default);
    }
    // 定义指令
    defineDirective(app);
  },
};

const defineDirective = (app: App) => {
  // 1.图片懒加载指令
  // 原理：先将图片地址存储起来，不能直接放在src上，当图片进入可视区，将存储图片的地址设置给元素即可
  app.directive("lazy", {
    // vue2.0 箭头使用指令的DOM是否创建好，钩子函数：inserted
    // vue3.0 的指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数：mounted
    mounted(el: HTMLImageElement, binding) {
      // 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            observe.unobserve(el); // 停止观察
            el.onerror = () => {
              // 加载失败，加载默认图片
              el.src = defaultImg;
            };
            el.src = binding.value;
          }
        },
        {
          threshold: 0, // 相交比例
        }
      );
      observe.observe(el);
    },
  });
};
