<script setup lang="ts">
import powerSet from "@/vender/power-set";
import type { IGoods, IValue, ISku, ISpec } from "@/types/goods/goods";

type TGoods = {
  goods: IGoods | undefined;
  skuId: string;
};

type TPathMap = {
  [key: string]: string[];
};
const emit = defineEmits(["change"]);
const props = withDefaults(defineProps<TGoods>(), {
  goods: undefined,
  skuId: "",
});
const SPLITER = "★";

// 得到一个路径字典对象
const getPathMap = (skus: ISku[]) => {
  // 1. 得到所有的sku集合, props.goods.skus
  // 2. 从所有的skus中筛选出有效的sku
  // 3. 根据有效的sku使用power-set算法得到子集
  // 4. 根据子集往路径字典对象中存储 key-value
  const pathMap: TPathMap = {};
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      // 计算子集, 例如: [1, 2, 3] => [[1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]
      // 可选值数组
      const specArr = sku.specs.map((val) => val.valueName);
      const specArrPowerSet = powerSet(specArr);
      // 遍历子集,往 pathMap 插入数据
      specArrPowerSet.forEach((arr) => {
        // 根据arr得到字符串的key,约定key是: ['蓝色', '美国'] ==> '蓝色★美国'
        const key = arr.join(SPLITER);
        if (pathMap[key]) {
          pathMap[key].push(sku.id);
        } else {
          pathMap[key] = [sku.id];
        }
      });
    }
  });
  return pathMap;
};

const getSelectedValues = (specs: ISpec[]) => {
  const selectedArr: (string | undefined)[] = [];
  specs.forEach((item) => {
    const selectedValue = item.values.find((val) => val.selected);
    selectedArr.push(selectedValue ? selectedValue.name : undefined);
  });
  return selectedArr;
};

const updateDisableedStatus = (specs: ISpec[], pathMap: TPathMap) => {
  // 约定每个按钮的状态有本身的disabled数据来控制
  specs.forEach((item, index) => {
    const selectedVaules = getSelectedValues(specs);
    item.values.forEach((val) => {
      // 判断当前是否选中,选中不用判断,
      if (val.selected) return;
      // 未选中, 拿当前的值按照顺序逃入选中的数组中
      selectedVaules[index] = val.name;
      // 剔除 undefined 数据,按分隔符拼接成key
      const key = selectedVaules
        .filter((selectedValue) => selectedValue)
        .join(SPLITER);
      // 去路径字典中查找是否有数据,有就可以点击,没有就禁用(true)
      val.disabled = !pathMap[key];
    });
  });
};

// 默认选中
const initDefaultSelected = (goods: IGoods, skuId: string) => {
  // 找出sku的信息
  // 遍历每一个按钮,按钮的值和sku记录的值相同,就选中
  const sku = goods.skus.find((sku) => sku.id === skuId);
  goods.specs.forEach((spec, index) => {
    const val = spec.values.find(
      (value) => value.name === sku?.specs[index].valueName
    );
    val!.selected = true;
  });
};

const pathMap = getPathMap(props.goods.skus);
// 根据skuId初始化选中
if (props.skuId) {
  initDefaultSelected(props.goods, props.skuId);
}
// ☆ 组件初始化:更新按钮禁用状态
updateDisableedStatus(props.goods.specs, pathMap);

// 选中与取消选中,约定在每一个按钮都拥有自己的选中状态数据:selected
// 点击的是已选中,只需要取消当前选中,点击的是未选中,把同一个规格的按钮改为未选中,当前点击的改为选中
const selectSku = (value: IValue, values: IValue[]) => {
  // 当按钮是禁用时,组织程序的运行
  if (value.disabled) return;
  if (value.selected) {
    value.selected = false;
  } else {
    values.forEach((value: any) => {
      value.selected = false;
    });
    value.selected = true;
  }
  // ☆ 点击按钮: 更新按钮禁用状态
  updateDisableedStatus(props.goods.specs, pathMap);
  //   将选择的sku信息通知个父组件 {skuId, price, oldPrice, inventroy,specsText}
};
</script>

<template>
  <div class="goods-sku" v-if="goods">
    <dl v-for="spec in goods.specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="value in spec.values" :key="value.name">
          <img
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="selectSku(value, spec.values)"
            v-if="value.picture"
            :src="value.picture"
            :title="value.name"
          />
          <span
            v-else
            :class="{ selected: value.selected, disabled: value.disabled }"
            @click="selectSku(value, spec.values)"
            >{{ value.name }}</span
          >
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="scss">
@mixin sku-state-mixin() {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: $xghColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        @include sku-state-mixin();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        @include sku-state-mixin();
      }
    }
  }
}
</style>
