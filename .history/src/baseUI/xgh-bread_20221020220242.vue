<!-- 面包屑 组件 -->
<script setup lang="ts">
import { h } from "vue";
const xghBread = {
  render: () => {
    return h("div", { class: "xgh-bread" }, ["节点"]);
  };
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
