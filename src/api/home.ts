// 提供首页相关API接口

import { get, post } from '@/utils/request'

/*
* 获取 品牌
* @params { Integer } - 品牌个数
* @return Promise
* */
export const findBrand = (limit: number = 6) => {
    return get('/home/brand', { limit });
}

/*
* 获取 广告区域轮播图
* @return Promise
* */
export const findBanner = () => {
    return get('/home/banner');
}

/*
* 获取 新鲜好物
* @return Promise
* */
export const findNew = () => {
    return get('/home/new');
}

/*
* 获取 人气推荐
* @return Promise
* */
export const findHot = () => {
    return get('/home/hot');
}

/*
* 获取 产品信息
* @return Promise
* */
export  const findProduct = () => {
    return get('/home/goods');
}


/*
* 获取 产品信息
* @return Promise
* */
export  const findSpecial = () => {
    return get('/home/special');
}
