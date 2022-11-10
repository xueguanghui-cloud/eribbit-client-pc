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
  inventory: 133;
  oldPrice: string;
  price: string;
  skuCode: string;
  specs: [];
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
  skus: [];
  specs: [];
  spuCode: string;
  userAddresses: null;
  videoScale: 1;
}

export type { IGoods };
