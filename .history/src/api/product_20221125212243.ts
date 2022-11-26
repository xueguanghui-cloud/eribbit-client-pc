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
 * @param {String}
 *
 */
export const findGoodsHot = (id?: string, limit = 3, type = 1) => {};
