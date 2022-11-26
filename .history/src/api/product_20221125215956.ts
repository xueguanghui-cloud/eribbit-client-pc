// 提供商品相关的API函数

import { get, post } from "@/utils/request";

/**
 * 提供商品详情
 * @param {String} id - 商品ID
 */

export const findGoods = (id: string) => {
  return get("/goods", { id });
};

/**
 * 获取相关推荐商品|猜你喜欢商品
 * @param {String} id - 商品ID, 传值相关推荐,不传猜你喜欢
 * @param {Number} limit - 商品数量
 */

export const findRelevantGoods = (id?: string, limit = 16) => {
  return get("/goods/relevant", { id, limit });
};

/**
 * 获取 热榜商品
 * @param {String} id - 商品id
 * @param {Number} limit - 商品数量
 * @param {Number} type -  商品类型 { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜"} */
export const findGoodsHot = (id?: string, type = 1, limit = 3) => {
  return get("/goods/hot", { id, limit, type });
};

/**
 * 获取商品的评价统计信息
 * @param {String} id - 商品ID
 */
export const findCommentInfoByGoods = (id: string) => {
  return get(
    `https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/goods/${id}/evaluate`
  );
};
// https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate
