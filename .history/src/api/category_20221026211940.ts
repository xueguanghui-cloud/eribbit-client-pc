// 定义分类相关API接口
import { get } from "@/utils/request";

/**
 * 获取所有分类（顶级，二级，对应的商品推荐数据）
 * @return Promise
 * */
export const findAllCategory = () => {
  return get("/home/category/head");
};

/**
 * 获取顶级分类
 * @param { String } id - 顶级类目ID
 * @return Promise
 * */
export const findTopCategory = (id: string) => {
  return get("/category", { id });
};
