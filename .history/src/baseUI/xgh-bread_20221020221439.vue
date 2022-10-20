<!-- 面包屑 组件 -->
<script lang="ts">
import { h } from "vue";

export default {
  render() {
    // 1. template 标签去除,单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2 的h函数是传参进来的,vue3 的h函数是从 vue 中导入的

    return h("div", { class: "xgh-bread" }, "子节点");
  },
};
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
