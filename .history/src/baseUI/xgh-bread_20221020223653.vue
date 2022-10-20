<!-- 面包屑 组件 -->
<script lang="ts">
import { def } from "@vue/shared";
import { h, render, type VNode } from "vue";
export default {
  setup(props, { slots, attrs }) {
    const items = slots.default ? slots.default?.() : [];
    const dymanicItems: VNode[] = [];
    return () => {};
  },
};
// export default {
//   render() {
//     // 1. template 标签去除,单文件组件
//     // 2. 返回值就是组件内容
//     // 3. vue2 的h函数是传参进来的,vue3 的h函数是从 vue 中导入的

//     // 需求:
//     // 1. 创建xgh-bread 父容器
//     // 2. 获取默认插槽内容
//     // 3. 去除xgh-bread-item 组件的i标签,应该有 render 函数来组织
//     // 4. 遍历插槽中的item, 得到一个动态创建的节点,最后一个item节点不加i标签
//     // 5. 把动态创建的节点渲染在 xgh-bread 标签中
//     const items = this.$slots.default();
//     const dymanicItems: VNode[] = [];
//     items.forEach((item, i) => {
//       dymanicItems.push(item);
//       if (i < items.length - 1) {
//         dymanicItems.push(h("i", { class: "iconfont icon-angle-right" }));
//       }
//     });
//     console.log(items);

//     return h("div", { class: "xgh-bread" }, dymanicItems);
//   },
// };
</script>

<!-- <template>
  <div class="xgh-bread">
    <slot />
  </div>
</template> -->

<style lang="scss">
// 去除 scoped 属性,目的:让样式作用于 xgh-bread-item 组件
.xgh-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: $xghColor;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
