// 定义分类相关API接口
import { get, post } from "@/utils/request";

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

/**
 * 获取二级类目下的筛选数据
 * @param { String } id - 二级类目ID
 * @return Promise
 * */
export const findSubCategoryFilter = (id: string) => {
  return get("/category/sub/filter", { id });
};

/**
 * 获取二级类目下的商品(筛选条件)
 * @param { String } params - 参考接口文档
 * @return Promise
 * */
export const findSubCategoryGoods = (params: any) => {
  return post("/category/goods/temporary", params);
};
