// 提供商品相关的API函数

import { get, post } from "@/utils/request";

/**
 * 提供商品详情
 * @param {String} id - 商品ID
 */

export const findGood = (id: string) => {
  return get("/goods"), { id };
};
