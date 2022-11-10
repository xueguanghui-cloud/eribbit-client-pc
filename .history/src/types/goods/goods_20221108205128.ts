import type { IBrand } from "../brand";
import type { IGood } from "../good";

interface Icategorie {
  id: string;
  layer: number;
  name: string;
  parent: Icategorie;
}

interface ISku {
  id: string;
  inventory: number;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: { name: string; valueName: string }[];
}

interface ISpecs {
  id: string;
  name: string;
  values: {
    desc: "【年末狂欢季】-销售属性颜色-星耀黑2只装-规格属性图片";
    name: "星耀黑2只装";
    picture: "https://yanxuan-item.nosdn.127.net/68fbb3e2223278a4add7c54b15b18e55.png";
  }[];
}

interface IGoods {
  brand: IBrand;
  categories: Icategorie[];
  collectCount: number;
  commentCount: number;
  desc: string;
  details: {
    pictures: string[];
    properties: { name: string; value: string }[];
  };
  discount: number;
  evaluationInfo: null;
  hotByDay: IGood[];
  id: string;
  inventory: number;
  isCollect: null;
  isPreSale: false;
  mainPictures: string[];
  mainVideos: string[];
  name: string;
  oldPrice: string;
  price: string;
  recommends: null;
  salesCount: number;
  similarProducts: IGood[];
  skus: ISku[];
  specs: ISpecs[];
  spuCode: string;
  userAddresses: null;
  videoScale: 1;
}

export type { IGoods };
